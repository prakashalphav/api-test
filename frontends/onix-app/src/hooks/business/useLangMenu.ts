import type { Signal } from "@builder.io/qwik";
import { useContextProvider , useContext ,$, useSignal , getLocale } from "@builder.io/qwik";
import type { LanguageOptions } from "~/services/types";
import { setCookie } from "~/utils/common";

import { SHOW_LANG_MENU } from '../context';

 
export   const getLangName = (currLang:string|undefined, langOpts:LanguageOptions|undefined )=>{
       
  let currLangName = "";
  if(langOpts && currLang){
    Object.entries( langOpts).map(([langCode, value]) => {
        if(currLang == langCode){
            currLangName = value.name;
        }

    });

  }  

  return currLangName;
}

export const getCountryCodeByLang = (lang: string) => {
  const countryCode = {
    id: "ID",
    en: "US",
    cn: "SG",
    kh: "KM",
    ne: "NP",
    vn: "VN",
    tl: "PH",
    th: "TH",
    bn: "BD",
    in: "IN",
    tw: "TW",
    au: "AU",
    pt: "BR",
    pk: "PK",
  };
  return countryCode[lang];
};


export function useLangMenuCtx( ) {
  
  const showLangMenu = useSignal<boolean>(false);
  useContextProvider(SHOW_LANG_MENU, showLangMenu);  

 return {showLangMenu ,  };
}

export const useSignals = ( )=>{

  const showLangMenu    = useContext<Signal<boolean>>(SHOW_LANG_MENU);
 
  return {showLangMenu ,  };
}
export function useLangMenu() {

  const  {showLangMenu ,  } = useSignals();
  const toggleLangMenu = $(() => showLangMenu.value = !showLangMenu.value); 
  const currLang = getLocale();
//   const lang = useSignal<string>();
  const onSelectLang = $((langVal :string) => {
    // lang.value== langVal
    setCookie("req_lang", langVal, 366 );
    if (typeof window !== "undefined") {
        window.location.reload();
    }
    

  });

 return { showLangMenu, onSelectLang,toggleLangMenu ,currLang };
}
 