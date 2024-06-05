import {
  Resource,
  component$,
  useSignal,
  useStylesScoped$,
  useStyles$,
} from "@builder.io/qwik";
import styles from "./GamesTransferMenu2.scss?inline";

import ArrowRight2Icon from "~/components/icons/ArrowRight2";

import { useGamesTransfer } from "~/hooks/business/useGamesTransferMenu";
import { priceFormat } from "~/utils/formatters/priceFormat";
import { useCommonViewData } from "~/hooks/app/useCommonViewData";

import { RefreshIcon } from "~/components/icons/Refresh";
import { GameIcon } from "~/components/icons/Game6";
import { ArrowUp2Icon } from "~/components/icons/ArrowUp2";

import { isString } from "~/utils/common"; 
import {
    inlineTranslate,  
  } from 'qwik-speak';
  
type Props = {
  class?: string;
};

export default component$((props: Props) => {
  useStylesScoped$(styles);
  const t = inlineTranslate();

  const {
    showMenu,
    hkbBalance,
    currentBalance, 
    refreshGameBal,
    actionGetBal,
    onTransferFrGame,
    ref,
    hasHkbGame,
    hasTransferWalletGame
  } = useGamesTransfer();

  const {commonData} = useCommonViewData();
  return (
    <>
 
      {(
        <div class="">
            <>
        {hasHkbGame && <>
                    <div class="flex items-center gap-2">
                    <button onClick$={ ()=>{
                            refreshGameBal("hkb_lottery");
                    }} class="flex gap-2">
                      
                      <span class="text-3xl mr-1"><GameIcon></GameIcon></span>
                    </button>
                    <div class="">
                    <div class="block">{t("app.Game Transfers@@Game Transfers")}</div>
                    <div class="flex gap-1 items-center">
                    <p>HKB</p>
                    
                    <RefreshIcon></RefreshIcon>
                        <Resource
                        value={hkbBalance}
                        onPending={() => <div>Loading...</div>}
                        onRejected={() => <div>Error</div>}
                        onResolved={(gameBalance) => (
                            <>
                            <span class="px-1 pr-2 font-medium">
                                {isString(gameBalance)
                                ? gameBalance
                                : priceFormat(gameBalance, {
                                    prefix: `${commonData?.website_settings?.currencyCode}`,
                                    centsLimit: 0,
                                    })}
                            </span>
                            </>
                        )}
                        />
                    </div>
                    </div>
                    <button
                        onClick$={async () => {
                        await onTransferFrGame("hkb_lottery" );
                        }}
                        class="ml-auto"
                    >
                        <ArrowUp2Icon></ArrowUp2Icon>
                    </button>
                    </div>
                </>}
        {!hasTransferWalletGame && <>
        
        <div>{t('No transfer wallet games@@No transfer wallet games')}</div>
        </>}      
          </>
        </div>
      )}
    </>
  );
});
