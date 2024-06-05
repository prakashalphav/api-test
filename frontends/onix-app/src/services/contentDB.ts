
import {httpGet, } from '../utils/http';
import type { FormId,ComplaintViewData, MaintenceContent, MemoData,   ApiData, ProfileData ,DepositData,NeedRegisterWallet, HomeData, SubGameData, ReferralData, PromotionData, WithdrawData, RegisterWalletData, DepoFormData, GetPlayerReportParams, LaunchLobbyGameParams, CommonViewData__Api, RegisterFormSettings, CustomMenuContent, InfoData, ActivateReferralData, WelcomeContent} from './types';

import {   type RequestEventCommon  } from '@builder.io/qwik-city';

import { getApiReqHeaders ,   setReqEventCookies, getBaseURL, getAgentId} from './baseDB'; 
const isServer = import.meta.env.SSR;
export const fetchCT = async <T = unknown>(
    ev  :RequestEventCommon,
    path: string,
    params: Record<string, string> = {}, 
    popUpMsg : boolean = false,
    contentType :string = "json",
    method : 'GET'|'CACHE' = 'GET',  
  ): Promise<ApiData<T|null>> => {
  
    const apiReqHeaders = getApiReqHeaders(ev, path );


    const baseURL = getBaseURL();
    const apiResponse = await httpGet<T|null>(baseURL,path ,params ,apiReqHeaders, method, contentType ); 
    //console.log('apiResponse ' , path,apiResponse.data.d.merchant_id);
    // console.log(path,' --- return:',  apiResponse );

    if(popUpMsg && !isServer){ 
        if( apiResponse.data.message ){
            //TODO handle message dialog  here 
            
        }
    }
    else if(isServer){
        if (apiResponse.status != 200 ) { 
            console.error( apiResponse.data.message); 
            return  Promise.reject(apiResponse.data);
        } 
    }
    // console.log('apiResponse.cookies ',  apiResponse.cookies );
    setReqEventCookies(ev  , apiResponse, path )
    
   
    return apiResponse.data ; 
   
  };

  export const getMaintenaceContent = ( ev :RequestEventCommon )=>{
    
    
    return  fetchCT<MaintenceContent>( ev , `getMaintenanceContent`) as Promise<ApiData<MaintenceContent>> ;
  }


  export const getCommonViewData = ( ev :RequestEventCommon, currentPath : string )=>{
    
    console.log( 'getCommonViewData123',encodeURIComponent(currentPath))
 
    return  fetchCT<CommonViewData__Api>( ev , `getCommonViewData`, {current_path : encodeURIComponent(currentPath)}) as Promise<ApiData<CommonViewData__Api>> ;
  }

  export const getHomeData = (ev :RequestEventCommon )=>{
    return  fetchCT<HomeData>(ev , `getHomeView` )  ;
  }
  export const getCustomMenuContent = (ev :RequestEventCommon , apiUrlPath : string)=>{
    return  fetchCT<CustomMenuContent>(ev , apiUrlPath )  ;
  }
  export const getSubGamesData = (ev :RequestEventCommon, params: LaunchLobbyGameParams )=>{

      const path  = `${params.category_slug}/${params.brand_slug}/${params.slug}`;

      console.log('getSubGamesData', params ,path);
    return  fetchCT<SubGameData>(ev , path) ;
  }

  export const getBalance = (ev :RequestEventCommon  )=>{
    
        return fetchCT<null>(ev,  "getBal"  );
  }
  export const getHkbBalance = (ev :RequestEventCommon  )=>{
    
    return fetchCT<string>(ev,  "ajaxHKBBal"  );
 }
  export const getRefBalance = (ev :RequestEventCommon )=>{
    return  fetchCT<null>(ev, "getRefWalletBal") ;
  }

  export const logout = (ev :RequestEventCommon  )=>{
    
    return fetchCT<null>(ev,  "logout"  );
}
    
  export const getProfileData = (ev :RequestEventCommon, tab: string | null )=>{
    return  fetchCT<ProfileData>(ev, "profile/" + tab + "/") ;
  }
      
  export const getInfoData = (ev :RequestEventCommon, type: string | null )=>{
    return  fetchCT<InfoData>(ev, "info/" + type) ;
  }
  
  export const getReferralData = (ev :RequestEventCommon )=>{
    return  fetchCT<ReferralData>(ev, "referral") ;
  } 
  export const getPromotionData = (ev :RequestEventCommon )=>{
    return  fetchCT<PromotionData>(ev, "promotion") ;
  }

  export const getWithdraw = (ev :RequestEventCommon )=>{
    return  fetchCT<WithdrawData>(ev, "account/withdrawal") ;
  }

 
 export const getCaptcha = (ev :RequestEventCommon  )=>{
   console.log( 'getCaptcha', ev.query  );
  return fetchCT<string>(ev,  "captcha-image-form?v=" + ev.query.get('v') ,{},false,"image","GET" );
}
 
