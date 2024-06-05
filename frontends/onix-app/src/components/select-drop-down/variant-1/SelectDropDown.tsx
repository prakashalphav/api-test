import { component$ ,useStylesScoped$ , type Signal,useSignal} from '@builder.io/qwik'; 

import styles from './SelectDropDown.scss?inline';
export type Props = {
    name:string,
    id?:string,
    placeholder: string, 
    required: boolean, 
    disabled :  boolean | Signal<boolean>,
    selectionList: string[],
}

export default component$((  props : Props) => {
    useStylesScoped$(styles);

    const inputTag= useSignal<HTMLInputElement>();
    const isDisabled = typeof props.disabled == "boolean" ? props.disabled : props.disabled.value ;

    return <>
    <div class="w-full select--md">
       <select class="select__inner w-full" disabled={isDisabled} required={props.required} id={props.id} name={props.name}>
            <option value="" disabled selected>{props.placeholder}</option>
            {props.selectionList.map((item: string)=>(
            <option value={item}>{item}</option>
            )
            )}
        </select>
    </div>
      
    </>;
})