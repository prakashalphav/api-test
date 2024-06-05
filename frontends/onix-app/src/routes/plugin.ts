import type { RequestHandler } from '@builder.io/qwik-city';
import { config } from '../speak-config';

export const onRequest: RequestHandler = ({ request, locale }) => {
  const cookie = request.headers?.get('cookie');
  const acceptLanguage = request.headers?.get('accept-language');
   
  const appCtryCode = request.headers?.get('app-country');
  let lang: string | null = null;
  // Try whether the language is stored in a cookie
  if (cookie) {
    const result = new RegExp('(?:^|; )' + encodeURIComponent('req_lang') + '=([^;]*)').exec(cookie);
    if (result) {
      lang = result[1];//JSON.parse(result[1])['lang'];
    }
  }
  // Try to use user language 
  if (!lang) {
    if (acceptLanguage) {
      lang = acceptLanguage.split(';')[0]?.split(',')[0];
    }
  }

  // Check supported locales
  lang = config.supportedLocales.find(value => value.lang === lang)?.lang || getDefaultLangByCountry(appCtryCode);

    
  // Set Qwik locale
  locale(lang);
};

export function getDefaultLangByCountry(appCtryCode : string | null|undefined){

  let defaultLang = config.defaultLocale.lang;
  if(appCtryCode){
    defaultLangByCountry.some((item)=>{
 
      if(item.country_code == appCtryCode){
        defaultLang = item.default_lang;
       return true ;
      }
      
   })
  }
 
 return defaultLang;
}
export const defaultLangByCountry= [
  {
    'default_lang': 'en',
    'country_code': 'TW', 
  },
  {
    'default_lang': 'en', 
    'country_code': 'MY',  
  },
   {
    'default_lang': 'id', 
    'country_code': 'ID', 
  },
  {
    'default_lang': 'vn', 
    'country_code': 'VN', 
  },
 {
    'default_lang': 'th', 
    'country_code': 'TH', 
  },
   {
    'default_lang': 'cn', 
    'country_code': 'CN', 
  },
  {
    'default_lang': 'en', 
    'country_code': 'IN', 
  },
    {
    'default_lang': 'zh-hk', 
    'country_code': 'HK', 
  },
   {
    'default_lang': 'km',
    'country_name': 'Cambodia',
    'country_code': 'KH',
    'currency': 'USD', 
  },
  {
    'default_lang': 'en', 
    'country_code': 'PH',  
  },
   {
    'default_lang': 'en', 
    'country_code': 'AU',  
  },
  {
    'default_lang': 'pt', 
    'country_code': 'BR',  
  },
  {
    'default_lang': 'pk', 
    'country_code': 'PK',  
  },
  {
    'default_lang': 'bn', 
    'country_code': 'BD',  
  },
   {
    'default_lang': 'ne', 
    'country_code': 'NP',  
  } 
];
