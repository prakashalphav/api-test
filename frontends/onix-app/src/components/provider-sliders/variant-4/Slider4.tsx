/*This slider doesn't have links. on select return provider game_code*/

import { component$, $, useOn, useStylesScoped$ } from "@builder.io/qwik";

import styles from "./Slider4.scss?inline";
import { imgBase } from "../../../services/images";
import type { Provider } from "~/services/types";
import {ArrowRight} from "~/components/icons/ArrowRight";
import {ArrowLeft} from "~/components/icons/ArrowLeft";
import Splide from "@splidejs/splide";
import { inlineTranslate } from "qwik-speak";
import { DoubleArrowRight } from "~/components/icons/DoubleArrowRight";
import { useCommonViewData } from "~/hooks/app/useCommonViewData";
import { isMobileDevice } from "~/utils/common";
type Props = {
  providers: Provider[];
};

export default component$((props: Props) => {
  useStylesScoped$(styles);
  const t = inlineTranslate();
  const {commonData} = useCommonViewData();
  const isMobile=   isMobileDevice(null, commonData.device );

  useOn( "qvisible", $(( ) => { 
    console.log("run on qvisible GamesSlider1" );
    // will run when the component becomes visible  
    new Splide(`.provider-slider` ,{
      type   : 'loop',
        perPage: 4,
        autoplay : true,
        lazyLoad : "nearby",
        interval: 8000, 
        flickMaxPages: 1,
        gap: "32px",
        updateOnMove: true, 
        throttle: 300,
          arrows : true,
          pagination:false,
          breakpoints: {
            640: { //max-width
              perPage: 4, 
              flickMaxPages: 1,
              gap: "16px",
            },
            1280: {  //max-width
                perPage: 6, 
                flickMaxPages: 1,
              }, 
            1536: {  //max-width
                perPage: 9, 
                flickMaxPages: 1,
              }, 
            
          } 
      }).mount();
}));
let prevGameCode = "";
return <>
    <div>
        <section class="providerSlider px-3 py-2 lg:px-4 lg:py-3 relative mb-6 rounded-xl">
          <div class={`provider-slider splide z-30`} aria-label="SLIDER">
            <div class="splide__arrows">
              <button class={`splide__arrow splide__arrow--prev -left-4 !opacity-0 `}>
                <ArrowLeft></ArrowLeft>
              </button>

              <button
                class={`splide__arrow splide__arrow--next right-0 w-1/5 lg:!opacity-0`}
              >
                <div class="arrowIcon ml-auto">
                  <DoubleArrowRight
                    class={"w-4 h-4 lg:w-auto lg:h-auto"}
                  ></DoubleArrowRight>
                </div>
              </button>
            </div>
            <div class="splide__track">
              <ul class="splide__list ">
                {props.providers.map((item, index) => { 
                   if(prevGameCode == item.game_code ){
                    //if ald displayed this game_code skipt this  
                    return (<> 
                    </>);
                  }
                  prevGameCode =item.game_code;
                  return (
                  <>
                    <li key={index} class="splide__slide">
                      <div class="splide__slide__container">
                        <div class="slide__content">
                          <button 
                           key={item.game_code}
                            type="button"
                            onClick$={async () => {
                                location.href=`/${item.category_slug}/${item.brand_slug}/`;
                            }}
                            class={`shrink-0`}
                          >
                            {isMobile && 
                             <img
                             width={200}
                             height={60}
                             class="h-3/4  w-auto"
                             loading="lazy"
                             decoding="async"
                             src={`${imgBase}/assets/imgs/game_logos/100x70/${item.game_code}.png`}
                           />
                            }
                            {!isMobile && 
                             <img
                             width={200}
                             height={60}
                             class="h-3/4  w-auto"
                             loading="lazy"
                             decoding="async"
                             src={`${imgBase}/assets/imgs/game_logos/200x60/${item.game_code}.png`}
                           />
                            }
                          </button>
                        </div>
                      </div>
                    </li>
                  </>
                )})}
              </ul>
            </div>
          </div>
        </section>
    </div>
  </>;
});