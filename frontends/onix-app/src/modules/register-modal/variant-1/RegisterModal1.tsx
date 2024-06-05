import { $, component$, useStylesScoped$, useTask$ } from "@builder.io/qwik";
import { isServer } from "@builder.io/qwik/build";
import styles from "./RegisterModal1.scss?inline";
import FormInput from "../../../components/form-input/variant-1/FormInput1";
import { useRegister } from "../../../hooks/business/useRegisterModal";
import Modal from "../../../components/modal/variant-1/Modal1";
import SubmitBtn from "../../../components/button/variant-1/Button1";
import AlertMsg from "../../../components/alert-msg/variant-1/AlertMsg1";
import { emailPattern ,userNamePattern ,  remoteChkUserNameQRL,remoteChkEmailQRL,remoteChkMobileNoQRL ,  mobileNoPattern } from "~/utils/validation";

import CancelBtn from "~/components/button/variant-2/Button2";
import ArrowRight2Icon from "~/components/icons/ArrowRight2";
import {RefreshIcon} from "~/components/icons/Refresh";
import {
  inlineTranslate,  
} from 'qwik-speak';
import { useLoginModal } from "~/hooks/business/useLoginModal";
import RegisterWallet from "~/modules/register-wallet/variant-1/RegisterWallet1";
/*remove this if CMP does not have props*/
type Props = {
  websiteTitle?: string;
  pwdRegex?: string;
  emailSubscribe?: string;
};
export default component$((props: Props) => {
  useStylesScoped$(styles);
  const t = inlineTranslate();
  const {
    showRegModal,
    toggleModalQRL,
    onSubmitQRL,
    captchaImg, 
    result,
    onRefreshCaptchaQRL,
    isWaiting, 
    setFieldQRL ,
    checkEqualQRL,
    validatedForm,
    refCode,
    onRefreshFormQRL,
    formSettings,
    rememberMeChkedValue,
    onRegisterWalletInitQRL,
    formStep,
    changeFormStepQRL
  } = useRegister();
 
  const { toggleModalQRL: toggleLoginQRL } = useLoginModal();

  
  useTask$(  ({ track }) => {
      if (isServer) {
        return; // Server guard
      }
      track(() => showRegModal.value);
      console.log("showRegModal.value", showRegModal.value);
      if (showRegModal.value) {
          onRefreshCaptchaQRL();
         onRefreshFormQRL();
      }
      console.log("pwdRegex",props.pwdRegex);
    },
    { eagerness: "visible" }
  );

  return (
    <>
      {showRegModal.value && (
        <Modal
          title={ 
          t('app.SignUpTo@@Sign Up to {{websiteTitle}}',{websiteTitle : props.websiteTitle})
        }
          toggleModal$={toggleModalQRL}
          isCloseOnClickOutside={false}
          maxWidth="max-w-md"
          modalContainerClass="p-2 text-left"
          modalContainerStyle="min-width:370px"
        >
          <div class="w-full" style="display:table">
            <div
              class={`max-xl:mt-2 mt-2  ${formStep.current == 2 || formStep.last == 1 ? " duration-500 delay-100 transition ease-in-out  h-auto " : "h-0  opacity-0 overflow-hidden translate-y-6"}`}
              style={formStep.current == 2 || formStep.last == 1 ? "display:table-row-group;" : ""}
            >
              {formSettings.value?.is_register_need_acc && <>
                <h3 class="font-bold text-lg">{t('app.Banking Info@@Banking Info')}</h3> 
                <RegisterWallet
                  formInputClass ="input--sm"
                  providerFieldName={"bank_name"}
                  isUseFieldsOnly={true}
                  onInit$={onRegisterWalletInitQRL}
                  accNoMinLength={formSettings.value?.acc_no_length}
                  rw={{new_fund_banks_list: formSettings.value.fund_methods,agent_banks: formSettings.value?.banks, fullName : "", has_ewallet : false,is_user_allow_bank:formSettings.value?.is_register_need_bank,
                    is_user_allow_e_wallet : formSettings.value?.is_register_need_e_wallet
                }} ></RegisterWallet>
              </>
              }
            </div> 
            <form 
               
              method="POST"
              preventdefault:submit
            
              noValidate
              style={formStep.current == 2 ? "" : "display: table-header-group;"}
            >
              <div
                class={formStep.current == 1 || formStep.last == 1 ? " duration-500 delay-100 transition ease-in-out  h-auto " : "h-0  opacity-0 translate-y-6"}
              >

              {/* <input type="hidden" name="register_token" value={formToken.value}></input> */}
              <div class="mb-6">
                <label for="rg-uname" class="block pb-2">
                {t('app.Username@@Username')}*
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
                    value: "",
                    infoMsg: formSettings.value?.username_requirement.message, 
                    infoMsgStyle: "width:100%",
                    rules :{
                      required :  {rule : true },
                      pattern :  {rule : userNamePattern },
                      minLength :{
                        rule : 6, 
                      }, 
                      remote :  {rule :  remoteChkUserNameQRL },
                    },
                     setField$ : setFieldQRL, 
                    form : validatedForm,
                    class:"input--sm",
                  }}
                  id="rg-uname"  
                ></FormInput>
              </div>
              <div class="mb-6">
                <label for="reg-pwd" class="block pb-2">
                {t('app.Password@@Password')}*
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
                      infoMsg: formSettings.value?.pwd_requirement.message, 
                      infoMsgStyle: "width:100%",
                      rules :{
                        required :  {rule : true },
                       pattern :  {rule :  props.pwdRegex ,message : formSettings.value?.pwd_requirement.message},
                        minLength :{
                          rule : 8, 
                        }, 
                        // remote :{
                        //   rule : $(async ()=>{
                        //    return await  checkEqualQRL("password", "password_confirm")
                        //   }),
                        //   message :   t('app.ConfirmPwdNotSame@@Confirm Password is not the same as password') 
                        // } 
                      },
                       setField$ : setFieldQRL,
                        form : validatedForm,
                        class:"input--sm",
                    },
                  }}
                  id="reg-pwd" 
                ></FormInput>
              </div>

              <div class="mb-6">
                <label for="reg-cf-pwd" class="block pb-2">
                     {t('app.Confirm Password@@Confirm Password')}*
                </label>
                <FormInput
                // when password updated this field will reinit , validation status will be null, and value will go back to initial value 
                  key={validatedForm.password?.value||"empty"}
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
                          message :  t('app.ConfirmPwdNotSame@@Confirm Password is not the same as password') 
                        } 
                      },
                       setField$ : setFieldQRL,
                       form : validatedForm,
                       class:"input--sm",
                    },
                  }}
                  id="reg-cf-pwd"
                ></FormInput>
              </div>

              <div class="mb-6">
                <label for="reg-email" class="block pb-2">
                     {t('app.Email Address@@Email Address')}* 
                </label>
                <FormInput
                  {...{
                    ...{
                      type: "email",
                      placeholder: "",
                      required: true,
                      disabled: false,
                      readonly: false,
                      maxLength: 100,
                      rules :{
                        required :  {rule : true }, 
                        pattern :  {rule : emailPattern, message: t('app.Email is not valid@@Email is not valid') }, 
                         remote :{
                          rule : remoteChkEmailQRL, 
                        } 
                      },
                      name: "email",
                       setField$ : setFieldQRL,
                      form : validatedForm,
                      class:"input--sm",
                    },
                  }}
                  id="reg-email"
                ></FormInput>
                   { props.emailSubscribe == "1" &&
                <div class="mt-1 flex">
                  <input type="checkbox" class="mr-2 cursor-pointer" id="subscribe" name="subscribe"
                    onChange$={(e) => validatedForm[e.target.name] = { status: null, value: e.target.checked ? 1 : 0 }} />
                  <label for="subscribe" class="inline-block text-xs  cursor-pointer align-text-top">
                  {t('app.mailingListSubscribeQues@@Would you like to subscribe to mailing list?')}     
                  </label>
                </div>
              }
              </div>
           
              <div class="mb-6">
                <label for="reg-mobile" class="block pb-2">
                     {t('app.Phone Number@@Phone Number')}* 
                </label>
                <FormInput
                  {...{
                    ...{
                      type: "tel",
                      placeholder: "",
                      required: true,
                      disabled: false,
                      readonly: false,
                      maxLength: 20,
                      rules :{
                        required :  {rule : true }, 
                        pattern :  {rule : mobileNoPattern },
                        maxLength :   {rule : 20 }, 
                         remote :{
                          rule : remoteChkMobileNoQRL, 
                        } 
                      },
                      name: "mobile_no",
                      setField$: setFieldQRL,
                      form : validatedForm,
                      class:"input--sm",
                    },
                  }}
                  id="reg-mobile"
                ></FormInput>
              </div>
              <div class="mb-6">
                <label for="reg-refcode" class="block pb-2">
                     {t('app.ReferralCode@@Referral / Affiliate Code')} 
                </label>
                <FormInput
                  {...{
                    ...{
                      type: "text",
                      placeholder: "",
                      required: false,
                      disabled: false,
                      readonly: false,
                      maxLength: 50,
                      name: "ref_code",
                      setField$: setFieldQRL,
                      form: validatedForm,
                      value: refCode.value,
                      class:"input--sm",
                    },
                  }}
                  id="reg-refcode"
                ></FormInput>
              </div>
              </div>

              <div class="mb-6">
                <label for="reg-captcha" class="block pb-2">
                     {t('app.Captcha@@Captcha')}* 
                </label>
                <div class="flex-center gap-1">
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
                          name: "captcha",
                          rules :{
                            required :  {rule : true }, 
                            minLength : {
                              rule : 4
                            }
                          },
                          setField$: setFieldQRL,
                          form : validatedForm,
                          class:"input--sm",
                        },
                      }}
                      id="reg-captcha"
                    ></FormInput>
                  </div>
                
                  <button type="button" onClick$={onRefreshCaptchaQRL}>
                    <img src={captchaImg.value} height="50" width="120" />
                  </button>
                  <button type="button" class="text-xl" onClick$={onRefreshCaptchaQRL}>
                      <RefreshIcon></RefreshIcon>
                  </button>
                </div>
                <div class="mt-1"> 
                  <input type="checkbox" class="mr-2 cursor-pointer" id="reg-remember_me" name="remember_me" checked value={rememberMeChkedValue}
                    onChange$={(e) => validatedForm[e.target.name] = { status: null, value: e.target.checked ? rememberMeChkedValue:  null}} />
                  <label for="reg-remember_me" class="inline-block text-xs cursor-pointer align-text-top">
                  {t('app.Remember Me@@Remember Me')}   
                  </label>
                                
             </div>
              </div>
              
             
             
            </form>
          

            <>

            <div class="flex justify-end items-center gap-2 flex-wrap">
                <p class="w-full md:w-auto text-right font-medium">  {t('app.AlreadyMemberQues@@Already a member?')} </p>
                <button type="button" class="text-[var(--text-brand)] font-medium" onClick$={async()=>{
                  //close register modal
                  await toggleModalQRL();

                  //open login modal
                  await toggleLoginQRL();
                }}>
                     {t('app.Sign In@@Sign In')} 

                </button> 
              </div>
           
       <div class="mt-2 text-center flex-center gap-4 relative z-10">
          {formStep.last >1 && formStep.current>1 && 
            <>   <CancelBtn  type="button" onClick$={$(async()=>{await changeFormStepQRL(-1)})} text={t("app.Back@@Back")} ></CancelBtn></>}
          <SubmitBtn
            icon={ArrowRight2Icon} 
                  type={"button"}
                  text={formStep.submitBtnText}
                  isWaiting={isWaiting}
                  onClick$={onSubmitQRL}
                ></SubmitBtn>
        </div>
           
              <div class="mt-3">
                <AlertMsg
               message={result}
                ></AlertMsg>
              </div>
            </>
          </div>
        </Modal>
      )}
    </>
  );
});
