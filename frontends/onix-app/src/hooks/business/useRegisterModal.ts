import type { PropFunction } from "@builder.io/qwik";
import {
  useContext,
  useSignal,
  type Signal,
  $,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";
import type { ApiData, FormId, RegisterFormSettings } from "~/services/types";
import { SHOW_REGISTER_MODAL } from "../context";
import { createSignals as createMSignals, useModal } from "../utils/useModal";
import type { FormStatusData } from "../utils/useForm";
import { type Form, useForm } from "../utils/useForm";
import { useLocation } from "@builder.io/qwik-city";
import { useSecondPinModal } from "./useSecondPin";
import { rememberMeChkedValue } from "~/utils/constants/constants";
import { inlineTranslate } from "qwik-speak";
import { useCommonViewData } from "../app/useCommonViewData";

export const useSignals = () => {
  //test -

  // const showRegModal = useSignal<boolean>(true);
  const showRegModal = useContext<Signal<boolean>>(SHOW_REGISTER_MODAL);

  return { showRegModal };
};

export function useRegisterModal() {
  const { showRegModal } = useSignals();
  const { toggleModalQRL } = useModal(showRegModal);

  return { showRegModal, toggleModalQRL };
}


export function getBtnTextByFormStep( currentStep : number, lastStep : number) {
  const t = inlineTranslate();


  if (currentStep <lastStep ) {
    return  t("app.Next@@Next");
  } else  {
    //currentStep == lastStep
    return t("app.Submit@@Submit");
  }
}

export function useRegister() {
  const { showRegModal, toggleModalQRL } = useRegisterModal();
  const captchaVersion = useSignal<number>(1);
  const captchaImg = useSignal<string>();
  // const captchaTag= useSignal<HTMLImageElement>( );
  const result = useSignal<ApiData<null>>({ d: null });
  const isWaiting = useSignal<boolean>(false);
  const refCode = useSignal<string | null>();
  const location = useLocation(); 
  const formSettings = useSignal<RegisterFormSettings>();
  useVisibleTask$(async () => {
    if (location.url.pathname == "/") {
      const urlParams = location.url.searchParams;
      refCode.value = urlParams.get("ref");
      if (refCode.value) {
        localStorage.setItem("referral_code", refCode.value);
      } else {
        localStorage.removeItem("referral_code");
      }
      if (refCode.value || urlParams.get("action") ==  "register") {
        showRegModal.value = true;
        window.history.replaceState({}, document.title, location.url.pathname);
      }
    }
  });

  const walletForm = useSignal<HTMLFormElement>();
  const checkWalletFormValidQRL = useSignal();
  const onRegisterWalletInitQRL = $(
    (form: HTMLFormElement, checkFormValid: PropFunction<() => boolean>) => {
      walletForm.value = form;
      checkWalletFormValidQRL.value = checkFormValid;
    }
  );
  const validatedForm = useStore<Form>({
    user_name: null,
    password: null,
    password_confirm: null,
    email: null,
    ref_code: null,
    captcha: null,
    mobile_no: null,
    subscribe: null,
    remember_me: { status: null, value: rememberMeChkedValue, message: "" },
  });

  const { setFieldQRL, getFormStatusData, checkEqualQRL } =
    useForm(validatedForm);
  const { toggleModalQRL: toggle2ndPinModalQRL } = useSecondPinModal();
  const { commonData } = useCommonViewData();
  const formStep = useStore<{
    current: number;
    last: number;
    submitBtnText: string;
  }>({ current: 1, last: 1, submitBtnText: getBtnTextByFormStep(1, 1) });

  const changeFormStepQRL = $((increment: number) => {
    
    if (formStep.last > 1) {
      const newStep = formStep.current + increment; // can be negative

      if (newStep >= 1 && newStep <= formStep.last) {
        formStep.current = newStep;
      } else {
        alert("out of range step  ");
        throw Error("out of range step  ");
      }
      formStep.submitBtnText =getBtnTextByFormStep(formStep.current, formStep.last) 
    }
  });
  const onRefreshCaptchaQRL = $(async () => {
    captchaVersion.value = captchaVersion.value + 1;
    const controller = new AbortController();
    const response = await fetch("/captcha-image/?v=" + captchaVersion.value, {
      signal: controller.signal,
    });
    const text = await response.text();
    captchaImg.value = text;
    validatedForm.captcha = null;
    controller.abort();

  });

  const sendToRegisterApiQRL = $(async (formData :FormStatusData) => {
    const controller = new AbortController();
 
    const response = await fetch("/register-submit/", {
      signal: controller.signal,
      body: formData.data,
      method: "post",
    });

    const json = await response.json();

    result.value = json;
    // console.log("register-submit", result.value);
    if (result.value.type === "s") {
      if (result.value.action === "setup-pin") {
        await toggleModalQRL();
        await toggle2ndPinModalQRL("setup");
      } else if(result.value.redirectUrl){
        window.location.href = result.value.redirectUrl;
      } else if (typeof window !== "undefined") {
        window.location.reload();
      }
    }
    else{
      await onRefreshCaptchaQRL();
    }

    isWaiting.value = false;
    controller.abort();
       
  });
  const onSubmitQRL = $(async () => {
    isWaiting.value = true;
    // const formData = new FormData(form.value);

    const formData = await getFormStatusData();

    console.log("onsubmit", formData);
    if (formData.validation.status === "success") {
      formData.data?.append(
        "register_token",
        formSettings.value?.register_token
      );

      if (formStep.current == 1) {
        if (formStep.last > 1) {
          await changeFormStepQRL(1);
        }
      }

      //if need register wallet acc
      if (
        formSettings.value?.is_register_need_acc &&
        (formStep.current == 2 || formStep.last == 1)
      ) {
        if (checkWalletFormValidQRL.value != null) {
          const isValid = await (await checkWalletFormValidQRL.value)();
          console.log("checkWalletFormValidQRL", isValid);
          if (isValid) {
            //submit to register api
            const walletFormData = new FormData(walletForm.value);
            console.log(
              "checkWalletFormValidQRL walletFormData",
              walletFormData,
              walletForm.value
            );

            for (const [key, value] of walletFormData.entries()) {
              formData.data?.append(key, value);
            }

            await sendToRegisterApiQRL(formData);
          }
        }
      } else if (formStep.last == formStep.current) {
        //if formSettings.value?.is_register_need_acc == false && formStep.last == 1 &&  formStep.current == 1
        //submit to register api
        await sendToRegisterApiQRL(formData);
      }
    }
    isWaiting.value = false;
  });


  const onRefreshFormQRL = $(async () => { 
    const controller = new AbortController();
    const response = await fetch("/getRegisterForm/", {
      signal: controller.signal,
    });
    const result = (await response.json()) as ApiData<RegisterFormSettings>;
    formSettings.value = result.d;

    //Set the form last Step
    if (
      formSettings.value?.is_register_need_acc && !commonData.website_settings.register_form_no_steps ) {
    
      formStep.last = 2; 
      formStep.submitBtnText =   getBtnTextByFormStep(formStep.current, formStep.last) 
    }

    controller.abort(); // Abort the request
  });

  return {
    showRegModal,
    toggleModalQRL,
    onSubmitQRL,
    captchaImg,
    result,
    onRefreshCaptchaQRL,
    isWaiting,
    validatedForm,
    setFieldQRL,
    checkEqualQRL,
    refCode,
    onRefreshFormQRL,
    formSettings,
    rememberMeChkedValue,
    onRegisterWalletInitQRL,
    formStep,
    changeFormStepQRL,
  };
}
