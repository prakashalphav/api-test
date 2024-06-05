/* Author :  SL
  
  How to use : 
 1. props.value is to set initial value . Only allow primitives of FormEntryData
  
 2. props.setField$? optional , but if want to show erase/clear button or use validation rules then need to assign using setField$ from useForm()

** IMPORTANT : the props.name needs to be same value as the key in the "form" (Type = Form) store (as below sample "user_name")
e.g.  : 
const form =    useStore<Form>( { user_name :null  });

if want to set default value then put 
const form =    useStore<Form>( { user_name : {status : null, value : "defaultval"}  });

const {setFieldQRL,getFormStatusData} =  useForm(form);

//at JSX
<FormInput setField$={setFieldQRL} name="user_name" ...></FormInput> 

//at submit
const onSubmitQRL = $(()=>{

    ...
    const formData = await getFormStatusData();
    if(formData.validation.status === "success"){
    
      //submit form request
      request.body = formData.data
    }
}) 

  3. if assign props.rules , then form shoud put noValidate. if props.rules not assign. will use only the form input attributes for native form validation
*/
import {
  component$,
  useStylesScoped$,
  type Signal,
  useSignal, 
   $, 
} from "@builder.io/qwik";
import type {
  PropFunction,
  QwikFocusEvent,
  QwikChangeEvent,
  QwikKeyboardEvent,
} from "@builder.io/qwik";
import styles from "./FormInput1.scss?inline";
import { EraserIcon } from "../../icons/Eraser";  
import { EyeIcon } from "../../icons/Eye";
import { EyeSlashIcon } from "../../icons/EyeSlash";
import Spinner from "../../spinner/variant-2/Spinner2";
import Tooltip1 from "~/components/tooltip/variant-1/Tooltip1";
import WarningText1 from "~/components/message-texts/warning/variant-1/WarningText1"; 
import { InfoIcon } from "~/components/icons/Info";
import { useDebounceFn } from "~/hooks/utils/useDebounceFn";

import type { ValidationRules, } from "~/utils/validation";

import type { Form} from "~/hooks/utils/useForm";
import { useFormField, type FieldStatus, type FormField} from "~/hooks/utils/useForm";  

export type Props = {
  key?:string|number|null|undefined;
  name: string;
  id?: string;
  type: string;
  ref?:  Signal<HTMLElement|undefined>|undefined;
  placeholder: string;
  required: boolean;
  disabled: boolean | Signal<boolean>;
  readonly: boolean | Signal<boolean>;
  leadingIcon?: string;
  maxLength?: number;
  minLength?: number;  
  min?: number;  
  max?: number;  
  numberInputClass?: string;
  class?: string;
  inlineStyle?: string;
  /* value field is to set Initial Value only */
  value?: FormDataEntryValue | null; //FormDataEntryValue 
  infoMsg?: string;
  infoMsgStyle?: string;
  rules? : ValidationRules;
  form? : Form;
  setField$? : PropFunction<( field :  FormField<FormDataEntryValue|null>, fieldName:string) => void>;
  onClear$?:PropFunction<() => void>;
  onInput$?: PropFunction<(event: Event) => void>;
  onFocus$?: PropFunction<(event: QwikFocusEvent<HTMLInputElement>) => void>;
  onBlur$?: PropFunction<(event: QwikFocusEvent<HTMLInputElement>) => void>;
  onChange$?: PropFunction<(event: QwikChangeEvent<HTMLInputElement>) => void>;
  onKeyUp$?: PropFunction<(event: QwikKeyboardEvent<HTMLInputElement>) => void>;
  onKeyDown$?: PropFunction<(event: QwikKeyboardEvent<HTMLInputElement>) => void>;
};

export const EyeButton = component$((props: { inputType: Signal<string> }) => {
  // useOn(
  //   'click',
  //   $(() => {
  //     if( props.inputType.value ==='password' ) {
  //       props.inputType.value = 'text';
  //     }
  //     else {
  //       props.inputType.value = 'password';

  //     }
  //   })
  // );
  // useVisibleTask$(( ) => {
  //   if (props.ref.value) {
  //   props.ref.value.querySelector('input__btn-showpwd')?.addEventListener('click', ()=>{
  //     if( props.inputType.value ==='password' ) {
  //       props.inputType.value = 'text';
  //     }
  //     else {
  //       props.inputType.value = 'password';

  //     }
  //   })
  // }
  // }, {strategy:'document-idle'});
  return (
    <button
      tabIndex={-1}
      class="input__btn-showpwd p-1 l-pos-m flex-center "
      type="button"
      onClick$={() => {
        if (props.inputType.value === "password") {
          props.inputType.value = "text";
        } else {
          props.inputType.value = "password";
        }
      }}
    >
      {props.inputType.value !== "password" && <EyeIcon></EyeIcon>}
      {props.inputType.value === "password" && <EyeSlashIcon></EyeSlashIcon>}
    </button>
  );
});

