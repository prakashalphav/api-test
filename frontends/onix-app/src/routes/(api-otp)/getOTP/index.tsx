import type { RequestEvent, RequestHandler } from '@builder.io/qwik-city';
import { getOTP } from "~/services/memberDB";

export const onPost: RequestHandler = async (ev: RequestEvent) => {
    try {
        const formData = await  ev.request.json()
        const apiData = await getOTP(ev, formData);
        // console.log('getotp', apiData);
        ev.json(200, apiData); 
    } catch (error) {
        // console.log('error getotp', error);
        ev.json(500, error); 
    }
};