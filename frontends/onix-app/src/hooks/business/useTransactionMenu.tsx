import { useContextProvider ,useContext , useSignal,   type Signal,$, useStore, useTask$  } from '@builder.io/qwik'; 
import { SHOW_TRANS_MENU,   } from '../context';
import { useClickOutside } from '../utils/useClickOutside';
export function useTransactionMenu() {
    const  {showMenu} = useSignals();

    const toggleTransMenu = $((isShow?:boolean)=>{

        if(isShow !==undefined){
            showMenu.value = isShow;
        }
        else {
            showMenu.value =!showMenu.value;
        }
        
    })

    
 return {toggleTransMenu,showMenu};
}
export const useSignals = ( )=>{

    const showMenu    = useContext<Signal<boolean>>(SHOW_TRANS_MENU); 

    return {showMenu};
}

export const useTransactionCtx  = ( )=>{
    const showMenu = useSignal<boolean>(false);
  
     useContextProvider(SHOW_TRANS_MENU, showMenu);

     return {showMenu} 
}

export function useTransaction() {
    const   {toggleTransMenu,showMenu}= useTransactionMenu() ;
    const  ref = useSignal<HTMLElement>();
     
    useTask$(async ({ track }) => {
        track(() => showMenu.value);
      });
   
     useClickOutside(ref ,  $(async ()=>{
       await toggleTransMenu(false);
     }));
    
 return {showMenu , ref};
}