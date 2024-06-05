
import type { RequestEvent, RequestHandler } from '@builder.io/qwik-city';


import   { launchGame} from '../../../services/contentDB';

export const onGet: RequestHandler = async ( ev :RequestEvent ) => {

  
    const apiData = await launchGame(ev  );
    ev.json(200,apiData); 
    apiData.d.launch_url
    

    ev.redirect
  };