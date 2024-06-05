/*
author: Brandon
*/

import { component$, useStylesScoped$, useOn, $} from "@builder.io/qwik";
import styles from "./HkbLotteryResultSlider2.scss?inline";
import type { HKBLotteryResult } from "~/services/types";
import { Splide } from '@splidejs/splide';
import {ArrowRight3Icon} from "~/components/icons/ArrowRight3";
import {ArrowLeft3Icon} from "~/components/icons/ArrowLeft3";
import { Grid } from '@splidejs/splide-extension-grid';

type Props = {
  results: HKBLotteryResult[] | undefined;
  class?: string;
};
 
export default component$((props: Props) => {
  useStylesScoped$(styles);
  const list = props.results;
  // const chunkArrayInGroups = (arr: HKBLotteryResult[] | undefined, size: number) => {
  //   const resArr = [];
  //   if (arr) {
  //     while (arr.length) {
  //       resArr.push(arr.splice(0, size));
  //     }
  //     if (resArr) {
  //       const lastSlide = resArr[resArr.length - 1];
  //       if (lastSlide && lastSlide.length != size) {
  //         while (lastSlide.length < size) {
  //           lastSlide.push({game_name:'', date: '', number1: ''});
  //         }
  //       }
  //     }
  //   }
  //   return resArr;
  // }
  // const processedList = chunkArrayInGroups(list, 10);

  useOn( "qvisible", $(() => {
    // console.log("run on qvisible hkbLotteryResultSlider2");
    new Splide( '#hkbLotteryResultSlider2', {
      type: 'loop', 
      pagination: false,
      grid: {
        rows: 2,
        cols: 5,
        gap : {
          row: '0.75rem',
          col: '0.75rem',
        },
      },
      breakpoints: {
        640: { //max-width
          grid: {
            rows: 3,
            cols: 1,
            gap : {
              row: '0.5rem',
              col: '0.5rem',
            },    
          },
        },
      }
    } ).mount({ Grid });
    
    // new Splide( '#hkbLotteryResultSlider2' ,{
    //   autoplay : true,
    //   interval: 2000, 
    //   pagination: false,
    //   arrows: true,
    //   breakpoints: {
    //     640: {
    //       destroy: true,
    //       arrows: false,
    //     },
    //   }
    // }).mount();
  }));
  
  return (
    <>
      <div id="hkbLotteryResultSlider2" class={`${props.class || ''} splide cursor-pointer`}>
          <div class="splide__arrows flex justify-end gap-1.5 sm:gap-3 mb-2">
            <button class="splide__arrow splide__arrow--prev rounded-md flex-center" style="display:inline-flex">
              <ArrowLeft3Icon class="text-base" />
            </button>
            <button class="splide__arrow splide__arrow--next rounded-md flex-center" style="display:inline-flex">
              <ArrowRight3Icon class="text-base" />
            </button>
          </div>
          <div class={`innerWrapper rounded-lg p-2 sm:p-3`}>
            <div class="splide__track">
              <ul class="splide__list">
                {/* {processedList && processedList.map((slideItem, index, processedList) => {
                  return (
                    <div key={`hmm-${index}`} class="splide__slide">
                      <div class={`grid grid-cols-1 sm:grid-cols-5 gap-x-3 gap-y-2.5 sm:gap-y-3 ${index + 1 === processedList.length ? "" : "mb-2.5 sm:mb-0"}`}>
                      {slideItem.map((item: HKBLotteryResult, index2: number) => {
                        return (
                        <div key={index2} class={`sliderItem flex justify-between items-center py-3.5 sm:py-3.5 px-4 rounded-lg ${item.number1 ? "" : "hidden sm:flex"}`}>
                          <div>
                            <div class="font-semibold sm:text-base">
                              { item.game_name.toUpperCase() }
                            </div>
                            <div class="text-xs sm:text-xs">{ item.date }</div>
                          </div>
                          <div class={`amountText font-semibold text-2xl ${item.number1 ? "sm:text-2xl" : "sm:text-base grow text-center"}`}>{ item.number1 || "----" }</div>
                        </div>
                        );
                      })}
                      </div>
                    </div>
                  );
                })} */}
                {list && list.map((item: HKBLotteryResult, index2: number) => {
                  return (
                  <div key={index2} class={`splide__slide sliderItem flex justify-between items-center py-3.5 sm:py-3.5 px-4 rounded-lg ${item.number1 ? "" : "hidden sm:flex"}`}>
                    <div>
                      <div class="font-semibold sm:text-base">
                        { item.game_name.toUpperCase() }
                      </div>
                      <div class="text-xs sm:text-xs">{ item.date }</div>
                    </div>
                    <div class={`amountText font-semibold text-2xl ${item.number1 ? "sm:text-2xl" : "sm:text-base grow text-center"}`}>{ item.number1 || "----" }</div>
                  </div>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
    </>
  );
});
