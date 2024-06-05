import {
  Resource,
  component$,
  useSignal,
  useStylesScoped$,
  useStyles$,
} from "@builder.io/qwik";
import styles from "./WalletMenu2.scss?inline";

import ArrowRight2Icon from "~/components/icons/ArrowRight2";
import { WalletIcon } from "~/components/icons/Wallet";

import { useUsrBalWallet } from "~/hooks/business/useUsrBalWalletMenu";
import { priceFormat } from "~/utils/formatters/priceFormat";
import { useCommonViewData } from "~/hooks/app/useCommonViewData";
import Tooltip from "~/components/tooltip/variant-1/Tooltip1";
import { RefreshIcon } from "~/components/icons/Refresh";
import { ArrowUp2Icon } from "~/components/icons/ArrowUp2";
import { ReloadIcon } from "~/components/icons/Reload";
import { WalletIcon } from "~/components/icons/Wallet4";
import { RefWalletIcon } from "~/components/icons/Wallet5";
import { useGetBalance } from "~/hooks/utils/useGetBalance";
import { useGamesTransfer } from "~/hooks/business/useGamesTransferMenu";
import GamesTransferMenu from "~/modules/games-transfer-menu/variant-2/GamesTransferMenu2";

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
  const {
  hasTransferWalletGame
  } = useGamesTransfer();

  const {commonData} = useCommonViewData();
  const { currentBalance, actionGetBal, currentRefBalance, actionGetRefBal } = useGetBalance(
    commonData.website_settings?.currencyCode + " " + commonData.user_bal,
    commonData.website_settings?.currencyCode + " " + commonData.user_ref_wallet_bal,
  );
  return (
    <>
 
      {showMenu.value && (<div>
        <Tooltip id="walletMenu2ToolTip" ref={ref} class="wallet-menu rounded-md w-max" position={"bottom-right"} size={"lg"}  style={`min-width: 245px;`}>
            <>
            <div class="wallet-menu-wrap p-2 rounded-lg">
              <div
                class="wallet-menu-row flex items-center  gap-2"
                onClick$={() => {
                  actionGetBal.value = true;
                }}
              >
                <span class="text-3xl mr-1"> <WalletIcon></WalletIcon></span>
                <div class="">
                  <div class="block">
                  {t("app.Game Wallet@@Game Wallet")}
                  </div>
                  
                  <Resource
                    value={currentBalance}
                    onPending={() => <div>Loading...</div>}
                    onRejected={() => <div>Error</div>}
                    onResolved={(balance) => (
                      <>
                        <span class="font-medium amtText"> 
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
                
                </div>
                <span class="reload-icon ml-auto">
                  <ReloadIcon></ReloadIcon>
                  </span>
              </div> 
              <div class="line my-2"></div>
              <div
                class="wallet-menu-row flex items-center gap-2"
                onClick$={() => {
                  actionGetRefBal.value = true;
                }}
              >
                <span class="text-3xl mr-1"> <RefWalletIcon></RefWalletIcon></span>
                <div class="">
                  
                  <div class="block">{t("app.Referral Wallet@@Referral Wallet")}</div>
                  <Resource
                    value={currentRefBalance}
                    onPending={() => <div>Loading...</div>}
                    onRejected={() => <div>Error</div>}
                    onResolved={(balance) => (
                      <>
                        <span class="font-medium amtText"> 
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
                </div>
                <span class="reload-icon ml-auto">
                  <ReloadIcon></ReloadIcon>
                  </span>
              </div> 
              </div> 
              
              {hasTransferWalletGame && <>
              <div class="wallet-menu-wrap p-2 rounded-lg mt-2">
              <GamesTransferMenu></GamesTransferMenu>
              </div>
              </>
              }
          </>
        </Tooltip>
     
        </div>
      )}
    </>
  );
});
