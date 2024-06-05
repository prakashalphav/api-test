
import {httpPost  } from '../utils/http';
import type {   ApiData, GetPlayerReportParams, LastDirectTransferResult, TransferToGameResult, UserBank, ValidateResult} from './types';
import { log } from '~/utils/log';
import {   type RequestEventCommon  } from '@builder.io/qwik-city';

import { getApiReqHeaders ,  getBaseURL,  setReqEventCookies} from './baseDB';
import { isServer } from '@builder.io/qwik/build';
import type { ProviderGamesFilters } from '~/hooks/business/useGameList';
// const isServer = import.meta.env.SSR;
export const postData = async <T = unknown>(
    ev  :RequestEventCommon,
    path: string,
    params: Record<string, unknown>  | FormData   = {}, 
    popUpMsg : boolean = false,
    contentType : string = 'form'
  ): Promise<ApiData<T|null>> => {
  
    const apiReqHeaders = getApiReqHeaders(ev, path );
    if(path == "login")
    log("postData apiReqHeaders",  apiReqHeaders);
   
    const baseURL = getBaseURL();
    const apiResponse = await httpPost<T|null>(baseURL,path ,params ,apiReqHeaders, "POST", contentType ); 
    if(path == "login")
    log("postData resp",  apiResponse);

    //console.log('apiResponse ' , path,apiResponse.data.d.merchant_id); 
    if (apiResponse.status != 200 ) { 
         
      return  Promise.reject(apiResponse.data);
  } 
    // console.log('apiResponse.cookies ',  apiResponse.cookies );
    setReqEventCookies(ev  , apiResponse, path )
    
    return apiResponse.data ; 
   
  };

  export const login = (ev :RequestEventCommon, formData:  FormData )=>{
 console.log('formData' , formData)
     return postData<null>(ev,  "login", formData,false );
  }
  export const validate2ndPin = (ev :RequestEventCommon, formData:  Record<string,unknown> )=>{
    console.log('formData' , formData)
        return postData<null>(ev,  "validate-pin", formData,false, "json" );
  }
  export const setup2ndPin = (ev :RequestEventCommon, formData:  Record<string,unknown> )=>{
    console.log('formData' , formData)
        return postData<null>(ev,  "setup-pin", formData,false, "json" );
  }
  
  export const register = (ev :RequestEventCommon, formData:  FormData)=>{
 
        return postData<null>(ev,  "submitregister", formData,false );
  }
  export const submitComplaint = (ev :RequestEventCommon, formData:  FormData)=>{
 
    return postData<null>(ev,  "submit-complainform", formData,false );
}
export const submitForgotPwd = (ev :RequestEventCommon, formData:  FormData)=>{
 
  return postData<null>(ev,  "apply-resetpwd", formData,false );
} 
export const submitResetPwd = (ev :RequestEventCommon, formData:  FormData)=>{
 
  return postData<null>(ev,  "reset-password", formData,false );
} 
  export const changePassword = (ev :RequestEventCommon, formData:  FormData)=>{
    // console.log('formData' , formData)
    return postData<null>(ev,  "chg-pass", formData, false );
  }
  export const checkBonusEvent = (ev :RequestEventCommon, formData:  FormData)=>{
    // console.log('formData' , formData)
    return postData<null>(ev,  "checkBonusEvent", formData, false );
  }
  export const applyBonusEvent = (ev :RequestEventCommon, formData:  FormData)=>{
    // console.log('formData' , formData)
    return postData<null>(ev,  "applyBonusEvent", formData, false );
  }
  export const checkBonusHistory = (ev :RequestEventCommon, formData:  FormData)=>{
    // console.log('formData' , formData)
    return postData<null>(ev,  "checkBonusHistory", formData, false );
  }
  export const getStatement = (ev :RequestEventCommon, formData:  {transaction_type  : number , start_date : string , end_date:string})=>{
    console.log('formData' , formData)
    return postData<null>(ev,  "getStatement", formData, false,"json" );
  }
  export const getReferralDownline = (ev :RequestEventCommon, formData:  FormData)=>{
    // console.log('formData' , formData)
    return postData<null>(ev,  "getReferalDownline", formData, false );
  }
    
 
 //add-wallet-acc
  export const addWalletAcc = (ev :RequestEventCommon, formData:  FormData)=>{
 
    return postData<UserBank[]>(ev,  "add-user-bank", formData,false );
}
 

