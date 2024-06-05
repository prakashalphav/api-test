import type { ContextId, QRL  } from '@builder.io/qwik';
import { useContext , useSignal,   type Signal,$, useStore, useVisibleTask$  } from '@builder.io/qwik'; 
import type { ApiData, MultipleAuthAction, SecondPinContext } from "~/services/types";
 
import { useModal} from "../utils/useModal";
import type { Form, FormField} from '../utils/useForm';
import { useForm } from '../utils/useForm';
import { SHOW_SECOND_PIN_MODAL, SECOND_PIN_MODAL_CTX } from '../context';
import { usePinInputOnForm } from '../utils/usePinInput';

// import { globalAction$ } from '@builder.io/qwik-city';

// export const useLoginAction = globalAction$((loginData) => {
 
//  });

export type SecondPinProps = {
   
};
export const useSignals = ( )=>{

    const showModal    = useContext<Signal<boolean>>(SHOW_SECOND_PIN_MODAL);
    const secondPinCtx  = useContext<Signal<SecondPinContext>>(SECOND_PIN_MODAL_CTX);

    return {showModal , secondPinCtx};
}

 
export const useSecondPin=( secondPinCtx : Signal<SecondPinContext>, toggleModalQRL: QRL<(action: MultipleAuthAction, forLogin?: boolean) => Promise<void>> )=>{
    const form =    useStore<Form>( { pincode :null as  null |  FormField< string[]>, });

    const {setFieldQRL,getFormStatusData,    } =  useForm(form); 
    const submitResult = useSignal<ApiData<null>>({ d: null });
    const isWaiting = useSignal<boolean>(false);
    const onSubmitQRL = $(async () => {
        isWaiting.value = true;
  
       
        const formData = await getFormStatusData();
        console.log("formData", formData.data?.get("pincode")  )
         
        
        if(formData.validation.status === "success"){
        const controller = new AbortController();
        console.log("register-submit", secondPinCtx.value.action)
        const postUrl =  secondPinCtx.value.action == "setup" ? "/setup2ndPin" : "/validate2ndPin";

        fetch(postUrl , {
          signal: controller.signal,
          body: JSON.stringify({pincode: form.pincode?.value || [] }),
          method: "post",
          headers :  {
            "Content-Type" : "application/json",
          }
        })
          .then((response) => response.json())
          .then(async (json) => {
            console.log('validate2ndPin', json)
            submitResult.value = json;
            if (submitResult.value.type === "s") {
              if (secondPinCtx.value.forLogin && typeof window !== "undefined") {
                //if for login then reload page
                location.reload();
              }
              else {

                //close 2nd pin modal
                await toggleModalQRL("validate", false);
              }
             
            }
          })
          .catch((error) => {
            //TODO
            console.error(error);
          })
          .finally(() => {
            isWaiting.value = false;
            controller.abort(); // Abort the request
            // Clean up any other resources associated with the request
          });
        }
        else {
          isWaiting.value = false;
        }
       
      });


 

    const {onPinInputQRL} =   usePinInputOnForm(form, "pincode");
     
      return {form,setFieldQRL,submitResult,isWaiting,onSubmitQRL,onPinInputQRL , };
  
}
export function useSecondPinModal(  ) {
 
 

    const  {showModal :show2ndPinModal,secondPinCtx} = useSignals();

    const {toggleModalQRL : _toggleModalQRL} = useModal(show2ndPinModal);
 
   
    const toggleModalQRL = $(async (action:MultipleAuthAction, forLogin : boolean = true )=>{
      secondPinCtx.value.action  = action ;
      secondPinCtx.value.forLogin  = forLogin ;
      await _toggleModalQRL()
    });
     

    return {show2ndPinModal ,toggleModalQRL  ,secondPinCtx};
}