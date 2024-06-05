import {
  component$,
  useStylesScoped$, 
  useSignal,
  useTask$,
  useOn,
  $
} from "@builder.io/qwik";

import Spinner from "../../spinner/variant-2/Spinner2";
import { extractImgMetaData } from "~/utils/common";
import { useAnimRive } from "~/hooks/utils/useAnimPlayer";
import styles from "./Jackpot3.scss?inline";
import LazyPic4PcMobile from "~/components/image/LazyPic4PcMobile";
import { priceFormat } from "~/utils/formatters/priceFormat";

type Props = {
  isMobile: boolean;
  progressive_img?: string;
  progressive_img_mobile?: string;
  currencyCode?: string;
  class?: string;
  textStyle?: string;
  textClass?: string;
  isHideText?: boolean;
  disableAspectRatio?: boolean;
};

export const BannerImg = component$(
  (props: { imgSrc: string; width: number; height: number }) => {
    return (
      <>
        <img
          width={props.width}
          height={props.height}
          src={props.imgSrc}
          loading="lazy"
        ></img>
      </>
    );
  }
);

const delay = (time: number) => new Promise((res) => setTimeout(res, time));
export default component$((props: Props) => {
  useStylesScoped$(styles);
  const bannerEle = useSignal<HTMLElement>();
  const isWaiting = useSignal(true);
  const jpAmount = useSignal(6904750901);
  let size  , meta, metaPC;
    size = meta  = metaPC= {} as {
    w: number | undefined;
    h: number | undefined;
    ext: string | undefined;
  };
  const bannerSrcMobile = `https://files.sitestatic.net/progressive_img/${props.progressive_img_mobile}`;
  const  bannerSrcPC = `https://files.sitestatic.net/progressive_img/${props.progressive_img}`;
  let bannerSrc= ""; 

  if( (props.progressive_img && !props.isMobile)  || (props.progressive_img_mobile && props.isMobile ) ) {
    meta = extractImgMetaData(bannerSrcMobile);
    metaPC = extractImgMetaData(bannerSrcPC); 
    console.log("came here")
  if (props.isMobile) {
    size = meta; 
    bannerSrc =bannerSrcMobile; 
    if (!size.w) {
      size.w = 380;
      size.h = 200;
    }
  } else {
    size = metaPC;
    bannerSrc =bannerSrcPC; 
    if (!size.w) {
      size.w = 1260;
      size.h = 200;
    }
  } 
 }
  // const url ="/images/anime/5965-11570-viking-strike.riv";
  const { createInstance, cleanUpInstance } = useAnimRive("jackpot3-canvas");

    // useVisibleTask$(()=>{
      
    // } , {strategy:"document-ready"})

  const  timer = useSignal(null);
  useOn( "qvisible", $(async () => {
    console.log("run on qvisible Jackpot3 bannerSrcPC", bannerSrcPC );
    console.log("run on qvisible Jackpot3 bannerSrcMobile", bannerSrcMobile );
    if(bannerSrc){
      if (size.ext == "riv") {
        delay(4000).then(() => {
          createInstance(bannerSrc);

          isWaiting.value = false;
        });

      } else {
      
       
          const pictureElement = document.getElementById(
            "jackpot3-img"
          ) as HTMLPictureElement;

          if(pictureElement){
           const  picSource=  pictureElement.querySelector('source') as HTMLSourceElement;

            if(picSource){
              picSource.srcset  =bannerSrcPC;
            }

            const  picImg=      pictureElement.querySelector('img')  as HTMLImageElement;
 
        
            if(picImg){
              picImg.onload = () => {
                isWaiting.value = false;
              };
              picImg.src =bannerSrcMobile;
             
            } 
        
         
        }
      }

      
      timer.value = setInterval(() => {
        const min = Math.ceil(2451);
        const max = Math.floor(3470);
        const randomInt = Math.floor(Math.random() * (max - min + 1)) + min;

        jpAmount.value += randomInt; 
    }, 751);
    }
    
    }));
    useTask$(({cleanup})=>{
      cleanup(() => {
        console.log("run on cleanup Jackpot3" );
        if (size.ext == "riv") {
        cleanUpInstance();
        }
        // r.cleanUp();

        if(timer.value){
          clearInterval(timer.value); 
        }
      });
    })
  return (
    <>
    {!!bannerSrc && (<>
    
      <div class="w-full flex-center">
        <div
          ref={bannerEle} 
          style={props.disableAspectRatio ? '' : `aspect-ratio:${(size.w?? 0)/(size.h?? 1)};`}
          class={`jackpotWrapper relative overflow-hidden w-full ${props.class || ""}`}
        >
          {size.ext === "riv" ? (
            <canvas
              id="jackpot3-canvas"
              class={isWaiting.value ? "hidden" : ""}
              width={size.w}
              height={size.h}
            ></canvas>
          ) : (
            <> 
              <LazyPic4PcMobile
               id="jackpot3-img"
               extractMeta ={false}
               alt="jackpot"
                src={``}
                breakpointPC={1024}
                srcPC={``}
                height={meta.h}
                imgClass={'w-full'}
                width={meta.w}
                heightPC={metaPC.h}
                widthPC={metaPC.w}
              ></LazyPic4PcMobile>
            </>
          )}


          {
          props.isHideText !== true  && (
          isWaiting.value ? (
            <div class={`${props.textClass ?? 'text-4xl'} overlay w-full rounded-lg absolute inset-0 flex-center z-1`}  style={`aspect-ratio:${(size.w?? 0)/(size.h?? 1)};${props.textStyle || ""}`}>
            <Spinner></Spinner>
            </div>
          ) : (<div class={`${props.textClass ?? 'text-lg 2xl:text-4xl'} jackpotText w-full absolute inset-0 flex-center z-1`} style={`aspect-ratio:${(size.w?? 0)/(size.h?? 1)};${props.textStyle || ""};${props.textStyle || ""}`} > 

           {priceFormat(jpAmount.value, {
            prefix: `${props.currencyCode} `,
            centsLimit: 0,
          })}
        </div>))}
        </div>
      </div>
      </>) }
    </>
  );
});
