import {
  component$,
  useSignal,
  useStylesScoped$,
} from "@builder.io/qwik";
import styles from "./Home3.scss?inline";

import Slider from "~/components/banner-sliders/variant-2/Slider2";
 

import { useLoginModal } from "~/hooks/business/useLoginModal";
import { useRegisterModal } from "~/hooks/business/useRegisterModal";

import MainNav1 from "~/modules/main-nav/variant-1/MainNav1";


// import MainNav from "~/modules/main-nav/variant-2/MainNav2";
import ProviderSlider from '~/components/provider-sliders/variant-2/Slider2';
import { useGetHomeData } from "~/routes";
import { useHome } from "~/hooks/business/useHome";
import Jackpot from "~/components/jackpot/variant-3/Jackpot3";
import Announcement from "~/components/announcement/variant-1/Announcement1";
import { Announcement2Icon } from "~/components/icons/Announcement2";
import { inlineTranslate } from "qwik-speak";
import { flattenObjToArr, isMobileDevice } from "~/utils/common";

import LazyImage from "~/components/image/LazyImage";
import type { Provider } from "~/services/types";
import ProviderGamesSlider1 from "~/modules/games-lobby/games/variant-slider1/ProviderGamesSlider1";
import GameBoxProvider from "~/components/game-box-provider/variant-2/GameBoxProvider2";
import ArrowRight2 from "~/components/icons/ArrowRight2";
import { AndroidIcon } from "~/components/icons/Android";
import { SlotsColoredIcon } from "~/components/icons/SlotsColored";
import { NotificationIcon } from "~/components/icons/Notification2";
import { CasinoIcon } from "~/components/icons/Casino4";
import { GameIcon } from "~/components/icons/Game5";
import { ReferralIcon } from "~/components/icons/Referral3";
import { AffiliateProgramIcon } from "~/components/icons/AffiliateProgram";
import { PromotionGiftIcon } from "~/components/icons/PromotionGift3";
import { LiveHelpIcon } from "~/components/icons/LiveHelp2";
import LastTrxs from "~/components/last-trxs/variant-1/LastTrxs1";
import { CloseIcon } from "~/components/icons/Close";
import { DownloadIcon } from "~/components/icons/Download";

/*remove this if CMP does not have props*/
// type Props = {

