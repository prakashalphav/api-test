import {
  component$,
  useStylesScoped$,
  $,
} from "@builder.io/qwik";
import SubmitBtn from "../../../../components/button/variant-1/Button1";
import UserFundAccounts from "~/components/user-fund-accs/UserFundAccounts";
import { CreditCardIcon } from "../../../../components/icons/CreditCard";
import Checkbox from "../../../../components/checkbox/variant-1/Checkbox1";
import FormInput from "../../../../components/form-input/variant-1/FormInput1";
import styles from "./WtihdrawForm.scss?inline";
import type { OnSelPayOptsArgs, PayOpt} from "~/hooks/business/useWithdraw";
import { useWithdrawForm , type WithdrFormProps} from "~/hooks/business/useWithdraw";
import { getBankImgUrl, getGatewayImgUrl } from "~/hooks/business/useWithdraw";
import { WalletIcon } from "~/components/icons/Wallet";
import FormFieldWrapper from "~/components/form-field-wrapper/FormFieldWrapper1";
import ArrowRight2Icon from "~/components/icons/ArrowRight2";
import { remoteChkWdAmtQRL } from "~/utils/validation";

import {priceToFloat } from "~/utils/formatters/priceToFloat";
import AlertMsg from "~/components/alert-msg/variant-1/AlertMsg1";
import {
  FUND_METHOD_BANK,
  FUND_METHOD_EWALLET,
  FUND_METHOD_PULSA,
} from "~/utils/constants/constants";
import { PulsaIcon } from "~/components/icons/Pulsa";
import {
  inlineTranslate,  
} from 'qwik-speak';
import { useCommonViewData } from "~/hooks/app/useCommonViewData";
import { useInputPriceFormat } from "~/hooks/utils/useInputPriceFormat";


