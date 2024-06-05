import { useSignal ,useStore, $, type Signal , 
    type PropFunction,
   } from '@builder.io/qwik';
import { bankLogoBase, gatewayLogoBase } from '~/services/images';
import type { UserBank} from '~/services/types';
import { type ApiData } from '~/services/types';
import {enter,leave} from "../../utils/transitions"
import { type Form, useForm } from "../utils/useForm";
import type { WithdrawData } from "~/services/types";
import { createSignals as createMSignals, useModal } from "../utils/useModal";
import { useAddFundAccResource } from '../utils/useResources';
export type OnSelPayOptsArgs ={
    method :number, selItem : PayOpt
}
export type PromoOpt  = {
    id :string,
    [key: string]: string 
}|null; 

export type PayOpt  ={
      method: number,
      [key: string]: string | number 
}|null;

export const WITHDRAW_METHODS = {
    manual: "manual", 
  };
  

export type WdMethod = typeof WITHDRAW_METHODS.manual | string; 

export const init = (bankList: Record<string, unknown>[]) => {
    const submitResult = useSignal<ApiData<null>>({ d: null });
    const selPayOpt = useSignal<PayOpt>(null);
    const confirmPay = useSignal<boolean>(false);
    const wdMethod = useSignal<WdMethod>(WITHDRAW_METHODS.manual ); //manual 
    const cryptoList: Record<string, unknown>[] = [];
    const bankWalletList: Record<string, unknown>[] = [];
    const { showModal: showAddFundAccModal } = createMSignals();
    const userBanks = useSignal<UserBank[] >([]);

    bankList?.map((item: Record<string, unknown>)=>{
      // method 8 = crypto
      if(item.method != 8){ 
        bankWalletList.push(item);
      }else{
        cryptoList.push(item);
      }
    });

    const { addFundAccResource}=  useAddFundAccResource(showAddFundAccModal, false);
 
    return { wdMethod, selPayOpt,confirmPay,submitResult,bankWalletList,cryptoList,  showAddFundAccModal ,addFundAccResource,userBanks}
}
export type WithdrFormProps = {
    selPayOpt: Signal<PayOpt>;
    onSelPayOpt$: PropFunction<(args: OnSelPayOptsArgs) => void>;
    onChgPayOpt$: PropFunction<() => void>;
    onSubmitForm$: PropFunction<
      (form: FormData, isWaiting: Signal<boolean>) => void
    >;
    bankList?: Record<string, unknown>[];
    userBal?: string;
    currencyCode?: string;
    wdToken?: string;
    submitResult: Signal<ApiData<null>>;
    userFullName?: string;
    wd: WithdrawData;
    userBanks: Signal<UserBank[]>;
    onClickAddFundAcc$: PropFunction<() => void>;
  };
export const useWithdrawForm= ( props: WithdrFormProps )=>{
    const selUserWallet  = useSignal<UserBank|null>(null);
    const isWaiting = useSignal<boolean>(false);
    const wdForm = useSignal<HTMLFormElement>();
    //make sure the fields order is same order as the form
    const formStatus = useStore<Form>({  amount:null, fundAcc: null, walletType: {value: 'game', status: null, message: ''}  });
    const { setFieldQRL, checkFormValid } = useForm(formStatus);
    
    const onSelUserWalletQrl = $(( item : UserBank ) => {
        selUserWallet.value = item ;
        
      })
    
      const onSubmitQRL = $(async () => {
        isWaiting.value = true;
        const isFormValid =  await checkFormValid();
        console.log('formData', isFormValid);
        if(isFormValid){
         const formData = new FormData(wdForm.value);
          await props.onSubmitForm$(formData, isWaiting);
        }
    
        isWaiting.value = false;
      })
    return {
        wdForm,isWaiting, selUserWallet, onSelUserWalletQrl,
        setFieldQRL ,onSubmitQRL,formStatus
    }
}
 
export const useWithdraw = (selPayOpt: Signal<PayOpt>,confirmPay :Signal<boolean>, submitResult : Signal<ApiData<null>> ,wdMethod:Signal< WdMethod>, showAddFundAccModal: Signal<boolean>,userBanks: Signal<UserBank[]>, wd : WithdrawData,) => {
    const onSelPayOptQRL =  $(({method,selItem } : OnSelPayOptsArgs) =>{

        selPayOpt.value=   {
            method:method,
            ...selItem
        }; 
    });
    const onSelWdMethodQRL =  $((method  : WdMethod) =>{

        wdMethod.value=   method
    });
     
    const onOkPayOptQRL =  $(( ) =>{
        confirmPay.value = true;
        const element = document.querySelector<HTMLElement>('#withdraw-form');

        if(element){
            enter( element, 'slide-in');
        }
        const element2 = document.querySelector<HTMLElement>('#pay-methods');

        if(element2){
            leave( element2, 'slide-in');
        }
    });
    const onChgPayOptQRL =  $(( ) =>{
        confirmPay.value = false;
        const element = document.querySelector<HTMLElement>('#withdraw-form');

        if(element){
            leave( element, 'slide-out');
        }
        const element2 = document.querySelector<HTMLElement>('#pay-methods');

        if(element2){
            enter( element2, 'slide-out');
        }
    });
    const onSubmitFormQRL =  $((formData :FormData, isWaiting:Signal<boolean> ) =>{
        const controller = new AbortController();
        isWaiting.value = true;
        fetch("/withdraw/" , {
          signal: controller.signal,
          body: formData,
          method: "post",
        })
          .then((response) => response.json())
          .then((json) => {
            submitResult.value = json;
            console.log('useWithdraw__onSubmitQRL_submitResult',json )
            if (submitResult.value.type === "s") {
                if (typeof window !== "undefined") { 
                  setTimeout(()=>{location.href='/' ;}, 0)
                }
              }
          })
          .catch((error) => {
           console.log('useWithdraw__onSubmitQRL_submitResult error', JSON.stringify(error));
          })
          .finally(() => {
            isWaiting.value = false;
            controller.abort(); // Abort the request
          });
    });

    const { toggleModalQRL: _toggleAddFundAccMdQRL } = useModal(showAddFundAccModal);
    const toggleAddFundAccMdQRL = $(async (items?: UserBank[]) => {
   
        if(items !== undefined){
    
            userBanks.value= items;
        }
        
        await _toggleAddFundAccMdQRL();
      });
    
      userBanks.value =  wd.user_banks;
    return {onSelPayOptQRL,onSubmitFormQRL,onOkPayOptQRL,onChgPayOptQRL , onSelWdMethodQRL ,toggleAddFundAccMdQRL};
}

export const getGatewayImgUrl = (providerName: string | unknown)=>{ 
    if(!providerName || typeof providerName !== 'string'){
        return "";
    }
    return  gatewayLogoBase + providerName.toLowerCase() + `.png?v=1.1`;
}

export const getBankImgUrl = (providerName: string | unknown)=>{ 
    if(!providerName || typeof providerName !== 'string'){
        return "";
    }
    return  bankLogoBase +`bank_`+ providerName.toLowerCase() +`_col.jpg?v=1`;
}