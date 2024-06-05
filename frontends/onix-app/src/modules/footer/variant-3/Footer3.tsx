import { component$, useStylesScoped$   } from '@builder.io/qwik'; 
import styles from './Footer3.scss?inline';  
import { TwitterIcon } from '~/components/icons/Twitter2';
import { FacebookIcon } from '~/components/icons/Facebook2';
import { InstagramIcon } from '~/components/icons/Instagram';
import { TelegramIcon } from '~/components/icons/Telegram2';
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
        <div class="footer w-full ">
            <div class="max-w-screen grid grid-cols-10">
                <div class="col-span-10 sm:col-span-5  pt-10 pb-3">
                    <div class="grid grid-cols-2 sm:grid-cols-4 mb-10 gap-5">
                        <div class="col-span-1">
                            <div class="title mb-5">{t('app.Information@@Information')}</div>
                            <a href="/info/faq" class="mb-4 block text-xs">{t('app.About Us@@About Us')}</a>
                            <a href="/info/faq" class="mb-4 block text-xs">{t('app.Affiliate Program@@Affiliate Program')}</a>
                            <a href="/info/faq" class="mb-4 block text-xs">{t('app.Responsible Gaming@@Responsible Gaming')}</a>
                        </div>
                        <div class="col-span-1">
                            <div class="title mb-5">{t('app.Help@@Help')}</div>
                            <a href={commonData.website_settings.chatUrl ?? '#'} target={commonData.website_settings.chatUrl ? '_blank' : ''}  class="mb-4 block text-xs">{t('app.24/7 support@@24/7 support')}</a>
                            <a href="/info/faq" class="mb-4 block text-xs">{t('app.FAQs@@FAQs')}</a>
                            <a href="/info/faq" class="mb-4 block text-xs">{t('app.Contact Us@@Contact Us')}</a>
                            <a href="/info/faq" class="mb-4 block text-xs">{t('app.Blog@@Blog')}</a>
                        </div>
                        <div class="col-span-1">
                            <div class="title mb-5">{t('app.Terms & Conditions@@Terms & Conditions')}</div>
                            <a href="/info/faq" class="mb-4 block text-xs">{t('app.User Agreement@@User Agreement')}</a>
                            <a href="/info/faq" class="mb-4 block text-xs">{t('app.Privacy Policy@@Privacy Policy')}</a>
                        </div>
                        <div class="col-span-1">
                             <div class="title mb-5">{t('app.Payment Methods@@Payment Methods')}</div>
                             <div class="grid gap-3">
                                {paymentTypeUrls.map((item)=>(
                                    <>
                                    <img width="100" height="35" class="rounded-md bg-white" loading="lazy" decoding="async" 
                                        alt="bank transfer" src={item}
                                    />
                                    </>
                                ))}
                            </div>
                        </div>
                    </div> 
                </div>
                <div class="col-span-10 sm:col-span-5  pt-10  pb-3 ">
                    <div class="sm:float-right sm:text-right text-left float-none">
                    <div class="mb-4 title">{t('app.Platform Service Provider@@Platform Service Provider')}</div>
                        <div class="mb-8">
                        <img class="inline-block " src={props.websiteLogo} width="128" height="50"/>
                            {/* <img src={`https://files.sitestatic.net/assets/imgs/platform/onix-logo.webp`} alt="platform"   width="90"
                                height="35"
                                loading="lazy"
                                decoding="async" ></img> */}
                        {/* <PlatformProvider 
                     websiteLogo={props.websiteLogo}
                     appSubSkin ={commonData.app_sub_skin} 
                     class="inline-block"
                     ></PlatformProvider>   */}
                         </div>

                        <div class="mb-4 title">{t('app.Follow Us@@Follow Us')}</div>
                        <div class="flex flex-wrap mb-8 gap-2.5">
                            {/* <a href={(csContacts?.linkedin_url ? `${csContacts.linkedin_url}` :`#`)} class="text-3xl">
                                <span class="social-icons rounded-full inline-block">
                                    <LinkedinIcon bgColor="#3C3E55" iconColor='#fff' class="w-10 h-10"></LinkedinIcon>
                                </span>
                            </a> */}
                            {!! csContacts?.fb_url.displayColumn &&
                            <a
                                href={(csContacts?.fb_url.url ? `${csContacts.fb_url.url}` :`#`)}
                                target={csContacts?.fb_url.url ? '_blank' : ''}
                                class="text-3xl"
                            >
                                <span class="social-icons rounded-full inline-block">
                                    <FacebookIcon bgColor="#3C3E55" iconColor='#fff' class="w-10 h-10"></FacebookIcon>
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
                                    <InstagramIcon bgColor="#3C3E55" iconColor='#fff' class="w-10 h-10"></InstagramIcon>
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
                                    <TelegramIcon bgColor="#3C3E55" iconColor='#fff' class="w-10 h-10"></TelegramIcon>
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
                                    <TelegramIcon bgColor="#3C3E55" iconColor='#fff' class="w-10 h-10"></TelegramIcon>
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
                                    <TwitterIcon bgColor="#3C3E55" iconColor='#fff' class="w-10 h-10"></TwitterIcon>
                                </span>
                            </a>
                            }
                        </div>
                    </div>
                </div>

                <div class="col-span-10 divider w-full"></div>
                <div class="col-span-10 pt-10 pb-40 sm:pb-3">
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
                    <div class="text-center">
                        {/*version */}
                        ©{year} . {t('app.All rights reserved@@All rights reserved')} | 18+ | v{version}
                    </div>
                    <div class="mt-4" dangerouslySetInnerHTML={commonData.seo?.footer_description || ""}>
                        
                    </div>
                </div>
               
            </div>
        </div>
    </> 
  );
});