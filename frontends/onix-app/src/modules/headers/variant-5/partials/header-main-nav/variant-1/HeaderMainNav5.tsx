import { component$, Resource, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./HeaderMainNav5.scss?inline";
import { useCommonViewData } from "~/hooks/app/useCommonViewData";
import { inlineTranslate } from "qwik-speak";
import { useHeader } from "~/hooks/business/useHeader";
import { useMainNav1Mapping } from "~/hooks/business/useHeader";
import { CloseIcon } from "~/components/icons/Close";
import { OptionIcon } from "~/components/icons/Option";
import { useOptions } from "~/hooks/business/useHeader";
import { useLoginModal } from "~/hooks/business/useLoginModal";
import { useRegisterModal } from "~/hooks/business/useRegisterModal";
import { useGetBalance } from "~/hooks/utils/useGetBalance";
import { WalletIcon } from "~/components/icons/Wallet";
import { priceFormat } from "~/utils/formatters/priceFormat";
import ProfileAvatar from "~/components/profile-avatar/variant-1/ProfileAvatar1";
import { ReloadIcon } from "~/components/icons/Reload";
import TransacationMenu from "~/modules/transaction-menu/variant-1/TransactionMenu1";
import { ArrowDown2Icon } from "~/components/icons/ArrowDown2";
import { TransactionIcon } from "~/components/icons/Transaction";
import { useTransactionMenu } from "~/hooks/business/useTransactionMenu";
import { capitalize } from "~/utils/common";
import GamesProviderImage from "~/components/provider-images/variant-1/ProviderImages1";
import SideNonAuthOptions from "~/modules/side-options/variant-1/SideNonAuthOptions1";
import SideProfileOptions from "~/modules/side-options/variant-1/SideProfileOptions1";

type Props = {
  contactLinks?: any;
  platform: string;
  isOnCustomMenu1?: string | number;
  isOnCustomMenu2?: string | number;
  isAuth: boolean;
  class?: string;
  memberLevel?: string;
  username?: string;
};

export default component$((props: Props) => {
  useStylesScoped$(styles);
  const { commonData } = useCommonViewData();
  const t = inlineTranslate();
  const { navMenuMap } = useMainNav1Mapping();
  const { toggleModalQRL: toggleLoginQRL } = useLoginModal();
  const { toggleModalQRL: toggleRegQRL } = useRegisterModal();
  const { toggleTransMenu } = useTransactionMenu();

  const { currentBalance, actionGetBal } = useGetBalance(
    commonData.website_settings?.currencyCode + " " + commonData.user_bal
  );

  const { toggleWalletPopupQRL } = useHeader();

  const {
    isShowOptions: isShowProfileOptions,
    optionsEle: profileOptionsEle,
    toggleOptionsQRL: toggleProfileOptionsQRL,
    parentOptions: parentProfileOptions,
  } = useOptions();
  const { isShowOptions, optionsEle, toggleOptionsQRL, parentOptions } =
    useOptions();

  return (
    <>
      <div class={`headerMainNav ${props.class}`}>
        <div class="content rounded-br-lg flex relative max-w-screen--xs-full gap-5">
          <div
            class="hidden lg:flex flex-nowrap w-full gap-5 scroller overflow-auto"
            style="min-width:0"
          >
            {Object.values(commonData.categories).map(function (
              category: string
            ) {
              const menuData = navMenuMap.get(category);

              return (
                <>
                  <div class="group col-span-1">
                    {/* Links */}
                    <a
                      href={menuData.href}
                      class="flex-center h-full group-hover:font-bold group-hover:before:block before:hidden navItem"
                    >
                      {category === "slots"}
                      {category === "sports"}
                      {category === "cassino"}
                      {category === "p2p"}
                      {category === "lottery"}
                      {category === "fish shooting"}
                      {category === "e-games"}
                      {category === "cockfight"}

                      {capitalize(menuData.name)}

                      {menuData.isHot && (
                        <span class=" hotLabel ml-1" style="font-size:10px;">
                          HOT
                        </span>
                      )}
                    </a>
                    <div class="group-hover:block hidden z-10 absolute w-full h-fit top-16 left-0">
                      <div class="contentInner">
                        <div
                          class="overflow-auto scroller"
                          style="height:358px;"
                        >
                          <div class="grid grid-cols-6 gap-6 px-10">
                            <GamesProviderImage
                              providersList={Object.values(
                                commonData.games_data[category]
                              )}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>

          <div class="flex col-span-2 md:col-span-3 lg:gap-4 gap-2 items-center rounded-br-lg w-full lg:w-auto">
            {/* login & register btn */}
            <div class="ml-auto flex gap-2">
              {!props.isAuth && (
                <>
                  <button
                    class="loginBtn leading-normal text-xxs sm:text-base font-medium rounded-full px-3 sm:px-6 py-1 sm:py-1.5 border"
                    onClick$={toggleLoginQRL}
                  >
                    {t("app.Login@@Login")}
                  </button>
                  <button
                    class="regBtn leading-normal text-xxs sm:text-base font-medium rounded-full px-3 sm:px-6 py-1 sm:py-1.5 transition-transform"
                    onClick$={toggleRegQRL}
                  >
                    {t("app.Register@@Register")}
                  </button>
                </>
              )}
            </div>

            {props.isAuth && (
              <>
                {/* Wallet */}
                <button
                  type="button"
                  class="lg:mr-1 flex-center border border-slate-800 rounded-full"
                >
                  <div
                    class="walletIcon rounded-full bg-slate-900 flex-center border border-white"
                    onClick$={toggleWalletPopupQRL}
                  >
                    <WalletIcon class="w-7 h-7 p-2"></WalletIcon>
                  </div>
                  <Resource
                    value={currentBalance}
                    onPending={() => <div>Loading...</div>}
                    onRejected={() => <div>Error</div>}
                    onResolved={(balance) => (
                      <>
                        <span class="px-1 lg:pr-2 walletBalanceText truncate">
                          {priceFormat(balance, {
                            prefix: `${commonData.website_settings.currencyCode}`,
                            centsLimit: 2,
                          })}
                        </span>
                      </>
                    )}
                  />
                  <div
                    onClick$={() => {
                      actionGetBal.value = true;
                    }}
                    class="walletReloadBtn lg:pr-2 pr-1 flex-center"
                  >
                    <ReloadIcon></ReloadIcon>
                  </div>
                </button>

                {/* Transction */}
                <button
                  type="button"
                  class="flex-center relative border border-slate-800 rounded-full"
                  onClick$={async () => {
                    await toggleTransMenu();
                  }}
                >
                  <div class="walletIcon rounded-full bg-slate-900 flex-center border border-white">
                    <TransactionIcon class="w-7 h-7 p-2"></TransactionIcon>
                  </div>
                  <span class="px-2">{t("app.Transaction@@Transaction")}</span>
                  <div class="text-[0.5rem] pr-2">
                    <ArrowDown2Icon></ArrowDown2Icon>
                  </div>
                  <TransacationMenu></TransacationMenu>
                </button>

                {/* Profile */}
                <button
                  type="button"
                  class="flex-center relative"
                  ref={parentProfileOptions}
                  onClick$={toggleProfileOptionsQRL}
                >
                  <div class="">
                    <ProfileAvatar
                      class="border border-white"
                      memberLevel={props.memberLevel || ""}
                    ></ProfileAvatar>
                    <span class="lg:pl-3 pl-2 px-1 w-fit hidden lg:block">
                      {props?.username}
                    </span>
                  </div>
                </button>
              </>
            )}

            {/* Contact btn */}
            <button
              ref={parentOptions}
              class="hidden lg:block rounded-full w-10 h-10 p-3 contactBtn"
              onClick$={toggleOptionsQRL}
            >
              {isShowOptions.value && (
                <CloseIcon class="w-full h-full"></CloseIcon>
              )}
              {!isShowOptions.value && (
                <OptionIcon class="w-full h-full"></OptionIcon>
              )}
            </button>

            {/* option btn box */}
            {isShowOptions.value && (
              <SideNonAuthOptions
                optionsEle={optionsEle}
                contactLinks={props.contactLinks}
                zIndex={-20}
              ></SideNonAuthOptions>
            )}
            {/* end of option btn box */}

            {/* option btn box */}
            {isShowProfileOptions.value && (
              <SideProfileOptions
                optionsEle={profileOptionsEle}
                zIndex={-20}
              ></SideProfileOptions>
            )}
            {/* end of option btn box */}
          </div>

          <div class="roundDecoration w-4 h-12 sm:w-12 sm:h-14 border-2 rounded-tl-lg"></div>
        </div>
      </div>
    </>
  );
});
