import type { QRL  } from '@builder.io/qwik';
import { useContext , useSignal,   type Signal,$, useStore, useContextProvider  } from '@builder.io/qwik'; 
import type { ApiData, LoginForm } from "~/services/types";
import {SHOW_LOGIN_MODAL} from '../context';
import {useModal} from "../utils/useModal";

 
import type { Form} from '../utils/useForm';
import { useForm } from '../utils/useForm';
import { useForgotPwdModal } from './useForgotPwd';
import { useRegisterModal } from './useRegisterModal';
import { useSecondPinModal } from './useSecondPin';
import { rememberMeChkedValue } from '~/utils/constants/constants';
import { LOGIN_FORM_CTX } from '~/modules/login-form/variant-1/LoginForm1';
 
export const useSignals = ()=>{

    const showLoginModal    = useContext<Signal<boolean>>(SHOW_LOGIN_MODAL);


    return {showLoginModal};
}

export const useLoginFormCtx = ( ) => {
  const loginFormCtx  = useContext<Signal<LoginForm>>(LOGIN_FORM_CTX);

  return {loginFormCtx}
}

export const useLogin=(toggleModalQRL :QRL<()=>void>)=>{
    const form =    useStore<Form>( { user_name :null ,password :null, remember_me:  {status : null, value : rememberMeChkedValue, message :""}  });
    const formEle = useSignal<HTMLFormElement>();
    const {setFieldQRL,getFormStatusData} =  useForm(form);

    const submitResult = useSignal<ApiData<null>>({ d: null });
    const isWaiting = useSignal<boolean>(false);

    const loginFormSubmit = useSignal<LoginForm>({submitResult: null, isWaiting: false });
    useContextProvider(LOGIN_FORM_CTX, loginFormSubmit); 
    const {loginFormCtx} = useLoginFormCtx();

    const {toggleModalQRL : toggle2ndPinModalQRL} = useSecondPinModal();
    const onSubmitQRL = $(async () => {
        isWaiting.value = true; 
        loginFormCtx.value = {submitResult: null, isWaiting:true};

        const formData = new FormData(formEle.value);
        // SL - Remove Custom Validation as not fast enough for login 
       // const formData = await getFormStatusData();
        if(1==1){//formData.validation.status === "success"
        const controller = new AbortController();
        fetch("/login" , {
          signal: controller.signal,
          body: formData, //formData.data,
          method: "post",
        })
          .then((response) => response.json())
          .then(async (json) => {
            console.log('login', json)
            submitResult.value = json;
            loginFormCtx.value = {submitResult:  json, isWaiting: isWaiting.value};
            console.log(submitResult.value.type,'login2', loginFormSubmit.value)

            if (submitResult.value.type === "s") {
              if (submitResult.value.d?.setupPassword) {
                localStorage.setItem("force_reset_pwd", '1');
              } else {
                localStorage.removeItem("force_reset_pwd");
              }
              if(submitResult.value.action === "validate-pin"){
                await toggleModalQRL();
                await toggle2ndPinModalQRL(  "validate");
              }
              else if(submitResult.value.action === "setup-pin"){
                await toggleModalQRL();
                await toggle2ndPinModalQRL(  "setup");
              }
              else if(submitResult.value.redirectUrl){
                location.href = submitResult.value.redirectUrl;
              }
              else if (typeof window !== "undefined") {
                 window.location.reload();
              }
            }
          })
          .catch((error) => {
            //TODO
            console.error(error);
          })
          .finally(() => {
            isWaiting.value = false;
            loginFormCtx.value = {submitResult: submitResult.value, isWaiting: isWaiting.value};
            controller.abort(); // Abort the request
            // Clean up any other resources associated with the request
          });
        }
        else {
          isWaiting.value = false;
          loginFormCtx.value = {submitResult: null, isWaiting: isWaiting.value};
        }
       
      });
       
      return {formEle,form,setFieldQRL,submitResult,isWaiting,onSubmitQRL, rememberMeChkedValue};
  
}
export function useLoginModal() {
 

    const  {showLoginModal} = useSignals();

    const {toggleModalQRL} = useModal(showLoginModal);

    const { toggleModalQRL:_toggleForgotPwdQRL} = useForgotPwdModal();

  
    const { toggleModalQRL:_toggleRegisterQRL} =  useRegisterModal();
    const toggleForgotPwdQRL = $( async ()=>{

      await toggleModalQRL();
      await _toggleForgotPwdQRL();
    });

    const toggleRegisterQRL = $( async ()=>{

      await toggleModalQRL();
      await _toggleRegisterQRL();
    });
    return {showLoginModal ,toggleModalQRL ,toggleForgotPwdQRL ,toggleRegisterQRL };
}

