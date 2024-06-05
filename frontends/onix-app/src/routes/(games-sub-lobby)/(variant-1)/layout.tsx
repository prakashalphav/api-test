import { component$,   Slot ,useStylesScoped$  } from '@builder.io/qwik';
import { routeLoader$  } from '@builder.io/qwik-city';
import {getSubGamesData} from '../../../services/contentDB';
import {useGetCommonViewData} from '../../layout'; 

import styles from "./sub-lobby.scss?inline";

export const useGetSubGames = routeLoader$( async( ev) => {
    const commonData= await ev.resolveValue(useGetCommonViewData);
    const path  = ev.pathname.substring(ev.basePathname.length); // 'slots/toptrend-gaming'

    const parts = path.split("/");
  
    console.log("ev.params.brandslug ", ev.params.brandslug ,path);

     
    const subGames = getSubGamesData(ev, {category_slug : parts? parts[0]:"",brand_slug: parts && parts.length>=2 ? parts[1] : "", slug :  parts && parts.length>=3 ? parts[2] : ""  }); 
    //return ev.defer(subGames);

    return  {commonData , subGames};  
}); 

export default component$(() => {

  useStylesScoped$(styles);
   
  return (
    <> 
   
     <div class="max-w-screen sm:mt-5 sm:rounded-2xl py-4  mb-16 overflow-hidden" >
      <Slot />  
      </div>  
    </>
  );
});