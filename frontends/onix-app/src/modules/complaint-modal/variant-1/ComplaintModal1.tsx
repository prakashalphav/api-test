import { Resource, component$, useStylesScoped$, useTask$ , } from '@builder.io/qwik'; 
import styles from './ComplaintModal1.scss?inline';
import FormInput from "../../../components/form-input/variant-1/FormInput1";
import FormTextarea from "../../../components/form-textarea/variant-1/FormTextarea1";
import SubmitBtn from "../../../components/button/variant-1/Button1";
import { BackIcon } from '~/components/icons/Back';
import { isServer } from "@builder.io/qwik/build";
import { useComplaint } from '~/hooks/business/useComplaintForm';
import AlertMsg from "../../../components/alert-msg/variant-1/AlertMsg1";
import Modal from "../../../components/modal/variant-1/Modal1";
import ArrowRight2Icon from "~/components/icons/ArrowRight2";
import {
  inlineTranslate,  
} from 'qwik-speak';
export default component$(() => { 
  useStylesScoped$(styles);

  const t = inlineTranslate();

  const {
    onSubmitQRL,
    captchaImg, 
    result,
    onRefreshCaptchaQRL,
    isWaiting, 
    validatedForm,
    setFieldQRL ,
    showComplaintModal, 
    toggleModalQRL,
  } = useComplaint();

  useTask$(
    ({ track }) => {
      if (isServer) {
        return; // Server guard
      }
      track(() => showComplaintModal.value);
      console.log("showComplaintModal.value", showComplaintModal.value);
      if (showComplaintModal.value) {
        onRefreshCaptchaQRL();
        console.log("showComplaintModal.value", onRefreshCaptchaQRL);
      }
    },
    { eagerness: "visible" }
  );
  
  return ( 
    <> 
      {showComplaintModal.value && (
        <Modal
          title={"Customer Complaints"}
          toggleModal$={toggleModalQRL}
          maxWidth="max-w-md"
          class={`modal p-5 pb-3`}
          inlineStyle="min-width:370px"
        >
            <div class="complaint-container">
                  <form 
                    method="POST"
                    preventdefault:submit
                    onSubmit$={onSubmitQRL}
                    noValidate
                  >
                    <div class="mb-6">
                      * {t('app.You may use this to send complaints directly to the company that provides this platform instead of the operator running it.@@You may use this to send complaints directly to the company that provides this platform instead of the operator running it.')}
                    </div>
                    <div class="mb-6">
                      <label for="userame" class="block pb-2">
                         {t('app.Username@@Username')}

                      </label>
                      <FormInput
                        {...{
                          type: "text",
                          placeholder: "",
                          required: true,
                          disabled: false,
                          readonly: false,
                          maxLength: 20,
                          name: "user_name",
                          setField$ : setFieldQRL,
                          form : validatedForm,
                          value: "",
                          rules :{
                            required :  {rule : true },
                            minLength :{
                              rule : 6, 
                            }, 
                          },
                        }}
                        id="userame"  
                      ></FormInput>
                    </div>

                    <div class="mb-6">
                      <label for="email" class="block pb-2">
                          {t('app.Email Address@@Email Address')}
                      </label>
                      <FormInput
                        {...{
                          ...{
                            type: "email",
                            setField$ : setFieldQRL,
                            form : validatedForm,
                            placeholder: "",
                            required: true,
                            disabled: false,
                            readonly: false,
                            maxLength: 100,
                            rules :{
                              required :  {rule : true }, 
                            },
                            name: "email",
                          },
                        }}
                        id="reg-email"
                      ></FormInput>
                    </div>

                    <div class="mb-6">
                      <label for="subject" class="block pb-2">
                          {t('app.Subject@@Subject')}
                      </label>
                      <FormInput
                        {...{
                          type: "text",
                          placeholder: "",
                          required: true,
                          disabled: false,
                          readonly: false,
                          maxLength: 20,
                          name: "subject",
                          setField$ : setFieldQRL,
                          form : validatedForm,
                          value: "",
                          rules :{
                            required :  {rule : true },
                            minLength :{
                              rule : 6, 
                            }, 
                          },
                        }}
                        id="subject"  
                      ></FormInput>
                    </div>

                    <div class="mb-6">
                      <label for="message" class="block pb-2">
                          {t('app.Message@@Message')}
                      </label>
                      <FormTextarea
                        {...{
                          type: "text",
                          placeholder: "",
                          required: true,
                          disabled: false,
                          readonly: false,
                          maxLength: 200,
                          name: "message",
                          setField$ : setFieldQRL,
                          form : validatedForm,
                          value: "",
                          rules :{
                            required :  {rule : true },
                            minLength :{
                              rule : 6, 
                            }, 
                          },
                        }}
                        id="message"  
                      ></FormTextarea>
                    </div>

                    <div class="mb-6">
                      <label for="captcha" class="block pb-2">
                          {t('app.Captcha@@Captcha')}
                      </label>
                      <div class="flex-center">
                        <div class="min-w-0 flex-auto">
                          <FormInput
                            {...{
                              ...{
                                type: "text",
                                placeholder: "",
                                required: true,
                                disabled: false,
                                readonly: false,
                                maxLength: 4,
                                name: "captcha",
                                setField$: setFieldQRL,
                                form : validatedForm,
                                rules :{
                                  required :  {rule : true }, 
                                  minLength : {
                                    rule : 4
                                  }
                                },
                              },
                            }}
                            id="captcha"
                          ></FormInput>
                        </div>
                        <button type="button" onClick$={onRefreshCaptchaQRL}>
                          <img src={captchaImg.value} />
                        </button>
                      </div>
                    </div>

                    <div  class="absolute right-5">
                      <SubmitBtn
            icon={ArrowRight2Icon}  
                          type={"submit"}
                          text={ t('app.Send@@Send')}
                          isWaiting={isWaiting}
                        ></SubmitBtn>
                    </div>
                  </form>

                    <div class="mt-20">
                      <AlertMsg 
                      message={result}  
                      ></AlertMsg>
                      </div>
            </div>
        </Modal>
      )}
    </>  
  );
});
 