import type { RequestEvent, RequestHandler } from '@builder.io/qwik-city';
import { updateEmailSubscription } from '~/services/memberDB';

export const onPost: RequestHandler = async ( ev :RequestEvent ) => {
    try {
        const data = await ev.request.formData();
        const apiData = await updateEmailSubscription(ev, data);
        ev.json(200, apiData); 
    } catch (error) {
        ev.json(500, error); 
    }
};