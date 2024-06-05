import type { RequestEvent, RequestHandler } from "@builder.io/qwik-city";

import { getProviderGames } from "~/services/memberDB";

export const onPost: RequestHandler = async (ev: RequestEvent) => {
  

    try {

        const json = await ev.request.json();
        console.log("getProviderGames", json)
        const apiData = await getProviderGames(ev, json);
        ev.json(200, apiData);
    } catch (error) {
        ev.json(500, error); 
    }
};
