import { $, component$, useStylesScoped$, useTask$, useOn  } from "@builder.io/qwik";
import styles from "./ResetPwdModal1.scss?inline";
import moduleStyles from "./ResetPwdModal1.module.scss";
import { useResetPwdModal, useResetPwd } from "../../../hooks/business/useResetPwd";
import Modal from "~/components/modal/variant-1/Modal1";
import { isServer } from '@builder.io/qwik/build';
import { emailPattern  } from "~/utils/validation";
import AlertMsg from "~/components/alert-msg/variant-1/AlertMsg1";
import FormInput from "~/components/form-input/variant-1/FormInput1";
import SubmitBtn from "~/components/button/variant-1/Button1";
import { useLocation } from '@builder.io/qwik-city';
import ArrowRight2Icon from "~/components/icons/ArrowRight2";
import {
  inlineTranslate,  
} from 'qwik-speak';
type Props = {
  pwdRegex : string;
};
export default component$((props: Props) => {
    useStylesScoped$(styles);
    const t = inlineTranslate();
    const { showResetPwdModal, toggleModalQRL ,   } = useResetPwdModal();

    const {form,setFieldQRL,submitResult,isWaiting,onSubmitQRL,checkEqualQRL ,onVisibleRunTask} =useResetPwd( toggleModalQRL);
    
      useOn( "qvisible", $(async ( )=>{  
        console.log("run on qvisible resetpwdmodal" );
        await onVisibleRunTask();
       })) 
    return <>{showResetPwdModal.value && ( 
        <Modal title={t('app.Reset Password@@Reset Password')} toggleModal$={toggleModalQRL} maxWidth="max-w-md" modalContainerClass={`p-2 text-left ${moduleStyles['resetPwdModal1']}`}  >
        <div>
          <form  preventdefault:submit method="POST" onSubmit$={onSubmitQRL}>
            <div class="mb-6">
              <label for="rp-email" class="block pb-2">
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
                id="rp-email"
              ></FormInput>
            </div>
            <div class="mb-6">
            <label for="fp-captcha" class="block pb-2">
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
                      maxLength: 20,
                      name: "password", 
                      rules :{
                        required :  {rule : true },
                       pattern :  {rule :  props.pwdRegex},
                        minLength :{
                          rule : 8, 
                        }, 
                        remote :{
                          rule : $(async ()=>{
                           return await  checkEqualQRL("password", "password_confirm")
                          }),
                          message : "Confirm Password is not the same as password"
                        } 
                      },
                       setField$ : setFieldQRL,
                        form : form,
                    },
                  }}
                  id="reg-pwd" 
                ></FormInput>
            </div>

            <div class="mb-6">
                <label for="reg-cf-pwd" class="block pb-2">
                  {t('app.Confirm Password@@Confirm Password')}
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
                      name: "password_confirm",
                      rules :{
                        required :  {rule : true }, 
                        remote :{
                          rule : $(async ()=>{
                           return await  checkEqualQRL( "password_confirm","password")
                          }),
                          message : "Confirm Password is not the same as password"
                        } 
                      },
                       setField$ : setFieldQRL,
                       form : form,
                    },
                  }}
                  id="reg-cf-pwd"
                ></FormInput>
              </div>
            <div class="flex justify-end items-center gap-2 gap-y-3 flex-wrap">
             
              <SubmitBtn
            icon={ArrowRight2Icon} 
               isWaiting={isWaiting}
                type={"submit"}
                text={t('app.Submit@@Submit')}
              ></SubmitBtn>
            </div>
          </form>
      
              <div class="mt-3"> 
              <AlertMsg message ={submitResult}></AlertMsg>
              </div>
           
        </div>
      </Modal>
      )}
    </>;
})