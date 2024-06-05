import type { PropFunction } from '@builder.io/qwik';
import { component$, useSignal, useTask$ ,  type NoSerialize } from '@builder.io/qwik'; 
import {CheckmarkCircleIcon} from '~/components/icons/CheckmarkCircle';
import {CrossCircleIcon} from '~/components/icons/CrossCircle';
import {WarningIcon} from '~/components/icons/Warning';
import {InfoIcon} from '~/components/icons/Info';
import {CloseIcon} from '~/components/icons/Close';
import ProgressBar from '~/components/progress-bar/variant-2/ProgressBar2';
import { INTERACT_MSG_TYPE , type Toast} from '../../../services/types';
 
type Props = {
    
  dismiss$ :  PropFunction<(toastId :number) => void>;
    toast :  Toast, 
};

export default component$((props: Props) => {
   
    return <>
  
  <div class="relative overflow-hidden">
    <div
      class={`absolute w-full mx-auto left-0 right-0 bottom-0 h-0.5 py-0.75 rounded-b-md   ${props.toast.type == INTERACT_MSG_TYPE.SUCCESS
        ? 'bg-[#23ae54]'
        : props.toast.type == INTERACT_MSG_TYPE.ERROR
        ? 'bg-[#aa2828]'
        : props.toast.type == INTERACT_MSG_TYPE.WARNING
        ? 'bg-[#d7a700]'
        : 'bg-[#255c89]'}`}
    
    >
      <ProgressBar
        class="!bottom-0 !top-auto p-0.75 rounded-b-md"
        height={3}
        color= {props.toast.type == INTERACT_MSG_TYPE.SUCCESS
            ? '#24ff51'
            : props.toast.type == INTERACT_MSG_TYPE.ERROR
            ? '#e35555'
            : props.toast.type == INTERACT_MSG_TYPE.WARNING
            ? '#ffe89c'
            : '#91ccff'}
      ></ProgressBar>
    </div> 
    <div
      class={`rounded-md px-4 py-4 shadow-md ${  props.toast.type == INTERACT_MSG_TYPE.SUCCESS
        ? 'border-[#60b28c]  bg-[#3dc66c] text-[#fff]'
        : props.toast.type == INTERACT_MSG_TYPE.ERROR
        ? 'border-[#a75868] bg-[#c63e3e] text-[#fff]'
        : props.toast.type == INTERACT_MSG_TYPE.WARNING
        ? 'border-[#FFC107] bg-[#FFC107] text-[#fff]'
        : 'border-[#3A89C9] bg-[#3A89C9] text-[#fff]'}`}
      
      role="alert"
    >
      <div class="w-full items-center flex">
        <div class="w-10 fill-current ml-1 mr-4 text-4xl leading-3">
 {props.toast.type == INTERACT_MSG_TYPE.ERROR && (<CrossCircleIcon></CrossCircleIcon>)}
 {props.toast.type == INTERACT_MSG_TYPE.INFO && (<InfoIcon></InfoIcon>)}
 {props.toast.type == INTERACT_MSG_TYPE.SUCCESS && (<CheckmarkCircleIcon></CheckmarkCircleIcon>)}
 {props.toast.type == INTERACT_MSG_TYPE.WARNING && (<WarningIcon></WarningIcon>)} 
        </div>
        <div class="w-full">
          <p class="font-bold">{props.toast.title}</p>
          <p class="text-sm mt-1">{props.toast.content}</p>
        </div>
        <div class="w-6 self-start cursor-pointer" onClick$={async ()=>{await props.dismiss$(props.toast.id)}}>
          <CloseIcon></CloseIcon>
        </div>
      </div>
      
    </div>
  </div> 
    </>;
})