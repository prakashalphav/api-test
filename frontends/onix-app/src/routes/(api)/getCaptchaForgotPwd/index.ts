
import type { RequestEvent, RequestHandler } from '@builder.io/qwik-city';


import   { getCaptchaForgotPwd } from '~/services/contentDB';

export const onGet: RequestHandler = async ( ev :RequestEvent ) => {
  
 

    try {

      const apiData = await getCaptchaForgotPwd(ev );
      //text/html; charset=UTF-8
  
      
      const response = new Response(apiData.d, {
          status: 200,
          headers: {
            'Content-Type': 'text/plain',
          },
        }); 
   
      ev.send(response); 
    } catch (error) {
        ev.json(500, error); 
    }
};