import { useContextProvider ,useContext , useSignal,   type Signal,$, useStore, useTask$  } from '@builder.io/qwik'; 
import { SHOW_GAMES_TRANS_MENU,   } from '../context';
import { useGetBalance, useGetGameBalance } from '../utils/useGetBalance';
import CustomError from '~/utils/customError';
import { useAlertDialog } from '../app/useInteract';
import { INTERACT_MSG_TYPE } from '~/services/types';
import { useClickOutside } from '../utils/useClickOutside';
import { useCommonViewData } from '../app/useCommonViewData';
import { checkIsHkbGame, isGameTransferWallet } from '~/utils/sysUtils'; 

export function useGamesTransferMenu() {
    const  {showMenu} = useSignals();

    const toggleGamesTransMenu = $((isShow?:boolean)=>{

        if(isShow !==undefined){
            showMenu.value = isShow;
        }
        else {
            showMenu.value =!showMenu.value;
        }
        
    })

   
  
 return {toggleGamesTransMenu,showMenu,  };
}
export const useSignals = ( )=>{

    const showMenu    = useContext<Signal<boolean>>(SHOW_GAMES_TRANS_MENU); 

    return {showMenu};
}

export const useGamesTransferCtx  = ( )=>{
    const showMenu = useSignal<boolean>(false);
  
     useContextProvider(SHOW_GAMES_TRANS_MENU, showMenu);

     return {showMenu} 
}

export function useGamesTransfer() {
    const   {toggleGamesTransMenu,showMenu}= useGamesTransferMenu() ;
    const  ref = useSignal<HTMLElement>(); 
    const {  currentBalance, actionGetBal, currentRefBalance, actionGetRefBal } = useGetBalance();
    const {  hkbBalance, actionGameCode } = useGetGameBalance();
    useTask$(async ({ track }) => {
        track(() => showMenu.value);
      
        if(showMenu.value ){ 
          actionGetBal.value= true;
          actionGetRefBal.value= true;
        }  

        actionGameCode.value
      });
   
     useClickOutside(ref ,  $(async ()=>{
       await toggleGamesTransMenu(false);
     }));
      const refreshGameBal = $((gameCode : string)=>{
       
        actionGameCode.value = gameCode;
        console.log('hkbbal refresh',actionGameCode.value , gameCode)
      })
      const {openDialogQRL} = useAlertDialog();
      
    const onTransferFrGame = $(async (gameCode : string)=>{
       
      

        if(gameCode  ){

            actionGetBal.value = true;
            actionGetRefBal.value= true;

            const transferAmt  = await currentBalance.value ;
 
            console.log('currentBalance', transferAmt );
            let postUrl = "";
            let postData = {}; 
            if(checkIsHkbGame(gameCode)){
                postUrl = "/transferToHkb/";
                postData = {
                amt : transferAmt, 
                };
       
            }

            if(postUrl){
                
                    const resp = await fetch(postUrl, { 
                        body: JSON.stringify(postData)  ,
                        method: "post", 
                        headers :  { 
                            "Content-Type" : "application/json",
                          }
                    });
                    
                        const result = await resp.json();

                        if(result.type == "s"){
                            actionGetBal.value = true; 
                            actionGetRefBal.value = true;
                            actionGameCode.value=gameCode;  
                        }
                        

                    return   await  openDialogQRL({message:result.message, }, result.type)
                 
                   
            }
           
        }
        
      }) 
    

      const {hasHkbGame,hasTransferWalletGame} = useChkAgentHasTWGame();
 return {showMenu ,currentBalance ,  hkbBalance ,onTransferFrGame,actionGetBal,refreshGameBal , ref ,hasHkbGame,hasTransferWalletGame, currentRefBalance, actionGetRefBal};
}


export function useChkAgentHasTWGame(){
    const {commonData}= useCommonViewData();
 
    let hasHkbGame = false; 
    let hasTransferWalletGame= false;

    const hasAllFound =  ()=>{
        return hasHkbGame && hasTransferWalletGame;
    }
    for (const [category, providers] of Object.entries(commonData.games_data)) {
        
        providers.some((provider )=>{

            // if(checkIsHkbGame(provider.game_code, commonData.app_sub_skin)){
            //     //found has
            //     hasHkbGame= true;
 
            // }
            
            if(isGameTransferWallet(provider,commonData.tw_games )){
                //found has
                hasTransferWalletGame= true;
 
            }
            
            //use && to check all found then true will break loop
            return hasAllFound();
        })
   
       //use && to check all found   then true will break loop
        if( hasAllFound()){
            break;
        }
    }
 
     return {hasHkbGame , hasTransferWalletGame};
}