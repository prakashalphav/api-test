import {
  component$,
  useStylesScoped$,
  useStyles$,
  Resource,
  useSignal,
  $,
} from "@builder.io/qwik";
import styles from "./Home7.scss?inline";

import Slider from "~/components/banner-sliders/variant-2/Slider2";
 
import ProviderGames from "~/modules/games-lobby/games/variant-1e/ProviderGames1e";
import { useGetHomeData } from "~/routes";
import { useHome } from "~/hooks/business/useHome";
import { SecurePaymentIcon } from "~/components/icons/SecurePayment";
import { SecureShieldIcon } from "~/components/icons/SecureShield";
import { SupportIcon } from "~/components/icons/Support";
import { EmailIcon } from "~/components/icons/Email1";
import { ChatIcon } from "~/components/icons/Chat4";
import { CasinoIcon } from "~/components/icons/Casino5";
import { CrownGoldIcon } from "~/components/icons/CrownGold1";

import { inlineTranslate } from "qwik-speak";
import { flattenObjToArr, isMobileDevice } from "~/utils/common";
import HkbLotteryResultSlider from "~/components/hkb-lottery-result-sliders/variant-3/HkbLotteryResultSlider3";
// import type { Provider } from "~/services/types";
// import Slider2 from "~/components/provider-sliders/variant-2/Slider2";
import { GameTypeTop, useProviderGamesLobby } from "~/hooks/business/useGameList";
import { useLocation } from "@builder.io/qwik-city";
 
import TopPlayersBox from "~/modules/top-player-box/variant-2/TopPlayersBox2"; 
import ProviderGamesSlider1 from "~/modules/games-lobby/games/variant-slider1/ProviderGamesSlider1";
import ProviderGameItem from "~/components/game-box-provider/variant-4/GameBoxProvider4";

import LazyImage from "~/components/image/LazyImage";
import Announcement from "~/components/announcement/variant-1/Announcement1";
import { Announcement3Icon } from "~/components/icons/Announcement3";
import { makeContactLinks } from "~/utils/sysUtils";

type Props = {
  contentWidthClass?: string;
};

