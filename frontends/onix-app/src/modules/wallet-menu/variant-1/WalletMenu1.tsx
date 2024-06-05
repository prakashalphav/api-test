import {
  Resource,
  component$,
  useSignal,
  useStylesScoped$,
  useStyles$,
} from "@builder.io/qwik";
import styles from "./WalletMenu1.scss?inline";

import ArrowRight2Icon from "~/components/icons/ArrowRight2";
import { WalletIcon } from "~/components/icons/Wallet";

import { useUsrBalWallet } from "~/hooks/business/useUsrBalWalletMenu";
import { priceFormat } from "~/utils/formatters/priceFormat";
import { useCommonViewData } from "~/hooks/app/useCommonViewData";
import Tooltip from "~/components/tooltip/variant-1/Tooltip1";
import { RefreshIcon } from "~/components/icons/Refresh";
import { ArrowUp2Icon } from "~/components/icons/ArrowUp2";
import { ReloadIcon } from "~/components/icons/Reload";
import { useGetBalance } from "~/hooks/utils/useGetBalance";

import { isString } from "~/utils/common";
import { TRANSFER_WALLET_GAME_CODES } from "~/utils/constants/constants";
import {
    inlineTranslate,  
  } from 'qwik-speak';
  
type Props = {
  class?: string;
};

export default component$((props: Props) => {
  useStylesScoped$(styles);
  const t = inlineTranslate();

  const {
    showMenu,
    // hkbBalance,
    // currentBalance, 
    // refreshGameBal,
    // actionGetBal,
    // onTransferFrGame,
    ref
  } = useUsrBalWallet();

  const {commonData} = useCommonViewData();
  const { currentBalance, actionGetBal, currentRefBalance, actionGetRefBal } = useGetBalance(
    commonData.website_settings?.currencyCode + " " + commonData.user_bal,
    commonData.website_settings?.currencyCode + " " + commonData.user_ref_wallet_bal,
  );
  return (
    <>
 
      {showMenu.value && (
        <Tooltip  id="walletMenu1ToolTip" ref={ref} class="wallet-menu rounded-md w-max" position={"bottom-right"} size={"lg"}  style={`min-width: 245px;`}>
            <>
              <div
                class="wallet-menu-row grid grid-cols-2 gap-2 mb-2"
                onClick$={() => {
                  actionGetBal.value = true;
                }}
              >
                <div class="">
                  {t("app.Game Wallet@@Game Wallet")}
                </div>
                <div class="flex justify-between items-center gap-2">
                  <Resource
                    value={currentBalance}
                    onPending={() => <div>Loading...</div>}
                    onRejected={() => <div>Error</div>}
                    onResolved={(balance) => (
                      <>
                        <span class="px-1 pr-2"> 
                          {
                            priceFormat(balance, {
                              prefix: `${commonData.website_settings.currencyCode}`,
                              centsLimit: 2,
                            }) 
                          }
                        </span>
                      </>
                    )}
                  />
                  <ReloadIcon></ReloadIcon>
                </div>
              </div> 
              <div
                class="wallet-menu-row grid grid-cols-2 gap-2"
                onClick$={() => {
                  actionGetRefBal.value = true;
                }}
              >
                <div class="">
                  {t("app.Referral Wallet@@Referral Wallet")}
                </div>
                <div class="flex justify-between items-center gap-2">
                  <Resource
                    value={currentRefBalance}
                    onPending={() => <div>Loading...</div>}
                    onRejected={() => <div>Error</div>}
                    onResolved={(balance) => (
                      <>
                        <span class="px-1 pr-2"> 
                          {
                            priceFormat(balance, {
                              prefix: `${commonData.website_settings.currencyCode}`,
                              centsLimit: 2,
                            }) 
                          }
                        </span>
                      </>
                    )}
                  />
                  <ReloadIcon></ReloadIcon>
                </div>
              </div> 
          </>
        </Tooltip>
      )}
    </>
  );
});
