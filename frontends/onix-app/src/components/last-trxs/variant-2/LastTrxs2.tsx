/*
Author : Brandon
Readme : 

*/

import { component$, useStylesScoped$, useOn,$} from "@builder.io/qwik";
import styles from "./LastTrxs2.scss?inline";
import { numFormat } from "~/utils/common";
import type { LatestSiteTrx } from "~/services/types";
import { useCommonViewData } from '~/hooks/app/useCommonViewData';
import { Splide } from '@splidejs/splide';

type Props = {
  id: string; //unique id required for each slider
  class?: string;
  list: LatestSiteTrx[] | undefined;
  title: string;
};

export default component$((props: Props) => {
  useStylesScoped$(styles);

  const {commonData} = useCommonViewData();
  useOn( "qvisible", $(() => {
    console.log(`run on qvisible ${props.id}` );
    // if (list.length <= 4) {
    //   return;
    // }
    new Splide( `#${props.id}` ,{
      // type   : 'loop', 
      autoplay : false,
      interval: 5000, 
      perPage: 5,
      lazyLoad : "nearby",
      arrows : false,
      direction: 'ttb',
      paginationDirection: 'ltr', 
      height: '190px',
      breakpoints: {
        640: {
          height: '190px',
        },
      }
    }).mount();
  }));

  return (
    <>
      <div class="container rounded-lg overflow-hidden">
        <div class="title font-bold py-3 text-center">
          <div class="text-lg font-medium truncate leading-tight">{props.title}</div>
        </div>
        <div id={props.id} class={`splide wrapper mt-5 cursor-pointer ${props.class}`}>
          <div class="splide__track">
            <ul class="splide__list">
              {props.list?.map((item) => {
                return (
                  <>
                  <li class="splide__slide trxRow">
                    <div class="flex items-center justify-between w-full px-5 sm:px-4 py-2 sm:py-2 gap-1.5">
                      <div class="trxName text-sm truncate">{item.user_fund_accname}</div>
                      <div class="trxAmt text-sm shrink-0 font-medium">
                        {commonData.website_settings.currencyCode} {numFormat(item.amount)}
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
