 
import {     useContext,  $    } from "@builder.io/qwik";
import { NOTIFICATION_CTX  } from  '~/hooks/context';
export const useNotificationCtx = ( ) => {
  const notificationCtx  = useContext(NOTIFICATION_CTX);

  return {notificationCtx}
}
export const useNotifications = ( ) => {
     
    const {notificationCtx} =   useNotificationCtx();
     const checkNotifications = $(async ()=>{
      const abortController = new AbortController(); 
           
      const res = await fetch(
          "/checkNotifications",
          {
            signal: abortController.signal,
          }
        );
  
        const json = await res.json();
  
        const data = json.d as { memoblinkstate : boolean; inboxCnt : number;  notiCnt : number; } ;
        notificationCtx.inboxCnt = data.inboxCnt;
        abortController.abort(); 
  
        return data;
    })
 return {checkNotifications ,notificationCtx}
};



