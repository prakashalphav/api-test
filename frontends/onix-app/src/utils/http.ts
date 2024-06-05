  
import type { HttpResponse} from '../services/types';
//import dns from "node:dns"; 
import { log } from './log';
 
export async function httpGet<T>(
    baseURL: string,
    path: string,
    params: Record<string, string>  = {},
    headers :  Record<string, unknown> | null = null, 
    method: 'GET'|'CACHE' = 'GET', 
    contentType :string = "json",
): Promise<HttpResponse<T|null>>{
 
    contentType === "image" &&
    (contentType = "image/jpeg");
    contentType === "json" && (contentType = "application/json"); 
    contentType === "text" && (contentType = "text/plain"); 
    
    const  query = new URLSearchParams({
        ...params
   });
   console.log("fetch get path", path);
   console.log("fetch get query", query);
    const url = `${baseURL}/${path}?${query}`;
    const options: any = {
        method: method,
        headers: {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest", 
            // LANG: lang?.value ?? "en",
            ...headers
        }, 
        mode: "cors", //allow cross origin requests that adhere to CORS protocol, laravel API will enforce the CORS protocol
        cache: "default",
    };

    try {
        const resp = await fetch(url, options);
    //    console.log(url, '---------')
    //    console.log(options, '---------', resp)
        return respHandle(resp,path,url);
    } catch (err) { 
        return onNetworkErr(url, err as NetworkError );
    } 
}


export async function httpPost<T>(
    baseURL: string,
    path: string,
    params: Record<string, unknown> |FormData  = {},
    headers :  Record<string, unknown> | null = null, 
    method: 'POST'|'PUT' = 'POST', 
    contentType : string = "form" ,
) : Promise<HttpResponse<T|null>>{

 
   contentType === "form" &&
   (contentType = "application/x-www-form-urlencoded");
 contentType === "json" && (contentType = "application/json");
 contentType === "file" && (contentType = "multipart/form-data");
//  dns.setDefaultResultOrder('ipv4first');
  
 const isFormData= params instanceof FormData;
  let postData: any = null;
  if (contentType === "application/json") {
    postData = JSON.stringify(params);
 } else if(isFormData){
    postData =params; 
  } 
  else { 
    // contentType === "application/x-www-form-urlencoded"
    const formData = new URLSearchParams();
    for (const key in params) {
        if (Object.prototype.hasOwnProperty.call(params, key)) {
            const element = params[key];
            if(typeof element == "string"){
                formData.append(key, element);
            } 
        }
    } 
    postData = formData.toString();
    // console.log('contentType', postData);
  }
 
    const url = `${baseURL}/${path}`;
    const options: any = {
        method: method,
        headers: { 
            "X-Requested-With": "XMLHttpRequest", 
            // LANG: lang?.value ?? "en",
            ...headers
        },
        //credentials: "same-origin", //only same origin as calling script will send cookies to (is default ald)
        mode: "cors", //allow cross origin requests that adhere to CORS protocol, laravel API will enforce the CORS protocol
        cache: "default",
    };

   
    if (postData) {
        options.body = postData;
    }

    if(!isFormData){
        //FormData ald does it 
        options.headers[ 'Content-Type'] = contentType;
        options.headers[ 'Content-Length'] =Buffer.byteLength(postData);
      
    }
     //To remove - Test
    //console.log("http options" ,options);
    if(path === 'login'){
        log("http options" ,options);
        log("http url" ,url);
    }

    try {
        const resp = await fetch(url, options);
        return respHandle(resp,path,url);
    } catch (err  ) { 
        return onNetworkErr(url, err as NetworkError );
    } 
}
type NetworkError = {
 response : Response,

}

const onNetworkErr = (url : string,err: NetworkError)=>{
 
    // console.error('onNetworkErr', err);
    log("respHandle onNetworkErr text",  err);
    const respData : HttpResponse<null> = {  data :  {d : null ,  type  : "f" , message :  
    ( `${url} === ${"The server encountered a little problem" }`) , title: "Request failed"}, status :   500  };
 
    if ((err + "").indexOf("timeout") > -1) {
        respData.data.title="Request timed out";
        respData.data.message =  `${url} === ${"Maybe the current network is slow" }`;
    }
    return respData;
}
async function respHandle<T>(resp : Response,path : string, url:string) : Promise<HttpResponse<T>>{

    const contentType = resp.headers.get("content-type");

   //  console.log('respHandle', resp.headers.get('Set-Cookie') ); 

    const cookies = resp.headers.get('Set-Cookie') ; 
    
    const metadata = { timestamp: Date.now() }; 
    const respData : HttpResponse<T>= {  data :  {  d : null , status : resp.status } , status  : resp.status ,  
    cookies : cookies, metadata : metadata  };
  
  

    if (contentType && contentType.indexOf("json") >= 0) {
         const json  = await resp.json();  
         if(path == 'login')
         log("respHandle resp",  json);
        //  if(url == 'login'){
        //     console.log('respHandle json', json);
        //  }
        //  The Promise returned from fetch() won't reject on HTTP error status even if the response is an HTTP 404 or 500. Instead, it will resolve normally (with ok status set to false), and it will only reject on network failure or if anything prevented the request from completing.
         if (resp.ok) {  //if 404 or 500 will return false
 
             
            if( json.data !== undefined || json.m !== undefined || json.message !==undefined){
                const { data , action, redirectUrl, s : status , m : message   , title } = json;
                respData.data.d = data;
                respData.data.action= action;
                respData.data.redirectUrl= redirectUrl;
                respData.data.type =status;
                respData.data.title =title;
                respData.data.message =  message ?  message :json.message;
               
                
            } 
            else {
                respData.data.d=json;
                respData.data.type = "s";
            }
        }
        else {
              //errorHandle

              
            respData.data.message = ''; // `${url} === (StatusText : ${resp.statusText|| ""} ) `;
            respData.data.title =  json.title;//"Failed";
            respData.data.type =   json.s;//"f" ;
          
            if(json.message){
                respData.data.message += json.message;
            }  

            if(json.error){
                respData.data.code = json.error;
            }
            if (json.errors) {
                console.log(path + ' json.errors', json.errors);
                respData.data.message  += "\n";
                for (const key in json.errors) {
                    respData.data.message += json.errors[key][0] + "\n";
                }
           }
        }
        
    }
    else if(contentType && contentType.indexOf("image") >= 0){
        const blob =await resp.blob();
        if(path == 'login')
        log("respHandle blob",  blob);
        if (resp.ok) {    //if 404 or 500 will return false
            respData.data.type = "s";
            respData.data.d=  blob  as T;
       }
       else {
           //errorHandle
         
           respData.data.message  =   `${url} === (StatusText Blob : ${resp.statusText|| ""} ) ${blob}  `;
           respData.data.title  =  "Failed";
           respData.data.type  =  "f"; 
              
       }
    }
    else {
      
        const text =await resp.text();
        if(path == 'login')
        log("respHandle text",  text);
        console.log('respHandle text', text);
     
        if (resp.ok) {    //if 404 or 500 will return false
             respData.data.type = "s";
             respData.data.d= text as T;
        }
        else {
            //errorHandle
           
            respData.data.message  = `${url} === (StatusText text : ${resp.statusText|| ""} ) ${text}  `;
            respData.data.title  =  "Failed";
            respData.data.type  =  "f"; 
               
        }
    }
 
    return respData   ;

} 
 