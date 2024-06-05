import { useResource$, useSignal, type ResourceOptions, $ } from "@builder.io/qwik";
import { priceToFloat } from "~/utils/formatters/priceToFloat";
import { useGamesTransferMenu } from "../business/useGamesTransferMenu";
 
export const useGetBalance = (balance?: string, refBalance?: string) =>{
 
    const actionGetBal = useSignal<boolean|undefined>();
    const actionGetRefBal = useSignal<boolean | undefined>();

    const currentBalance = useResource$<number>(async (ctx) => { 
        ctx.track(()=> actionGetBal.value);        
        const abortController = new AbortController();
        ctx.cleanup(() => abortController.abort('cleanup'));
        
         if(actionGetBal.value){
            const res = await fetch(`/getBalance`);
            const json = await res.json();  
            actionGetBal.value = false; 
           
            const result = priceToFloat(json.d);
            if(Number.isNaN(result)){
                //if original str is only Text then will return NaN , return original the str
                   return json.d;
            }
            console.log('getBal res = ', result); 
            return result;
        }  
        else{
            if(actionGetBal.value === undefined && balance){
                //first time 
                const result = priceToFloat(balance);
                if(Number.isNaN(result)){
                 //if original str is only Text then will return NaN , return original the str
                    return balance;
                }
                console.log('iniital getBal res = ', result);
             return result;
            }
        }
        return ctx.previous;
    }, { } );
    const currentRefBalance = useResource$<number>(async (ctx) => { 
        ctx.track(()=> actionGetRefBal.value);        
        const abortController = new AbortController();
        ctx.cleanup(() => abortController.abort('cleanup'));
        
        if(actionGetRefBal.value){
            const res = await fetch(`/getRefBalance`);
            const json = await res.json();  
            actionGetRefBal.value = false; 
           
            const result = priceToFloat(json.d);
            if(Number.isNaN(result)){
                return json.d;
            }
            return result;
        }  
        else{
            if(actionGetRefBal.value === undefined && refBalance){
                const result = priceToFloat(refBalance);
                if(Number.isNaN(result)){
                    return refBalance;
                }
                return result;
            }
        }
        return ctx.previous;
    }, {});


    return {actionGetBal, currentBalance, actionGetRefBal, currentRefBalance };
}
export const useGetGameBalance = ( ) =>{
    const balanceGameCode = useSignal<string>("");
    
    const actionGameCode = useSignal<string|null>();
    const {showMenu}= useGamesTransferMenu();
    const getHkbBal =$(async()=>{
        const res = await fetch(`/getHkbBal`);
        const json = await res.json();  
        balanceGameCode.value = ""; 
       

        const result =priceToFloat(json.d);
        console.log('getHkbBal res = ', json.d,Number.isNaN(result),result);
        if(Number.isNaN(result)){
            //if original str is only Text then will return NaN , return original the str
            return json.d;
        }
        return priceToFloat(json.d);
    });
const gameBalance = useResource$<number|string>(async (ctx) => { 
    ctx.track(()=> balanceGameCode.value);        
    const abortController = new AbortController();
    ctx.cleanup(() => abortController.abort('cleanup'));
    if(balanceGameCode.value.indexOf("hkb")!=-1){
     return  await getHkbBal();
    }  
    
    return ctx.previous;
}, { } );
const hkbBalance = useResource$<number|string>(async (ctx) => { 
    ctx.track(()=> { if(actionGameCode.value){
        return actionGameCode.value
    }
    return  showMenu.value ===true;
 
});   

    console.log('hkbBalance',actionGameCode.value,showMenu.value );
    if(showMenu.value || (actionGameCode.value && actionGameCode.value.indexOf("hkb") != -1 )){
        const result=   await getHkbBal();
          actionGameCode.value= null;
          console.log('hkbBalance get', result);

          return result;
    }
   
    return ctx.previous;
}, { } );
return {balanceGameCode, gameBalance, hkbBalance ,actionGameCode} ;
}
 