import { useContext , useSignal,   type Signal,$, useStore, useVisibleTask$, type QRL  } from '@builder.io/qwik'; 
import type { ApiData } from "~/services/types";
 
import {createSignals as createMSignals, useModal} from "../utils/useModal";
import type { Form} from '../utils/useForm';
import { useForm } from '../utils/useForm';
import { SHOW_RESET_PWD_MODAL } from '../context';
import { removeQueryParams } from '~/utils/common';

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

    const showResetPwdModal    = useContext<Signal<boolean>>(SHOW_RESET_PWD_MODAL);


    return {showResetPwdModal};
}

export const useResetPwd=( toggleModalQRL : QRL<()=>void>  )=>{
    const form =    useStore<Form>( { email :null , password :null, password_confirm:null, reset_token : {value :"", status : "required" , message :""}});

    const {setFieldQRL,getFormStatusData,   checkEqualQRL,} =  useForm(form); 
    const submitResult = useSignal<ApiData<null>>({ d: null });
    const isWaiting = useSignal<boolean>(false);
    const onSubmitQRL = $(async () => {
        isWaiting.value = true;
  
       
        const formData = await getFormStatusData();
        console.log("formData", formData.data)
        if(formData.validation.status === "success"){
        const controller = new AbortController();
        fetch("/submitResetPwd" , {
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
            console.error(error);
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


  const onVisibleRunTask = $(async ()=>{
    // Get the current URL
    const currentURL = window.location.href;
    // Create a URL object from the current URL
    const url = new URL(currentURL);

    // Get the value of the "token" query parameter
    const token = url.searchParams.get("token");
    const action = url.searchParams.get("action");
   
    if(token && form.reset_token && action == "reset-password"){
      form.reset_token.value = token; 
      form.reset_token.status = "success";
      await toggleModalQRL(); 
      removeQueryParams(["token", "action"]);
    }
  }) 
     
      return {form,setFieldQRL,submitResult,isWaiting,onSubmitQRL,checkEqualQRL, onVisibleRunTask };
  
}
export function useResetPwdModal() {
 

    const  {showResetPwdModal} = useSignals();

    const {toggleModalQRL} = useModal(showResetPwdModal);
 
   
     

    return {showResetPwdModal ,toggleModalQRL  };
}