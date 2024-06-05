import { component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./Footer5.scss?inline";
import { TwitterIcon } from "~/components/icons/Twitter2";
import { FacebookIcon } from "~/components/icons/Facebook2";
import { InstagramIcon } from "~/components/icons/Instagram";
import { TelegramIcon } from "~/components/icons/Telegram2";
import { useFooter } from "~/hooks/business/useFooter";
import { inlineTranslate } from "qwik-speak";
import { isLightTheme, makeContactLinks } from "~/utils/sysUtils";

type Props = {
  websiteLogo?: string;
};

export default component$((props: Props) => {
  useStylesScoped$(styles);
  const t = inlineTranslate();

  const { commonData, paymentTypeUrls, version, year } = useFooter();
  const csContacts = makeContactLinks(commonData.babysite_cs_contacts);
  // const footerMenu = [
  //     { title: "Game Providers", content: "test test content" },
  //     { title: "Play at top and trusted online casino malaysia", content: "test test content" },
  // ];

  // const selMenu = useSignal(-1);

  return (
    <>
      <div class="footer  ">
          <div class="aboutContent">
          <div class="max-w-screen px-7  py-4 grid grid-cols-10   ">
            {/* <div class=" col-span-10 lg:col-span-4  ">
              <div class="title mb-3 font-semibold">
                {t("app.About@@About")}
              </div>
              <p class="text-xs">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries,
              </p>
            </div> */}

            <div class="col-span-10  py-3">
            {/* lg:col-span-2 lg:col-start-8  2xl:col-start-8 */}
              <div class="title mb-3 font-semibold">
                {t("app.Payment Methods@@Payment Methods")}
              </div>
              <div class="flex flex-wrap gap-2.5">
                {paymentTypeUrls.map((item) => (
                  <>
                    <img
                      width="100"
                      height="35"
                      class="rounded-md bg-white"
                      loading="lazy"
                      decoding="async"
                      alt="bank transfer"
                      src={item}
                    />
                  </>
                ))}
              </div>
            </div>
          </div>
          </div>
          <div class=" max-w-screen px-7 ">
            <div class=" grid grid-cols-1 lg:grid-cols-8 pt-10  pb-3">
              <div class="grid grid-cols-1 lg:grid-cols-4 lg:col-span-4 mb-5 gap-5">
                <div class="col-span-1">
                  <div class="title mb-3 font-semibold">
                    {t("app.Information@@Information")}
                  </div>
                  <a href="/info/faq" class="mb-4 block text-xs">
                    {t("app.About Us@@About Us")}
                  </a>
                  <a href="/info/faq" class="mb-4 block text-xs">
                    {t("app.Affiliate Program@@Affiliate Program")}
                  </a>
                  <a href="/info/faq" class="mb-4 block text-xs">
                    {t("app.Responsible Gaming@@Responsible Gaming")}
                  </a>
                </div>
                <div class="col-span-1">
                  <div class="title mb-3 font-semibold">
                    {t("app.Help@@Help")}
                  </div>
                  <a href="/info/faq" class="mb-4 block text-xs">
                    {t("app.FAQs@@FAQs")}
                  </a>
                  <a href="/info/faq" class="mb-4 block text-xs">
                    {t("app.Contact Us@@Contact Us")}
                  </a>
                  <a href="/info/faq" class="mb-4 block text-xs">
                    {t("app.Blog@@Blog")}
                  </a>
                </div>
                <div class="col-span-1">
                  <div class="title mb-3 font-semibold">
                    {t("app.Terms & Conditions@@Terms & Conditions")}
                  </div>
                  <a href="/info/faq" class="mb-4 block text-xs">
                    {t("app.User Agreement@@User Agreement")}
                  </a>
                  <a href="/info/faq" class="mb-4 block text-xs">
                    {t("app.Privacy Policy@@Privacy Policy")}
                  </a>
                </div>
                <div class="col-span-1">
                  <div class="title mb-3 font-semibold">
                    {t("app.24/7 support@@24/7 support")}
                  </div>
                  <a
                    href={commonData.website_settings.chatUrl ?? "#"}
                    target={commonData.website_settings.chatUrl ? "_blank" : ""}
                    class="mb-4 block text-xs"
                  >
                    {t("app.Online Chat@@Online Chat")}
                  </a>
                </div>
              </div>
            </div>
            {/* <div class="px-4 col-span-10 sm:col-span-5  pt-10 pl-7 pb-3 ">
                    <div class="sm:float-right sm:text-right text-left float-none">
                        <div class="mb-4 title">{t('app.Platform Service Provider@@Platform Service Provider')}</div>
                        <div class="mb-8">
                            <img class="inline-block " src={props.websiteLogo} width="128" height="50"/>
                           
                            </div>

                       
                    </div>
                </div> */}

            <div class="  divider w-full"></div>
            <div class="  grid grid-cols-6  py-4 pb-24                                                               lg:pb-0 items-center">
              <div class="col-span-6 lg:col-span-2 order-3 lg:order-1">
                <div class="flex flex-wrap mb-2 gap-2.5">
                  <div class="browserIcon  rounded-full p-2">
                    <img
                      class="img-fluid"
                      width="26"
                      height="26"
                      loading="lazy"
                      decoding="async"
                      alt="edge"
                      src="https://files.sitestatic.net/assets/imgs/browser_icons/browser_edge.webp"
                    />
                  </div>
                  <div class="browserIcon  rounded-full p-2">
                    <img
                      class="img-fluid"
                      width="26"
                      height="26"
                      loading="lazy"
                      decoding="async"
                      alt="chrome"
                      src="https://files.sitestatic.net/assets/imgs/browser_icons/browser_chrome.webp"
                    />
                  </div>
                  <div class="browserIcon  rounded-full p-2">
                    <img
                      class="img-fluid"
                      width="26"
                      height="26"
                      loading="lazy"
                      decoding="async"
                      alt="safari"
                      src="https://files.sitestatic.net/assets/imgs/browser_icons/browser_safari.webp"
                    />
                  </div>
                  <div class="browserIcon  rounded-full p-2">
                    <img
                      class="img-fluid"
                      width="26"
                      height="26"
                      loading="lazy"
                      decoding="async"
                      alt="firefox"
                      src="https://files.sitestatic.net/assets/imgs/browser_icons/browser_firefox.webp"
                    />
                  </div>
                </div>
              </div>
              <div class="col-span-6 lg:col-span-2 order-2 mb-5 lg:my-0 lg:text-center">
                ©{year} . {t("app.All rights reserved@@All rights reserved")} |
                18+ | v{version}
              </div>
              <div class="col-span-6 lg:col-span-2 order-1 lg:order-3 flex lg:justify-end">
                <div class=" ">
                  <div class="mb-4 title w-full">
                    {t("app.Connect@@Connect")}
                  </div>
                  <div class="flex flex-wrap mb-2 gap-2.5">
                  {!! csContacts?.fb_url.displayColumn &&
                    <a
                      href={
                        csContacts?.fb_url.url
                          ? `${csContacts.fb_url.url}`
                          : `#`
                      }
                      target={csContacts?.fb_url.url ? "_blank" : ""}
                      class="text-3xl"
                    >
                      <span class="social-icons rounded-full inline-block">
                        <FacebookIcon
                          bgColor="#000000"
                          iconColor="#fff"
                          class="w-10 h-10"
                        ></FacebookIcon>
                      </span>
                    </a>
                    }
                    {!! csContacts?.ig_url.displayColumn &&
                    <a
                      href={
                        csContacts?.ig_url.url
                          ? `${csContacts.ig_url.url}`
                          : `#`
                      }
                      target={csContacts?.ig_url.url ? "_blank" : ""}
                      class="text-3xl"
                    >
                      <span class="social-icons rounded-full inline-block">
                        <InstagramIcon
                          bgColor="#000000"
                          iconColor="#fff"
                          class="w-10 h-10"
                        ></InstagramIcon>
                      </span>
                    </a>
                    }
                    {!! csContacts?.TelegramName.displayColumn &&
                    <a
                      href={
                        csContacts?.TelegramName.url
                          ? `${csContacts.TelegramName.url}`
                          : `#`
                      }
                      target={csContacts?.TelegramName.url ? "_blank" : ""}
                      class="text-3xl"
                    >
                      <span class="social-icons rounded-full inline-block">
                        <TelegramIcon
                          bgColor="#000000"
                          iconColor="#fff"
                          class="w-10 h-10"
                        ></TelegramIcon>
                      </span>
                    </a>
                    }
                    {!! csContacts?.twitter_url.displayColumn &&
                    <a
                      href={
                        csContacts?.twitter_url.url
                          ? `${csContacts.twitter_url.url}`
                          : `#`
                      }
                      target={csContacts?.twitter_url.url ? "_blank" : ""}
                      class="text-3xl"
                    >
                      <span class="social-icons rounded-full inline-block">
                        <TwitterIcon
                          bgColor="#000000"
                          iconColor="#fff"
                          class="w-10 h-10"
                        ></TwitterIcon>
                      </span>
                    </a>
                    }
                  </div>
                </div>
              </div>
            </div>
            <div class="  divider w-full"></div>
            <div
            class="py-4 whitespace-break-spaces  "
            dangerouslySetInnerHTML={commonData.seo?.footer_description || ""}
          ></div> 
          </div>
         
      </div>
    </>
  );
});
