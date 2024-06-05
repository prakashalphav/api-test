import {
  component$,
  useStylesScoped$,
} from "@builder.io/qwik";
import styles from "./Home2.scss?inline";

import Slider from "~/components/banner-sliders/variant-2/Slider2";


import { useLoginModal } from "~/hooks/business/useLoginModal";
import { useRegisterModal } from "~/hooks/business/useRegisterModal";

import MainNav1 from "~/modules/main-nav/variant-1/MainNav1";
import ProviderGames from "~/modules/games-lobby/games/variant-1c/ProviderGames1c";
import ProviderGameItem from "~/components/game-box-provider/variant-5/GameBoxProvider5";
import WithdrawListSlider from "~/components/trx-list-sliders/variant-4/WithdrawListSlider4";
import DepositListSlider from "~/components/trx-list-sliders/variant-4/DepositListSlider4";
import HkbLotteryResultSlider from "~/components/hkb-lottery-result-sliders/variant-3/HkbLotteryResultSlider3";

// import MainNav from "~/modules/main-nav/variant-2/MainNav2";

// import ProvidersSlider from "~/components/provider-sliders/variant-1/Slider1";
import { useGetHomeData } from "~/routes";
import { useHome } from "~/hooks/business/useHome";
import Jackpot from "~/components/jackpot/variant-3/Jackpot3";
import Announcement from "~/components/announcement/variant-1/Announcement1";
import { Announcement2Icon } from "~/components/icons/Announcement2";
import ApkDownload from "~/components/apk-download/variant-1/ApkDownload1";
import { makeContactLinks } from "~/utils/sysUtils";
import { inlineTranslate } from "qwik-speak";
import { isMobileDevice } from "~/utils/common";
import { StarSilverIcon } from "~/components/icons/StarSilverGradient";
import { StarGoldIcon } from "~/components/icons/StarGoldGradient";

