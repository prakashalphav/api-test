import type { PropFunction, Signal} from "@builder.io/qwik";
import { Slot, component$, useSignal,useStyles$, useStylesScoped$, useTask$,   } from "@builder.io/qwik";
import styles from "./Dialog1.scss?inline";
import Modal from "~/components/modal/variant-1/Modal1";
import AlertMsg from "../../../components/alert-msg/variant-1/AlertMsg1";
import SubmitBtn from "../../../components/button/variant-1/Button1";

import {  useModal} from "../../../hooks/utils/useModal";
import type { ApiData } from "../../../services/types";
import ArrowRight2Icon from "~/components/icons/ArrowRight2";
import buttonActionStyles from "~/components/button-action-styles/variant-1/ButtonActionStyles1.scss?inline";
import {
    inlineTranslate,  
  } from 'qwik-speak';
export type dialogProps ={   topic?:string;
    title?:string;
    subTitle?:string;
    message?:string;
    imgUrl?:string;// /images/svg/GoldLeafLeft.svg   
    imgWidth? :number;
    imgHeight? :number;
    confirmBtnText? : string;
    confirmBtnStyle? : 'primary' |  'warning';
    cancelBtnText?:string;
    onConfirm$?: PropFunction<(...args:any  ) => any |ApiData<any>>; 
    onCancel$?: PropFunction<(...args:any  ) => any>; }
 type Props = {
    isShow:Signal<boolean>;
    dialog : Signal<dialogProps>;
 
};



export default component$((props:Props) => {
    useStylesScoped$(styles);
 
    
    useStyles$(buttonActionStyles);
    const confirmResult= useSignal<ApiData<any>>({d : null});
    console.log('dialog render',props.isShow )
    const {toggleModalQRL,setModalQRL} = useModal(props.isShow);
    const t = inlineTranslate();
    useTask$(async ({ track }) => {
        track(() => props.isShow.value);
        console.log('dialog useTask start')
        if(props.isShow.value){
            console.log('dialog useTask', true)
           await setModalQRL(true);
        }
      });
     
     
    return (
        <>
       {props.isShow.value && 
          <Modal title={ props.dialog.value.topic}  toggleModal$={async ()=>{
        if(props.dialog.value.onCancel$){

            await props.dialog.value.onCancel$();
        }
        toggleModalQRL();

     }} maxWidth="max-w-md" modalContainerClass=" modal py-4 px-3 text-center" modalContainerStyle="min-width:280px" >
          
                 {/* image */}
                { props.dialog.value.imgUrl &&<div>
                    <img src={props.dialog.value.imgUrl} class="mx-auto"  width={props.dialog.value.imgWidth} height={props.dialog.value.imgHeight}/> 
                </div>}
                 {(props.dialog.value.title || props.dialog.value.subTitle ) && <div class="mt-6 font-bold ">
                     {props.dialog.value.title  &&  <div  class=" text-2xl"> {props.dialog.value.title}</div>}
                     {props.dialog.value.subTitle && <div class=" text-sm">
                    {props.dialog.value.subTitle}
                    </div>}
                    </div>} 
                    <div class="mt-4 text-xs ">
                    {props.dialog.value.message}
                    </div> 
                    <Slot></Slot>
                    <SubmitBtn
            icon={ArrowRight2Icon}  onClick$={async ()=>{
                      if(props.dialog.value.onConfirm$){
                        confirmResult.value = await  props.dialog.value.onConfirm$();
                      }
                      setTimeout(toggleModalQRL, 100);
                    }} class="w-full mt-4 rounded-3xl p-2  save-btn" text={props.dialog.value.confirmBtnText||t("app.Okay@@Okay")} type="submit"></SubmitBtn>
                   {props.dialog.value.cancelBtnText &&   <button class="p-4 w-full mt-3" onClick$={async ()=>{
        if(props.dialog.value.onCancel$){

            await props.dialog.value.onCancel$();
        }
        toggleModalQRL();

     }}>{props.dialog.value.cancelBtnText}</button>}
                   
                   <div class="mt-3"> 
                <AlertMsg  message={confirmResult} ></AlertMsg>
                </div>
           </Modal> }
        </>
        );
});        