import {
  $,
  component$,
  useStylesScoped$,
  useTask$,
  useOn,
} from "@builder.io/qwik";
import styles from "./ForceResetPwdModal1.scss?inline";
import moduleStyles from "./ForceResetPwdModal1.module.scss";
import {
  useForceResetPwdModal,
  useForceResetPwd,
} from "~/hooks/business/useForceResetPwd";
import Modal from "~/components/modal/variant-1/Modal1";
import { isServer } from "@builder.io/qwik/build";
import { emailPattern } from "~/utils/validation";
import AlertMsg from "~/components/alert-msg/variant-1/AlertMsg1";
import FormInput from "~/components/form-input/variant-1/FormInput1";
import SubmitBtn from "~/components/button/variant-1/Button1";
import { useLocation } from "@builder.io/qwik-city";
import ArrowRight2Icon from "~/components/icons/ArrowRight2";
import { inlineTranslate } from "qwik-speak";
import { useCommonViewData } from "~/hooks/app/useCommonViewData";

type Props = {
  pwdRegex: string;
};

export default component$((props: Props) => {
  useStylesScoped$(styles);
  const t = inlineTranslate();
  const { commonData } = useCommonViewData();
  const { showForceResetPwdModal, toggleModalQRL } = useForceResetPwdModal();
  const {
    form,
    setFieldQRL,
    submitResult,
    isWaiting,
    onSubmitQRL,
    checkEqualQRL,
    onVisibleRunTask,
  } = useForceResetPwd(toggleModalQRL, commonData.isAuth);

  useOn(
    "qvisible",
    $(async () => {
      console.log("run on qvisible forceresetpwdmodal");
      await onVisibleRunTask();
    })
  );

  return (
    <>
      {showForceResetPwdModal.value && (
        <Modal
          title={t("app.Please Update Password@@Please Update Password")}
          toggleModal$={toggleModalQRL}
          maxWidth="max-w-md"
          class={`p-5 pb-3 modal leading-normal ${moduleStyles["forceResetPwdModal1"]}`}
          inlineStyle="min-width:370px"
        >
          <div>
            <div>{t("app.Your password is weak, we would strongly suggest to update your password now in order to protect your account. Make sure your password is :@@Your password is weak, we would strongly suggest to update your password now in order to protect your account. Make sure your password is :")}</div>
            <ul>
              <li>{t("app.Is Longer than 7 characters@@Is Longer than 7 characters")}</li>
              <li>{t("app.Does not match or significantly contains your username, e.g. not use 'username123'@@Does not match or significantly contains your username, e.g. not use 'username123'")}</li>
              <li>{t("app.Contains at least 1 alphabet , 1 number and 1 special character.@@Contains at least 1 alphabet , 1 number and 1 special character.")}</li>
            </ul>
            <form preventdefault:submit method="POST" onSubmit$={onSubmitQRL}>
              <div class="mb-6">
                <label for="fp-captcha" class="block pb-2">
                  {t("app.New@@New")} {t("app.Password@@Password")}
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
                      rules: {
                        required: { rule: true },
                        pattern: { rule: props.pwdRegex, message: t("app.Password does not match requirements@@Password does not match requirements") },
                        minLength: {
                          rule: 8,
                        },
                      },
                      setField$: setFieldQRL,
                      form: form,
                    },
                  }}
                  id="reg-pwd"
                ></FormInput>
              </div>

              <div class="mb-6">
                <label for="reg-cf-pwd" class="block pb-2">
                  {t("app.Confirm Password@@Confirm Password")}
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
                      name: "password_confirmation",
                      rules: {
                        required: { rule: true },
                        remote: {
                          rule: $(async () => {
                            return await checkEqualQRL(
                              "password_confirmation",
                              "password"
                            );
                          }),
                          message:
                            "Confirm Password is not the same as password",
                        },
                      },
                      setField$: setFieldQRL,
                      form: form,
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
                  text={t("app.Submit@@Submit")}
                ></SubmitBtn>
              </div>
            </form>

            <div class="mt-3">
              <AlertMsg message={submitResult}></AlertMsg>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
});
