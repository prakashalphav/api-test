/*
Readme : 

1. The number of games banners  must not be less than 7
*/

import { component$, useStyles$, useStylesScoped$, useTask$,} from "@builder.io/qwik";
 
import styles from "./PromosSlider.scss?inline";
import 'spicr/dist/css/spicr.min.css'; 
import { isServer } from '@builder.io/qwik/build';
// import { GoldRibbonIcon } from "~/components/icons/GoldRibbon";
 
// import { CoinsIcon } from "~/components/icons/Coins";
// import { GoldCoinsIcon } from "~/components/icons/GoldCoins";
// import { RoundCornerShapeIcon } from "~/components/icons/RoundCornerShape";
import ArrowRight2Icon from "~/components/icons/ArrowRight2";

// import { ArrowLeft } from "~/components/icons/ArrowLeft";

import { numFormat } from "~/utils/common";
import type { Promo } from "~/services/types";
import ImgPresent from '~/media/images/ui/present.png?jsx';
import {
  inlineTranslate,   
} from 'qwik-speak';
//import Spicr  from "~/plugins/spicr";
type Props = {
  parentId: string; // '#parent'
  promos: Promo[];
  class?:string;
};
 
export default component$((props: Props) => {
  useStylesScoped$(styles);
 
  const t = inlineTranslate();
  
  const list  : Promo[]=  props.promos;
 
  
  const length = list.length;
 
  // internal variables and / or constants
  const itemWidth = 330 ;
  const itemGap = 16;
  const itemsPerPage = 5; 
  
  const itemsInitPos = 0;// (( itemsPerPage * itemWidth) + (itemGap * itemsPerPage) ) * -1 ;
  const totalWidth =  (itemsPerPage * itemWidth) + (itemGap * (itemsPerPage - 1 )) ;
   
  const activeIndex = 0;
  useTask$(async ({cleanup}) => {
      
    if (isServer) {
      return; // Server guard
    }
  
    const Spicr = (await import( '~/plugins/spicr')).default;
    // console.log('Spicr',Spicr)
    const sliderElement = document.getElementById('promo-slider');
    
    let spicrSlider = null;
    const initSpicr = ()=>{
      spicrSlider = new Spicr(sliderElement ,{ 
        slides: {
        itemsPerPage: itemsPerPage,
        totalRealItems: length,
        activeAlign: 'left',
        gap: itemGap,
        axis: 'x',
        autoloop:false,
      },
    }); 

    console.log('initSpicr',sliderElement,spicrSlider)
    }
    
  
    initSpicr()
    cleanup(()=>{ 
      spicrSlider?.dispose(); 
    });
    
  },{eagerness : "visible"});

  return (
    <>
      <div
        id="promo-slider"
        class={`${props.class??``} promo-slider spicr spicr-slider paused spicr-slides flex justify-start 2xl:justify-center`}
        data-interval="false"
        data-axis="x"
        data-translate="x:100%"
        data-duration="700"
        data-easing="easingCubicInOut"
      >
        <div
          class="spicr-inner flex gap-4 overflow-hidden flex-nowrap flex-shrink-0 js-aos"
          style={`height:162px;width: ${totalWidth}px;`}
        >
          {list.map((item,i) => {
         
            return (
              <div 
                key={item.rowId}
                class={`item    flex-shrink-0 ${activeIndex === i ? 'active' :''}`}
                style={`height:150px;width:${itemWidth}px; transform:translateX(${itemsInitPos}px);`}
                data-id="0"
                data-idx="0"
               
              >
                
                <div class="content w-11/12 mx-auto    rounded-xl  leading-5 relative animate "  anime-name="fade-in-left"  >
                  <div class="   rounded-xl  leading-5 flex justify-start items-start gap-2 py-4 px-2" style={`height:150px;`}>
                    <div class="img-wrapper">
                     
                      {/* <img src="/images/ui/present.png" width="120px" height="120px" /> */}
                      <ImgPresent class="absolute -bottom-3 -left-3" style="width:120px;" width="120px" height="120px" />
                    </div>
                    <div class="flex-auto min-w-0 flex justify-between items-center ">
                      <div class=" leading-6">
                        <p class="font-bold text-xl"> {item.name?.toUpperCase()}</p>
                        <p class=" italic"> { item.no_limit ?t("events.Valid for unlimited time@@Valid for unlimited time"):     t("events.valid@@Valid from {{startDate}} till {{endDate}}"  , {startDate: item.dateto , endDate :item.dateto    }) }
                        </p>
                     
                      </div>
           
                    </div>
                  </div>
               
                </div>
              </div>
            );
          })}
        </div>
        {/* pages */}
        <a class="left spicr-control long-shadows" data-slide="prev">
          <span class="arrow-prev rotate-180">
     
            <ArrowRight2Icon></ArrowRight2Icon>
          </span>
        </a>
        <a class="right spicr-control long-shadows" data-slide="next">
          <span class="arrow-next">
            
            <ArrowRight2Icon></ArrowRight2Icon>
          </span>
        </a>
      </div>
    </>
  );
});
