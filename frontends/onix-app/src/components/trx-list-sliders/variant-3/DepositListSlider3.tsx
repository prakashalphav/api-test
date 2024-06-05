/*
Readme : 

1. The number of games banners  must not be less than 7
*/

import { component$, useStylesScoped$, useTask$,} from "@builder.io/qwik";
  
import styles from "./DepositListSlider3.scss?inline";
import 'spicr/dist/css/spicr.min.css'; 
import { isServer } from '@builder.io/qwik/build';
// import { GoldRibbonIcon } from "~/components/icons/GoldRibbon";
 
// import { CoinsIcon } from "~/components/icons/Coins";
// import { GoldCoinsIcon } from "~/components/icons/GoldCoins";
// import { RoundCornerShapeIcon } from "~/components/icons/RoundCornerShape";
import { ArrowRight } from "~/components/icons/ArrowRight";
import { ArrowLeft } from "~/components/icons/ArrowLeft";
// import ImgCoins from '~/media/images/svg/coins.svg?jsx';
// import ImgGoldCoins from '~/media/images/svg/gold_coins.svg?jsx';
import { manipulateArray, numFormat } from "~/utils/common";
import type { LatestSiteTrx } from "~/services/types";

//import Spicr  from "~/plugins/spicr";
type Props = {
  parentId: string; // '#parent'
  list : LatestSiteTrx[];
};

