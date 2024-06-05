import type { Component
} from "@builder.io/qwik";
import { 
    useSignal,  
  } from "@builder.io/qwik";

  import { extractImgMetaData } from "~/utils/common";
export type Props = {
    banners: Record<string, unknown>[];
    webTitle: string;
    isMobile :boolean;
    isAuth :boolean;
    isHideContent: boolean;
    isHideApkDownload?: boolean;
    arrowLeftIcon? : Component<{ class: string }>;
    arrowRightIcon? : Component<{ class: string }>;
    textClass?: string;
}; 

export function useSlidingBanner(props : Props    ) {
    const showBtnApkDownload = useSignal<boolean>(props.isHideApkDownload ?? true); 

      /*use the first banner to get the aspect ratio so that all banners have same height - in case agent upload different sized sliding banners*/
        const bannerImg = props.banners[0] ?  ( props.isMobile? ( props.banners[0].mobilebannerImage||"") : props.banners[0].bannerImage||"" ) as string  : "";


        const meta=   extractImgMetaData(bannerImg);
        let aspectRatio : string|number = "auto";

        if(meta.h &&  meta.w){
            aspectRatio =  meta.w/meta.h;
        }

  return {showBtnApkDownload ,aspectRatio }
}
