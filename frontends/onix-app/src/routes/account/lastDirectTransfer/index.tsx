
import type { RequestEvent, RequestHandler } from '@builder.io/qwik-city';

 
export const onGet: RequestHandler = async ( ev :RequestEvent ) => {
  
  
  throw ev.redirect(
    302,
    new URL(`/lastDirectTransfer`, ev.url).toString()
  );
 };