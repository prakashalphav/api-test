import { component$, useStylesScoped$   } from '@builder.io/qwik'; 
import styles from './Footer1.scss?inline';  
import { LinkedinIcon } from '../../../components/icons/Linkedin';
import { TwitterIcon } from '../../../components/icons/Twitter';
import { FacebookIcon } from '../../../components/icons/Facebook';
// import ImgBankTransfer from '~/media/images/dummy_images/bank_transfer.png?jsx';
import { useFooter } from '~/hooks/business/useFooter';
import PlatformProvider from "~/components/platform-provider/variant-1/PlatformProvider1";
import {
    inlineTranslate,  
  } from 'qwik-speak';
  
type Props = { 
    websiteLogo?:string;
    csContacts:  Record<string,unknown>
};

export default component$((props: Props) => {

    useStylesScoped$(styles);
    const t = inlineTranslate(); 
 
    const {commonData, paymentTypeUrls,version,year} = useFooter();
    // const footerMenu = [
    //     { title: "Game Providers", content: "test test content" },
    //     { title: "Play at top and trusted online casino malaysia", content: "test test content" },
    // ];

    // const selMenu = useSignal(-1);
    
    return ( 
    <>
   
                <div class="footer w-full">   
                    <div class="min-h-screen max-w-screen sm:mb-5 bt-10 py-5">
                    <div class="footer-links hidden sm:flex flex-wrap justify-between mb-4">
                        <ul class="flex flex-wrap mb-2">
                            <li class="mr-2"><a href="/info/faq">{t('app.About Us@@About Us').toUpperCase()}</a></li>
                            <li class="mr-2">|</li>
                            <li class="mr-2"><a href="/info/faq"> {t('app.Banking Info@@Banking Info').toUpperCase()}</a></li>
                            <li class="mr-2">|</li>
                            <li class="mr-2"><a href="/info/faq"> {t('app.Info Center@@Info Center').toUpperCase()}</a></li>
                            <li class="mr-2">|</li>
                            <li class="mr-2"><a href="/info/faq"> {t('app.Contact Us@@Contact Us').toUpperCase()}</a></li>
                        </ul>
                        <div>
                             {/* version */}
                            ©{year} .  {t('app.All rights reserved@@All rights reserved')} | 18+ | v{version}
                        </div>
                    </div>
                    <div class="footer-links-2 flex justify-between mb-6 items-center">
                        <div class="flex flex-wrap">
                        <div class="mr-5">
                                <div> {t('app.Platform Service Provider@@Platform Service Provider')}</div>
                                <div class="pt-2 my-2  ">
                          <PlatformProvider 
                     websiteLogo={props.websiteLogo}
                     appSubSkin ={commonData.app_sub_skin} 
                     class=""
                     ></PlatformProvider>
                                </div>
                            </div>
                            <div>
                                <div> {t('app.Payment Method@@Payment Method')}</div>
                                <div class="pt-2 flex items-center my-2  ">
                                    
                                {paymentTypeUrls.map((item)=>(
                                    <>
                                    <img width="100" height="35" class="rounded-md bg-white" loading="lazy" decoding="async" 
                                        alt="bank transfer" src={item}
                                    />
                                    </>
                                ))}
                                {/* <ImgBankTransfer width="88" height="32" class="inline-block"></ImgBankTransfer> */}
                                </div>
                            </div>
                        </div>
                        <div class="hidden sm:flex flex-wrap">
                            <a href={(props.csContacts?.linkedin_url ? `${props.csContacts.linkedin_url}` :`#`)} class="text-3xl mr-3"><span class="social-icons rounded-full inline-block"><LinkedinIcon bgColor="#000" iconColor='#B6B092'></LinkedinIcon></span></a>
                            <a href={(props.csContacts?.twitter_url ? `${props.csContacts.twitter_url}` :`#`)} class="text-3xl mr-3"><span class="social-icons rounded-full inline-block"><TwitterIcon bgColor="#000" iconColor='#B6B092'></TwitterIcon></span></a>
                            <a href={(props.csContacts?.fb_url ? `${props.csContacts.fb_url}` :`#`)} class="text-3xl mr-3"><span class="social-icons rounded-full inline-block"><FacebookIcon bgColor="#000" iconColor='#B6B092'></FacebookIcon></span></a>
                        </div>
                    </div>
                    {/* {footerMenu.map((item, index) => (
                        <div class="mb-[5px]">
                            <div class="footer-menu py-5 pl-5 pr-2 rounded text-base" onClick$={() => selMenu.value != index ? selMenu.value = index : selMenu.value = -1}>
                                <div class="flex justify-between items-center">
                                    <div>{item.title}</div>
                                    {selMenu.value == index ? <div class="arrow"><ArrowDownIcon></ArrowDownIcon></div> : <div class="arrow"><ArrowRight></ArrowRight></div>}
                                </div>
                            </div>
                            <div class={`footer-menu-content overflow-hidden py-5 pl-5 pr-2 rounded transition-all ` + (selMenu.value == index && (`show`))}>{item.content}</div>
                        </div>
                    ))}    */}
 
                    <div dangerouslySetInnerHTML={commonData.seo?.footer_description || ""}>
                        
                    </div>
                </div>
            </div>  
    </> 
  );
});