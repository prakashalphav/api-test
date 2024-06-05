import { useContext ,useSignal, $,  type Signal  } from '@builder.io/qwik'; 
import {SHOW_PROMOTION_MODAL} from '../context';
import {createSignals as createPromoSignals, useModal} from "../utils/useModal";
import type{ Promo} from "~/services/types"
 
export const useSignals = ()=>{
    const showPromotionModal    = useContext<Signal<boolean>>(SHOW_PROMOTION_MODAL);
    return {showPromotionModal};
}

// export function usePromotionModal() {
//     const  {showPromotionModal} = useSignals();
//     const {toggleModalQRL} = useModal(showPromotionModal);
//     return {showPromotionModal , toggleModalQRL };
// }


// for promo detail popup 
export const init = () => {
    const selPromo = useSignal<Promo>();
    return { selPromo }
}
export const usePromotion = (selPromo: Signal<Promo | undefined>, list: Promo[]) => {
    const  {showPromotionModal} = useSignals();
    const {toggleModalQRL: togglePromotionMdQRL} = useModal(showPromotionModal);

    const onSelPromoQRL =  $((id : string)=>{

          const dataList = list.filter((promo: Promo) => {
            return promo.rowId == id;
          })

          if(dataList && dataList.length){
            selPromo.value = dataList[0];
          }
         togglePromotionMdQRL();
    });

    return {showPromotionModal , togglePromotionMdQRL , onSelPromoQRL};
}

export function usePromotionModal() {
    const  {showPromotionModal} = useSignals();
    const {toggleModalQRL: togglePromotionMdQRL} = useModal(showPromotionModal);
    return {showPromotionModal , togglePromotionMdQRL};

}
