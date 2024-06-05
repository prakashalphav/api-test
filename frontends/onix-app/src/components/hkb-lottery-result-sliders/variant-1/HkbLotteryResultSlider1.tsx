/*
Readme : 
*/

import { component$, useStylesScoped$} from "@builder.io/qwik";
import styles from "./HkbLotteryResultSlider1.scss?inline";
import { ArrowRight } from "~/components/icons/ArrowRight";
import { ArrowLeft } from "~/components/icons/ArrowLeft";
import { useScroller } from "~/hooks/utils/useScroller";

import { useHkbLotteryMapping } from "~/hooks/business/useHkbLotteryResult";
type Props = {
  parentId: string; // '#parent'
  results: Record<string, string>[];
  class?:string;
};
 
export default component$((props: Props) => {
  useStylesScoped$(styles);
 const {gameNamesMap} =  useHkbLotteryMapping()
  const list  =  props.results;
 const {onSideScroll } = useScroller('#hkbLotteryResultSlider1', 100);
  return (
    <>
      <div id="hkbLotteryResultSlider1"
       class={`${props.class??''} overflow-auto scroller scroller--invisible whitespace-nowrap pb-2.5`}
      >
       
        <div class="flex gap-3 flex-nowrap">
          {list && list.map((item, i: number) => {

            const mapping = gameNamesMap.get(item.game_name);

            return (
              // eslint-disable-next-line qwik/jsx-key
              <div style="width:190px;" class={`content inline-block rounded-xl py-2.5 px-3 flex-center gap-5 shrink-0`}>
                <img width="51" height="51" src={`https://files.sitestatic.net/assets/imgs/country-flags/square/51x51/${mapping.countryCode}.webp`} loading="lazy" decoding="async"  class="rounded-[10px]" style="width:51px;height:51px;"></img>
                <div>
                <p class="font-medium">{ item.game_name }</p>
                <p class="font-semibold text-2xl my-1.5">{ item.number1 }</p>
                <p class="" >{ item.date }</p>
                </div>
              </div>
            );
          })}
          </div> 
      </div>

       {/* navigation arrows */}
       <div class="flex justify-end gap-2.5"> 
          <button onClick$={()=>{
            onSideScroll('left' )
        }} type="button"  class=" flex-center rounded-full text-xl border-2 border-current opacity-70 hover:opacity-100 p-1.5">
            <ArrowLeft></ArrowLeft>
          </button>   
          <button onClick$={()=>{
            onSideScroll('right' )
        }} type="button"  class=" flex-center rounded-full text-xl border-2 border-current opacity-70 hover:opacity-100 p-1.5">
            <ArrowRight></ArrowRight>
          </button> 
          </div>
    </>
  );
});
