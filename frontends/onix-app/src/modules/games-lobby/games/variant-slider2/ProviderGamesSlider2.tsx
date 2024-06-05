
// import ImgLandingImg from '~/media/images/dummy_images/landing_img.png?jsx';
import type { Component } from '@builder.io/qwik';
import { Slot, component$, useOn, $, useStylesScoped$ } from '@builder.io/qwik';
import styles from './ProviderGamesSlider2.scss?inline';
import type {ProviderGameItem} from '~/services/types';
import { useTransferWalletModal } from '~/hooks/business/useTransferWallet';
import { useCommonViewData } from '~/hooks/app/useCommonViewData';
import { ArrowLeft } from '~/components/icons/ArrowLeft';
import { DoubleArrowRight } from '~/components/icons/DoubleArrowRight';
import Splide from '@splidejs/splide';
import { Grid } from '@splidejs/splide-extension-grid';
import  '@splidejs/splide/css/core'; 
import {    isMobileDevice } from '~/utils/common';
import type { Props as ProviderGameBoxCmpProps} from "~/components/game-box-provider/propsType"; 
type Props = {
    parentId: string, // '#parent' - *must apply this if one page reuse this component*
    providerGameItemList: ProviderGameItem[];
    hasSlot?: boolean;  // optional - for list of items show become 4 if true
    arrowClass?: string;
    showTwoArray?: boolean;
    imgDprList? : number[];
    imageWidth? : number;
    imageHeight?  : number;
    gap? : { xs : string , sm? : string , lg? : string } ; // default 0rem 
    perPageByScreen :   { xs : number, sm : number , md: number , lg: number , xl : number  };
   providerGameBoxCmp : Component<ProviderGameBoxCmpProps>;
};
export default component$(( props : Props) => {
    useStylesScoped$(styles);
    useTransferWalletModal();
    const  {commonData} = useCommonViewData();
    const isMobile=isMobileDevice(null,commonData.device );
    const ProviderGameBoxCmp = props.providerGameBoxCmp;

 
   
    useOn( "qvisible", $(( ) => { 
      console.log("run on qvisible GamesSlider1" );
      // will run when the component becomes visible  
      new Splide('.'+props.parentId + '.games-slider' ,{
          type   : 'loop', 
      perPage:props.perPageByScreen.xl,
          autoplay : true,
          lazyLoad : "nearby",
          interval: 8000, 
          flickMaxPages: 1,
          updateOnMove: true, 
          throttle: 300,
            arrows : true,
            gap: !props.gap?.lg ?  ( props.gap?.sm  ?  props.gap?.sm : "0rem"): props.gap.lg,
            grid: {
                 
              rows: props.showTwoArray   ? 2 : 1,
              gap : {
                row:  !props.gap?.lg ?  ( props.gap?.sm  ?  props.gap?.sm : "0rem"): props.gap.lg,
              },
            },
            pagination:false, 
            breakpoints: {
              440: { //max-width
              
                perPage:props.perPageByScreen.xs,
                flickMaxPages: 1,
                padding: {right: '0'},
                gap: !props.gap?.xs ? "0rem": props.gap.xs, 
                grid: {
                 
                  rows: props.showTwoArray   ? 2 : 1,
                  gap : {
                    row: !props.gap?.xs ? "0rem": props.gap.xs,

                  },
                },
              },
              640: { //max-width
               perPage:( props.perPageByScreen.xs + props.perPageByScreen.sm )/2 ,
                flickMaxPages: 1,
                padding: {right: '0'},
                gap: !props.gap?.xs ? "0rem": props.gap.xs,
                grid: {
                
                  rows: props.showTwoArray   ? 2 : 1,
                  gap : {
                    row: !props.gap?.xs ? "0rem": props.gap.xs,

                  },
                },
              },
              768: { //max-width
                perPage:props.perPageByScreen.sm,
          
                flickMaxPages: 1,
                padding: {right: '0'},
                gap:  !props.gap?.sm ?  ( props.gap?.xs  ?  props.gap?.xs : "0rem"): props.gap.sm,
                grid: {
                 
                  rows: props.showTwoArray   ? 2 : 1,
                  gap : {
                    row: !props.gap?.sm ?  ( props.gap?.xs  ?  props.gap?.xs : "0rem"): props.gap.sm,

                  },
                },
              },
              1024: { //max-width
                perPage:props.perPageByScreen.md,
          
                flickMaxPages: 1,
                padding: {right: '0'},
                gap:  !props.gap?.sm ?  ( props.gap?.xs  ?  props.gap?.xs : "0rem"): props.gap.sm,
                grid: {
                 
                  rows: props.showTwoArray   ? 2 : 1,
                  gap : {
                    row: !props.gap?.sm ?  ( props.gap?.xs  ?  props.gap?.xs : "0rem"): props.gap.sm,

                  },
                },
              },
              1280: {  //max-width
                perPage:props.perPageByScreen.lg  ,
              
                flickMaxPages: 1,
                  padding: {right: '0'},
                  gap:!props.gap?.lg ?  ( props.gap?.sm  ?  props.gap?.sm : "0rem"): props.gap.lg   ,
                  grid: {
                 
                    rows: props.showTwoArray   ? 2 : 1,
                    gap : {
                      row: !props.gap?.lg ?  ( props.gap?.sm  ?  props.gap?.sm : "0rem"): props.gap.lg   ,
  
                    },
                  },
              }, 
             
             
            //   1620: {  //max-width
            //     perPage: calculateSliderPerPage(1620,props.hasSlot, 8 , props.imgWidthAtDpr1x),//props.hasSlot ? 6 : 8, 
            //     flickMaxPages: 1,
            //     padding: {right: '6em'},
            //  }, 
              
            } 
        }).mount({ Grid });
 }));

return <>
    <div class="grid grid-cols-2 lg:grid-cols-6">
    <Slot></Slot>
    <div class={`${props.hasSlot ? 'lg:col-span-4' : 'lg:col-span-6'} col-span-2 ${props.parentId} games-slider splide  backdrop:`} aria-label="SLIDER">
        <div class="splide__arrows">
          <button class={`splide__arrow splide__arrow--prev -left-4 !opacity-0 ${props.arrowClass}`}>

              <ArrowLeft></ArrowLeft>
              </button>

          <button class={`splide__arrow splide__arrow--next right-0 w-1/5 ${props.arrowClass}`}>
            <div class="arrowIcon ml-auto">
             <DoubleArrowRight class={'w-4 h-4 lg:w-auto lg:h-auto'}></DoubleArrowRight>
            </div>
          </button>
        </div>
        <div class="splide__track">
        <ul class="splide__list ">
                {props.providerGameItemList?.map((item)=>(
                  <>
                    <li class="splide__slide group relative cursor-pointer">
                        <div class="splide__slide__container">
                            <div class="slide__content"> 
                              <div> 
                                <ProviderGameBoxCmp class="" 
                                 imgDprList={props.imgDprList}
                                providerGameItem={item} noScaleOnHover={true} />
                              </div>
                            </div>
                        </div>
                    </li>
                </>
                )
                )} 
            </ul>
        </div>
  
      </div> 
    </div>
    </>;
})