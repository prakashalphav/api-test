import { component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./ApkDownload2b.scss?inline";
import { AndroidIcon } from "~/components/icons/Android";
import { inlineTranslate } from "qwik-speak";
import { useCommonViewData } from "~/hooks/app/useCommonViewData";
import LazyImage from "~/components/image/LazyImage";
import { homeLogoBase } from "~/services/images";

type Props = {
  class?: string;
};

export default component$((props: Props) => {
  useStylesScoped$(styles);
  const t = inlineTranslate();
  const { commonData } = useCommonViewData();

  return (
    <>
      <div class={`outerWrapper relative ${props.class}`}>
        <LazyImage
          src="https://files.sitestatic.net/assets/imgs/onixv2/gamingonnet/apk_download_girl.webp"
          height={253}
          width={450}
        />
        <a
          class="absolute top-0 right-0 h-full w-1/2 flex-center flex-wrap text-center"
          href={commonData.website_settings.apk_url || "#"}
        >
          <LazyImage
            class="mb-1.5 md:mb-3 inline-block"
            src={homeLogoBase + commonData.website_settings?.websiteLogo}
            height={40}
            width={120}
            extractMeta={false}
          />
          <div class="qrImg mb-2.5 md:mb-3 aspect-square mx-auto">
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
          <div class="text-xs right-0 sm:relative">
            {t(
              "home.Get the android app by scanning@@Get the android app by scanning"
            )}
          </div>
        </a>
      </div>
    </>
  );
});
