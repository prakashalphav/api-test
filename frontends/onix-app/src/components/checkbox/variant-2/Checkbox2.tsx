import type {  Signal } from '@builder.io/qwik';
import { component$, useStyles$ ,Slot, type PropFunction } from '@builder.io/qwik'; 
import styles from './Checkbox2.scss?inline';  
/*remove this if CMP does not have props*/
type Props = {
      id: string;  /*id is required for this checkbox*/
      name? : string;
      checked? :Signal<string|number|boolean|undefined> |boolean ;
      required?:boolean;
      disabled?:Signal<boolean>;
      value:string|number;   /*value if checked*/
      type : 'checkbox' | 'radio',
      direction?: "flex-row" | "flex-row-reverse" | "flex-col" | "flex-col-reverse"  ;
      onChange$?: PropFunction<( isChecked:boolean,e?:Event )=>void >   
};
export default component$(( props : Props) => {

    useStyles$(styles);
 
    return <>
    <input required={props.required} 
    {
      ...(  typeof  props.checked == "boolean"   ? {checked :props.checked }:  ( props.checked != undefined ? {
        checked  : (typeof  props.checked.value == "boolean" ?  props.checked.value : props.checked.value==props.value ) 
      } : {})) 
    }
    {
      ...(props.disabled != undefined  ?{
        disabled  : (props.disabled.value === true)
      }:{}) 
   }
    onChange$={async (e)=>{ 
                if(props.onChange$)
                await props.onChange$( e.target?.checked , e);
            }} class="cbx-input-v2 hidden" name={props.name}   id={props.id} type={props.type} value={props.value}  />  

    <label class={`cbx-v2 cursor-pointer flex-center gap-2 ${props.direction?? "flex-row"} `} for={props.id}>
        <div class="cbx-mark-v2 flex-none relative w-5 h-5 rounded">
    <svg class="cbx-svg-v2 absolute top-1 left-1" width="12px" height="10px" viewBox="0 0 12 10">
      <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
    </svg></div>
    <div class="min-w-0 flex-auto"> 
       <Slot></Slot></div>
    </label>
    </>;
});