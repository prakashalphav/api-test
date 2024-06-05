
import type { RequestEvent, RequestHandler } from '@builder.io/qwik-city';


import   { getCaptcha } from '../../services/contentDB';

export const onGet: RequestHandler = async ( ev :RequestEvent ) => {
  
    const apiData = await getCaptcha(ev );
    //text/html; charset=UTF-8

    
    const response = new Response(apiData.d, {
        status: 200,
        headers: {
          'Content-Type': 'text/plain',
        },
      }); 
 
    ev.send(response); 
};