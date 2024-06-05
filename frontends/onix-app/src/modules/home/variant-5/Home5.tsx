import {
  component$,
  useSignal,
  useStylesScoped$,
} from "@builder.io/qwik";
import styles from "./Home5.scss?inline";

import Slider from "~/components/banner-sliders/variant-2/Slider2";
 
import MainNav1 from "~/modules/main-nav/variant-1/MainNav1";

// import MainNav from "~/modules/main-nav/variant-2/MainNav2";
import ProviderSlider from '~/components/provider-sliders/variant-4/Slider4';
import { useGetHomeData } from "~/routes";
import { useHome } from "~/hooks/business/useHome";
import Jackpot from "~/components/jackpot/variant-3/Jackpot3";
import { inlineTranslate } from "qwik-speak";
import { flattenObjToArr, isMobileDevice } from "~/utils/common";

import { intervalToDuration   } from 'date-fns';
import type { Provider } from "~/services/types";
import ProviderGamesSlider from "~/modules/games-lobby/games/variant-slider2/ProviderGamesSlider2";
import GameBoxProvider from '~/components/game-box-provider/variant-1/GameBoxProvider1';


import { AndroidIcon } from "~/components/icons/Android";
import { LiveHelpIcon } from "~/components/icons/LiveHelp4";
import { CloseIcon } from "~/components/icons/Close";
import { DownloadIcon } from "~/components/icons/Download";
import { PromotionIcon } from "~/components/icons/Promotion";
import { ClockIcon } from "~/components/icons/Clock";
import { ChatIcon } from "~/components/icons/Chat4";
import { makeContactLinks } from "~/utils/sysUtils";
import LastTrx from "~/components/trx-list-sliders/variant-7/LastTrx3";
import { DoubleArrowRight } from "~/components/icons/DoubleArrowRight";
import { DoubleArrowLeft } from "~/components/icons/DoubleArrowLeft";

