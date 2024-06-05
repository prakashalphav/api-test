import type {ResourceReturn } from "@builder.io/qwik";
import { useSignal,useTask$, type Signal, $, type PropFunction } from "@builder.io/qwik"; 
import type {  ApiData, TrxPromo ,ApplyPromoDetails} from "~/services/types";
import { enter, leave } from "../../utils/transitions";
import type { DepoFormData2 } from "./useDeposit";
import CustomError from "~/utils/customError";
import { isServer } from '@builder.io/qwik/build';
import   { useEventsUtils } from "./useEventsUtils";


export type Props = {
  selPromo: Signal<TrxPromo|null>;
  showPromoModal: Signal<boolean>;
onSelectPromo$: PropFunction<(item: TrxPromo) => void>;
  togglePromoMdQRL :PropFunction<() => void>;
  depositRes: ResourceReturn<DepoFormData2>;
};

export const useApplyPromoModal = (props: Props) => {
  const tempSelPromo = useSignal<TrxPromo|null>(props.selPromo.value);

  const selViewPromo = useSignal<TrxPromo|null>(null);
  const applyPromoResult = useSignal<ApiData<any>>({d:null});
  const isWaiting = useSignal<boolean>(false);
  const promoCodeInput = useSignal<HTMLInputElement>();
  const {mapPromoGivenTypeText} = useEventsUtils();
  useTask$(async ({ track }) => {
    track(() => props.showPromoModal.value);
    if (isServer) {
      return; // Server guard
    }

  
    console.log('applyPromo start')
    if(props.showPromoModal.value){

      // reset 
      tempSelPromo.value = null;
      applyPromoResult.value = {d:null};
    }
 
  });
 
  
  const onExitQRL = $(async ( ) => {
    tempSelPromo.value = null;
    await props.togglePromoMdQRL();
  });
  const onConfirmPromoQRL = $(async (isInputPCode :boolean = false) => {
    isWaiting.value = true;
    
    const postData ={select_name : null , is_promo_code: isInputPCode} ;
   
    if(isInputPCode === true && promoCodeInput.value){
      //user click at input and if promo code input has value 
      postData.select_name = promoCodeInput.value.value;
      console.log('applyPromo promoCodeInput', promoCodeInput.value, promoCodeInput.value.value)
    }
    else {
      // user click at promo list confirm 
      if(tempSelPromo.value) {   //if user selected an item from list 
        postData.select_name = tempSelPromo.value?.promo_code;
      }
      else {
        // user didn't select but user  promo code input has value
        postData.select_name = promoCodeInput.value.value; 
      } 

    }
    console.log( 'applyPromo postData.select_name  ',postData.select_name  ,tempSelPromo.value,isInputPCode);

    // if user did not select nor input
    if( !postData.select_name   ){
      isWaiting.value = false;
      //show alert message
      applyPromoResult.value = {d:null, title:"Info", message: "No promotion selected.", type : 'i'};
      // close modal 
      setTimeout(  $(async()=>{
      
        await onExitQRL();
      }), 2000)
    } 
    else {
      const controller = new AbortController();
      fetch( "/applyPromo/" , {
        signal: controller.signal,
        body: JSON.stringify(postData)  ,
        method: "post",
        headers :  { 
          "Content-Type" : "application/json",
        }
      }).then((response) => response.json())
        .then(async (result : ApplyPromoDetails) => {
           console.log('applyPromo', result) 
           if(result.d ){

            const selPromo : TrxPromo =  {
              title : result.d.event_title,
              promo_type : result.d.promo_type,
              promo_code : result.d.promo_code,
              deposit_method : result.d.deposit_method,
              descriptionandtermAndCondition :result.d.descriptionandtermAndCondition ,
              given_after_turnover : result.d.given_after_turnover ,
              min  : result.d.min_deposit,
               max :result.d.max_deposit ,
            }
            await props.onSelectPromo$(selPromo);
           }
           else {
            throw new CustomError(result);
           }
         //
        })
        .catch((error) => { 
          applyPromoResult.value = error;
          console.log('applyPromo error',error);
        })
        .finally(() => {
          isWaiting.value = false;
 
          controller.abort(); // Abort the request
          // Clean up any other resources associated with the request
        });
    }
  
  });

 
  const onViewDetailsQRL = $((item: TrxPromo) => {
    selViewPromo.value = item;
   

    const element = document.querySelector<HTMLElement>("#content-details");

    if (element) {
      enter(element, "slide-in");
    }
  
    const element2 = document.querySelector<HTMLElement>("#content-select");

    if (element2) {
      leave(element2, "slide-in");
    }
  });

  const onExitDetailsQRL = $(() => {
    selViewPromo.value = null;
    const element = document.querySelector<HTMLElement>("#content-details");

    if (element) {
      leave(element, "slide-out");
    }
    const element2 = document.querySelector<HTMLElement>("#content-select");

    if (element2) {
      enter(element2, "slide-out");
    }
  });
 

  return { onViewDetailsQRL, onExitDetailsQRL, tempSelPromo, onExitQRL,selViewPromo ,applyPromoResult,isWaiting,promoCodeInput,onConfirmPromoQRL,mapPromoGivenTypeText};
};
