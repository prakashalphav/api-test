import type { ApiData, HeadElements, ObjectId } from "~/services/types";
import type { AnyFn, ArgumentsType, EventFilter } from "./utilTypes";
import type { QRL } from "@builder.io/qwik";
import { $ } from "@builder.io/qwik";
import { brandSlugBase } from "~/services/images";
import type { DocumentHead} from "@builder.io/qwik-city";
import { type RequestEventLoader } from "@builder.io/qwik-city";
import { inlineTranslate,   } from 'qwik-speak';
export function getBankAccLength(bankCode : string , default_minlength : number, default_maxlength :number){ 
    let   custom_minLength, custom_maxLength;
if(bankCode == 'MDR'){
custom_minLength = 13;
custom_maxLength = 13;
}
else if(bankCode == 'BNI' || bankCode == 'BCA' || bankCode == 'DMN' || bankCode == 'BSI' || bankCode == 'BLA'){
custom_minLength = 10;
custom_maxLength = 10;
} 
else if(bankCode == 'BRI'){
custom_minLength = 15;
custom_maxLength = 15;
} 
else if(bankCode == 'CIMBN' || bankCode == 'BANKJAGO'){
custom_minLength = 12;
custom_maxLength = 12;
}  
else{
custom_minLength  = default_minlength;
custom_maxLength  = default_maxlength; 
}   

return {'min_len': custom_minLength,'max_len': custom_maxLength}
}
/*bank acc min and maxlength limitation end*/ 

export const numFormat = (val :number| string |null |undefined , decimals = 0)=>{
  if(!val){
     val = "0" ;
    if(decimals>0){
      for (let index = decimals; index >0; index--) {
        if( index == decimals){
          val = val + "."
        }
        val = val + "0"; 
      }
    }
    return val;
  }
    while (/(\d+)(\d{3})/.test(val.toString())) { 
        val = Number(val).toFixed(decimals);
        val = val.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    }
    return val;

}

//this function is to get the string of  Mongodb ObjectID
export const toStrId = ( id : ObjectId  | string | undefined)=>{ 
    
    if(id == undefined){
        return "";
    }
    
    return (typeof  id  === "string" )?id : id.$oid;
}

//copy text function
export const copyText = $((text: string) => {
  navigator.clipboard.writeText(text)
  .then(() => {
    alert("successfully copied " + text);
  })
  .catch(() => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand("copy");
      if (successful) {
        alert("successfully copied " + text);
      }
    } catch (err) { /* empty */ }
    document.body.removeChild(textArea);
  });
});

export function capitalize(str: string): string {
    if (!str) return ''
    return str[0].toUpperCase() + str.slice(1)
  }

  export const mouseHoverEvents = () => {
    return   ('onmouseleave' in document) ? ['mouseenter', 'mouseleave'] : ['mouseover', 'mouseout']
  };
     
  export const touchEvents= ['touchstart', 'touchend'];


  export const noop = () => {}
  
  
