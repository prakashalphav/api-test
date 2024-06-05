import type { RequestEvent, RequestHandler } from '@builder.io/qwik-city';


import   { pusherAuth } from '~/services/memberDB';

export const onPost: RequestHandler = async ( ev :RequestEvent ) => {
 

    try {
        const formData = await  ev.request.formData()
        const apiData = await pusherAuth(ev, formData);
        ev.json(200, JSON.parse(apiData.d)); 

    } catch (error) {
        ev.json(500, error); 
    }
};