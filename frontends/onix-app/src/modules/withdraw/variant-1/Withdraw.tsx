import { component$, useStyles$} from '@builder.io/qwik'; 
import styles from './Withdraw.scss?inline'; 

import { init, useWithdraw } from "~/hooks/business/useWithdraw";
import PaymentMethods from './payment-methods/PaymentMethods';
import WtihdrawForm from "./withdraw-form/WtihdrawForm";
import type { WithdrawData , CommonViewData} from '~/services/types';
import AddFundAccModal from '~/modules/deposit/variant-1/add-fund-acc-modal/AddFundAccModal';
import {
  inlineTranslate,  
} from 'qwik-speak';
type Props = {
    wd : WithdrawData,
    cd : CommonViewData|null,
    bankList?: Record<string, unknown>[],
    userBal?: string,
    currencyCode?: string,
    minWd?: number,
    maxWd?: number,
    wdToken?: string,
    userFullName?:string,
};

   
export default component$(( props : Props) => {
    useStyles$(styles);
    const t = inlineTranslate();

     const { selPayOpt,confirmPay, submitResult,bankWalletList,cryptoList , wdMethod , showAddFundAccModal ,addFundAccResource,userBanks}= init(props.bankList || []);
    const {onSelPayOptQRL,onSubmitFormQRL,onOkPayOptQRL,onChgPayOptQRL , onSelWdMethodQRL,toggleAddFundAccMdQRL } = useWithdraw(selPayOpt,confirmPay,submitResult, wdMethod,showAddFundAccModal,userBanks, props.wd);

    return <>
     <div class="pb-6">
 
    {/* step before register account */}
   { 
   /*if got more than 1 withdrawal method only show*/
    props.wd.ext_withdraw && 
    <div id="pay-methods" class="w-full">
    <PaymentMethods wdMethod={wdMethod} currencyCode={props.currencyCode}  onSelWdMethod$={onSelWdMethodQRL} onOkPayOpt$={onOkPayOptQRL} bankList={bankWalletList} cryptoList={cryptoList} minWd={props.minWd} maxWd={props.maxWd} wd={props.wd}></PaymentMethods>
    </div>
   }
 
     <div id="withdraw-form" class={`${props.wd.ext_withdraw  ? 'hidden' : ''} w-full`}>
       <><WtihdrawForm userFullName={props.userFullName} selPayOpt={selPayOpt} onSelPayOpt$={onSelPayOptQRL} onChgPayOpt$={onChgPayOptQRL} onSubmitForm$={onSubmitFormQRL} bankList={props.bankList} userBal={props.userBal} currencyCode={props.currencyCode} wdToken={props.wdToken} submitResult={submitResult}  wd={props.wd} onClickAddFundAcc$={toggleAddFundAccMdQRL} userBanks={userBanks}></WtihdrawForm></>
     </div>
     <AddFundAccModal accNoMinLength={props.cd?.acc_length || 0}  addFundAccResource={addFundAccResource} showAddFundAccModal={showAddFundAccModal} toggleAddFundAccMdQRL={toggleAddFundAccMdQRL}></AddFundAccModal> 
     </div>
    </>;
});