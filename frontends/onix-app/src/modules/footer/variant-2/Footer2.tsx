import { component$, useStylesScoped$   } from '@builder.io/qwik'; 
import styles from './Footer2.scss?inline';  
import { TwitterIcon } from '~/components/icons/Twitter3';
import { FacebookIcon } from '~/components/icons/Facebook3';
import { InstagramIcon } from '~/components/icons/Instagram2';
import { TelegramIcon } from '~/components/icons/Telegram3';
import { useFooter } from '~/hooks/business/useFooter';
import PlatformProvider from "~/components/platform-provider/variant-1/PlatformProvider1";
import {
    inlineTranslate,  
  } from 'qwik-speak';
import { isLightTheme, makeContactLinks } from "~/utils/sysUtils"; 

type Props = { 
    websiteLogo?:string;
};

export default component$((props: Props) => {

    useStylesScoped$(styles);
    const t = inlineTranslate(); 
   
    const {commonData, paymentTypeUrls,version,year} = useFooter();
    const csContacts = makeContactLinks(commonData.babysite_cs_contacts);
    // const footerMenu = [
    //     { title: "Game Providers", content: "test test content" },
    //     { title: "Play at top and trusted online casino malaysia", content: "test test content" },
    // ];

    // const selMenu = useSignal(-1);
    
    return ( 
    <> 
        <div class="footer  w-full">
            <div class="content max-w-screen pt-7 sm:pt-10 " style="padding-bottom:160px;">
                <div class="grid grid-cols-2 sm:grid-cols-5 mb-6 gap-4 sm:gap-6">
                    <div class="col-span-1 flex flex-col gap-4 mb-0 sm:mb-10">
                        <div class="title mb-1">{t('app.Information@@Information')}</div>
                        <a href="/info/faq" class="text-xs navItem">{t('app.About Us@@About Us')}</a>
                        <a href="/info/faq" class="text-xs navItem">{t('app.Affiliate Program@@Affiliate Program')}</a>
                        <a href="/info/faq" class="text-xs navItem">{t('app.Responsible Gaming@@Responsible Gaming')}</a>
                    </div>
                    <div class="col-span-1 flex flex-col gap-4">
                        <div class="title mb-1">{t('app.Help@@Help')}</div>
                        <a href="/info/faq" class="text-xs navItem">{t('app.FAQs@@FAQs')}</a>
                        <a href="/info/faq" class="text-xs navItem">{t('app.Contact Us@@Contact Us')}</a>
                        <a href="/info/faq" class="text-xs navItem">{t('app.Blog@@Blog')}</a>
                    </div>
                    <div class="col-span-1 flex flex-col gap-4">
                        <div class="title mb-1">{t('app.Terms & Conditions@@Terms & Conditions')}</div>
                        <a href="/info/faq" class="text-xs navItem">{t('app.User Agreement@@User Agreement')}</a>
                        <a href="/info/faq" class="text-xs navItem">{t('app.Privacy Policy@@Privacy Policy')}</a>
                    </div>
                    <div class="col-span-1 flex flex-col gap-4">
                        <div class="title mb-1">{t('app.24/7 support@@24/7 support')}</div>
                        <a href={commonData.website_settings.chatUrl ?? '#'} target={commonData.website_settings.chatUrl ? '_blank' : ''}  class="text-xs navItem">{t('app.Online Chat@@Online Chat')}</a>
                    </div>
                    <div class="col-span-2">
                        <div class="mb-4 title">{t('app.Payment Methods@@Payment Methods')}</div>
                        <div class="flex flex-wrap gap-2 items-center">
                            {paymentTypeUrls.map((item)=>(
                                <>
                                <img width="100" height="35" class="rounded-md bg-white" loading="lazy" decoding="async" 
                                    alt="bank transfer" src={item}
                                />
                                </>
                            ))}
                        </div>
                    </div>
                    <div class="col-span-2 sm:col-span-1">
                        <div class="mb-4 title">{t('app.Follow Us@@Follow Us')}</div>
                        <div class="flex flex-wrap gap-4">
                        {!! csContacts?.fb_url.displayColumn &&
                            <a
                                href={(csContacts?.fb_url.url ? `${csContacts.fb_url.url}` :`#`)}
                                target={csContacts?.fb_url.url ? '_blank' : ''}
                                class="text-3xl"
                            >
                                <span class="social-icons rounded-full inline-block">
                                    <FacebookIcon class="w-8 h-8"></FacebookIcon>
                                </span>
                            </a>
                            }
                            {!! csContacts?.ig_url.displayColumn &&
                            <a
                                href={(csContacts?.ig_url.url ? `${csContacts.ig_url.url}` :`#`)}
                                target={csContacts?.ig_url.url ? '_blank' : ''}
                                class="text-3xl"
                            >
                                <span class="social-icons rounded-full inline-block">
                                    <InstagramIcon class="w-8 h-8"></InstagramIcon>
                                </span>
                            </a>
                            }
                            {!! csContacts?.TelegramName.displayColumn &&
                            <a
                                href={(csContacts?.TelegramName.url ? `${csContacts.TelegramName.url}` :`#`)}
                                target={csContacts?.TelegramName.url ? '_blank' : ''}
                                class="text-3xl"
                            >
                                <span class="social-icons rounded-full inline-block">
                                    <TelegramIcon class="w-8 h-8"></TelegramIcon>
                                </span>
                            </a>
                            }
                            {!! csContacts?.telegram_group_link.displayColumn &&
                            <a
                                href={(csContacts?.telegram_group_link.url ? `${csContacts.telegram_group_link.url}` :`#`)}
                                target={csContacts?.telegram_group_link.url ? '_blank' : ''}
                                class="text-3xl"
                            >
                                <span class="social-icons rounded-full inline-block">
                                    <TelegramIcon class="w-8 h-8"></TelegramIcon>
                                </span>
                            </a>
                            }
                            {!! csContacts?.twitter_url.displayColumn &&
                            <a
                                href={(csContacts?.twitter_url.url ? `${csContacts.twitter_url.url}` :`#`)}
                                target={csContacts?.twitter_url.url ? '_blank' : ''}
                                class="text-3xl"
                            >
                                <span class="social-icons rounded-full inline-block">
                                    <TwitterIcon class="w-8 h-8"></TwitterIcon>
                                </span>
                            </a>
                            }
                        </div>
                    </div>
                    <div class="col-span-2 sm:col-span-1">
                    <div class="mb-4 title">{t('app.Suggested Browser@@Suggested Browser')}</div>
                        <div class="flex flex-wrap gap-4">
                            <div class="browser-icon-bg">
                                <img
                                    class="img-fluid" width="32" height="32" loading="lazy" decoding="async" alt="edge"
                                    src="https://files.sitestatic.net/assets/imgs/browser_icons/browser_edge.webp"
                                />
                            </div>
                            <div class="browser-icon-bg">
                                <img
                                    class="img-fluid" width="32" height="32" loading="lazy" decoding="async" alt="chrome"
                                    src="https://files.sitestatic.net/assets/imgs/browser_icons/browser_chrome.png"
                                />
                            </div>
                            <div class="browser-icon-bg">
                                <img
                                    class="img-fluid" width="32" height="32" loading="lazy" decoding="async" alt="safari"
                                    src="https://files.sitestatic.net/assets/imgs/browser_icons/browser_safari.webp"
                                />
                            </div>
                            <div class="browser-icon-bg">
                                <img
                                    class="img-fluid" width="32" height="32" loading="lazy" decoding="async" alt="firefox"
                                    src="https://files.sitestatic.net/assets/imgs/browser_icons/browser_firefox.webp"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="col-span-2 sm:col-span-1">
                    <div class="mb-4 title">{t('app.Platform Service Provider@@Platform Service Provider')}</div>
                        <div class="">
                            <PlatformProvider 
                     websiteLogo={props.websiteLogo}
                     appSubSkin ={commonData.app_sub_skin} 
                     class="inline-block"
                     ></PlatformProvider> 
                        </div>
                    </div>
                </div>

                <div class="title mb-4 hidden sm:block">{t('app.Game Provider@@Game Provider')}</div>

                <picture class="hidden sm:block">
                   
                    <source media="(min-width:640px)" srcset={`https://files.sitestatic.net/images/${   
                        isLightTheme(commonData.themeNumber)? 'footer_provider_col' : 'footer_provider_white'}.png?v=0.5`} />
                    <img
                        class="img-fluid mb-14 w-full"
                        src=""
                        width="1140"
                        height="350"
                        loading="lazy"
                        decoding="async"
                        alt="game providers"
                    />
                </picture>
                <div class="divider mb-5"></div>
                <div class="text-center">
                    ©{year} . {t('app.All rights reserved@@All rights reserved')} | 18+ | v{version}
                </div>
                <div dangerouslySetInnerHTML={commonData.seo?.footer_description || ""}>
                    
                </div>
            </div>
        </div>
    </> 
  );
});