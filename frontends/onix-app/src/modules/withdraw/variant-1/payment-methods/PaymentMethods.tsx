import { component$, useStylesScoped$ , type Signal , type PropFunction } from "@builder.io/qwik";
import SubmitBtn from "../../../../components/button/variant-1/Button1";
import Checkbox from "../../../../components/checkbox/variant-1/Checkbox1";
import styles from "./PaymentMethods.scss?inline";
import type {OnSelPayOptsArgs, SelPayOpt} from "~/hooks/business/useDeposit";
import { WalletIcon } from "~/components/icons/Wallet";
import type { WdMethod} from "~/hooks/business/useWithdraw";
import { getBankImgUrl, getGatewayImgUrl, WITHDRAW_METHODS } from "~/hooks/business/useWithdraw";
import type { WithdrawData } from "~/services/types";
import { useGetCurrency } from "~/hooks/utils/useGetCurrency";
import ArrowRight2Icon from "~/components/icons/ArrowRight2";
import {
  inlineTranslate,  
} from 'qwik-speak';

/*remove this if CMP does not have props*/
type Props = { 
  wdMethod:Signal< WdMethod>,
  // selPayOpt :Signal<SelPayOpt>,
  onSelWdMethod$ : PropFunction<( method : WdMethod) => void>,
  // onSelPayOpt$ : PropFunction<( args : OnSelPayOptsArgs) => void>,
  onOkPayOpt$ :  PropFunction<()=>void>,
  bankList?: Record<string, unknown>[],
  cryptoList?: Record<string, unknown>[],
  minWd?: number,
  maxWd?: number,
  wd : WithdrawData,
  currencyCode? : string,
};
export default component$((props: Props) => {
  useStylesScoped$(styles);
  const t = inlineTranslate();

  return (
    <>
      <section class="mb-10">
        <h3 >
          <span class="font-semibold"> {t('wallet.Bank/Ewallet transfer@@Bank/Ewallet transfer')}</span>
        </h3>
     
        <ul class="opt-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[300px] my-1.5 overflow-y-auto scroller pr-2"> 
              <li class={ "pay-opt rounded-[10px] p-2 " + ( props.wdMethod.value  ===  WITHDRAW_METHODS.manual ? 'active' : '')}>
                <Checkbox
                  type ="radio"
                  id={`cbx-${WITHDRAW_METHODS.manual}`}
                  name="pay-opt"
                  value={WITHDRAW_METHODS.manual}
                  direction="flex-row"
                  onChange$={()=>{
                    props.onSelWdMethod$( WITHDRAW_METHODS.manual);
                  }}
                >
                  <div class="flex-center gap-4 leading-tight">
                    {/* pay-opt-img */}
                    <div class="relative w-10 flex-center">
                    <div class="text-xl"><WalletIcon></WalletIcon></div>
                    </div>
                    <div class="min-w-0 flex-auto">
                      <p class="font-semibold"> {t('wallet.Withdraw to your bank @@Withdraw to your {{text}} account', {text: t('wallet.bank@@bank') + (props.wd.has_ewallet? '/ ' + t('wallet.ewallet@@ewallet') :'') + (props.wd.has_pulsa? '/ ' + t('wallet.pulsa@@pulsa') :'') })} account</p>
                      <p class="text-xxs text-secondary"> 
                      {t('wallet.Min withdrawal Amt -@@Min withdrawal Amt - {{amt}} ', {amt :   ( (props.currencyCode??"") +  props.wd.min_wd)})} 
                      </p>
                    </div>
                  </div>
                </Checkbox>
              </li>
        </ul>
      </section>

      {props.wd.ext_withdraw && 
       <section>
       <h3 >
         <span class="font-semibold"> {t('wallet.Cryptocurrency Gateway@@Cryptocurrency Gateway')}</span>
       </h3>
    
       <ul class="opt-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[300px] my-1.5 overflow-y-auto scroller pr-2">
       <li class={ "pay-opt rounded-[10px] p-2   cursor-pointer " + ( props.wdMethod.valu   === props.wd.ext_withdraw ? 'active' : '')}>
               <Checkbox
                 type ="radio"
                 id={`cbx-${props.wd.ext_withdraw }`}
                 name="pay-opt"
                 value={props.wd.ext_withdraw }
                 direction="flex-row"
                 onChange$={()=>{
                   props.onSelWdMethod$(props.wd.ext_withdraw )
                 }}
               >
                 <div class="flex-center gap-4 leading-tight">
                   {/* pay-opt-img */}
                   <div class="relative w-10 flex-center">
                      <img src={getGatewayImgUrl(props.wd.ext_withdraw)} class="rounded-md" />
                     <span
                       class={
                         "pay-opt__flag absolute right-0 top-0 translate-x-2/4 -translate-y-2/4 rounded-full w-2 h-2 active"  
                       }
                     ></span>
                   </div>
                   <div class="min-w-0 flex-auto">
                      {/* pay-opt__name*/}
                     <p class="pay-opt__name text-xs font-semibold">
                     {props.wd.ext_withdraw}
                     </p>
                     <p class="text-xxs text-secondary">
                     {t('wallet.Min withdrawal Amt -@@Min withdrawal Amt - {{amt}} ', {amt :   (props.currencyCode??"") +  props.wd.min_wd})} 
                     </p>
                   </div>
                 </div>
               </Checkbox>
             </li>
       </ul>
     </section>
  }
      <div class="my-8 text-center">
      <SubmitBtn
            icon={ArrowRight2Icon}  onClick$={props.onOkPayOpt$} type="button" text= {t('app.Confirm@@Confirm')} >

      </SubmitBtn>
      </div>
    </>
  );
});