export default component$((props: WithdrFormProps) => {
  useStylesScoped$(styles);
  const t = inlineTranslate();
  const {commonData} = useCommonViewData();
  const i = -1;
  const creditIconColors = [
    ["#2A54BF", "#739AFE"],
    ["#FEAC73", "#FE964E"], 
    ["#D83EFF", "#E994FF"],
    ["#EF4F50", "#F98585"],
  ];
     const  {
      wdForm,isWaiting, selUserWallet, onSelUserWalletQrl ,setFieldQRL ,onSubmitQRL,formStatus
  } = useWithdrawForm(props)
  const {
    onBlur: priceFormatOnBlur,
    onFocus: priceFormatOnFocus,
    onKeyup: priceFormatOnKeyup,
    onKeydown: priceFormatOnKeydown,
  } = useInputPriceFormat(formStatus.amount ?? '',{
    prefix: "",
    centsLimit: 0,
    clearOnEmpty: true,
    thousandsSeparator: ",",
    allowNegative: false,
  })

  
  return (
    <>

      <form
        ref={wdForm}
        method="POST"
        noValidate
        preventdefault:submit
        onSubmit$={onSubmitQRL}
        class="lg:w-1/2"
      >
        <input type="hidden" name="withdraw_token" value={props.wd.withdraw_token} />
        <input type="hidden" name="withdrawType" value="existing" />
        <input type="hidden" name="user_acc_id" value={selUserWallet.value?.id} />
        <input type="hidden" name="method" value={selUserWallet.value?.method} />
        <div class="mb-6">
          <label for="dp-amt" class="block pb-2 font-semibold">
             {t('wallet.Balance@@Balance')}
          </label>
          <ul class="opt-list grid grid-cols-2 gap-4 max-h-[300px] my-1.5 overflow-y-auto scroller pr-2">
            <li class="pay-opt wallet-type rounded-[10px] p-2 cursor-pointer">
              <Checkbox
                type="radio"
                id='wallet-game'
                name="wallet_type"
                value="game"
                checked={true}
                direction="flex-row"
                onChange$={(value) => { formStatus.walletType.value = value; }}
              >
                <div class="flex-center gap-4 leading-tight">
                  <div class="min-w-0 flex-auto">
                    <p class="text-xs font-semibold">
                      {t('app.Game Wallet@@Game Wallet')}
                    </p>
                    <p class="text-sm text-secondary">
                      {props.currencyCode + " " + commonData.user_bal}
                    </p>
                  </div>
                </div>
              </Checkbox>
            </li>
            <li class="pay-opt wallet-type rounded-[10px] p-2 cursor-pointer">
              <Checkbox
                type="radio"
                id='wallet-referral'
                name="wallet_type"
                value="referral"
                direction="flex-row"
                onChange$={(value) => { formStatus.walletType.value = value; }}
              >
                <div class="flex-center gap-4 leading-tight">
                  <div class="min-w-0 flex-auto">
                    <p class="text-xs font-semibold">
                      {t('app.Referral Wallet@@Referral Wallet')}
                    </p>
                    <p class="text-sm text-secondary">
                      {props.currencyCode + " " + commonData.user_ref_wallet_bal}
                    </p>
                  </div>
                </div>
              </Checkbox>
            </li>
          </ul>
          {/* <FormInput
            {...{
              ...{
                type: "text",
                placeholder: "",
                required: true,
                disabled: false,
                readonly: true,
                maxLength: 100,
                name: "balance",
                value: props.currencyCode + " " + props.userBal,
              },
            }}
            id="dp-balance"
          ></FormInput> */}
        </div>
        <div class="mb-6">
          <label for="dp-amt" class="block pb-2 font-semibold">
          {t('wallet.Amount@@Amount')}
          </label>
          <FormInput
            key={formStatus.walletType?.value||"empty"}
            {...{
              ...{
                type: "text",
                placeholder: "",
                required: true,
                disabled: false,
                readonly: false,
                maxLength: 100,
                rules :{
                  required :  {rule : true },
                  number :  {rule : true },
                  min :{
                    rule :  props.wd.min_wd , 
                  }, 
                  max :{
                    rule : props.wd.max_wd, 
                  },  
                  remote : {
                    rule : $(async (value) => {
                      return await remoteChkWdAmtQRL(value, formStatus.walletType?.value); 
                    }),
                    message: t('app.Amount exceeded@@Amount exceeded')
                  }
                },
                setField$ : setFieldQRL,
                form:formStatus,
                name: "amount",
              },
            }}
            id="dp-amt"
            onBlur$={priceFormatOnBlur}
            onFocus$={priceFormatOnFocus}
            onKeyUp$={priceFormatOnKeyup}
            onKeyDown$={priceFormatOnKeydown}
          ></FormInput>
         
        </div>
        <section class="mb-6">
          <label for="dp-fund" class="block pb-2  font-semibold">
          {t('wallet.Registered Fund Accounts@@Registered Fund Accounts')}  
          </label>
          <FormFieldWrapper fieldName="fundAcc" required={true} msgPosition="bottom" value={selUserWallet.value} rules={{
                      required :  {rule : true },
                   }}  setField$={setFieldQRL} form={formStatus} >
          <UserFundAccounts userBanks={props.userBanks.value} onChgUserWallet$={onSelUserWalletQrl} selUserWallet={selUserWallet}></UserFundAccounts>

          </FormFieldWrapper>
          {(props.wd.user_ewallet_add_status || props.wd.user_bank_add_status) && <button 
           onClick$={async ()=>{

            await props.onClickAddFundAcc$()
          }} 
          type="button" class="my-4 text-xs font-bold underline">
           {t('wallet.Add more@@Add more')}  
          </button> } 
        </section>
        <div class="mb-6">
          <label for="dp-ref_no" class="block pb-2 font-semibold">
          {t('wallet.Full Name@@Full Name')} 
          </label>
          <FormInput
            {...{
              ...{
                type: "string",
                value: props.wd.user_full_name,
                required: true,
                disabled: true,
                readonly: true,
                placeholder:"",
                maxLength: 100,
                name: "full_name",
              },
            }}
            id="dp-name"
          ></FormInput>
        </div>
        <div class="mb-6 text-center">
          <SubmitBtn
            icon={ArrowRight2Icon} 
            isWaiting={isWaiting}
            type="submit"
            text= {t('wallet.Withdraw@@Withdraw')} 
          ></SubmitBtn>
        </div>
      </form>

      <div class="mt-3">
        <AlertMsg
        message={props.submitResult} 
        ></AlertMsg>
      </div>
    </>
  );
});
