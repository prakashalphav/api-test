/*
Readme : 
*/

import { component$,$,  useStylesScoped$ ,useOn, } from "@builder.io/qwik";
import styles from "./HkbLotteryResultSlider3.scss?inline";
import { ArrowRight } from "~/components/icons/ArrowRight";
import { ArrowLeft } from "~/components/icons/ArrowLeft";
import { useScroller } from "~/hooks/utils/useScroller";
import Splide from "@splidejs/splide";
import { useHkbLotteryMapping } from "~/hooks/business/useHkbLotteryResult";
type Props = {
  parentId: string; // '#parent'
  results: Record<string, string>[];
  class?: string;
};

export default component$((props: Props) => {
  useStylesScoped$(styles);
  const { gameNamesMap } = useHkbLotteryMapping();
  const list = props.results;

  useOn(
    "qvisible",
    $(() => {
      console.log("run on qvisible GamesSlider1");
      // will run when the component becomes visible
      new Splide(`#hkbLotteryResultSlider3 .splide`, {
        type: "loop",
        perPage: 4,
        autoplay: true,
        // lazyLoad: "nearby",
        interval: 8000,
        flickMaxPages: 1,
        gap: "12px",
        updateOnMove: true,
        throttle: 300,
        arrows: false,
        pagination: false,
        breakpoints: {
          640: {
            //max-width
            perPage: 3,
            flickMaxPages: 1,
            gap: "6px",
          },
         
        },
      }).mount();
    })
  );

  return (
    <>
      <div class={`relative ${props.class}`} id="hkbLotteryResultSlider3">
        <div class="splide z-30">
          {/* <div class="splide__arrows flex justify-end gap-2.5 absolute right-0 -top-12 lg:-top-14">
            <button
              type="button"
              class="splide__arrow splide__arrow--prev  flex-center rounded-full text-md lg:text-xl border-2 border-current opacity-70 hover:opacity-100 p-1.5"
            >
              <ArrowLeft></ArrowLeft>
            </button>
            <button
              type="button"
              class=" splide__arrow splide__arrow--next  flex-center rounded-full text-md lg:text-xl border-2 border-current opacity-70 hover:opacity-100 p-1.5"
            >
              <ArrowRight></ArrowRight>
            </button>
          </div> */}
          <div
            class="splide__track">
            <ul class="splide__list ">
              {list &&
                list.map((item, index: number) => {
              

                  return (
                    // eslint-disable-next-line qwik/jsx-key
                    <li 
                    key={index}
                    class="splide__slide">
                    <div class="splide__slide__container">
                    <div
                      class={`slide__content  `}
                    >
                      <div class=" content rounded-md p-2 lg:px-5 lg:py-4 flex flex-wrap lg:flex-nowrap justify-center lg:items-center lg:justify-between lg:gap-5  ">
                     
                      <div class="order-1 lg:order-0 shrink-0 ">
                        <p class="font-semibold text-sm lg:text-xl text-center lg:text-left gradientTitle1 lg:leading-tight">
                          {item.game_name}
                        </p>
                        <p class="info-content text-xs lg:text-lg">
                          {item.date}
                        </p>
                      </div>
                      <div class="font-semibold text-lg lg:text-2xl  order-0 lg:order-1 gradientTitle w-full text-center lg:text-right">
                        {item.number1}
                      </div>
                      </div>
                    </div>
                    </div>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
});
