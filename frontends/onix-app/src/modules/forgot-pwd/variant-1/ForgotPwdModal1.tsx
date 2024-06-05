import { component$, useStylesScoped$, useTask$ } from "@builder.io/qwik";
import styles from "./ForgotPwdModal1.scss?inline";
import moduleStyles from "./ForgotPwdModal1.module.scss";
import FormInput from "~/components/form-input/variant-1/FormInput1";
import { isServer } from "@builder.io/qwik/build";
import { useForgotPwdModal, useForgotPwd } from "../../../hooks/business/useForgotPwd";
import Modal from "~/components/modal/variant-1/Modal1";
import SubmitBtn from "~/components/button/variant-1/Button1";
import AlertMsg from "~/components/alert-msg/variant-1/AlertMsg1";
import { emailPattern } from "~/utils/validation";
import ArrowRight2Icon from "~/components/icons/ArrowRight2";
import {
  inlineTranslate,  
} from 'qwik-speak';
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

  const { showForgotPwdModal, toggleModalQRL } = useForgotPwdModal();
  // const action = useLoginAction();

  const {form,setFieldQRL,submitResult,isWaiting,onSubmitQRL, onRefreshCaptchaQRL,  captchaImg, } =useForgotPwd();
  const t = inlineTranslate();


  useTask$(
    ({ track }) => {
      if (isServer) {
        return; // Server guard
      }
      track(() => showForgotPwdModal.value);
      console.log("showForgotPwdModal.value", showForgotPwdModal.value);
      if (showForgotPwdModal.value) {
        onRefreshCaptchaQRL();
        console.log("showForgotPwdModal.value", onRefreshCaptchaQRL);
      }
    },
    { eagerness: "visible" }
  );
  return (
    <>
      {showForgotPwdModal.value && (
        <Modal title= {t('app.Forgot Password@@Forgot Password')} toggleModal$={toggleModalQRL} maxWidth="max-w-md" class={`p-5 pb-3 modal ${moduleStyles['forgotPwdModal1']}`} inlineStyle="min-width:370px">
          <div>
            <form  preventdefault:submit method="POST" onSubmit$={onSubmitQRL}>
              <div class="mb-6">
                <label for="fp-email" class="block pb-2">
                    {t('app.Email@@Email')}
                </label>
                <FormInput
                  {...{
                    type: "text",
                    placeholder: "",
                    required: true,
                    disabled: false,
                    readonly: false,
                    maxLength: 100,
                    name: "email", 
                    rules :{
                      required :  {rule : true }, 
                      pattern :  {rule : emailPattern },  
                    },
                    setField$:setFieldQRL, 
                    form:form,
                  }}
                  id="fp-email"
                ></FormInput>
              </div>
              <div class="mb-6">
              <label for="fp-captcha" class="block pb-2">
                   {t('app.Captcha@@Captcha')}
                </label>
                <div class="flex-center">
                  <div class="min-w-0 flex-auto">
                    <FormInput
                      {...{
                        ...{
                          type: "number",
                          placeholder: "",
                          required: true,
                          disabled: false,
                          readonly: false,
                          maxLength: 4,
                          name: "forgotPwCaptchaimg",
                          rules :{
                            required :  {rule : true }, 
                            minLength : {
                              rule : 4
                            }
                          },
                          setField$: setFieldQRL,
                          form : form,
                        },
                      }}
                      id="fp-captcha"
                    ></FormInput>
                  </div>
                  <button type="button" onClick$={onRefreshCaptchaQRL}>
                    <img src={captchaImg.value} height="50" width="120"/>
                  </button>
                </div>
              </div>
              <div class="flex justify-end items-center gap-2 gap-y-3 flex-wrap">
               
                <SubmitBtn
            icon={ArrowRight2Icon} 
                 isWaiting={isWaiting}
                  type={"submit"}
                  text= {t('app.Submit@@Submit')}
                ></SubmitBtn>
              </div>
            </form>
        
                <div class="mt-3"> 
                <AlertMsg message ={submitResult}></AlertMsg>
                </div>
             
          </div>
        </Modal>
      )}
    </>
  );
});