export function createFilterWrapper<T extends AnyFn>(filter$: QRL<EventFilter>, fn$ : QRL<T>) {
    const wrapper$= $(async function wrapper(this: any, ...args: ArgumentsType<T>) {
     
     return new Promise<ReturnType<T>>( (resolve, reject) => {
       // make sure it's a promise
 
       Promise.resolve(filter$(async () => fn$.apply(this, args), { fn$, thisArg: this, args }))
         .then(resolve)
         .catch(reject)
     })
   })
  
    return wrapper$;
  }

  export function isFunction(variable : any) {
    return variable instanceof Function;
  }

  export function isString(variable: any) {
    return typeof variable === 'string' && variable !== null;
  }
  export function isPromise(variable: any) {
    return  variable !== null &&
    typeof variable === 'object' &&
    typeof variable.then === 'function' &&
    typeof variable.catch === 'function';
  }


  export  function onClose(){
                         
    if(window.opener){
        const openerName = window.opener.name;
        const goBack = window.open('', openerName);
        if(goBack){
          goBack.focus();
          window.close();

          return ;
        } 
    }
    location.href = "/";

    return;
  }


  export function manipulateArray(arr : any[], numOfClones :number ) {
    // Clone the array to avoid modifying the original
    const clonedArray = arr.slice();
  
    // Calculate how many items need to be cloned to make it at least 3 items long
    const neededItems = Math.max(numOfClones - clonedArray.length, 0);
  
    // Clone the array to make it at least 3 items long and place it at the beginning
    for (let i = 0; i < neededItems; i++) {
      clonedArray.unshift(...clonedArray);
    }
  
    // Clone the array to make it at least 3 items long and place it at the end
    for (let i = 0; i < neededItems; i++) {
      clonedArray.push(...clonedArray);
    }
    // Clone the last 3 items and place them at the beginning
    const firstThree = clonedArray.slice(-numOfClones);
    clonedArray.unshift(...firstThree);
  
    // Clone the first 3 items and place them at the end
    const lastThree = clonedArray.slice(0, numOfClones);
    clonedArray.push(...lastThree);
  
   
  
    return clonedArray;
  }

  export function joinStrOrNumberArray(arr : any) {
    if (Array.isArray(arr) && arr.every(item => typeof item === 'string' || typeof item === 'number')) {
      return arr.join('');
    } else {
      //"Not a valid string or number array."
      return arr ;
    }
  }
 
  export function prepareForMapping(input : any , withObjKey : boolean = false) {
    if(!input){
      return [];
    }

    if (Array.isArray(input)) {
      // If it's already an array, return it as is
      return input;
    } else if (typeof input === 'object' && input !== null) {
      // If it's an object, convert it to an array of objects with key and value
      if(!withObjKey){

        return Object.values(input);
      }
      else {
        return Object.entries(input).map(([key, value]) => ({ key, value }));
      }
     
    } else {
      // If it's neither an array nor an object, convert it to an array with a single element
      return [input];
    }
  }
   
  export function extractImgMetaData( filename :string) : { w : number|undefined, h:number|undefined, ext:string|undefined}
    {
    const regex = /_(\d+)x(\d+)p?x?\.(\w+)(?:[?#]|$)/;
    if (filename) {
    const match = filename.match(regex);
    if (match && match.length>0) {
      const width = match.length > 1 ? match[1] : undefined;
      const height = match.length > 2 ? match[2] : undefined;
      const extension = match.length > 3 ? match[3] : undefined;
      console.log(`Image: ${filename}, Width: ${width}, Height: ${height}`);
      return {
        w : parseInt( width)  ,
        h: parseInt(height),
        ext : extension 
      }
     
    }  }
    console.log(`Image: ${filename}, No measurements found.`);
    return {w: undefined, h:undefined};
 
  }


export const normalizeOpts = <T extends Record<string, unknown>>(
  defaultOpts: T,
  inputOpts: Record<string, unknown>
) => {
  const opts: T = {} as T;
  Object.keys(defaultOpts).forEach((k: string) => {
    if (k in inputOpts) {
      opts[k] = inputOpts[k];
    } else {
      opts[k] = defaultOpts[k];
    }
  });

  return opts;
};


export const makeUgsportImgSrc = (imgSrc:string)=>{

  
  let result = "";
  if(imgSrc){
     result = brandSlugBase + imgSrc.replace("{{device}}", "mobile").replace("{{type}}", "normal");

  }
  return result;
}
export function removeQueryParams(keys : string[]) {
  if (history.replaceState) {
      const url = window.location.href;
      const urlWithoutParams = url.split('?')[0];

      const searchParams = new URLSearchParams(window.location.search);

      keys.forEach(key => {
          searchParams.delete(key);
      });

      const newParamsString = searchParams.toString();
      const newUrl = newParamsString ? `${urlWithoutParams}?${newParamsString}` : urlWithoutParams;

      history.replaceState({}, document.title, newUrl);
  }
}
export function setCookie(name :string, value :string, daysToExpire:number):void {
  const expiration = new Date();
  expiration.setTime(expiration.getTime() + (daysToExpire * 24 * 60 * 60 * 1000));
  const expires = "expires=" + expiration.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}
export function filterByKeyword(array : Record<string,any>[], keyword :string) {
  return array.filter(item => {
    // Check if any property of the object contains the keyword
    return Object.values(item).some(value =>
      String(value).toLowerCase().includes(keyword.toLowerCase())
    );
  });
}

export function isMobileDevice( userAgent?: string|null,deviceFromApi? : string|null) {
  if (typeof window !== "undefined") {

    return window.innerWidth <= 768; // Adjust the value based on your needs
  }
  else {
    if(deviceFromApi){
      return deviceFromApi == "mobile";
    }
    if(userAgent){
      return /mobile/.test(userAgent.toLowerCase());
    }
  }
 
  return false;
}

export function milisecondsToHMS(ms: number) {
  let seconds = Math.floor(ms / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  seconds = seconds % 60;
  minutes = minutes % 60;
  hours = hours % 24;
  return hours.toString().padStart(2, '0') +':'+ minutes.toString().padStart(2, '0') +':'+ seconds.toString().padStart(2, '0');
}

export function appendGameLogoPath(imageName: string) {
  return 'https://files.sitestatic.net/assets/imgs/game_logos/150x150/'+imageName+ '.png';
}


export function flattenNestedObjToArr<T>(obj : Record<string, Record<string,T>>) {
  const flattenedArray: T[] = [];

  // Iterate through the outer object
  for (const innerObject of Object.values(obj)) {
    // Iterate through the inner objects
    for (const item of Object.values(innerObject)) {
      flattenedArray.push(item);
    }
 
  }

  return flattenedArray;

}



export function flattenObjToArr<T>(obj : Record<string, T[]>) {
  const flattenedArray: T[] = [];

  // Iterate through the outer object
  for (const innerObject of Object.values(obj)) {
    // Iterate through the inner objects
  
    innerObject.forEach(item => {
      flattenedArray.push(item);
    });
  }

  return flattenedArray;

}

export function isHomePage(urlPathName : string) {
 //loc.url.pathname 
  if(urlPathName =="/"){
    return true;
  }
  return false;
}

export function truncateStringToChars(inputString : string, characterCount : number) {
  if(!inputString){
    return "";
  }
  if (inputString.length <= characterCount) {
    return inputString;
  } else { 
    return inputString.slice(0, characterCount) + '...';
  }
}

function calSysDprStartFrom(dprList : number[] =[1,2,3]){
  let systemDprStartFrom= 1 ; // system stores these 3 dpr : @1x , @2x , @3x only  
  if(dprList.length == 1 ){
    // if only 1 dpr in the list . means usethe largest which is @3x  . 
    // e.g. drpList = [1 , 1.5]
    systemDprStartFrom= 3 ; 
  } 
  else if(dprList.length == 2) { // 
 
     // if only 2 dpr in the list . means can use @2x and @3x images . e.g. drpList = [1 , 1.5]  where value "1" => @1x and "1.5" => "@2x"
     systemDprStartFrom = 2;
  }
  else {
    // if there 3 dpr in the list . means can use all 3   @1x , @2x , @3x images 
    systemDprStartFrom = 1;

  }

  return systemDprStartFrom;
}

export function calImgSizeByDpr( imgBaseSize : number, dprList : number[] =[1,2,3]){

  const systemDprStartFrom = calSysDprStartFrom(dprList);
 
  return  systemDprStartFrom * imgBaseSize ;
}

export function concatImgDprSrcSet(imgSrc  : string, imgV : string, dprList : number[] =[1,2,3], imgType  : string= "avif"){
 // dprList max items is 3 only becoz providerGameImg only have 1x , 2x  3x images 

  let srcSet = "";
  const systemDprStartFrom =  calSysDprStartFrom(dprList);
  dprList.forEach(function(dpr, index) {
    // props.providerGameItem.img_src + "@2x.avif?v=" + props.providerGameItem.img_v +" 2x, "
    srcSet += imgSrc + (systemDprStartFrom !== 1 ? `@${index+systemDprStartFrom}x` : "" ) + `.${imgType}?v=` + imgV +   ` ${dpr}x, ` ;

  }) 
 return srcSet;
      
  }
        


  export function addElemsToDocumentHead(result :DocumentHead ,  customScriptCode :string, keyPrefix: string   ){
   
    let  isSuccess = true; 
 
    try {
      const elements =  JSON.parse(customScriptCode) as  HeadElements;

      if(elements){
       
          // Links and Meta    are head elements only 

        if( result.links?.length>=0&&   elements.links?.length>0){
          elements.links.forEach((item, index)=>{
            if(item.href){
              item.key = keyPrefix  + "Link" + index;
              result.links.push(item);
            }
            
          })
          }
   
        
          if(  result.meta?.length>=0&&   elements.meta?.length>0){
          elements.meta.forEach((item, index)=>{
            
            if(item.content){
              item.key = keyPrefix + "Meta" + index;
              result.meta.push(item);
            }
            
          })
          }
     
       
   
         // console.log("elements.scripts",elements.scripts);
        if(  result.scripts?.length>=0 && elements.scripts?.length>0){
         elements.scripts.forEach((item,index)=>{
           if( item.innerText || item.src){
   
             const copiedItem = {...item} as any ;
             delete copiedItem.src;
             delete copiedItem.innerText;
   
             if(copiedItem.props){
              copiedItem.props.src = item.src;   
             }
             
             copiedItem.script = item.innerText;  
             copiedItem.key = keyPrefix + "Script" + index;
             result.scripts.push(copiedItem);
   
           }
     
         })
        }
   
        if(  result.styles?.length>=0 && elements.styles?.length>0){
         elements.scripts.forEach((item,index)=>{
           if( item.innerText ){
   
             const copiedItem = {...item} as any ; 
             delete copiedItem.innerText;
               
             copiedItem.style = item.innerText;  
             copiedItem.key = keyPrefix + "Style" + index;
             result.styles.push(copiedItem);
           }
         
         })
        }
      }
   
      //  console.log("elements.links",elements.links);
      //  console.log("result.scripts",result);
      
    } catch (error) {
     // if website_settings.googleAnalytics is not valid JSON object will come here
     console.log("addElemsToDocumentHead error at " + keyPrefix, error);
     isSuccess = false ;

    }
    return isSuccess; 
  }

  
export  function isMenuSelected( menuValue : string , selMenuValues : string[]){
  return  selMenuValues?.length ?  selMenuValues.includes(menuValue) :false
}

 

export function calculateImageDimensions(containerWidth : number , numImages : number , gap : number  , aspectRatio : number ) {
  // Calculate the total width occupied by gaps
  const totalGapWidth = (numImages - 1) * gap;
  
  // Calculate the total available width for the images
  const totalAvailableWidth = containerWidth - totalGapWidth;
  
  // Calculate the width of each image
  const imageWidth = totalAvailableWidth / numImages;
  
  // Calculate the height of each image using the aspect ratio
  const imageHeight = imageWidth / aspectRatio;
  
  return {
      width: imageWidth,
      height: imageHeight
  };
}