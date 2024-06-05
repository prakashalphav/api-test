
import type { RequestEvent, RequestHandler } from '@builder.io/qwik-city';


import   { logout } from '../../services/contentDB';

export const onGet: RequestHandler = async ( ev :RequestEvent ) => {
    
    await logout(ev);
    throw ev.redirect(302,"/")

};