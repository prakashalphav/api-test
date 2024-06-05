import { useSignal, $, useStore, type Signal} from '@builder.io/qwik'; 
import { INTERACT_MSG_TYPE, type UserBank, type ApiData } from '~/services/types';
import { createSignals as createMSignals, useModal } from "~/hooks/utils/useModal";
import { type Form, useForm } from "~/hooks/utils/useForm";
import { useAddFundAccResource } from '~/hooks/utils/useResources';
import { useAlertDialog } from "~/hooks/app/useInteract";
import { inlineTranslate } from 'qwik-speak';

export const useActivateReferral = (has_otp_refferal?: number, user_first_name?: string) => {  
    const isWaiting = useSignal<boolean>(false);
    const { showModal: showAddFundAccModal } = createMSignals();
    const formStatus = useStore<Form>({
        bank_name: null,
        email: null,
        otp: null,
        name: user_first_name ? { status: null, value: user_first_name, message: "" } : null,
        user_identification: null,
        tnc_chkbox: null,
    });
    const { setFieldQRL, checkFormValid } = useForm(formStatus);
    const { addFundAccResource}=  useAddFundAccResource(showAddFundAccModal, true);
    const activateReferralForm = useSignal<HTMLFormElement>();
    const showStep2Form = useSignal<boolean>(false);
    const submitResult = useSignal<ApiData<null>>({ d: null, status: 200 });
    const { openDialogQRL } = useAlertDialog();
    const onCloseSubmitResultDialog =  $(()=>{
      if (submitResult.value.type === "s") {
        if(submitResult.value.redirectUrl){
          location.href = submitResult.value.redirectUrl;
        }
        location.reload();
      }
      return false;
    });

    const selUserWallet  = useSignal<string|null>(null);
    const onSelUserWalletQrl = $(( item : UserBank ) => {
      selUserWallet.value = item.id ;
    })
    const { toggleModalQRL: _toggleAddFundAccMdQRL } = useModal(showAddFundAccModal);
    const toggleAddFundAccMdQRL = $(async (items?: UserBank[]) => {
   
        // if(items !== undefined){
    
        //     userBanks.value= items;
        // }
        
        await _toggleAddFundAccMdQRL();
      });
    const onSubmitFormQRL = $(
      async (
        activateReferralForm: Signal<HTMLFormElement | undefined>,
        isWaiting: Signal<boolean>
      ) => {
        if (!activateReferralForm.value) {
          submitResult.value = {
            d: null,
            type: INTERACT_MSG_TYPE.ERROR,
            status: 500,
            message: "Form is undefined",
            title: "An error occured",
          };
          return;
        }
        isWaiting.value = true;
        const formData = new FormData(activateReferralForm.value);
        //API require 'bank_name' field name, but UserFundAccounts component is using 'bank_user_id' field name
        formData.append("bank_name", formData.get("bank_user_id") ?? "");
        formData.delete("bank_user_id");
        // for (const pair of formData.entries()) {
        //   console.log(pair[0], pair[1]);
        // }
        // const user_identification: HTMLInputElement | null =
        //   "user_identification" in activateReferralForm.value.elements
        //     ? (activateReferralForm.value.elements as any)["user_identification"]
        //     : null;
  
        // if (user_identification && (!user_identification.files || user_identification.files.length <= 0)) {
        //   formData.delete("user_identification");
        // }
        const controller = new AbortController();
  
        let postFetch: Promise<Response>;
        postFetch = fetch("/submitActivateReferral", {
          signal: controller.signal,
          body: formData,
          method: "post",
        });
        const response = await postFetch;
  
        submitResult.value = await response.json();
  
        await openDialogQRL({message : submitResult.value.message ?? '' ,onConfirm$ :onCloseSubmitResultDialog , onCancel$ :onCloseSubmitResultDialog} , submitResult.value.type);
        isWaiting.value = false;
        controller.abort(); 
      
      }
    );
    const onSubmitQRL = $(async () => {
        isWaiting.value = true;
        const isFormValid = await checkFormValid();
        if(isFormValid){
          await onSubmitFormQRL(activateReferralForm, isWaiting);
        }
    
        isWaiting.value = false;
    })
    const is_disable_send_otp = useSignal<boolean>(false);
    const otpSubmitResult = useSignal<OtpApiResponse>({message: '', status: '', type: ''});
    const checkOtpSuccess = $(async () => {
      const t = inlineTranslate();
      if (!chkOtpIsVerified(otpSubmitResult)) {
        await openDialogQRL({message : t("app.OTP code not verified@@OTP code not verified")}, "w")
        return false;
      }
      return true;
    })
    const onClickNextStep = $(async () => {
      isWaiting.value = true;
      const isValidateOtp = await checkOtpSuccess();
      const isFormValid = await checkFormValid();
      if(isFormValid && isValidateOtp){
        showStep2Form.value = true;
      }
      isWaiting.value = false;
    })
    const sendOTP = $(async () => {
      const t = inlineTranslate();
      if (!formStatus['email']?.value && (formStatus['email']?.status == "error")) {
            await openDialogQRL({ message : t("app.Email did not pass validation or is still validating. Please check again.@@Email did not pass validation or is still validating. Please check again.") }, "f")
            return;
        }
        const data = {
            is_activate_referral: '1',
        };

        // TODO brandon - verify otp by mobile or email option
        let type = 'email';
        if (has_otp_refferal == 0) {
            type = 'email';
        }

        if(type == 'mobile'){
            data.mobileno = formStatus['mobile']?.value;
            data.contact_country = formStatus['contact_country']?.value;
        }else{
            data.email = formStatus['email']?.value;
            // data.email = '';
        }

        isWaiting.value = true;
        const controller = new AbortController();
        fetch("/getOTP", {
            signal: controller.signal,
            body: JSON.stringify(data),
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((response) => response.json())
        .then(async (json) => {
            otpSubmitResult.value = json;
            if (json.type == "s" && json.d.otp_prefix) {
                formStatus['otp_prefix'] = { status: null, value: json.d.otp_prefix, message: "" };
                is_disable_send_otp.value = true;
                let otpCD = 60;
                const interval = setInterval(() => {
                  otpCD--;
                  if (otpCD < 0) {
                    is_disable_send_otp.value = false;
                    clearInterval(interval);
                  }
                }, 1000);
            }
        })
        .catch(async (error) => {
            console.error('getotp error', JSON.stringify(error));
            //TODO prompt error 
            await openDialogQRL({ message : error.message, }, "f")
        })
        .finally(() => {
          controller.abort(); // Abort the request
          // Clean up any other resources associated with the request
          isWaiting.value = false;
        });
    });
    const verifyOTP = $(async () => {
        const t = inlineTranslate();
        if (!formStatus['otp_prefix']?.value) {
            await openDialogQRL({ message : t("app.Please request OTP first@@Please request OTP first"), title: 'Error' }, "f")
            return;
        }
        if (!formStatus['otp']?.value || (formStatus['otp']?.status == "error")) {
            await openDialogQRL({ message : t("app.Please enter valid OTP@@Please enter valid OTP"), title: 'Error' }, "f")
            return;
        }

        // 0 = mobile, 1 = email
        // let type = $('input[name="type"]')[0].checked ? 'mobile' : 'email';
        let type = 'email';
        if (has_otp_refferal == 0) {
            type = 'email';
        }

        const data = {
            is_activate_referral: '1',
            name: formStatus['name']?.value,
            otp_prefix: formStatus['otp_prefix']?.value,
            otp: formStatus['otp']?.value
        };

        if(type == 'mobile'){
            data.mobileno = formStatus['mobile']?.value;
            data.contact_country = formStatus['contact_country']?.value;
        }else{
            data.email = formStatus['email']?.value;
        }

        isWaiting.value = true;
        const controller = new AbortController();
        fetch("/verifyOTP", {
            signal: controller.signal,
            body: JSON.stringify(data),
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((response) => response.json())
        .then(async (json) => {
            otpSubmitResult.value = json;
            if (json.type == "s") {
                is_disable_send_otp.value = true;
            }
        })
        .catch(async (error) => {
            console.error('verifyotp error', JSON.stringify(error));
            //TODO prompt error 
            await openDialogQRL({ message : error.message, }, "f")
        })
        .finally(() => {
          controller.abort(); // Abort the request
          // Clean up any other resources associated with the request
          isWaiting.value = false;
        });
    });
   
  
    return {
        isWaiting,
        showAddFundAccModal,
        formStatus,
        setFieldQRL,
        checkFormValid,
        addFundAccResource,
        activateReferralForm,
        selUserWallet,
        onSelUserWalletQrl,
        _toggleAddFundAccMdQRL,
        toggleAddFundAccMdQRL,
        submitResult,
        onSubmitQRL,
        onSubmitFormQRL,
        onCloseSubmitResultDialog,
        showStep2Form,
        onClickNextStep,
        otpSubmitResult,
        sendOTP,
        verifyOTP,
        is_disable_send_otp,
    };
};

export const chkOtpIsVerified = (otpSubmitResult: Signal<OtpApiResponse>) => {
  return otpSubmitResult.value.d?.success_code != '' && otpSubmitResult.value.d?.success_code !== undefined;
}

export interface OtpApiResponse {
  d?: Record<string, string>,
  message: string,
  status: string,
  type: string,
}