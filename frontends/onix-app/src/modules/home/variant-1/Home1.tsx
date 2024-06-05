import { component$, useStylesScoped$,useStyles$, Resource } from "@builder.io/qwik";
import styles from "./Home1.scss?inline";
import moduleStyles from "../Home.scss?inline";

import Slider from "~/components/banner-sliders/variant-2/Slider2";
import WithdrawListSlider from "~/components/trx-list-sliders/variant-3/WithdrawListSlider3";
import DepositListSlider from "~/components/trx-list-sliders/variant-3/DepositListSlider3";
import PromosSlider from "~/components/trx-list-sliders/variant-3/PromosSlider";

import HkbLotteryResultSlider from "~/components/hkb-lottery-result-sliders/variant-1/HkbLotteryResultSlider1";
import GridGamesSlider from "~/components/games-sliders/grid-v3/GamesSlider5";
import { useLoginModal } from "~/hooks/business/useLoginModal";
import { useRegisterModal } from "~/hooks/business/useRegisterModal";
import ContactsBox from "~/components/contacts-box/variant-2/ContactsBox2";
import MainNav from "~/modules/main-nav/variant-2/MainNav2"; 
import ProviderGameItem from "~/components/game-box-provider/variant-4/GameBoxProvider4";
// import ProvidersSlider from "~/components/provider-sliders/variant-1/Slider1";
import { useGetHomeData } from "~/routes";
import { useHome } from "~/hooks/business/useHome";
import Jackpot from "~/components/jackpot/variant-3/Jackpot3";
import Announcement from "~/components/announcement/variant-1/Announcement1";
import { makeContactLinks } from "~/utils/sysUtils";
import { AnnouncementIcon } from "~/components/icons/Announcement";

import {
  inlineTranslate,  
} from 'qwik-speak';
import { isMobileDevice } from "~/utils/common";

/*remove this if CMP does not have props*/
// type Props = {

