import { useContext , useSignal,   type Signal,$, useStore, useVisibleTask$, type QRL  } from '@builder.io/qwik'; 
import type { ApiData } from "~/services/types";
import {useModal} from "../utils/useModal";
import type { Form} from '../utils/useForm';
import { useForm } from '../utils/useForm';
import { SHOW_FORCE_RESET_PWD_MODAL } from '../context';
import { useAlertDialog } from "~/hooks/app/useInteract";

export const useSignals = () => {
    const showForceResetPwdModal = useContext<Signal<boolean>>(SHOW_FORCE_RESET_PWD_MODAL);

    return { showForceResetPwdModal };
}

export const useForceResetPwd = (toggleModalQRL: QRL<() => void>, isAuth?: boolean) => {
    const form = useStore<Form>({ password: null, password_confirmation: null });

    const { openDialogQRL } = useAlertDialog();
    const { setFieldQRL, getFormStatusData, checkEqualQRL, } = useForm(form); 
    const submitResult = useSignal<ApiData<null>>({ d: null, status: 0 });
    const isWaiting = useSignal<boolean>(false);
    const onSubmitQRL = $(async () => {
        isWaiting.value = true;
  
        const formData = await getFormStatusData();
        // console.log("formData", formData.data)
        if(formData.validation.status === "success"){
            const controller = new AbortController();
            const response = await fetch("/submitForceResetPwd", {
                signal: controller.signal,
                body: formData.data,
                method: "post",
            });
            const json = await response.json();
            submitResult.value = json;
            if (submitResult.value.type === "s") {
                localStorage.removeItem("force_reset_pwd");
                await toggleModalQRL();
                await openDialogQRL({message: submitResult.value.message || '' }, 's');
            }
            controller.abort();
        }
        isWaiting.value = false;
    });

    const onVisibleRunTask = $(async () => {
        const isForceResetPwd = localStorage.getItem('force_reset_pwd') == '1' ? true : false;
        if (isForceResetPwd && isAuth) {
            await toggleModalQRL(); 
        }
    }) 
    
    return { form, setFieldQRL, submitResult, isWaiting, onSubmitQRL, checkEqualQRL, onVisibleRunTask };
  
}
export function useForceResetPwdModal() {
    const { showForceResetPwdModal } = useSignals();
    const { toggleModalQRL } = useModal(showForceResetPwdModal);     

    return { showForceResetPwdModal, toggleModalQRL };
}