import {
  component$,
  useStylesScoped$,
  type Signal,
  useContext,
} from "@builder.io/qwik";

import { FieldWrapperContext } from "~/components/form-field-wrapper/FormFieldWrapper1";
import SelectDropDown from "~/components/select-drop-down/variant-2/SelectDropDown2";
import type { PropFunction } from "@builder.io/qwik";
import type { _PayOpt } from "~/hooks/business/useDeposit";
import type { AgentTrxBank, AgentTrxNewFund } from "~/services/types";
type Props = {
  intMethod: number;
  site_bank_list: AgentTrxBank[];
  newFundMethodList?: AgentTrxNewFund[];
  getManualFundValue$: PropFunction<(item: AgentTrxBank) => void>;
  getManualFundText$: PropFunction<(item: _PayOpt) => void>;
  onManualFundChg$: PropFunction<(value: string) => void>;
  getManualFundId$: PropFunction<(item: _PayOpt) => void>;
};
export default component$((props: Props) => {
  const fieldWrapper = useContext(FieldWrapperContext);

  const ewalletList = (props.newFundMethodList?.length?props.newFundMethodList  : []).filter((item) => {
    return item.method === 7;
  })||[];
  const pulsaList =  (props.newFundMethodList?.length?props.newFundMethodList  : []).filter((item) => {
    return item.method === 6;
  })||[];
  return (
    <>
      <SelectDropDown
        id="banks-select"
        placeholder="Select"
        disabled={false}
        selectionList={
          props.intMethod === 5
            ? props.site_bank_list
            : props.intMethod === 7
            ? ewalletList
            : props.intMethod === 6
            ? pulsaList
            : []
        }
        cbValue$={props.getManualFundValue$}
        cbText$={props.getManualFundText$}
        onChange$={async (value) => {
          await props.onManualFundChg$(value);
          await fieldWrapper.validateField();
        }}
        cbSelected$={props.getManualFundId$}
      ></SelectDropDown>
    </>
  );
});
