import { type RequestHandler } from '@builder.io/qwik-city';
 
export const onGet: RequestHandler = async ({ redirect, url }) => {
    let urlWithParams = url.search;
    if (urlWithParams == '') {
        urlWithParams += '?';   
    } else {
        urlWithParams += '&';
    }
    urlWithParams += 'action=register';
    throw redirect(
        308,
        new URL('/' + urlWithParams, url).toString()
    );
};