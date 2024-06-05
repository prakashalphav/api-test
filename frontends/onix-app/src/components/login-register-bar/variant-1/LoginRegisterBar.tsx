import {
  component$,
  useStylesScoped$,
} from "@builder.io/qwik";
import styles from "./LoginRegisterBar.scss?inline";
import { inlineTranslate } from "qwik-speak";
import { useLoginModal } from "~/hooks/business/useLoginModal";
import { useRegisterModal } from "~/hooks/business/useRegisterModal";

export default component$(() => {
  useStylesScoped$(styles);
  const t = inlineTranslate();
  const { toggleModalQRL: toggleLoginQRL } = useLoginModal();
  const { toggleModalQRL: toggleRegQRL } = useRegisterModal();

  return (
    <>
      <div class="grid grid-cols-2 text-center">
        <button class="loginBtn py-1.5 rounded-l font-medium leading-normal" onClick$={toggleLoginQRL}>
          {t('app.Login@@Login').toUpperCase()}
        </button>
        <button class="registerBtn py-1.5 rounded-r font-medium leading-normal" onClick$={toggleRegQRL}>
          {t('app.Register@@Register').toUpperCase()}
        </button>
      </div>
    </>
  );
});
