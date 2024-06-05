import { component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./GameBoxProvider4.scss?inline";

import {
  useGameLaunch,
  GameTypeNew,
  GameTypeTop,
} from "~/hooks/business/useGameList";
import { useCommonViewData } from "~/hooks/app/useCommonViewData";
import { inlineTranslate } from "qwik-speak";
import { PlayIcon } from "~/components/icons/Play";
import type { Props } from "../propsType";
import PicWithPreview from "~/components/image/PicWithPreview";
import {calImgSizeByDpr, concatImgDprSrcSet} from "~/utils/common";
export default component$((props: Props) => {
  useStylesScoped$(styles);

  const { commonData } = useCommonViewData();
  const { launchProviderGameItemQRL } = useGameLaunch();
  const t = inlineTranslate();
 
  const imgDprList = !props.imgDprList  || props.imgDprList.length == 0 ? [ 1 , 2 ,  3] : props.imgDprList; 
  return (
    <>
      <div key={props.providerGameItem.id} class={`gameBoxProvider4 col-span-1 cursor-pointer  ${props.class}} ${props.noAdjustTransformOrigin === true? "" : "adjust-transform-origin"}`}>
        <div class={`rounded-2xl gameWrapper overflow-hidden relative group hover:z-10 ${props.noScaleOnHover=== true ? "": "hover:scale-150 sm:hover:scale-125   transition-all ease-out duration-200  "}} `} style={`transform-origin:inherit;`}>
          {props.providerGameItem.game_types?.length > 0 &&
            props.providerGameItem.game_types.some((type) => {
              if (
                type.name?.toLowerCase() == GameTypeTop 
              ) {
                return true;
              }
              return false;
            }) && (
              <>
                <div class="labelHot font-semibold text-xs px-2 py-1 flex justify-center  rounded-br-2xl absolute">
                  {" "}
                  {t("app.Hot@@Hot")}
                </div>
              </>
            )}

          {props.providerGameItem.game_types?.length > 0 &&
            props.providerGameItem.game_types.some((type) => {
              if (type.name?.toLowerCase() ==GameTypeNew) {
                return true;
              }
              return false;
            }) && (
              <>
                <div class="labelNew font-semibold text-xs px-2  py-1 flex justify-center  rounded-br-2xl absolute">
                  {" "}
                  {t("app.New@@New")}
                </div>
              </>
            )}

          <div class="group-hover:visible invisible group-hover:opacity-100 opacity-0 absolute inset-0 backdrop-blur-sm overlay  flex-center flex-col gap-1 transition-all  duration-100 ease-in z-20">
            <p class="text-xxs gameName  text-center">{props.providerGameItem.game_name}</p>
            <button 
            style="min-width:70%;"
              class="playBtn py-1  rounded-lg scale-0 group-hover:scale-100 transition-all  duration-200 flex-center text-xs mb-2"
              onClick$={async () => {
                await launchProviderGameItemQRL(props.providerGameItem, commonData.isAuth, 0);
              }}
            >
              {t("app.Play@@Play")} <PlayIcon class="text-sm"></PlayIcon>
            </button>

            {props.providerGameItem.has_demo ? (
              <button
              style="min-width:70%;"
                class="demoBtn py-1  rounded-lg scale-0 group-hover:scale-100 transition-all  duration-200 text-xs"
                onClick$={async () => {
                  await launchProviderGameItemQRL(props.providerGameItem, commonData.isAuth, 1);
                }}
              >
                {t("app.Demo@@Demo")}
              </button>
            ) : (<></>)}
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
        <div class="py-2 text-center truncate">{props.providerGameItem.game_name}</div>
      </div>
    </>
  );
});
