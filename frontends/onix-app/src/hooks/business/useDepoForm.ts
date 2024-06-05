import {
  type Signal,
  type PropFunction,
  type ResourceReturn,
  useSignal,
  useStore,
  $,
} from "@builder.io/qwik";
import type {
  DepoFormData2,
  OnSelPayOptsArgs,
  PayOpt,
  Props as PageProps,
  _PayOpt,
} from "~/hooks/business/useDeposit";
import { getPayOptId } from "~/hooks/business/useDeposit";
import type {
  ApiData,
  TrxPromo,
  UserBank,
  GatewayBank,
  AgentTrxBank,
  FundMethod,
} from "~/services/types";

import { type Form, useForm } from "../utils/useForm";
import deposit from "~/routes/(wallet)/deposit";

export type Props = {
  class?: string;
  submitResult: Signal<ApiData<null>>;
  depositRes: ResourceReturn<DepoFormData2>;
  selPayOpt: Signal<PayOpt>;
  selPromo: Signal<TrxPromo | null>;
  //   selPromo :  Signal<SelPromo>;
  //   applyPromo :  Signal<boolean>;
  onSelectPromo$: PropFunction<(item?: TrxPromo) => void>;
  onClickAddFundAcc$: PropFunction<() => void>;
  onSelPayOpt$: PropFunction<(args: OnSelPayOptsArgs) => void>;
  onChgPayOpt$: PropFunction<() => void>;
  onSubmitForm$: PropFunction<
    (
      form: Signal<HTMLFormElement | undefined>,
      isWaiting: Signal<boolean>
    ) => void
  >;
  confirmPay: Signal<boolean>;
  selUserWallet: Signal<UserBank | null>;
  userBanks: Signal<UserBank[]>;
} & PageProps;

export const useDepoForm = (props: Props) => {
  //make sure the fields order is same order as the form
  const formStatus = useStore<Form>({deposite_amount:null, fundAcc: null ,depositTo : null ,consent : null , });

  const { setFieldQRL, checkFormValid } = useForm(formStatus); 
  const dpForm = useSignal<HTMLFormElement>();
  const selGatewayBank = useSignal<GatewayBank>(); 
  const isWaiting = useSignal<boolean>(false);
  const intMethod = props.selPayOpt.value?.intMethod || 5;
  const onChgGatewayBankQRL = $((item: GatewayBank) => {
     
    selGatewayBank.value = item;
    
  });
 
  const getManualFundValueQRL = $((o: AgentTrxBank) => {
    return JSON.stringify(o);
  });

  const getManualFundIdQRL = $((item: _PayOpt) => {
    if (props.selPayOpt.value) {
      return props.selPayOpt.value.__id === getPayOptId(item);
    }
    return false;
  });
  const getManualFundTextQRL = $((item: _PayOpt) => {
    if (intMethod === 7 || intMethod === 6 || intMethod === 8) {
      return item.provider_name + " - " + item.setting.acc_name;
    } else {
      return item.provider_name + " - " + item.setting.acc_name;
    }
  });
  const onManualFundChgQRL = $((value: string) => {
    const o = JSON.parse(value) as _PayOpt;

    //  o.method = intMethod;
    return props.onSelPayOpt$({method: intMethod, selItem: o});
  });
  const onChgUserWalletQRL = $((item: UserBank) => {
    props.selUserWallet.value = item;
  });

  const clearSelPromQRL = $(() => {
    props.selPromo.value = null;
  });

  const onSubmitQRL = $(async () => {
    isWaiting.value = true;
    const isFormValid =  await checkFormValid();
    console.log('formData', isFormValid);
    if(isFormValid){
      await props.onSubmitForm$(dpForm, isWaiting);
    }

    isWaiting.value = false;
  })
  
  const checkAllowSelectPromo =$( (depoFormResource : DepoFormData2) =>{
    return  !depoFormResource.user_promo_exists &&  depoFormResource.user_allow_promo ;
  })
  return {
    dpForm,
    selGatewayBank,
    isWaiting,
    clearSelPromQRL,
    onChgGatewayBankQRL,
    onChgUserWalletQRL,
    getManualFundTextQRL,
    getManualFundValueQRL,
    onManualFundChgQRL,
    intMethod,
    getManualFundIdQRL,
    setFieldQRL,
    onSubmitQRL,
    formStatus,
    checkAllowSelectPromo, 
  };
};

export const getAccImage = (payOptItem: PayOpt) => {
  console.log('getAccImage',payOptItem)
  return    payOptItem && payOptItem.setting?.account_image
  ?  "https://files.sitestatic.net/"  + ((payOptItem as any)?.qr_img_folder !== undefined
      ? (payOptItem as any).qr_img_folder
      : "e-wallet") +
      "/" +
      payOptItem.setting?.account_image
  : "" ;
};

export const isPayGateway = (payOptItem: PayOpt) => {
  return !!payOptItem?.gateway;
};
export const isGatewayChooseBank = (dr: DepoFormData2) => {
  return dr.choose_bank == 1 && dr.bank.length >= 0;
};
export const isNotCryptoGateway = (payOptItem: PayOpt) => {
  return payOptItem?.gateway !== "coin2pay";
};

export const isShowCryptoRates = (payOptItem: PayOpt, dr: DepoFormData2) => {
  return payOptItem?.gateway === "coin2pay" && dr.bank.length > 0;
};
