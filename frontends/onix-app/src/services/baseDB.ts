import {   type RequestEventCommon ,  type Cookie} from '@builder.io/qwik-city'; 
import type { HttpResponse} from './types';
import SetCookieParser from 'set-cookie-parser';
export const getBaseURL = ()=>{

  return process.env.NODE_ENV  === "local"? 'http://127.0.0.1:8050' :(  globalThis.apiHost ?  globalThis.apiHost  : "http://172.31.37.64:8097") ;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function getApiReqHeaders(  ev  :RequestEventCommon,apiPath :string){

  console.log('apiPath',apiPath);
    // console.log('response Headers', ev.headers ); 
    // console.log('req headers',  ev.request.headers ); 
    // console.log('req cookie',  ev.request.headers.get('cookie') ); 
 
    console.log("globalThis.apiHost getApiReqHeaders", globalThis.apiHost);
    // console.log("baseURL getApiReqHeaders", baseURL );
    
    // console.log('fetchCT ev before reqcookies ' + apiPath ,ev.cookie.getAll())
    // console.log('fetchCT ev before respcookies ' + apiPath ,ev.cookie.headers())
    
    const apiReqCookie=  getApiReqCookieStr(ev.cookie ,ev.locale());
    // console.log( 'fetchCT ev before apiReqCookie ', apiReqCookie);

     const xApiKey = ev.request.headers.get('x-api-key');
    const apiReqHeaders  = {
        'x-api-key' :  process.env.NODE_ENV  === "local" || !xApiKey ? "YaWRAG3lRD" : xApiKey ,
        'd-key' : getAgentId(ev),  //'IWGAAGN'  , 'IAAAAAA'  'IABAAAA' 'CABAAAE' ,  //'EABAAAA', // 
     
        'version' : 'V2',
        'user-agent' : ev.request.headers.get('user-agent'),
        'accept' :'application/json',
        'cookie' : apiReqCookie,
        "X-XSRF-TOKEN":  ev.cookie.get('XSRF-TOKEN')?.value,  
        "X-Forwarded-For": globalThis.clientIp,
        "X-Forwarded-Host": globalThis.host,
        "X-Forwarded-Proto": globalThis.protocol,
    };
    console.log('apiReqHeaders',apiReqHeaders);
    return apiReqHeaders;
     
}
export const getAgentId = ( ev  :RequestEventCommon)=>{
 return  process.env.NODE_ENV  === "local"? 'IABAAAA':  ev.request.headers.get('agentid')
}

export const getApiReqCookieStr= ( reqEventCookie : Cookie, currLang: string) =>{
    let strCookie= "";
    const respCookies = reqEventCookie.headers();
    
    const sessionKeys = [
      import.meta.env.VITE_SESSION_COOKIE?   import.meta.env.VITE_SESSION_COOKIE:  'stgonixgaming',
        'XSRF-TOKEN', 'req_lang',
    ];
    console.log('getApiReqCookieStr respCookie and locale' ,respCookies ,currLang);
    sessionKeys.map((key) => {
       let isKeyFound = false; 
   
      //Get from response COOKIES FIRST 
      respCookies.map(( respCookie) => {
         //--> where respCookie :  'XSRF-TOKEN=yyy; Max-Age=7200; Path=/; SameSite=Lax'
       
        const regex = new RegExp(`^${key}=([^;]+)`);

        const match = regex.exec(respCookie);
        if (match) {
          const keyValue = decodeURIComponent( match[1]); // --> keyValue output : 'yyy'
          //console.log(`${key}=${keyValue}`); 

          if(strCookie){
              strCookie +=";";
          } 
          strCookie  += `${key}=${keyValue}`;
          console.log('getApiReqCookieStr respCookie', key ,strCookie);
          isKeyFound= true;
        }   

      })
    
      if(!isKeyFound){
        //If not found, then get from req Cookies
        const reqCookie =  reqEventCookie.get(key);
        console.log('getApiReqCookieStr req Cookies' ,key, reqCookie);
        if(reqCookie){ 
          if(strCookie){
            strCookie +=";";
         }
         if( key == 'req_lang'){
          //at plugin.ts ald get and set the current lang
          // send current lang to api using req_lang cookie
          // api will return the same req_lang value
          strCookie +=  `${key}=${currLang}`;
         }
         else {
          strCookie +=  `${key}=${reqCookie.value}`;
         }
        
        }
        
      }
    })
    

    return strCookie;
  }

 

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  export function setReqEventCookies(req  :RequestEventCommon, apiResponse:HttpResponse, apiPath :string){

    // apiResponseCookie = XSRF-TOKEN=xxxx; expires=Thu, 02-Mar-2023 02:34:09 GMT; Max-Age=7200; path=/; secure; samesite=lax, Session=yyyyy;expires=Thu, 02-Mar-2023 02:34:09 GMT; Max-Age=7200; path=/; secure; httponly; samesite=lax
    console.log('setReqEventCookies apiResponse.cookies',apiResponse.cookies  )
    if(apiResponse.cookies ){
        //ev.headers.set('Set-Cookie' ,apiResponse.cookies);
        req.headers.delete('Set-Cookie');
        req.headers.delete('set-cookie');

        //Method 1 : this works after using uppercase. but it doesn't work for multiple cookies. 
        //ev.headers.set('Set-Cookie' ,apiResponse.cookies);

        // Method 2 :  
        SetCookieParser.splitCookiesString(apiResponse.cookies).forEach((cookie) => {
        const { name, value, ...options } = SetCookieParser.parseString(cookie);
        // console.log(name, value ,options);
        req.cookie.set(name, value, options as any);
        console.log('setReqEventCookies apiResponse.cookies set',name, value ,options )
        }); 

        // console.log('fetchCT ev after setApiRespCookies reqEvent resp cookies' + apiPath ,req.cookie.headers())
    }
  }