import { useContext , useSignal, type Signal ,$} from '@builder.io/qwik'; 
import {SHOW_SIDE_NAV, SHOW_PROFILE_POPUP, SHOW_TRANSACTION_POPUP, SHOW_WALLET_POPUP, SHOW_HELP_POPUP} from '../context'; 
import { useClickOutside } from '../utils/useClickOutside';
import { useHasModal } from '../app/useAppState';


function getSideNavSignal(){
    return  useContext<Signal<boolean>>(SHOW_SIDE_NAV);   
  
 }
 
export function useSideNav() {
 
    const showSideNav    = getSideNavSignal();

    const sideNav = useSignal<HTMLDivElement>();

    const  {toggleSideNavQRL}= useSideNavQRL(showSideNav);
    useClickOutside(sideNav, toggleSideNavQRL);
 return {showSideNav , sideNav,toggleSideNavQRL};
}
 
export const  useSideNavQRL= (showSideNav ? : Signal)=>{
    const {setHasModalQRL} = useHasModal();
    
    if(showSideNav === undefined)
    showSideNav    = getSideNavSignal();   
  const toggleSideNavQRL=   $(()=>{ 
          if(showSideNav) {
            showSideNav.value = !showSideNav.value;
            setHasModalQRL(showSideNav.value); 
          }
           
      });

  return {toggleSideNavQRL};
}

function getProfilePopupSignal(){
    return useContext<Signal<boolean>>(SHOW_PROFILE_POPUP);   
  
 }
 
export function useProfilePopup() {
    const showProfilePopup    = getProfilePopupSignal();   
  const profilePopup = useSignal<HTMLDivElement>();

  const  {toggleProfilePopupQRL}= useProfilePopupQRL(showProfilePopup);
  useClickOutside(profilePopup, toggleProfilePopupQRL);
 return {showProfilePopup,profilePopup,toggleProfilePopupQRL};
}
export const  useProfilePopupQRL= (showProfilePopup ? : Signal)=>{
    if(showProfilePopup === undefined)
      showProfilePopup    = getProfilePopupSignal();   
    const toggleProfilePopupQRL=   $(()=>{ 
            if(showProfilePopup)
            showProfilePopup.value = !showProfilePopup.value;
        });

    return {toggleProfilePopupQRL};
}


 function getTrxPopupSignal(){
    return useContext<Signal<boolean>>(SHOW_TRANSACTION_POPUP);
  
 }
 
export function useTransactionPopup() {
 
 const showTransactionPopup=    getTrxPopupSignal()  ;
 const  {toggleTrxPopupQRL}= useTrxPopupQRL(showTransactionPopup);
 const trxMenuPopup = useSignal<HTMLDivElement>();
 useClickOutside(trxMenuPopup, toggleTrxPopupQRL);
 return {showTransactionPopup ,trxMenuPopup};
}

export const  toggleTrxPopupQRL= $(()=>{
    const showTransactionPopup=    getTrxPopupSignal()  ;

    showTransactionPopup.value = !showTransactionPopup.value;
});

export const  useTrxPopupQRL= (showTransactionPopup ? : Signal)=>{
    if(showTransactionPopup === undefined)
    showTransactionPopup    = getTrxPopupSignal();   
    const toggleTrxPopupQRL=   $(()=>{ 
            if(showTransactionPopup)
            showTransactionPopup.value = !showTransactionPopup.value;
        });

    return {toggleTrxPopupQRL};
}

// wallet popup
function getWalletPopupSignal(){
    return useContext<Signal<boolean>>(SHOW_WALLET_POPUP);   
  
 }
export function useWalletPopup() {
    const showWalletPopup    = getWalletPopupSignal();   
  const walletPopup = useSignal<HTMLDivElement>();

  const  {toggleWalletPopupQRL}= useWalletPopupQRL(showWalletPopup);
  useClickOutside(walletPopup, toggleWalletPopupQRL);
 return {showWalletPopup,walletPopup,toggleWalletPopupQRL};
}
export const  useWalletPopupQRL= (toggleWalletPopup ? : Signal)=>{
    if(toggleWalletPopup === undefined)
    toggleWalletPopup    = getWalletPopupSignal();   

    const toggleWalletPopupQRL=   $(()=>{ 
            if(toggleWalletPopup)
            toggleWalletPopup.value = !toggleWalletPopup.value;
        });



    return {toggleWalletPopupQRL};
}

// help popup
function getHelpPopupSignal(){
    return useContext<Signal<boolean>>(SHOW_HELP_POPUP);   
  
 }
export function useHelpPopup() {
    const showHelpPopup    = getHelpPopupSignal();   
  const helpPopup = useSignal<HTMLDivElement>();

  const  {toggleHelpPopupQRL}= useHelpPopupQRL(showHelpPopup);
  useClickOutside(helpPopup, toggleHelpPopupQRL);
 return {showHelpPopup,helpPopup,toggleHelpPopupQRL};
}
export const  useHelpPopupQRL= (toggleHelpPopup ? : Signal)=>{
    if(toggleHelpPopup === undefined)
    toggleHelpPopup    = getHelpPopupSignal();   
    const toggleHelpPopupQRL=   $(()=>{ 
            if(toggleHelpPopup)
            toggleHelpPopup.value = !toggleHelpPopup.value;
        });

    return {toggleHelpPopupQRL};
}