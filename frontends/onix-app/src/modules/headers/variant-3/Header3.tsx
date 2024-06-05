import {
  component$,
  Resource,
  useStylesScoped$,
  useSignal} from "@builder.io/qwik";
import { useCommonViewData } from "~/hooks/app/useCommonViewData";
import styles from "./Header3.scss?inline";
import MainNav from "./partials/header-main-nav/variant-1/HeaderMainNav3";
import { useLoginModal } from "../../../hooks/business/useLoginModal";
import { useRegisterModal } from "../../../hooks/business/useRegisterModal";
import { useGetBalance } from "~/hooks/utils/useGetBalance";
import { useHeader } from "../../../hooks/business/useHeader";
import { inlineTranslate } from "qwik-speak";
import { BurgerMenu } from "~/components/icons/BurgerMenu";
import { ArrowDownIcon } from "~/components/icons/ArrowDown";
import { ArrowUpIcon } from "~/components/icons/ArrowUp";
import {
  getCountryCodeByLang,
  useLangMenu,
} from "~/hooks/business/useLangMenu";
import LanguageMenu from "~/components/language-menu/variant-1/LanguageMenu1";
import { homeLogoBase } from "~/services/images";
import LazyImage from "~/components/image/LazyImage";
import { WalletIcon } from "~/components/icons/Wallet";
import { priceFormat } from "~/utils/formatters/priceFormat";
import Announcement from "~/components/announcement/variant-1/Announcement1";
import { Announcement2Icon } from "~/components/icons/Announcement2";
import ProfileAvatar from "~/components/profile-avatar/variant-1/ProfileAvatar1";
import { ReloadIcon } from "~/components/icons/Reload";
import { useHelpPopup } from "~/hooks/business/useSideNav";
import { useComplaintModal } from "~/hooks/business/useComplaintForm";
import { isMobileDevice } from "~/utils/common";
import { useScrollTop } from "~/hooks/utils/useScrollTop";

