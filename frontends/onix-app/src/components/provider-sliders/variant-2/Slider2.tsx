/*This slider doesn't have links. on select return provider game_code*/

import type { PropFunction, Signal } from "@builder.io/qwik";
import { component$, useStylesScoped$, useVisibleTask$ } from "@builder.io/qwik";

import styles from "./Slider2.scss?inline";

import { imgBase } from "../../../services/images";
import type { Provider } from "~/services/types";
import {ArrowRight} from "~/components/icons/ArrowRight";
import {ArrowLeft} from "~/components/icons/ArrowLeft";
import { useScroller } from "~/hooks/utils/useScroller"; 
type Props = {
  selGameCodes? : Signal<string[]>; //selected game_codes 
  providers: Provider[];
  onSelect?: PropFunction<(item: Provider) => Promise<void>>;
  categorySlug?:string; //PRESET category to filter the providers, if not set then no need filter but will show category name on list
  class?:string;
  inlineStyle?:string;
};

export default component$((props: Props) => {
  useStylesScoped$(styles); 
  const { onSideScroll, scrollToElement } = useScroller('#slider2Scroller', 100);
  useVisibleTask$(() => {
    scrollToElement('.active');
  });

  let prevGameCode = "";
  return (
    <>
      <div
        
        class={`providersSlider px-8  sm:px-16 pb-3 pt-1.5 sm:pt-5 relative rounded-lg h-20 sm:h-24 ${props.class ?? ''}`}
        style={props.inlineStyle}
      >
        <div class="absolute top-1/2 -translate-y-1/2  left-2 sm:left-5  ">
          <button   onClick$={()=>{
            onSideScroll('left' )
        }} type="button" class="w-5 sm:w-9 text-xs sm:text-base aspect-square rounded-full arrowsBtn flex-center hover:opacity-50">
            <ArrowLeft></ArrowLeft>
          </button>
        </div>
        <div id="slider2Scroller" class=" flex gap-3 flex-nowrap overflow-x-auto scroller sm:pb-2 h-full text-center overflow-y-hidden" >

         
          {props.providers.map((item) => {
            if(props.categorySlug && item.category_slug !=props.categorySlug){
              return (<>
                {/* {props.categorySlug } <br></br>
           {item.category_slug} <br></br>
           {item.category_slug !=props.categorySlug ? "not " : "yes" } */}
              </>);
            } 

            if(prevGameCode == item.game_code ){
              //if ald displayed this game_code skipt this  
              return (<> 
              </>);
            }
            prevGameCode =item.game_code;
            
            return (
            <button 
            key={item.game_code}
              type="button"
              onClick$={async () => {
                
                if(props.onSelect){
                  await props.onSelect(item);

                }else {
                  location.href=`/${item.category_slug}/${item.brand_slug}/`;
                }
              }}
              class={`shrink-0 ${
                props.selGameCodes?.value.includes(item.game_code) ? 'active rounded-md px-2' : ''
              }`}
            >
              <img
                width={200}
                height={60}
                class="h-3/4  w-auto"
                loading="lazy"
                decoding="async"
                src={`${imgBase}/assets/imgs/game_logos/200x60/${item.game_code}.png`}
              />
              {/* if got preset filter category then don't need show category text  */}
              {!props.categorySlug  && <p class="text-xxs truncate italic opacity-50 pt-1" > {item.category}</p> }
            </button>
          )} )}
        </div>

        <div class="absolute top-1/2 -translate-y-1/2 right-2 sm:right-5 ">
        <button onClick$={()=>{
            onSideScroll('right' )
        }} type="button"class="w-5 sm:w-9 text-xs sm:text-base aspect-square rounded-full arrowsBtn    flex-center  hover:opacity-50">
            <ArrowRight></ArrowRight>
          </button>
        </div>
      </div>
    </>
  );
});
