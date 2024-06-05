import { component$, useStylesScoped$ ,$ ,useTask$} from "@builder.io/qwik";
import styles from "./RegisterWallet1.scss?inline";

import { isServer } from "@builder.io/qwik/build";
import FormInput from "~/components/form-input/variant-1/FormInput1";

import MethodCheckbox from "~/components/checkbox/variant-2/Checkbox2";
import FundProviders from "./partials/fund-providers/FundProviders";

import { useRegisterWallet, type Props } from "~/hooks/business/useRegisterWallet";
import ArrowRight2Icon from "~/components/icons/ArrowRight2";


import SubmitBtn from "~/components/button/variant-1/Button1"; 

import AlertMsg from "~/components/alert-msg/variant-1/AlertMsg1";
import { FUND_METHOD_NAMES  ,FUND_METHOD_BANK  , FUND_METHOD_EWALLET } from "~/utils/constants/constants";  
import FormFieldWrapper from "~/components/form-field-wrapper/FormFieldWrapper1";
import { accNoPattern } from "~/utils/validation";
import {
  inlineTranslate,  
} from 'qwik-speak';

export default component$( (props: Props) => {
  useStylesScoped$(styles);
  const t = inlineTranslate();

  const { selFundOpt, selMethod ,form ,onSubmitQRL,onChgFundOptQRL,onChgMethodQRL,accNoLength,isWaiting,submitResult, setFieldQRL ,formStatus,checkFormValid,providerFieldName} =   useRegisterWallet(props);


  
  useTask$(
    async ({  track}) => {
      if (isServer) {
        return; // Server guard
      }
      track(()=> form.value)
      if(props.onInit$ && form.value){
        await props.onInit$(form.value,checkFormValid)
       }
      
    },
    { eagerness: "visible" }
  );
  
  return (
    <>
    
   <div class="py-5">
    <form ref={form} method="POST" preventdefault:submit onSubmit$={props.isUseFieldsOnly ?   null : onSubmitQRL}  noValidate> 
        <div class="mb-6">
          <label for="wallet-" class="block pb-2 font-semibold">
          {t('app.Wallet Type@@Wallet Type')}   *
          </label>
          <div class="flex gap-4 lg:gap-6">
          {props.rw.is_user_allow_bank &&  <MethodCheckbox
              id="wallet-bank"
              value={FUND_METHOD_BANK}
              direction="flex-row"
              type="radio"
              checked={selMethod}
              onChange$={async ( )=>{
                await onChgMethodQRL(FUND_METHOD_BANK);
              }}
              name="method"
            > 
            {t('runtime.FundMethodName@@{{methodName}}', {methodName: FUND_METHOD_NAMES[FUND_METHOD_BANK]})} 
           
            </MethodCheckbox> } 
            {props.rw.is_user_allow_e_wallet &&  <MethodCheckbox
              id="wallet-ewallet"
              value={FUND_METHOD_EWALLET}
              direction="flex-row"
              type="radio"
              checked={selMethod}
              onChange$={async ()=>{
                await onChgMethodQRL(FUND_METHOD_EWALLET);
              }}
              name="method"
            >
                 {t('app.FundMethodName@@{{methodName}}', {methodName: FUND_METHOD_NAMES[FUND_METHOD_EWALLET]})} 
           
            </MethodCheckbox> }
            {/* <MethodCheckbox
              id="wallet-pulsa"
              value="6"
              direction="flex-row"
              type="radio"
              name="method"
            >
              {" "}
              Pulsa{" "}
            </MethodCheckbox> */}
          </div>
        </div>
        <div class="mb-6">
          <label for="wallet-" class="block pb-2 font-semibold">
            {t(FUND_METHOD_NAMES[selMethod.value])} *
          </label>
          <FormFieldWrapper fieldName="fundProvider" required={true} msgPosition="bottom" value={selFundOpt.value} rules={{
                      required :  {rule :  true },
                   }}  setField$={setFieldQRL} form={formStatus}>
         <FundProviders providerFieldName={providerFieldName} onChgFundOpt$={onChgFundOptQRL} selFundOpt={selFundOpt} selMethod={selMethod} rw={props.rw}></FundProviders>
         </FormFieldWrapper>
      
        </div>

        
        <div class="mb-6">
          <label for="wallet-accname" class="block pb-2 font-semibold">
          {t('app.Account Name@@Account Name')} *
          </label>
          <FormInput
            {...{
              ...{
                type: "text",
                placeholder: "",
                required:  props.rw.fullName?true:false,
                disabled: props.rw.fullName?true:false,
                readonly: false,
                maxLength: 100,
                value: props.rw.fullName,
                setField$ : setFieldQRL,
                form:formStatus,
                rules :{
                  required : {rule : $(()=>{
                    return  props.rw.fullName?true:false;
                  })}
                }, 
                name: "acc_name",
                class : props.formInputClass,
              },
            }}
            id="wallet-accname"
          ></FormInput>
        </div>

        <div class="mb-6">
          <label for="wallet-" class="block pb-2 font-semibold">
          {t('app.Account No@@Account No.')}  *
          </label>
        
          <FormInput 
          //  when selFundOpt updated this field will reinit , validation status will be null, and value will go back to initial value 
            key={selFundOpt.value?.bank_code||"empty"}
            {...{
              ...{
                type: "text",
                placeholder: "",
                required: true,
                disabled: false,
                readonly: false,
                minLength:accNoLength.value.min_len,
                maxLength:  accNoLength.value.max_len,
                setField$ : setFieldQRL,
                form:formStatus,
                rules :{
                  required :  {rule : true },
                  pattern :{rule :accNoPattern },
                  minLength :{
                    rule :  accNoLength.value.min_len, 
                  }, 
                  maxLength :{
                    rule : accNoLength.value.max_len, 
                  },  
                },
                name: "acc_no",
                class : props.formInputClass,
              },
            }}
            id="wallet-acc_no"
          ></FormInput>
        </div>
      
        <div class="mb-6 text-center">
        {props.isUseFieldsOnly ?  <></> : <SubmitBtn
                    icon={ArrowRight2Icon}   isWaiting={isWaiting} type="submit" text={t('app.Submit@@Submit')}>
                </SubmitBtn>}
        
        </div>
    
    
       </form> 

      <div class="mt-3">
           <AlertMsg  message={submitResult}  ></AlertMsg>
       </div>  
   </div>
     
    </>
  );
});
