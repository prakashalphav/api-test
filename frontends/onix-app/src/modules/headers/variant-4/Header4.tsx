import {
  component$,
  useSignal,
  Resource,
  useStylesScoped$, $} from "@builder.io/qwik";
import { useCommonViewData } from "~/hooks/app/useCommonViewData";
import styles from "./Header4.scss?inline";
import MainNav from "./partials/header-main-nav/variant-1/HeaderMainNav4";
import MainNav1 from "~/modules/main-nav/variant-3/MainNav3";
import { useLoginModal } from "../../../hooks/business/useLoginModal";
import { useRegisterModal } from "../../../hooks/business/useRegisterModal";
import { useGetBalance } from "~/hooks/utils/useGetBalance";
import { useOptions, useHeader } from "../../../hooks/business/useHeader";
import { inlineTranslate } from "qwik-speak";
import { BurgerMenu } from "~/components/icons/BurgerMenu";
import { BurgerMenu1 } from "~/components/icons/BurgerMenu1";
import { UserIcon } from "~/components/icons/User1";
import {CloseIcon} from '~/components/icons/Close';
import { ArrowDownIcon } from "~/components/icons/ArrowDown";
import { ArrowUpIcon } from "~/components/icons/ArrowUp";
import { useTransactionMenu } from "~/hooks/business/useTransactionMenu";
import { useUsrBalWalletMenu } from "~/hooks/business/useUsrBalWalletMenu";
import TransacationMenu from "~/modules/transaction-menu/variant-2/TransactionMenu2";
import WalletMenu from "~/modules/wallet-menu/variant-2/WalletMenu2";
import ProfilePopup from "~/modules/profile-popup/variant-2/ProfilePopup2";
import {
  getCountryCodeByLang,
  useLangMenu,
} from "~/hooks/business/useLangMenu";
import LanguageMenu from "~/components/language-menu/variant-1/LanguageMenu1";
import { homeLogoBase } from "~/services/images";
import LazyImage from "~/components/image/LazyImage";
import { WalletIcon } from "~/components/icons/Wallet3";
import { priceFormat } from "~/utils/formatters/priceFormat";
import Announcement from "~/components/announcement/variant-1/Announcement1";
import { Announcement3Icon } from "~/components/icons/Announcement3";
import ProfileAvatar from "~/components/profile-avatar/variant-1/ProfileAvatar1";
import ApkDownload from "~/components/apk-download/variant-3/ApkDownload3";
 
import { useHelpPopup } from "~/hooks/business/useSideNav";
import { useComplaintModal } from "~/hooks/business/useComplaintForm";
  
import { TransactionIcon } from "~/components/icons/Transaction2";
import { EmailIcon } from "~/components/icons/Email2";
import { useLocation } from "@builder.io/qwik-city";
import { isHomePage } from "~/utils/common";
import SideNonAuthOptions from '~/modules/side-options/variant-1/SideNonAuthOptions1';



