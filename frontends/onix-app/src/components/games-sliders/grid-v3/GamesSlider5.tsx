import { component$, useStyles$, useTask$ } from "@builder.io/qwik";
import { isServer } from "@builder.io/qwik/build";

import styles from "./GamesSlider5.scss?inline";

import { bannerBase } from "~/services/images";

import "spicr/dist/css/spicr.min.css";
import { capitalize, mouseHoverEvents, touchEvents } from "~/utils/common";
import { ArrowRight } from "~/components/icons/ArrowRight";
import { ArrowLeft } from "~/components/icons/ArrowLeft";
import { useGameLaunch } from "~/hooks/business/useGameList";
import type { ProviderGameItem } from "~/services/types";
import { useCommonViewData } from "~/hooks/app/useCommonViewData";
//import Spicr  from "~/plugins/spicr";

import type { Props as ProviderGameBoxCmpProps } from "~/components/game-box-provider/propsType";

type Props = {
  parentId: string; // '#parent'
  gameList: ProviderGameItem[];
  tag: string;
  class?: string;
  providerGameBoxCmp: Component<ProviderGameBoxCmpProps>;
};

export default component$((props: Props) => {
  useStyles$(styles);
  const ProviderGameBoxCmp = props.providerGameBoxCmp;
  const length = props.gameList.length;
  console.log("length", length);

  const matrix = props.gameList.reduce((result, value, index, array) => {
    if (index % 4 === 0) {
      result.push(array.slice(index, index + 4));
    }
    return result;
  }, []);

  // internal variables and / or constants
  const itemWidth = 250;
  const itemGap = 16;
  const itemsPerPage = 5;
  let idx = 0;
  const itemsInitPos = (itemsPerPage * itemWidth + itemGap * itemsPerPage) * -1;
  const totalWidth = itemsPerPage * itemWidth + itemGap * (itemsPerPage - 1);

  const activeIndex = itemsPerPage + (itemsPerPage - 1) / 2;

  useTask$(
    async ({ cleanup }) => {
      if (isServer) {
        return; // Server guard
      }

      const isMobile = /mobile/.test(navigator.userAgent.toLowerCase());
      const pauseEvents = isMobile ? touchEvents : mouseHoverEvents();

      const Spicr = (await import("~/plugins/spicr")).default;
      const sideSliderElement = document.querySelector<HTMLElement>(
        `${props.parentId} .games-slider-5__side`
      );
      const mainSliderElement = document.querySelector<HTMLElement>(
        `${props.parentId} .games-slider-5__main`
      );
      const sliderElement = document.querySelector<HTMLElement>(
        `${props.parentId} .games-slider-5`
      );

      if (sideSliderElement && mainSliderElement && sliderElement) {
        let isPaused = false;
        let sideSlider = null;
        let mainSlider = null;
        let mainSliderTimer = null;
        let mainSliderNextActive = 0;
        let _mainSliderNextActive = 0;
        let sideSliderActive = 0;
        const mainSliderInterval = 3000; //3 seconds
        const onSideSliderAfterTwn = () => {
          if (!sideSlider || !mainSlider) return;
          const sideActiveSlide = document.querySelector<HTMLElement>(
            `${props.parentId} .games-slider-5__side .item.active`
          );
          if (!sideActiveSlide) return;
          sideSliderActive = parseInt(sideActiveSlide.dataset.matrixidx || "");

          console.log(
            "onSideSliderAfterTwn sideSliderActive",
            sideSliderActive
          );

          clearInterval(mainSliderTimer);
          mainSliderNextActive = _mainSliderNextActive = sideSliderActive * 4; //first index the main slider need to slide to
          // { (sideSliderActive  ) * 4 } to {( (sideSliderActive + 1 ) * 4) - 1}
          // 0 - (7-1)
          // 4 - (8-1)

          mainSlider.slideTo(mainSliderNextActive);
        };
        const onMainSliderAfterTwn = () => {
          console.log(
            "onMainSliderAfterTwn mainSliderNextActive",
            _mainSliderNextActive
          );
          //after the previous  slideTo on mainSlider Ends
          //do the next slideTo on mainSlider
          // wil keep doing in a cycle from mainSliderNextActive to ( (sideSliderActive + 1 ) * 4)
          clearInterval(mainSliderTimer);
          console.log("onMainSliderAfterTwnisPaused ", isPaused);
          if (!mainSlider || isPaused) return;

          _mainSliderNextActive += 1;
          console.log(
            "onMainSliderAfterTwn mainSliderNextActive",
            mainSliderNextActive,
            (sideSliderActive + 1) * 4
          );

          if (_mainSliderNextActive < (sideSliderActive + 1) * 4) {
            //remain
          } else {
            //reinit
            _mainSliderNextActive = mainSliderNextActive;
          }
          mainSliderTimer = setTimeout(() => {
            mainSlider.slideTo(_mainSliderNextActive);
            console.log(
              "onMainSliderAfterTwn mainSlider.slideTo",
              _mainSliderNextActive
            );
          }, mainSliderInterval);

          console.log("onMainSliderAfterTwn mainSliderTimer", mainSliderTimer);
        };
        const initSpicr = () => {
          sideSlider = new Spicr(sideSliderElement);
          mainSlider = new Spicr(mainSliderElement);
          console.log("initSpicr", sideSliderElement, sideSlider);
          toggleEvents(1);
        };

        const toggleEvents = (add: number | boolean) => {
          if (add) {
            sideSliderElement.addEventListener(
              "afterTween",
              onSideSliderAfterTwn
            );
            mainSliderElement.addEventListener(
              "afterTween",
              onMainSliderAfterTwn
            );
            sliderElement["addEventListener"](pauseEvents[0], pauseHandler);
            sliderElement["addEventListener"](pauseEvents[1], resumeHandler);
          } else {
            sideSliderElement.removeEventListener(
              "afterTween",
              onSideSliderAfterTwn
            );
            mainSliderElement.removeEventListener(
              "afterTween",
              onMainSliderAfterTwn
            );
            sliderElement["removeEventListener"](pauseEvents[0], pauseHandler);
            sliderElement["removeEventListener"](pauseEvents[1], resumeHandler);
          }
        };

        const pauseHandler = () => {
          isPaused = true;
          clearInterval(mainSliderTimer);
          console.log("pauseHandler", isPaused);
        };
        const resumeHandler = () => {
          isPaused = false;
          onMainSliderAfterTwn();
          console.log("resumeHandler", isPaused);
        };

        initSpicr();

        cleanup(() => {
          toggleEvents(0);
          sideSlider?.dispose();
          mainSlider?.dispose();
        });
      }
    },
    { eagerness: "visible" }
  );
  const { launchProviderGameItemQRL } = useGameLaunch();

  const { commonData } = useCommonViewData();
  return (
    <>
      <div
        class={`games-slider-5 flex min-h-full justify-center items-start gap-2 lg:gap-4 ${
          props.class || ""
        }`}
      >
        <div
          class="games-slider-5__main spicr spicr-carousel paused flex justify-center flex-auto !w-[170px] sm:!w-[330px] md:!w-[200px] lg:!w-[250px] xl:!w-[330px] 2xl:!w-[360px] flex-shrink-0 paused"
          data-interval="false"
          data-touch="false"
          data-easing="easingCubicInOut"
          data-opacity="true"
          data-delay="200"
          data-duration="700"
        >
          <div class="spicr-inner ">
            {props.gameList.map((item, i) => {
              return (
                <div
                  key={item.id}
                  class={`item  ${i === 0 ? "active " : ""}`}
                  data-idx={i}
                >
                  <div class="perspective content text-left ">
                    <div class="spicr-layer relative" data-opacity="false">
                      {/* <button
                        onClick$={async () => {
                          await launchProviderGameItemQRL(
                            item,
                            commonData.isAuth,
                            item.has_demo && !commonData.isAuth ? 1 : 0
                          );
                          return;
                        }}
                        class="w-full relative block "
                      >
                        <div class="img-wrapper relative -z-1 rounded-[20px] overflow-hidden ">
                          <picture>
                            <source
                              srcSet={
                                item.img_src +
                                "@2x.avif?v=" +
                                item.img_v +
                                " 1x, " +
                                item.img_src +
                                "@3x.avif?v=" +
                                item.img_v +
                                " 1.5x, "
                              }
                              type="image/avif"
                              width="440"
                              height="440"
                            />
                            <source
                              srcSet={
                                item.img_src +
                                "@2x.webp?v=" +
                                item.img_v +
                                " 1x, " +
                                item.img_src +
                                "@3x.webp?v=" +
                                item.img_v +
                                " 1.5x, "
                              }
                              type="image/webp"
                              width="440"
                              height="440"
                            />

                            <img
                              src={item.img_src + ".jpg?v=" + item.img_v}
                              class="aspect-square w-full max-w-[440px]"
                              alt={item.game_name}
                              width="440"
                              height="440"
                              loading="lazy"
                              decoding="async"
                              // srcSet="small.png 1x, medium.png 2x, large.png 3x"
                            />
                          </picture>
                          <div class="absolute tag-category left-2 top-2 rounded-3xl px-2 py-1 text-xs">
                            {item.category_slug}
                          </div>
                        </div>
                       
                        <div class="px-2 relative  z-10  ">
                          <p class="py-2 truncate "> {item.game_name}</p>
                          <p class="pb-2  text-xs opacity-50  ">
                            {" "}
                            {capitalize(item.brand_slug)}
                          </p>
                        </div>
                      </button> */}
                      <ProviderGameBoxCmp class="w-full relative block " imgDprList={[1 , 1.5]} providerGameItem={item} noScaleOnHover={true}  />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div class="min-h-full">
          <div
            class="games-slider-5__side spicr spicr-carousel paused flex justify-center flex-auto !h-full"
            data-interval="16000"
            data-easing="easingCubicInOut"
            data-transform-origin="z:-50%"
            data-rotate="y:90"
            data-delay="200"
            data-duration="700"
          >
            <div class="spicr-inner ">
              {matrix.map((arr, i) => {
                return (
                  <div
                    key={i}
                    class={`item ${idx === 0 ? "active" : ""}`}
                    data-matrixidx={i}
                  >
                    <div class="grid gap-1 lg:gap-4 grid-cols-2 grid-rows-2">
                      {arr.map((item, j) => {
                        idx++;
                        return (
                          <div key={item.id} class="perspective ">
                            <div class="spicr-layer">
                              {/* <button
                                onClick$={async () => {
                                  await launchProviderGameItemQRL(
                                    item,
                                    commonData.isAuth,
                                    item.has_demo && !commonData.isAuth ? 1 : 0
                                  );
                                  return;
                                }}
                                class="block img-wrapper relative rounded-[20px]  overflow-hidden"
                              >
                                <picture>
                                  <source
                                    srcSet={
                                      item.img_src +
                                      ".avif?v=" +
                                      item.img_v +
                                      " 1x, " +
                                      item.img_src +
                                      "@2x.avif?v=" +
                                      item.img_v +
                                      " 2x, " +
                                      item.img_src +
                                      "@3x.avif?v=" +
                                      item.img_v +
                                      " 3x, "
                                    }
                                    type="image/avif"
                                    width="220"
                                    height="220"
                                  />
                                  <source
                                    srcSet={
                                      item.img_src +
                                      ".webp?v=" +
                                      item.img_v +
                                      " 1x, " +
                                      item.img_src +
                                      "@2x.webp?v=" +
                                      item.img_v +
                                      " 2x, " +
                                      item.img_src +
                                      "@3x.webp?v=" +
                                      item.img_v +
                                      " 3x, "
                                    }
                                    type="image/webp"
                                    width="220"
                                    height="220"
                                  />

                                  <img
                                    src={item.img_src + ".jpg?v=" + item.img_v}
                                    class="aspect-square w-full"
                                    alt={item.game_name}
                                    width="220"
                                    height="220"
                                    loading="lazy"
                                    decoding="async"
                                    style="max-width:220px;"
                                    // srcSet="small.png 1x, medium.png 2x, large.png 3x"
                                  />
                                </picture>
                                <div class="absolute tag-category left-2 top-2 rounded-3xl px-2 py-1 text-xs hidden sm:block">
                                  {item.category_slug}
                                </div>
                              </button>
                              <p class="text-xs sm:text-sm my-1 sm:my-2 truncate">
                                {" "}
                                {item.game_name}
                              </p>
                              <p class="text-xxs sm:text-xs opacity-50 truncate">
                                {" "}
                                {capitalize(item.brand_slug)}
                              </p> */}
                                <ProviderGameBoxCmp  providerGameItem={item} noAdjustTransformOrigin={true}   />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
            {/* pages */}
            <a class="left spicr-control long-shadows" data-slide="prev">
              <span class="arrow-prev flex-center rounded-full">
                <ArrowLeft></ArrowLeft>
              </span>
            </a>
            <a class="right spicr-control long-shadows" data-slide="next">
              <span class="arrow-next flex-center rounded-full">
                <ArrowRight></ArrowRight>
              </span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
});
