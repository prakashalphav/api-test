import {  useContextProvider,   useSignal ,useContext, type Signal, $, useStore } from "@builder.io/qwik";
    
import { ALERT_DIALOG_PROPS ,ALERT_DIALOG_SHOW, TOASTLIST} from  '../context';
import type { INTERACT_MSG_TYPE, Toast} from "~/services/types";
import type { dialogProps} from "~/components/dialog/variant-1/Dialog1"
export const useInteractState= ()=>{
    const alertDialogProps = useSignal<dialogProps>( {} as dialogProps); 
    const alertDialogShow = useSignal<boolean>(false);
    useContextProvider(ALERT_DIALOG_SHOW, alertDialogShow);  
    useContextProvider(ALERT_DIALOG_PROPS, alertDialogProps); 

    
    const toasts = useStore<Toast[]>([ ]);
    
    useContextProvider(TOASTLIST, toasts); 
    const {showToast, dismissToast} =  _useToasts(toasts);
    return {alertDialogShow, alertDialogProps ,toasts,showToast, dismissToast};
}


export const useAlertDialog =()=>{

    const alertDialogProps    = useContext<Signal<dialogProps>>(ALERT_DIALOG_PROPS);
    const alertDialogShow    = useContext<Signal<boolean>>(ALERT_DIALOG_SHOW);

    const openDialogQRL = $((   props : dialogProps , dialogType? :'s' | 'f' | 'w' | 'i' )=>{
 
        if(dialogType){
            props.imgHeight =100;
            props.imgWidth =100;
            if(dialogType=='s'){
                props.imgUrl ="/images/svg/Success.svg";
             
                if(!props.title){
                    props.title ="Success";
                }
            }
            if(dialogType=='f'){
                props.imgUrl ="/images/svg/Error.svg";
             
                if(!props.title){
                    props.title ="Ooops...something happened!";
                }
            }
            if(dialogType== 'w'){
                props.imgUrl ="/images/svg/Warning.svg";
             
                if(!props.title){
                    props.title ="Warning";
                }
            }
            if(dialogType== 'i'){
                props.imgUrl ="/images/svg/Info.svg";
             
                if(!props.title){
                    props.title ="Info";
                }
            }
        }
        alertDialogProps.value = props;
        alertDialogShow.value =true;
    })

   

    return {openDialogQRL}
}
const _useToasts = (toasts : Toast[])=>{
     
    const dismissToast = $((id: number) => {
        const index = toasts.findIndex((toast) => toast.id === id);
        const t = toasts[index];
        // console.log("toasts ind", toasts.value[index], index);
        clearTimeout(t.timeoutId);
        toasts.splice(index, 1);
      });

    const showToast = $(( 
        title: string,
        content: string,
        type: INTERACT_MSG_TYPE,
        duration: number
      ) => {
        const oldLength = toasts.length; //oldLength will be the index of the new toast to be pushed (index = oldLength )
        const timeoutId = setTimeout($(async () => {
            await dismissToast(oldLength);
          }), duration);
        toasts.push({
          title,
          content,
          type,
          duration,
          timeoutId,
          id: oldLength,
        });
      });
  
      return { showToast, dismissToast };
}
export const useToasts = ()=>{
    const toasts    = useContext<Toast[]>(TOASTLIST);

    const { showToast, dismissToast }=  _useToasts(toasts);
      return {toasts,showToast, dismissToast };
}
