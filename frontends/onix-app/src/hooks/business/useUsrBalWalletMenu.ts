import { useContextProvider ,useContext , useSignal, type Signal,$, useStore, useTask$  } from '@builder.io/qwik'; 
import { SHOW_USR_BAL_WALLET_MENU } from '../context';
import { useGetBalance, useGetGameBalance } from '../utils/useGetBalance';
import CustomError from '~/utils/customError';
import { useAlertDialog } from '../app/useInteract';
import { INTERACT_MSG_TYPE } from '~/services/types';
import { useClickOutside } from '../utils/useClickOutside';
export function useUsrBalWalletMenu() {
    const  {showMenu} = useSignals();

    const toggleWalletMenu = $((isShow?:boolean)=>{

        if(isShow !==undefined){
            showMenu.value = isShow;
        }
        else {
            showMenu.value =!showMenu.value;
        }
        
    })

    
 return {toggleWalletMenu, showMenu};
}
export const useSignals = ( )=>{

    const showMenu    = useContext<Signal<boolean>>(SHOW_USR_BAL_WALLET_MENU); 

    return {showMenu};
}

export const useUsrBalWalletCtx  = ( )=>{
    const showMenu = useSignal<boolean>(false);
  
     useContextProvider(SHOW_USR_BAL_WALLET_MENU, showMenu);

     return {showMenu} 
}

export function useUsrBalWallet() {
    const { toggleWalletMenu, showMenu } = useUsrBalWalletMenu();
    const  ref = useSignal<HTMLElement>();
     
    const {  currentBalance, actionGetBal } = useGetBalance();
    useTask$(async ({ track }) => {
        track(() => showMenu.value);
        if(showMenu.value ){ 
          actionGetBal.value = true;
        }  
        actionGetBal.value
    });
   
    useClickOutside(ref ,  $(async ()=>{
      await toggleWalletMenu(false);
    }));
    
    return {showMenu, currentBalance, actionGetBal, ref};
}