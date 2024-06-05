
import { Slot, component$ ,useStylesScoped$  ,useContextProvider ,createContextId, type Signal, $  } from '@builder.io/qwik'; 

import type {
    PropFunction, 
  } from "@builder.io/qwik";
import type { ValidationRules, } from "~/utils/validation";

import type { Form} from "~/hooks/utils/useForm";
import  {useFormField ,type FieldStatus, type FormField} from "~/hooks/utils/useForm";
import Tooltip from "../tooltip/variant-1/Tooltip1";

import {WarningIcon} from "../icons/Warning"
import WarningText1 from '../message-texts/warning/variant-1/WarningText1';
export const FieldWrapperContext = createContextId<{validateField : any }>(
    'fieldwrapper'
  ); 
type Props = {
     key?:string|number|null|undefined;
     value? : any, // if this not defined , then when use fieldWrapper.validateField pass in value 
     fieldName : string ,
     setField$? : PropFunction<( field :  FormField<string|null>, fieldName:string) => FormField<string|null|undefined>>;
     rules? : ValidationRules;
     form?:Form,
     msgPosition : string,
     required : boolean,

  };
export default component$( (props: Props)=>
{
 
    // useStylesScoped$(styles); 
  
     
const { setFieldWithValidateQRL,formField  } =    useFormField(
    props.fieldName, 
    props.setField$,
    props.rules,
    props.value,
    props.required,
    props.form
  );
  useContextProvider(FieldWrapperContext, {validateField : $((value? :any)=>{
    if(value !== undefined){
      setFieldWithValidateQRL(value)
    }
    else {
      setFieldWithValidateQRL(props.value)
    }
    
  })}); 
  
  return (
    <>
    <div class="relative" key={props.key}> 
  
        <Slot></Slot>

        {      formField.value?.status === "error"  &&   (<>  
    <WarningText1 message={formField.value?.message} class="text-xxs leading-3"></WarningText1>
    </>)} 
    </div>
    </>
);
});