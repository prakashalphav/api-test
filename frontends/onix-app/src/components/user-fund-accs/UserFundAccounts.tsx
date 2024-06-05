import { component$, useStylesScoped$, type Signal, useContext } from "@builder.io/qwik";
import type { DepoFormData2, PayOpt } from "~/hooks/business/useDeposit";

import type { UserBank } from "~/services/types";
import type { PropFunction } from "@builder.io/qwik"; 
import Checkbox from "~/components/checkbox/variant-1/Checkbox1";
import { CreditCardIcon } from "~/components/icons/CreditCard";
import { PulsaIcon } from "~/components/icons/Pulsa";
import { WalletIcon } from "~/components/icons/Wallet";
import { FUND_METHOD_BANK, FUND_METHOD_CRYPTO, FUND_METHOD_EWALLET, FUND_METHOD_PULSA } from "~/utils/constants/constants";
import { FieldWrapperContext } from "~/components/form-field-wrapper/FormFieldWrapper1";
import styles from "./UserFundAccounts.scss?inline";
import {
  inlineTranslate,  
} from 'qwik-speak';
type Props = {
  selPayOpt?: Signal<PayOpt>;
 // dr: DepoFormData2;
  userBanks:  UserBank[]; 
  onChgUserWallet$: PropFunction<(item: UserBank) => void>;
  selUserWallet: Signal<UserBank | null>;
};
export default component$((props: Props) => {
 
  let i = -1;
  const creditIconColors = [
    ["#FEAC73", "#FE964E"],
    ["#D83EFF", "#E994FF"],
    ["#EF4F50", "#F98585"],
    ["#2A54BF", "#739AFE"],
  ];
  useStylesScoped$(styles);
  const t = inlineTranslate();
  const fieldWrapper = useContext(FieldWrapperContext);
  return (
    <>
      <ul class="opt-list grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-4 max-h-[200px] my-1.5 overflow-y-auto scroller">
        {props.userBanks && props.userBanks.length && props.userBanks?.map((item) => {
          // if (item.method !== props.selPayOpt.value?.intMethod) {
          //   return <></>;
          // }
          i++;
          if (i > creditIconColors.length - 1) {
            i = 0;
          }
          return (
            <>
              <li
                class={
                  "pay-opt rounded-[10px] p-2 overflow-hidden " +
                  (props.selUserWallet.value?.id === item.id ? "active" : "")
                }
              >
                <Checkbox
                  key={item.id}
                  type="radio"
                  id={`cbx-5-${item.id}`}
                  name="bank_user_id"
                  value={item.id}
                  direction="flex-row"
                  onChange$={async () => {
                    await props.onChgUserWallet$(item);
                    console.log('fieldWrapper.validateField')
                    await fieldWrapper.validateField()
                  }}
                >
                  <div class="flex-center gap-4 leading-tight">
                    {/* pay-opt-img */}
                    <div class="text-2xl">
                      {item.method === FUND_METHOD_BANK && (
                        <CreditCardIcon
                          id={i.toString()}
                          color1={creditIconColors[i][0]}
                          color2={creditIconColors[i][1]}
                        ></CreditCardIcon>
                      )}{" "}
                      {item.method === FUND_METHOD_PULSA && (
                        <PulsaIcon></PulsaIcon>
                      )}
                      {item.method === FUND_METHOD_EWALLET && (
                        <WalletIcon></WalletIcon>
                      )}
                    </div>
                    <div class="min-w-0 flex-auto">
                      {/* pay-opt__name*/}
                      <p class="pay-opt__name text-xs font-semibold">
                        { t(item.method_name) + " " + item.provider_name}
                      </p>
                      <p class="text-xxs text-secondary">
                        {item.acc_no}
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
