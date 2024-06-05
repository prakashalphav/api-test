import {
  Resource,
  component$,
  useSignal,
  useStylesScoped$,
  useStyles$,
} from "@builder.io/qwik";
import styles from "./TransactionMenu1.scss?inline";

import ArrowRight2Icon from "~/components/icons/ArrowRight2";

import { useTransaction } from "~/hooks/business/useTransactionMenu";
import { priceFormat } from "~/utils/formatters/priceFormat";
import { useCommonViewData } from "~/hooks/app/useCommonViewData";
import Tooltip from "~/components/tooltip/variant-1/Tooltip1";
import { RefreshIcon } from "~/components/icons/Refresh";
import { ArrowRight } from "~/components/icons/ArrowRight";

import { isString } from "~/utils/common";
import { TRANSFER_WALLET_GAME_CODES } from "~/utils/constants/constants";
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
    ref
  } = useTransaction();

  const {commonData} = useCommonViewData();
  return (
    <>
 
      {showMenu.value && (
        <Tooltip id={'trxMenu1ToolTip'} ref={ref} class="transfer-menu rounded-md" position={"bottom-right"} size={"lg"}>
            <>
     
                <div class="mb-3">
                    <a href="/deposit/" class="flex items-center">
                      <p>{t('app.Deposit@@Deposit')}</p>
                      <span class="ml-auto"><ArrowRight></ArrowRight></span>
                    </a>
                </div> 
                <div class="">
                    <a href="/withdraw/" class="flex items-center">
                      <p>{t('app.Withdraw@@Withdraw')}</p>
                      <span class="ml-auto"><ArrowRight></ArrowRight></span>
                    </a>
                </div> 
              
          </>
        </Tooltip>
      )}
    </>
  );
});