export const update2ndPinFlag = (ev: RequestEventCommon, formData:  FormData) => {
  // console.log('formData' , formData)
  return postData<null>(ev, "ajaxUpdate2ndPinFlag", formData, false);
};
export const updateEmailSubscription = (ev: RequestEventCommon, data: {is_email_subscription: number}) => {
  return postData<null>(ev, "ajaxUpdateEmailSubscription", data, false);
};
export const storeDeposit = (ev :RequestEventCommon, formData:  FormData)=>{
 
  return postData<null>(ev,  "deposits_store", formData,false );
}
export const storeDepositGateway = (ev :RequestEventCommon, formData:  FormData)=>{
 
  return postData<null>(ev,  "gatewaystore", formData,false );
}
export const applyPromo = (ev :RequestEventCommon, formData:   {select_name : string, is_promo_code: boolean} )=>{ 
      return postData<ApplyPromoDetails>(ev,  "promo_details", formData,false, "json" );
}
export const storeWithdraw = (ev :RequestEventCommon, formData:  FormData)=>{
 
  return postData<null>(ev,  "withdraw-submit", formData,false );
}



export const checkUserNameAvailability = (ev :RequestEventCommon, data: {user_name:string} )=>{
 
  return postData<ValidateResult>(ev,  "checkUserNameAvailability", data,false );
}
export const checkExistingEmail = (ev :RequestEventCommon, data: {email:string} )=>{
 
  return postData<ValidateResult>(ev,  "checkExistingEmail", data,false );
}
export const checkExistingMobile = (ev :RequestEventCommon, data: {mobile_no:string} )=>{
 
  return postData<ValidateResult>(ev,  "checkExistingMobile", data,false );
}
export const checkWalletAmount = (ev :RequestEventCommon, data: {amount: string} )=>{
 
  return postData<ValidateResult>(ev, "checkWalletAmount", data, false );
}


export const updateMemoStatus = (ev :RequestEventCommon, formData:  FormData)=>{
  // console.log('formData' , formData)
  return postData<null>(ev,  "update-memo-status", formData, false );
}


export const getPlayerReport  = (ev :RequestEventCommon ,formData :    GetPlayerReportParams )=>{
 
  return  postData<any>(ev, "player_report" ,formData, true, "json" ) ;
}
export const pusherAuth = (ev :RequestEventCommon, formData:  FormData)=>{
 
  return postData<null>(ev,  "pusher/auth", formData,false );
}


export const transferToHkb = (ev :RequestEventCommon, data: {transfer_amount:number} )=>{
 
  return postData<TransferToGameResult>(ev,  "transfertoHKB", data, true, "json" );
}


export const transferFromHkb = (ev :RequestEventCommon, data: {amt:number} )=>{
 
  return postData<TransferToGameResult>(ev,  "ajaxHKBTran", data, true, "json"  );
}


export const getProviderGames = (ev :RequestEventCommon, formData:   ProviderGamesFilters)=>{
  console.log('formData' , formData)
  return postData<null>(ev,  "api/getProviderGames", formData, true, "json"  );
}
export const getLastDirectTransfer = (ev :RequestEventCommon, formData:  {transaction_type  : number , start_date : string , end_date:string})=>{
  console.log('formData' , formData)
  return postData<LastDirectTransferResult>(ev,  "account/lastDirectTransfer", formData, false,"json" );
}

export const getOTP = (ev :RequestEventCommon, formData:  FormData)=>{
  return postData<any>(ev,  "getOTP", formData, true, "json");
}
export const verifyOTP = (ev :RequestEventCommon, formData:  FormData)=>{
  return postData<any>(ev,  "verifyOTP", formData, true, "json");
}
export const submitActivateReferral = (ev :RequestEventCommon, formData:  FormData)=>{
  return postData<any>(ev,  "submit_activation_referral", formData, true);
}
export const submitForceResetPwd = (ev: RequestEventCommon, formData: FormData) => {
  return postData<null>(ev, "forceReset", formData, false);
}