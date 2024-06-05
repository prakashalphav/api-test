import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { useCommonViewData } from "~/hooks/app/useCommonViewData";
import styles from "./Header5.scss?inline";
import MainNav from "./partials/header-main-nav/variant-1/HeaderMainNav5";
import { inlineTranslate } from "qwik-speak";
import { BurgerMenu } from "~/components/icons/BurgerMenu";
import {
  getCountryCodeByLang,
  useLangMenu,
} from "~/hooks/business/useLangMenu";
import LanguageMenu from "~/components/language-menu/variant-1/LanguageMenu1";
import { homeLogoBase } from "~/services/images";
import LazyImage from "~/components/image/LazyImage";
import { ArrowDownIcon } from "~/components/icons/ArrowDown";
import { ArrowUpIcon } from "~/components/icons/ArrowUp";
import { useDateTime, useHeader } from "~/hooks/business/useHeader";
import { useMainNav1Mapping } from "~/hooks/business/useHeader";
import Announcement from "~/components/announcement/variant-1/Announcement1";
import { Announcement2Icon } from "~/components/icons/Announcement2";
import { DownloadAppIcon } from "~/components/icons/DownloadApp";
import { ClockIcon } from "~/components/icons/Clock";
import { LiveHelpIcon } from "~/components/icons/LiveHelp";
import { extendProtocol } from "~/utils/sysUtils";
import { ShareIcon } from "~/components/icons/Share";

