import { component$, useStylesScoped$  } from '@builder.io/qwik'; 
import styles from './InputCopy.scss?inline';  
import {CopyIcon} from "../../../../components/icons/Copy";
import { copyText } from "~/utils/common";

/*remove this if CMP does not have props*/
type Props = {
    id : string,
    value : string,

};
export default component$(( props : Props) => {

    useStylesScoped$(styles);
 
    return <>
        <div class="input input--sm  w-full ">
        <div
             class={`input__inner relative flex-center rounded  px-2 `} >
             <input id={props.id} type="text" value={props.value} readOnly class="input__tag flex-auto w-0 max-w-full block  no-ol bg-transparent p-0 no-bd"/>
            <button 
                tabIndex={-1} 
                type="button" class="input__btn  flex-center flex-shrink-0"
                onClick$={() => { copyText(props.value); }}
            >
                <CopyIcon></CopyIcon>
            </button>

             </div>
        </div>
      
    </>;
});