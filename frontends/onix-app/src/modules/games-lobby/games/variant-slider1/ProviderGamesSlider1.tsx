// import ImgLandingImg from '~/media/images/dummy_images/landing_img.png?jsx';
import type { Component } from "@builder.io/qwik";
import { Slot, component$, useOn, $, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./ProviderGamesSlider1.scss?inline";
import type { ProviderGameItem } from "~/services/types";
import { useTransferWalletModal } from "~/hooks/business/useTransferWallet";
  
import { ArrowLeft } from "~/components/icons/ArrowLeft";
import { ArrowRight } from "~/components/icons/ArrowRight";
import Splide from "@splidejs/splide";
import "@splidejs/splide/css/core";
import type { Props as ProviderGameBoxCmpProps} from "~/components/game-box-provider/propsType";  
type Props = {
  gap? : { xs : string , sm? : string , lg? : string } ; // default 0rem
  parentId: string; // '#parent' - *must apply this if one page reuse this component*
  providerGameItemList: ProviderGameItem[];
  hasSlot?: boolean; // optional - for list of items show become 4 if true 
  imgDprList? : number[];
 
  perPageByScreen :   { xs : number, sm : number , md: number , lg: number , xl : number  };
  providerGameBoxCmp : 
  Component<ProviderGameBoxCmpProps>;
};
export default component$((props: Props) => {
  useStylesScoped$(styles);
  useTransferWalletModal();
  const ProviderGameBoxCmp = props.providerGameBoxCmp;
 

  const imageWidth = props.imageWidth ?? 150;
  
  
  /*slot content min rendered width = 341px - see <Slot> */
 /* if imagewith more than 300px than slot should be taking 1 img box , if less than that it should be 2 img box*/
  const ttlBoxesUsedBySlot = !props.hasSlot? 0  :  imageWidth > 300 ? 1 : 2 ; 
  useOn(
    "qvisible",
    $(() => {
      console.log("run on qvisible GamesSlider1");
      // will run when the component becomes visible
      new Splide("." + props.parentId + ".games-slider", {
        type: "loop",
        perPage :  props.perPageByScreen.xl - ttlBoxesUsedBySlot ,// calculateImageDimensions(1440, minPerRow + (4  *  incrementPerRow) , 24 , imageWidth/ imageHeight).width.toString() + "px",
       // fixedHeight : imageHeight,//  calculateImageDimensions(1440,  minPerRow + (4  *  incrementPerRow) , 24 , imageWidth/ imageHeight).height.toString()  + "px",
        autoplay: false,
        lazyLoad: "nearby",
        interval: 8000,
        flickMaxPages: 1,
        updateOnMove: true,
        throttle: 300,
        arrows: true,
        gap: !props.gap?.lg ?  ( props.gap?.sm  ?  props.gap?.sm : "0rem"): props.gap.lg,
        pagination: false,
        breakpoints: {
          440: {
            //max-width
            gap: !props.gap?.xs ? "0rem": props.gap.xs,
            perPage : props.perPageByScreen.xs , 
            // fixedWidth :  calculateImageDimensions(340, minPerRow  , 12 , imageWidth/ imageHeight).width.toString() + "px",
            // fixedHeight :  calculateImageDimensions(440, 3 , 12 , imageWidth/ imageHeight).height.toString()  + "px",
            flickMaxPages: 1,
          },
          640: {
            //max-width
            gap: !props.gap?.xs ? "0rem": props.gap.xs,
            perPage : ( props.perPageByScreen.xs + props.perPageByScreen.sm )/2 , 
            // fixedWidth :  calculateImageDimensions(440, minPerRow  , 12 , imageWidth/ imageHeight).width.toString() + "px",
            // fixedHeight :  calculateImageDimensions(440, 3 , 12 , imageWidth/ imageHeight).height.toString()  + "px",
            flickMaxPages: 1,
          },
          768: {
            //max-width
            gap: !props.gap?.sm ?  ( props.gap?.xs  ?  props.gap?.xs : "0rem"): props.gap.sm,
            perPage : props.perPageByScreen.sm , 
            // fixedWidth :   calculateImageDimensions(568, minPerRow +  (1  *  incrementPerRow)  , 24 , imageWidth/ imageHeight).width.toString() + "px",
            // fixedHeight :  calculateImageDimensions(568, minPerRow + 1 , 24 , imageWidth/ imageHeight).height.toString()  + "px",
            flickMaxPages: 1,
          }, 

          1024: {
            //max-width
            gap: !props.gap?.sm ?  ( props.gap?.xs  ?  props.gap?.xs : "0rem"): props.gap.sm,

            perPage : props.perPageByScreen.md , 
            // fixedWidth :   calculateImageDimensions(824, minPerRow + (2  *  incrementPerRow) , 24 , imageWidth/ imageHeight).width.toString() + "px",
            // fixedHeight :  calculateImageDimensions(824,  minPerRow + 2 , 24 , imageWidth/ imageHeight).height.toString()  + "px",
            flickMaxPages: 1,
          }, 
          
          1280: {
            //max-width
            gap: !props.gap?.lg ?  ( props.gap?.sm  ?  props.gap?.sm : "0rem"): props.gap.lg   ,
             perPage : props.perPageByScreen.lg - ttlBoxesUsedBySlot , 
            // fixedWidth :   calculateImageDimensions(1024, minPerRow + (3  *  incrementPerRow) , 24 , imageWidth/ imageHeight).width.toString() + "px",
            // fixedHeight :  calculateImageDimensions(1024,  minPerRow + (3  *  incrementPerRow) , 24 , imageWidth/ imageHeight).height.toString()  + "px",
            flickMaxPages: 1,
          }, 
         
          // 1536: {
          //   //max-widthckMaxPages: 1,
          //
          //   perPage:calculateSliderPerPage(1536,props.hasSlot, 6 , props.imgWidthAtDpr1x),//  props.hasSlot ? 4 : 6,
          //   fli },
        },
      }).mount();
    })
  );
  
  return (
    <>
 
      <div class="grid grid-cols-2 lg:grid-cols-6 ">
        {/* base on this css if got Slot content it will take up min ard 2/6 * 1024 = 341px on desktop */}
        <Slot></Slot>
        <div
          class={`${
            props.hasSlot ? "lg:col-span-4" : "lg:col-span-6"
          } col-span-2 ${props.parentId} games-slider splide  backdrop:`}
          aria-label="SLIDER"
        >
          <div class="splide__arrows">
            <button class="splide__arrow splide__arrow--prev -left-4">
              <ArrowLeft style="width:10px;height:18px"></ArrowLeft>
            </button>

            <button class="splide__arrow splide__arrow--next -right-4">
              <ArrowRight style="width:10px;height:18px"></ArrowRight>
            </button>
          </div>
          {/* if slide_content has scale larger on hover, to allow overflow out can't use overflow-y:visible. have to add py-4 for here, but it is too hardcoded so not add  */}
          <div class="splide__track">
             
                      <ul class="splide__list ">
              {props.providerGameItemList?.map((item) => (
                <>
                  <li class="splide__slide hover:z-10 relative ">
                    <div class="splide__slide__container">
                      <div class="slide__content">
                        <ProviderGameBoxCmp class="" 
                        imgDprList={props.imgDprList}
                        providerGameItem={item} noScaleOnHover={true} />
                      </div>
                    </div>
                  </li>
                </>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
});
