import type { RequestEvent, RequestHandler } from '@builder.io/qwik-city';
import { verifyOTP } from "~/services/memberDB";

export const onPost: RequestHandler = async ( ev :RequestEvent ) => {
    try {
        const formData = await  ev.request.json()
        // const formData = await  ev.request.formData()
        const apiData = await verifyOTP(ev, formData);
        console.log('verifyOtp', apiData);
        ev.json(200, apiData); 
    } catch (error) {
        ev.json(500, error); 
    }
};