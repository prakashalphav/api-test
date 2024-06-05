
import type { Signal, QwikKeyboardEvent} from '@builder.io/qwik';
import {  useVisibleTask$, type PropFunction, $, useSignal, useContext } from '@builder.io/qwik';
import { FieldWrapperContext } from "~/components/form-field-wrapper/FormFieldWrapper1";
import type { Form } from './useForm';
export type Props = {
    readonly : boolean; 
    name : string;
    numberOnly? : boolean;
    onInput$? : PropFunction<( pinPosition :  number , pinValueAtPos : string|number )=> ( string|number )[]   >  | undefined;// function () {
    //     return [8, 8, 8, 8, 8, 8] // [8, '*', '*', 8, 8, '*']
    //   },
    pinQuest? : Signal<(string|number)[]> | undefined ;// [8, 8, 8, 8, 8, 8] // [8, '*', '*', 8, 8, '*']
};

 
export const usePinInput= (props : Props )=>{
    const maxLength = 1
const inputPos   =  useSignal(0);
const cursorPos =  useSignal(0);
const firstAutoFocus = useSignal(0);
const pinQuest = useSignal(props.pinQuest?.value || [  "", "", "", "", "", ""] );
 
const fieldWrapper = useContext(FieldWrapperContext);

//  useVisibleTask$(  ()=>{
//     if(props.pinQuest$){ 
//         props.pinQuest$().then( (v) =>{
//             v.some((value, index) => {
//                 if (value === 8) return (firstAutoFocus.value = index), false
//                 return true
//          })})

//     }

//   }) 

  
  if(pinQuest.value){ 
    pinQuest.value.some((value, index) => {
        if (value === 8) return (firstAutoFocus.value = index), false
        return true
         })
   }
   


  const clearInputQRL = $((target : HTMLInputElement ) => {
    target.value = ''
    
  })


  const focusNextTargetQRL = $((target  : HTMLInputElement) => {
    const myLength = target.value.length
    if (myLength >= maxLength) {
      let next = target
      while ((next = next.nextElementSibling)) {
        //   console.log("next.getAttribute('type')", next.getAttribute('type'), next.readOnly)
        if (next == null) break
        if (next.tagName.toLowerCase() == 'input') {
          const pos = parseInt(next.getAttribute('data-pos'))
          if (pinQuest.value[pos] !== '8') {
            //next.getAttribute('type') !== 'password'
            next.focus()
            inputPos.value = pos
            console.log('inputPos.value', inputPos.value)
            break
          }
        }
      }
    }
  
    if (myLength === 0) {
      let next = target
      while ((next = next.previousElementSibling)) {
        if (next == null) break
        if (next.tagName.toLowerCase() == 'input') {
          const pos = parseInt(next.getAttribute('data-pos'))
          if (pinQuest.value[pos] !== '8') {
            //next.getAttribute('type') !== 'password'
            next.focus()
            inputPos.value = pos
            console.log('inputPos.value', inputPos.value)
            break
          }
        }
      }
    }
  })


  const onKeyDownPinQRL = $(async (event : QwikKeyboardEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement
    console.log('onKeyDownPinQRL', event.key ,event.keyCode )
    if (event.key !== 'Enter' && event.keyCode !== 13) {
      await clearInputQRL(target)
      if(props.onInput$){
          const fullValue =  await props.onInput$(inputPos.value,"");
          await fieldWrapper.validateField(fullValue);
      }
    }
  }); 
  
  const onKeyUpPinQRL = $(async (event :  QwikKeyboardEvent<HTMLInputElement>) => {
    const target = event.target  as HTMLInputElement
    await  focusNextTargetQRL(target)
  });
  const addPinQRL = $(
    async (value :number|string ) => {
        console.log('inputPos.value', inputPos.value)
        const target = document.querySelector('input[name="' + props.name + '[' + inputPos.value + ']"]') as HTMLInputElement
        await  clearInputQRL(target)
        target.value =  value.toString();
        if(props.onInput$){
            const fullValue =   await props.onInput$(inputPos.value,  value.toString() );
            await fieldWrapper.validateField(fullValue);
        }
       await  focusNextTargetQRL(target)
      }
  )
  const setPosQRL = $(async (pos :   number) => {
    if (pinQuest.value[pos] !== '8') {
      inputPos.value = pos
    } else {
      const target = document.querySelector('input[name="pincode[' + pos + ']"]') as HTMLInputElement
     await focusNextTargetQRL(target) 
    }
  })
  const clearPinQRL = $(async () => {
    const target = document.querySelector('input[name="' + props.name + '[' + inputPos.value + ']"]')  as HTMLInputElement
    await clearInputQRL(target)

    if(props.onInput$){
        const fullValue =  await props.onInput$(inputPos.value,"");
        await fieldWrapper.validateField(fullValue);
    }
    await  focusNextTargetQRL(target)
  })

  const onSinglePinInputQRL = $(async ( evt : Event, pos :   number) => {

     if(props.onInput$){
        const singleValue = (evt.target as HTMLInputElement).value;
         const fullValue =  await props.onInput$( pos , singleValue);
         await fieldWrapper.validateField(fullValue);
      } 
   });
   
    return {  onKeyUpPinQRL,onKeyDownPinQRL, setPosQRL,clearPinQRL,addPinQRL,pinQuest,firstAutoFocus,onSinglePinInputQRL };
}


export const usePinInputOnForm= ( form : Form , fieldName : string  )=>{

    const  onPinInputQRL =  $((pinPos :number, pinVal : string|number)=>{
        if( form.hasOwnProperty(fieldName) && form[fieldName] && form[fieldName]?.value    ){
                         
             if( Array.isArray( form[fieldName]?.value)){
                form[fieldName].value[pinPos] = pinVal.toString();
               
               return   form[fieldName].value;
             }
             else {
               console.log("Pin onInput  form.pincode.value not an array",  form[fieldName])
               return ['', '', '', '', '', ''];
             }  
         }
 
         console.log("Pin onInput  form.pincode.value is empty", form[fieldName])
         return  ['', '', '', '', '', ''];
       }
);
       return  {onPinInputQRL};
}