// };
export default component$(() => {
  useStyles$(moduleStyles);
  useStylesScoped$(styles);
  const homeResource = useGetHomeData();
  const { commonData: cd, homeData } = homeResource.value;
  const { toggleModalQRL: toggleLoginQRL } = useLoginModal();
  const { toggleModalQRL: toggleRegQRL } = useRegisterModal();
  const t = inlineTranslate();
  const contactLinks = makeContactLinks(cd.d?.babysite_cs_contacts);
  const isMobile=isMobileDevice(null,cd.d?.device );
  const {
    hotGameList,
    newGameList,
    recommendList,
    onSelCategoryQRL,
    selMenu,
    tabMenus,
    popupBanner,
  } = useHome({ cd, homeData });
  return (
    <>

      <section class="max-w-screen--xs-full">
        <Slider
         isAuth={cd.d?.isAuth || false}
        //  apkUrl = {cd.d?.website_settings.apk_url||""}
          webTitle={cd.d?.website_settings.webTitle || ""}
          banners={cd.d?.babysite_sliding_banners || []}
          isMobile={isMobile} 
          isHideContent={true}
        ></Slider>
      </section>
   
   <section class="max-w-screen--xs-full">
   <Announcement
        icon={AnnouncementIcon}
              annoucement={cd.d?.annoucement}
              class="flex items-center p-2 w-full lg:hidden"
      ></Announcement>
    </section>

      {!cd.d?.isAuth && (
        <section class="lg:hidden">
          <div class="flex">
            <button
              class="w-1/2 py-2 btnSecondary"
              onClick$={toggleLoginQRL}
              type="button"
            >
              {t('app.Login@@Login')}
            </button>
            <button
              class="w-1/2 py-2 btn"
              type="button"
              onClick$={toggleRegQRL}
            >
             {t('app.Register@@Register')}  
            </button>
          </div>
        </section>
      )}

<section class="px-1 my-4 lg:hidden">
                  <MainNav class={`mainNav__home`}></MainNav>
                </section>

      <div class="">
        {/* <section class=" my-10  2xl:max-w-[1536px] mx-auto " id="providers"> 
          <Resource
            value={homeResource}
            onPending={() => <div>Loading...</div>}
            onRejected={() => <div>Error</div>}
            onResolved={() => (
              <>
                <ProvidersSlider providers={recommendList}></ProvidersSlider>
              </>
            )}
          />
        </section> */}
    
        <section class="mt-8 lg:mt-16 mb-16  max-w-screen mx-auto ">
          <h2
            class="sectionTitle__home  mb-4 title font-bold text-2xl md:text-3xl text-center animate"
            anime-name="fade-in-bottom"
          >
                 {t('home.TOGEL RESULTS@@TOGEL RESULTS')}  
          </h2>
          <div id="hkb-results">
            <HkbLotteryResultSlider
              class={`lotteryResults__home`}
              parentId="#hkb-results"
              results={homeData.d.hkb_lottery_results}
            ></HkbLotteryResultSlider>
          </div>
        </section>

        <section class="text-center my-4  flex flex-col md:flex-row    gap-16 md:gap-4 lg:gap-8   mx-auto  max-w-screen ">
          <div id="hot-games">
            <h2 class="sectionTitle__home  my-3 md:my-5    font-bold text-2xl md:text-3xl text-center xl:text-left animate slide-in-bottom   ">
              {t('app.Popular@@Popular')} {t('app.Games@@Games')} 
            </h2>

            <div class="grid-games animate slide-in-bottom ">
              <GridGamesSlider
                providerGameBoxCmp={ProviderGameItem}
                tag="POPULAR GAME"
                parentId="#hot-games"
                gameList={hotGameList || []}
                class=""
              ></GridGamesSlider>
            </div>
          </div>
          <div id="new-games">
            <h2 class="sectionTitle__home  my-3 md:my-5    font-bold text-2xl md:text-3xl text-center xl:text-left animate slide-in-bottom">
            {t('app.New@@New')} {t('app.Games@@Games')}  
            </h2>
            <div class="grid-games animate slide-in-bottom ">
              <GridGamesSlider 
                providerGameBoxCmp={ProviderGameItem}
                tag="HOT GAME"
                parentId="#new-games"
                gameList={newGameList || []}
              ></GridGamesSlider>
            </div>
          </div>
        </section>

        {cd.d?.website_settings.progressive_img && 
        <section class="my-16" >  
            <Jackpot  class="px-4 2xl:px-0" isMobile = {isMobile} progressive_img={cd.d?.website_settings.progressive_img} progressive_img_mobile={cd.d?.website_settings.progressive_img_mobile} currencyCode={cd.d?.website_settings.currencyCode} ></Jackpot>
        </section> }
        {homeData.d?.promos && homeData.d.promos.length && (
          <section class=" my-16 md:my-32   max-w-screen mx-auto ">
            <h2
              class="sectionTitle__home  mb-8  title font-bold text-2xl md:text-3xl text-center animate"
              anime-name="fade-in-bottom"
            >
              {t('events.Promotions@@Promotions')} 
            </h2>
            <div id="promos">
              <PromosSlider
                class={`promos__home`}
                parentId="#promos"
                promos={homeData.d.promos}
              ></PromosSlider>
            </div>
          </section>
        )}
        

          {/* last transactions */}
          { ((homeData.d?.last_withdrawals &&
              homeData.d?.last_withdrawals.length > 0)  || (homeData.d?.last_deposits &&
                homeData.d?.last_deposits.length > 0)) &&   <div class="relative w-full  py-16 md:py-16 js-aos">
          {/* background */}
          { !isMobile && (<>
            <div
            class="hidden lg:block absolute -z-10 left-0 top-0 animate  "
            anime-name="slide-in-tl"
          >
            <svg
              width="1400"
              height="600"
              class="lg:max-w-4xl xl:max-w-5xl 2xl:max-w-full"
              viewBox="0 0 1617 728"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.7"
                d="M16.6569 0.523438H425L1617 18.5234L0.363281 727.443L16.6569 0.523438Z"
                fill="url(#lwd-gradient)"
              />
              <defs>
                <linearGradient
                  id="lwd-gradient"
                  x1="1594.84"
                  y1="0.523472"
                  x2="0.363288"
                  y2="488.754"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop class="gradient__brand-secondary" />
                  <stop
                    class="gradient__brand"
                    offset="0.806513"
                    stop-opacity="0"
                  />
                </linearGradient>
              </defs>
            </svg>
           </div>   
          </>) } 
          {/* background */}
          <div
            class="hidden lg:block absolute -z-10 right-0 top-0 animate "
            anime-name="slide-in-br"
          >
            <svg
              width="1400"
              height="500"
              class="lg:max-w-4xl xl:max-w-5xl 2xl:max-w-full"
              viewBox="0 0 1920 750"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.7"
                d="M1641.18 0.527344L2001.63 749.503H-81.6284L1641.18 0.527344Z"
                fill="url(#lwd-gradient1)"
              />
              <defs>
                <linearGradient
                  id="lwd-gradient1"
                  x1="1973.07"
                  y1="0.52738"
                  x2="13.1645"
                  y2="751.097"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop class="gradient__brand-secondary" />
                  <stop
                    class="gradient__brand"
                    offset="0.806513"
                    stop-opacity="0"
                  />
                </linearGradient>
              </defs>
            </svg>
          </div>  

          <section class="trxs px-3 lg:max-w-5xl mx-auto relative">
            {homeData.d?.last_withdrawals &&
              homeData.d?.last_withdrawals.length > 0 && (
                <div class="js-aos mb-8">
                  <h2
                    class="sectionTitle__home   mb-2  title font-bold text-2xl md:text-3xl text-center animate"
                    anime-name="fade-in-bottom"
                  >
                      {t('home.Latest Winners@@Latest Winners')} 
                  </h2>
                  <div
                    id="trxs-withdraw"
                    class="animate trxs-slider"
                    anime-name="fade-in-bottom"
                  >
                    <WithdrawListSlider
                      list={homeData.d?.last_withdrawals}
                      parentId="#trxs-withdraw"
                    ></WithdrawListSlider>
                  </div>
                </div>
              )}
            {homeData.d?.last_deposits &&
              homeData.d?.last_deposits.length > 0 && (
                <div class="js-aos">
                  <h2
                    class="sectionTitle__home   mb-4  title font-bold text-2xl md:text-3xl text-center animate"
                    anime-name="fade-in-bottom"
                  >
                    {t('home.Latest Deposits@@Latest Deposits')} 
                  </h2>
                  <div
                    id="trxs-deposit"
                    class="animate trxs-slider"
                    anime-name="fade-in-bottom"
                  >
                    <DepositListSlider
                      list={homeData.d?.last_deposits}
                      parentId="#trxs-deposit"
                    ></DepositListSlider>
                  </div>
                </div>
              )}
          </section>
        </div> }
        <section class="my-16 md:my-20  px-3 container mx-auto  overflow-hidden text-center flex flex-col  md:flex-row items-center justify-evenly contacts-container js-aos">
          <div
            class="text-center md:text-left animate "
            anime-name="fade-in-bottom"
          >
            <h2 class="my-5 marker: font-bold  text-3xl md:text-4xl  sectionTitle__home  ">
              <span class="sectionTitle__home--accent">24/7</span>  {t('home.Customer Support@@Customer Support')} 
            </h2>
            <p class="my-3 md:mb-28  text-secondary text-lg md:text-2xl">
              {t('home.Talk to us@@Talk to us! How Can We Help?')} 
            </p>
          </div>
          <div class="flex-center">
            <ContactsBox class={'contacts__home'} contactLinks={contactLinks}></ContactsBox>
          </div>
        </section>
      </div>

    
    </>
  );
});
