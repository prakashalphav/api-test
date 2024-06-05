import type { Signal } from "@builder.io/qwik";
import { Slot, component$, createContextId, useStylesScoped$ } from "@builder.io/qwik";

import styles from "./LoginForm1.scss?inline";
import FormInput from "../../../components/form-input/variant-1/FormInput1";
import { useLoginModal, useLogin } from "../../../hooks/business/useLoginModal";
 
import {
  inlineTranslate,  
} from 'qwik-speak';
import type { LoginForm } from "~/services/types";
 
// import { globalAction$, Form, zod$, z } from "@builder.io/qwik-city";

// export const useLoginAction = globalAction$(
//   (loginData, ev) => {

//     console.log('loginData',loginData)
//     const resp = login(ev, loginData); 
//     return resp;
//   },
//   zod$({
//     user_name: z.string(),
//     password: z.string(),
//   })
// );

export const LOGIN_FORM_CTX = createContextId<Signal<LoginForm>>(
  'login'
); 
type Props = {
  websiteTitle?:string;
};

export default component$((props:Props) => {
  useStylesScoped$(styles);
  const t = inlineTranslate();
  const { toggleModalQRL  } = useLoginModal();

  // const action = useLoginAction();
  const {formEle,form,setFieldQRL,submitResult,onSubmitQRL,rememberMeChkedValue} =useLogin(toggleModalQRL);

  return (
    <>
         <form ref={formEle} preventdefault:submit method="POST" onSubmit$={onSubmitQRL}>
              <div class="mb-6">
                <label for="login-uname" class="block pb-2">
                     {t('app.Username@@Username')} 
                </label>
                <FormInput
                  {...{
                    type: "text",
                    placeholder: "",
                    required: true,
                    disabled: false,
                    readonly: false,
                    maxLength: 50,
                    name: "user_name", 
                    setField$:setFieldQRL, 
                    form:form,
                  }}
                  id="login-uname"
                ></FormInput>
              </div>
              <div class="mb-6">
                <label for="login-pwd" class="block pb-2">
                    {t('app.Password@@Password')} 
                </label>
                <FormInput
                  {...{
                    ...{
                      type: "password",
                      placeholder: "",
                      required: true,
                      disabled: false,
                      readonly: false,
                      maxLength: 100,
                      name: "password",
                      setField$:setFieldQRL, 
                      form:form,
                    },
                  }}
                  id="login-pwd"
                ></FormInput>
                 <div class="mt-1"> 
                  <input type="checkbox" checked class="mr-2 cursor-pointer" id="login-remember_me" name="remember_me" value={rememberMeChkedValue}
                    onChange$={(e) => form[e.target.name] = { status: null, value: e.target.checked ? rememberMeChkedValue:  null}} />
                  <label for="login-remember_me" class="inline-block text-xs cursor-pointer align-text-top">
                  {t('app.Remember Me@@Remember Me')}   
                  </label>
                                
                 </div>
      
              </div>
               
              <Slot></Slot>
         </form>
      
    </>
  );
});
