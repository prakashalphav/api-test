import { component$, useSignal, useStylesScoped$ } from '@builder.io/qwik';
import styles from './LastTrxs1.scss?inline';
import { inlineTranslate } from 'qwik-speak';
import type { LatestSiteTrx } from '~/services/types';
import LastTrxList from './partials/last-trx-list/variant-1/LastTrxList';
import { useCommonViewData } from '~/hooks/app/useCommonViewData';
import { isMobileDevice } from '~/utils/common';

type Props = {
  depositList : LatestSiteTrx[];
  winnerList : LatestSiteTrx[];
}

export default component$((props: Props) => {
    useStylesScoped$(styles);
    const t = inlineTranslate();
    const {commonData} = useCommonViewData();

    const depositList :LatestSiteTrx[] = props.depositList;
    const winnerList :LatestSiteTrx[] = props.winnerList;
    const selectedTrxType = useSignal('deposit');
    const isMobile=   isMobileDevice(null, commonData.device );

return <>
      {/* desktop view */}
      {/* <div class="hidden lg:grid grid-cols-1 lg:grid-cols-2 gap-6"> */}
      <div class="grid  gap-2 grid-cols-2 lg:gap-6">

         {/* <div class="col-span-1 lg:hidden">
            <img width="62" height="62" src="https://files.sitestatic.net/assets/imgs/onixv2/vega/gold_leaf_left.png" loading="lazy" decoding="async" alt="gold_leaf_left"/>
         </div> */}
         <div class=" col-span-1 depositTrx" onClick$={()=>(selectedTrxType.value = 'deposit')}>
             <div class="flex-center mb-5" >
                  {/* <img
                      class="hidden lg:block"
                      width="62"
                      height="62"
                      src="https://files.sitestatic.net/assets/imgs/onixv2/vega/gold_leaf_left.png"
                      loading="lazy"
                      decoding="async"
                      alt="gold_leaf_left"
                    /> */}
                  <div class="flex-center flex-col">
                    <img
                      width="34"
                      height="34"
                      src="https://files.sitestatic.net/assets/imgs/onixv2/vega/money_bag.png"
                      loading="lazy"
                      decoding="async"
                      alt="money_bag"
                    />
                    <h2 class={`${selectedTrxType.value === 'deposit' ? `selectedTrxText` : `trxText`} lg:text-xl font-semibold whitespace-nowrap`}>{t("home.Latest Deposits@@Latest Deposits")}</h2>
                  </div>
                  {/* <img
                      class="hidden lg:block"
                      width="62"
                      height="62"
                      src="https://files.sitestatic.net/assets/imgs/onixv2/vega/gold_leaf_right.png"
                      loading="lazy"
                      decoding="async"
                      alt="gold_leaf_right"
                    /> */}
                </div>
          </div>

          <div class="col-span-1 winnerTrx" onClick$={()=>(selectedTrxType.value = 'winner')}>
             <div class="flex-center mb-5">
                  {/* <img
                      class="hidden lg:block"
                      width="62"
                      height="62"
                      src="https://files.sitestatic.net/assets/imgs/onixv2/vega/silver_leaf_left.png"
                      loading="lazy"
                      decoding="async"
                      alt="gold_leaf_left"
                    /> */}
                  <div class="flex-center flex-col">
                    <img
                      width="34"
                      height="34"
                      src="https://files.sitestatic.net/assets/imgs/onixv2/vega/prize.png"
                      loading="lazy"
                      decoding="async"
                      alt="money_bag"
                    />
                    <h2 class={`${selectedTrxType.value === 'winner' ? `selectedTrxText` : `trxText`} lg:text-xl font-semibold whitespace-nowrap`}>{t("home.Latest Winners@@Latest Winners")}</h2>
                  </div>
                  {/* <img
                      class="hidden lg:block"
                      width="62"
                      height="62"
                      src="https://files.sitestatic.net/assets/imgs/onixv2/vega/silver_leaf_right.png"
                      loading="lazy"
                      decoding="async"
                      alt="gold_leaf_right"
                    /> */}
                </div>
          </div>

          {/* <div class="col-span-1 lg:hidden">
            <img width="62" height="62" src="https://files.sitestatic.net/assets/imgs/onixv2/vega/gold_leaf_right.png" loading="lazy" decoding="async" alt="gold_leaf_right"/>
         </div> */}

           
         <div class=" col-span-2 lastTrxDivider relative bottom-4 flex lg:hidden place-self-center rounded-full w-full h-1">
            {selectedTrxType.value === 'deposit' && <div class="depositLine "></div>}
            {selectedTrxType.value === 'winner' && <div class="winnerLine "></div>}
         </div>

         {((isMobile && selectedTrxType.value === 'deposit') || !isMobile) && 
          <div class="lg:col-span-1 col-span-2">
            <LastTrxList isMobile={isMobile} trxList={depositList}></LastTrxList>
          </div>
         }

       {((isMobile && selectedTrxType.value === 'winner') || !isMobile) && 
          <div class="lg:col-span-1 col-span-2">
            <LastTrxList isMobile={isMobile} trxList={winnerList}></LastTrxList>
          </div>
         }
      </div>
    </>;
});