from fastapi import FastAPI, File, UploadFile
from fastapi.responses import PlainTextResponse
from tempfile import NamedTemporaryFile
from typing import List
from bs4 import BeautifulSoup
import subprocess
import requests
import json


app = FastAPI()


def ml_text_to_jsonl(text: str) -> list[dict]:
    return [{'price': 10, 'title':'C1'}, {'price': 20, 'title':'C2'}]


@app.post("/api/upload/file/")
async def extract_text(file: UploadFile = File(...)):
    with NamedTemporaryFile(delete=False) as tmp:
        tmp.write(await file.read())
        tmp_path = tmp.name

    output_file_path = "./tmp/output.md"
    subprocess.run(["python", "convert_single.py", tmp_path, output_file_path])

    with open(output_file_path, "r", encoding="utf-8") as output_file:
        text = output_file.read()
    # TODO: replace ml function
    result = ml_text_to_jsonl(text)

    return {'result': result, 'debug': text}


@app.post("/api/upload/link")
async def parser_hh(hh_link: str) -> dict:
    response = requests.get(hh_link, allow_redirects=True,
                            headers={'User-Agent': 'Custom123'})
    soup = BeautifulSoup(response.text, 'lxml')
    skills = soup.find_all(
        'span', class_='bloko-tag__section bloko-tag__section_text')
    title = soup.find('h1', class_='bloko-header-section-1').text
    description = soup.find('div', {'data-qa': 'vacancy-description'}).get_text(strip=True, separator=' | ')

    list_skills = [skill.text for skill in skills]

    text = description + "\nИнструменты: " + ', '.join(list_skills)
    
    dict_skills = {
        'title': title,
        'skills': list_skills,
        'description': description,
        'text': text,
    }
    # TODO: replace ml function
    result = ml_text_to_jsonl(text)

    return {'result': result, 'debug': dict_skills}


@app.post("/api/upload/text")
async def text(text: str) -> dict:
    # TODO: replace ml function
    result = ml_text_to_jsonl(text)

    return {'result': result}
