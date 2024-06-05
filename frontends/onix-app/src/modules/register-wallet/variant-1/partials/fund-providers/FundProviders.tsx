import type { PropFunction } from "@builder.io/qwik";
import { component$, type Signal, useContext, useStylesScoped$ } from "@builder.io/qwik";
import { FieldWrapperContext } from "~/components/form-field-wrapper/FormFieldWrapper1";
import styles from "./FundProviders.scss?inline";
import {
  FUND_METHOD_NAMES,
  FUND_METHOD_BANK,
  FUND_METHOD_EWALLET,
} from "~/utils/constants/constants";
import type { FundMethod, RegisterWalletData } from "~/services/types";

import type { FundOpt } from "~/hooks/business/useRegisterWallet";

import { CreditCardIcon } from "~/components/icons/CreditCard";

import Checkbox from "~/components/checkbox/variant-1/Checkbox1";

type Props = {
  selMethod: Signal<FundMethod>;
  rw: RegisterWalletData;
  selFundOpt: Signal<FundOpt>;
  onChgFundOpt$: PropFunction<(item: FundOpt) => void>;
  providerFieldName : string;// "new_bank" default 
};
export default component$((props: Props) => {

  useStylesScoped$(styles);
  const fieldWrapper = useContext(FieldWrapperContext);
  const creditIconColors = [
    ["#FEAC73", "#FE964E"],
    ["#FEAC73", "#FE964E"],
    ["#D83EFF", "#E994FF"],
    ["#EF4F50", "#F98585"],
    ["#2A54BF", "#739AFE"],
  ];

  let i = 0;
  return (
    <>
      <ul class="opt-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[200px] my-1.5 overflow-y-auto scroller pr-2">
        {props.selMethod.value === FUND_METHOD_BANK &&  props.rw.agent_banks?.length &&
          props.rw.agent_banks.map((item) => {
            i++;
            if (i > creditIconColors.length - 1) {
              i = 0;
            }
            return (
              <>
                <li
                  class={
                    "pay-opt rounded-[10px] p-2 overflow-hidden " +
                    (props.selFundOpt.value?.id.$oid === item.id.$oid
                      ? "active"
                      : "")
                  }
                >
                  <Checkbox
                    type="radio"
                    id={`cbx-5-${item.id.$oid}`}
                    name={props.providerFieldName}
                    value={item.bank_name}
                    direction="flex-row"
                    onChange$={async () => {
                      await props.onChgFundOpt$(item);
                      await fieldWrapper.validateField();
                    }}
                  >
                    <div class="flex-center gap-4 leading-tight">
                      {/* pay-opt-img */}
                      <div class="text-2xl">
                        <CreditCardIcon
                          id={i.toString()}
                          color1={creditIconColors[i][0]}
                          color2={creditIconColors[i][1]}
                        ></CreditCardIcon>
                      </div>
                      <div class="min-w-0 flex-auto">
                        {/* pay-opt__name*/}
                        <p class="pay-opt__name text-xs font-semibold">
                          {item.bank_name}
                        </p>
                      </div>
                    </div>
                  </Checkbox>
                </li>
              </>
            );
          })}
        {props.selMethod.value === FUND_METHOD_EWALLET &&
          Object.entries(props.rw.new_fund_banks_list).map(([key, item]) => {
            i++;
            if (i > creditIconColors.length - 1) {
              i = 0;
            }
            return (
              <>
                <li
                  class={
                    "pay-opt rounded-[10px] p-2  " +
                    (props.selFundOpt.value?.id.$oid === item.id.$oid
                      ? "active"
                      : "")
                  }
                >
                  <Checkbox
                    type="radio"
                    id={`cbx-${key}-${item.id.$oid}`}
                    name={props.providerFieldName}
                    value={item.provider_name}
                    direction="flex-row"
                    onChange$={async () => {
                      await props.onChgFundOpt$(item);
                      await fieldWrapper.validateField();
                    }}
                  >
                    <div class="flex-center gap-4 leading-tight">
                      {/* pay-opt-img */}
                      <div class="text-2xl">
                        <CreditCardIcon
                          id={i.toString()}
                          color1={creditIconColors[i][0]}
                          color2={creditIconColors[i][1]}
                        ></CreditCardIcon>
                      </div>
                      <div class="min-w-0 flex-auto">
                        {/* pay-opt__name*/}
                        <p class="pay-opt__name text-xs font-semibold">
                          {item.provider_name}
                        </p>
                      </div>
                    </div>
                  </Checkbox>
                </li>
              </>
            );
          })}
      </ul>
    </>
  );
});
