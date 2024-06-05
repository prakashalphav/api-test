import type {  Signal } from '@builder.io/qwik';
import { component$, useStylesScoped$ ,Slot, type PropFunction } from '@builder.io/qwik'; 
import { TickIcon } from '~/components/icons/Tick';
import styles from './Checkbox3.scss?inline';  
/*remove this if CMP does not have props*/
type Props = {
    id? : string; 
      name? : string;
      checked? :Signal<string|number|boolean|undefined> |boolean ;
      required?:boolean;
      disabled?:Signal<boolean>;
      value:string|number;  /*value if checked*/
      type : 'checkbox' | 'radio', 
      onChange$?: PropFunction<( isChecked:boolean,e?:Event )=>void >   
};
export default component$(( props : Props) => {

    useStylesScoped$(styles);
 
    return <>
  

    <label    class={`wrapper inline-block aspect-square   relative`} for={props.id}>
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
            }} class="absolute opacity-0 h-0 w-0" name={props.name}   id={props.id} type={props.type} value={props.value}  />  
 
        <span class="checkmarkBox inset-0  absolute rounded-sm cursor-pointer">
                                { ( typeof  props.checked == "boolean"   ? props.checked  : props.checked?.value ) && (
                                   <span class=" "><TickIcon></TickIcon></span>
                                )}
        </span>
    </label>
    </>;
});