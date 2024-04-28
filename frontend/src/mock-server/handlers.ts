import {delay, http, HttpResponse} from 'msw';

import {API_URL} from '@/config';
import {ENDPOINTS} from '@/api/endpoints';
import {MOCK_RESULT} from './result.mock';

export const handlers = [
    http.post(API_URL + ENDPOINTS.UPLOAD_FORM + '*', async () => {
        await delay();

        const result = [...MOCK_RESULT, ...MOCK_RESULT, ...MOCK_RESULT];
        const count = result.length;

        return HttpResponse.json({
            count,
            result,
            skills: ['CI/CD', 'ELK', 'Docker', 'SQL', 'Excel', 'Telegram'],
        });
    }),
];
