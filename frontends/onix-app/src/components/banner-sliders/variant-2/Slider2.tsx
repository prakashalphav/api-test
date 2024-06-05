import {
  component$,
  useStyles$,
  useOn,
  $,
} from "@builder.io/qwik";
 
import Splide from "@splidejs/splide";
import styles from "./Slider2.scss?inline";
import "@splidejs/splide/css/core";
import { bannerBase } from "../../../services/images";
import LazyPic4PcMobile from "~/components/image/LazyPic4PcMobile";
import { useSlidingBanner,type Props } from "~/hooks/business/useSlidingBanners";
import ApkDownload from "~/components/apk-download/variant-4/ApkDownload4";
export default component$((props: Props) => {
  useStyles$(styles);
  const {showBtnApkDownload ,aspectRatio }= useSlidingBanner(props);

  useOn( "qvisible", $(() => {
    console.log("run on qvisible Slider1" );

    // will run when the component becomes visible
    new Splide(".banner-slider", {
      type: "loop",
      perPage: 1,
      autoplay: true,
      // direction: "rtl",
      width: "100%",
      // autoWidth: false,
      // autoHeight: true,
      arrows: false,
      // heightRatio:0.375,
    }).mount();
  }));

  
 
  return (
    <>
      <div class="banner-slider splide relative" aria-label="SLIDER">
        <div class="splide__track w-full" style={`aspect-ratio: ${aspectRatio}`}>
          <ul class="splide__list">
            {props.banners.map((item,index) => (
              <li key={index} class="splide__slide">
                <div class="splide__slide__container">
                  <div class="slide__content">
          

               <LazyPic4PcMobile isNotLazy={index ==0 ? true : false} src={bannerBase + (item.mobilebannerImage||"")  } srcPC={bannerBase + (item.bannerImage||"")   } extractMeta={false} imgClass={" w-full  "} imgStyle ={`aspect-ratio: ${aspectRatio}`}
               ></LazyPic4PcMobile>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <ul class="splide__pagination absolute left-1/2 bottom-1 -translate-x-1/2"></ul>
            {/* APK download overlay */}
            { showBtnApkDownload.value && 
        <div class="w-full bottom-0 pb-5 text-center absolute z-10"> 
           <ApkDownload onHideApkDownload$={$(()=>{
            showBtnApkDownload.value = false
          })}></ApkDownload>
        </div>
        }

      </div>
    </>
  );
});
