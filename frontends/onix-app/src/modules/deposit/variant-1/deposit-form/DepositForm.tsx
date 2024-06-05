 import {
  component$,
  useStylesScoped$, 
  Resource, 
  useTask$,
useSignal,
} from "@builder.io/qwik";
import SubmitBtn from "../../../../components/button/variant-1/Button1";

import CancelBtn from "../../../../components/button/variant-2/Button2";
import { DiscountIcon } from "../../../../components/icons/Discount";
import Checkbox from "../../../../components/checkbox/variant-1/Checkbox1";

import FormInput from "../../../../components/form-input/variant-1/FormInput1";
import InputFile from "../../../../components/input-file/variant-1/InputFile1";
import UserFundAccounts from "~/components/user-fund-accs/UserFundAccounts";
import Consent from "./partials/consent/Consent";
import PaymentDropdown from "./partials/payment-dropdown/PaymentDropdown";
import styles from "./DepositForm.scss?inline";
 
import type { _PayOpt} from "~/hooks/business/useDeposit";
import {
    pgModeNames} from "~/hooks/business/useDeposit";
    
import {
getGatewayBankLogoUrl
} from "~/hooks/business/useDeposit";
import InputCopy from "./../input-copy/InputCopy";
 
import { useGetCurrency } from "~/hooks/utils/useGetCurrency";
import   { useEventsUtils } from "~/hooks/business/useEventsUtils";

import AlertMsg from "~/components/alert-msg/variant-1/AlertMsg1";

/*remove this if CMP does not have props*/

import { useDepoForm, type Props ,getAccImage,isShowCryptoRates,isNotCryptoGateway,isGatewayChooseBank ,isPayGateway,} from "~/hooks/business/useDepoForm";

