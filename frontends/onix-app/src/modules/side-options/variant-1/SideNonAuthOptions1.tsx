
import type { Signal} from '@builder.io/qwik';
import { component$, useStylesScoped$ ,  } from '@builder.io/qwik'; 
import styles from './SideOptions1.scss?inline'; 
import { DownloadAppIcon } from '~/components/icons/DownloadApp';
import {
    inlineTranslate,  
  } from 'qwik-speak'; 
  import { useCommonViewData } from '~/hooks/app/useCommonViewData';
  import { useComplaintModal } from "~/hooks/business/useComplaintForm";


  
import { EmailIcon } from '~/components/icons/Email';
import { SkypeIcon } from '~/components/icons/Skype';
import { LineIcon } from '~/components/icons/Line';
import { PhoneIcon } from '~/components/icons/Phone';
import { WhatsappIcon } from '~/components/icons/Whatsapp'; 


  type Props ={
    optionsEle : Signal<HTMLDivElement|undefined>, 
    contactLinks?: any; 
    zIndex : number,
  
   
  }
export default component$(( props :Props) => {
    useStylesScoped$(styles); 
    const t = inlineTranslate();
    const {commonData} = useCommonViewData(); 
    const { toggleModalQRL: toggleComplaintQRL } = useComplaintModal();
    return (
        <>

<div ref={props.optionsEle} class=" absolute  h-fit pt-10 p-6 right-0 optionsContainer rounded-[10px] rounded-t-none" style={`top:2.3rem; width:18rem;z-index:${props.zIndex} `}>
              <div>
                <ul class="optionBox">
                  <li class="mb-4"><a href="/info/faq/">{t('app.FAQs@@FAQs')}</a></li>
                  <li class="mb-4"><a href="/info/terms-conditions/">{t('app.Terms & Conditions@@Terms & Conditions')}</a></li>
                  <li class="mb-4"><a href="/promotions/">{t("app.Promotions@@Promotions")} </a></li>
                  {commonData.website_settings?.isOffReferralMenu != '1' && 
                    <li class="mb-4"><a href="/referral/">{t('app.Referral@@Referral')}</a></li>
                  }
                  {commonData.website_settings?.is_allow_complaint_form == '1' &&
                  <li class="mb-4">
                      <button 
                          type="button"
                          onClick$={toggleComplaintQRL}
                        >
                        {t('app.Complaint@@Complaint')}
                      </button>
                  </li>
}
                  <div class="optionsDivider w-full border-b px-2 mb-4"></div>
                  <li class="mb-4"><span>{t('app.Quick Contact@@Quick Contact')}</span></li> 
                  <li class="mb-4 grid grid-cols-5 gap-3">
                    <a href={'https://wa.me/'+props.contactLinks.whatsapp.value} class="rounded-full w-8 h-8 p-1 contactBtn flex-center"><WhatsappIcon class="w-full h-full"></WhatsappIcon></a>
                    <a href={props.contactLinks.skype.url } class="rounded-full w-8 h-8 p-1 contactBtn flex-center"><SkypeIcon class="w-full h-full p-1"></SkypeIcon></a>
                    <a href={props.contactLinks.line.url } class="rounded-full w-8 h-8 p-1 contactBtn flex-center"><LineIcon class="w-full h-full p-1"></LineIcon></a>
                    <a href={props.contactLinks.phone.url } class="rounded-full w-8 h-8 p-1 contactBtn flex-center"><PhoneIcon class="w-full h-full p-1" bgColor='currentColor' iconColor='currentColor'></PhoneIcon></a>
                    <a href={props.contactLinks.email.url} class="rounded-full w-8 h-8 p-1 contactBtn flex-center"><EmailIcon class="w-full h-full p-1"></EmailIcon></a>
                  </li>
                  <div  class="optionsDivider w-full border-b px-2 mb-4"></div>
                  <li class="flex-center mt-6"> 
                    <a href={commonData?.website_settings?.apk_url||""}  class="rounded-full border w-fit py-2 px-4 flex-center"> <span class="mr-1">{t('app.Download mobile app@@Download mobile app')}</span> <DownloadAppIcon class="w-4 h-4"></DownloadAppIcon> </a>
                  </li>
                </ul>
              </div>
       </div>
       </>
  )
});
