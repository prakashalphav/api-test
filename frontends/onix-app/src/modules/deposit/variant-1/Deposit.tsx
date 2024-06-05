import { component$, useStyles$  , } from '@builder.io/qwik'; 
import styles from './Deposit.scss?inline'; 

import { useDeposit, useDepositForm, type Props } from "~/hooks/business/useDeposit";

import PaymentMethods from "./payment-methods/PaymentMethods";
import DepositForm from "./deposit-form/DepositForm";
import ApplyPromoModal from "./apply-promo-modal/ApplyPromoModal"; 

import AddFundAccModal from "./add-fund-acc-modal/AddFundAccModal";
/*remove this if CMP does not have props*/
 

export default component$(( props : Props) => {

    useStyles$(styles);
     const { selPayOpt, confirmPay, selPromo , showPromoModal, depositRes ,selUserWallet ,submitResult , showAddFundAccModal ,addFundAccResource,userBanks}= useDepositForm();
    const {  onSelPayOptQRL, onOkPayOptQRL, onChgPayOptQRL,onSubmitFormQRL ,onSelectPromoQRL,togglePromoMdQRL ,toggleAddFundAccMdQRL,} = useDeposit(selPayOpt,confirmPay,showPromoModal,selPromo,selUserWallet,submitResult,showAddFundAccModal,userBanks,props);
  
    return <>
     {/* <Resource
        value={depositRes}
        onPending={() => <div>Loading...</div>}
        onRejected={() => <div>Failed to load data</div>}
        onResolved={(dr) => {
       
            return <>
            {'dpRes : '  + JSON.stringify(dr)}
            </>;
       }}/>   */}
     <div class="flex overflow-hidden">
     <div id="pay-methods" class="w-full">
     <PaymentMethods selPayOpt={selPayOpt} onSelPayOpt$={onSelPayOptQRL} onOkPayOpt$={onOkPayOptQRL} cd={props.cd} de={props.de}></PaymentMethods>
     </div>

     <div id="deposit-form" class="hidden w-full">
     <><DepositForm  class="depo-form lg:p-5" confirmPay={confirmPay} selPayOpt={selPayOpt} onSelPayOpt$={onSelPayOptQRL} onChgPayOpt$={onChgPayOptQRL} onSubmitForm$={onSubmitFormQRL} onClickAddFundAcc$={toggleAddFundAccMdQRL} onSelectPromo$={onSelectPromoQRL} selPromo={selPromo} userBanks={userBanks}  cd={props.cd} de={props.de} depositRes={depositRes} selUserWallet={selUserWallet} submitResult={submitResult}></DepositForm></>
    
    
 

     </div>

     
     </div>

     <ApplyPromoModal showPromoModal={showPromoModal}  onSelectPromo$={onSelectPromoQRL}  selPromo={selPromo} depositRes={depositRes} togglePromoMdQRL={togglePromoMdQRL} ></ApplyPromoModal>

<AddFundAccModal accNoMinLength={props.cd.acc_length}  addFundAccResource={addFundAccResource} showAddFundAccModal={showAddFundAccModal} toggleAddFundAccMdQRL={toggleAddFundAccMdQRL}></AddFundAccModal> 
    </>;
});