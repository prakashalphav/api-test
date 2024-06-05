import type {PropFunction ,Signal , Component} from '@builder.io/qwik';
import { component$ ,useStylesScoped$    } from '@builder.io/qwik'; 
import styles from './Button1.scss?inline'; 
import Spinner from '../../spinner/variant-1/Spinner1';
import {  type ActionStore } from '@builder.io/qwik-city';
type Props = {
    onClick$?: PropFunction<() => void>; 
    text: string;
    type: "reset" | "submit" | "button" | undefined;
    action? : ActionStore<any,any,false>   ;
    isWaiting?: boolean | Signal<boolean>;
    class? :string;
    icon? : Component<{ class: string }>;
    disabled?: boolean | Signal<boolean>; //if disabled wont show spinner icon
};
export default component$((  props :Props ) => {
 
    useStylesScoped$(styles);
 
    const Icon = props.icon;
    const isDisabled = typeof props.disabled == "boolean" ? props.disabled : props.disabled?.value;
    const isWaiting = typeof props.isWaiting == "boolean" ? props.isWaiting : props.isWaiting?.value;

    return <> 
    <button type={props.type} disabled={(props.action?.isRunning || isWaiting || isDisabled)?  true : false} class={`transition-colors ${props.class? props.class: 'btnPrimary rounded-full py-2.5 px-5  '}`} onClick$={props.onClick$}>
       <div class={(!props.action?.isRunning  && !isWaiting  ) ? 'flex-center gap-1.5 ' : 'hidden'}> 
         <div>{props.text}</div>
         {/* <div class=""><ArrowRight2Icon></ArrowRight2Icon></div> */}
         {props.icon && (<Icon class=""/>) }
      
       </div>
        <div class={(props.action?.isRunning || isWaiting && !isDisabled)? 'block':'hidden'}> <Spinner></Spinner></div>
       
         </button>
    </>;
})