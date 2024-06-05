import type { ApiData, ValidateResult } from "~/services/types";
import { isFunction ,isPromise,isString} from "./common";
import { priceToFloat} from "./formatters/priceToFloat";
import type { QRL } from "@builder.io/qwik";
import { $,   } from "@builder.io/qwik"; 
import {inlineTranslate } from "qwik-speak"; 
export const userNamePattern = "^[a-zA-Z0-9]+$";
export const emailPattern =  "^\\S+@\\S+\\.\\S+$";
export const mobileNoPattern   =  "^[0-9]+$";
export const accNoPattern   =  "^[0-9]+$";
//Remove pwdPattern , get from commonViewData
// export const pwdPattern =  "^[A-Za-z\\d!@#$%^&*()_+]{8,20}$"

export type ValidationRule<T>= {
   rule : T, 
   message? : string|undefined|null
}
 


export type ValidationRules = {
  required  : ValidationRule< boolean |QRL<()=>boolean>> ,
  minLength? : ValidationRule<  number | QRL<(()=>number)> >|undefined
 ,
  maxLength? :ValidationRule<   number | QRL<(()=>number)>> |undefined,
  pattern? : ValidationRule<  string | QRL<(()=>string)>> |undefined ,
  remote? : ValidationRule<QRL<(value:FormDataEntryValue)=>Promise<ValidateResult>>> |undefined ,
  number? : ValidationRule<boolean>,
  min?  : ValidationRule< number | QRL<(()=>number)>> |undefined, //to use min or max must have "number" rule
  max?  : ValidationRule<  number | QRL<(()=>number)>> |undefined, //to use min or max must have "number" rule
};

 
export const getRuleValue = async <T>( item : ValidationRule<T>)=>{
  let ruleValue ;
  if( isPromise(item.rule)){
      ruleValue= await item.rule();
  }
  // else if(isFunction(item.rule)){
  //   ruleValue=   item.rule();
  // }
  else {
    ruleValue= item.rule;
  }

  return ruleValue;
}


export const validateRequired  = async  ( value: FormDataEntryValue,requiredRule: ValidationRule<boolean | QRL<()=>boolean>> )=>{

  if (requiredRule) {
      const required = await getRuleValue(requiredRule);

      if (required && !value) {
          return requiredRule.message || "Value is required";
      }
  }

  return true;
}
export const validateField  = async (value : FormDataEntryValue , rules :  ValidationRules   )=>{
  const t= inlineTranslate();
  
  let ruleItem = rules.required;
  
  const  _requiredResult = await validateRequired(value ,ruleItem);
  if(_requiredResult!== true){
    //if failed then return
    return _requiredResult;
  }

  //if empty and not required then stop checking
  if(!value){
    return true;
  }
 
  if(isString(value)){
    const len = value.length; 
    ruleItem = rules.minLength;
    if(ruleItem){ 
      const minLength  = await getRuleValue(ruleItem);
 
      if(len < minLength){

        return ruleItem.message || (t( 'app._2@@Min characters is {{minLength}}'  , { minLength: minLength}))
        //`Min characters is ${minLength}`
      }
    }

    ruleItem = rules.maxLength;
    if(ruleItem){ 
      const maxLength  =await getRuleValue(ruleItem);
 
      if(len > maxLength){
        return ruleItem.message ||(t( 'app._3@@Length exceeded. Max characters is  {{maxLength}}'  , {
          maxLength: maxLength
        }));
        // `Length exceeded. Max characters is  ${maxLength}`
      }
    }

    ruleItem = rules.pattern;
    if(ruleItem){ 
 
      const pattern  = await getRuleValue(ruleItem);
      // due to pattern is a string
      // Remove leading and trailing slashes 
      const patternStr = pattern.replace(/^\/|\/$/g, '');
      const regex = new RegExp(patternStr);
      if(!regex.test(value)){
        return ruleItem.message ||(t( 'app._4@@Pattern not matched'  ));
        // "Pattern not matched"
      }
    } 
  }
 
  ruleItem = rules.number;
  if (ruleItem) {
      const isNumber = await getRuleValue(ruleItem);
     
      if(isNumber){
          let numValue = NaN;
          if(isString(value) ){ 
              numValue =  priceToFloat(value);
          }
          else {
              // make whatever value it is a NaN
              numValue = parseFloat(value);
          } 
          if(isNaN(numValue)){
              return ruleItem.message || (t( 'app._5@@The value must be a number'  ));
              //`The value must be a number`;
          } 

          ruleItem = rules.min;
         
          if(ruleItem){
            const min = await getRuleValue(ruleItem);
            if( min && numValue < min){
                return ruleItem.message ||  (t( 'app._6@@The value must be more than {{min}}' , {
                  min :min
                } ));

               // `The value must be more than ${min}`;
            } 
          }
          ruleItem = rules.max;
        
          if(ruleItem){
            const max = await getRuleValue(ruleItem);
            if( !isNaN(max) && numValue > max){
                return ruleItem.message ||(t( 'app._7@@The value must be less than {{max}}'  , {
                  max :max
                } ));
                 //`The value must be less than ${max}`;
            } 
          }
      } 

  }


  ruleItem = rules.remote as ValidationRule< (value:FormDataEntryValue)=>Promise<ValidateResult>> |undefined ;
  if(ruleItem){
    console.log( "validateTextInput",value);
    const result = await ruleItem.rule(value);
    if(result!==true){ 
      return  (result? result : ruleItem.message);
    }
  }

  return true;
};

