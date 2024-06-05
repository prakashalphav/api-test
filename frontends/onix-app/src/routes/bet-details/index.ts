
import { routeLoader$, type RequestEvent, type RequestHandler } from '@builder.io/qwik-city';
import { Resource, component$, } from '@builder.io/qwik'; 

import   { getPlayerBetDetails} from '~/services/contentDB';
 
export const onGet: RequestHandler = async ( ev :RequestEvent ) => {
  try {

    const apiData = await getPlayerBetDetails(ev );
    //text/html; charset=UTF-8

    
    const response = new Response(apiData.d, {
        status: 200,
        headers: {
          'Content-Type': 'text/html; charset=UTF-8',
        },
      }); 
 
    ev.send(response); 
  } catch (error) {
      ev.json(500, error); 
  }
};
 