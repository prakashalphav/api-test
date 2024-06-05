import { component$, useStylesScoped$ } from "@builder.io/qwik";

import styles from "./LoginModal2.scss?inline";

import moduleStyles from "./LoginModal2.module.scss";

import { useLoginModal } from "../../../hooks/business/useLoginModal";
import Modal from "../../../components/modal/variant-1/Modal1";
import {
  inlineTranslate,  
} from 'qwik-speak';
import LoginForm from "~/modules/login-form/variant-1/LoginForm1";
import FormSlotContent from "./partials/FormSlotContent";


type Props = {
  websiteTitle?:string;
};
export default component$((props:Props) => {  
  useStylesScoped$(styles);
  const t = inlineTranslate();
  const { showLoginModal, toggleModalQRL  } = useLoginModal();

  return (
    <>
      {showLoginModal.value && (
        <Modal titlePosittion={'center'} title= {t('app.Login@@Login')}   toggleModal$={toggleModalQRL}   isCloseOnClickOutside={false} maxWidth="max-w-md" modalContainerClass={`p-2 text-left`}  >
        
            <LoginForm>
              <FormSlotContent></FormSlotContent>
            </LoginForm>
        
        </Modal>
      )}
    </>
  );
});