export default component$((props: Props) => {
  useStylesScoped$(styles);
  const avatars = [
    "/images/avatars/Guy1",
    "/images/avatars/Girl1",
    "/images/avatars/Girl2",
    "/images/avatars/Girl3",
    "/images/avatars/Guy2",
  ];

  let avatarInd = 0;
  const list :LatestSiteTrx[]=  props.list;
  const length = list.length;

  // internal variables and / or constants
  const itemWidth = 250 ;
  const itemGap = 64;
  const itemsPerPage = 3; 
  const cloned =  manipulateArray(props.list,itemsPerPage);

  const itemsInitPos = (( itemsPerPage * itemWidth) + (itemGap * itemsPerPage) ) * -1 ;
  const totalWidth =  (itemsPerPage * itemWidth) + (itemGap * (itemsPerPage - 1)) ;
   
  const activeIndex =itemsPerPage + ((itemsPerPage - 1) / 2);
  useTask$(async ({cleanup}) => {
      
    if (isServer) {
      return; // Server guard
    }
  
    const Spicr =(await import( '~/plugins/spicr')).default;
    // console.log('Spicr',Spicr)
    const sliderElement = document.getElementById('deposit-slider');
    
    let spicrSlider = null;
    const initSpicr = ()=>{
      spicrSlider = new Spicr(sliderElement ,{ 
        slides: {
        itemsPerPage: itemsPerPage,
        totalRealItems: length,
        activeAlign: 'center',
        gap: itemGap,
        axis: 'x',
        autoloop:true,
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
        id="deposit-slider"
        class="spicr spicr-slider paused spicr-slides flex justify-center "
        data-interval="5000"
        data-axis="x"
        data-translate="x:100%"
        data-duration="700"
        data-easing="easingCubicInOut"
      >
        <div
          class="spicr-inner flex gap-16 overflow-hidden flex-nowrap flex-shrink-0"
          style={`height:68px;width: ${totalWidth}px;`}
        >
          {cloned.map((item,i) => {
            avatarInd++;
            if (avatarInd >= avatars.length) {
              avatarInd = 0;
            }
            return (
              <div 
                key ={i}
                class={`item flex-shrink-0 ${activeIndex === i ? 'active' :''}`}
                style={`height:68px;width:${itemWidth}px; transform:translateX(${itemsInitPos}px);`}
                data-id="0"
                data-idx="0"
              >
                
                <div class="wrapper w-full    rounded-[30px] overflow-hidden   relative  "   >
                  <div class="content relative rounded-[30px]  leading-4 flex-center gap-2 px-3 pt-3 pb-2">
                    {/* <div class=" ">
                      <picture>
                        <source
                          type="image/avif"
                          media="(-webkit-min-device-pixel-ratio: 1.5)"
                          srcSet={avatars[avatarInd] + "@2x-100.avif"}
                          sizes="50px"
                        />
                        <source
                          type="image/webp"
                          media="(-webkit-min-device-pixel-ratio: 1.5)"
                          srcSet={avatars[avatarInd] + "@2x-100.webp"}
                          sizes="50px"
                        />

                        <source
                          type="image/avif"
                          srcSet={avatars[avatarInd] + "@1x-50.avif"}
                        />
                        <source
                          type="image/webp"
                          srcSet={avatars[avatarInd] + "@1x-50.webp"}
                        />
                        <img
                          src={avatars[avatarInd] + "@1x-50.png"}
                          width="50"
                          height="50"
                          alt="Avatar"
                          loading="lazy"
                          decoding="async"
                        />
                      </picture>
                      
                    </div> */}
                    <div class="flex-auto min-w-0 flex justify-between items-center">
                      <div class="trx-name ">
                        <p class="text-xs"> {item.user_fund_accname?.toUpperCase()}</p>
                        <p class="title text-xxs italic"> {item.created_at}</p>
                        <p class=" font-bold  selection:">
                          {numFormat(item.amount)}
                        </p>
                      </div>
                      
                        <div class="gold-coins" style="width:35px; height:40px">
                          {/* <CoinsIcon></CoinsIcon>
                          <GoldCoinsIcon></GoldCoinsIcon> */}
                              {/* <svg class="dull" width="70" height="80">       
     <image xlink:href="/images/svg/coins.svg"  width="70" height="80"/>    
</svg> */}
{/* <ImgCoins  class="dull" width="70" height="80"></ImgCoins> */}
<img   loading="lazy" decoding="async" class="dull"  width="70" height="80" src="/images/svg/coins.svg"></img> 
                          {/* <svg class="gold" width="70" height="80">       
     <image xlink:href="/images/svg/gold_coins.svg"  width="70" height="80"/>    
</svg> */}
{/* <ImgGoldCoins class="gold" width="70" height="80"></ImgGoldCoins> */}
<img   loading="lazy" decoding="async" class="gold"   width="70" height="80" src="/images/svg/gold_coins.svg"></img>

                        </div>
                    
                    </div>
                  </div>
                  <div class="absolute -z-1 bottom-0 " style="right:-8px; top:1.5px;">
                  {/* <svg class="gold" width="110" height="96">       
     <image xlink:href="/images/svg/round_corner.svg"  width="110" height="96"/>    
</svg> */}

<svg class="gold h-full w-auto" width="110" height="96" viewBox="0 0 132 138" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M33.3608 19.5481C37.9094 8.14373 48.9481 0.662109 61.2262 0.662109H101.734C118.303 0.662109 131.734 14.0936 131.734 30.6621V107.306C131.734 123.875 118.303 137.306 101.734 137.306H30.657C9.44586 137.306 -5.06636 115.894 2.79165 96.1923L33.3608 19.5481Z" fill="url(#roundcorner)"/>
<defs>
<linearGradient id="roundcorner" x1="59.064" y1="0.662109" x2="59.064" y2="137.306" gradientUnits="userSpaceOnUse">
<stop class="roundcorner-bg2" />
<stop offset="1" class="roundcorner-bg1"  stop-opacity="0"/>
</linearGradient>
</defs>
</svg>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/* pages */}
        <a class="left spicr-control long-shadows" data-slide="prev">
          <span class="arrow-prev">
     
            <ArrowLeft></ArrowLeft>
          </span>
        </a>
        <a class="right spicr-control long-shadows" data-slide="next">
          <span class="arrow-next">
            
            <ArrowRight></ArrowRight>
          </span>
        </a>
      </div>
    </>
  );
});