import { isServer } from '@builder.io/qwik/build';
import { FUND_METHOD_BANK, FUND_METHOD_CRYPTO, FUND_METHOD_EWALLET, FUND_METHOD_PULSA } from "~/utils/constants/constants";
import FormFieldWrapper1 from "~/components/form-field-wrapper/FormFieldWrapper1";
import ArrowRight2Icon from "~/components/icons/ArrowRight2";
import { useInputPriceFormat } from "~/hooks/utils/useInputPriceFormat";
import {
  inlineTranslate,  
} from 'qwik-speak';
import { numFormat, toStrId } from "~/utils/common";
 
 
export default component$((props: Props) => {
  useStylesScoped$(styles);
  const t = inlineTranslate();
  const { currencyCode } = useGetCurrency(props.cd);
  
 const {dpForm, selGatewayBank, isWaiting,clearSelPromQRL,onChgGatewayBankQRL,onChgUserWalletQRL ,getManualFundTextQRL,getManualFundValueQRL,onManualFundChgQRL, intMethod,getManualFundIdQRL  ,setFieldQRL,onSubmitQRL,checkAllowSelectPromo, formStatus}= useDepoForm(props);
 const {mapPromoGivenTypeText} = useEventsUtils();
 let isAllowSelectPromo = false;

 const msgGatewayNotSupport = t("wallet.Gateway not supported@@Sorry for inconvenience. Currently {{gateway}} not support {{currencyCode}} currency", {gateway:props.selPayOpt.value?.gateway ,currencyCode:currencyCode });
 const {
  onBlur: priceFormatOnBlur,
  onFocus: priceFormatOnFocus,
  onKeyup: priceFormatOnKeyup,
  onKeydown: priceFormatOnKeydown,
} = useInputPriceFormat(formStatus.deposite_amount ?? '',{
  prefix: "",
  centsLimit: 0,
  clearOnEmpty: true,
  thousandsSeparator: ",",
  allowNegative: false,
})

  // useTask$(async ( {track}) => { 
  //   track(() => props.confirmPay.value);
  //   if (isServer) {
  //     return; // Server guard
  //   }

  // })
  return (
    <>
       <div class={`${props.class||""}`}>
    <div class="hidden">
      {/* Can't remove this,this fixes weird bug in latest version - selGatewayBank not updating on UI. */} 
      {JSON.stringify(selGatewayBank.value)}
      {JSON.stringify(props.selPromo.value)}

   </div>
       <Resource
              value={props.depositRes}
              onPending={() => <div>Loading...</div>}
              onRejected={(e) => <div>Failed to load data. {e.message}</div>}
              onResolved={async (dr) => {
                console.log('depositRes', dr)
                isAllowSelectPromo= await checkAllowSelectPromo(dr);
                return (
                  <>
                  
                  {dr.supported &&   <>
      <form
        ref={dpForm}
        method="POST"
        noValidate
        encType="multipart/form-data"
        preventdefault:submit
        onSubmit$={onSubmitQRL}
      > 
       <input  type="hidden" name="deposit_token" value={dr.deposit_token} />
        <input
          type="hidden"
          value={props.selPayOpt.value?.intMethod}
          name="deposite_method"
        /> 
      {/* method - stupid payment gateway using another param name */}
        <input
          type="hidden"
          value={props.selPayOpt.value?.intMethod}
          name="method"
        /> 
        <input
          type="hidden"
          value={props.selPayOpt.value?.gateway}
          name="gateway_method"
        />
     
        <input
          type="hidden" 
          value={isPayGateway(props.selPayOpt.value) ? selGatewayBank.value?.bank_code: toStrId(props.selPayOpt.value?.setting?.id)}
          name="bank_name"
        />

        <input
          type="hidden"
          value={toStrId(props.selPayOpt.value?.id)}
          name="bank_to_provider"
        />

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
       
        <section class="form-1st-part">

        { !props.selPayOpt.value?.gateway && intMethod && 
        <section class="mb-4">
             <label for="banks-select" class="block pb-2 font-semibold">
             {t('wallet.Bank To@@Bank To')} *
            </label>  
            <FormFieldWrapper1 fieldName="depositTo" required={true} msgPosition="bottom" value={props.selPayOpt.value} rules={{
                      required :  {rule : true },
                   }}  setField$={setFieldQRL} form={formStatus} >
          <PaymentDropdown intMethod={intMethod} site_bank_list={props.de.site_bank_list}
          newFundMethodList={props.de.newFundMethodList} getManualFundId$={getManualFundIdQRL} getManualFundText$={getManualFundTextQRL} getManualFundValue$={getManualFundValueQRL} onManualFundChg$={onManualFundChgQRL}></PaymentDropdown>
          </FormFieldWrapper1>
          </section>

        }
         { !props.selPayOpt.value?.gateway && <section class="mb-4">
            <h3 class="pb-2 ">
              <span class="font-semibold">{t('wallet.Bank transfer@@Bank transfer')}  </span>
              <span class="text-xs italic text-secondary">
              ( {t('wallet.Manual checks@@Manual checks')} )
              </span>
            </h3>
            <ul class="pay-details p-3 rounded-[10px] text-xs leading-snug">
              <li class="flex-center my-3 gap-2">
                {/* pay-opt-img */}
                <div class="relative">
                  <img src={props.selPayOpt.value?.imgUrl} class="rounded-md" />
                  <span
                    class={
                      "pay-opt__flag absolute right-0 top-0 translate-x-2/4 -translate-y-2/4 rounded-full w-2 h-2 " +
                      (props.selPayOpt.value?.isActive ? "active" : "")
                    }
                  ></span>
                </div>
                {/* pay-opt__name*/}
                <p class="min-w-0 flex-auto pay-opt__name text-xs font-semibold ">
                  {props.selPayOpt.value?.provider_name}
                </p>
                <button
                  type="button"
                  class="text-xxs"
                  onClick$={props.onChgPayOpt$}
                >
                   {t('wallet.Change@@Change')}
                </button>
              </li>
              <li class="flex-center mb-3">
                <p> {t('wallet.Min Deposit@@Min Deposit')}</p>
                <p class="min-w-0 flex-grow text-right">
                  {currencyCode +
                    " " +
                    numFormat(props.selPayOpt.value?.setting?.min_deposit || "")}
                </p>
              </li>
              <li class="flex-center my-3">
                <p> {t('wallet.Max Deposit@@Max Deposit')}</p>
                <p class="min-w-0 flex-grow text-right">
                  {currencyCode +
                    " " +
                    numFormat(props.selPayOpt.value?.setting?.max_deposit || "")}
                </p>
              </li>
              <li class="flex-center my-3">
                <p>{t('wallet.Bank/Transaction commision@@Bank/Transaction commision')}</p>
                <p class="min-w-0 flex-grow text-right">
                  {props.selPayOpt.value?.setting?.admin_fee}
                </p>
              </li>
              <li class="flex-center my-3">
                <p> {t('wallet.Bank/Transaction subsidi@@Bank/Transaction subsidi')}</p>
                <p class="min-w-0 flex-grow text-right">
                  {props.selPayOpt.value?.setting?.subsidi}
                </p>
              </li>
              <li class="my-3">
                <p class=""> {t('wallet.Bank Account Name@@Bank Account Name')}</p>
                <div class="text-right">
                  <InputCopy
                    value={props.selPayOpt.value?.setting?.acc_name || ""}
                    id="copu_acc_name"
                  ></InputCopy>
                </div>
              </li>
              <li class="my-3">
                <p class=""> {t('wallet.Bank Account No.@@Bank Account No.')}</p>
                <div class="text-right">
                  <InputCopy
                    value={props.selPayOpt.value?.setting?.acc_no || ""}
                    id="copu_acc_no"
                  ></InputCopy>
                </div>
              </li>

              {props.selPayOpt.value  && getAccImage(props.selPayOpt.value)&& ( 
                  <li class="flex-center">
                  <img 
                    decoding="async"
                    height="200" 
                    width="200"
                    loading="lazy"  
                    src={getAccImage(props.selPayOpt.value)}
                  />
                  </li>
              )}
    
            </ul>
          </section>
        }

          
{ isPayGateway(props.selPayOpt.value) && <section class="mb-4">
            <h3 class="pb-2 ">
              <span class="font-semibold">{  pgModeNames[props.selPayOpt.value?.intMethod||0] } </span>
              <span class="text-xs italic text-secondary">
                (Auto Approval)
              </span>
            </h3>
            <ul class="pay-details p-3 rounded-[10px] text-xs leading-snug">
              <li class="flex-center my-3 gap-2">
                {/* pay-opt-img */}
                <div class="relative">
                  <img src={props.selPayOpt.value?.imgUrl} class="rounded-md max-h-14" />
                  <span
                    class={
                      "pay-opt__flag absolute right-0 top-0 translate-x-2/4 -translate-y-2/4 rounded-full w-2 h-2 " +
                      (props.selPayOpt.value?.isActive ? "active" : "")
                    }
                  ></span>
                </div>
                {/* pay-opt__name*/}
                <p class="min-w-0 flex-auto pay-opt__name text-xs font-semibold ">
                  {props.selPayOpt.value?.provider_name}
                </p>
                <button
                  type="button"
                  class="text-xxs"
                  onClick$={props.onChgPayOpt$}
                >
                  Change
                </button>
              </li>
            
            { isNotCryptoGateway(props.selPayOpt.value) && <>
              <li class="flex-center mb-3">
                <p>Min Deposit</p>
                <p class="min-w-0 flex-grow text-right">
                  {currencyCode +
                    " " +
                    numFormat(dr.gateway_def_min || " - ")}
                </p>
              </li>
              <li class="flex-center my-3">
                <p>Max Deposit</p>
                <p class="min-w-0 flex-grow text-right">
                  {currencyCode +
                    " " +
                    numFormat(dr.gateway_def_max || " - ")}
                </p>
              </li> </>}
              { isShowCryptoRates(props.selPayOpt.value, dr) && <>
               <div class="rounded-lg -ml-3 -mr-3">
                <h4 class="cryp-tbl-title px-1.5 py-3 text-base font-bold text-left">Cryptocurrency Rates</h4>
                <table class="w-full cryp-tbl">
                    <thead class="text-left">
                        <th class="font-bold px-1.5 py-3 border-y">Token (Per Unit)</th>
                        <th class="font-boldpx-1.5 py-3 border-y">Rate (USD)</th>
                        <th class="font-bold px-1.5 py-3 border-y">Estimate Price ({currencyCode})</th>
                    </thead>
                    <tbody>
                  {   dr.bank.map((item) =>(<>
                        <tr>
                            <td class="px-1.5 py-3 border-b">{`${item.Token} (${item.Network})`}</td>
                            <td class="px-1.5 py-3 border-b">{ numFormat(item.Price_Deposit||"",8)}</td>
                            <td class="px-1.5 py-3 border-b">{ currencyCode==='IDR' && item.Token==='BIDR' ?  1 : numFormat(item.Estimate_Given_Credit||"",5)}</td>
                        </tr>
                    </>))}
                      
                    </tbody>
                </table>
               </div>
              </>

              }
            </ul>
          </section>
        }
          <div class="mb-6">
            <label for="dp-amt" class="block pb-2 font-semibold">
              {t("wallet.Amount@@Amount")} *
            </label>
            <FormInput
              
              {...{
                ...{
                  type: "text",
                  placeholder: "",
                  required: true,
                  disabled: false,
                  readonly: false,
                  maxLength: 100,
                  name: "deposite_amount",
                  rules :{
                    required :  {rule : true },
                    number :  {rule : true },
                    min :{
                      rule :   isPayGateway(props.selPayOpt.value)  ?   (selGatewayBank.value?.min_amount && (selGatewayBank.value?.min_amount > dr.gateway_def_min) ?selGatewayBank.value?.min_amount :dr.gateway_def_min   )  : props.selPayOpt.value?.setting?.min_deposit , 
                    }, 
                    max :{
                      rule :  isPayGateway(props.selPayOpt.value)  ? (selGatewayBank.value?.max_amount && (selGatewayBank.value?.max_amount > dr.gateway_def_max)  ?selGatewayBank.value?.max_amount :dr.gateway_def_max   )  :props.selPayOpt.value?.setting?.max_deposit, 
                    },  
                  },
                  setField$ : setFieldQRL,
                  form:formStatus
                },
              }}
              id="dp-amt"
              onBlur$={priceFormatOnBlur}
              onFocus$={priceFormatOnFocus}
              onKeyUp$={priceFormatOnKeyup}
              onKeyDown$={priceFormatOnKeydown}
            ></FormInput>
          </div>
          {(!!selGatewayBank.value && selGatewayBank.value?.user_hp === 1) && 
          <>
              <div class="mb-6">
                <label for="dp-amt" class="block pb-2 font-semibold">
                  {t("wallet.Sending Number@@Sending Number")} *
                </label>
                <FormInput
                  
                  {...{
                    ...{
                      type: "text",
                      placeholder: "",
                      required: true,
                      disabled: false,
                      readonly: false,
                      maxLength: 100,
                      name: "acc_no",
                      rules :{
                        required :  {rule : true },
                      },
                      setField$ : setFieldQRL,
                      form:formStatus
                    },
                  }}
                  id="dp-acc_no"
                ></FormInput>
              </div></>
          }
          { !isPayGateway(props.selPayOpt.value)  &&  props.selPayOpt.value?.intMethod == 5 &&  <section class="mb-6">
            <label for="dp-fund" class="block pb-2  font-semibold">
            {t("wallet.Registered Fund Accounts@@Registered Fund Accounts")}  *
            </label>
        
        
                   <input type="hidden" name="bank_user_id" value={props.selUserWallet.value?.id}></input>
                   <FormFieldWrapper1 fieldName="fundAcc" required={props.selPayOpt.value?.intMethod === 5} msgPosition="bottom" value={props.selUserWallet.value} rules={{
                      required :  {rule : props.selPayOpt.value?.intMethod === 5 },
                   }}  setField$={setFieldQRL}  form={formStatus} >
                  <UserFundAccounts selPayOpt={props.selPayOpt} userBanks={props.userBanks.value} onChgUserWallet$={onChgUserWalletQRL} selUserWallet={props.selUserWallet}></UserFundAccounts>
                  </FormFieldWrapper1>
                { (dr.user_ewallet_add_status || dr.user_bank_add_status) && <button
                      type="button"
                      onClick$={async ()=>{

                        await props.onClickAddFundAcc$()
                      }}
                      class="my-4 text-xs font-bold underline"
                    >
                      Add  {props.selPayOpt.value?.intMethod === FUND_METHOD_EWALLET  ? 'ewallets' : (props.selPayOpt.value?.intMethod === FUND_METHOD_PULSA  ?  'pulsa wallets' : (props.selPayOpt.value?.intMethod === FUND_METHOD_CRYPTO   ?  'crypto wallets' : 'banks' ) ) }
                    </button> 
                  }    
                
          </section>}
          { isPayGateway(props.selPayOpt.value) &&  isNotCryptoGateway(props.selPayOpt.value) && isGatewayChooseBank(dr)&&  <section class="mb-6">
            <label for="dp-fund" class="block pb-2  font-semibold">
            {t("wallet.Sending Acc@@Sending Acc")}  *
            </label>
        
          
                  
                    <ul class="opt-list grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[200px] my-1.5 overflow-y-auto scroller pr-2">
                      {dr.bank?.map((item,idx) => {
                     
                        return (
                          <>
                        
                            <li 
                            key={item.bank_code}
                              class={ `${ (selGatewayBank.value?.bank_name + '_' + selGatewayBank.value?.standard_code)  == (item.bank_name + '_' + item.standard_code)
                                ? 'active'  : ''} pay-opt rounded-[10px] p-2 first:mt-0 last:mb-0 ` }
                            >
                              <Checkbox 
                                type="radio"
                                id={`cbx-standard-${item.bank_name + '_' + item.standard_code}`}
                                name="bank_standard_code"
                                value={item.standard_code}
                                direction="flex-row"
                                onChange$={async( v)=>{

                                  await onChgGatewayBankQRL(item);
                                    // console.log('selitem', item)
                                }}
                              >
                                <div class=" leading-tight">
                                  {/* pay-opt-img */}
                                  <div class="pb-1.5">
                                  <img src={getGatewayBankLogoUrl(item,props.de.pg_logos)} class="rounded-md max-h-8" />
                                  </div>
                                  <div class="">
                                    {/* pay-opt__name*/}
                                    <p class="pay-opt__name text-xs font-semibold">
                                      {item.bank_name}
                                    </p>
                                    <p class="text-xxs text-secondary">
                                      Min Deposit - {item.min_amount? currencyCode + " " + numFormat(item.min_amount) : ' - '}
                                    </p>
                                    <p class="text-xxs text-secondary">
                                      Max Deposit - {item.max_amount? currencyCode + " " + numFormat(item.max_amount) : ' - '}
                                    </p>
                                  </div>
                                </div>
                              </Checkbox>
                            </li>
                          </>
                        );
                      })}
                    </ul>
                 
                
          </section>}

          { isPayGateway(props.selPayOpt.value) &&  isNotCryptoGateway(props.selPayOpt.value) && !isGatewayChooseBank(dr) && 
           <>
            <div class="grid grid-cols-3 md:grid-cols-4">
           
            {dr.bank?.map((item) =>  (
                 <img class="rounded-md max-h-10" src={getGatewayBankLogoUrl(item,props.de.pg_logos)}/> ) )}
            </div>
           </>
          }
        </section>
       
        <section id="form-2nd-part">
          <section class="mb-6">
            <label for="dp-promo" class="block pb-2  font-semibold">
            {t("app.Promotions@@Promotions")}   *
            </label>
            <input
              type="hidden"
              id="dp-promo"
              name="promo_code"
              value={props.selPromo.value?.promo_code}
            ></input>

            <div class="apply-promo rounded-[10px] overflow-hidden">
               <div class="flex-center gap-2 ">
              
               <button
                type="button"
                disabled={!isAllowSelectPromo}
                onClick$={async () => {
                  await props.onSelectPromo$();
                }}
                class="apply-promo-btn px-3 py-2.5 flex-auto min-w-0"
              >
                <div class="flex-center gap-2">
                  <span class="text-2xl">
                    <DiscountIcon></DiscountIcon>
                  </span>
                
                  {isAllowSelectPromo ? (<>
                    
                  

                    <p class="font-extrabold text-left flex-auto min-w-0">
                      {props.selPromo.value
                        ? props.selPromo.value.title
                        :   t("wallet.Apply a promo code@@Apply a promo code")  }
                    </p>
                  
                    </>  ) : (<>
                    <p class="font-extrabold text-left flex-auto min-w-0">
                    {!dr.user_allow_promo 
                      ? t("wallet.Sorry promo not allowed@@Sorry, you are not allowed to choose bonus promotion")  
                      : t("wallet.Under promotion@@Under promotion")   }
                  </p>
               
                  </>  )
                  }
             
                </div>
                {props.selPromo.value && ( 
                  <div class="shrink-0 flex-wrap flex text-xxs text-secondary gap-x-2 italic">
                      <p>{ mapPromoGivenTypeText(props.selPromo.value.given_after_turnover)}</p>
                      <p>  Min Deposit :  <span class="underline">{props.selPromo.value.min}</span></p>
                      <p>  Max Rewarded :   <span class="underline">{props.selPromo.value.max}</span></p>
                  </div>
                  ) } 
              </button> 
             {isAllowSelectPromo && <button
                  type="button"
                  onClick$={async () => {
                    await props.onSelectPromo$();
                  }}
                  class="text-secondary px-3 py-2.5"
                >
                   {props.selPromo.value
                        ? t("app.Change@@Change")  
                        : t("wallet.Apply@@Apply")    }
                 
                </button>}
              {props.selPromo.value && (
                <>  |  <button
                type="button"
                onClick$={clearSelPromQRL}
                class="apply-promo-btn px-3 py-2.5"
              >
                {" "}
                {t("app.Clear@@Clear")}    
              </button></>
              )}
               </div>
            
             
            </div>
          </section>
          { !isPayGateway(props.selPayOpt.value) &&   <div class="mb-6">
            <label for="dp-ref_no" class="block pb-2 font-semibold">
            {t("wallet.Transaction number@@Transaction number")}
            </label>
            <FormInput
              {...{
                ...{
                  type: "text",
                  placeholder: "",
                  required: dr.is_ref_no_required ?? false,
                  disabled: false,
                  readonly: false,
                  maxLength: 100,
                  rules :{
                    required :  {rule : dr.is_ref_no_required ?? false },
                  },
                  name: "ref_no",
                  setField$ : setFieldQRL,
                  form:formStatus
                },
              }}
              id="dp-ref_no"
            ></FormInput>
          </div> }
          { !isPayGateway(props.selPayOpt.value)  &&   <div class="mb-6">
            <label for="dp-ref_no" class="block pb-2 font-semibold">
            {t("wallet.Transfer Receipt@@Transfer Receipt")}
            </label>
            <FormFieldWrapper1
              fieldName="receipt"
              required={false}
              msgPosition="bottom"
              setField$={setFieldQRL}
              form={formStatus}
            >
              <InputFile name="receipt"></InputFile>
            </FormFieldWrapper1>
          </div> }
          <div class="mb-6">
          <FormFieldWrapper1 fieldName="consent" required={true} msgPosition="bottom" rules={{
                      required :  {rule : true },
                   }}  setField$={setFieldQRL} form={formStatus} >
           <Consent></Consent>
           </FormFieldWrapper1>
          </div>
        </section>
        
        </div>
       <div class="mb-6 text-center flex-center gap-4">
          <CancelBtn  type="button" onClick$={props.onChgPayOpt$} text={t("app.Back@@Back")} ></CancelBtn>
          <SubmitBtn 
            icon={ArrowRight2Icon}
            isWaiting={isWaiting}
            type="submit"
            text={t("app.Send@@Send")} 
          ></SubmitBtn>
        </div>
      </form>
      </>}
      {!dr.supported && <>  <div class="mt-3">
        <AlertMsg 
          message ={ {value : {type:'i' , message :msgGatewayNotSupport
           , title :'Info' , d :null }}}
        ></AlertMsg>
      </div></> }
                  </>
                );
              }}
            />
 
        
       </div>
    </>
  );
});