type Props = {
  contactLinks?: any;
  zIndex: number;
  isAuth: boolean;
  memberLevel?: string;
  username?: string;
};
export default component$((props: Props) => {
  useStylesScoped$(styles);
  const t = inlineTranslate();

  const { showLangMenu, toggleLangMenu,currLang  } = useLangMenu();
  const { showHelpPopup  } = useHelpPopup();
  const { toggleModalQRL: toggleLoginQRL } = useLoginModal();
  const { toggleModalQRL: toggleRegQRL } = useRegisterModal();
  const { toggleSideNavQRL, toggleProfilePopupQRL, toggleWalletPopupQRL, toggleHelpPopupQRL } =
    useHeader();
  const { toggleModalQRL: toggleComplaintQRL } = useComplaintModal();

  const {commonData} = useCommonViewData();
  const isMobile=   isMobileDevice(null, commonData.device );
  const { currentBalance, actionGetBal } = useGetBalance(
    commonData.website_settings?.currencyCode + " " + commonData.user_bal
  );

  const header = useSignal<HTMLDivElement>();
  useScrollTop(header, isMobile);

  return (
    <>
      <div class={`header relative `} style={"z-index:" + props.zIndex + ";"}>
        <div  class="block">
          <section class="announcementWrapper lg:block hidden">
            <div class=" max-w-screen--xs-full ">
              <Announcement
                icon={Announcement2Icon}
                      annoucement={commonData?.annoucement}
                      class="flex items-center p-2 w-full"
              ></Announcement>
            </div>
          </section>
         
          <section ref={header} class="headerWrapper w-full px-2 fixed lg:relative ">
            <div class="max-w-screen--xs-full  grid grid-cols-3 md:grid-cols-4 gap-2 items-center h-full">
              <div class="col-span-1 flex" style="height: inherit;">
                <button
                  class="text-2xl lg:hidden block"
                  type="button"
                  onClick$={toggleSideNavQRL}
                >
                  <BurgerMenu></BurgerMenu>
                </button>
                <a class="logo flex items-center" href="/">
                  <LazyImage
                    src={homeLogoBase + commonData.website_settings?.websiteLogo}
                    height={60}
                    width={180}
                    class={"lg:h-full lg:py-2 w-auto"}
                  ></LazyImage>
                </a>
              </div>
              <div class="col-span-2 md:col-span-3 lg:gap-4 gap-2 flex items-center justify-end lg:mr-4">
              {commonData.website_settings?.is_allow_complaint_form == '1' &&
              <button
                  class="lg:block hidden items-center"
                  type="button"
                  onClick$={toggleComplaintQRL}
                >
                  <span class="ml-1"> {t("app.Complaint@@Complaint")}</span>
                </button>
}

                <a class="lg:block hidden items-center"
                  href="/promotions/"
                >
                  <span class="ml-1"> {t("app.Promotions@@Promotions")}</span>
                </a>

                {commonData.website_settings?.isOffReferralMenu != '1' &&
                  <a class="lg:block hidden items-center" href="/referral/">
                    <span class="ml-1">{t("app.Referral@@Referral")}</span>
                  </a>
                }

                <button
                  class="lg:flex hidden items-center"
                  onClick$={toggleHelpPopupQRL}
                >
                  <span class="mr-2">{t('app.Help@@Help')}</span>
                  {showHelpPopup.value ? (
                      <ArrowUpIcon class="w-3 h-3" />
                    ) : (
                      <ArrowDownIcon class="w-3 h-3" />
                    )}
                </button>


                {/* lang menu */}
                <div class="lg:block hidden dropdown relative  ">
                  <div
                    class="inline-flex items-center cursor-pointer langMenu"
                    onClick$={() => toggleLangMenu()}
                  >
                    <span class="w-4 h-4 mr-2">
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

                {/* login & register btn */}
                {!props.isAuth && (<>
                  <button class="rounded-lg w-fit px-6 py-3 loginBtn" onClick$={toggleLoginQRL}> {t('app.Login@@Login')}</button>
                  <button class="rounded-lg w-fit px-6 py-3 relative registerBtn" onClick$={toggleRegQRL}>{t('app.Register@@Register')}</button>
                  </>
                )}

              {props.isAuth && (<>
                  <button
                       
                        type="button"
                        class="lg:mr-1 flex-center walletWrapper rounded-full pl-2 p-1 "
                      >
                      
                        <Resource
                          value={currentBalance}
                          onPending={() => <div>Loading...</div>}
                          onRejected={() => <div>Error</div>}
                          onResolved={(balance) => (
                            <>
                              <span class="px-1 lg:pr-2 walletBalanceText truncate"> 
                          {   priceFormat( balance  , {
                                            prefix: `${commonData.website_settings.currencyCode}`,
                                            centsLimit: 2,
                                          }) 
                                        }
                              </span>
                            </>
                          )}
                        />
                      <div  onClick$={() => {
                            actionGetBal.value = true;
                          }}
                          class="walletReloadBtn lg:pr-2 pr-1 flex-center"><ReloadIcon></ReloadIcon></div>
                      <div class="walletIcon  rounded-full p-2 flex-center"
                       onClick$={toggleWalletPopupQRL}>
                        <WalletIcon class="w-4 h-4"></WalletIcon>
                        </div>
                </button>
                  <button
                      type="button"
                      class="flex-center"
                      onClick$={toggleProfilePopupQRL}
                    >
                      <div class="flex items-center">
                        <ProfileAvatar
                          class=""
                          memberLevel={props.memberLevel || ""}
                        ></ProfileAvatar>
                        <span class="lg:pl-3 pl-2 px-1 w-fit hidden lg:block" >{props?.username}</span>
                      </div>
                    </button>
                    </>
                )}
              </div>
            </div>
          </section>
        </div>

        <div class="relative -z-10 w-full h-0 blkPadding lg:hidden"></div>

        <MainNav
          class={`-z-10 hidden lg:block relative`}
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