type Props = {
  contactLinks?: any;
  zIndex: number;
  isAuth: boolean;
  memberLevel?: string;
  username?: string;
  isHideApkDownload?: boolean;
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
  const {isShowOptions, optionsEle, toggleOptionsQRL,parentOptions} = useOptions();
  const { toggleModalQRL: toggleComplaintQRL } = useComplaintModal();

  const {commonData} = useCommonViewData();

  const { currentBalance, actionGetBal } = useGetBalance(
    commonData.website_settings?.currencyCode + " " + commonData.user_bal
  );
  const { toggleTransMenu } = useTransactionMenu();
  const { toggleWalletMenu } = useUsrBalWalletMenu();
  const loc = useLocation();
  const isHomePg = isHomePage(loc.url.pathname );
  const showBtnApkDownload = useSignal<boolean>(props.isHideApkDownload  === true ? false : (isHomePg ? true : false )  );
  const onApkHiddenQRL = $(() => {
    showBtnApkDownload.value = false;
    // Find the element by its ID
    const blkPaddingElement = document.getElementById("blkPadding");
    if (blkPaddingElement) // Remove the class from the element
    blkPaddingElement.classList.remove("showApkDownload");
});
  return (
    <>
       <div class={` header relative`}    style={"z-index:" + props.zIndex + ";"}>

{/* Header Top */}
<div
 
class={`surfaceTop header w-full fixed lg:relative  z-10`}

> 


{showBtnApkDownload.value && (
            <ApkDownload
              onHideApkDownload$={onApkHiddenQRL}
              class="sm:hidden"
            ></ApkDownload>
          )}    
         
         

          <div class="max-w-screen">
          <div class="grid grid-cols-7 gap-2 items-center py-2">
          <div class="col-span-3 lg:col-span-1 flex gap-2" >
                <button
                  class="text-2xl lg:hidden block sideMenuBtn"
                  type="button"
                  onClick$={toggleSideNavQRL}
                >
                  <BurgerMenu></BurgerMenu>
                </button>
                <a class="logo animate fade-in-bottom flex items-center" href="/">
                  <LazyImage
                    src={homeLogoBase + commonData.website_settings?.websiteLogo}
                    height={60}
                    width={180}
                    class={"max-h-9 lg:max-h-16 lg:h-full lg:py-1 w-auto"}
                  ></LazyImage>
                </a>
                
              
              </div>
          <div class={`announcementWrapper hidden lg:block relative after:absolute after:bg-red after:right-0 after:top-0 after:w-1/4 after:h-full ${props.isAuth ? 'col-span-3 ' :' col-span-4' }`}>
          {isHomePg && (<>
            <Announcement
              icon={Announcement3Icon}
                    annoucement={commonData?.annoucement}
                    class="  mx-auto flex items-center pl-4 p-2 w-full"
            ></Announcement>
             </> )}
          </div>
        
          <div class={`col-span-4 ${props.isAuth ? ' lg:col-span-3 ' :' lg:col-span-2' }`}>
          {!props.isAuth && (<>
          <div class="lg:hidden flex justify-end">
                
                  <button class="rounded w-fit px-2.5 py-2 relative loginBtn flex items-center gap-2 font-sm font-medium" onClick$={toggleLoginQRL}> 
                  <UserIcon></UserIcon>
                  {t('app.Login@@Login')}
                  </button>
                  <button class="rounded w-fit px-2.5 py-2  registerBtn font-xs font-semibold" onClick$={toggleRegQRL}>{t('app.Register@@Register')}</button>
                
          </div>
            </>
            )}
          <div class="flex justify-end items-center gap-2">
        

          {props.isAuth && (   <> 
              <div
                class="mr-1 flex-center relative walletBtn rounded px-2 lg:px-3 py-1"
              >
                <div class="flex-center cursor-pointer" onClick$={() => {
                  actionGetBal.value = true;
                }}>
                   <div class="walletIcon rounded-full p-1 flex-center text-base lg:text-xl">
                    <WalletIcon></WalletIcon>
                    </div>
                    <Resource
                      value={currentBalance}
                      onPending={() => <div>Loading...</div>}
                      onRejected={() => <div>Error</div>}
                      onResolved={(balance) => (
                        <>
                          <span class="px-1 pr-2 text-xs lg:text-sm"> 
                       {   priceFormat( balance  , {
                                        prefix: `${commonData.website_settings.currencyCode}`,
                                        centsLimit: 2,
                                      }) 
                                    }
                          </span>
                        </>
                      )}
                    />
                  
                </div>
                <div class="text-xxxs cursor-pointer" onClick$={async()=>{
                  await toggleWalletMenu();
                }}>
                  <ArrowDownIcon />
                </div>
                <WalletMenu />
             </div>

           
        

             <div class="hidden lg:block">
            <button type="button" class="  flex-center mr-1 rounded px-3 py-1 relative transactionBtn " onClick$={async()=>{
              await toggleTransMenu();
            }}> 
              <div class="walletIcon rounded-full p-1 flex-center text-xl">
              <TransactionIcon></TransactionIcon> 
              </div>
              <span class="px-1 pr-2">{t('app.Transaction@@Transaction')}</span>
              <div class="text-xxxs"><ArrowDownIcon></ArrowDownIcon></div>
              <TransacationMenu   ></TransacationMenu>
            </button>
            </div>

            <button
                      type="button"
                      class="flex-center relative "
                      style={/*here need put zIndex same as its child element ProfilePopup else Header elements not overlayed by the popup*/`z-index:50;`}
                      onClick$={toggleProfilePopupQRL}
                    >
                      <div class="flex items-center">
                        <ProfileAvatar
                          class=""
                          memberLevel={props.memberLevel || ""}
                        ></ProfileAvatar>
                        <span class="lg:pl-3 pl-2 px-1 w-fit hidden lg:block" >{props?.username}</span>
                        <div class="text-xxxs ml-1 hidden lg:block"><ArrowDownIcon></ArrowDownIcon></div>
                      </div>
                      <ProfilePopup
                zIndex={50}
              ></ProfilePopup>
                    </button>
                    
            </>)}
            {!props.isAuth && (<>
            <div class="hidden lg:block">
            {commonData.website_settings?.isOffReferralMenu != '1' &&
            <a class="items-center" href="/referral/">
                  <span class="ml-1">{t("app.Referral@@Referral")}</span>
                </a>
             }
            <a class="items-center mr-2"
                  href="/promotions/"
                >
                  <span class="ml-1"> {t("app.Promo@@Promo")}</span>
                </a>

              </div>
                 </>)}
                 
                <div class="hidden lg:block animate fade-in-bottom dropdown relative  inline-flex ml-2">
                  <div
                    class="inline-flex items-center cursor-pointer langDropdown p-2 rounded"
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
                    <span class="px-2">{currLang.toUpperCase()}</span>
                    {showLangMenu.value ? (
                      <ArrowUpIcon class="w-3 h-3" />
                    ) : (
                      <ArrowDownIcon class="w-3 h-3" />
                    )}
                  </div>
                  {showLangMenu.value && (
                    <>
                      <LanguageMenu
                        class={`popUpMenu  right-0 top-0  absolute `}
                        langOpts={commonData.agent_lang_opts}
                        currLang={currLang}
                      ></LanguageMenu>
                    </>
                  )}
                </div>
          </div>
          </div>
          </div>
          </div>
          
          <div class=" headerWrapper  lg:relative lg:-z-10">
          <div class="lg:px-1 lg:hidden relative w-full">
          <MainNav1 ></MainNav1>
          </div>
          
            <div class="max-w-screen grid grid-cols-4 gap-2 items-center h-full">
             <div class="col-span-3">
             <MainNav
          class={`-z-10 hidden lg:block`}
          contactLinks={props.contactLinks}
          platform={"PC"}
          isAuth={props.isAuth}
          isOnCustomMenu1={commonData.website_settings.isOnCustomMenu}
          isOnCustomMenu2={commonData.website_settings.isOnCustomMenu2}
        ></MainNav>
        {/* Header Top */}
             </div>
              <div class="col-span-1 lg:block hidden">
              <div class="flex items-center lg:gap-4 gap-2 justify-end relative">
             


                

                {/* login & register btn */}
                {!props.isAuth && (<>
                  <button class="rounded-lg w-fit px-5 py-3 relative loginBtn flex items-center gap-2" onClick$={toggleLoginQRL}> 
                  <UserIcon></UserIcon>
                  {t('app.Login@@Login')}
                  </button>
                  <button class="rounded-lg w-fit px-5 py-3  registerBtn" onClick$={toggleRegQRL}>{t('app.Register@@Register')}</button>
                  </>
                )}

              {props.isAuth && commonData.website_settings?.is_allow_complaint_form == '1' && (<>
                <button class="rounded-lg w-fit px-4 py-2 relative loginBtn flex items-center gap-2" onClick$={toggleComplaintQRL}> 
                  <EmailIcon class="text-xl"></EmailIcon>
                  {t('app.Complaint@@Complaint')}
                  </button>
                    </>
                )}


                <button ref={parentOptions} class="rounded-full  ml-3 flex-center contactBtn" onClick$={toggleOptionsQRL}>
                {isShowOptions.value && (<CloseIcon class="w-5 h-5"></CloseIcon>)}
                {!isShowOptions.value && (<BurgerMenu1 class="w-5 h-5"></BurgerMenu1>)}
                </button>
                {/* option btn box */}
     {isShowOptions.value && (
         <SideNonAuthOptions optionsEle={optionsEle} contactLinks={props.contactLinks} zIndex={-20}></SideNonAuthOptions>
     )}
              </div>
              </div>
            </div>
          </div>
        </div>

        <div id="blkPadding" class={`relative -z-10 w-full h-0 blkPadding lg:hidden ${showBtnApkDownload.value ? 'showApkDownload' : ''}`}></div>

       
      </div>
    </>
  );
});
