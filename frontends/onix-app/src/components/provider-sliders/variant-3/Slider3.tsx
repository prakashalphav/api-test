/*TODO : THIS CMP NOT USED ANYWHERE . MAY NEED REMOVE IT */
/*This slider doesn't have links. on select return provider game_code*/

import type { PropFunction, Signal } from "@builder.io/qwik";
import { component$, useStylesScoped$ } from "@builder.io/qwik";

import styles from "./Slider3.scss?inline";

import { imgBase } from "../../../services/images";
import type { Provider } from "~/services/types";

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
  

  let prevGameCode = "";
  return (
    <>
      <div
        
        class={`providersSlider pb-3  relative rounded-lg  ${props.class ?? ''}`}
        style={props.inlineStyle}
      >
        
        <div id="slider3Scroller" class="flex gap-1.5 lg:gap-3 flex-nowrap overflow-x-auto scroller sm:pb-2 h-full text-center overflow-y-hidden" >

         
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
{/*               
              {prevGameCode} <br></br>
              {item.game_code} <br></br> */}
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
              class={`shrink-0 hover:scale-110 transition-transform sliderItem p-2.5 rounded-md ${
                props.selGameCodes?.value.includes(item.game_code) ? 'active rounded-md' : ''
              }`}
            >
              <img
                width={200}
                height={60}
                class="h-auto  w-16 lg:w-28"
                loading="lazy"
                decoding="async"
                src={`${imgBase}/assets/imgs/game_logos/200x60/${item.game_code}.png`}
              />
             
            </button>
          )} )}
        </div>

        
      </div>
    </>
  );
});
