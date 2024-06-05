/*
Author : Brandon
Readme : 
*/

import { component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./GameBoxProvider1.scss?inline";
import type { ProviderGameItem } from "~/services/types";
import { useGameLaunch } from "~/hooks/business/useGameList";
import { useCommonViewData } from "~/hooks/app/useCommonViewData";
import { inlineTranslate } from "qwik-speak";
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
      <div class="rounded-lg relative w-full group cursor-pointer col-span-1 hover:z-10">
      
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
            class="rounded-lg overflow-hidden w-full group-hover:blur-sm"
            // style="padding: 2px"
          ></PicWithPreview> 
        <div class="overlay group-hover:visible invisible absolute inset-0 flex-center flex-col ">
          <div
            class="text-6xl rounded-lg w-fit px-5 py-3 playBtn"
            onClick$={async () => {
              await launchProviderGameItemQRL(
                props.providerGameItem,
                commonData.isAuth,
                0
              );
            }}
          >
            <p class="text-sm font-semibold flex-center ">Play Now</p>
          </div>
          { (props.providerGameItem.has_demo) ? (
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
        { (!!props.providerGameItem.rtp?.given) && (
          <div class="rtpWrapper group-hover:blur-sm absolute top-0 right-0 w-fit rounded-tr-md rounded-bl-md p-1.5 md:text-xs text-xxs">
            <span class="rtpText">
              RTP {props.providerGameItem.rtp.given.toFixed(2)}%
            </span>
          </div>
        )}
      </div>
    </>
  );
});
