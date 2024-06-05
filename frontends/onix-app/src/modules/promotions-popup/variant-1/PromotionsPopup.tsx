import { type Signal, component$, useStylesScoped$   } from "@builder.io/qwik";

import styles from "./PromotionsPopup.scss?inline";

// ?inline does not work. the css will go to global css file instead of injected in the page 
import moduleStyles from "./PromotionsPopup.module.scss";
import { usePromotionModal } from "~/hooks/business/usePromotionModal";
import Modal from "~/components/modal/variant-1/Modal1";
import {
  inlineTranslate,  
} from 'qwik-speak';
import type { Promo } from "~/services/types";
import LazyImage from "~/components/image/LazyImage";
type Props = {
  promo : Signal<Promo>
    // category: string;
};
export default component$((props: Props) => {
   
  useStylesScoped$(styles)
    const { showPromotionModal, togglePromotionMdQRL } = usePromotionModal();
 
    const t = inlineTranslate();
     
    
    return <>
 {showPromotionModal.value && (
        <Modal 
      
          title={props.promo.value.name} 
          toggleModal$={togglePromotionMdQRL} 
          modalContainerClass={`${moduleStyles['promo-modal']}` + ` p-2`} 
          closeBtnClass={`${moduleStyles['promo-modal-close']}`}   
          maxWidth="max-w-5xl"
        >
          <div   class="flex italic text-base">
            {props.promo.value.no_limit ?   t("events.Valid for unlimited time@@Valid for unlimited time")  : t("events.valid@@Valid from {{startDate}} till {{endDate}}"  , {startDate: props.promo.value.datefrom , endDate :props.promo.value.dateto  }) }
          </div>
          <div class="flex gap-5 mt-3">
            
            <LazyImage src={props.promo.value.image?? ''} class="w-full rounded-md"></LazyImage>
          </div>
          <div class="flex mt-6">
            <div class="text-sm md:text-base" dangerouslySetInnerHTML={ props.promo.value.description }></div>
          </div>
        </Modal>
      )}
    </>;
})