type Props = {
  contactLinks?: any;
  zIndex: number;
  isAuth: boolean;
  memberLevel?: string;
  username?: string;
};
export default component$((props: Props) => {
  useStylesScoped$(styles);
  const t = inlineTranslate();

  const { showLangMenu, toggleLangMenu, currLang } = useLangMenu();

  const { ms, timeToShow, gmtLabel } = useDateTime();

  const { commonData } = useCommonViewData();
  const { toggleSideNavQRL } = useHeader();

  return (
    <>
      <div class={`header relative`} style={"z-index:" + props.zIndex + ";"}>
        <div class="block">
          <div class="headerWrapper w-full relative bg-neutral-800">
            <div class="min-w-full gap-2 items-center h-full">
              {/* part 1 of the navbar */}

              <div class="border-b h-2 border-neutral-800 bg-neutral-800"></div>

              <div class="flex max-w-screen--xs-full">
                {/* logo */}
                <div class="bg-neutral-800 rounded-br-lg ml-3.5 mr-3.5 lg:mr-5">
                  <a class="logo items-center" href="/">
                    <LazyImage
                      src={
                        homeLogoBase + commonData.website_settings?.websiteLogo
                      }
                      height={60}
                      width={180}
                      class={"lg:h-full w-auto"}
                    ></LazyImage>
                  </a>
                </div>

                <div class="headerInnerWrapper flex-center w-full gap-4 rounded-tl-lg px-2 lg:px-4">
                  {/* Icon */}
                  <div class="flex-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 17 16"
                      fill="none"
                      class="size-5"
                    >
                      <path
                        fill="none"
                        stroke="#DBD7DF"
                        stroke-width="2"
                        d="M2.11275 4.48145H4.71293V9.61664H2.11275C1.94817 9.61664 1.79033 9.55126 1.67395 9.43488C1.55757 9.3185 1.49219 9.16066 1.49219 8.99607V5.10201C1.49219 4.93743 1.55757 4.77958 1.67395 4.66321C1.79033 4.54683 1.94817 4.48145 2.11275 4.48145ZM4.71094 9.6166V4.4814C4.71094 4.4814 6.06688 4.51243 8.32264 4.4814C10.5784 4.45037 13.2189 3.02307 14.9348 1.56474C14.9797 1.52635 15.0346 1.50156 15.093 1.49329C15.1515 1.48502 15.2111 1.49361 15.2649 1.51805C15.3186 1.54248 15.3643 1.58175 15.3965 1.63125C15.4287 1.68074 15.4462 1.7384 15.4468 1.79745V12.313C15.4466 12.3709 15.4303 12.4276 15.3996 12.4766C15.3689 12.5257 15.3251 12.5653 15.2732 12.5908C15.2212 12.6163 15.1631 12.6267 15.1055 12.621C15.0479 12.6152 14.9931 12.5934 14.9472 12.5581C13.8426 11.6893 11.0935 9.74692 8.43124 9.66624C6.87361 9.6166 5.61386 9.6166 4.71094 9.6166Z"
                      />
                      <path
                        fill="none"
                        stroke="#DBD7DF"
                        stroke-width="2"
                        d="M5.77178 14.5159H4.28241C4.11783 14.5159 3.95999 14.4505 3.84361 14.3341C3.72723 14.2178 3.66185 14.0599 3.66185 13.8953L3.35156 9.61963H6.08206L6.39234 13.8953C6.39234 14.0599 6.32696 14.2178 6.21058 14.3341C6.0942 14.4505 5.93636 14.5159 5.77178 14.5159Z"
                      />
                    </svg>
                  </div>

                  {/* Text */}
                  <div class="relative flex-grow">
                    <div
                      class="z-10 absolute w-full h-full"
                      style="background-image: linear-gradient(to left, rgba(0,0,0,1), rgba(0,0,0,0));"
                    ></div>
                    <Announcement
                      annoucement={commonData?.annoucement}
                      class="p-2 pt-3 w-full relative z-0"
                    ></Announcement>
                  </div>

                  <div class="relative lg:block hidden">
                    <div class="items-center flex flex-center gap-6">
                      {props.isAuth && (
                        <>
                          {/* CLock */}
                          <div class="flex items-center">
                            <ClockIcon class="w-4 h-4"></ClockIcon>
                            <span class="ml-1 truncate">
                              {timeToShow.value}
                            </span>
                          </div>

                          {/* Download App Icon */}
                          <a href={commonData?.website_settings?.apk_url || ""}>
                            <DownloadAppIcon class="w-5 h-5"></DownloadAppIcon>
                          </a>

                          {/* Share Icon */}
                          <a class="flex-center" href="/referral/">
                            <ShareIcon class="w-4 h-4"></ShareIcon>{" "}
                          </a>

                          {/* live Help */}
                          <a
                            href={extendProtocol(
                              commonData?.website_settings?.chatUrl
                            )}
                            target="_blank"
                            class="flex-center"
                          >
                            <LiveHelpIcon class="w-4 h-4"></LiveHelpIcon>
                          </a>
                        </>
                      )}

                      {/* lang menu */}
                      <div class="ml-auto animate fade-in-bottom dropdown relative pl-5">
                        <div
                          class="flex-center gap-2 cursor-pointer"
                          onClick$={() => toggleLangMenu()}
                        >
                          <span class="aspect-square" style="width:18px">
                            <img
                              src={`https://files.sitestatic.net/assets/imgs/country-flags/${getCountryCodeByLang(
                                currLang
                              )}.png`}
                              loading="lazy"
                              decoding="async"
                              width="18"
                              height="18"
                            />
                          </span>
                          <span>
                            {Object.entries(commonData.agent_lang_opts).map(
                              ([langCode, value]) => langCode == currLang ? value.name : ''
                            )}
                          </span>
                          {showLangMenu.value ? (
                            <ArrowUpIcon class="w-3 h-3" />
                          ) : (
                            <ArrowDownIcon class="w-3 h-3" />
                          )}
                        </div>
                        {showLangMenu.value && (
                          <>
                            <LanguageMenu
                              class={`popUpMenu right-0 top-0 z-50 absolute`}
                              langOpts={commonData.agent_lang_opts}
                              currLang={currLang}
                            ></LanguageMenu>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Burguer menu */}
                  <div class="col-span-1 lg:hidden flex" style="height: inherit;">
                    <button
                      class="text-2xl"
                      type="button"
                      onClick$={toggleSideNavQRL}
                    >
                      <BurgerMenu></BurgerMenu>
                    </button>
                  </div>
                </div>
              </div>

              {/* MainNav - Link/btn's-main */}
              <MainNav
                class={`relative`}
                contactLinks={props.contactLinks}
                platform={"PC"}
                isAuth={props.isAuth}
                isOnCustomMenu1={commonData.website_settings.isOnCustomMenu}
                isOnCustomMenu2={commonData.website_settings.isOnCustomMenu2}
              ></MainNav>
              <div class="border-b h-1 border-yellow-500 bg-yellow-500"></div>
            </div>
          </div>
        </div>

        {/* Header Top */}
      </div>
    </>
  );
});
