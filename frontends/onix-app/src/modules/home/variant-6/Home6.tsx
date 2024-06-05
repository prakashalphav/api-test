import { component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./Home6.scss?inline";
import Slider from "~/components/banner-sliders/variant-2/Slider2";
import PopupBanner from "../../popup-banner/variant-1/PopupBanner";
import { useLoginModal } from "~/hooks/business/useLoginModal";
import { useRegisterModal } from "~/hooks/business/useRegisterModal";
import MainNav1 from "~/modules/main-nav/variant-1/MainNav1";
import ProviderGames from "~/modules/games-lobby/games/variant-1f/ProviderGames1f";
import GameBoxProvider from "~/components/game-box-provider/variant-8/GameBoxProvider8";
import { useGetHomeData } from "~/routes";
import { useHome } from "~/hooks/business/useHome";
import Jackpot from "~/components/jackpot/variant-3/Jackpot3";
import TrxListSlider from "~/components/trx-list-sliders/variant-6/TrxListSlider6";
import { inlineTranslate } from "qwik-speak";
import { isMobileDevice } from "~/utils/common";
import ProviderGamesSlider1 from "~/modules/games-lobby/games/variant-slider1/ProviderGamesSlider1";
import { GameTypeTop } from "~/hooks/business/useGameList";
import { SlotsIcon } from "~/components/icons/Slots3";
import { SettingsIcon } from "~/components/icons/Settings";
import { useCommonViewData } from "~/hooks/app/useCommonViewData";
import GamesProviderImage from "~/components/provider-images/variant-1/ProviderImages1";
import ApkDownload from "~/components/apk-download/variant-2b/ApkDownload2b";

export default component$((props: Props) => {
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
  const { hotGameList, casinoGameList, popupBanner, slotTypeGames } = useHome({
    cd,
    homeData,
  });
  const { commonData } = useCommonViewData();
  const topSlotProviders =
    commonData.games_data["slots"] &&
    commonData.games_data["slots"].slice(0, 10);

  return (
    <>
      <div class={`innerContainer`}>
        {popupBanner && (
          <PopupBanner
            banner={popupBanner.image}
            url={popupBanner.url}
            popUpBannerLocation={"home"}
          ></PopupBanner>
        )}
        <section class="max-w-screen--xs-full">
          <Slider
            isHideContent={true}
            isAuth={cd.d?.isAuth || false}
            apkUrl={cd.d?.website_settings.apk_url || ""}
            webTitle={cd.d?.website_settings.webTitle || ""}
            banners={cd.d?.babysite_sliding_banners || []}
            isMobile={isMobile}
          ></Slider>
        </section>

        <section class="max-w-screen--xs-full px-1 lg:hidden relative">
          <MainNav1></MainNav1>
        </section>

        <ProviderGames
          isSPA={true}
          providerGameBoxCmp={GameBoxProvider}
          class="max-w-screen mb-10 sm:mb-20"
          presetGameList={hotGameList || []}
          providers={slotTypeGames}
          presets={{ limit: 10, game_types: [GameTypeTop] }}
        ></ProviderGames>
        <Jackpot
          class="max-w-screen mb-12 sm:mb-5"
          isMobile={isMobile}
          progressive_img={cd.d?.website_settings.progressive_img}
          progressive_img_mobile={cd.d?.website_settings.progressive_img_mobile}
          currencyCode={cd.d?.website_settings.currencyCode}
          isHideText={true}
          disableAspectRatio={true}
        ></Jackpot>
        <section class="max-w-screen mb-10">
          <div
            class="grid grid-cols-1 sm:grid-cols-2 justify-items-center gap-x-5"
            style="row-gap: 55px;"
          >
            {hasLastDeposit && (
              <TrxListSlider
                id="lastDepositList"
                title={t("home.Last Deposit@@Last Deposit")}
                list={homeData.d?.last_deposits}
              ></TrxListSlider>
            )}
            {hasLastWithdraw && (
              <TrxListSlider
                id="lastWinnerList"
                title={t("home.Last Withdraw@@Last Withdraw")}
                list={homeData.d?.last_withdrawals}
              ></TrxListSlider>
            )}
          </div>
        </section>
        <section class="max-w-screen mb-12 lg:mb-14">
          <div class="flex justify-center flex-wrap lg:flex-nowrap gap-x-6 gap-y-12">
            <div class="flex-grow">
              <div class="grid grid-cols-2 font-semibold items-end">
                <h2 class="whitespace-nowrap text-lg lg:text-xl flex items-center lg:mb-4 mb-3 ">
                  <span class=" text-xl lg:text-3xl mr-2">
                    <SettingsIcon />
                  </span>
                  {t("app.Popular Provider@@Popular Provider")}
                </h2>
                <a
                  href="/slots"
                  class=" lg:text-base font-medium underline flex items-center justify-end cursor-pointer mb-4 seeAllText"
                >
                  {t("home.See All@@See All")}
                </a>
              </div>
              <div class="grid grid-cols-2 sm:grid-cols-5">
                <GamesProviderImage
                  providersList={topSlotProviders}
                  hideText={true}
                />
              </div>
            </div>
            <ApkDownload class="flex-shrink-0"></ApkDownload>
          </div>
        </section>
        <section class="max-w-screen mb-12 lg:mb-14">
          <div class="grid grid-cols-2 font-semibold items-end">
            <h2 class="whitespace-nowrap text-lg lg:text-xl flex items-center lg:mb-4 mb-3 ">
              <div class=" text-xl lg:text-3xl mr-2">
                <SlotsIcon />
              </div>
              {t("app.Popular Live Casino@@Popular Live Casino")}
            </h2>
            {casinoGameList && casinoGameList.length > 0 && (
              <a
                href="/casino"
                class=" lg:text-base font-medium underline flex items-center justify-end cursor-pointer mb-4 seeAllText"
              >
                {t("home.See All@@See All")}
              </a>
            )}
          </div>
          <ProviderGamesSlider1
            providerGameBoxCmp={GameBoxProvider}
            parentId={"casino-game"}
            providerGameItemList={casinoGameList || []}
            perPageByScreen={{ xs: 1, sm: 1.5, md: 2, lg: 2.5, xl: 3 }}
            imageWidth={440}
            imageHeight={220}
            gap={{ xs: "6px", sm: "14px" }}
            imgDprList={[1, 1.5]}
          ></ProviderGamesSlider1>
        </section>
      </div>
    </>
  );
});
