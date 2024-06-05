import { component$, useStylesScoped$ } from "@builder.io/qwik"; 
import styles from "./ApkDownload2.scss?inline";
import { AndroidIcon } from '~/components/icons/Android';
import { inlineTranslate } from 'qwik-speak';
import { useCommonViewData } from "~/hooks/app/useCommonViewData";
import LazyImage from "~/components/image/LazyImage";
import { homeLogoBase } from "~/services/images";

type Props = { 
    class?: string;
};

export default component$((props: Props) => {
  useStylesScoped$(styles);
  const t = inlineTranslate(); 
  const {commonData} = useCommonViewData();

    return (<>
      <div class={`apkDownload  relative ${props.class}`}>
        <div class="innerWrapper px-8 py-5 md:py-5 rounded-lg text-right" style="padding-top: 40px;">
          <a class="rounded-md w-5/12 inline-block text-center relative" href={commonData.website_settings.apk_url || "#"}>
            <LazyImage
              class="mb-1.5 md:mb-3 inline-block"
              src={homeLogoBase + commonData.website_settings?.websiteLogo}
              height={40}
              width={120}
              extractMeta={false}
            />
            <div class="apkDownloadQR mb-2.5 md:mb-3 aspect-square mx-auto">
              {commonData.website_settings.apk_qr_code && (
                <LazyImage
                  class="inline-block"
                  src={commonData.website_settings?.apk_qr_code}
                  height={120}
                  width={120}
                  extractMeta={false}
                />
              )}
            </div>
            <div class="apkDownloadText text-xs">{t('home.Get the android app by scanning@@Get the android app by scanning')}</div>
          </a>
        </div>
      </div>
    </>)
})