export default component$((props: Props) => {
  useStylesScoped$(styles);
  const homeResource = useGetHomeData();
  const { commonData: cd, homeData } = homeResource.value;
  const t = inlineTranslate();
  const isMobile = isMobileDevice(null, cd.d?.device);
  const { hotGameList, popupBanner, casinoGameList, slotTypeGames } = useHome({
    cd,
    homeData,
  });
  const location = useLocation();
  const searchGameKeyword = location.url.searchParams.get("q");
 
  const csContacts = makeContactLinks(cd.d?.babysite_cs_contacts);
  return (
    <>
      <div class={`innerContainer mx-auto ${props.contentWidthClass}`}>
   
        
        <section class="max-w-screen--xs-full">
          <Slider
            isHideContent={true}
            isHideApkDownload={false} 
            isAuth={cd.d?.isAuth || false}
            // apkUrl={cd.d?.website_settings.apk_url || ""}
            webTitle={cd.d?.website_settings.webTitle || ""}
            banners={cd.d?.babysite_sliding_banners || []}
            isMobile={isMobile}
          ></Slider>
        </section>

        <section class="announcementSection lg:hidden">
          <div class="max-w-screen">
          <Announcement
              icon={Announcement3Icon}
                    annoucement={cd.d?.annoucement}
                    class="mx-auto flex items-center py-2 w-full lg:hidden announcement text-xs"
            ></Announcement>
          </div>
          </section>
       { homeData.d?.hkb_lottery_results?.length >0 && (  
        <section class="mt-6 lg:mt-8  max-w-screen">
          <h2 class="text-lg lg:text-2xl  flex items-center mb-4 font-bold lg:p-2">
            <LazyImage
              class="mr-2 w-7 h-7 lg:w-9 lg:h-9"
              src="https://files.sitestatic.net/assets/imgs/onixv2/idrgaming/TogelIcon.webp"
              height={35}
              width={35}
              extractMeta={false}
            />
            {t("home.TOGEL RESULTS@@TOGEL RESULTS").toUpperCase()}
          </h2>
 
          <HkbLotteryResultSlider
            class={``}
            parentId="#hkb-results"
            results={homeData.d?.hkb_lottery_results}
          ></HkbLotteryResultSlider>
          
        </section>)}

       

        <section class="my-6 max-w-screen">
          <ProviderGames
            isSPA={true}
            class=""
            presetGameList={hotGameList || []}
            providers={slotTypeGames}
            presets={{ limit: 20, game_types: [GameTypeTop] }}
            providerGameBoxCmp={ProviderGameItem}
          ></ProviderGames>
        </section>

        <section class="my-6 max-w-screen">
          <h2 class=" text-lg lg:text-2xl flex items-center mb-4 font-bold lg:p-2">
            <CasinoIcon class="text-4xl mr-2"></CasinoIcon>
            {t("app.Live Casino@@Live Casino").toUpperCase()}
          </h2>

          <ProviderGamesSlider1
            parentId={"casino-game-7"}
            providerGameItemList={casinoGameList || []}
            providerGameBoxCmp={ProviderGameItem}
            gap={{xs : "8px" , sm: "16px"}} 
            perPageByScreen={{xs: 1, sm : 1.5 , md : 2 , lg : 2.5 , xl : 3}}  imageWidth={440} imageHeight={220} 
            imgDprList={[1,1.5]} 
          ></ProviderGamesSlider1>
        </section>

        <section class="advantagesSection mt-14 lg:mb-6 max-w-screen">
          <div class="advantages grid grid-cols-1 lg:grid-cols-3 py-5 lg:py-4 px-4 lg:px-10 gap-6 lg:gap-0 rounded-2xl lg:rounded-md">
            <div class="col-span-1 flex gap-5 items-center">
              <div>
              <div class="advantagesIcon rounded-full  flex-center">
                <SecurePaymentIcon class="text-4xl lg:text-5xl"></SecurePaymentIcon>
              </div>
              </div>
              <div >
                <p class="text-lg advantagesTitle mb-2">{t('home.Fast and secure payments@@Fast and secure payments')}</p>
                <p class="advantagesText leading-tight">{t('home.Secure with the fastest deposit times@@Secure with the fastest deposit times')}</p>
              </div>
            </div>
            <div class="col-span-1 flex  gap-5 items-center">
              <div>
              <div class="advantagesIcon rounded-full   flex-center">
                <SecureShieldIcon class="text-4xl lg:text-5xl"></SecureShieldIcon>
              </div>
              </div>
              <div>
                <p class="text-lg advantagesTitle mb-2">{t('home.A secure gaming site@@A secure gaming site')}</p>
                <p class="advantagesText leading-tight">{t('home.Unlimited games@@Unlimited games')}</p>
              </div>
            </div>
            <div class="col-span-1 flex  gap-5 items-center">
              <div>
              <div class="advantagesIcon rounded-full   flex-center">
                <SupportIcon class="text-4xl lg:text-5xl"></SupportIcon>
              </div>
              </div>
              <div>
                <p class="text-lg advantagesTitle mb-2 ">{t('app.24/7 support@@24/7 support')}</p>
                <p class="advantagesText leading-tight">{t('home.Excellence in every call@@Excellence in every call')}</p>
              </div>
            </div>
          </div>
        </section>

        <section class=" my-4 lg:my-10 max-w-screen">
          <div class="grid grid-cols-2">
            <div class="col-span-2 lg:col-span-1 order-2 lg:order-1 mt-5 lg:mt-0">
              <div>
                <LazyImage
                  class="rounded-lg w-full h-full"
                  src={`https://files.sitestatic.net/home_info/${homeData.d?.homeInfoList[0]?.image}`} 
                  alt={homeData.d?.homeInfoList[0]?.title||""}
                  extractMeta={true}
                />
              </div>
              <div class="mt-5">
                <LazyImage
                  class="rounded-lg w-full h-full"
                  src={`https://files.sitestatic.net/home_info/${homeData.d?.homeInfoList[1]?.image}`} 
                  alt={homeData.d?.homeInfoList[1]?.title||""}
                  extractMeta={true}
                />
              </div>

              <div>
                <div class="title mb-2.5 lg:mb-5 mt-6 lg:mt-10 text-center text-lg lg:text-2xl font-medium">
                  {t("home.Need any help?@@Need any help?")}
                </div>
                <div class="grid grid-cols-2 py-3 gap-2 items-start">
                  <div class="col-span-1 flex-center flex-wrap lg:flex-nowrap gap-2 lg:gap-5">
                    <div class="contactInfoIcon rounded-full w-20 h-20 flex-center flex-shrink-0">
                      <ChatIcon class="text-5xl"></ChatIcon>
                    </div>
                    <div class="w-full text-center lg:text-left">
                      <p class="text-lg mb-2">
                        {t("home.Please contact our LiveChat@@Please contact our LiveChat")}
                      </p>
                      <p class="contactInfoText">
                        {t("home.available 24/7@@available 24/7")}
                      </p>
                    </div>
                  </div>
                  <div class="col-span-1 flex-center flex-wrap lg:flex-nowrap gap-2 lg:gap-5">
                    <div class="contactInfoIcon rounded-full w-20 h-20 flex-center flex-shrink-0">
                      <EmailIcon class="text-5xl"></EmailIcon>
                    </div>
                    <div class="w-full text-center lg:text-left">
                      <p class="text-lg mb-2">{t("home.Email us@@Email us")}</p>
                      <a class="contactInfoText block truncate" href={(csContacts?.email.url ? `${csContacts.email.url}` :`#`)}
                                target={csContacts?.email.url ? '_blank' : ''}
                                >{csContacts?.email.value}</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-span-2 lg:col-span-1 lg:px-20 order-1 lg:order-2 ">
              <div class="flex justify-center">
                <CrownGoldIcon class="text-8xl"></CrownGoldIcon>
              </div>
              <h2
                class="py-2 px-2.5 mb-5 title font-extrabold text-2xl lg:text-4xl animate text-center " id="topWinnersTitle"
              >
                {t("home.Top Winners@@Top Winners")} 
              </h2>
              <TopPlayersBox list={homeData.d?.top_players} />
            </div>
          </div>
        </section>
      </div>
    </>
  );
});
