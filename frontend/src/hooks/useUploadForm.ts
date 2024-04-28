import {ENDPOINTS} from '@/api/endpoints';
import {API_URL} from '@/config';
import {useAppState} from '@/store';
import {InputPayload} from '@/types';
import {useMutation} from 'react-query';

export const useUploadForm = () => {
    const {inputPayload, setResult} = useAppState();

    const mutation = useMutation(async (file: InputPayload) => {
        if (!inputPayload) {
            return;
        }

        const response = await fetch(API_URL + ENDPOINTS.UPLOAD_FORM + file.type, {
            method: 'POST',
            body: file.content,
        });

        if (!response.ok) {
            throw new Error('Upload failed');
        }

        const result = await response.json();

        setResult(result);
    });

    return mutation;
};
