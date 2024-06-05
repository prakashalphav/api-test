 
import type { RequestEvent, RequestHandler } from "@builder.io/qwik-city";

import { checkExistingMobile } from "~/services/memberDB";

export const onPost: RequestHandler = async (ev: RequestEvent) => {
  
    try {
        const data = await ev.request.json();
        console.log("checkExistingMobile_data", data);
        const apiData = await checkExistingMobile(ev, data);
        console.log("checkExistingMobile", apiData);
        ev.json(200, apiData); 
    } catch (error) {
        ev.json(500, error); 
    }
};
