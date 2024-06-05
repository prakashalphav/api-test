 
import type { RequestEvent, RequestHandler } from "@builder.io/qwik-city";

import { checkWalletAmount } from "~/services/memberDB";

export const onPost: RequestHandler = async (ev: RequestEvent) => {
  
    try {
        const data = await ev.request.json();
        // console.log("checkWalletAmt_data", data);
        const apiData = await checkWalletAmount(ev, data);
        // console.log("checkWalletAmt", apiData);
        ev.json(200, apiData); 
    } catch (error) {
        ev.json(500, error); 
    }
};
