import { $, component$, useStylesScoped$,  } from "@builder.io/qwik";
import styles from "./SecondPin1.scss?inline";
import { type SecondPinProps, useSecondPin ,useSecondPinModal } from "../../../hooks/business/useSecondPin";
import Modal from "~/components/modal/variant-1/Modal1";
 
 
import AlertMsg from "~/components/alert-msg/variant-1/AlertMsg1"; 
import SubmitBtn from "~/components/button/variant-1/Button1"; 
import PinInput  from "~/components/pin-input/variant-1/PinInput1";
import FormFieldWrapper  from "~/components/form-field-wrapper/FormFieldWrapper1";
import ArrowRight2Icon from "~/components/icons/ArrowRight2";
import {
  inlineTranslate,  
} from 'qwik-speak';

export default component$((props: SecondPinProps) => {
    useStylesScoped$(styles);
    const t = inlineTranslate();
    const { show2ndPinModal, toggleModalQRL ,secondPinCtx } = useSecondPinModal();

    const {form,setFieldQRL,submitResult,isWaiting,onSubmitQRL,onPinInputQRL  } =useSecondPin(secondPinCtx,toggleModalQRL);
 
    return <>{( show2ndPinModal.value&&
        <Modal title={secondPinCtx.value.action == "validate"?t('app.Validate Secure PIN@@Validate Secure PIN'): t('app.Register Secure PIN@@Register Secure PIN') } isCloseOnClickOutside={false}  toggleModal$={toggleModalQRL} maxWidth="max-w-md" modalContainerClass="p-2 text-left"  >
        <div>
          <form  preventdefault:submit method="POST" onSubmit$={onSubmitQRL}>
            <div class="mb-6">
              <label for="rp-email" class="block pb-2"> 
              {t('app.Enter your 6-digit PIN@@Enter your 6-digit PIN using the number buttons below.')}
              </label>

              <FormFieldWrapper  fieldName="pincode" required={true} msgPosition="bottom"  rules={{
                      required :  {rule : true },
                      minLength : {rule : 6},

                   }}  setField$={setFieldQRL} form={form} >
             <PinInput onInput$={onPinInputQRL}  readonly={false} name="pincode" numberOnly={true} ></PinInput>
             </FormFieldWrapper>
            </div>
         
       
            <div class="flex justify-end items-center gap-2 gap-y-3 flex-wrap">
             
              <SubmitBtn
            icon={ArrowRight2Icon} 
               isWaiting={isWaiting}
                type={"submit"}
                text={t('app.Submit@@Submit')}
              ></SubmitBtn>
            </div>
          </form>
      
              <div class="mt-3"> 
              <AlertMsg message ={submitResult}></AlertMsg>
              </div>
           
        </div>
      </Modal>
      )}
    </>;
})