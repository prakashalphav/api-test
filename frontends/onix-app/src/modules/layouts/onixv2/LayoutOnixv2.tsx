import { 
    component$,
    useStylesScoped$,useStyles$,
    Slot, 
  } from "@builder.io/qwik";
 
  import moduleStyles from "./LayoutOnixv2.scss?inline";
import { useCommonViewData } from "~/hooks/app/useCommonViewData"

import Header from "~/modules/headers/variant-1/Header1";
import SideNav from "~/modules/side-nav/variant-1/SideNav1";

import Footer from "~/modules/footer/variant-1/Footer1";
import BottomBar from "~/modules/bottom-bar/variant-1/BottomBar1";
import ProfilePopup from "~/modules/profile-popup/variant-1/ProfilePopup1";
import TransactionPopup from "~/modules/transaction-popup/variant-1/TransactionPopup1";
import { makeContactLinks } from "~/utils/sysUtils";
import { useLocation } from "@builder.io/qwik-city";
import { isHomePage } from "~/utils/common";
  export default component$(() => {
     useStyles$(moduleStyles); 

    const {commonData} = useCommonViewData();

    const contactLinks = makeContactLinks(commonData.babysite_cs_contacts);
    const loc = useLocation();
    const isHomePg = isHomePage(loc.url.pathname );
     return (
    <>
       <header class="relative  ">
              <Header
                websiteLogo={commonData.website_settings.websiteLogo}
                annoucement={commonData.annoucement}
                zIndex={40}
                isAuth={commonData.isAuth || false}
                memberLevel={commonData.member_level}
                userBal={commonData.user_bal}
                currencyCode={commonData.website_settings.currencyCode}
                username={commonData.user_name}
              />
             
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
              <ProfilePopup
                zIndex={50}
                username={commonData.user_name}
                memberLevel={commonData.member_level}
                userBal={commonData.user_bal}
                currencyCode={commonData.website_settings.currencyCode}
                email={commonData.user_email}
              ></ProfilePopup>
              <TransactionPopup zIndex={50}></TransactionPopup>
            </header>
            <main class={`relative  overflow-hidden  ${isHomePg ? 'homePg' : ''}  `} id="pageContent">
              <Slot />
              {/* <div
                id="sentinel"
                class="absolute w-1 h-1 top-[500px] left:0 -z-10"
              ></div> */}
            </main>
            <footer>
              {commonData && (
                <Footer
                  websiteLogo={
                    commonData.website_settings.websiteLogo
                      ? `https://files.sitestatic.net/ImageFile/` +
                        commonData.website_settings.websiteLogo +
                        `?v=1.0`
                      : `/images/dummy_images/ug_sports_desktop.png`
                  }
                  csContacts={commonData.babysite_cs_contacts}
                ></Footer>
              )}
            </footer>
          
            <BottomBar
              zIndex={40}
              isAuth={commonData.isAuth || false}
              livechatUrl={commonData.website_settings.chatUrl || ""}
              class="lg:hidden"
            ></BottomBar>
    </>)
  });