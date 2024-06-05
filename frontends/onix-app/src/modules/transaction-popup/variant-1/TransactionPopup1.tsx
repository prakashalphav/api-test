import { component$, useStylesScoped$ ,  } from '@builder.io/qwik'; 
import styles from './TransactionPopup1.scss?inline';  
import {GameIcon} from "../../../components/icons/Game";
import {useTransactionPopup} from "../../../hooks/business/useSideNav";
import { DepositIcon } from '~/components/icons/Deposit';
import { WithdrawIcon } from '~/components/icons/Withdraw';
import { StatementIcon } from '~/components/icons/Statement';
import { TransactionIcon } from '~/components/icons/Transaction';
import {
  inlineTranslate,  
} from 'qwik-speak';
import { useCommonViewData } from "~/hooks/app/useCommonViewData";

type Props ={
     zIndex : number
   }
export default component$(( props :Props) => {
  useStylesScoped$(styles); 
  const {showTransactionPopup,trxMenuPopup} = useTransactionPopup();
  const t = inlineTranslate();
  const {commonData} = useCommonViewData();
  return (
     <>
        { showTransactionPopup.value && (<>
        <aside ref={trxMenuPopup} class={`popUpMenu overflow-hidden fixed h-auto right-40 top-20 mt-1 hidden lg:block rounded-xl`}  style={'z-index:'+ props.zIndex+';'}>
        <div class="p-2">
                <ul class="">
                <li class="p-2 mb-1 rounded-lg"> 
                <a href="/deposit/" class="flex">
                    <div class=" mr-3 rounded-full icon__popUpMenu  p-2.5 text-xl"><DepositIcon></DepositIcon> </div>
                    <span class="flex items-center"> {t('app.Deposit@@Deposit')}</span>
                </a>
               </li>
               <li class="p-2 mb-1 rounded-lg"> 
                <a href="/withdraw/" class="flex">
                    <div class="mr-3 rounded-full icon__popUpMenu p-2.5 text-xl"><WithdrawIcon></WithdrawIcon> </div>
                    <span class="flex items-center"> {t('app.Withdraw@@Withdraw')}</span>
                </a>
               </li>
               <li class="p-2 mb-1 rounded-lg"> 
                <a href="/lastDirectTransfer/" class="flex">
                    <div class="mr-3 rounded-full icon__popUpMenu p-2.5 text-xl"><TransactionIcon></TransactionIcon> </div>
                    <span class="flex items-center"> {t('app.Last Direct Transfers@@Last Direct Transfers')}</span>
                </a>
               </li>
               <li class="p-2 mb-1 rounded-lg"> 
                <a href="/statement/" class="flex">
                    <div class="mr-3 rounded-full icon__popUpMenu p-2.5  text-xl"><StatementIcon></StatementIcon> </div>
                    <span class="flex items-center"> {t('app.Statement@@Statement')}</span>
                </a>
               </li>
                {commonData.website_settings?.isOffReferralMenu != '1' &&
                  <li class="p-2 mb-1 rounded-lg">
                    <a href="/referral" class="flex">
                      <div class="mr-3 rounded-full icon__popUpMenu p-2.5  text-xl"><GameIcon></GameIcon> </div>
                      <span class="flex items-center"> {t('app.Referrals@@Referrals')}</span>
                    </a>
                  </li>
                }
               
                </ul>
         </div>
        </aside>
        </>
          )}
     </>
  );
});