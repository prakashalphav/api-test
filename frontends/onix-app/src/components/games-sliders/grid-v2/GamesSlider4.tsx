import { component$, useStyles$, useTask$ } from "@builder.io/qwik";
import { isServer } from "@builder.io/qwik/build";
import { inView, animate } from "motion";
import styles from "./GamesSlider4.scss?inline";

import { bannerBase } from "~/services/images";

type Props = {
  parentId: number; // '#parent'
  gameList: Record<string, unknown>[];
  tag: string;
};

export default component$((props: Props) => {
  useStyles$(styles);

  const length = props.gameList.length;
  console.log("length", length);
  const cloned = [
    props.gameList[length - 3],
    props.gameList[length - 2],
    props.gameList[length - 1],
    ...props.gameList,
    props.gameList[0],
    props.gameList[1],
    props.gameList[2],
  ];
  const slide2Height = 114;
  const slide2Gap = 8;
  const slide2InitPos = -1 * ((slide2Height + slide2Gap) * 3);
  const totalHeight = slide2Height * 3 + slide2Gap * 2;
  useTask$(
    () => {
      if (isServer) {
        return; // Server guard
      }
      let _tY = slide2InitPos;
      let tY = slide2InitPos;

      const runAnimate = (slides) => {
        const element = document.querySelector<HTMLElement>(
          props.parentId + " .grid-games"
        );
        const animation = animate(
          (progress) => {
            _tY = tY - (slide2Height + slide2Gap) * progress;
            slides.forEach((slide, index) => {
              slide.style.transform = `translateY(${_tY}px)`;

              const slideInd = slide.dataset.ind;
              const slideTy = slide.dataset.ty;

              if (Math.abs(parseInt(slideTy) * -1) == Math.abs(_tY)) {
                console.log("showhide", slideInd, slideTy, _tY);
                const activeSlide = document.querySelector<HTMLElement>(
                  props.parentId + " .grid-games .track_1 li.active"
                );
                if (activeSlide?.dataset.ind !== slideInd) {
                  //if activeslide is not the currenct slideInd to show ald
                  activeSlide?.classList.remove("active");
                  const slideToShow = document.querySelector<HTMLElement>(
                    props.parentId +
                      ' .grid-games .track_1 li[data-ind="' +
                      slideInd +
                      '"]'
                  );

                  slideToShow?.classList.add("active");
                  console.log("showhide", slideToShow);
                }
              }
            });
          },
          { duration: 0.5, easing: "ease-in", delay: 3 }
        );
        animation.finished.then(() => {
          tY = _tY;
          if (tY <= length * ((slide2Height + slide2Gap) * -1)) {
            tY = slide2InitPos;

            slides.forEach((slide, index) => {
              slide.style.transform = `translateY(${tY}px)`;
            });
          }
          element?.removeEventListener("mouseover", animation.pause);
          element?.removeEventListener("mouseout", animation.play);
          runAnimate(slides);
        });

        element?.addEventListener("mouseover", animation.pause);
        element?.addEventListener("mouseout", animation.play);
        return animation;
      };
      inView(props.parentId + " .grid-games .track_2", (info) => {
        // animate(info.target, { opacity: 1, transform: 'translateY(154px)'}, {easing:spring()})

        const slides = document.querySelectorAll<HTMLElement>(
          props.parentId + " .grid-games .track_2 li"
        );
        //156
        runAnimate(slides);
      });
    },
    { eagerness: "visible" }
  );

  return (
    <>
      <div>
        <div class="flex-center gap-2 flex-col md:flex-row grid-games">
          <div
            class={`track track_1 overflow-hidden flex-shrink-0 w-full md:w-[320px]`}
            style={`height:${totalHeight}px`}
          >
            <ul class="list relative w-full h-full">
              {Object.values(props.gameList).map((item, i) => (
                <li
                  class={
                    "absolute inset-0 slide will-change-auto " +
                    (i != 0 ? " " : "active")
                  }
                  data-ind={i}
                >
                  <div class="slide__container w-full h-full">
                    <div class="slide__content w-full h-full relative rounded-[20px] overflow-hidden  ">
                      <a
                        href={
                          "/" +
                          item.category_slug +
                          "/" +
                          item.brand_slug +
                          "?q=" +
                          item.game_name
                        }
                        class="block w-full h-full"
                      >
                        <div class="absolute top-4 left-4 tag-category rounded-3xl px-3 py-1 text-lg">
                          {props.tag}
                        </div>
                        <div class="relative image-wrap rounded-t-[20px]  w-full h-auto  overflow-hidden">
                          <picture>
                            <source
                              srcSet={
                                item.img_src +
                                "@3x.avif?v=" +
                                item.img_v +
                                " 1x, "
                              }
                              type="image/avif"
                              width="320"
                              height="320"
                            />
                            <source
                              srcSet={
                                item.img_src +
                                "@3x.webp?v=" +
                                item.img_v +
                                " 1x, "
                              }
                              type="image/webp"
                              width="320"
                              height="320"
                            />

                            <img
                              src={item.img_src + ".jpg?v=" + item.img_v}
                              alt={item.game_name}
                              width="320"
                              height="320"
                              class="max-w-full w-full"
                              loading="lazy"
                              decoding="async"
                              // srcSet="small.png 1x, medium.png 2x, large.png 3x"
                            />
                          </picture>
                          {/* <img src={props.parentId == '#hot-games' ? hotGamesBase + item.img_src : ""+item.img_src} 
                                  class=" h-[150px] sm:h-[160px] md:h-[200px] lg:h-[250px] w-full rounded-xl" height="150px" width="115px"/> */}
                        </div>

                        <div class="absolute bg-overlay  z-10 flex flex-col justify-end h-1/5 bottom-0 w-full">
                          <div class="p-4 w-full text-xl text-left font-medium">
                            <span class="truncate">{item.game_name}</span>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div
            class="track track_2 flex-auto relative overflow-hidden min-w-0 w-full md:w-auto"
            style={`height:${totalHeight}px`}
          >
            <ul
              class="list  flex flex-col gap-2  "
              style={`height:${totalHeight}px`}
            >
              {Object.values(cloned).map((item, i) => {
                let ind = 0;
                if (i < 3) {
                  ind = length - 3 + i;
                } else if (i >= 3 && i < length + 3) {
                  ind = length - (length - (i - 3));
                } else {
                  ind = i - (length + 3);
                }
                //  const ind = (i - 3) % length
                return (
                  <li
                    class={`slide will-change-transform max-h-[${slide2Height}px] `}
                    data-ind={ind}
                    style={`transform:translateY(${slide2InitPos}px)`}
                    data-ty={i * ((slide2Height + slide2Gap) * -1)}
                  >
                    <div class="slide__container">
                      <div class="slide__content game-row   overflow-hidden flex items-start  px-5 py-1 gap-4">
                        <div class="image-wrap rounded-[20px] relative overflow-hidden  max-w-[106px]">
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
                              alt={item.game_name}
                              width="220"
                              height="220"
                              loading="lazy"
                              decoding="async"
                              // srcSet="small.png 1x, medium.png 2x, large.png 3x"
                            />
                          </picture>
                          {/* <img src={props.parentId == '#hot-games' ? hotGamesBase + item.img_src : ""+item.img_src} 
                                  class=" h-[150px] sm:h-[160px] md:h-[200px] lg:h-[250px] w-full rounded-xl" height="150px" width="115px"/> */}
                        </div>
                        <div class="flex-auto min-w-0 text-left">
                          <p class="my-2">
                            <span class="tag-category rounded-3xl px-2 py-1 text-xs">
                              Slot
                            </span>
                          </p>
                          <p class="game-name  my-5 font-medium truncate">
                            {item.game_name}
                          </p>
                          <div>
                            <a
                              href={
                                "/" +
                                item.category_slug +
                                "/" +
                                item.brand_slug +
                                "?q=" +
                                item.game_name
                              }
                              class="px-3 py-1 play-btn rounded-3xl  text-xs"
                            >
                              {" "}
                              Play Now
                            </a>
                          </div>
                        </div>
                        <div class="absolute top-0 right-0 bottom-0 w-[150px] h-full wave -z-10"></div>
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
