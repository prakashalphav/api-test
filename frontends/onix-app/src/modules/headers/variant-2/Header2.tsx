import {
  component$,
  Resource,
  useStylesScoped$,
  useStyles$,
  useSignal,
  useOn,
  $
} from "@builder.io/qwik";
import { useCommonViewData } from "~/hooks/app/useCommonViewData";
import styles from "./Header2.scss?inline";
import MainNav from "./partials/header-main-nav/variant-1/HeaderMainNav2";

import { useLoginModal } from "../../../hooks/business/useLoginModal";
import { useRegisterModal } from "../../../hooks/business/useRegisterModal";
import { useGetBalance } from "~/hooks/utils/useGetBalance";

import { useDateTime, useHeader } from "../../../hooks/business/useHeader";
import { useGamesTransferMenu } from "~/hooks/business/useGamesTransferMenu";
import { useTransactionMenu } from "~/hooks/business/useTransactionMenu";
import { useUsrBalWalletMenu } from "~/hooks/business/useUsrBalWalletMenu";

import GamesTransferMenu from "~/modules/games-transfer-menu/variant-1/GamesTransferMenu1";
import TransacationMenu from "~/modules/transaction-menu/variant-1/TransactionMenu1";
import WalletMenu from "~/modules/wallet-menu/variant-1/WalletMenu1";

