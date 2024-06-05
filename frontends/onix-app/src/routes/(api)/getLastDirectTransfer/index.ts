import type { RequestEvent, RequestHandler } from "@builder.io/qwik-city";

import { getLastDirectTransfer } from "~/services/memberDB";

export const onGet: RequestHandler = async (ev: RequestEvent) => {
  
    try {

        const json = await ev.request.json();
    
        const apiData = await getLastDirectTransfer(ev, json);
        ev.json(200, apiData);
    } catch (error) {
        ev.json(500, error); 
    }
};
