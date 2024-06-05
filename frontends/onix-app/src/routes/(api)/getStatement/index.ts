import type { RequestEvent, RequestHandler } from "@builder.io/qwik-city";

import { getStatement } from "~/services/memberDB";

export const onPost: RequestHandler = async (ev: RequestEvent) => {
 


    try {

        const json = await ev.request.json();
    
        const apiData = await getStatement(ev, json);
        ev.json(200, apiData);
    } catch (error) {
        ev.json(500, error); 
    }
};
