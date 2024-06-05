import {
  component$,
  useStylesScoped$,
  useSignal,
  $, 
} from "@builder.io/qwik";
import styles from "./HeaderMainNav1.scss?inline";
import { inlineTranslate,  } from "qwik-speak";
import { ArrowDownIcon } from "~/components/icons/ArrowDown";
import { ArrowUpIcon } from "~/components/icons/ArrowUp";
import { useComplaintModal } from "~/hooks/business/useComplaintForm";
import LanguageMenu from "~/components/language-menu/variant-1/LanguageMenu1";

import { WarningIcon } from "~/components/icons/Warning";

import {
  useLangMenu,
  getLangName,
  getCountryCodeByLang,
} from "~/hooks/business/useLangMenu";
import type { LanguageOptions, Provider } from "~/services/types";
import { useCommonViewData } from "~/hooks/app/useCommonViewData";
import LinkButton from "~/components/link-button/variant-1/LinkButton1";
import { isGameAllowed,   } from "~/utils/sysUtils";
import { useGameLaunch } from "~/hooks/business/useGameList";
import { useMainNav1Mapping } from "~/hooks/business/useHeader";

type Props = {
  isMobile: boolean;
  isOnCustomMenu1?: string | number;
  isOnCustomMenu2?: string | number;
  langOpts?: LanguageOptions; 
  class?: string;
};
export default component$((props: Props) => {
  useStylesScoped$(styles);
  const { toggleModalQRL: toggleComplaintQRL } = useComplaintModal();

  const { showLangMenu, toggleLangMenu , currLang } = useLangMenu();
  const currLangName = getLangName(currLang, props.langOpts);
  const {commonData} = useCommonViewData();  
  
  const t = inlineTranslate();
  const { openGameLobbyQRL, checkGameAllowedQRL } = useGameLaunch();
  const {navMenuMap} = useMainNav1Mapping()
  return (
    <>
      {/* desktop */}

      <div
       style="height:68px;"
        class={`relative surface hidden lg:block w-full text-center headerMainNav ${
          props.class ?? ""
        }`}
      >
        <div class="max-w-screen mx-auto flex items-center">
          <div class={" flex items-center"}>
            <a
              style="width:90px;"
              href="/"
              class="transition-all  navItem py-1   cursor-pointer animate fade-in-bottom  "
            >
              <img
                src="/images/svg/HomeSilver.svg"
                class="inline-block w-10 h-10 "
              ></img>
              <span class="block text-sm  truncate">{t("app.HOME@@HOME")}</span>
            </a>

            {/* do not return this the inner menu on mobile for performance */}
            {!props.isMobile &&
              Object.values(commonData.categories).map((category: string) => {
                const menuData = navMenuMap.get(category);

                return (
                  <>
                    {menuData ? (
                      <div class="group ">
                        <a
                           style="width:90px;"
                          href={menuData.href}
                          class="transition-all navItem  py-1 block cursor-pointer animate fade-in-bottom  "
                        >
                     
                        <img
                            src={`${menuData.icon}`}
                            width="48"
                            height="48"
                            loading='lazy' decoding='async'
                            class="inline-block w-10 h-10 "
                          ></img>
                          <div class=" text-sm truncate ">{menuData.name.toUpperCase()}</div>
                      
                        </a>
                        <div class="contentInner absolute w-full invisible group-hover:visible left-0 z-50 p-2">
                          <div class="headerMainNavInnerContent max-w-screen mx-auto   overflow-auto scroller " style="height:318px;">
                            <div class="grid grid-cols-7 xl:grid-cols-8  ">
                            {Object.values(commonData.games_data[category]).map(
                              (item: Provider) => (
                                <LinkButton
                                  toUrl={
                                    !item.is_launch && isGameAllowed(item)
                                      ? `/${item.category_slug}/${item.brand_slug}`
                                      : ""
                                  }
                                  class={`hover:scale-110 transition-transform block col-span-1 flex-center flex-col p-2 ${
                                    !isGameAllowed(item) ? "opacity-50" : ""
                                  }`}
                                  onClick$={async (e) => {
                                    if (item.is_launch) {
                                      await openGameLobbyQRL(
                                        e,
                                        item,
                                        commonData.isAuth
                                      );
                                    } else {
                                      await checkGameAllowedQRL(
                                        item.block,
                                        item.maintenance,
                                        item.isCO,
                                        item.isPromoDisabled
                                      );
                                    }
                                  }}
                                >
                                  <img
                                    class={``}
                                    width="100"
                                    height="70"
                                    loading="lazy"
                                    decoding="async"
                                    src={`https://files.sitestatic.net/assets/imgs/game_logos/100x70/${
                                      item.image
                                    }.png`}
                                  />
                                  <div class="py-1">{item.game_name}</div>
                                </LinkButton>
                              )
                            )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}{" "}
                  </>
                );
              })}

            <a
               style="width:90px;"
              href="/promotions/"
              class="transition-all  navItem py-1 cursor-pointer animate fade-in-bottom "
            >
              <img
                src="/images/svg/PromotionSilver.svg"
                class="inline-block w-10 h-10 "
              ></img>
              <span class="block text-sm  truncate">
                {t("app.Promotions@@Promotions").toUpperCase()}
              </span>
            </a>
            {commonData.website_settings?.isOffReferralMenu != '1' &&
              <a
                style="width:90px;"
                href="/referral/"
                class="transition-all  navItem py-1 cursor-pointer animate fade-in-bottom  "
              >
                <img
                  src="/images/svg/ReferralSilver.svg"
                  class="inline-block w-10 h-10 "
                ></img>
                <span class="block text-sm  truncate">
                  {t("app.REFERRAL@@REFERRAL")}
                </span>
              </a>
            }
            {commonData.website_settings?.isOnCustomMenu == 1 &&
              commonData.website_contents !== undefined && (
                <a
                  href={
                    "/" + commonData.website_settings.custom_menu_title ?? "#"
                  }
                  
                  target="_blank"
                  class="transition-all  navItem  py-1 cursor-pointer animate fade-in-bottom "
                  style="width:90px;"
                >
                  <img
                    src={
                      "https://files.sitestatic.net/ImageFile/" +
                      commonData.website_contents.custom_menu_logo
                    }
                    class="inline-block w-10 h-10 "
                  ></img>
                  <span class="block text-sm  truncate">
                    {commonData.website_settings.custom_menu_title?.toUpperCase()}
                  </span>
                </a>
              )}
            {commonData.website_contents?.isOnCustomMenu2 == 1 && (
              <a
                href={commonData.website_contents.custom_menu2_url ?? "#"}
                target="_blank"
                class="transition-all  navItem py-1 cursor-pointer animate fade-in-bottom  "   style="width:90px;"
              >
                <img
                  src={
                    "https://files.sitestatic.net/ImageFile/" +
                    commonData.website_contents.custom_menu2_logo
                  }
                  class="inline-block w-10 h-10 "
                ></img>
                <span class="block text-sm  truncate">
                  {commonData.website_contents.custom_menu2_title?.toUpperCase()}
                </span>
              </a>
            )}
            {/* <a  href="/" class="cursor-pointer" >
                <div class="inline-block text-2xl"> 1</div>
                <span class="block text-sm ">CUSTOM1</span>
            </a>
            <a  href="/" class="cursor-pointer" >
                <div class="inline-block text-2xl"> 2</div>
                <span class="block text-sm ">CUSTOM2</span>
            </a>
            <a  href="/" class="cursor-pointer" >
                <div class="inline-block text-2xl"> 3</div>
                <span class="block text-sm ">CUSTOM3</span>
            </a> */}
          </div>

          <div class="absolute right-6 flex items-center gap-2">
          {commonData.website_settings?.is_allow_complaint_form == '1' &&
            <button
              class="btnSecondary py-1 border rounded-full border-nude-color font-medium text-nude-color flex-center gap-1.5 md:text-base md:px-5 animate fade-in-bottom"
              type="button"
              onClick$={toggleComplaintQRL}
            >
              <WarningIcon></WarningIcon>
              <span>{t("app.Complaint@@Complaint")}</span>
            </button>
        }
            <div class="animate fade-in-bottom dropdown relative  ">
              <div
                class="inline-flex items-center cursor-pointer"
                onClick$={() => toggleLangMenu()}
              >
                <span class="w-7 h-7">
                  <img
                    src={`https://files.sitestatic.net/assets/imgs/country-flags/${getCountryCodeByLang(
                      currLang
                    )}.png`}
                    loading="lazy"
                    decoding="async"
                    width="28"
                    height="28"
                  />
                </span>
                <span class="px-2">{currLangName}</span>
                {showLangMenu.value ? <ArrowUpIcon /> : <ArrowDownIcon />}
              </div>
              {showLangMenu.value && (
                <>
                  <LanguageMenu
                    class={`popUpMenu  right-0 top-0  absolute`}
                    langOpts={props.langOpts}
                    currLang={currLang}
                  ></LanguageMenu>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
