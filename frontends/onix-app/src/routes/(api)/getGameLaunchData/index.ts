 
import type { RequestEvent, RequestHandler } from "@builder.io/qwik-city";
 
import {getSubGamesData} from '../../../services/contentDB';
import type { LaunchLobbyGameParams } from "~/services/types";

export const onPost: RequestHandler = async (ev: RequestEvent) => {
  
    try { 

        const params = await ev.request.json()  as LaunchLobbyGameParams;
        //const path  = ev.pathname.substring(ev.basePathname.length); // 'slots/toptrend-gaming'

        
        const data = await getSubGamesData(ev, params); 
        console.log("getSubGamesData", data);
        ev.json(200, data); 
    } catch (error) {
        
        ev.json(500, error); 
    }
};
