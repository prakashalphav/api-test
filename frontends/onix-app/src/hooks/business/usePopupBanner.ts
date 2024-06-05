import { useContext ,useSignal, $,  type Signal  } from '@builder.io/qwik'; 
import {SHOW_POPUP_BANNER} from '../context';
import {createSignals as __createSignals  , useModal} from "../utils/useModal";
export type Props = {
    banner: string;
    url: string;
    popUpBannerLocation: "home"|"deposit";
};
export const createSignals = ()=>{
    /*This should be called at a global conltext*/
    //test - const showModal = useSignal<boolean>(true);
    const  {showModal  }= __createSignals(); 
    return {showModal };
}

export const useSignals = ()=>{
    const showPopupBanner    = useContext<Signal<boolean>>(SHOW_POPUP_BANNER);
    return {showPopupBanner};
}

export function usePopup(props : Props ,  ) {
    const  showPopupBanner = useSignal<boolean>(props.banner ? true : false);
    const {toggleModalQRL} = useModal(showPopupBanner);

    const togglePopupQRL= $(( )=>{
        toggleModalQRL(); 
        sessionStorage.setItem('isClosedPopUp' + props.popUpBannerLocation,'true');
    });

    const onVisibleRunTask =$(async ()=>{
         
        if( sessionStorage.getItem('isClosedPopUp'  + props.popUpBannerLocation) ===    "true"){
            // as server side ald determine wheter show the popupbanner, hence browser side to determine to close popupbanner if browser ald use before  
             await togglePopupQRL();
        }  
    })
    return {showPopupBanner , togglePopupQRL ,onVisibleRunTask};

}
