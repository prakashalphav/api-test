/*
Author : Brandon
Readme : 

1. The number of games banners  must not be less than 7
*/

import { component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./TopPlayersBox2.scss?inline";
import type { LatestSiteTrx } from "~/services/types";
import { useCommonViewData } from '~/hooks/app/useCommonViewData';
import { numFormat } from "~/utils/common";
import LazyImage from "~/components/image/LazyImage";

type Props = {
  list: LatestSiteTrx[] | undefined;
  class?: string;
};

export default component$((props: Props) => {
  useStylesScoped$(styles);

  const {commonData} = useCommonViewData();

  return (
    <>
    <div class={`my-8 grid grid-cols-3 gap-2 justify-between items-center ${props.class}`}>
    {props.list?.slice(0, 3).map((item, index) => {
          return <div key={index} class={`col-span-1 rounded-lg  justify-center gap-3 topPlayer-${index}`}>
            <div class={`rounded-full  mx-auto avatarBox relative ${index == 0? 'w-24 h-24 lg:w-32 lg:h-32 p-4 mb-8' :' w-16 h-16 lg:w-24 lg:h-24 border-4 lg:border-8' }`}>
              <LazyImage
                class={`inline-block ${index == 0? 'scale-1' :'' }`}
                src="https://files.sitestatic.net/assets/imgs/onixv2/idrgaming/avatar.webp"
                height={100}
                width={100}
                extractMeta={false}
              />
              <div class={`playerPosition absolute rounded-full flex-center font-bold text-xs lg:text-sm w-5 h-5 lg:w-8 lg:h-8  ${index == 0? '-bottom-2.5 lg:-bottom-2.5' :'-right-3 bottom-0 '}`}>{index+1}</div>
            </div>
            <div class="w-full truncate text-center mt-2">
              <div class="topPlayerBoxName truncate">{item.user_fund_accname}</div>
              <div class={`topPlayerBoxAmt  font-bold ${index == 0? 'text-base lg:text-2xl' :'text-sm lg:text-lg' }`}>
                {commonData.website_settings.currencyCode} {numFormat(item.amount)}
              </div>
            </div>
          </div>
        })}
      </div>
      <div class={`flex flex-wrap gap-2 ${props.class}`}>
        {props.list?.slice(3, 10).map((item, index) => {
          return <div key={index} class="topPlayerBoxRow w-full flex items-center justify-start rounded-lg p-2 px-2 lg:px-4 text-center gap-2 lg:gap-4">
            <div class="px-3 text-lg font-semibold topPlayerIndex">
            {index+4}
            </div>
            <div class="topPlayerBoxImg shrink-0 rounded-full py-1">
              <LazyImage
                class="inline-block"
                src="https://files.sitestatic.net/assets/imgs/onixv2/zplay/top_player.png"
                height={60}
                width={60}
                extractMeta={false}
              />
            </div>
            <div class="flex-1 truncate text-left">
              <div class="topPlayerBoxName truncate">{item.user_fund_accname}</div>
              <div class="topPlayerBoxAmt text-lg font-semibold">
                {commonData.website_settings.currencyCode} {numFormat(item.amount)}
              </div>
            </div>
          </div>
        })}
      </div>
      
    </>
  );
});