export const getCaptchaForgotPwd = (ev :RequestEventCommon  )=>{
  console.log( 'getCaptcha', ev.query  );
 return fetchCT<string>(ev,  "captcha-image-forgotpw?v=" + ev.query.get('v') ,{},false,"image","GET" );
}


export const getDepositData = (ev :RequestEventCommon  )=>{
 
 return fetchCT<DepositData|NeedRegisterWallet>(ev,  "account/deposit"  );
}
export const getRegWalletAcc = (ev :RequestEventCommon  )=>{
  // return fetchCT<RegisterWalletData>(ev,  "register-acc", {is_activate_referral: ev.query.get('is_activate_referral')});
  return  fetchCT<RegisterWalletData>( ev , `register-acc`, {is_activate_referral : (ev.query.get('is_activate_referral'))}) as Promise<ApiData<RegisterWalletData>> ;

 }

 export const getRegisterFormSettings  = (ev :RequestEventCommon  )=>{
 
  return fetchCT<RegisterFormSettings>(ev,  "register" );
 }

 export const getDepositForm = (ev :RequestEventCommon  )=>{ 
 
   
  return fetchCT<DepoFormData>(ev,  `account/load_deposit_form`, {
    method : ev.query.get('method')||"",
    pID :ev.query.get('pID')||"",
    provider :ev.query.get('provider')||"",
    isgateway :ev.query.get('isgateway')||"",
  } );
 }
 
 export const getMemoData = (ev :RequestEventCommon)=>{
  return  fetchCT<MemoData>(ev, "memo" ) ;
}


export const launchGame = (ev :RequestEventCommon  )=>{

   
  return  fetchCT<{launch_url:string}>(ev, "subGameLaunch",{
    gameCode : ev.query.get("gameCode") || "",
    isDemo :  ev.query.get("isDemo") || "",
    gameID: ev.query.get("gameID") || "",
    subGameID : ev.query.get("subGameID") || "",

} ) ;
}
export const getPlayerReportFilterOpts = (ev :RequestEventCommon ,formData :    GetPlayerReportParams )=>{
  console.log( 'outstanding_view getPlayerReportFilterOpts', formData.outstanding_view )
  return  fetchCT<any>(ev, "player_report",{
    filter_date_start : formData.filter_date_start.toString()  ,
    filter_date_end :  formData.filter_date_end.toString()  ,
    currency: formData.currency ,
    category : formData.category.toString(),
    provider :formData.provider  ,
    outstanding_view :formData.outstanding_view  ,
} ) ;
}


export const checkNotifications= (ev :RequestEventCommon)=>{
  return  fetchCT<MemoData>(ev, "api/ajaxCheckMsgs" ) ;
}

export const getFormId= (ev :RequestEventCommon)=>{
  return  fetchCT<FormId>(ev, "api/getFormId" ) ;
}


export const getPlayerBetDetails = (ev :RequestEventCommon  )=>{ 
  
  //return html string
  return fetchCT<string>(ev,  `bet_details/${ev.query.get('transaction_id')}/${ev.query.get('game_id')}` );
 }
export const getActivatedReferral = (ev :RequestEventCommon)=>{
  return  fetchCT<ActivateReferralData>(ev, "activate-referral" ) ;
}


export const getMktLandingPageAsText= async (ev :RequestEventCommon, ampFileName : string )=>{
  //const agentId  =getAgentId(ev);
  try {
  const response = await fetch(`https://files.sitestatic.net/mkt-landing-pg/${import.meta.env.VITE_GROUP}/${ampFileName}`);

  if (response.ok) { // If the request was successful
    const data = await response.text();
    return data; // Send the HTML file content as a response
  } else {
    return  Promise.reject('Error fetching the HTML file'); 
  }
} catch (err) {
  return  Promise.reject(err.message); 
}
}

export const getWelcomeContent = (ev :RequestEventCommon )=>{
  return  fetchCT<WelcomeContent>(ev, "welcome") ;
}
export const getDepositSuccessContent = (ev :RequestEventCommon )=>{
  return  fetchCT<{content?: string}>(ev, "deposit-success") ;
}
export const getRegisterSuccessContent = (ev :RequestEventCommon )=>{
  return  fetchCT<{content?: string}>(ev, "register-success") ;
}