export const remoteChkEmailQRL = $((value:string) : Promise<ValidateResult>=>{
  const controller = new AbortController();
  return new Promise( (resolve, reject)=>{

    fetch("/checkExistingEmail/" , {
      signal: controller.signal,
      body: JSON.stringify({email :value }),
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",  
      }, 
    })
    .then((response) => response.json())
    .then((json : ApiData<ValidateResult> ) => { 
      console.log('checkExistingEmail_remote',    json )  
      resolve(( json.type === "f" ? json.message   : null) || json.d||false)  
    })
    .catch((error) => {
          
      console.log('checkExistingEmail_remote error', JSON.stringify(error));

      resolve(JSON.stringify(error))
     })
     .finally(() => { 
      controller.abort(); // Abort the request
      // Clean up any other resources associated with the request
     });
  })  
})
export const  remoteChkUserNameQRL  = $((value:string) : Promise<ValidateResult>=>{

  
    const controller = new AbortController();
    return new Promise( (resolve, reject)=>{

      fetch("/checkUserNameAvailability/" , {
        signal: controller.signal,
        body: JSON.stringify({user_name :value }),
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",  
        }, 
      })
      .then((response) => response.json())
      .then((json : ApiData<ValidateResult> ) => { 
        console.log('checkUserNameAvailability_remote',    json )  
        resolve(( json.type === "f" ? json.message   : null) || json.d||false)  
      })
      .catch((error) => {
            
        console.log('checkUserNameAvailability_remote error', JSON.stringify(error));

        resolve(JSON.stringify(error))
       })
       .finally(() => { 
        controller.abort(); // Abort the request
        // Clean up any other resources associated with the request
       });
    })  
     
  })


  export const remoteChkMobileNoQRL = $((value:string) : Promise<ValidateResult>=>{
    const controller = new AbortController();
    return new Promise( (resolve, reject)=>{
  
      fetch("/checkExistingMobile/" , {
        signal: controller.signal,
        body: JSON.stringify({mobile_no :value }),
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",  
        }, 
      })
      .then((response) => response.json())
      .then((json : ApiData<ValidateResult> ) => { 
        console.log('checkExistingEmail_remote',    json )  
        resolve(( json.type === "f" ? json.message   : null) || json.d||false)  
      })
      .catch((error) => {
            
        console.log('checkExistingEmail_remote error', JSON.stringify(error));
  
        resolve(JSON.stringify(error))
       })
       .finally(() => { 
        controller.abort(); // Abort the request
        // Clean up any other resources associated with the request
       });
    })  
  })

export const remoteChkWdAmtQRL = $((amount: string, walletType: string) : Promise<ValidateResult>=>{
  const controller = new AbortController();
  return new Promise( (resolve, reject)=>{

    fetch("/checkWalletAmount/" , {
      signal: controller.signal,
      body: JSON.stringify({amount: amount, wallet_type: walletType}),
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",  
      }, 
    })
    .then((response) => response.json())
    .then((json : ApiData<ValidateResult> ) => { 
      // console.log('checkWalletAmt_remote',    json )  
      resolve(( json.type === "f" ? json.message   : null) || json.d||false)  
    })
    .catch((error) => {
          
      // console.log('checkWalletAmt_remote error', JSON.stringify(error));

      resolve(JSON.stringify(error))
     })
     .finally(() => { 
      controller.abort(); // Abort the request
      // Clean up any other resources associated with the request
     });
  })  
})
