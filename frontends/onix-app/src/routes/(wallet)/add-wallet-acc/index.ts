
import type { RequestEvent, RequestHandler } from '@builder.io/qwik-city';


import { addWalletAcc } from "~/services/memberDB";


export const onPost: RequestHandler = async ( ev :RequestEvent ) => {
   

    try {
        const formData = await  ev.request.formData()
        console.log('addWalletAcc', formData);
        const apiData = await addWalletAcc(ev, formData);
        console.log('addWalletAcc', apiData);
        ev.json(200, apiData); 

    } catch (error) {
        ev.json(500, error); 
    }
};