import {useRef} from 'react';
import {
    RadioButton,
    Button,
    ControlGroupOption,
    Text,
    Icon,
    Card,
    TextInput,
    TextArea,
    Label,
} from '@gravity-ui/uikit';
import {File, Link} from '@gravity-ui/icons';
import block from 'bem-cn-lite';

import {InputTypes} from '@/types';
import {useAppState} from '@/store';

import './UploadPage.scss';
import {useUploadForm} from '@/hooks/useUploadForm';

const InputTypesOptions: ControlGroupOption[] = [
    {
        value: InputTypes.UPLOAD_FILE,
        content: 'Загрузить файл',
    },
    {
        value: InputTypes.UPLOAD_LINK,
        content: 'Загрузить ссылку',
    },
    {
        value: InputTypes.UPLOAD_TEXT,
        content: 'Загрузить текст',
    },
];

const b = block('upload-page');

const SelectInputType = () => {
    const {inputType, setInputType} = useAppState();

    return (
        <RadioButton
            onChange={(e) => setInputType(e.target.value)}
            size="l"
            value={inputType}
            options={InputTypesOptions}
        />
    );
};

const UploadFileOption = () => {
    const {setInputPayload, inputPayload} = useAppState();
    const inputFileRef = useRef<HTMLInputElement | null>(null);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) {
            return;
        }

        const contentFormData = new FormData();
        contentFormData.append('file', file);
        contentFormData.append('filename', file.name);

        setInputPayload({
            type: 'file',
            content: contentFormData,
        });
    };

    const fileName = inputPayload?.content?.name;

    const buttonLabel = inputPayload?.type === 'file' ? 'Файл загружен' : 'Загрузить файл';

    const triggerInput = () => {
        if (inputFileRef.current) {
            inputFileRef.current.click();
        }
    };

    return (
        <>
            <input
                type="file"
                ref={inputFileRef}
                accept="application/pdf"
                onChangeCapture={handleFileUpload}
                style={{display: 'none'}}
            />
            <Button selected={Boolean(fileName)} size="xl" onClick={triggerInput}>
                <Text className={b('upload')} variant="body-2">
                    {buttonLabel} <Icon data={File} size={18} />
                </Text>
            </Button>
        </>
    );
};

const UploadLinkOption = () => {
    const {setInputPayload, resetPayload, inputPayload} = useAppState();

    const handleLinkUpload = (link: string) => {
        if (!link) {
            resetPayload();
            return;
        }
        setInputPayload({content: link, type: 'link'});
    };

    const link = inputPayload?.content;

    return (
        <TextInput
            autoFocus
            autoComplete={false}
            hasClear
            size="xl"
            placeholder="Введите ссылку"
            leftContent={<Icon data={Link} size={18} />}
            onChange={(e) => handleLinkUpload(e.target.value)}
            value={link || ''}
        />
    );
};

const EnterTextOption = () => {
    const {setInputPayload, resetPayload, inputPayload} = useAppState();

    const handleTextUpload = (text: string) => {
        if (!text) {
            resetPayload();
            return;
        }

        setInputPayload({content: text, type: 'text'});
    };

    const text = inputPayload?.content;

    return (
        <TextArea
            value={text || ''}
            autoComplete={false}
            autoFocus
            hasClear
            size="xl"
            placeholder="Введите описание вакансии"
            minRows={4}
            maxRows={12}
            onChange={(e) => handleTextUpload(e.target.value)}
        />
    );
};

export const UploadPage = () => {
    const {inputType, inputPayload} = useAppState();

    const {mutate, isLoading} = useUploadForm();

    const getInputTypeComponent = () => {
        switch (inputType) {
            case InputTypes.UPLOAD_LINK:
                return <UploadLinkOption />;
            case InputTypes.UPLOAD_TEXT:
                return <EnterTextOption />;
            case InputTypes.UPLOAD_FILE:
            default:
                return <UploadFileOption />;
        }
    };

    const submitForm = () => {
        if (!inputPayload) {
            return;
        }

        mutate(inputPayload);
    };

    return (
        <div className={b('page')}>
            <div className={b('wrapper')}>
                <div className={b('header_wrapper')}>
                    <Text className={b('header')} variant="header-1" as="h1">
                        Посоветуй
                    </Text>
                    <Label theme="success" className={b('team')} size="m">
                        5random
                    </Label>
                </div>
                <SelectInputType />
                <Card className={b('form_wrapper')}>
                    <Text variant="body-2">Заполните информацию о вакансии</Text>
                    <div className={b('form')}>
                        {getInputTypeComponent()}
                        <Button
                            size="xl"
                            width="max"
                            view="action"
                            disabled={!Boolean(inputPayload)}
                            loading={isLoading}
                            onClick={submitForm}
                        >
                            Отправить
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    );
};
