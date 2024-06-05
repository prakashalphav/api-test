import { $, component$, Resource, Slot, useOnDocument } from "@builder.io/qwik";
import type {
  DocumentHead,
  DocumentLink,
  DocumentMeta,
  DocumentScript,
  DocumentStyle,
} from "@builder.io/qwik-city";
import { routeLoader$ } from "@builder.io/qwik-city";

import ComplaintModal1 from "../modules/complaint-modal/variant-1/ComplaintModal1";
import LoginModal from "../modules/login-modal/variant-1/LoginModal1";
import LoginModal2 from "../modules/login-modal/variant-2/LoginModal2";

import RegisterModal from "../modules/register-modal/variant-1/RegisterModal1";
import {
  getCommonViewData,
  getMktLandingPageAsText,
} from "../services/contentDB";
import ForgotPwdModal from "~/modules/forgot-pwd/variant-1/ForgotPwdModal1";
import ResetPwdModal from "~/modules/reset-pwd/variant-1/ResetPwdModal1";
import ForceResetPwdModal from "~/modules/force-reset-pwd/variant-1/ForceResetPwdModal1";
import { isServer } from "@builder.io/qwik/build";
import SecondPinModal from "~/modules/multi-factor-auth/variant-1/SecondPin1";
import { useCreateCommonDataCtx } from "~/hooks/app/useCommonViewData";

import { useToasts } from "~/hooks/app/useInteract";
import { useNotifications } from "~/hooks/business/useNotifications";

import TransferWalletModal from "~/modules/transfer-wallet-modal/variant-1/TransferWalletModal1";
import LanguageModal from "~/modules/language-modal/variant-1/LanguageModal1";
import { imgBase, imageFileBase } from "~/services/images";
import { useActionFromUrl } from "~/hooks/utils/useActionFromUrl";
import { useSignals as useLangMenuSignals } from "~/hooks/business/useLangMenu";

import DLL from "@thednp/dll";
import {
  addElemsToDocumentHead,
  isHomePage,
  isMobileDevice,
} from "~/utils/common";
import { useRunScript } from "~/hooks/utils/useRunScript";

import pusherWorker from "../workers/pusher?worker&url";
export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  };
});
import LayoutOnixv2 from "~/modules/layouts/onixv2/LayoutOnixv2";
import LayoutFiregaming from "~/modules/layouts/firegaming/LayoutFiregaming";
import LayoutVega from "~/modules/layouts/vega/LayoutVega";
import LayoutWingaming from "~/modules/layouts/wingaming/LayoutWingaming";
import LayoutZplay from "~/modules/layouts/zplay/LayoutZplay";
import LayoutIdrgaming from "~/modules/layouts/idrgaming/LayoutIdrgaming";
import LayoutGamingonnet from "~/modules/layouts/gamingonnet/LayoutGamingonnet";
import { sortBySeq } from "~/utils/sysUtils";
import type { ApiData, CommonViewData, HeadElements } from "~/services/types";
import { useHasModal } from "~/hooks/app/useAppState";
export function getThemeNumberIfDemoSite(urlHost) {
  let themeNumber = null;

  const re = /^demo(\d\d)-[a-zA-Z0-9]{0,50}/m;
  const matches = urlHost.match(re);

  if (matches && matches.length > 0) {
    const demoNumberMatch = matches[1];

    const demoNumber = parseInt(demoNumberMatch);
    if (!isNaN(demoNumber) || demoNumber === 0) {
      themeNumber = demoNumber;
    }
  }

  return themeNumber;
}
export const useGetCommonViewData = routeLoader$(
  async (ev): Promise<ApiData<CommonViewData>> => {
    try {
      const path = "/" + ev.pathname.substring(ev.basePathname.length); // 'slots/toptrend-gaming'
      console.log("getCommonViewData", path);
      const response = await getCommonViewData(ev, path);
      const { ["d"]: excludedField, ...copiedObject } = response;
      if (response.d) {
        //process and determine themeNumber
        const demoTheme = getThemeNumberIfDemoSite(ev.url.host);
        const themeNumber =
          demoTheme !== null
            ? demoTheme
            : response.d?.website_settings.style_config_id2
              ? parseInt(response.d?.website_settings.style_config_id2)
              : 0;
        const games_data = sortBySeq(response.d.games_data);
        const modifiedData: ApiData<CommonViewData> = {
          ...response,
          d: {
            ...response.d,
            games_data: games_data,
            themeNumber: themeNumber,
          },
        };
        return modifiedData;
      }

      return response;
    } catch (error) {
      if (error.code === "MAINTENANCE") {
        throw ev.redirect(302, new URL("/maintenance/", ev.url).toString());
      }
      if (error.code === "AMP") {
        const ampFileName = error.message;
        const ampHtml = await getMktLandingPageAsText(ev, ampFileName);

        throw ev.html(200, ampHtml);
      }

      throw ev.error(500, error.message);
    }
  }
);

