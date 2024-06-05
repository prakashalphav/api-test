import { component$, useStylesScoped$   } from '@builder.io/qwik'; 
import styles from './WarningText1.scss?inline';
import { WarningIcon } from "../../../icons/Warning"; 
type Props = {
   message : string|undefined|null,
    class? : string,
};
export default component$((props: Props) => {

    useStylesScoped$(styles);
    
    return ( 
    <>
          <p class={`${props.class||""} warning-txt`}>
            <WarningIcon class="inline-block mr-1 text-[1.5em]"></WarningIcon>
           <span class="align-middle leading-6">{props.message || ""}</span>
          </p>
    </> 
    );
});