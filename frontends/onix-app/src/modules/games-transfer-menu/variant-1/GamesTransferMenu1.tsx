import {
  Resource,
  component$,
  useSignal,
  useStylesScoped$,
  useStyles$,
} from "@builder.io/qwik";
import styles from "./GamesTransferMenu1.scss?inline";

import ArrowRight2Icon from "~/components/icons/ArrowRight2";

import { useGamesTransfer } from "~/hooks/business/useGamesTransferMenu";
import { priceFormat } from "~/utils/formatters/priceFormat";
import { useCommonViewData } from "~/hooks/app/useCommonViewData";
import Tooltip from "~/components/tooltip/variant-1/Tooltip1";
import { RefreshIcon } from "~/components/icons/Refresh";
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
 
      {showMenu.value && (
        <Tooltip ref={ref} class="transfer-menu rounded-md" position={"bottom-right"} size={"lg"}>
            <>
        {hasHkbGame && <>
                <div class="">
                    <div class="flex-center gap-2">
                    <button onClick$={ ()=>{
                            refreshGameBal("hkb_lottery");
                    }} class="flex-center gap-1">
                        <p>HKB</p>
                        <RefreshIcon></RefreshIcon>
                    </button>
                    <div class="flex-auto">
                        <Resource
                        value={hkbBalance}
                        onPending={() => <div>Loading...</div>}
                        onRejected={() => <div>Error</div>}
                        onResolved={(gameBalance) => (
                            <>
                            <span class="px-1 pr-2">
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
                    <button
                        onClick$={async () => {
                        await onTransferFrGame("hkb_lottery" );
                        }}
                        class="flex-center"
                    >
                        <ArrowUp2Icon></ArrowUp2Icon>
                    </button>
                    </div>
                </div> </>}
        {!hasTransferWalletGame && <>
        
        <div>{t('No transfer wallet games@@No transfer wallet games')}</div>
        </>}      
          </>
        </Tooltip>
      )}
    </>
  );
});
