import { component$, useStylesScoped$ } from "@builder.io/qwik"; 
import styles from "./ApkDownload1.scss?inline";
import { AndroidIcon } from '~/components/icons/Android';
import {
    inlineTranslate,  
  } from 'qwik-speak';
  import { useCommonViewData } from "~/hooks/app/useCommonViewData";
type Props = { 
    class?: string;
};
export default component$((props: Props) => {
    useStylesScoped$(styles);
    const t = inlineTranslate();
    
  const  {commonData} = useCommonViewData();
    return (<>
        <div class={props.class }>
        <div class="apkDownload flex-center  gap-7 flex-col md:flex-row px-7 py-7 md:py-16">
                <div class=" flex-auto text-lg text-center md:text-left">
                  <div class="titleDownload1">{t('app.Play@@Play')}</div>
                  <div>
                    <span class="titleDownload2">{t('home.Anytime@@Anytime')}, </span>
                    <span class="titleDownload3">{t('home.Anywhere@@Anywhere')}</span>
                  </div>
                </div>
            
                  <a class="btnDownload rounded-md flex-center p-2.5" href={commonData.website_settings.apk_url || "#"}>
                    <AndroidIcon class=" text-2xl mr-1"  style="color:#000;" />{t('home.Download Now@@Download Now')}
                  </a>
             
              </div>
        </div>
    </>)
})