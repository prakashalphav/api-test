/*
Author : Brandon
Readme : 

1. The number of games banners  must not be less than 7
*/

import { component$, useStylesScoped$, useOn,$} from "@builder.io/qwik";
import styles from "./WithdrawListSlider4.scss?inline";
import { numFormat } from "~/utils/common";
import type { LatestSiteTrx } from "~/services/types";
import { useCommonViewData } from '~/hooks/app/useCommonViewData';
import { Splide } from '@splidejs/splide';

type Props = {
  class?: string;
  list: LatestSiteTrx[];
};

export default component$((props: Props) => {
  useStylesScoped$(styles);

  const {commonData} = useCommonViewData();
  const list :LatestSiteTrx[] = props.list;
  useOn( "qvisible", $(() => {
    console.log("run on qvisible WithdrawListSlider4" );
    if (list.length <= 4) {
      return;
    }
    new Splide( '#latest-winner-splide' ,{
      type   : 'loop', 
      autoplay : false,
      interval: 5000, 
      perPage: 4,
      lazyLoad : "nearby",
      arrows : false,
      direction: 'ttb',
      paginationDirection: 'ltr', 
      // height: '236px',
    }).mount();
  }));

  return (
    <>
      <div class={"wrapper text-center px-5 md:px-7 py-5 overflow-hidden mx-auto " + props.class ?? ''} style="max-width:450px">
        <div class="mb-2.5">
          <img width="133" height="82" class="inline-block" loading="lazy" decoding="async"
            alt="last winner profile pic" src="https://files.sitestatic.net/assets/imgs/onixv2/wingaming/last_winner_main_pic.webp" />
        </div>
        <div class="text-lg mainTrxName">{list[0].user_fund_accname}</div>
        <div class="text-xl mainTrxAmt">
          {commonData.website_settings.currencyCode} {numFormat(list[0].amount)}
        </div>
        <div id="latest-winner-splide" class="splide mt-5">
          <div class="splide__track">
            <ul class="splide__list">
              {list.map((item) => {
                return (
                  <>
                  <li class="splide__slide  mb-3">
                    <div class="flex-center">
                      <div class="shrink-0">
                        <img alt="last winner profile pic" decoding="async" height="50" width="50" loading="lazy"
                        src="https://files.sitestatic.net/assets/imgs/onixv2/wingaming/last_winner_pic.webp"
                        class="trxAvatarImg" />
                        </div>
                      <div class="trxRow flex items-center justify-between w-full pl-3 pr-5 py-1.5 sm:py-2.5 gap-1.5 text-xs sm:text-sm">
                        <div class="trxName truncate ">{item.user_fund_accname}</div>
                        <div class="trxAmt shrink-0">
                          {commonData.website_settings.currencyCode} {numFormat(item.amount)}
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
