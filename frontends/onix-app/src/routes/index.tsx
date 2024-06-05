import { component$      } from '@builder.io/qwik';
import { routeLoader$, } from '@builder.io/qwik-city';
import type { DocumentHead } from '@builder.io/qwik-city';
 import {useGetCommonViewData} from './layout'; 

import { getHomeData} from '../services/contentDB';
import Home1 from '~/modules/home/variant-1/Home1';
import Home2 from '~/modules/home/variant-2/Home2';
import Home3 from '~/modules/home/variant-3/Home3';
import Home4 from '~/modules/home/variant-4/Home4';
import Home6 from '~/modules/home/variant-6/Home6';
import Home5 from '~/modules/home/variant-5/Home5';
import Home7 from '~/modules/home/variant-7/Home7';
import PopupBanner from "~/modules/popup-banner/variant-1/PopupBanner";
import { 
  useSpeak,  
} from 'qwik-speak';

import { bannerBase } from "~/services/images";
import { isMobileDevice } from '~/utils/common';
import { useCommonViewData } from "~/hooks/app/useCommonViewData";

export const useGetHomeData = routeLoader$( async ( ev) => {
  
 const commonData  = await ev.resolveValue(useGetCommonViewData);  
 const homeData = await getHomeData(ev);  
 return  {commonData , homeData};  
});

export default component$(() => { 
  const homeResource  = useGetHomeData(); 
  const { commonData , homeData } = homeResource.value;
useSpeak({assets:['home','events'],}); 
 
  return ( 
    <>  
     {homeData?.d?.popup_banner && (
        <PopupBanner
          banner={homeData.d.popup_banner.image}
          url={homeData.d.popup_banner.url}
          popUpBannerLocation={"home"}
        ></PopupBanner>
      )}
        
         { commonData.d?.app_sub_skin ==="onixgaming"
             && (
              <Home1></Home1>
             )
             
             }

      {  commonData.d?.app_sub_skin ==="wingaming"
             && (
              <Home2 ></Home2>
             )
             
             }
             
             {  commonData.d?.app_sub_skin ==="vega"
             && (
              <Home3></Home3>
             )
             
             }
             

      {commonData.d?.app_sub_skin === "zplay"
        && (
          <Home4></Home4>
        )
      } 

            {  commonData.d?.app_sub_skin ==="gamingonnet"
             && (
              <>
              <Home6></Home6>
              </>
             )
             
             }      
      {commonData.d?.app_sub_skin === "idrgaming"
        && (
          <Home7></Home7>
       
        )
      }      

            {  commonData.d?.app_sub_skin ==="firegaming"
             && (
              <Home5></Home5>
             )
             
             }  
    </>  
  );
});

// Now we can export a function that returns a DocumentHead object
export const head: DocumentHead = ({resolveValue,  }) => {
  const {commonData , homeData} = resolveValue(useGetHomeData);
 
  const popupBanner =  homeData?.d?.popup_banner ?? null;
  const slidingBanners =  commonData?.d?.babysite_sliding_banners ;
  const isMobile =  isMobileDevice( null,commonData?.d?.device) 
  const links = [];

  //## SL commented this as popupbanner pushed to load last
  if(popupBanner?.image){
    links.push( {
      key:"preload_popupbanner",
      rel:"preload",
      href:popupBanner?.image as string,
      as : "image",
    });
  }
  else {
    if(slidingBanners && slidingBanners.length){
      links.push(  {
        key:"preload_slidingbanner",
        rel:"preload",
        href:  bannerBase + (isMobile? ( slidingBanners[0].mobilebannerImage||"") : slidingBanners[0].bannerImage ),
        as : "image",
      });
    }

  }

  // if(slidingBanners && slidingBanners.length){
  //   links.push(  {
  //     key:"preload_slidingbanner",
  //     rel:"preload",
  //     href:  bannerBase + (isMobile? ( slidingBanners[0].mobilebannerImage||"") : slidingBanners[0].bannerImage ),
  //     as : "image",
  //   });
  // }
  return {
    
    links :  links
    
  };
};  