import {
  Resource,
  component$,
  useSignal,
  useStylesScoped$,
  useStyles$,
} from "@builder.io/qwik";
import styles from "./TransactionMenu2.scss?inline";

import { useTransaction } from "~/hooks/business/useTransactionMenu";
import { priceFormat } from "~/utils/formatters/priceFormat";
import { useCommonViewData } from "~/hooks/app/useCommonViewData";
import Tooltip from "~/components/tooltip/variant-1/Tooltip1";
import { Deposit2Icon } from "~/components/icons/Deposit2";
import { Withdraw2Icon } from "~/components/icons/Withdraw2";
import { TransactionIcon } from "~/components/icons/Transaction4";
import { StatementIcon } from "~/components/icons/Statement4";
import { Referral2Icon } from "~/components/icons/Referral2";

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
 <Tooltip id="trxMenu2ToolTip" ref={ref} class="transfer-menu rounded-md" position={"bottom-right"} size={"lg"}  style={`min-width: 245px;`}>
 <>

     <div class="mb-1">
         <a href="/deposit/" class="transfer-menu__item rounded-lg flex items-center gap-2 p-2 justify-items-start">
         <span class="text-xl"><Deposit2Icon></Deposit2Icon></span>
           <p>{t('app.Deposit@@Deposit')}</p>
         </a>
     </div> 
     <div class="my-1">
         <a href="/withdraw/" class="transfer-menu__item rounded-lg flex items-center gap-2  p-2 justify-items-start">
         <span class="text-xl"> <Withdraw2Icon></Withdraw2Icon></span>
           <p>{t('app.Withdraw@@Withdraw')}</p>
         </a>
     </div> 
     <div class="my-1">
         <a href="/lastDirectTransfer/" class="transfer-menu__item rounded-lg flex items-center gap-2  p-2 justify-items-start">
         <span class="text-xl"><TransactionIcon></TransactionIcon></span>
           <p>{t('app.Last Direct Transfers@@Last Direct Transfers')}</p>
         </a>
     </div>   
     <div class="my-1">
         <a href="/statement/" class="transfer-menu__item rounded-lg flex items-center gap-2  p-2 justify-items-start">
         <span class="text-xl"><StatementIcon></StatementIcon></span>
           <p>{t('app.Statement@@Statement')}</p>
         </a>
     </div>  
     <div class="mt-1">
         <a href="/profile/referral-downline/" class="transfer-menu__item rounded-lg flex items-center gap-2  p-2 justify-items-start">
         <span class="text-xl"><Referral2Icon></Referral2Icon></span>
           <p>{t('app.Referrals@@Referrals')}</p>
         </a>
     </div> 
   
</>
</Tooltip>
      )}
    </>
  );
});