/*remove this if CMP does not have props*/
export default component$((props: Props) => {
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
    casinoGameList,
    popupBanner, 
  } = useHome({ cd, homeData });
  const showBtnApkDownload = useSignal<boolean>(!!cd.d?.website_settings.apk_url);
  const csContacts = makeContactLinks(cd.d?.babysite_cs_contacts);
  const promoDatetimeRange = (start, end) => {
    const diffDatetime = intervalToDuration({start, end});
    return  diffDatetime.days + ' ' + t('home.days') + diffDatetime.hours  + ' ' + t('home.hours') + diffDatetime.minutes +' '+ t('home.minutes');
  }
  return (
    <>
     

      <section class="lg:hidden relative mainNavWrapper">
          <div class="max-w-screen--xs-full">
            <MainNav1 isShowIcon={true} ></MainNav1>
          </div>
        </section>

      <section class="max-w-screen--xs-full">
        <Slider
          arrowLeftIcon={DoubleArrowLeft}
          arrowRightIcon={DoubleArrowRight}
          isHideApkDownload={false} 
          isHideContent={true}
          isAuth={cd.d?.isAuth || false}
         // apkUrl={cd.d?.website_settings.apk_url || ""}
          webTitle={cd.d?.website_settings.webTitle || ""}
          banners={cd.d?.babysite_sliding_banners || []}
          isMobile={isMobile}
        ></Slider>
      </section>


    <div class="lg:mb-12 mb-8">
        {showBtnApkDownload.value &&
        <>
          <section class="lg:hidden block downloadAppWrapper">
            <a target="_blank" href={cd.d?.website_settings.apk_url || "#"} class="max-w-screen--xs-full flex items-center p-4 gap-2">
              <div onClick$={( )=>{ 
              showBtnApkDownload.value = false;
                }} >
                  <CloseIcon></CloseIcon>
              </div>
              <div style="color:#3CE138;">
                <AndroidIcon></AndroidIcon>
              </div>
              <div class="flex flex-col items-center gap-2">
                <div class="w-full">{cd.d?.website_settings.PageTitle} {t("home.Lite Download@@Lite Download")} </div>
                <div class="text-sm leading-none">{t("app.Download mobile app fast, light and secure@@Download mobile app fast, light and secure")}</div>
              </div>
              <div style="color:#8080ff;" class="ml-auto"><DownloadIcon></DownloadIcon></div>
            </a>
          </section>
        </>}
      </div>

      
      <div class="max-w-screen gamesSlider">
         <section class="mb-7 lg:mb-12">
            <div class="grid grid-cols-2 font-semibold">
              <h2 class="whitespace-nowrap text-lg lg:text-2xl flex items-center lg:mb-4 mb-3 sectionTitle ">
                {t('app.Popular Games@@Popular Games')} 
                </h2>

                {hotGameList && hotGameList.length > 0 && <a href={`/all-games/?type=Top&category=slots`} class=" lg:text-base font-medium underline flex items-center justify-end cursor-pointer mb-4 seeAllText">{t('home.See All@@See All')}</a>}
            </div>
            <ProviderGamesSlider parentId={"top-game"} providerGameItemList={hotGameList || []} arrowClass={'lg:!bg-transparent'} 
            showTwoArray={true}
            imageWidth ={165}
            imageHeight={220}
            perPageByScreen={{xs: 3, sm : 4 , md : 5 , lg : 6 , xl : 7}} 
            providerGameBoxCmp={GameBoxProvider} 
            gap = {{xs : "12px", sm:"24px"}}
            ></ProviderGamesSlider>
          </section>


          <section class="mb-8 lg:mb-14">
            <div class="grid grid-cols-2  font-semibold ">
            <h2 class="whitespace-nowrap text-lg lg:text-2xl flex items-center lg:mb-4 mb-3 sectionTitle ">
                  {t('app.Popular Live Casino@@Popular Live Casino')}         
              </h2>
              {casinoGameList && casinoGameList.length > 0 && <a href={`/casino/`} class=" lg:text-base font-medium underline flex items-center justify-end cursor-pointer mb-4 seeAllText">{t('home.See All@@See All')}</a>}
            </div>
            <ProviderGamesSlider parentId={"casino-game"} providerGameItemList={casinoGameList || []} 
           imageWidth ={440}
           imageHeight={220}
           perPageByScreen={{xs: 1, sm : 1.5 , md : 2 , lg : 2.5 , xl : 3}}
             providerGameBoxCmp={GameBoxProvider} 
             imgDprList={[1,1.5]}
             gap = {{xs : "12px", sm:"24px"}}
            >
            </ProviderGamesSlider>
          </section>
      </div>

      <div class="">
        <div class="mt-5 lg:mt-14">
          <section class="mb-6 lg:mb-14 mx-auto" style="max-width:850px;">
             <div class="w-full flex-center">
                  <Jackpot textClass={'xl:text-5xl sm:text-4xl text-xl'} class="px-4 2xl:px-0" isMobile={isMobile} progressive_img={cd.d?.website_settings.progressive_img} progressive_img_mobile={cd.d?.website_settings.progressive_img_mobile} currencyCode={cd.d?.website_settings.currencyCode} ></Jackpot>
              </div>
          </section>        
        </div>

        <section class="mb-8 lg:mb-16 max-w-screen--xs-full">
             {(hasLastDeposit || hasLastWithdraw) && 
             <>
              <div class="mb-6 md:mb-24 lg:mb-12">
                <LastTrx parentId={'deposit1'} type={'deposit'} trxList={homeData.d?.last_deposits} ></LastTrx>
              </div>
              <div>
                <LastTrx parentId={'winner1'} type={'winner'}  trxList={homeData.d?.last_withdrawals} ></LastTrx>
              </div>
             </>
              }
        </section>

        <div class="mt-5 lg:mt-auto max-w-screen">
          <section class="mb-8 lg:mb-14 lg:hidden">
            <div class="grid grid-cols-2 font-semibold">
            <h2 class="whitespace-nowrap text-lg lg:text-2xl flex items-center lg:mb-4 mb-3 sectionTitle ">
                {t('app.Game Provider@@Game Provider')}               
              </h2>
              {cd.d?.games_data && <a href="/slots/" class="lg:font-medium lg:text-base underline flex items-center justify-end cursor-pointer mb-4 seeAllText">{t('home.All Providers@@All Providers')}</a>}
            </div>
            <ProviderSlider providers={flattenObjToArr<Provider>(cd.d?.games_data || {})}  ></ProviderSlider>
          </section>

          <div class="grid grid-cols-1 lg:grid-cols-10 gap-6"> 
            <section class="flex flex-col col-span-1 lg:col-span-5 mb-6 p-6 promoWrapper rounded-xl">
                <div class="text-lg lg:text-xl flex items-center font-semibold mb-3 lg:mb-5"><div class="sectionTitleIcon mr-3"><PromotionIcon></PromotionIcon></div> {t('app.Promos@@Promos')}</div>
                {homeData.d?.promos && homeData.d?.promos.length && 
                homeData.d?.promos.slice(0,2).map((item, i) => {
                  return (
                    <>
                <div class="grid grid-cols-1 lg:grid-cols-5 gap-4 promoDetails">
                  <div class="col-span-1 lg:col-span-2">
                    <img src={item.image} width="233" height="100" class="w-full" loading="lazy" decoding="async"/>
                  </div>
                  <div class="col-span-1 lg:col-span-3 flex flex-col gap-4 lg:gap-10 lg:pr-5">
                    <div class="font-semibold text-base lg:text-xl"> {item.name?.toUpperCase()}</div>
                    <div class="flex gap-1 mt-auto text-xs">
                        <div class="promoSubText flex gap-2 lg:gap-1"> 
                        <ClockIcon></ClockIcon> 
                        { item.no_limit ?t("events.Valid for unlimited time@@Valid for unlimited time"): t("events.Remaining time@@Remaining time") }
                        </div>
                        { !item.no_limit &&
                        <>
                        <div class="">.</div>
                        <div class="font-medium">{promoDatetimeRange(new Date(item.datefrom),new Date(item.dateto))}</div>
                        </>
                        }
                    </div>
                  </div>
                </div>
                {i == 0 && <div class="divider my-5"></div>}
                </>
                )
                })
                }
                <button class="promoBtn font-medium w-full py-3 px-6 rounded-lg mt-4 lg:mt-auto"   onClick$={() => {
                  window.open('/promotions/','_self')
                }}>{t('app.More@@More')} {t('app.Promos@@Promos')}</button>
            </section>

            <section class="col-span-1 lg:col-span-3 mb-6 p-6 promoWrapper rounded-xl">
                <div class="text-lg lg:text-xl flex items-center font-semibold mb-3 lg:mb-5"><div class="sectionTitleIcon mr-3"><ChatIcon></ChatIcon> </div>  {t('home.Customer Support@@Customer Support')} </div>
                <a href={cd.d?.website_settings.chatUrl ?? "#"} target={cd.d?.website_settings.chatUrl ? '_blank' : ''}>{t('app.Live Chat@@Live Chat')}</a>
                <div class="divider my-5"></div>
                {(csContacts?.whatsapp.displayColumn2 == true || csContacts?.whatsapp_2.displayColumn2 == true || csContacts?.whatsapp_3.displayColumn2 == true) && <>
                <div class="flex flex-col">
                  <div class=" mb-4 uppercase">Whatsapp</div>

                  <div class="flex gap-3">
                    {csContacts?.whatsapp.value && <>
                    <a class="whatsappText underline"
                    href={'https://wa.me/'+ csContacts?.whatsapp.value} >{csContacts?.whatsapp.value}</a>
                    </>}

                    {csContacts?.whatsapp_2.value && <>
                      <div class="line">|</div>
                      <a class="whatsappText underline"
                      href={'https://wa.me/'+ csContacts?.whatsapp_2.value} >{csContacts?.whatsapp_2.value}</a>
                    </>}

                    {csContacts?.whatsapp_3.value && <>
                    <div class="line">|</div>
                    <a class="whatsappText underline"
                    href={'https://wa.me/'+ csContacts?.whatsapp_3.value} >{csContacts?.whatsapp_3.value}</a>
                    </>}

                  </div>
                </div>
                <div class="divider my-5"></div>
                </>}
                {csContacts?.email.displayColumn2 == true && <>
                <a class="uppercase" href={(csContacts?.email.url ? `${csContacts.email.url}` :`#`)}
                                target={csContacts?.email.url ? '_blank' : ''}
                                >{t('app.Email@@Email')}</a>
                <div class="divider my-5"></div>
                </>}
                {csContacts?.fb_url.displayColumn2 == true && <>
                <a class="uppercase" href={(csContacts?.fb_url.url ? `${csContacts.fb_url.url}` :`#`)}
                                target={csContacts?.fb_url.url ? '_blank' : ''}
                                >Facebook</a>
                <div class="divider my-5"></div>
                </>}
                {csContacts?.line.displayColumn2 == true && <>
                <a  class="uppercase" href={(csContacts?.line.url ? `${csContacts.line.url}` :`#`)}
                                target={csContacts?.line.url ? '_blank' : ''}
                                >Line</a>
                <div class="divider my-5"></div>
                </>}
                {csContacts?.TelegramName.displayColumn2 == true && <>
                <a class="uppercase" href={(csContacts?.TelegramName.url ? `${csContacts.TelegramName.url}` :`#`)}
                                target={csContacts?.TelegramName.url ? '_blank' : ''}>Telegram</a>
                </>}
            </section>

            <section class="flex flex-col col-span-1 lg:col-span-2 mb-6 p-6 promoWrapper rounded-xl">
                <div class="text-lg lg:text-xl flex items-center font-semibold mb-3 lg:mb-5"><div class="sectionTitleIcon mr-3"><LiveHelpIcon></LiveHelpIcon></div> {t('app.FAQs@@FAQs')}</div>
                <a href="/info/faq/"> {t('home.How to Make a Deposit@@How to Make a Deposit')} </a>
                <div class="divider my-5"></div>

                <a href="/info/faq/"> {t('home.How to Make a Withdrawal@@How to Make a Withdrawal')} </a>
                <div class="divider my-5"></div>

                <a href="/info/how-sportsbook/"> {t('home.How to Play SportsBook@@How to Play SportsBook')} </a>
                <div class="divider my-5"></div>

                <a href="/info/faq/"> {t('home.Account, Payments and Bonuses@@Account, Payments and Bonuses')} </a>
                {/* <div class="divider my-5"></div> */}

                {/* <a href="/info/faq/" class="mb-4"> {t('home.Self Exclusion@@Self Exclusion')} </a> */}

                <button class="faqBtn font-medium w-full py-3 px-6 rounded-lg mt-4 lg:mt-auto"
                onClick$={() => {
                  window.open('/info/faq/','_self')
                }}
                > {t('app.More@@More')} {t('app.FAQs@@FAQs')}</button>
            </section>
          </div>
        

        </div>
      </div>
    </>
  );
});
