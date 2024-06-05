import { component$, useStylesScoped$, useSignal } from "@builder.io/qwik"; 
import type {PropFunction } from '@builder.io/qwik';
import styles from "./ApkDownload3.scss?inline";
import { Android2Icon } from '~/components/icons/Android2';
import {CloseIcon} from '~/components/icons/Close';
import {
    inlineTranslate,  
  } from 'qwik-speak';
  import { useCommonViewData } from "~/hooks/app/useCommonViewData";
type Props = { 
    class?: string;
    onHideApkDownload$?: PropFunction<() => void>;
};
export default component$((props: Props) => {
    useStylesScoped$(styles);
    const t = inlineTranslate();
    
  const  {commonData} = useCommonViewData();
    return (<>
    
        <div class={`apkDownload3 px-2 py-1 ${props.class}`}>
        <div class="gap-2 flex-center">
        <button
    onClick$={async () => {
        if (props.onHideApkDownload$) {
            await props.onHideApkDownload$(); 
        }
    }}
    type="button"
    class="text-xl" // Corrected class to className
>
    <CloseIcon></CloseIcon>
</button>
              <a
                class=" inline-flex items-center rounded gap-2  flex-nowrap"
                href={commonData.website_settings.apk_url || "#"}
              >
                <Android2Icon
                  class="text-3xl"
                  style="color:#3CE138;"
                ></Android2Icon>
                <div class="text-left leading-normal">
                  <p class="font-semibold apkDownloadText shrink-0 truncate">
                  {t(
                    "app.Application@@Application"
                  ).toUpperCase()} {commonData.website_settings.webTitle?.toUpperCase()}
                  </p>
                  <p class="text-xxs shrink-0 truncate">
                  {t(
                    "app.Download Untuk Bebas Dari Nawala@@Download Untuk Bebas Dari Nawala"
                  )}
                </p>
                </div>
                
               <span class="apkDownloadBtn rounded-full w-fit px-4 py-2 font-semibold  text-xs ml-1">
               {t(
                    "app.Download@@Download"
                  ).toUpperCase()}
               </span>
              </a>
            </div>
        </div>
    </>)
})