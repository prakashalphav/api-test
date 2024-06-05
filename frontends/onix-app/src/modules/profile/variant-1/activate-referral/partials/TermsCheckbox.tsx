
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
            value="on"
            name="terms"
            id="terms"
            type="checkbox"
            onChange$={async(isChecked, e) => {
                const val = isChecked;
                // console.log('consent',  val)
                await fieldWrapper.validateField(val);
            }}
        >
            {t('app.By selecting the SUBMIT button@@By selecting the SUBMIT button')}
        </CheckboxMark>
    </>)
})