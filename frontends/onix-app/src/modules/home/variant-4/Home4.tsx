import {
  component$,
  useStylesScoped$,
  useStyles$,
  Resource,
  useSignal,
  $,
} from "@builder.io/qwik";
import styles from "./Home4.scss?inline";

import Slider from "~/components/banner-sliders/variant-2/Slider2"; 
import MainNav1 from "~/modules/main-nav/variant-1/MainNav1";
import ProviderGames from "~/modules/games-lobby/games/variant-1d/ProviderGames1d";
import ProviderGameItem from "~/components/game-box-provider/variant-6/GameBoxProvider6";

// import MainNav from "~/modules/main-nav/variant-2/MainNav2";
// import ProvidersSlider from "~/components/provider-sliders/variant-1/Slider1";
import { useGetHomeData } from "~/routes";
import { useHome } from "~/hooks/business/useHome";
import Jackpot from "~/components/jackpot/variant-3/Jackpot3";
import Announcement from "~/components/announcement/variant-1/Announcement1";
import { Announcement2Icon } from "~/components/icons/Announcement2";
import ApkDownload from "~/components/apk-download/variant-2/ApkDownload2";
import { inlineTranslate } from "qwik-speak";
import { flattenObjToArr, isMobileDevice } from "~/utils/common";
import HkbLotteryResultSlider from "~/components/hkb-lottery-result-sliders/variant-2/HkbLotteryResultSlider2";
import type { Provider } from "~/services/types";
import Slider2 from '~/components/provider-sliders/variant-2/Slider2';
import { GameTypeTop, useProviderGamesLobby } from '~/hooks/business/useGameList';
import { useLocation } from '@builder.io/qwik-city';
import LastTrxs from "~/components/last-trxs/variant-2/LastTrxs2";
import GameBoxLobby from "~/components/game-box-lobby/variant-2/GameBoxLobby2";
import TopPlayerBox from "~/components/top-players-box/variant-1/TopPlayersBox";
import LoginRegisterBar from "~/components/login-register-bar/variant-1/LoginRegisterBar";


export default component$(() => {
  useStylesScoped$(styles);
  const homeResource = useGetHomeData();
  const { commonData: cd, homeData } = homeResource.value;
  const t = inlineTranslate();
  const isMobile = isMobileDevice(null, cd.d?.device);
  const hasLastWithdraw =
    homeData.d?.last_withdrawals && homeData.d?.last_withdrawals.length > 0;
  const hasLastDeposit =
    homeData.d?.last_deposits && homeData.d?.last_deposits.length > 0;
  const {
    hotGameList,
    popupBanner,
    gamesDataArr,
    casinoTypeGames,
    slotTypeGames
  } = useHome({ cd, homeData });
  const location = useLocation();
  const searchGameKeyword = location.url.searchParams.get("q");
  const { selGameCodes, onSelProvider } = useProviderGamesLobby(searchGameKeyword, true, { limit: 21, game_types: "Top" });
  
  return (
    <>
    <div class={`innerContainer pb-10`}>
     
      <section class="max-w-screen--xs-full">
        <Slider
          isHideContent={true}
          isAuth={cd.d?.isAuth || false}
          // apkUrl={cd.d?.website_settings.apk_url || ""}
          webTitle={cd.d?.website_settings.webTitle || ""}
          banners={cd.d?.babysite_sliding_banners || []}
          isMobile={isMobile}
        ></Slider>
      </section>

      <section class="max-w-screen--xs-full">
        <div class="py-2 px-5 w-full marqueeAnn">
          <Announcement
            icon={Announcement2Icon}
            annoucement={cd.d?.annoucement}
            class="flex items-center w-full text-xxs md:text-xs "
          ></Announcement>
        </div>
      </section>

      {!cd.d?.isAuth && (
      <section class="lg:hidden max-w-screen">
        <LoginRegisterBar />
      </section>
      )}
      
      <section class="lg:hidden relative max-w-screen">
        <MainNav1></MainNav1>
      </section>

      <ProviderGames
        isSPA={true}
        class="max-w-screen mt-1"
        presetGameList={hotGameList || []}
        providers={slotTypeGames}
        presets={{ limit: 21, game_types: [GameTypeTop] }} 
        providerGameBoxCmp={ProviderGameItem}
      ></ProviderGames>

    
      {homeData.d?.hkb_lottery_results?.length  && (      <section class="mt-5 lg:mt-8 max-w-screen">
        <h2
          class="section-title py-1 sm:py-2 px-2.5 mb-2.5 sm:mb-5 title font-semibold text-base sm:text-xl animate"
          anime-name="fade-in-bottom"
        >
          {t('home.TOGEL RESULTS@@TOGEL RESULTS')}  
        </h2>
        <div id="hkb-results">
          <HkbLotteryResultSlider
            class={`lotteryResults__home`}
            results={homeData.d?.hkb_lottery_results}
          ></HkbLotteryResultSlider>
        </div>
      </section>)}

      <section class="mt-5 lg:mt-8 max-w-screen">
        <Jackpot
          class="flex-center"
          textStyle="top: 1.75rem"
          textClass="text-3xl font-semibold"
          isMobile={isMobile}
          progressive_img={cd.d?.website_settings.progressive_img}
          progressive_img_mobile={
            cd.d?.website_settings.progressive_img_mobile
          }
          currencyCode={cd.d?.website_settings.currencyCode}
        />
      </section>
      <section class="mt-5 lg:mt-8 max-w-screen">
        <h2 class="section-title py-2 px-2.5 text-base sm:text-xl mb-2.5 sm:mb-5 font-semibold">{t('app.Top Player@@Top Player')}</h2>
        {/* <div class="grid grid-cols-1 sm:grid-cols-4 gap-5"> */}
        <div class="lg:flex flex-wrap lg:flex-nowrap gap-5 sm:gap-6">
          <div class="w-full lg:flex-1 grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
            <TopPlayerBox list={homeData.d?.top_players} />
            {hasLastWithdraw && (
              <LastTrxs id="lastWinnerList" list={homeData.d?.last_withdrawals} title={t("home.Latest Winners@@Latest Winners")} />
            )}
            {hasLastDeposit && (
              <LastTrxs id="lastDepositList" list={homeData.d?.last_deposits} title={t("home.Latest Deposits@@Latest Deposits")} />
            )}
          </div>
          <div class="apkdownloadWrapper w-full mx-auto mt-5 sm:mt-6 lg:mt-0">
            <ApkDownload class=""></ApkDownload>
          </div>
        </div>
      </section>
      
      {/* <section class="mt-5 lg:mt-16 mb-5 sm:mb-14 max-w-screen flex flex-wrap items-center gap-5 sm:gap-10">
        <div class="order-2 sm:order-1 max-w-full">
          <h2 class="section-title py-2 px-2.5 sm:text-2xl mb-2.5 sm:mb-5 font-bold">{t('app.Top Game Providers@@Top Game Providers')}</h2>
          <Slider2
            class="mt-1"
            inlineStyle="background:none"
            selGameCodes={selGameCodes}
            providers={gamesDataArr}
            onSelect={onSelProvider}
          ></Slider2>
        </div>
        <ApkDownload class="flex-1 order-1 sm:order-2"></ApkDownload>
        <div class="gameBanners flex order-3">
          {casinoTypeGames.map((item, index :number) => {  
            return (
              <>
              { index < 3 && <GameBoxLobby provider={item} />}
              </>
            );
          })}
        </div>
      </section> */}
    </div>

    </>
  );
});
