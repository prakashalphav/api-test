/*
Readme : 

1. The number of games banners  must not be less than 7
*/

import {
  component$,
  useStyles$,
  useStylesScoped$,
  useTask$,
} from "@builder.io/qwik";
 
import 'spicr/dist/css/spicr.min.css';  
import { isServer } from '@builder.io/qwik/build';
import styles from "./WithdrawListSlider3.scss?inline"; 
// import { LeafLeftIcon } from "~/components/icons/LeafLeft";
// import { LeafRightIcon } from "~/components/icons/LeafRight";

// import { GoldLeafLeftIcon } from "~/components/icons/GoldLeafLeft";
// import { GoldLeafRightIcon } from "~/components/icons/GoldLeafRight";
// import { GoldTrophyIcon } from "~/components/icons/GoldTrophy";
 
// import { TrophyIcon } from "~/components/icons/Trophy"; 
import { ArrowRight } from "~/components/icons/ArrowRight";
import { ArrowLeft } from "~/components/icons/ArrowLeft"; 
import type { LatestSiteTrx } from "~/services/types";
import { manipulateArray,  numFormat } from "~/utils/common";
// import ImgGoldLeafLeft from '~/media/images/svg/GoldLeafLeft.svg?jsx';
// import ImgLeafLeft from '~/media/images/svg/LeafLeft.svg?jsx';
// import ImgLeafRight from '~/media/images/svg/LeafRight.svg?jsx';
// import ImgGoldLeafRight from '~/media/images/svg/GoldLeafRight.svg?jsx';
// import ImgTrophy from '~/media/images/svg/Trophy.svg?jsx';
// import ImgGoldTrophy from '~/media/images/svg/GoldTrophy.svg?jsx';
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
  const list =  props.list;

  const length = list.length;
 

   // internal variables and / or constants
   const itemWidth = 250 ;
   const itemGap = 64;
   const itemsPerPage = 3; 
   const cloned =  manipulateArray(props.list,itemsPerPage);

   const itemsInitPos = (( itemsPerPage * itemWidth) + (itemGap * itemsPerPage) ) * -1 ;
   const totalWidth =  (itemsPerPage * itemWidth) + (itemGap * (itemsPerPage - 1)) ;
    
   const activeIndex =itemsPerPage + ((itemsPerPage - 1) / 2);
   useTask$(async({cleanup}) => {
    // will run when the component becomes visible
    if (isServer) {
      return; // Server guard
    }
     const Spicr = (await import( '~/plugins/spicr')).default;
    // console.log('Spicr',Spicr)
    const sliderElement = document.getElementById('withdraw-slider');
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

        //TODO dispose when out of view
    //TODO init when in of view
  },{eagerness : "visible"});

  return (
    <>
   <div
        id="withdraw-slider"
        class="spicr spicr-slider spicr-slides paused flex justify-center "
        data-interval="5000"
        data-axis="x"
        data-translate="x:100%"
        data-duration="700"
        data-easing="easingCubicInOut"
      >
        <div
          class="spicr-inner flex gap-16  items-end flex-nowrap flex-shrink-0 overflow-hidden"
          style={`height:80px;width: ${totalWidth}px;`}
        >
        
            {cloned.map((item,i) => {
              avatarInd++;
              if (avatarInd >= avatars.length) {
                avatarInd = 0;
              }  
              return (
                <>
                  <div 
                class={`item flex-shrink-0 ${activeIndex === i ? 'active' :''}`}
                style={`height:60px;width:${itemWidth}px; transform:translateX(${itemsInitPos}px);`}
                data-id="0"
                data-idx="0"
              >
                 <div class="wrapper relative  rounded-[30px]">
                          <div class="content  rounded-[30px] leading-4 flex-center gap-2 px-2 pt-5 py-2">
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
                              <div  >
                                <p class="title text-xs"> {item.user_fund_accname?.toUpperCase()}</p>
                                <p class=" text-xxs italic">
                                  {" "}
                                  {item.created_at}
                                </p>
                              </div>
                              <p class=" font-bold ">
                                {numFormat(item.amount)}
                              </p>
                            </div>
                          </div>
                          <div class="absolute bottom-0 right-0 translate-x-1/3 leaf-left" style="width:30px;height:44px" >
                          {/* <svg class="dull" width="45" height="66">       
     <image xlink:href="/images/svg/LeafLeft.svg"  width="45" height="66"/>    
</svg> */}
{/* <ImgLeafLeft  width="45" height="66" class="dull"></ImgLeafLeft> */}
<img   loading="lazy" decoding="async" width="30"    height="44" class="dull"  src="/images/svg/LeafLeft.svg"></img> 

{/* <svg class="gold" width="45" height="66">       
     <image xlink:href="/images/svg/GoldLeafLeft.svg"  width="45" height="66"/>    
</svg> */}
{/* <ImgGoldLeafLeft class="gold" width="45" height="66"></ImgGoldLeafLeft>  */}
<img   loading="lazy" decoding="async" class="gold"   width="30" height="44"  src="/images/svg/GoldLeafLeft.svg"></img> 

                            {/* <LeafLeftIcon></LeafLeftIcon>
                            <GoldLeafLeftIcon></GoldLeafLeftIcon> */}
                          </div>
                          <div class="absolute bottom-0 left-0 -translate-x-1/3 leaf-right" style="width:30px;height:44px" >
                          {/* <svg class="dull" width="45" height="66">       
     <image xlink:href="/images/svg/LeafRight.svg"  width="45" height="66"/>    
</svg> */}

{/* <ImgLeafRight class="dull" width="45" height="66"></ImgLeafRight>  */}
<img   loading="lazy" decoding="async" class="dull"   src="/images/svg/LeafRight.svg"></img> 
{/* <svg class="gold" width="45" height="66">       
     <image xlink:href="/images/svg/GoldLeafRight.svg"  width="45" height="66"/>    
</svg> */}

{/* <ImgGoldLeafRight class="gold" width="45" height="66"></ImgGoldLeafRight> */}
<img   loading="lazy" decoding="async"   class="gold" width="30" height="44"  src="/images/svg/GoldLeafRight.svg"></img> 
                            {/* <LeafRightIcon></LeafRightIcon>
                            <GoldLeafRightIcon></GoldLeafRightIcon> */}
                          </div>
                          <div class="absolute top-0 right-0 -translate-y-1/3 trophy" style="width:35px;height:34.4px"  >
                          {/* <svg class="dull" width="60" height="59">       
     <image xlink:href="/images/svg/Trophy.svg"  width="60" height="59"/>    
</svg> */}

{/* <ImgTrophy class="dull"  width="60" height="59"></ImgTrophy>  */}
<img   loading="lazy" decoding="async" class="dull"    width="40" height="39.3"  src="/images/svg/Trophy.svg"></img>
{/* <svg class="gold" width="60" height="59">       
     <image xlink:href="/images/svg/GoldTrophy.svg"  width="60" height="59"/>    
</svg> */}

{/* <ImgGoldTrophy class="gold"  width="60" height="59"></ImgGoldTrophy>  */}
<img   loading="lazy" decoding="async" class="gold"   width="40" height="39.3" src="/images/svg/GoldTrophy.svg"></img>
                            {/* <TrophyIcon></TrophyIcon>
                            <GoldTrophyIcon></GoldTrophyIcon> */}
                          </div>
                    
                        </div>
                        </div>
                </>
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
