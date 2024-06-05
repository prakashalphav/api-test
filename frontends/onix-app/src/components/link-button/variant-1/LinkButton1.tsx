import { component$,    Slot, useStylesScoped$  } from '@builder.io/qwik'; 
import styles from './LinkButton1.scss?inline';
import type {
    PropFunction, 
  } from "@builder.io/qwik";
type Props = { 
    toUrl? : string;
    disabled? : boolean;
    class? : string;
    style? : string;
    onClick$? : PropFunction<(event: Event) => void>;
};
export default component$((props: Props) => {

    useStylesScoped$(styles); 
  
    return ( 
    <>

     {/* does not have onClick$  and does not have toUrl  ,  does not have onClick$ AND disabled but has toUrl */}
      { !props.onClick$   &&  (!props.toUrl || (props.disabled && props.toUrl))  && <div  class={props.class||""} style={props.style}><Slot></Slot></div>}
      
         { !props.disabled && props.toUrl && <a href={props.toUrl} class={props.class||""} style={props.style}><Slot></Slot></a>}

         { !props.toUrl && props.onClick$   && <button class={props.class||""} style={props.style} onClick$={props.onClick$} disabled={props.disabled}>
           
            <Slot></Slot></button>}
       
    </> 
    );
});