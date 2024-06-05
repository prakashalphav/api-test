
import { component$, useStylesScoped$, type Signal, useContext } from "@builder.io/qwik";
import CheckboxMark from "~/components/checkbox/variant-2/Checkbox2";
import { FieldWrapperContext } from "~/components/form-field-wrapper/FormFieldWrapper1";
import {
  inlineTranslate,  
} from 'qwik-speak';
type Props = {
 
  };
export default component$((props: Props) => {
    const fieldWrapper = useContext(FieldWrapperContext);
    const t = inlineTranslate();

    return (<>
  
      <CheckboxMark
              id="dp-consent"
              direction="flex-row"
              required={true}
              type="checkbox"
              name="consent"
              value="0"

              onChange$={async( isChecked,e )=>{
                 
                console.log('consent',  isChecked)
                await fieldWrapper.validateField(isChecked);
              }}
            >
            {t('wallet.DepositFormConsent@@I have read and agree to the Promotion Terms and Conditions. We do not accept the type of deposit in the form of a cheque. All types of payments in the form of checks to our account will be ignored')}
            </CheckboxMark>
    </>)
})