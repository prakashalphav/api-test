
 
import { $ ,useSignal, useVisibleTask$,useComputed$, } from "@builder.io/qwik";
import type {  ValidateResult } from "~/services/types";
import { isString, joinStrOrNumberArray } from "~/utils/common";
import { validateField ,validateRequired } from "~/utils/validation";
import { inlineTranslate,   } from 'qwik-speak';
export type FormField<T extends FormDataEntryValue|((string|number)[])|null|undefined> = { 
      value : T
} & ValidateStatus;
  
export type FieldStatus ="loading" | "success" | "error" |"required" | null;  //null means the field has no validation  
export type ValidateStatus  = {
    status: FieldStatus,
     message: string, 
};

  
export type Form =  { 
    [key: string]:  FormField<string|null|undefined|(string|number)[]>|undefined|null,
}
export type FormStatusData =  { 
    validation  :ValidateStatus,
    data : FormData|null
}
 
export const useForm= ( formData :Form )=>{
     
    const setFieldQRL = $((field : FormField<string|null>,fieldName :string)=>{
        //Set Field whether or not the Form needs validation
        formData[fieldName] = field;
        console.log(formData, "_result setFieldQRL ",field )
        return  formData[fieldName];
    })
    const getFieldQRL = $(( fieldName :string)=>{
      //Set Field whether or not the Form needs validation
   
      return  formData[fieldName];

  })
   
    const getFormStatusData = $(( ) : FormStatusData=>{
      
      //initial formStatus is undefined 
        const formStatus =  {status: null , message :""  } as ValidateStatus;
        const fdata = new FormData();
        console.log('_result getFormStatusData',formData)
        for (const key in formData) {
        
          const field = formData[key]; 
            console.log(`form Status- ${key}`, field)
        //if not initial formStatus is undefined then assign from field.status
         //if formStatus is null (means previous field has no validation) then assign from field.status

        //if previous formStatus was not success then do not assign new field.status 

         formStatus.status =  formStatus.status!== "success" && !!formStatus.status? formStatus.status : ( field?.status ||null);
      
          if ( field) {  
            if (field.status === "required") {
              //Added
              field.status = "error";
            }
            if( field.status !== "success"  && field.status !==  null ){
              // if there is a field that not success and has validation (status != null) then return
              formStatus.message = field.message;
              break;
            } 
            const value =field.value||"";

            const _value=  joinStrOrNumberArray(value);

            fdata.append(key, _value);
          }  
        }

        if(formStatus.status === null){
          //if null means all fields does not need validation 
          formStatus.status = "success";
        }
 
       // Display the key/value pairs
       console.log(`form Status `, formStatus);
        for (const pair of fdata.entries()) {
          console.log(`form data ${pair[0]}, ${pair[1]}`);
        } 
        return  {
          validation : formStatus   ,
          data :fdata
        };
  
    })

    const checkEqualQRL =$(( sourceFieldName :string, targetFieldName : string)=>{

      if(!(formData[targetFieldName]?.value)){
        //if target field value is empty then no need to check . as that field has not yet input by user
        return true;
      }
      return formData[targetFieldName]?.value===formData[sourceFieldName]?.value
    })

    const checkFormValid = $(async () => {
      const finalFormStatus = await getFormStatusData();
  
      if (finalFormStatus?.validation.status !== "success") {
        return false;
      }
  
      return true;
    });
    return {setFieldQRL,getFormStatusData, checkEqualQRL ,checkFormValid ,getFieldQRL};
}


export const useFormField =  (fieldName, setField$,rules,iniValue: FormDataEntryValue | null  ,required :boolean , form :Form |undefined )=>{ 
  const isPassRequiredChking = !(required && !iniValue); 
  const t= inlineTranslate();
  const iniStatus  ={
    status : isPassRequiredChking !== true ? "required" : null,
    message : isPassRequiredChking !== true ? t("app.FieldRequired@@This field is required" ) :   "",
    value: iniValue as string|null,
  };
  const  formField = useComputed$<FormField<string|null>>(  ()=>{
   
    const result = form && form.hasOwnProperty(fieldName) ? form[fieldName] : iniStatus;
    console.log("formFieldValue useComputed" ,fieldName, result  );
    return result;
  }); 
   
  useVisibleTask$(async ()=>{
    if(setField$)
     await setField$(iniStatus,fieldName);
  
  })
  console.log("_result run componet", fieldName,formField.value);
  const setFieldWithValidateQRL = $(
    async (
      value:  any, 
    ): Promise<void> => {
      // Show Loading on Input will Hide Clear Btn on Input
      
      let formFieldValue = null;
      let _value ; 

      //if value is array then assign to _value to not change the original value format
      if(value && Array.isArray(value)){
        _value=    value.join("").trim();
      }
      else { 
        //if value is string, then trim it 
        _value = value =value && isString(value) ? value.trim() : value; 
      }
 
     
      if( !rules || !setField$){  
        formFieldValue=  {
          status : formField.value.status === "required" && !_value ? "error" :  "success", //check the minimum isRequired? to show formInput success or error Color
          message : "",
          value:value,
        } 
        if(setField$ ){
          setField$(formFieldValue,fieldName);
        }
        return ;
      } 
       

      formFieldValue=  {
        status :  "loading",
        message : "",
        value:value,
      } 
      await setField$(formFieldValue,fieldName);
      console.log("formFieldValue loading" , fieldName  )
     
      const _result : ValidateResult = await validateField(
        _value ,  rules
      );
      
      console.log("formFieldValue _result" , fieldName   , _result)
      if (_result === true) {

        formFieldValue=  {
          status :  "success",
          message : "",
          value:value,
        } 
       
      } else { 
      
        formFieldValue= {
          status : "error",
          message : _result || "",
          value:value,
        };
     
      }
      await setField$(formFieldValue,fieldName);
      console.log("formFieldValue setField" , fieldName   , formFieldValue)
      return;
    }
  );
 
  return { setFieldWithValidateQRL,formField };
}