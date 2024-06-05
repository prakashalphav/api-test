import type { QwikVisibleEvent} from "@builder.io/qwik";
import { component$, useStyles$,  useOn, $, useTask$, } from "@builder.io/qwik";
import styles from "./PopupBanner.scss?inline";
import { usePopup , type Props } from "../../../hooks/business/usePopupBanner";
import Modal from "../../../components/modal/variant-1/Modal1";
import { isServer } from '@builder.io/qwik/build';
import { extractImgMetaData } from "~/utils/common";

export default component$((props: Props) => {
    useStyles$(styles);

    const { showPopupBanner, togglePopupQRL,onVisibleRunTask } = usePopup(props);

    // useVisibleTask$(()=>{
      
    // } , {strategy:"document-ready"})
    // useOn( "qvisible", $(async (event : QwikVisibleEvent)=>{  
    //   console.log("run on qvisible popupbanner" );
    //  await onVisibleRunTask();
    //   })) 
   
  useTask$(( ) => {
      if (isServer) {
        return; // Server guard
      }
        onVisibleRunTask();
    },
    { eagerness: "load" }
  );
 
    const imgSize = extractImgMetaData(props.banner);
    return <>{showPopupBanner.value && ( 
        <Modal closeBtnPosition="outerTopRight"   toggleModal$={togglePopupQRL} modalContainerClass="popupBannerModal" hasScroller={false} modalContainerStyle={"min-width:340px;"}  >
          
          <a id="popupbanner" class="flex-center" href={props.url ?? '/'}>
            <img src={props.banner?? ''} class="" width={imgSize.w} height={imgSize.h} />
          </a>
        </Modal>
      )}
    </>;
})