 
import type { RequestEvent, RequestHandler } from "@builder.io/qwik-city";

import { checkUserNameAvailability } from "~/services/memberDB";

export const onPost: RequestHandler = async (ev: RequestEvent) => {
  
    try {
        const data = await ev.request.json();
        console.log("checkUserNameAvailability_data", data);
        const apiData = await checkUserNameAvailability(ev, data);
        console.log("checkUserNameAvailability", apiData);
        ev.json(200, apiData); 
    } catch (error) {
        ev.json(500, error); 
    }
};