export default component$(() => {
  //const serverTime = useServerTimeLoader();

  const commonData = useGetCommonViewData();

  useCreateCommonDataCtx(commonData.value.d);
  console.log("commonData.value", commonData.value.d.agent_title);
  const { showLangMenu } = useLangMenuSignals();
  const { runScriptOnBrowser } = useRunScript();

  const { toasts, showToast } = useToasts();
  const { checkNotifications } = useNotifications();

 const {hasModal} =  useHasModal();
  useActionFromUrl(commonData.value.d?.alert_msg);
  // useVisibleTask$()
  useOnDocument(
    "DOMContentLoaded",
    $(async () => {
      if (isServer) {
        return;
      }
      console.log("run on DOMContentLoaded layout");

      //Debug : Uncomment to check commonData from api in browser
      console.log("commonData", commonData.value.d);

      /*load bg media imgs*/
      const loadPageMedia = () => {
        if (typeof window === "undefined") {
          return false;
        }

        const themeNumber = commonData.value.d?.themeNumber;
        let bgEle = null;
        switch (themeNumber) {
          case 13:
          case 7:
          case 6:
          case 2:
            /*theme 3 load for  desktop*/
            if (!isMobileDevice()) {
              bgEle = document.getElementById("pageContent");
            }
            break;
          case 3:
            /*theme 3 load for both Mobile n desktop*/
            bgEle = document.getElementById("pageContent");

            // if load on body element then use below code
            // const _bgEle= document.getElementsByTagName('body');
            // if(_bgEle && _bgEle.length){
            //   bgEle = _bgEle[0];
            // }
            break;
          default:
            break;
        }

        if (bgEle) {
          bgEle.setAttribute(
            "data-src",
            `${imgBase}/assets/imgs/onixv2/ui/theme-${themeNumber}/page_bg.webp`
          );
          console.log("loadPageMedia", "data-src");
          DLL(bgEle);
        }
      };

      loadPageMedia();

      /*pusher subcribe*/
      if (commonData.value.d?.website_settings.pusher_key) {
        if (typeof window.SharedWorker === "undefined") {
          throw "Your browser does not support SharedWorkers";
        }
        console.log(
          "pusherWorker setup",
          commonData.value.d?.website_settings,
          commonData.value.d?.isAuth
        );
        const worker = new SharedWorker(pusherWorker, { type: "module" });

        const onReceiveEvent = async (data) => {
          const interval = 4500;
          await showToast(
            data.notification_status == 1 ? "Success" : "Rejected",
            data.message,
            data.notification_status == 1 ? "s" : "f",
            interval
          );

          if (
            commonData.value.d?.isAuth &&
            data.notification_method == "memo"
          ) {
            await checkNotifications();
          }
        };

        // Listen for messages from the Shared Worker
        worker.port.onmessage = function (evt) {
          console.log("worker.port.onmessage", evt.data);
          if (evt.data.type === "receivedData") {
            onReceiveEvent(evt.data.payload);
          }
        };

        worker.onerror = function (err) {
          console.log("worker.port.onerror", err.message);
          worker.port.close();
        };

        const pusherConfig = {
          agentChannelId: commonData.value.d?.agent_ob_id,
          key: commonData.value.d?.website_settings.pusher_key,
          cluster: commonData.value.d?.website_settings.pusher_cluster,
        };

        if (commonData.value.d?.isAuth) {
          pusherConfig.playerChannelId = commonData.value.d?.player_object_id;
          pusherConfig.authEndpoint = "/pusher/auth";
          pusherConfig.auth = {
            // headers: {
            //   "X-Requested-With": "XMLHttpRequest",
            // }
          };
        }
        // Connect to the Shared Worker
        worker.port.start();

        // Send data to the Shared Worker
        worker.port.postMessage({
          action: "setData",
          type: "pusherConfig",
          payload: pusherConfig,
        });
        // Request object data from the Shared Worker
        worker.port.postMessage({ action: "getData" });

        if (commonData.value.d?.isAuth) {
          //initial check notifications
          await checkNotifications();
        }
      }

      //  if( !isMobileDevice()){
      //     /*run livechat script*/
      //    await  runScriptOnBrowser(commonData.value.d?.website_settings.livechatCode);
      //  }
    })
  );

  console.log("alert_msg", commonData.value.d?.website_settings.livechatCode);

  const scriptsOnDocEnd = { styles: [], scripts: [] } as DocumentHead;
  let scriptsOnDocEndAsText =  "" ;
  if( !isMobileDevice()){
    if (commonData.value.d?.website_settings.livechatCode) {
      const isSuccessAdded = addElemsToDocumentHead(
        scriptsOnDocEnd,
        //  `{"scripts":[{"innerText":"(function(w,d,v3){w.chaportConfig = {appId : '65bb4578d9e7ab4aea1dac78'};if(w.chaport)return;v3=w.chaport={};v3._q=[];v3._l={};v3.q=function(){v3._q.push(arguments)};v3.on=function(e,fn){if(!v3._l[e])v3._l[e]=[];v3._l[e].push(fn)};var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://app.chaport.com/javascripts/insert.js';var ss=d.getElementsByTagName('script')[0];ss.parentNode.insertBefore(s,ss)})(window, document);"}]}`,
        commonData.value.d?.website_settings.livechatCode,
        "lc"
      );

      
      if(!isSuccessAdded){
        scriptsOnDocEndAsText= commonData.value.d?.website_settings.livechatCode
      }
    }
 }

  return (
    <>
      <Resource
        value={commonData}
        onPending={() => <div>Loading...</div>}
        onRejected={() => <div>Error</div>}
        onResolved={(cd) => (
          <>
            {/* Google Tag Manager (noscript) */}
            {cd.d?.website_settings?.analytics?.gtag?.key && (
              <noscript>
                <iframe
                  src={`https://www.googletagmanager.com/ns.html?id=${cd.d.website_settings.analytics.gtag.key}`}
                  height="0"
                  width="0"
                  style="display:none;visibility:hidden"
                ></iframe>
              </noscript>
            )}

            {/* Faebookpixel (noscript) */}
            {cd.d?.website_settings?.analytics?.fbq?.key && (
              <noscript>
                <img
                  height="1"
                  width="1"
                  style="display:none"
                  src={`https://www.facebook.com/tr?id=${cd.d.website_settings.analytics.fbq.key}&ev=PageView&noscript=1`}
                />
              </noscript>
            )}

            {/* <div class="smooth-scroll-wrapper fixed z-[2] top-0 left-0 right-0 overflow-hidden"> */}

            {cd.d?.app_sub_skin === "onixgaming" && (
              <LayoutOnixv2>
                <Slot />
              </LayoutOnixv2>
            )}

            {cd.d?.app_sub_skin === "wingaming" && (
              <>
              <LayoutWingaming>
                <Slot />
              </LayoutWingaming>
              <LoginModal2
                  websiteTitle={cd.d?.website_settings.webTitle}
                ></LoginModal2>
              </>
            )}

            {cd.d?.app_sub_skin === "zplay" && (
              <LayoutZplay>
                <Slot />
              </LayoutZplay>
            )}

            {cd.d?.app_sub_skin === "vega" && (
              <LayoutVega>
                <Slot />
              </LayoutVega>
            )}
            {cd.d?.app_sub_skin === "idrgaming" && (
              <LayoutIdrgaming>
                <Slot />
              </LayoutIdrgaming>
             )}
             { cd.d?.app_sub_skin ==="gamingonnet"
             && (
              <LayoutGamingonnet>
                <Slot />
              </LayoutGamingonnet>
             )
             
             }

            {cd.d?.app_sub_skin === "firegaming" && (
              <>
                <LayoutFiregaming>
                  <Slot />
                </LayoutFiregaming>
                <LoginModal2
                  websiteTitle={cd.d?.website_settings.webTitle}
                ></LoginModal2>
              </>
            )}
            
    
            <ForgotPwdModal
              websiteTitle={cd.d?.website_settings.webTitle}
            ></ForgotPwdModal>
            <ComplaintModal1></ComplaintModal1>
            <RegisterModal
              pwdRegex={cd.d?.register_pwd_regex}
              websiteTitle={cd.d?.website_settings.webTitle}
              emailSubscribe={cd.d?.website_settings.is_email_subscription}
            ></RegisterModal>
            <ResetPwdModal pwdRegex={cd.d?.register_pwd_regex}></ResetPwdModal>
            <ForceResetPwdModal pwdRegex={cd.d?.register_pwd_regex}></ForceResetPwdModal>
            <SecondPinModal></SecondPinModal>
            <TransferWalletModal></TransferWalletModal>
            {showLangMenu.value == true && (
              <LanguageModal showLangMenu={showLangMenu}></LanguageModal>
            )}

            
{(cd.d?.app_sub_skin !== "firegaming" && cd.d?.app_sub_skin !== "wingaming") && (
              <LoginModal
                websiteTitle={cd.d?.website_settings.webTitle}
              ></LoginModal>
            )}


{ (scriptsOnDocEndAsText ) ?  ( <> 
        <div key={"lcscript" }  class="max-w-screen overflow-hidden" dangerouslySetInnerHTML={scriptsOnDocEndAsText}>
                       </div>

      </>)  : ( <>{scriptsOnDocEnd.styles.map((s) => (
              <style
                key={s.key}
                {...s.props}
                dangerouslySetInnerHTML={s.style}
              />
            ))}

            {scriptsOnDocEnd.scripts.map((s) => (
              <script
                key={s.key}
                {...s.props}
                dangerouslySetInnerHTML={s.script}
              />
            ))}</>)}


            
          </>
        )}
      />
    </>
  );
});

