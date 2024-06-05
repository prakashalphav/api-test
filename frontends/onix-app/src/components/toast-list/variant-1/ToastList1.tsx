import { component$,   } from '@builder.io/qwik'; 
import type { PropFunction } from '@builder.io/qwik';
import ToastMsg from '~/components/toast-msg/variant-1/ToastMsg1';

import {  type Toast} from '../../../services/types';
 
type Props = { 
    dismiss$ :  PropFunction<(toastId :number) => void>;
    toasts :  Toast[]
};

export default component$((props: Props) => { 
    return <>
     <div class="fixed top-0 right-0 z-50">
     {props.toasts.map((item)=>(
        <>
         <ToastMsg key={item.id} toast= {item} dismiss$={props.dismiss$}></ToastMsg>
        </>
     ))}
     </div>
    </>; 
})