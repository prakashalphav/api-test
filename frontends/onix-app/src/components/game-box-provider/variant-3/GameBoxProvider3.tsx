import { component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./GameBoxProvider3.scss?inline";

import { useGameLaunch , GameTypeNew,
    GameTypeTop,} from '~/hooks/business/useGameList';
import { useCommonViewData } from '~/hooks/app/useCommonViewData';
import { inlineTranslate } from 'qwik-speak';
import { PlayIcon } from "~/components/icons/Play3";
import type { Props } from "../propsType";
 import PicWithPreview from "~/components/image/PicWithPreview";
import { calImgSizeByDpr, concatImgDprSrcSet } from "~/utils/common";

export default component$((props: Props) => {
  useStylesScoped$(styles);

  const {commonData} = useCommonViewData();
  const {launchProviderGameItemQRL}= useGameLaunch();
  const t = inlineTranslate();
  const imgDprList = !props.imgDprList  || props.imgDprList.length == 0 ? [ 1 , 2 ,  3] : props.imgDprList; 
  return (
    <>
     
<div
key={props.providerGameItem.id}
class={`gameBoxProvider3 p-px border ${props.class} group cursor-pointer hover:z-10 col-span-1 rounded-2xl  ${props.noScaleOnHover=== true ? "": "hover:scale-150 sm:hover:scale-125   transition-all ease-out duration-200 "}}  ${props.noAdjustTransformOrigin === true? "" : "adjust-transform-origin"} `}
>
   
<div class=" rounded-md  gameWrapper overflow-hidden relative  ">
  {props.providerGameItem?.game_types?.length > 0 &&
    props.providerGameItem.game_types.some((type) => {
      if (type.name?.toLowerCase() == GameTypeTop) {
        return true;
      }
      return false;
    }) && (
      <>
        <div class="labelHot font-semibold text-xs  p-1 flex justify-center mt-2 rounded-r-[50px]  absolute">
          {" "}
          {t("app.Hot@@Hot")}
        </div>
      </>
    )}

  {props.providerGameItem?.game_types?.length > 0 &&
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

  <div class="gameInfo px-1 lg:px-2 group-hover:visible invisible absolute top-0 left-0 w-full h-full   flex-center flex-col gap-1 transition-all  duration-100 ease-in z-10">
    <button
      class="py-1 text-white rounded-md flex-center text-xs  lg:mb-3"
      onClick$={async () => {
        await launchProviderGameItemQRL(
          props.providerGameItem,
          commonData.isAuth,
          0
        );
      }}
    >
      <PlayIcon class="text-3xl lg:text-5xl"></PlayIcon>
    </button>

    <p class="text-xxs lg:text-lg font-medium text-white text-center leading-none lg:leading-tight">
      {props.providerGameItem.game_name}
    </p>

    <div class="flex items-center justify-center gap-2 mt-1 lg:mt-6">
      <button
        class="text-white flex-center text-xs lg:text-lg  hover:underline underline-offset-2 transition-all  duration-100 ease-in"
        onClick$={async () => {
          await launchProviderGameItemQRL(
            props.providerGameItem,
            commonData.isAuth,
            0
          );
        }}
      >
        {t("app.Play@@Play")}
      </button>

      {props.providerGameItem.has_demo ? (
        <button
          class=" text-white flex-center text-xs lg:text-lg hover:underline underline-offset-2 transition-all  duration-100 ease-in"
          onClick$={async () => {
            await launchProviderGameItemQRL(
              props.providerGameItem,
              commonData.isAuth,
              1
            );
          }}
        >
          {" "}
          {t("app.Demo@@Demo")}{" "}
        </button>
      ) : (
        ""
      )}
    </div>
  </div>
 

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
    </>
  );
});




