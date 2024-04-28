import pandas as pd
import re
from llama_index.core import Document
from llama_index.llms.huggingface import HuggingFaceLLM
from llama_index.embeddings.huggingface import HuggingFaceEmbedding
from transformers import BitsAndBytesConfig
from llama_index.core import VectorStoreIndex
from llama_index.core.postprocessor import SimilarityPostprocessor
from llama_index.core import Settings
from llama_index.core.query_engine import CustomQueryEngine
from llama_index.core.retrievers import BaseRetriever
from llama_index.core import get_response_synthesizer
from llama_index.core.response_synthesizers import BaseSynthesizer
from llama_index.core import PromptTemplate
import torch


def create_docs(df):
    documents = []
    for i, row in df.iterrows():
        metadata = {
            "ссылка": row.url,
            "заголовок": row.title_preview,
            "описание": row.description_preview,
            "цена": row.price,
            "длительность": row.duration_months,
            "инструменты": ", ".join(row.technologies)}
        documents.append(Document(text=row.description, metadata=metadata,
                         excluded_embed_metadata_keys=["ссылка", "цена", "длительность"]))

    return documents


df = pd.read_json("ml/data/courses_plus.jsonl", lines=True, orient='records')
df.dropna(inplace=True)
df.drop_duplicates(subset=["title_preview"], inplace=True)
df.title_preview = df.title_preview.apply(lambda x: x.split("\n")[0])
df.reset_index(drop=True, inplace=True)
df.head()
docs = create_docs(df)


def setup_llm():
    system_prompt = "Ты AI ассистент, который на основе описания вакансии рекомендует курсы из контекста."
    quantization_config = BitsAndBytesConfig(
        load_in_4bit=True,
        bnb_4bit_compute_dtype=torch.float16,
        bnb_4bit_quant_type="nf4",
        bnb_4bit_use_double_quant=True,
    )
    llm = HuggingFaceLLM(
        model_name="ml/mistral_model",
        tokenizer_name="ml/mistral_model",
        query_wrapper_prompt=PromptTemplate(
            "<s>[INST] {query_str} [/INST] </s>\n"),
        context_window=8192,
        max_new_tokens=512,
        model_kwargs={"quantization_config": quantization_config},
        # tokenizer_kwargs={},
        generate_kwargs={"temperature": 0},
        device_map="auto",
        system_prompt=system_prompt,
    )
    return llm


llm = setup_llm()
Settings.llm = llm
Settings.embed_model = HuggingFaceEmbedding(
    model_name="intfloat/multilingual-e5-base"
)

index = VectorStoreIndex.from_documents(documents=docs, show_progress=True)
retriever = index.as_retriever(similarity_top_k=7, node_postprocessors=[
                               SimilarityPostprocessor(similarity_cutoff=0.85)])

stack_prompt = PromptTemplate(
    "У тебя есть описание вакансии: {query_str}\n"
    "Тебе нужно найти инструменты из описания вакансии и написать их на русском языке в виде строки с разделителем запятой и без повторений"
)

class RAGStringQueryEngine(CustomQueryEngine):
    """RAG String Query Engine."""

    retriever: BaseRetriever
    response_synthesizer: BaseSynthesizer
    llm: HuggingFaceLLM
    stack_prompt: PromptTemplate

    def custom_query(self, query_str: str):
        query_str = re.sub("\n", " ", query_str)
        query_str = re.sub(" +", " ", query_str)
        query_str = query_str.strip()
        nodes = self.retriever.retrieve(query_str)
        stack = str(self.llm.complete(stack_prompt.format(
            query_str=query_str))).strip().split(",")
        stack = [el.strip() for el in stack]
        responses = []
        for n in nodes:
            course = {
                "title": n.node.metadata["заголовок"],
                "price": n.node.metadata["цена"],
                "link": n.node.metadata["ссылка"],
                "desc": n.node.metadata["описание"],
                "vac_stack": list(set(stack)),
                "match": int(float(n.score) * 100) / 100,
                "duration": n.node.metadata["длительность"],
                "cover": [el.strip() for el in n.node.metadata["инструменты"].split(",")],
            }
        
            responses.append(course)

        return responses


synthesizer = get_response_synthesizer(response_mode="compact")

query_engine = RAGStringQueryEngine(
    retriever=retriever,
    response_synthesizer=synthesizer,
    llm=llm,
    stack_prompt=stack_prompt,
)


def get_predict(vacancy_text):
    response = query_engine.query(vacancy_text)

    return response
