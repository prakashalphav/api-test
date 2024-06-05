import type { RequestEvent, RequestHandler } from '@builder.io/qwik-city';
import { submitActivateReferral } from '~/services/memberDB';

export const onPost: RequestHandler = async ( ev :RequestEvent ) => {
    try {
        const formData = await ev.request.formData();
        console.log('test', formData);
        const apiData = await submitActivateReferral(ev, formData);
        console.log('test', formData);
        ev.json(200, apiData); 
    } catch (error) {
        ev.json(500, error); 
    }
};