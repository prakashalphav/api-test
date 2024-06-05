import {  useContextProvider,   useSignal ,useStore ,useContext, type Signal, $ } from "@builder.io/qwik";
    
import {createSignals as createPopupBannerSignals } from '../business/usePopupBanner';
import { NOTIFICATION_CTX, APP_HAS_MODAL, SHOW_SIDE_NAV, SHOW_LOGIN_MODAL,SHOW_REGISTER_MODAL, SHOW_COMPLAINT_MODAL, SHOW_PROFILE_POPUP, SHOW_PROMOTION_MODAL, SHOW_TRANSACTION_POPUP, SHOW_BONUS_HISTORY_MODAL, SHOW_POPUP_BANNER,SHOW_FORGOT_PWD_MODAL,SHOW_RESET_PWD_MODAL, SHOW_SECOND_PIN_MODAL, SECOND_PIN_MODAL_CTX, TRANS_WALLET_CTX, SHOW_TRANS_WALLET_MODAL, SHOW_HELP_POPUP, SHOW_WALLET_POPUP, SHOW_FORCE_RESET_PWD_MODAL} from  '../context';

import {createSignals as createForgotPwdSignals } from '../business/useForgotPwd';
import {createSignals as createResetPwdSignals } from '../business/useResetPwd';
import {createSignals as createModalSignals } from "../utils/useModal";
import type { MultipleAuthAction, SecondPinContext ,NotificationCtx,   } from "~/services/types";
import { useGamesTransferCtx } from "../business/useGamesTransferMenu";
import { useTransactionCtx } from "../business/useTransactionMenu";
import { useUsrBalWalletCtx } from "../business/useUsrBalWalletMenu";
import { useTransWalletCtx } from "../business/useTransferWallet";
import { useLangMenuCtx } from "../business/useLangMenu";

export const useCreateAppState= ()=>{
    const appHasModal = useSignal(false);
    const showSideNav = useSignal(false);
    const showProfilePopup = useSignal(false);
    const showWalletPopup = useSignal(false);
    const showHelpPopup = useSignal(false);
    const showTransactionPopup = useSignal(false);
    const showBonusHistoryModal = useSignal(false);//why is this here?? should be in home page only, this place is for those that will show in every page 
    const  {showModal : showLoginModal }=  createModalSignals();
    const  {showModal : showRegisterModal }=    createModalSignals();
    const  {showModal : showComplaintModal }=    createModalSignals();

    const  {showModal : showForgotPwdModal }=  createModalSignals();
    const  {showModal : showResetPwdModal }=  createModalSignals();  
    const  {showModal : showForceResetPwdModal }=  createModalSignals();  
    const  {showModal : showSecondPinModal }= createModalSignals();
    const  {showModal : showPromotionModal }=  createModalSignals();//why is this here?? should be in home page only, this place is for those that will show in every page 
    const  {showModal : showPopupBanner }=  createPopupBannerSignals(); //why is this here?? should be in home page only, this place is for those that will show in every page 

    const secondPinCtx = useSignal<SecondPinContext>({action: "validate", forLogin:true});
    useContextProvider(SHOW_LOGIN_MODAL, showLoginModal); 
    useContextProvider(SHOW_REGISTER_MODAL, showRegisterModal); 
    useContextProvider(SHOW_COMPLAINT_MODAL, showComplaintModal); 
    useContextProvider(SHOW_SIDE_NAV, showSideNav); 
     useContextProvider(APP_HAS_MODAL, appHasModal);
     useContextProvider(SHOW_PROFILE_POPUP, showProfilePopup);
    useContextProvider(SHOW_FORGOT_PWD_MODAL, showForgotPwdModal);
    useContextProvider(SHOW_RESET_PWD_MODAL, showResetPwdModal); 
    useContextProvider(SHOW_FORCE_RESET_PWD_MODAL, showForceResetPwdModal); 
    useContextProvider(SHOW_SECOND_PIN_MODAL, showSecondPinModal);
    useContextProvider(SECOND_PIN_MODAL_CTX, secondPinCtx);
    useContextProvider(SHOW_WALLET_POPUP, showWalletPopup);
    useContextProvider(SHOW_HELP_POPUP, showHelpPopup);

     useContextProvider(SHOW_PROMOTION_MODAL, showPromotionModal); //why is this here?? should be in promotion page only, this place is for those that will show in every page 
     useContextProvider(SHOW_TRANSACTION_POPUP, showTransactionPopup);
     useContextProvider(SHOW_BONUS_HISTORY_MODAL, showBonusHistoryModal);//why is this here?? should be in bonus page only, this place is for those that will show in every page 
     useContextProvider(SHOW_POPUP_BANNER, showPopupBanner);//why is this here?? should be in home page only, this place is for those that will show in every page 
     
     const notificationCtx = useStore<NotificationCtx>({inboxCnt : 0 } );
     useContextProvider(NOTIFICATION_CTX, notificationCtx);

     const {showMenu : showGamesTransMenu} = useGamesTransferCtx();
     const {showMenu : showTransMenu} = useTransactionCtx();
     const {showMenu : showUsrBalWalletMenu} = useUsrBalWalletCtx();

     const {showTransWalletModal ,transferWalletCtx} = useTransWalletCtx();

     const {showLangMenu} = useLangMenuCtx( );
     
      return {showModal : showLoginModal ,appHasModal , };
}

export const useShowSideNav= ()=>{

    const showSideNav    = useContext<Signal<boolean>>(SHOW_SIDE_NAV);


    return {showSideNav};

}

 
export const useHasModal= ()=>{

    const hasModal    = useContext<Signal<boolean>>(APP_HAS_MODAL);

    const setHasModalQRL=   $((value : boolean |undefined)=>{ 
        hasModal.value = value === undefined ? false : value;
        if (typeof document !== "undefined") {

            const htmlElement = document.querySelector('html');
            if(htmlElement){
                if (hasModal.value  ) {
                    htmlElement.classList.add("overflow-hidden");
                } else {
                    htmlElement.classList.remove("overflow-hidden");
                }
            } 
       }
        
    }); 
    
    return {hasModal, setHasModalQRL};

}

 

 