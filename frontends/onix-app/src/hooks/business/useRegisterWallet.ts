import type { PropFunction } from "@builder.io/qwik";
import { useSignal, $, type Signal, useStore ,   } from "@builder.io/qwik";
import type {
  FundMethod,
  AgentBank,
  ApiData,
  AgentTrxNewFund,
  UserBank,
} from "~/services/types";

import {
  FUND_METHOD_BANK,
  FUND_METHOD_EWALLET,
} from "../../utils/constants/constants";
export type FundOpt = AgentBank | AgentTrxNewFund | null;

import { getBankAccLength } from "~/utils/common";
export type Method = number | null;
import type { RegisterWalletData } from "~/services/types";
import type { Form, FormStatusData } from "../utils/useForm";
import { useForm } from "../utils/useForm";
export type Props = {
  isUseFieldsOnly: boolean;
  accNoMinLength: number;
  rw: RegisterWalletData;
  backUrl?: string | null;
  onInit$?: PropFunction<( form :  HTMLFormElement  , checkFormValid : PropFunction<() => boolean> ) => void>;
  showAddFundAccModal?: Signal<boolean>;
  toggleAddFundAccMd$?: PropFunction<(items?: UserBank[]) => void>;
  providerFieldName?: string;
  formInputClass? : string;
};

export  const useRegisterWallet =   (props: Props) => {
  const selFundOpt = useSignal<FundOpt>(null);
  const defaultMethod = props.rw.is_user_allow_bank
    ? FUND_METHOD_BANK
    : FUND_METHOD_EWALLET;
  const selMethod = useSignal<FundMethod>(defaultMethod);
  const form = useSignal<HTMLFormElement>();
  const isWaiting = useSignal<boolean>(false);
  const submitResult = useSignal<ApiData<UserBank[]>>({ d: [] });
  const accNoLength = useSignal<{ max_len: number; min_len: number }>(
    getBankAccLength("", props.accNoMinLength, 20)
  );
  const providerFieldName = props.providerFieldName?props.providerFieldName :
  "new_bank";

  const formStatus = useStore<Form>({
    fundProvider: null,
    acc_name: null,
    acc_no: null,
  });
  const { setFieldQRL , checkFormValid } = useForm(formStatus);
 

  const onSubmitQRL = $(async () => {
    isWaiting.value = true;
    const isFormValid = await checkFormValid();
    // console.log('useRegisterWallet__onSubmitQRL beforechkvalid', formStatus);
    if (isFormValid) {
      const formData = new FormData(form.value);
      console.log("useRegisterWallet__onSubmitQRL", formData.entries);
      const controller = new AbortController();
      fetch("/add-wallet-acc", {
        signal: controller.signal,
        body: formData,
        method: "post",
      })
        .then((response) => response.json())
        .then((json) => {
          submitResult.value = json;
          console.log(
            "useRegisterWallet__onSubmitQR__submitResult",
            submitResult.value
          );
          if (submitResult.value.type === "s") {
            if (typeof window !== "undefined" && props.backUrl !== undefined) {
              setTimeout(() => {
                location.href = "/" + props.backUrl + "/";
              }, 0);
            } else if (props.toggleAddFundAccMd$ !== undefined) {
              props.toggleAddFundAccMd$(submitResult.value.d || []);
              location.reload();
            }
          }
        })
        .catch((error) => {
          console.log("useRegisterWallet__onSubmitQRL error", error);
        })
        .finally(() => {
          isWaiting.value = false;
          controller.abort(); // Abort the request
          // Clean up any other resources associated with the request
        });
    }

    isWaiting.value = false;
  });
  const onChgMethodQRL = $(async (val: FundMethod) => {
    selMethod.value = val;
  });

  const onChgFundOptQRL = $(async (item: FundOpt) => {
    if (item)
      accNoLength.value = {
        min_len: item.min_length,
        max_len: item.max_length,
      }; //getBankAccLength(item?.bank_code||'', props.accNoMinLength , 20 )
    selFundOpt.value = item;
  });

  return {
    selFundOpt,
    selMethod,
    form,
    onSubmitQRL,
    onChgFundOptQRL,
    onChgMethodQRL,
    accNoLength,
    isWaiting,
    submitResult,
    setFieldQRL,
    formStatus,
    checkFormValid,
    providerFieldName
  };
};
