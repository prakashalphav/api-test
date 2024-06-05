
import type { RequestEvent, RequestHandler } from '@builder.io/qwik-city';
import { getRefBalance } from '~/services/contentDB';

export const onGet: RequestHandler = async ( ev :RequestEvent ) => {
  try {
    const apiData = await getRefBalance(ev );
    ev.json(200,apiData); 
  } catch (error) {
    ev.json(500, error); 
  }
};