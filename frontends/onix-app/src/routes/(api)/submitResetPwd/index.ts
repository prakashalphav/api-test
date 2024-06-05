import type { RequestEvent, RequestHandler } from '@builder.io/qwik-city';
import { submitResetPwd } from '../../../services/memberDB';

export const onPost: RequestHandler = async ( ev :RequestEvent ) => {
 

    try {
        const formData = await  ev.request.formData()
        const apiData = await submitResetPwd(ev, formData);
        ev.json(200, apiData); 

    } catch (error) {
        ev.json(500, error); 
    }
};