/*
Author : Brandon
Readme : 
*/

import { component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./GameBoxProvider2.scss?inline";

import { useGameLaunch } from "~/hooks/business/useGameList";
import { useCommonViewData } from "~/hooks/app/useCommonViewData";
import { inlineTranslate } from "qwik-speak";

import { PlayButtonIcon } from "~/components/icons/PlayButton";
import type { Props } from "../propsType";
import PicWithPreview from "~/components/image/PicWithPreview";
import { calImgSizeByDpr, concatImgDprSrcSet } from "~/utils/common";

export default component$((props: Props) => {
  useStylesScoped$(styles);

  const { commonData } = useCommonViewData();
  const { launchProviderGameItemQRL } = useGameLaunch();
  const t = inlineTranslate();
  const imgDprList =
    !props.imgDprList || props.imgDprList.length == 0
      ? [1, 2, 3]
      : props.imgDprList;
  return (
    <>
      <div class="gameBoxProvider2 group cursor-pointer col-span-1 hover:z-10 rounded-lg relative py-1.5 px-1 w-full overflow-hidden">
          
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
          class="w-full rounded-lg overflow-hidden group-hover:blur "
        ></PicWithPreview> 
        <div
          class="overlay 
                            group-hover:opacity-100 opacity-0   absolute inset-0 flex-center flex-col playBtn"
        >
          <div
            class="text-6xl"
            onClick$={async () => {
              await launchProviderGameItemQRL(
                props.providerGameItem,
                commonData.isAuth,
                0
              );
            }}
          >
            <div class="playBtnIcon">
              <PlayButtonIcon />
            </div>
            <p class="text-sm font-semibold flex-center">Play</p>
          </div>
          {props.providerGameItem.has_demo ? (
            <div class="pt-2">
              <button
                class="py-2 px-4 demoBtn font-semibold rounded-md"
                onClick$={async () => {
                  await launchProviderGameItemQRL(
                    props.providerGameItem,
                    commonData.isAuth,
                    1
                  );
                }}
              >
                Demo
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
});
