import type { RequestEvent, RequestHandler } from '@builder.io/qwik-city';
import { validate2ndPin } from '../../../services/memberDB';

export const onPost: RequestHandler = async ( ev :RequestEvent ) => {


    try {
        const formData = await  ev.request.json()
        const apiData = await validate2ndPin(ev, formData);
        ev.json(200, apiData); 

    } catch (error) {
        ev.json(500, error); 
    }
};