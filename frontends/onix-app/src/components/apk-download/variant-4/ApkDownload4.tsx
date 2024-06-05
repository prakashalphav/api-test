import { component$, useStylesScoped$, } from "@builder.io/qwik"; 
import type {PropFunction } from '@builder.io/qwik';
import styles from "./ApkDownload4.scss?inline";
import { CloseIcon } from "~/components/icons/Close";
import { AndroidIcon } from "~/components/icons/Android";
import { DownloadIcon } from "~/components/icons/Download";
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
     <a class="btnApkDownload inline-flex items-center rounded gap-1 px-2 py-1 md:py-2 flex-nowrap" href={commonData.website_settings.apk_url || "#"}>
          <button  onClick$={async ( )=>{ 
            if(props.onHideApkDownload$){
              await props.onHideApkDownload$();
            }
          }} type="button"><CloseIcon></CloseIcon></button>
          <AndroidIcon class="pl-2 text-lg" style="color:#3CE138;"></AndroidIcon>
          <p class="text-xs shrink-0 truncate">{t("app.Download mobile app fast, light and secure@@Download mobile app fast, light and secure")}</p>
          <DownloadIcon></DownloadIcon>
          </a>
    </>)
})