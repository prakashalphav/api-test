import { 
    component$,
    useStylesScoped$,useStyles$,
    Slot, 
  } from "@builder.io/qwik";

  import moduleStyles from "./LayoutGamingonnet.scss?inline";

import { makeContactLinks } from "~/utils/sysUtils"; 
import { useCommonViewData } from "~/hooks/app/useCommonViewData";
  import Header from "~/modules/headers/variant-5/Header5";
  import SideNav from "~/modules/side-nav/variant-1/SideNav1";
  import ProfilePopup from "~/modules/profile-popup/variant-1/ProfilePopup1";
import Footer from "~/modules/footer/variant-2/Footer2";
import BottomBar from "~/modules/bottom-bar/variant-2/BottomBar2";
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
     <header class="relative  ">
        <Header
          zIndex={49}
          contactLinks={contactLinks}
          isAuth={commonData.isAuth || false}
        ></Header>
        
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
     </header>
     <main class={`relative ${isHomePg ? 'homePg' : ''}  `} id="pageContent" >
              <Slot />
            
       </main>
        <footer class="max-screen-w-2xl">
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
        ></BottomBar>
   </>)

    });