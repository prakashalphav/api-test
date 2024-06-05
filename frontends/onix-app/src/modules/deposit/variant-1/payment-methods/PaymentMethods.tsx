import { component$, useStylesScoped$ , type Signal , type PropFunction , } from "@builder.io/qwik";
import SubmitBtn from "../../../../components/button/variant-1/Button1";
import Checkbox from "../../../../components/checkbox/variant-1/Checkbox1";
import styles from "./PaymentMethods.scss?inline";
import type { OnSelPayOptsArgs, PayOpt , Props as PageProps} from "~/hooks/business/useDeposit";
import { getGatewayImgUrl, isGatewayOptActive , pgModeNames} from "~/hooks/business/useDeposit";
import { isPayOptActive} from "~/hooks/business/useDeposit";
import { getBankImgUrl} from "~/hooks/business/useDeposit";
import {getPayOptId} from "~/hooks/business/useDeposit";
import { numFormat } from "~/utils/common";
import { useGetCurrency } from "~/hooks/utils/useGetCurrency";
import { BankIcon } from "~/components/icons/Bank";
import { WalletIcon } from "~/components/icons/Wallet";
import { PulsaIcon } from "~/components/icons/Pulsa";
import ArrowRight2Icon from "~/components/icons/ArrowRight2";
import {
  inlineTranslate,  
} from 'qwik-speak';
/*remove this if CMP does not have props*/
type Props = { 
  selPayOpt :Signal<PayOpt>;
  onSelPayOpt$ : PropFunction<( args : OnSelPayOptsArgs) => void>,
  onOkPayOpt$ :  PropFunction<()=>void>
} & PageProps ;
export default component$((props: Props) => {
  useStylesScoped$(styles);
  const t = inlineTranslate();
  
  const {currencyCode} = useGetCurrency(props.cd);
  const ewalletList =  (props.de.newFundMethodList?.length?props.de.newFundMethodList  : []).filter((item)=>{

    return  item.method === 7;
  }) || [] ;
  const pulsaList =   (props.de.newFundMethodList?.length?props.de.newFundMethodList  : []).filter((item)=>{

    return  item.method === 6;
  }) || []; 
   const submitBtnText = t('app.Confirm@@Confirm');
 
  return (
    <>
     
      <section class="mb-8">
        <h3 >
          <span class="font-semibold"> {t('wallet.Bank transfer@@Bank transfer')}</span>
          <span class="text-xs italic text-secondary">
            ({t('wallet.Check Manual@@Check Manual')})

          </span>
        </h3>
      

        <ul class="opt-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[300px] my-1.5 overflow-y-auto scroller pr-2"> 
              <li key={'bank_manual'} class={ "pay-opt rounded-[10px] p-2 my-1.5 first:mt-0 last:mb-0 " + ( props.selPayOpt.value?.__id === getPayOptId(props.de.site_bank_list[0])? 'active' : '')}>
                <Checkbox
                  type ="radio"
                  id={`cbx-5-${getPayOptId(props.de.site_bank_list[0])}`}
                  name="pay-opt"
                  value={getPayOptId(props.de.site_bank_list[0])}
                  direction="flex-row"
                  onChange$={()=>{
                    props.onSelPayOpt$({  method:5, selItem:props.de.site_bank_list[0]})
                  }}
                >
                  <div class="flex-center gap-4 leading-tight">
                    <p class="text-4xl"><BankIcon></BankIcon></p>
                    <p class="text-xs">  {t('wallet.Local Bank@@Local Bank')}
<br/>  {t('wallet.Transfer@@Transfer')}</p>
                    <p class="text-xxs font-bold flex-auto">
                    {props.de.site_bank_list?.length &&  props.de.site_bank_list.reduce((val :string, item,i) => { 
                        if(i==0){
                          val =item.provider_name;
                        } 
                        else {
                          val += ', ' + item.provider_name;
                        } 
                      return val; 
                    },"")}
                    </p>

                
                  </div>
                </Checkbox>
              </li> 
        </ul>
      </section>
      {props.de.has_ewallet && (<> <section class="mb-8">
        <h3 >
          <span class="font-semibold"> {t('wallet.Ewallet@@Ewallet')}</span>
          <span class="text-xs italic text-secondary">
            ({t('wallet.Check Manual@@Check Manual')})
          </span>
        </h3>
  
        <ul class="opt-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[300px] my-1.5 overflow-y-auto scroller pr-2"> 
              <li key={'ewallet_manual'} class={ "pay-opt overflow-hidden rounded-[10px] p-2 my-1.5 first:mt-0 last:mb-0 " + ( props.selPayOpt.value?.__id === getPayOptId(ewalletList[0])? 'active' : '')}>
                <Checkbox
                  type ="radio"
                  id={`cbx-5-${getPayOptId(ewalletList[0])}`}
                  name="pay-opt"
                  value={getPayOptId(ewalletList[0])}
                  direction="flex-row"
                  onChange$={()=>{
                    props.onSelPayOpt$({  method: 7, selItem:ewalletList[0]})
                  }}
                >
                  <div class="flex-center gap-4 leading-tight">
                    <p class="text-4xl"><WalletIcon></WalletIcon></p>
                    <p class="text-xs">  {t('wallet.Ewallet')}<br/>  {t('wallet.Transfer@@Transfer')}</p>
                    <p class="text-xxs font-bold flex-auto">
                    {ewalletList.reduce((val :string, item,i) => { 
                        if(i==0){
                          val =item.provider_name;
                        } 
                        else {
                          val += ', ' + item.provider_name;
                        } 
                      return val; 
                    },"")}
                    </p>

                
                  </div>
                </Checkbox>
              </li> 
        </ul>
      </section>
 </>)}
 
 {props.de.has_pulsa && (<> <section class="mb-8">
        <h3 >
          <span class="font-semibold"> {t('wallet.Pulsa')}</span>
          <span class="text-xs italic text-secondary">
            ( {t('wallet.Check Manual@@Check Manual')}
)
          </span>
        </h3>
  
        <ul class="opt-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[300px] my-1.5 overflow-y-auto scroller pr-2"> 
              <li key={'pulsa_manual'} class={ "pay-opt rounded-[10px] p-2 my-1.5 first:mt-0 last:mb-0 " + ( props.selPayOpt.value?.__id === getPayOptId(pulsaList[0])? 'active' : '')}>
                <Checkbox
                  type ="radio"
                  id={`cbx-5-${getPayOptId(pulsaList[0])}`}
                  name="pay-opt"
                  value={getPayOptId(pulsaList[0])}
                  direction="flex-row"
                  onChange$={()=>{
                    props.onSelPayOpt$({  method:6, selItem:pulsaList[0]})
                  }}
                >
                  <div class="flex-center gap-4 leading-tight">
                    <p class="text-4xl"><PulsaIcon></PulsaIcon></p>
                    <p class="text-xs">{t('wallet.Pulsa@@Pulsa')} <br/> {t('wallet.Transfer@@Transfer')}</p>
                    <p class="text-xxs font-bold flex-auto">
                    {pulsaList.reduce((val :string, item,i) => { 
                        if(i==0){
                          val =item.provider_name;
                        } 
                        else {
                          val += ', ' + item.provider_name;
                        } 
                      return val; 
                    },"")}
                    </p>

                
                  </div>
                </Checkbox>
              </li> 
        </ul>
      </section>
 </>)}
     
    
      {Object.entries(props.de.gateways_lists).map(([pgMode, gateways  ])=>{
      
      return <>
          <section class="mb-8">
        <h3 >
          <span class="font-semibold">
            {/* {
            
            (pgMode == "bank" ? pgModeNames.bank : (pgMode == "crypto" ? pgModeNames.crypto : (pgMode == "ewallet" ? pgModeNames.ewallet : '')))
          } */}
          {
            pgModeNames[props.de.method_int[pgMode]] 
          }
          </span>
          <span class="text-xs italic text-secondary">
            ({t('wallet.Auto Approved@@Auto Approved')})
          </span>
        </h3>
     
        <ul class="opt-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[300px] my-1.5 overflow-y-auto scroller pr-2">
          {gateways.map((item) => {
            
            return (
            <>
              <li key={getPayOptId(item)} class={ "pay-opt rounded-[10px] p-2 my-1.5 first:mt-0 last:mb-0 " + ( props.selPayOpt.value?.__id === getPayOptId(item)? 'active' : '')}>
                <Checkbox
                  type ="radio"
                  id={`cbx-5-${ getPayOptId(item)}`}
                  name="pay-opt"
                  value={getPayOptId(item)}
                  direction="flex-row"
                  onChange$={()=>{
                    props.onSelPayOpt$({  method: props.de.method_int[pgMode], selItem:item})
                  }}
                >
                  <div class="flex-center gap-4 leading-tight">
                    {/* pay-opt-img */}
                    <div class="relative">
                      <img alt={
                        pgMode + ' - ' + item.gateway
                      } src={getGatewayImgUrl(item )} class="rounded-md max-h-10" />
                      <span
                        class={
                          "pay-opt__flag absolute right-0 top-0 translate-x-2/4 -translate-y-2/4 rounded-full w-2 h-2 " +
                          (isGatewayOptActive(item)? "active" : "")
                        }
                      ></span>
                    </div>
                    <div class="min-w-0 flex-auto">
                       {/* pay-opt__name*/}
                      <p class="pay-opt__name pb-2 font-semibold">
                        {item.gateway}
                      </p>
                      <p class="text-xxs font-bold">
                    {item.banklist && item.banklist[item.method] &&  item.banklist[item.method]?.map((val,ind )=>{ 
                      if(ind!=0) val = ', ' + val;
                      return (val); 
                    })}
                      </p>
                    </div>
                  </div>
                </Checkbox>
              </li>
            </>
          )})}
        </ul>
      </section>
      </>
      })}
      
 
      {props.selPayOpt.value && <div class="my-8 text-center">
      <SubmitBtn
            icon={ArrowRight2Icon}  onClick$={props.onOkPayOpt$} type="button" text= {submitBtnText}
            >

      </SubmitBtn>
      </div>  }
      <section class="notice innerContent__wallet rounded-[10px] px-3 py-5 ">
                      <h4 class="text-lg font-semibold text-center mb-2"> {t('wallet.Important Notice@@Important Notice')}
</h4>
                      <ul class="leading-tight text-xs text-left">
                        {/* {

                        ([1,2,3,4,5,6,7,8,9,10]).map((key)=>(<li class="mb-2">{key + '. Lorem ipsum dolor sit amet, consectetu .'}</li>))
                        } */}
                           <div dangerouslySetInnerHTML={props.de.deposit_notice||''}></div>
                         
                      </ul>
                      

      </section> 
    </>
  );
});
