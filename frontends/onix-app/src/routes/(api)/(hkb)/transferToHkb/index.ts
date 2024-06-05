
import type { RequestEvent, RequestHandler } from '@builder.io/qwik-city';


import   { transferToHkb} from '~/services/memberDB';

export const onPost: RequestHandler = async ( ev :RequestEvent ) => {

    try {

      const formData = await ev.request.json()
      const apiData = await transferToHkb(ev ,formData);
      ev.json(200,apiData); 
    } catch (error) {
        ev.json(500, error); 
    }
  };