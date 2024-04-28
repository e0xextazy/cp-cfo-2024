import {delay, http, HttpResponse} from 'msw';

import {API_URL} from '@/config';
import {ENDPOINTS} from '@/api/endpoints';
import {MOCK_RESULT} from './result.mock';

export const handlers = [
    http.post(API_URL + ENDPOINTS.UPLOAD_FORM + '*', async () => {
        await delay();

        return HttpResponse.json({
            count: 10,
            result: MOCK_RESULT,
        });
    }),
];