import { inlineTranslate } from "qwik-speak";
import { BurgerMenu } from "~/components/icons/BurgerMenu";
import { LockIcon } from "~/components/icons/Lock";
import { ClockIcon } from "~/components/icons/Clock";
import { Promotion2Icon } from "~/components/icons/Promotion2";
import { DownloadAppIcon } from "~/components/icons/DownloadApp";
import { ShareIcon } from "~/components/icons/Share";
import { LiveHelpIcon } from "~/components/icons/LiveHelp";
import { ArrowDownIcon } from "~/components/icons/ArrowDown";
import { ArrowUpIcon } from "~/components/icons/ArrowUp";
import {
  getCountryCodeByLang,
  useLangMenu,
} from "~/hooks/business/useLangMenu";
import LanguageMenu from "~/components/language-menu/variant-1/LanguageMenu1";
import { extendProtocol } from "~/utils/sysUtils";
import { useServerTimeLoader } from "~/routes/layout";
import { milisecondsToHMS } from "~/utils/common";
import { homeLogoBase } from "~/services/images";
import LazyImage from "~/components/image/LazyImage";
import { Game2Icon } from "~/components/icons/Game2";
import { ReloadIcon } from "~/components/icons/Reload";
import { ArrowDown2Icon } from "~/components/icons/ArrowDown2";
import { WalletIcon } from "~/components/icons/Wallet";
import { priceFormat } from "~/utils/formatters/priceFormat";
import { TransactionIcon } from "~/components/icons/Transaction";
type Props = {
  contactLinks?: any;
  zIndex: number;
  isAuth: boolean; 
  hideLoginBtn?: boolean;
};
export default component$((props: Props) => {
  useStylesScoped$(styles);
  const t = inlineTranslate();

  const { showLangMenu, toggleLangMenu ,currLang } = useLangMenu();
  const { toggleModalQRL: toggleLoginQRL } = useLoginModal();
  const { toggleModalQRL: toggleRegQRL } = useRegisterModal();
  const { toggleSideNavQRL, toggleProfilePopupQRL, toggleTrxPopupQRL } =
    useHeader();

  const {commonData} = useCommonViewData();
  const { ms, timeToShow, gmtLabel } = useDateTime();

  useOn( "qvisible", $(() => {
    console.log("run on qvisible Header2" );
    const timer = setInterval(() => {
      ms.value += 1000;
      timeToShow.value = milisecondsToHMS(ms.value) + gmtLabel.value;
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }));

  const { currentBalance, actionGetBal } = useGetBalance(
    commonData.website_settings?.currencyCode + " " + commonData.user_bal
  );

  const { toggleGamesTransMenu } = useGamesTransferMenu();
  const { toggleTransMenu } = useTransactionMenu();
  const { toggleWalletMenu } = useUsrBalWalletMenu();

  return (
    <>
      <div class={`header relative `} style={"z-index:" + props.zIndex + ";"}>
        <div  class={`hidden lg:block max-w-screen`}>
          <div class="grid grid-cols-3 md:grid-cols-4 items-center">
            <div class="col-span-1  ">
              <a class="  sm:px-3 logo animate fade-in-bottom" href="/">
                <LazyImage
                  src={homeLogoBase + commonData.website_settings?.websiteLogo}
                  height={70}
                  width={180}
                ></LazyImage>
                {/* <picture>
                      <source
                        srcSet="/images/dummy_images/onix/desktop/Logo.avif 1x"
                        type="image/avif"
                        width="181"
                        height="46"
                      />
                      <source
                        srcSet="/images/dummy_images/onix/desktop/Logo.webp 1x"
                        type="image/webp"
                        width="181"
                        height="46"
                      />
                      <img
                        src="/images/dummy_images/onix/desktop/Logo.png"
                        alt="A description of the image."
                        width="181"
                        height="46"
                        class="max-h-[40px] lg:max-h-[47px] w-auto"
                        loading="lazy"
                        decoding="async"
                      />
                    </picture> */}
              </a>
            </div>
            <div class="col-span-2 md:col-span-3 gap-4 flex items-center justify-end mr-4 text-xs">
           
              <a
                href="/promotions/"
                class="rounded-full border w-fit p-2 pl-7 relative labelPromoNBonus navItem"
              >
                <div class="rounded-full w-10 h-10 absolute -top-1 -left-4 flex-center iconPromoNBonus">
                  <Promotion2Icon class="w-5 h-5"></Promotion2Icon>
                </div>
                {t('app.Promotions and Bonuses@@Promotions and Bonuses')}
              </a> 
              <div class="flex-center">
                <ClockIcon class="w-4 h-4"></ClockIcon>{" "}
                <span class="ml-1">{timeToShow.value}</span>
              </div>
              {props.isAuth && (   <> 
              <div
                class="mr-1 flex-center relative"
              >
                <div class="flex-center cursor-pointer" onClick$={() => {
                  actionGetBal.value = true;
                }}>
                   <div class="walletIcon  rounded-full p-2 flex-center">
                    <WalletIcon class="w-4 h-4"></WalletIcon>
                    </div>
                    <Resource
                      value={currentBalance}
                      onPending={() => <div>Loading...</div>}
                      onRejected={() => <div>Error</div>}
                      onResolved={(balance) => (
                        <>
                          <span class="px-1 pr-2"> 
                       {   priceFormat( balance  , {
                                        prefix: `${commonData.website_settings.currencyCode}`,
                                        centsLimit: 2,
                                      }) 
                                    }
                          </span>
                        </>
                      )}
                    />
                    <div class="mr-2">
                      <ReloadIcon></ReloadIcon>
                    </div>
                </div>
                <div class="text-xxxs cursor-pointer" onClick$={async()=>{
                  await toggleWalletMenu();
                }}>
                  <ArrowDown2Icon />
                </div>
                <WalletMenu />
             </div>

           
            <button type="button" class=" flex-center mr-1 relative" onClick$={async()=>{
              await toggleGamesTransMenu();
            }}> 
              <div class="walletIcon  rounded-full p-2 flex-center">
              <Game2Icon class="w-4 h-4"></Game2Icon> 
              </div>
              <span class="px-1 pr-2">{t('app.Game transfer@@Game transfer')}</span>
              <div class="text-xxxs"><ArrowDown2Icon></ArrowDown2Icon></div>
              <GamesTransferMenu   ></GamesTransferMenu>
            </button>


            <button type="button" class=" flex-center mr-1 relative" onClick$={async()=>{
              await toggleTransMenu();
            }}> 
              <div class="walletIcon  rounded-full p-2 flex-center">
              <TransactionIcon class="w-4 h-4"></TransactionIcon> 
              </div>
              <span class="px-1 pr-2">{t('app.Transaction@@Transaction')}</span>
              <div class="text-xxxs"><ArrowDown2Icon></ArrowDown2Icon></div>
              <TransacationMenu   ></TransacationMenu>
            </button>
            </>)}
            {!props.isAuth && (   <> 
              <a
                href={commonData?.website_settings?.apk_url || ""}
                class="flex-center navItem"
              >
                <DownloadAppIcon class="w-4 h-4"></DownloadAppIcon>{" "}
                <span class="ml-1">  {t('app.Download App@@Download App')}</span>
              </a>
              {commonData.website_settings?.isOffReferralMenu != '1' &&
                <a class="flex-center navItem" href="/referral/">
                  <ShareIcon class="w-4 h-4"></ShareIcon>{" "}
                  <span class="ml-1"> {t('app.Refer Friend@@Refer Friend')}</span>
                </a>
              }
              </>)}
              <a
                href={extendProtocol(commonData?.website_settings?.chatUrl)}
                target="_blank"
                class="flex-center navItem"
              >
                <LiveHelpIcon class="w-4 h-4"></LiveHelpIcon>
                <span class="ml-1">{t('app.Live Help@@Live Help')}</span>
              </a>
              <div class="animate fade-in-bottom dropdown relative  ">
                <div
                  class="inline-flex items-center cursor-pointer navItem"
                  onClick$={() => toggleLangMenu()}
                >
                  <span class="w-4 h-4">
                    <img
                      src={`https://files.sitestatic.net/assets/imgs/country-flags/${getCountryCodeByLang(
                        currLang
                      )}.png`}
                      loading="lazy"
                      decoding="async"
                      width="28"
                      height="28"
                    />
                  </span>
                  <span class="px-2">{currLang}</span>
                  {showLangMenu.value ? (
                    <ArrowUpIcon class="w-3 h-3" />
                  ) : (
                    <ArrowDownIcon class="w-3 h-3" />
                  )}
                </div>
                {showLangMenu.value && (
                  <>
                    <LanguageMenu
                      class={`popUpMenu  right-0 top-0  absolute`}
                      langOpts={commonData.agent_lang_opts}
                       currLang={currLang}
                    ></LanguageMenu>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Header   - Mobile */}

        <div class="surfaceTop fixed  w-full z-10 p-2 grid grid-cols-3 lg:hidden ">
          <button
            class="text-2xl col-span-1"
            type="button"
            onClick$={toggleSideNavQRL}
          >
            <BurgerMenu></BurgerMenu>
          </button>
          <a
            class="  sm:px-3  logo flex-center animate fade-in-bottom col-span-1"
            href="/"
          >
            <LazyImage
              src={
                homeLogoBase + commonData.website_settings?.websiteLogo_mobile
              }
              height={53}
              width={181}
            ></LazyImage>
          </a>

          {!props.isAuth && !props.hideLoginBtn && (
            <button
              class="loginBtn rounded-full w-fit px-4 text-xs block lg:hidden  col-span-1 justify-self-end"
              type="button"
              onClick$={toggleLoginQRL}
            >
               {t("app.Join@@Join")}
            </button>
          )}
          {props.isAuth && (
            <button
              class="rounded-full flex items-center justify-end"
              onClick$={toggleProfilePopupQRL}
            >
              <p class="flex-center rounded-full p-1 bg-white">
                <img
                  src="/images/dummy_images/profile_pic_2.png"
                  width="24"
                  height="24"
                />
              </p>
            </button>
          )}
        </div>

        <div class="relative -z-1 w-full h-0 blkPadding lg:hidden"></div>

        {/* Header Inner - Mobile */}
        {props.isAuth && (
          <>
            <div class="grid grid-cols-2 lg:hidden w-full p-2 text-xs contentInner">
              <div
                class="col-span-1 flex items-center"
                onClick$={() => {
                  actionGetBal.value = true;
                }}
              >
                <div class="walletIcon   flex-center rounded-full  p-2">
                  <WalletIcon></WalletIcon>
                </div>
                <div class="flex-center mx-2">
                  <Resource
                    value={currentBalance}
                    onPending={() => <div>Loading...</div>}
                    onRejected={() => <div>Error</div>}
                    onResolved={(balance) => (
                      <>
                        {priceFormat(balance, {
                          prefix: `${commonData.website_settings.currencyCode}`,
                          centsLimit: 2,
                        })}
                      </>
                    )}
                  />
                </div>
                <ReloadIcon class="iconAction"></ReloadIcon>
              </div>
              <div class="col-span-1 relative">
                <button
                  onClick$={async () => {
                    await toggleGamesTransMenu();
                  }}
                  class=" w-full  flex items-center justify-end "
                >
                  <div class="walletIcon  rounded-full p-2 flex-center">
                    <Game2Icon class="   "></Game2Icon>
                  </div>
                  <div class="inline-grid align-middle mx-1 ">
                    {t("app.Game transfer@@Game transfer")}
                  </div>
                  <div class="inline-grid align-middle text-xxxs">
                    <ArrowDown2Icon></ArrowDown2Icon>
                  </div>
                </button>
                <GamesTransferMenu></GamesTransferMenu>
              </div>
            </div>
          </>
        )}

        <MainNav
          class={`-z-10 hidden lg:block relative max-w-screen`}
          contactLinks={props.contactLinks}
          platform={"PC"}
          isAuth={props.isAuth}
          isOnCustomMenu1={commonData.website_settings.isOnCustomMenu}
          isOnCustomMenu2={commonData.website_settings.isOnCustomMenu2}
        ></MainNav>
        {/* Header Top */}
      </div>
    </>
  );
});
