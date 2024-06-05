import { component$, Resource, useOnDocument, useStylesScoped$, $ } from "@builder.io/qwik";
import styles from "./WalletPopup1.scss?inline";
import { useWalletPopup } from "../../../hooks/business/useSideNav";
import { WalletIcon } from "../../../components/icons/Wallet";
import { useGetBalance } from "~/hooks/utils/useGetBalance";
import { priceFormat } from "~/utils/formatters/priceFormat";
import { inlineTranslate } from "qwik-speak";
import { Deposit2Icon } from "~/components/icons/Deposit2";
import { Withdraw2Icon } from "~/components/icons/Withdraw2";
import { StatementIcon } from "~/components/icons/Statement3";
import { GameTransferIcon } from "~/components/icons/GameTransfer";
import { useGamesTransfer } from "~/hooks/business/useGamesTransferMenu";
import { ArrowUp2Icon } from "~/components/icons/ArrowUp2";
import { isString } from "~/utils/common"; 
import { isServer } from "@builder.io/qwik/build";

type Props = {
  zIndex: number;
  userBal?: string;
  userRefBal?: string;
  currencyCode?: string;
};
export default component$((props: Props) => {
  useStylesScoped$(styles);
  const t=  inlineTranslate();
  const { actionGetBal, currentBalance, actionGetRefBal, currentRefBalance  } = useGetBalance(
    props?.currencyCode + " " + props?.userBal,
    props?.currencyCode + " " + props?.userRefBal
  );
  const {
    hkbBalance,
    currentBalance: currentHKBBalance, 
    refreshGameBal,
    actionGetBal : actionGetHKBBal,
    onTransferFrGame,
    hasHkbGame  } = useGamesTransfer();
    
    const { showWalletPopup, walletPopup } =
    useWalletPopup();

    
    useOnDocument( "DOMContentLoaded", $(async ( ) => {
      if(isServer){
        return ;
      }
      refreshGameBal("hkb_lottery");
    }));
  
  return (
    <>
      {showWalletPopup.value && (
        <>
          <div
            class="lg:hidden fixed inset-0 transition-opacity bg-black bg-opacity-40 "
            style={"z-index:" + props.zIndex + ";"}
          />
          <div ref={walletPopup}>
        
            <aside
              class={`lg:!right-36 sm:right-4 right-12 walletPopUpMenu overflow-hidden absolute h-auto mt-1 block rounded-xl`}
              style={"z-index:" + props.zIndex + ";"}
            >
              <div class="p-2">
                <ul class="">
                  <li class="p-3 rounded-lg">
                    <a href="/deposit/" class="flex items-center menuTab">
                      <div class=" mr-3 icon text-lg">
                         <Deposit2Icon></Deposit2Icon>{" "}
                      </div>
                      <span class="">{t('app.Deposit@@Deposit')}</span>
                    </a>
                  </li>
                  <li class="p-3 rounded-lg">
                    <a href="/withdraw/" class="flex items-center menuTab">
                      <div class=" mr-3 icon text-lg">
                         <Withdraw2Icon></Withdraw2Icon>{" "}
                      </div>
                      <span class="">{t('app.Withdraw@@Withdraw')}</span>
                    </a>
                  </li>
                  <li class="p-3 rounded-lg">
                    <a href="/statement/" class="flex items-center menuTab">
                      <div class=" mr-3 icon text-lg">
                         <StatementIcon></StatementIcon>{" "}
                      </div>
                      <span class="">{t('app.Statement@@Statement')}</span>
                    </a>
                  </li>
                  <li class="p-3 rounded-lg">
                    <a href="/lastDirectTransfer/" class="flex items-center menuTab">
                      <div class=" mr-3 icon text-lg">
                        <StatementIcon></StatementIcon>{" "}
                      </div>
                      <span class="">{t('app.Last Direct Transfers@@Last Direct Transfers')}</span>
                    </a>
                  </li>
                  <li><div class="line"></div></li>
                  <li class="p-3 rounded-lg">
                    <div class="walletsTitle pt-2">{t('app.Wallets@@Wallets')}</div>
                    <ul class="pt-4 w-full">
                      <li class="pb-6">
                        <button class="menuTab flex flex-wrap flex-col gap-2 w-full"
                           onClick$={() => {
                            actionGetBal.value = true;
                          }}>
                          <div class="flex items-center gap-2 w-fit">
                            <div class="icon text-lg">
                              <WalletIcon></WalletIcon>{" "}
                            </div>
                            <span class="subMenu">{t('app.Game Wallet@@Game Wallet')}</span>
                          </div>
                          <div class="w-full break-words text-left ">
                            <Resource
                                value={currentBalance}
                                onPending={() => <div>Loading...</div>}
                                onRejected={() => <div>Error</div>}
                                onResolved={(balance) => <>     {   priceFormat( balance  , {
                                  prefix: `${props.currencyCode}`,
                                  centsLimit: 2,
                                }) 
                              }</>}
                              />
                          </div>
                        </button>
                      </li>

                      <li class="pb-6">
                        <button class="menuTab flex flex-wrap flex-col gap-2 w-full"
                           onClick$={() => {
                            actionGetRefBal.value = true;
                          }}>
                          <div class="flex items-center gap-2 w-fit">
                            <div class="icon text-lg">
                              <WalletIcon></WalletIcon>{" "}
                            </div>
                            <span class="subMenu">{t('app.Referral Wallet@@Referral Wallet')}</span>
                          </div>
                          <div class="w-full break-words text-left ">
                            <Resource
                                value={currentRefBalance}
                                onPending={() => <div>Loading...</div>}
                                onRejected={() => <div>Error</div>}
                                onResolved={(balance) => <>     {   priceFormat( balance  , {
                                  prefix: `${props.currencyCode}`,
                                  centsLimit: 2,
                                }) 
                              }</>}
                              />
                          </div>
                        </button>
                      </li>

                      {hasHkbGame && (
                        <li class="pb-6">
                        <button class="menuTab flex items-center text-left w-full"    
                                onClick$={ ()=>{
                                  refreshGameBal("hkb_lottery");
                          }}
                         >
                          <div class="flex flex-col gap-2">
                            <div class="flex items-center gap-2 w-fit">
                              <div class="icon text-lg">
                                <GameTransferIcon></GameTransferIcon>{" "}
                              </div>
                              <span class="subMenu">{t('app.Game Transfers@@Game Transfers')} (HKB)</span>
                            </div>
                            <div class="w-full break-words">
                              <Resource
                                value={hkbBalance}
                                onPending={() => <div>Loading...</div>}
                                onRejected={() => <div>Error</div>}
                                onResolved={(gameBalance) => (
                                    <>
                                    <span class="px-1 pr-2">
                                        {isString(gameBalance)
                                        ? gameBalance
                                        : priceFormat(gameBalance, {
                                            prefix: `${props.currencyCode}`,
                                            centsLimit: 0,
                                            })}
                                    </span>
                                    </>
                                )}
                                />
                            </div>
                          </div>
                          <div class="flex justify-end transferIcon ml-auto"
                           onClick$={async () => {
                            await onTransferFrGame("hkb_lottery" );
                            }}
                            ><ArrowUp2Icon></ArrowUp2Icon></div>
                        </button>
                        </li>
                      )}
                     
                    
                      {/* <li>
                        <button class="menuTab flex flex-wrap flex-col gap-2">
                          <div class="flex items-center gap-2 w-fit">
                            <div class="icon text-lg">
                              <WalletIcon></WalletIcon>{" "}
                            </div>
                            <span class="subMenu">{t('app.Referral Wallet@@Referral Wallet')}</span>
                          </div>
                          <div class="w-full break-words">$200,000</div>
                        </button>
                      </li> */}
                      
                    </ul>
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </>
      )}
    </>
  );
});