// };
export default component$(() => {
  useStylesScoped$(styles);
  const homeResource = useGetHomeData();
  const { commonData: cd, homeData } = homeResource.value;
  const { toggleModalQRL: toggleLoginQRL } = useLoginModal();
  const { toggleModalQRL: toggleRegQRL } = useRegisterModal();
  const t = inlineTranslate();
  const isMobile = isMobileDevice(null, cd.d?.device);
  const hasLastWithdraw =
    homeData.d?.last_withdrawals && homeData.d?.last_withdrawals.length > 0;
  const hasLastDeposit =
    homeData.d?.last_deposits && homeData.d?.last_deposits.length > 0;
  const {
    hotGameList,
    newGameList,
    casinoGameList,
    popupBanner,
  } = useHome({ cd, homeData });
  const showBtnApkDownload = useSignal<boolean>(true);

  return (
    <>
 

      <section class="lg:hidden relative mainNavWrapper">
          <div class="max-w-screen--xs-full">
            <MainNav1 isShowIcon={true} ></MainNav1>
          </div>
        </section>

      <section class="max-w-screen--xs-full">
        <Slider
          isHideApkDownload={false} 
          isHideContent={true}
          isAuth={cd.d?.isAuth || false}
          // apkUrl={cd.d?.website_settings.apk_url || ""}
          webTitle={cd.d?.website_settings.webTitle||""}
          banners={cd.d?.babysite_sliding_banners || []}
          isMobile={isMobile}
        ></Slider>
      </section>

        <section class=" lg:hidden block py-2 px-4 w-full marqueeAnn">
          <div class="max-w-screen--xs-full">
            <Announcement
              icon={Announcement2Icon}
              annoucement={cd.d?.annoucement}
              class="flex items-center w-full text-xxs md:text-base "
            ></Announcement>
          </div>
        </section>
        
        {showBtnApkDownload.value &&
        <>
          <section class="lg:hidden block mt-3 downloadAppWrapper">
            <a target="_blank" href={cd.d?.website_settings.apk_url || "#"} class="max-w-screen--xs-full flex items-center  p-4 gap-2">
              <div onClick$={( )=>{ 
              showBtnApkDownload.value = false;
                }} >
                  <CloseIcon></CloseIcon>
              </div>
              <div style="color:#3CE138;">
                <AndroidIcon></AndroidIcon>
              </div>
              <div class="flex flex-col items-center gap-2">
                <div class="font-medium w-full">{cd.d?.website_settings.PageTitle} {t("home.Lite Download@@Lite Download")} </div>
                <div class="text-xs leading-none">{t("app.Download mobile app fast, light and secure@@Download mobile app fast, light and secure")}</div>
              </div>
              <div style="color:#8080ff;" class="ml-auto"><DownloadIcon></DownloadIcon></div>
            </a>
          </section>
        </>}
       
      <div class="max-w-screen">
        <div class="mt-5 lg:mt-14">
          <section class="mb-8 lg:mb-16">
            <div class="grid grid-cols-2">
              <h2 class="whitespace-nowrap lg:text-2xl font-medium text-lg flex items-center mb-4 lg:mb-3">
                <div class=" text-xl lg:text-3xl mr-2"><SlotsColoredIcon></SlotsColoredIcon> </div>
                {t('app.Popular@@Popular')} {t('app.Games@@Games')} 
                </h2>
              {hotGameList && hotGameList.length > 0 && <a href={`/all-games/?type=Top`} class=" lg:text-base font-medium underline flex items-center justify-end cursor-pointer mb-4 seeAllText">{t('home.See All@@See All')}</a>}
            </div>
            <ProviderGamesSlider1 parentId={"top-game"} providerGameItemList={hotGameList || []} 
               gap={{xs : "6px" , sm: "14px"}} 
            providerGameBoxCmp={GameBoxProvider}  perPageByScreen={{xs: 3, sm : 4 , md : 5 , lg : 6 , xl : 7}} hasSlot={true}    imageWidth = {165} imageHeight={220} imgDprList={[1, 2 , 3]}>
                <div class="col-span-2 w-full flex-center">
                  <Jackpot  class="px-4 2xl:px-0" isMobile={isMobile} progressive_img={cd.d?.website_settings.progressive_img} progressive_img_mobile={cd.d?.website_settings.progressive_img_mobile} currencyCode={cd.d?.website_settings.currencyCode} isHideText={true} ></Jackpot>
                </div>
            </ProviderGamesSlider1>
          </section>

          <section class="mb-8 lg:mb-14">
            <div class="grid grid-cols-2 ">
              <h2 class="whitespace-nowrap lg:text-2xl font-medium text-lg flex items-center mb-4 lg:mb-3">
                <div class=" text-xl lg:text-3xl mr-2"><NotificationIcon></NotificationIcon></div>
                {t('app.New@@New')} {t('app.Games@@Games')}             
              </h2>
              {newGameList && newGameList.length > 0 && <a href={`/all-games/?type=New`} class=" lg:text-base font-medium underline- flex items-center justify-end cursor-pointer mb-4 seeAllText">{t('home.See All@@See All')}</a>}
            </div>
            <ProviderGamesSlider1 providerGameBoxCmp={GameBoxProvider} parentId={"new-game"} providerGameItemList={newGameList || []}  perPageByScreen={{xs: 3, sm : 4 , md : 5 , lg : 6 , xl : 7}}  
            gap={{xs : "6px" , sm: "14px"}} imageWidth = {165} imageHeight={220}  imgDprList={[1, 2 , 3]} >
            </ProviderGamesSlider1>
          </section>

          <section class="mb-11 lg:mb-16">
            <div class="">
              <h2 class="whitespace-nowrap lg:text-2xl font-medium text-lg flex items-center mb-4 lg:mb-3">
                  <div class=" text-xl lg:text-3xl mr-2"><CasinoIcon></CasinoIcon></div>
                  {t('app.Popular@@Popular')} {t('app.Live Casino@@Live Casino')}         
              </h2>
            </div>
            <ProviderGamesSlider1 providerGameBoxCmp={GameBoxProvider} parentId={"casino-game"} providerGameItemList={casinoGameList || []}    
             perPageByScreen={{xs: 1, sm : 1.5 , md : 2 , lg : 2.5 , xl : 3}}  imageWidth={440} imageHeight={220} 
             gap={{xs : "6px" , sm: "14px"}} 
            imgDprList={[1,1.5]} >
            </ProviderGamesSlider1>
          </section>

          <section class="mb-11 lg:mb-24 lg:hidden">
            <div class="grid grid-cols-2 ">
              <h2 class="whitespace-nowrap lg:text-2xl font-medium text-lg flex items-center mb-4 lg:mb-3">
                <div class=" text-xl lg:text-3xl mr-2"><GameIcon></GameIcon></div>
                {t('app.Game Provider@@Game Provider')}               
              </h2>
              {cd.d?.games_data && <a href="/slots/" class="underline flex items-center justify-end cursor-pointer mb-4 seeAllText">{t('home.All Providers@@All Providers')}</a>}
            </div>
            <ProviderSlider providers={flattenObjToArr<Provider>(cd.d?.games_data || {})}  ></ProviderSlider>
          </section>

          <section class="mb-8 lg:mb-20">
              {(hasLastDeposit || hasLastWithdraw) && 
              <LastTrxs depositList={homeData.d?.last_deposits} winnerList={homeData.d?.last_withdrawals}></LastTrxs>
              }
          </section>

          <section class="mb-11 lg:mb-16">
            <div class="grid grid-cols-5 gap-4">
              <div class="depositWrapper col-span-5 lg:col-span-3 relative rounded-lg">
                {/* <img loading="lazy" decoding="async" class="rounded-lg w-full h-full" src={`https://files.sitestatic.net/home_info/${homeData.d?.homeInfoList[0]?.image}`} width="800" height="230" alt="banner"/> */}

                <LazyImage
                 class="rounded-lg w-full h-full"
                  src={`https://files.sitestatic.net/home_info/${homeData.d?.homeInfoList[0]?.image}`} 
                  alt={homeData.d?.homeInfoList[0]?.title||""}
                  width="800" height="230"
                  extractMeta={true}
                />
                 
                <button class="depositBtn bottom-4 left-3 lg:bottom-8 lg:left-8 py-3 px-6 rounded-lg absolute lg:text-base font-medium"
                onClick$={async ()=>{
                  if( !cd.d?.isAuth){
                    await toggleLoginQRL();
                  }
                  else {
                    location.href="/deposit/";
                  } 
                }}> {t("home.Deposit Now@@Deposit Now")}</button>
              </div>
              <div class="downloadWrapper p-8 lg:block hidden col-span-2 rounded-lg relative">
                  <h1 class="text-2xl font-semibold"> {t("app.Download App@@Download App")}</h1>
                  <span class="pt-2 text-lg downloadSubContent "> {t("app.Play everywhere at anytime@@Play everywhere at anytime")}</span>

                  <div class="pt-8 pb-2 font-medium"> {t("home.Scan to Download@@Scan to Download")}</div>
                  <div class="mb-4">
                    <img loading="lazy" decoding="async" width="124" height="124" src={"https://files.sitestatic.net/apk_qr_img_v2/DESH77/desh77.png"} alt="qr code"></img>
                  </div>

                  <a href={cd.d?.website_settings.apk_url || "#"} class="downloadBtn py-3 px-6 rounded-lg flex items-center mt-auto w-fit lg:text-base">
                    <span class=" text-xs pr-1" style="color:#3CE138;"><AndroidIcon></AndroidIcon> </span>
                  {t("home.Download Now@@Download Now")}</a>
              </div>
            </div>
          </section>

          <section class=" mb-6 lg:mb-16">
            <div class={`grid grid-cols-1 gap-4 ${cd.d?.website_settings.isOffReferralMenu != '1' ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}`}>
              {cd.d?.website_settings.isOffReferralMenu != '1' &&
                <a href="/referral/" class="p-4 rounded-lg faqBtn flex justify-between">
                  <div class="flex items-center ">
                    <div class="text-xl faqIcon">
                      <ReferralIcon></ReferralIcon>
                    </div>
                    <span class="px-3 faqText font-medium lg:text-base">{t("home.Refer a friend@@Refer a friend")}</span>
                  </div>
          
                  <div><ArrowRight2></ArrowRight2></div>
                </a>
              }

              <a href="/info/faq" class="p-4 rounded-lg faqBtn flex justify-between">
                <div class="flex items-center ">
                  <div class="text-xl faqIcon">
                  <AffiliateProgramIcon></AffiliateProgramIcon>
                  </div>
                  <span class="px-3 faqText font-medium lg:text-base">{t('app.Affiliate Program@@Affiliate Program')}</span>
                </div>
          
                <div><ArrowRight2></ArrowRight2></div>
              </a>

              <a href="/promotions/" class="p-4 rounded-lg faqBtn flex justify-between">
                <div class="flex items-center ">
                <div class="text-xl faqIcon">
                <PromotionGiftIcon></PromotionGiftIcon>
                  </div>
                  <span class="px-3 faqText font-medium lg:text-base">{t("app.Browse All Promos@@Browse All Promos")}</span>
                </div>
          
                <div><ArrowRight2></ArrowRight2></div>
              </a>

              <a href="/info/faq" class="p-4 rounded-lg faqBtn flex justify-between">
                <div class="flex items-center ">
                  <div class="text-xl faqIcon">
                    <LiveHelpIcon></LiveHelpIcon>
                  </div>
                  <span class="px-3 faqText font-medium lg:text-base">{t('app.FAQs@@FAQs')}</span>
                </div>
          
                <div><ArrowRight2></ArrowRight2></div>
              </a>
            </div>
          </section>
        </div>
      </div>
    </>
  );
});
