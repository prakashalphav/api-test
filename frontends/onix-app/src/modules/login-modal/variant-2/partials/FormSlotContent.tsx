import {
  component$,
  useStylesScoped$,
} from "@builder.io/qwik";
import styles from "./FormSlotContent.scss?inline";
import { inlineTranslate } from "qwik-speak";
import SubmitBtn from "~/components/button/variant-1/Button1";
import { useLoginFormCtx, useLoginModal } from "~/hooks/business/useLoginModal";
import AlertMsg from "~/components/alert-msg/variant-1/AlertMsg1";

export default component$((props:Props) => {  
  useStylesScoped$(styles);
  const t = inlineTranslate();
  const { toggleForgotPwdQRL ,toggleRegisterQRL  } = useLoginModal();
  const {loginFormCtx} = useLoginFormCtx();

  return (
    <>
       <p class="text-center mt-4">
                  <button onClick$={toggleForgotPwdQRL} type="button" tabIndex={-1}>{t('app.Forgot Password@@Forgot Password')}</button>
                </p>

              <div class="flex-center mt-2 flex-wrap">
                  <SubmitBtn
                    class={'rounded-lg w-fit px-6 py-3 btnPrimary'}
                    isWaiting={loginFormCtx.value.isWaiting}
                    type={"submit"}
                    text={t('app.Login@@Login')} 
                  ></SubmitBtn>
                 </div>

                 <div class="divider my-5"></div>

              
              <div class="flex-center flex-col gap-2 gap-y-3 flex-wrap">
                {t('app.Not a member yet? Sign up now!@@Not a member yet? Sign up now!')}
                <button class="rounded-lg w-fit px-6 py-3 relative registerBtn" onClick$={toggleRegisterQRL}>{t('app.Register@@Register')}</button>
              </div>
              
        <div class="mt-3"> 
         <AlertMsg message={{value: loginFormCtx.value.submitResult}}></AlertMsg>
         </div>
    </>
  );
});
