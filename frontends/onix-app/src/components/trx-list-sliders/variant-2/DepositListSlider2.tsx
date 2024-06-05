/*
Readme : 

1. The number of games banners  must not be less than 7
*/

import {
  component$,
  useStyles$,
  useOn,$,
} from "@builder.io/qwik";
import Splide from "@splidejs/splide";
import styles from "./DepositListSlider2.scss?inline";
import "@splidejs/splide/css/core";
 
// import { GoldRibbonIcon } from "~/components/icons/GoldRibbon";
 
import { CoinsIcon } from "~/components/icons/Coins";
import { GoldCoinsIcon } from "~/components/icons/GoldCoins";
import { RoundCornerShapeIcon } from "~/components/icons/RoundCornerShape";

import { numFormat } from "~/utils/common";
type Props = {
  parentId: string; // '#parent'
};
export default component$((props: Props) => {
  useStyles$(styles);
  const avatars = [
    "/images/avatars/Guy1",
    "/images/avatars/Girl1",
    "/images/avatars/Girl2",
    "/images/avatars/Girl3",
    "/images/avatars/Guy2",
  ];

  let avatarInd = 0;
  const list = [
    {
      name: "Bagus Shihab",
      amt: 89720,
      datetime: "04-13 08:30pm",
    },
    {
      name: "Rahma Kusuma",
      amt: 89720,
      datetime: "04-13 08:30pm",
    },
    {
      name: "Gladys Zakaria",
      amt: 89720,
      datetime: "04-13 08:30pm",
    },
    {
      name: "Kiki Falihi",
      amt: 89720,
      datetime: "04-13 08:30pm",
    },
    {
      name: "Dwi Lestari",
      amt: 89720,
      datetime: "04-13 08:30pm",
    },
    {
      name: "Bagus Shihab",
      amt: 89720,
      datetime: "04-13 08:30pm",
    },
    {
      name: "Rahma Kusuma",
      amt: 89720,
      datetime: "04-13 08:30pm",
    },
    {
      name: "Gladys Zakaria",
      amt: 89720,
      datetime: "04-13 08:30pm",
    },
    {
      name: "Kiki Falihi",
      amt: 89720,
      datetime: "04-13 08:30pm",
    },
    {
      name: "Dwi Lestari",
      amt: 89720,
      datetime: "04-13 08:30pm",
    },
  ];
  useOn( "qvisible", $(() => {
    console.log("run on qvisible DepositListSlider2" );
    // will run when the component becomes visible
    new Splide(props.parentId + " .depo-slider-2", {
      type: "loop",
      perPage: 4,
      autoplay: true,
      focus: "center",
      lazyLoad: "nearby",
      interval: 8000,
      flickMaxPages: 1,
      updateOnMove: true,
      throttle: 300,
      arrows: false,
      gap: 80,
      padding: { left: 30, right: 30, top: 50 },
      pagination: false,
        breakpoints: {
          640: {
            //max-width
            direction: "ttb",
            perPage: 3,
            fixedHeight: '133px',
            height:'431px', gap: 16, 
            padding:   { left: 0, right: 0, top: 0 },
          }, 
          1024: {
            //max-width 
            perPage: 2,
            
          }, 
          1466: {
            //max-width 
            perPage: 3, 
          }, 
        },
    }).mount();
  }));

  return (
    <>
      <div class="depo-slider-2 splide  backdrop:" aria-label="SLIDER">
        <div class="splide__track">
          <ul class="splide__list">
            {list.map((item) => {
               avatarInd++;
               if (avatarInd >= avatars.length) {
                 avatarInd = 0;
               }  
              return (
                <>
                  <li class="splide__slide">
                    <div class="splide__slide__container">
                      <div class="slide__content">
                        <div class="box-wrap relative  rounded-[30px]">
                          <div class="box  rounded-[30px] leading-5 flex-center gap-2 pl-5 pr-2 py-5">
                            <div class=" ">
                              <picture>
                                <source
                                  type="image/avif"
                                  media="(-webkit-min-device-pixel-ratio: 1.5)"
                                  srcSet={avatars[avatarInd] + "@2x-100.avif"}
                                  sizes="50px"
                                />
                                <source
                                  type="image/webp"
                                  media="(-webkit-min-device-pixel-ratio: 1.5)"
                                  srcSet={avatars[avatarInd] + "@2x-100.webp"}
                                  sizes="50px"
                                />

                                <source
                                  type="image/avif"
                                  srcSet={avatars[avatarInd] + "@1x-50.avif"}
                                />
                                <source
                                  type="image/webp"
                                  srcSet={avatars[avatarInd] + "@1x-50.webp"}
                                />
                                <img
                                  src={avatars[avatarInd] + "@1x-50.png"}
                                  width="50"
                                  height="50"
                                  alt="Avatar"
                                  loading="lazy"
                                  decoding="async"
                                />
                              </picture>
                              {/* <img src={avatars[avatarInd]} /> */}
                            </div>
                            <div class="flex-auto min-w-0 flex justify-between items-center">
                              <div class="trx-name leading-6">
                                <p> {item.name?.toUpperCase()}</p>
                                <p class="date text-xs italic">
                                  {" "}
                                  {item.datetime}
                                </p>
                                <p class="amt  font-bold text-xl">
                                {numFormat(item.amt)}
                              </p>
                              </div>
                              <div class="flex-center">
                         
                               <div class="gold-coins">
                               <CoinsIcon></CoinsIcon>
                               <GoldCoinsIcon></GoldCoinsIcon>
                              
                               </div>
                              </div>
                            </div>
                          </div>
                          <div class="absolute -z-1 bottom-0 top-0 right-0">
                              <RoundCornerShapeIcon></RoundCornerShapeIcon>
                              </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
});
