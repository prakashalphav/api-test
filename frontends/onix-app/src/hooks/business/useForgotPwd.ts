import { useContext , useSignal,   type Signal,$, useStore  } from '@builder.io/qwik'; 
import type { ApiData } from "~/services/types";
import {SHOW_FORGOT_PWD_MODAL} from '../context';
import {createSignals as createMSignals, useModal} from "../utils/useModal";
import type { Form} from '../utils/useForm';
import { useForm } from '../utils/useForm';

// import { globalAction$ } from '@builder.io/qwik-city';

// export const useLoginAction = globalAction$((loginData) => {
 
//  });

export const createSignals = ()=>{
    /*This should be called at a global context*/

    //test - const showModal = useSignal<boolean>(true);
    const  {showModal  }= createMSignals(); 
    return {showModal };
}
export const useSignals = ()=>{

    const showForgotPwdModal    = useContext<Signal<boolean>>(SHOW_FORGOT_PWD_MODAL);


    return {showForgotPwdModal};
}

export const useForgotPwd=()=>{
    const form =    useStore<Form>( { email :null ,forgotPwCaptchaimg :null });

    const {setFieldQRL,getFormStatusData} =  useForm(form);
    const captchaVersion = useSignal<number>(1);
    const captchaImg = useSignal<string>(); 
    const submitResult = useSignal<ApiData<null>>({ d: null });
    const isWaiting = useSignal<boolean>(false);
    const onSubmitQRL = $(async () => {
        isWaiting.value = true;
  
       
        const formData = await getFormStatusData();
        if(formData.validation.status === "success"){
        const controller = new AbortController();
        fetch("/submitForgotPwd" , {
          signal: controller.signal,
          body: formData.data,
          method: "post",
        })
          .then((response) => response.json())
          .then((json) => {
            console.log('forgot-pwd', json)
            submitResult.value = json;
     
          })
          .catch((error) => {
            //TODO 

            submitResult.value = error;
          })
          .finally(() => {
            isWaiting.value = false;
            controller.abort(); // Abort the request
            // Clean up any other resources associated with the request
          });
        }
        else {
          isWaiting.value = false;
        }
       
      });


      const onRefreshCaptchaQRL = $(() => {
        captchaVersion.value = captchaVersion.value + 1;
        const controller = new AbortController();
    
        fetch("/getCaptchaForgotPwd/?v=" + captchaVersion.value, {
          signal: controller.signal,
        })
          .then((response) => response.text())
          .then((text) => {
            captchaImg.value = text;
          })
          .catch((error) => console.error(error))
          .finally(() => {
            controller.abort(); // Abort the request
            // Clean up any other resources associated with the request
          });
      });
     
      return {form,setFieldQRL,submitResult,isWaiting,onSubmitQRL,captchaImg,onRefreshCaptchaQRL};
  
}
export function useForgotPwdModal() {
 

    const  {showForgotPwdModal} = useSignals();

    const {toggleModalQRL} = useModal(showForgotPwdModal);
    return {showForgotPwdModal ,toggleModalQRL };
}