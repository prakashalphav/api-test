import {
  component$,
  useStylesScoped$,
} from "@builder.io/qwik";
import styles from "./FormSlotContent.scss?inline";
import { inlineTranslate } from "qwik-speak"; 
import { useLoginFormCtx, useLoginModal } from "~/hooks/business/useLoginModal";
import AlertMsg from "~/components/alert-msg/variant-1/AlertMsg1";
import SubmitBtn from "~/components/button/variant-1/Button1"; 
import ArrowRight2Icon from "~/components/icons/ArrowRight2";
export default component$((props:Props) => {  
  useStylesScoped$(styles);
  const t = inlineTranslate();
  const { toggleForgotPwdQRL ,toggleRegisterQRL  } = useLoginModal();
  const {loginFormCtx} = useLoginFormCtx();

  return (
    <> 
        <div class="flex justify-end items-center gap-2 gap-y-3 flex-wrap">
              <p class="w-fulls text-right font-medium">
                  <button onClick$={toggleForgotPwdQRL} type="button" tabIndex={-1}>{t('app.Forgot Password@@Forgot Password')}?</button>
                </p>
                <p class="w-full md:w-auto text-right">{t('app.New to@@New to')} {props.websiteTitle}?</p>
                <button onClick$={toggleRegisterQRL} type="button" class="text-[var(--text-brand)] font-medium" tabIndex={-1}>{t('app.Sign Up@@Sign Up')} </button>
                <SubmitBtn
            icon={ArrowRight2Icon} 
                 isWaiting={loginFormCtx.value.isWaiting}
                  type={"submit"}
                  text={t('app.Sign In@@Sign In')} 
                ></SubmitBtn>
              </div>
               
              <div class="mt-3"> 
                <AlertMsg message={{value: loginFormCtx.value.submitResult}}></AlertMsg>
                </div>
    </>
  );
});
