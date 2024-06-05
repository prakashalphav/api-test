
import { component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./GameBoxProvider6.scss?inline";

import {
  useGameLaunch,
  GameTypeNew,
  GameTypeTop,
} from "~/hooks/business/useGameList";
import { useCommonViewData } from "~/hooks/app/useCommonViewData";
import { inlineTranslate } from "qwik-speak";
import { PlayIcon } from '~/components/icons/Play2';
import type { Props } from "../propsType";
import PicWithPreview from "~/components/image/PicWithPreview";
import {calImgSizeByDpr, concatImgDprSrcSet} from "~/utils/common";
export default component$((props: Props) => {
  useStylesScoped$(styles);

  const { commonData } = useCommonViewData();
  const { launchProviderGameItemQRL } = useGameLaunch();
  const t = inlineTranslate();
 
  const imgDprList = !props.imgDprList  || props.imgDprList.length == 0 ? [ 1 , 2 ,  3] : props.imgDprList; 
  return  (<>
  
<div key={props.providerGameItem.id}   
class= {` gameBoxProvider6 col-span-1 cursor-pointer group hover:z-10  ${props.noScaleOnHover=== true ? "": "hover:scale-150 sm:hover:scale-125   transition-all ease-out duration-200 "}} ${props.noAdjustTransformOrigin === true? "" : "adjust-transform-origin"}`}
> 
<div class="rounded-lg game-wrapper overflow-hidden relative">

  {props.providerGameItem.game_types?.length > 0 &&
    props.providerGameItem.game_types.some((type)=>{
      if(type.name?.toLowerCase() == GameTypeTop){
        return true;
      }
      return false;
    }) &&
    (<>
      <div class="labelHot font-semibold text-xs p-1 flex justify-center mt-2  absolute">
        {t('app.Hot@@Hot')}
      </div>
    </>)
  }

  {props.providerGameItem.game_types?.length > 0 &&
    props.providerGameItem.game_types.some((type)=>{
        if(type.name == GameTypeNew){
            return true;
        }
        return false;
    }) &&
    (<>
      <div class="labelNew font-semibold text-xs p-1 flex justify-center mt-2 absolute">
        {t('app.New@@New')}
      </div>
    </>)
  }


<div class="overlay group-hover:visible invisible group-hover:opacity-100 opacity-0 absolute inset-0 flex-center flex-col gap-1.5 sm:gap-4 transition-all  duration-100 ease-in z-10 text-xxxs sm:text-sm p-2 sm:p-4 text-center">
  <div class="gameName font-bold">{props.providerGameItem.game_name}</div>
  <button class="playBtn text-center   font-medium  " onClick$={async() => {
    await launchProviderGameItemQRL(props.providerGameItem, commonData.isAuth, 0) 
  }}> 
    <PlayIcon class="text-2xl sm:text-5xl inline-block" />
    <p class="mt-1 sm:mt-2">{t("app.Real Play@@Real Play")}</p>
  </button>
  {props.providerGameItem.has_demo ? <button class="demoBtn font-medium   " onClick$={async() => {
    await launchProviderGameItemQRL(props.providerGameItem, commonData.isAuth, 1) 
  }}>
    {t("app.Demo Play@@Demo Play")}
   
  </button> : ''
  }
</div>
 
{/* <picture>
<source
 srcSet={
   props.providerGameItem.img_src +
   ".avif?v=" +
   props.providerGameItem.img_v +
   " 1x, " +
   props.providerGameItem.img_src +
   "@2x.avif?v=" +
   props.providerGameItem.img_v +
   " 2x, " +
   props.providerGameItem.img_src +
   "@3x.avif?v=" +
   props.providerGameItem.img_v +
   " 3x, "
 }
 type="image/avif"
 width="440"
 height="440"
/>
<source
 srcSet={
   props.providerGameItem.img_src +
   ".webp?v=" +
   props.providerGameItem.img_v +
   " 1x, " +
   props.providerGameItem.img_src +
   "@2x.webp?v=" +
   props.providerGameItem.img_v +
   " 2x, " +
   props.providerGameItem.img_src +
   "@3x.webp?v=" +
   props.providerGameItem.img_v +
   " 3x, "
 }
 type="image/webp"
 width="440"
 height="440"
/>

<img {/* 
          <picture>
            <source
              srcSet={concatImgDprSrcSet(props.providerGameItem.img_src,props.providerGameItem.img_v, imgDprList, "avif")
              }
              type="image/avif"
              width="440"
              height="440"
            />
            <source
              srcSet={concatImgDprSrcSet(props.providerGameItem.img_src,props.providerGameItem.img_v, imgDprList, "webp")
              }
              type="image/webp"
              width="440"
              height="440"
            />

            <img
              src={props.providerGameItem.img_src + ".jpg?v=" + props.providerGameItem.img_v}
              class="aspect-square w-full max-w-[440px]"
              alt={props.providerGameItem.game_name}
              width="440"
              height="440"
              loading="lazy"
              decoding="async"
              // srcSet="small.png 1x, medium.png 2x, large.png 3x"
            />
          </picture> */}

 
<PicWithPreview
    srcsetAvif={ concatImgDprSrcSet(props.providerGameItem.img_src,props.providerGameItem.img_v, imgDprList, "avif")
    }
    srcsetWebp={concatImgDprSrcSet(props.providerGameItem.img_src,props.providerGameItem.img_v, imgDprList, "webp")
    }
    srcsetJpg={props.providerGameItem.img_src + ".jpg?v=" + props.providerGameItem.img_v}
    srcBlur={props.providerGameItem.img_src + "--blur.webp?v=" + props.providerGameItem.img_v}
    alt={props.providerGameItem.game_name}
    width={calImgSizeByDpr( props.providerGameItem.img_base_size.w,  imgDprList)   }
    height={calImgSizeByDpr( props.providerGameItem.img_base_size.h,  imgDprList)   }
  ></PicWithPreview> 
 </div>
</div>
  </>);
});