export  const getInputClassName = (isDisabled :boolean, validationStatus :  FieldStatus | null)=>{
    
  if(isDisabled)
  return "input__inner_disabled" 

  if(validationStatus=== 'error'  ){
    return "input__inner_is-error"
  }
  else if(validationStatus=== 'success'){
    return "input__inner_is-successful"
  }
  return ''; 
}
export default component$((props: Props) => {
  useStylesScoped$(styles);

  // const inputTag= useSignal<HTMLInputElement>();
  const inputType = useSignal<string>(props.type);

  const isDisabled =
    typeof props.disabled == "boolean" ? props.disabled : props.disabled.value;
  const isReadonly =
    typeof props.readonly == "boolean" ? props.readonly : props.readonly.value;
  const onInputQRL = props.onInput$;
  const onFocusQRL = props.onFocus$;
  const onBlurQRL = props.onBlur$;
  const onChangeQRL = props.onChange$;
  const onKeyUpQRL = props.onKeyUp$;
  const onKeyDownQRL = props.onKeyDown$;
  
  const isShowInfo = useSignal<boolean>(false);
  const infoMsg = props.infoMsg;
  
  const addNumberInputClass = props.numberInputClass ?? "text-appearance";
  const setField$  = props.setField$; 
  const onClear$= props.onClear$;
  const rules = props.rules;
  const fieldName = props.name;
 
  const { setFieldWithValidateQRL ,formField} =  useFormField(fieldName ,setField$ ,rules ,props.value, props.required ,props.form
    );

 
 const debouncedOnInput= useDebounceFn($(async (evt: Event)=>{
  isShowInfo.value =false;
  if(onInputQRL)
  await onInputQRL(evt);
  const value = (evt.target as HTMLInputElement).value;
  await setFieldWithValidateQRL(value);


 }), 600);
  const hasExternalRightBtn = !!props.infoMsg;
  return (
    <>
      <div 
      key={props.key}
        class={`input max-w-full relative ${props.class?? " input--md "} ${
          formField.value?.status || ""
        }`}
        style={props.inlineStyle || ""}
      >
       
       <div class={`${hasExternalRightBtn ? 'flex-center gap-2' : ''}`}>
       <div
          class={
            `input__inner relative flex-center ${hasExternalRightBtn ? 'flex-auto min-w-0' : ''} ` +
           getInputClassName( isDisabled || isReadonly, formField.value?.status || null) +
           ` ` + addNumberInputClass
          }
        >
          {props.leadingIcon && (
            <>
              <div
                class="
                input__icon
                flex-center flex-shrink-0
                pointer-events-none
                r-pos-m
                w-6
                h-6
                "
              >
                <slot name="leadingIcon"></slot>
              </div>
            </>
          )}

          <input
            id={props.id}
            autoComplete="off"
            type={inputType.value}
            name={props.name}
            value={formField.value?.value}
            // onInput$={onInput}
            // onChange$={onChange}
            // onBlur$={onBlur}
            // onFocus$={}
            // onKeyUp$={}
            readOnly={isReadonly}
            disabled={isDisabled}
            maxLength={props.maxLength}
            minLength={props.minLength}
            min={props.min}
            max={props.max}
            placeholder={props.placeholder}
            required={props.required}
            class="input__tag flex-auto w-0 max-w-full block font-semibold no-ol bg-transparent p-0 no-bd"
         
            {...{ ... props.ref? {ref :props.ref } : {} }}
            onChange$={async (evt) => {
              //mode is Focus
           
              // const status = await validationStatus$();
              // if(isShowInfo.value &&  !status ){
              //      //if Info tooltip is showing then check if there is validationstatus . if yes then hide Info 
              //   isShowInfo.value =false;
              // }

              isShowInfo.value =false;
              if (onChangeQRL) await onChangeQRL(evt);
            }}
            onKeyUp$={async (evt) => {
              //mode is Focus
            
              if (onKeyUpQRL) await onKeyUpQRL(evt);
            }}
            onKeyDown$={async (evt) => {
              //mode is Focus
            
              if (onKeyDownQRL) await onKeyDownQRL(evt);
            }}
            
            onInput$={ async (evt) => {
              //mode is Focus 
              await debouncedOnInput(evt); 
             
            }}
            onFocus$={async (evt) => {
              //if props.infoMsg is not empty and not validation status then auto show Info ToolTip on foucs  
              isShowInfo.value = !!infoMsg ;
              if (onFocusQRL) await onFocusQRL(evt);
            }}
            onBlur$={async (evt) => {
              //hide w Info ToolTip
              isShowInfo.value = false;

              if (onBlurQRL) await onBlurQRL(evt);
            }}
          />
          {props.type === "password" && (
            <EyeButton inputType={inputType}></EyeButton>
          )}

          
          {props.setField$ && !isDisabled && !isReadonly && formField.value?.status !== "loading" && (
          <>{/* has input value and given onClear$ function and current validation status is not Loading */}
          <button
              tabIndex={-1}
              type="button"
              class="input__btn-clear l-pos-m flex-center flex-shrink-0 text-lg"
              onClick$={async()=>{ 
                setFieldWithValidateQRL("").then(()=>{}) 
                if(onClear$)
                  await onClear$();
              }}
            >
              <EraserIcon> </EraserIcon>
            </button></>
          )}
          {formField.value?.status === "loading" && ( 
            <div class="  l-pos-m text-xl "> 
              <Spinner></Spinner> 
            </div>
          )}

          {isShowInfo.value === true && 
          props.infoMsg && (
            <Tooltip1 size="sm" position="bottom-right" message={props.infoMsg} style={props.infoMsgStyle}></Tooltip1>
          )}
        </div>
         {props.infoMsg && <>
           <button type ="button" class={`text-lg info-btn ${isShowInfo.value ? 'info-btn--show' : '' }`} onClick$={()=>{isShowInfo.value = !isShowInfo.value}}>
              <InfoIcon></InfoIcon>
           </button>
         </>}
       </div>
     
        {  formField.value?.status === "error"    && (
          // <p class="text-xs  pt-1">
          //   <WarningIcon class="inline-block mr-1"></WarningIcon>
          //  <span class="align-middle leading-8">{formField.value.message}</span>
          // </p>
          <WarningText1 message={formField.value.message} class="text-xxs leading-3"></WarningText1>
        )} 
        
      </div>
    </>
  );
});