type Props = { 
};

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
  const {
    hotGameList,
    popupBanner,
    slotTypeGames,
  } = useHome({ cd, homeData });

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

      <>
        <section class="px-1 lg:hidden relative max-w-screen--xs-full">
          <MainNav1></MainNav1>
        </section>
        <section class="max-w-screen">
          <div class="rounded-lg py-4 px-4 w-full marqueeAnn">
            <Announcement
              icon={Announcement2Icon}
              annoucement={cd.d?.annoucement}
              class="flex items-center w-full text-xxs md:text-base "
            ></Announcement>
          </div>
        </section>
      </>

      { homeData.d?.hkb_lottery_results?.length >0 && (  
        <section class="my-6 lg:my-10  max-w-screen">
          <h2 class="text-lg lg:text-2xl  flex items-center mb-3 font-bold">
         
            {t("home.TOGEL RESULTS@@TOGEL RESULTS").toUpperCase()}
          </h2>
 
          <HkbLotteryResultSlider
            class={``}
            parentId="#hkb-results"
            results={homeData.d?.hkb_lottery_results}
          ></HkbLotteryResultSlider>
          
        </section>)}

      <ProviderGames
        isSPA={true}
        class="mt-1  max-w-screen"
        presetGameList={hotGameList || []}
        providers={slotTypeGames}
        presets={{ limit: 21, gameType: "Top" }} 
        providerGameBoxCmp={ProviderGameItem}   
      ></ProviderGames>

      
   
        <div class="flex flex-wrap items-end gap-5  mt-10  max-w-screen">
          <section class="order-3 sm:order-1 w-full flex-1 grid grid-cols-1 justify-center">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div class="relative" style="padding-top:58px">
                <img
                  class="absolute mx-auto left-0 right-0 top-0 z-10"
                  width="108"
                  height="107"
                  src="https://files.sitestatic.net/assets/imgs/onixv2/wingaming/gems.webp"
                  loading="lazy"
                  decoding="async"
                  alt={t("home.Join Us@@Join Us")}
                />
                <div class="boxAdvantage relative text-center rounded-2xl h-full">
                  <div class="contentAdvantage relative overflow-hidden h-full">
                    <div class="innerContentAdvantage  px-3 pb-4 h-full" style="padding-top:56px">
                      <div class="text-xl mb-2 leading-none">{t("home.Join Us@@Join Us")}</div>
                      <div class="titleAdvantage mb-2.5 text-xs">
                        {t("home.It's quick and easy@@It's quick and easy")}
                      </div>
                      <div class="descAdvantage mb-3 text-xs leading-tight">
                      <p>  {t("home.adv_1@@Highest Win Rate")}</p>
                      <p>  {t("home.adv_2@@The best and most trusted site for its loyal users.")}</p>
                      </div>
                      <button
                        type="button"
                        class="btnAdvantage inline-block py-2 px-5 rounded-md"
                        onClick$={async ()=>{
                          if(!cd.d?.isAuth){
                              await toggleRegQRL();
                          } 
                        }}
                      >
                        {t("home.Join Now@@Join Now")}
                      </button>
                    </div>
                    <div class="containerShine animShine delayAnimShine1 ">
                      <div class="shapeShine">
                        <div class="innerShapeShine"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="relative" style="padding-top:58px">
                <img
                  class="absolute mx-auto left-0 right-0 top-0 z-10"
                  width="108"
                  height="103"
                  src="https://files.sitestatic.net/assets/imgs/onixv2/wingaming/bag_of_gold.webp"
                  loading="lazy"
                  decoding="async"
                  alt="Deposit"
                />
                <div class="boxAdvantage relative text-center rounded-2xl h-full">
                  <div class="contentAdvantage relative overflow-hidden h-full">
                    <div class="innerContentAdvantage  px-3 pb-4 h-full" style="padding-top:56px">
                      <div class="text-xl mb-2.5 leading-none">{t("app.Deposit@@Deposit")}</div>
                      <div class="titleAdvantage mb-2.5 text-xs">
                        {t("home.Secure with@@Secure with")}
                        <br />
                        {t(
                          "home.the fastest deposit times@@the fastest deposit times"
                        )}
                      </div>
                      <div class="descAdvantage mb-3 text-xs">
                      <p>  {t("home.adv_3@@Fastest Deposit Service!")}</p>
                      <p>  {t("home.adv_4@@Equipped with various payment methods for smooth deposits.")}</p>
                      </div>
                      <button
                      type="button"
                        class="btnAdvantage inline-block py-2 px-5 rounded-md"
                        onClick$={async ()=>{
                          if( !cd.d?.isAuth){
                            await toggleLoginQRL();
                          }
                          else {
                            location.href="/deposit/";
                          } 
                        }}
                      >
                        {t("home.Deposit Now@@Deposit Now")}
                      </button>
                    </div>
                    <div class="containerShine animShine delayAnimShine2">
                      <div class="shapeShine">
                        <div class="innerShapeShine"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="relative" style="padding-top:58px">
                <img
                  class="absolute mx-auto left-0 right-0 top-0 z-10"
                  width="108"
                  height="109"
                  src="https://files.sitestatic.net/assets/imgs/onixv2/wingaming/gold_trophy.webp"
                  loading="lazy"
                  decoding="async"
                  alt="Play & Win"
                />
                <div class="boxAdvantage relative text-center rounded-2xl h-full">
                  <div class="contentAdvantage relative overflow-hidden h-full">
                    <div class="innerContentAdvantage  px-3 pb-4 h-full" style="padding-top:56px">
                      <div class="text-xl mb-2.5 leading-none">
                        {t("app.Play & Win@@Play & Win")}
                      </div>
                      <div class="titleAdvantage mb-2.5 text-xs">
                        {t("home.Start your@@Start your")}
                        <br />
                        {t("home.winning journey now!@@winning journey now!")}
                      </div>
                      <div class="descAdvantage mb-5 text-xs">
                      <p>  {t("home.adv_5@@Play Now!")}</p>
                      <p>  {t("home.adv_6@@Start your journey and win other attractive prizes!")}</p>
                      </div>
                      <a
                        href="/slots"
                        class="btnAdvantage inline-block py-2.5 px-5 rounded-md"
                      >
                        {t("app.Play Now@@Play Now")}
                      </a>
                    </div>

                    <div class="containerShine animShine delayAnimShine3">
                      <div class="shapeShine">
                        <div class="innerShapeShine"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* apk download container - mobile */}
            <ApkDownload class="mt-5 sm:hidden"></ApkDownload>
          </section>
          <section class="order-1 lg:order-2 w-full flex-1 text-center overflow-hidden self-center">
            <Jackpot
              class=""
              isMobile={isMobile}
              progressive_img={cd.d?.website_settings.progressive_img}
              progressive_img_mobile={
                cd.d?.website_settings.progressive_img_mobile
              }
              currencyCode={cd.d?.website_settings.currencyCode}
            />
          </section>
          <section class="order-2 sm:order-3 mb-0 sm:mb-8 mx-auto lg:mx-0 w-full">
            <div
              class={`grid grid-cols-1 gap-8  ${
                hasLastDeposit || hasLastWithdraw
                  ? `md:grid-cols-2 lg:grid-cols-3`
                  : ``
              }`}
            >
              {hasLastWithdraw && (
                <div class="col-span-1 boxLatestTrxs rounded-2xl  px-5 pb-8 pt-5 ">
                  <div class="titleLatestWinners mb-5 flex-center gap-4 font-bold">
                    <StarGoldIcon />
                    <div class="text-2xl truncate">
                      {t("home.Latest Winners@@Latest Winners")}
                    </div>
                    <StarGoldIcon />
                  </div>
                  <WithdrawListSlider list={homeData.d?.last_withdrawals} />
                </div>
              )}
              {hasLastDeposit && (
                <div class="col-span-1 boxLatestTrxs rounded-2xl px-5 pb-8 pt-5">
                  <div class="titileLatestDeposits mb-5 flex-center gap-4 font-bold">
                    <StarSilverIcon />
                    <div class="text-2xl truncate">
                      {t("home.Latest Deposits@@Latest Deposits")}
                    </div>
                    <StarSilverIcon />
                  </div>
                  <DepositListSlider list={homeData.d?.last_deposits} />
                </div>
              )}
              <div
                class={`col-span-1 ${
                  hasLastDeposit || hasLastWithdraw
                    ? `grid gap-5`
                    : `flex justify-evenly items-center w-full`
                }`}
              >
                <div class="mb-5 md:mb-0 text-center">
                  <a href="/slots">
                    <img
                      width="440"
                      height="182"
                      class=" rounded"
                      loading="lazy"
                      decoding="async"
                      alt="mahjong ways 2"
                      src="https://files.sitestatic.net/assets/imgs/onixv2/wingaming/mahjong_ways_2.webp"
                    />
                  </a>
                </div>
                {/* apk download container - desktop */}
                <ApkDownload class="hidden sm:block self-end"></ApkDownload>
              </div>
            </div>
          </section>
        </div>
    </div>
    </>
  );
});
