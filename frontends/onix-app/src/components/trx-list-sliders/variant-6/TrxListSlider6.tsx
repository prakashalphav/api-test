/*
Author :  
Readme : 
 
*/

import { component$, useStylesScoped$, useOn, $ } from "@builder.io/qwik";
import styles from "./TrxListSlider6.scss?inline";
import { numFormat } from "~/utils/common";
import type { LatestSiteTrx } from "~/services/types";
import { useCommonViewData } from "~/hooks/app/useCommonViewData";
import { Splide } from "@splidejs/splide";
import { formatDistance, subDays } from "date-fns";
import LazyImage from "~/components/image/LazyImage";

type Props = {
  id: string; //unique id required for each slider
  class?: string;
  title: string;
  list: LatestSiteTrx[] | undefined;
};

export default component$((props: Props) => {
  useStylesScoped$(styles);

  const avatars = [
    "https://files.sitestatic.net/assets/imgs/onixv2/gamingonnet/last_trx_user_1.webp",
    "https://files.sitestatic.net/assets/imgs/onixv2/gamingonnet/last_trx_user_2.webp",
    "https://files.sitestatic.net/assets/imgs/onixv2/gamingonnet/last_trx_user_3.webp",
    "https://files.sitestatic.net/assets/imgs/onixv2/gamingonnet/last_trx_user_4.webp",
    "https://files.sitestatic.net/assets/imgs/onixv2/gamingonnet/last_trx_user_5.webp",
  ];

  const { commonData } = useCommonViewData();
  const list: LatestSiteTrx[] = props.list ?? [];
  const title: string = props.title;
  const id: string = props.id;

  useOn(
    "qvisible",
    $(() => {
      // console.log(`run on qvisible ${props.id}`);
      if (list.length <= 4) {
        return;
      }
      new Splide(`#${props.id}`, {
        // type   : 'loop',
        autoplay: false,
        interval: 5000,
        perPage: 5,
        lazyLoad: "nearby",
        arrows: false,
        direction: "ttb",
        paginationDirection: "ltr",
        gap: "20px",
        height: "360px",
        padding: { top: 8, bottom: 8 }, //needed for the overflow images
        breakpoints: {
          //mobile
          640: {
            height: "360px",
          },
        },
      }).mount();
    })
  );

  return (
    <>
      <div
        class={`overflow-hidden ${props.class || ""}`}
        style="max-width:490px"
      >
        <div class="title flex items-center justify-center text-lg sm:text-xl">
          <div class="flex items-center justify-center">
            <img
              width="75"
              height="50"
              class="aspect-square w-6 sm:w-9 inline-block mr-5"
              loading="lazy"
              decoding="async"
              alt="last deposit profile pic"
              src={
                id === "lastDepositList"
                  ? "/images/svg/Deposit.svg"
                  : "/images/svg/Withdraw.svg"
              }
            />
            {title}
          </div>
        </div>
        <div class="topWrapper grid grid-cols-3 gap-3 sm:gap-5 mb-5">
          {list.map((item, index) => {
            if (index > 2) {
              return null;
            }

            return (
              <>
                <div class="outerBox rounded mb-5" style="padding-bottom:4px">
                  {" "}
                  {/* added padding bottom to make it look more natural */}
                  <div class="yellowBox rounded flex items-end h-full">
                    <div class="avatarWrapper">
                      <LazyImage src={avatars[index]} height={80} width={80} />
                    </div>
                    <div class="timeWrapper font-medium absolute">
                      {`${formatDistance(
                        subDays(new Date(item.created_at), 3),
                        new Date(item.created_at),
                        { addSuffix: true }
                      )}`}
                    </div>
                    <div class="nameWrapper grid grid-cols-2 w-full gap-1 items-center px-1">
                      <div class="truncate text-sm sm:text-base font-bold">
                        {item.user_fund_accname}
                      </div>
                      <div class="truncate text-right text-xxs sm:text-sm font-medium">
                        {commonData.website_settings.currencyCode}
                        {numFormat(item.amount)}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
        <div class="depositListWrapper splide" id={props.id || ""}>
          <div class="splide__track">
            <ul class="splide__list">
              {list.map((item, index) => {
                if (index < 3) {
                  return null;
                }

                return (
                  <>
                    <li class="grid grid-cols-3 gap-5 splide__slide cursor-pointer">
                      <div class="depoLeft col-span-1">
                        <div class="outerBox rounded">
                          <div class="innerBox rounded flex-center h-full">
                            <div class="depoAvatarWrapper absolute">
                              <LazyImage
                                src={avatars[index] ?? avatars[Math.floor(Math.random() * 5)]}
                                height={60}
                                width={60}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-span-2">
                        <div class="outerBox rounded">
                          <div class="innerBox rounded nameWrapper grid grid-cols-2 gap-1 items-center text-center h-full font-medium">
                            <div class="truncate text-base sm:text-lg">
                              {item.user_fund_accname}
                            </div>
                            <div class="truncate text-xs sm:text-sm">
                              {commonData.website_settings.currencyCode}
                              {numFormat(item.amount)}
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
      </div>
    </>
  );
});
