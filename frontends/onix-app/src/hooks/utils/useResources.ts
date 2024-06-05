import {   type Signal, useResource$ } from "@builder.io/qwik";
import type { RegisterWalletData } from "~/services/types";

export const useAddFundAccResource= (showAddFundAccModal :Signal<boolean>, isActivateReferral: boolean)=>{
    const addFundAccResource = useResource$<RegisterWalletData>(async (ctx) => {
        ctx.track(() => showAddFundAccModal.value);
      const abortController = new AbortController();
      ctx.cleanup(() => abortController.abort("cleanup1"));
    
      if(showAddFundAccModal.value){
          const res = await fetch(
              "/getRegisterFundAcc?is_activate_referral=" + (isActivateReferral ? "1" : "0"),
             {
               signal: abortController.signal,
             }
           );
     
           const json = await res.json();
     
           const data = json.d as RegisterWalletData;
           
           console.log('addFundAccResourceuseResource', data);
           return data;
      }
    
    
      return  ctx.previous;
    
    });

    return {addFundAccResource}
}
 