
import { component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./GameBoxProvider5.scss?inline";

import {
  useGameLaunch,
  GameTypeNew,
  GameTypeTop,
} from "~/hooks/business/useGameList";
import { useCommonViewData } from "~/hooks/app/useCommonViewData";
import { inlineTranslate } from "qwik-speak";
import { PlayIcon } from "~/components/icons/Play3";
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
  <div
key={props.providerGameItem.id}
class={`gameBoxProvider5 col-span-1 cursor-pointer group hover:z-10  ${props.noScaleOnHover=== true ? "": "hover:scale-150 sm:hover:scale-125   transition-all ease-out duration-200 "}} ${props.noAdjustTransformOrigin === true? "" : "adjust-transform-origin"}`}

 
>
<div class=" rounded-lg game-wrapper overflow-hidden relative  ">
  {props.providerGameItem.game_types?.length > 0 &&
    props.providerGameItem.game_types.some((type) => {
      if (type.name?.toLowerCase() == GameTypeTop) {
        return true;
      }
      return false;
    }) && (
      <>
        <div class="labelHot font-semibold text-xs   p-1 flex justify-center mt-2 rounded-r-[50px]  absolute">
          {" "}
          {t("app.Hot@@Hot")}
        </div>
      </>
    )}

  {props.providerGameItem.game_types?.length > 0 &&
    props.providerGameItem.game_types.some((type) => {
      if (type.name == GameTypeNew) {
        return true;
      }
      return false;
    }) && (
      <>
        <div class="labelNew font-semibold text-xs p-1 flex justify-center mt-2 rounded-r-[50px] absolute">
          {" "}
          {t("app.New@@New")}
        </div>
      </>
    )}

  <div class="group-hover:visible invisible group-hover:opacity-100 gap-3 lg:gap-4 overlay opacity-0 absolute inset-0   flex-center flex-col transition-all  duration-100 ease-in z-10">
    <p class="text-xxs text-white text-center">
      {props.providerGameItem.game_name}
    </p>
    <button
      class="playBtn gap-1 px-3 lg:px-5 py-1 lg:py-1.5 font-medium text-black rounded-full scale-0  group-hover:scale-100 transition-all  duration-200 flex-center text-xxs lg:text-xs leading-normal"
      onClick$={async () => {
        await launchProviderGameItemQRL(
          props.providerGameItem,
          commonData.isAuth,
          0
        );
      }}
    >
      {t("app.Play@@Play")}{" "}
      <PlayIcon class="text-sm"></PlayIcon>
    </button>

    {props.providerGameItem.has_demo ? (
      <button
        class="demoBtn gap-1 font-medium scale-0 group-hover:scale-100 transition-all  duration-200 text-xxs lg:text-xs flex-center leading-normal"
        onClick$={async () => {
          await launchProviderGameItemQRL(
            props.providerGameItem,
            commonData.isAuth,
            1
          );
        }}
      >
        {" "}
        {t("app.Demo@@Demo")} {t("app.Play@@Play")}
        <PlayIcon class="text-sm"></PlayIcon>{" "}
      </button>
    ) : (
      ""
    )}
  </div>
 {/* 
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
