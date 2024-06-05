import { component$, useStylesScoped$ } from "@builder.io/qwik";

import styles from "./LoginModal1.scss?inline";

import moduleStyles from "./LoginModal1.module.scss";

import FormInput from "../../../components/form-input/variant-1/FormInput1";

import { useLoginModal, useLogin } from "../../../hooks/business/useLoginModal";
import Modal from "../../../components/modal/variant-1/Modal1";

import LoginForm from "~/modules/login-form/variant-1/LoginForm1";
import {
  inlineTranslate,  
} from 'qwik-speak';
import FormSlotContent from "./partials/FormSlotContent";
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
type Props = {
  websiteTitle?:string;
};
export default component$((props:Props) => {
  useStylesScoped$(styles);
  const t = inlineTranslate();
  const { showLoginModal, toggleModalQRL ,toggleForgotPwdQRL ,toggleRegisterQRL  } = useLoginModal();
  // const action = useLoginAction();
 
  return (
    <>
      {showLoginModal.value && (
        <Modal id={"loginModal1"} title= {t('app._1@@Sign in to {{webTitle}}' ,{webTitle:props.websiteTitle} )}   toggleModal$={toggleModalQRL}   isCloseOnClickOutside={false} maxWidth="max-w-md" modalContainerClass={`${moduleStyles['loginModal1']} p-2 text-left `}  >
          <div class="loginModal1">
          <LoginForm>
              <FormSlotContent></FormSlotContent>
            </LoginForm>
             
          </div>
        </Modal>
      )}
    </>
  );
});
