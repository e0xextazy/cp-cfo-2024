import {delay, http, HttpResponse} from 'msw';

import {API_URL} from '@/config';
import {ENDPOINTS} from '@/api/endpoints';

export const handlers = [
    http.post(API_URL + ENDPOINTS.UPLOAD_FORM + '*', async () => {
        await delay(3000);

        return HttpResponse.json({
            count: 10,
            result: [],
        });
    }),
];
