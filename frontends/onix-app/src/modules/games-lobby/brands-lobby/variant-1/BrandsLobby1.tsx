import { component$,  useStylesScoped$ ,   } from "@builder.io/qwik";

import { useGameLaunch  } from '~/hooks/business/useGameList';
import styles from './BrandsLobby1.scss?inline';
import LinkButton from '~/components/link-button/variant-1/LinkButton1'; 
import {   isGameAllowed,   } from '~/utils/sysUtils';
import { useCommonViewData } from '~/hooks/app/useCommonViewData';
import {type Provider } from "~/services/types";
import {
    inlineTranslate,  
  } from 'qwik-speak';
  import LazyImage from  "~/components/image/LazyImage";
  import { mktBannerFileBase } from '~/services/images';
  export type contentType = {
    
}

type Props = {
    providers: Provider[];
};
export default component$(( props : Props) => {
    useStylesScoped$(styles);
    const t = inlineTranslate();

    const { openGameLobbyQRL, checkGameAllowedQRL}= useGameLaunch();
    const  {commonData} = useCommonViewData();

  
    return <>
 

         <div class="img-wrapper relative">
           
            {commonData.seo?.mkt_banner && ( <>
                <LazyImage class="w-full block lg:hidden" src={`${mktBannerFileBase}${commonData.seo?.mkt_banner}` }></LazyImage>
            </>)}
          
        </div>

       <div class="mt-8 grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 grid  gap-1 lg:gap-3">
        
        {props.providers.map((item: Provider, idx)=>(
         <>
        
         <div class="box-wrapper rounded-xl  col-span- border-x-[1px] border-t-2 relative  overflow-hidden ">
        {/* <div>{item.is_launch?"is_launch":"not is_launch"}</div>
        {isGameAllowed(item)  ? "isGameAllowed":"not isGameAllowed" } */}
        {/* {item.maintenance == 1 ? 'maintenance':'not maintenance'}

        {item.isPromoDisabled == 1 ? 'isPromoDisabled':'not isPromoDisabled'}

        {item.block == 1 ? 'block':'not block'}

        {item.isCO == 1 ? 'isCO':'not isCO'} */}
        
         <LinkButton toUrl={!item.is_launch && isGameAllowed(item) ? `/${item.category_slug}/${item.brand_slug}` : ''}   class={`w-full flex-center flex-col min-h-full ${!isGameAllowed(item)? 'opacity-50' : ''}`} onClick$={async (e) => {
            if(item.is_launch){ 
                  await openGameLobbyQRL(e,item,commonData.isAuth )
            }
            else {
                 await checkGameAllowedQRL(item.block,item.maintenance ,item.isCO  ,item.isPromoDisabled);
            }
            
} }>
{/* isCo - is coming soon treat as new game */}
 {item.isCO == 1 && (
<>
<div class="new-label z-10 font-semibold text-xxs w-16 py-1 flex justify-center rounded-tl-xl rounded-br-xl absolute -top-[1.5px] -left-[0.5px]"> {t('app.New@@New')}</div>
</>
)}
{item.isTop == true && (
<>
<div class="hot-label z-10 font-semibold text-xxs w-16 py-1 flex justify-center rounded-tl-xl rounded-br-xl absolute -top-[1.5px] -left-[0.5px] "> {t('app.Hot@@Hot')}</div>
</>
)}
 <div class="flex-auto w-full flex-center">
 <img class={`w-full p-4  `} width="100" height="70" loading="lazy" decoding="async"  src={`https://files.sitestatic.net/assets/imgs/game_logos/100x70/${item.image}.png`} />
 </div>
<div class="py-1">{item.game_name}</div>


</LinkButton></div></>
            )
            )} 

       </div>
   
             
    </>;
})