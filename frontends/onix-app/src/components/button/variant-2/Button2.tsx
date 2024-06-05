import type {PropFunction   } from '@builder.io/qwik';
import { component$ ,useStylesScoped$    } from '@builder.io/qwik'; 
import styles from './Button2.scss?inline';
import {ArrowLeft} from '../../icons/ArrowLeft';
 
type Props = {
    onClick$?: PropFunction<() => void>; 
    text: string;
    type: "reset" | "submit" | "button" | undefined;
 
};
export default component$((  props :Props ) => {
 
    useStylesScoped$(styles);
 
    return <> 
    <button type={props.type} class="btn-2 rounded-[150px] py-2.5 px-5  transition-opacity flex-center gap-1.5 " onClick$={props.onClick$}> 
         <div class=""><ArrowLeft></ArrowLeft></div>
         <div>{props.text}</div>
      
         </button>
    </>;
})