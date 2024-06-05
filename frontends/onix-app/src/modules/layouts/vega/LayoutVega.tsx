import { 
    component$,
    useStylesScoped$,useStyles$,
    Slot, 
  } from "@builder.io/qwik";

  import moduleStyles from "./LayoutVega.scss?inline";

import { makeContactLinks, extendProtocol } from "~/utils/sysUtils"; 
import { useCommonViewData } from "~/hooks/app/useCommonViewData";
  import Header from "~/modules/headers/variant-3/Header3";
  import SideNav from "~/modules/side-nav/variant-1/SideNav1";
  import ProfilePopup from "~/modules/profile-popup/variant-2/ProfilePopup2";
  import WalletPopup from "~/modules/wallet-popup/variant-1/WalletPopup1";
  import HelpPopup from "~/modules/help-popup/variant-1/HelpPopup1";
import Footer from "~/modules/footer/variant-3/Footer3";
import BottomBar from "~/modules/bottom-bar/variant-3/BottomBar3";
import { useLocation } from "@builder.io/qwik-city";
import { isHomePage } from "~/utils/common";

  export default component$(() => {
    useStyles$(moduleStyles); 
    const {commonData} = useCommonViewData();
   const contactLinks = makeContactLinks(commonData?.babysite_cs_contacts);
   const loc = useLocation();
   const isHomePg = isHomePage(loc.url.pathname );
    return (
   <>
     <header class="relative ">
        <Header zIndex={49} contactLinks={contactLinks}
            memberLevel={commonData.member_level}
            username={commonData.user_name}
        isAuth={commonData.isAuth || false}></Header>
        
        <SideNav
                zIndex={50}
                isAuth={commonData.isAuth || false}
                username={commonData.user_name}
                memberLevel={commonData.member_level}
                email={commonData.user_email}
                isOnCustomMenu1={commonData.website_settings.isOnCustomMenu}
                isOnCustomMenu2={commonData.website_settings.isOnCustomMenu2}
                 
                contactLinks= {contactLinks}
        ></SideNav>

      <div class="relative max-w-screen--xs-full ">
       <ProfilePopup
                zIndex={50}
              ></ProfilePopup>
          <WalletPopup
            zIndex={50}
            userBal={commonData.user_bal}
            userRefBal={commonData.user_ref_wallet_bal}
            currencyCode={commonData.website_settings.currencyCode}
          ></WalletPopup>

            <HelpPopup
                  zIndex={50}
                  classDesktop={'!right-72 top-24'}
                  chatUrl={extendProtocol(commonData?.website_settings?.chatUrl)}
                ></HelpPopup>
            </div>
     </header>
     <main class={`relative  ${isHomePg ? 'homePg' : ''}  `} id="pageContent" >
              <Slot />
            
       </main>
        <footer class="">
          {commonData && (
            <Footer
              websiteLogo={
                commonData.website_settings.websiteLogo
                  ? `https://files.sitestatic.net/ImageFile/` +
                    commonData.website_settings.websiteLogo +
                    `?v=1.0`
                  : `/images/dummy_images/ug_sports_desktop.png`
              }
            ></Footer>
          )}
        </footer>
                  
        <BottomBar
          zIndex={40}
          class="lg:hidden"
          isAuth={commonData.isAuth || false}
          livechatUrl={commonData.website_settings.chatUrl || ""}
        ></BottomBar>
   </>)

    });