export const head: DocumentHead = ({ head, resolveValue, url }) => {
  const commonData = resolveValue(useGetCommonViewData);

  // commonData.d?.commonData.d
  const result: DocumentHead = {};
  result.links = head.links ? head.links : ([] as DocumentLink[]);
  result.meta = [] as DocumentMeta[];
  result.styles = [] as DocumentStyle[];
  result.scripts = [] as DocumentScript[];

  if (commonData.d?.website_settings?.googleAnalytics) {
    addElemsToDocumentHead(
      result,
      commonData.d?.website_settings?.googleAnalytics,
      "global"
    );
  }

  if (commonData.d?.seo) {
    const seo = commonData.d?.seo;
    result.title = seo.metaTitle;
    result.meta = result.meta.concat([
      { key: "description", name: "description", content: seo.metaDescription },
      { key: "keywords", name: "keywords", content: seo.metaKeyword },
      { key: "twitter_title", name: "twitter:title", content: seo.metaTitle },
      {
        key: "twitter_description",
        name: "twitter:description",
        content: seo.metaDescription,
      },
      { key: "og_title", property: "og:title", content: seo.metaTitle },
      {
        key: "og_description",
        property: "og:description",
        content: seo.metaDescription,
      },
    ] as DocumentMeta[]);

    if (seo.mkt_banner) {
      const ogImage =
        "https://files.sitestatic.net/mkt_banner_en/" + seo.mkt_banner;
      result.meta.push({
        key: "og_image",
        property: "og:image",
        content: ogImage,
      });

      result.meta.push({
        key: "twitter:image",
        name: "twitter:image",
        content: ogImage,
      });
    }

    if (seo.script) {
      addElemsToDocumentHead(result, seo.script, "page");
    }
  } else {
    result.title = commonData.d?.website_settings.PageTitle;
  }

  if (!commonData.d?.isNonSeoSite) {
    result.meta.push({
      key: "robots",
      name: "robots",
      content: "INDEX, FOLLOW",
    });

    result.meta.push({
      key: "og_url",
      property: "og:url",
      content: commonData.d?.canURL,
    });
    result.links.push({
      key: "canonical",
      rel: "canonical",
      href: commonData.d?.canURL,
    } as DocumentLink);
  } else {
    result.meta.push({
      key: "robots",
      name: "robots",
      content: "NOINDEX, NOFOLLOW",
    });

    result.meta.push({
      key: "og_url",
      property: "og:url",
      content: url.pathname,
    });
  }

  result.links.push({
    key: "icon",
    rel: "icon",
    href: `${imageFileBase}${commonData.d?.website_settings.websiteFavicon}`,
  } as DocumentLink);

  result.meta.push({
    key: "author",
    name: "author",
    content: commonData.d?.website_settings.webTitle,
  });
  result.meta.push({
    key: "og_site_name",
    property: "og:site_name",
    content: commonData.d?.website_settings.webTitle,
  });
  result.meta.push({
    key: "twitter_site",
    name: "twitter:site",
    content: commonData.d?.website_settings.webTitle,
  });

  const themeNumber = commonData.d?.themeNumber;
  if (themeNumber != null) {
    result.links.push({
      key: "global_css",
      rel: "stylesheet",
      media : "print", 
      onload: "this.media='all'",
      href: `/css/themes/theme-${themeNumber}/global.css?v=2.1`,
    } as DocumentLink);
   
    if (isHomePage(url.pathname)) {
      //if home

      result.links.push({
        key: "home_css",
        rel: "stylesheet",
        media : "print", 
        onload: "this.media='all'",
        href: `/css/themes/theme-${themeNumber}/home.css?v=2`,
      } as DocumentLink);
    } else {
      result.links.push({
        key: "homecss",
        rel: "stylesheet",
        media : "print", 
        onload: "this.media='all'",
        href: `/css/themes/theme-${themeNumber}/pages.css?v=1.9`,
      } as DocumentLink);
    }
  }

  const analytics = commonData.d?.website_settings?.analytics;

  if (analytics) {
    if (analytics.gtag?.key) {
      result.scripts.push({
        key: "pt1",
        props: { type: "text/partytown", async: true, src: `https://www.googletagmanager.com/gtag/js?id=${analytics.gtag.key}`, }, 
      });
      result.scripts.push({
        key: "pt2",
        props: { type: "text/partytown" },
        script: `window.dataLayer = window.dataLayer || [];
      function gtag(){window.dataLayer.push(arguments);}
      gtag('js', new Date());
   
      gtag('config', '${analytics.gtag.key}');`,
      });
    }

    if (analytics.fbq?.key) {
      result.scripts.push({
        key: "pt3",
        props: { type: "text/partytown" },
        script: `!function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${analytics.fbq.key}');
      fbq('track', 'PageView');`,
      });
    }
  }

  return result;
};
