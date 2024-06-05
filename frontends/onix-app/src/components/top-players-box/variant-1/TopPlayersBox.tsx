/*
Author : Brandon
Readme : 
*/

import { component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./TopPlayersBox.scss?inline";
import type { LatestSiteTrx } from "~/services/types";
import { useCommonViewData } from '~/hooks/app/useCommonViewData';
import { numFormat } from "~/utils/common";
import {Profile3Icon} from "~/components/icons/Profile3";

type Props = {
  list: LatestSiteTrx[] | undefined;
  class?: string;
};

export default component$((props: Props) => {
  useStylesScoped$(styles);

  const {commonData} = useCommonViewData();

  return (
    <>
      <div class={`flex  flex-col gap-2.5 ${props.class || ""}`}>
        {props.list?.map((item, index) => {
          return <div key={index} class="row w-full flex items-center justify-between rounded-md py-2.5 px-4 sm:px-4 gap-x-3 overflow-hidden">
            <div class="flex">
              <div class="imgWrapper shrink-0 rounded-full p-1.5 flex-center mr-3">
                <Profile3Icon class="img"></Profile3Icon>
              </div>
              <div class="">
                  <div class="nameText text-base truncate">{item.user_fund_accname}</div>
                  <div class="amtText text-base truncate font-semibold">
                    {commonData.website_settings.currencyCode} {numFormat(item.amount)}
                  </div>
              </div>
            </div>
            <div class="text-xs">{item.created_at.substring(0, 10)}</div>
          </div>
        })}
      </div>
      
    </>
  );
});
