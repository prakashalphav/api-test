import { useContextProvider , useContext , useSignal,   type Signal,$,  useTask$,  } from '@builder.io/qwik'; 

import { useModal} from "../utils/useModal";
import { SHOW_TRANS_WALLET_MODAL, TRANS_WALLET_CTX } from '../context';

import { type TransferWalletCtx} from '~/services/types';

import type { ApiData } from "~/services/types";


import {  useGetBalance ,useGetGameBalance} from "~/hooks/utils/useGetBalance";
import CustomError from '~/utils/customError';
import {  checkIsHkbGame } from '~/utils/sysUtils';  


export const useSignals = ( )=>{

    const showModal    = useContext<Signal<boolean>>(SHOW_TRANS_WALLET_MODAL);
    const transWalletCtx  =useContext<Signal<TransferWalletCtx|null|undefined>>(TRANS_WALLET_CTX);

    return {showModal , transWalletCtx};
}
export const useTransWalletCtx  = ( )=>{
    const showTransWalletModal = useSignal<boolean>(false);
     const transferWalletCtx = useSignal<TransferWalletCtx|null|undefined>();
     useContextProvider(TRANS_WALLET_CTX, transferWalletCtx);
     useContextProvider(SHOW_TRANS_WALLET_MODAL, showTransWalletModal);

     return {showTransWalletModal ,transferWalletCtx} 
}
export function useTransferWallet(){
    
    const confirmResult= useSignal<ApiData<any>>({d : null});  
    const transferAmt = useSignal<number>(0);
    const {actionGetBal, currentBalance,  } = useGetBalance();
    const {balanceGameCode, hkbBalance, gameBalance } = useGetGameBalance();
    const {showTransWalletModal ,toggleModalQRL  ,transWalletCtx} = useTransferWalletModal();

    useTask$(async ({ track }) => {
        track(() => transWalletCtx.value);
        console.log('useTask transWalletCtx',transWalletCtx.value)


        //  Clear previous value / Reinit
        confirmResult.value ={d : null};
        transferAmt.value = 0 ;
        
        if(transWalletCtx.value &&transWalletCtx.value.gameCode){ 
           balanceGameCode.value= transWalletCtx.value.gameCode;  
           
            actionGetBal.value=true;
        }
        else {
            actionGetBal.value=false;
        }

        
      });

      const onInputSliderQRL = $((val:number)=>{
        transferAmt.value =val;
      }) 
      const onTransferToGame = $(async ()=>{

        if(transWalletCtx.value?.gameCode){
            let postUrl = "/transferToHkb/";
            let postData = {};
             
            if( checkIsHkbGame(transWalletCtx.value?.gameCode )){
                postUrl = "/transferToHkb/";
                postData = {
                transfer_amount : transferAmt.value, 
                };
       
            }
 
                const resp = await fetch(postUrl, { 
                    body: JSON.stringify(postData)  ,
                    method: "post", 
                    headers :  { 
                        "Content-Type" : "application/json",
                      }
                }); 
                confirmResult.value = await resp.json();
                if(transWalletCtx.value?.launchGame$){
                    await transWalletCtx.value?.launchGame$();
                } 
        }
        
      })
    return {showTransWalletModal ,toggleModalQRL  ,transWalletCtx ,hkbBalance, currentBalance ,confirmResult,onInputSliderQRL ,onTransferToGame,transferAmt,gameBalance} 
}
export function useTransferWalletModal(  ) {
 
 

    const  {showModal :showTransWalletModal,transWalletCtx} = useSignals();

    const {toggleModalQRL : _toggleModalQRL} = useModal(showTransWalletModal);
 
   
    const toggleModalQRL = $(async (ctx:TransferWalletCtx|null|undefined )=>{
        transWalletCtx.value  = ctx ; 
        console.log('games onClick toggle',ctx,showTransWalletModal.value )
    
        await _toggleModalQRL();
        if(showTransWalletModal.value){
            transWalletCtx.value  = ctx ; 
        }
        else {
            transWalletCtx.value  =  null;
        }
    });
     

    return {showTransWalletModal ,toggleModalQRL  ,transWalletCtx};
}