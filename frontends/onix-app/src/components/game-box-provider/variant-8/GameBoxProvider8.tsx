
import { component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./GameBoxProvider8.scss?inline";

import {
  useGameLaunch,
  GameTypeNew,
  GameTypeTop,
} from "~/hooks/business/useGameList";
import { useCommonViewData } from "~/hooks/app/useCommonViewData";
import { inlineTranslate } from "qwik-speak";
import { CloseIcon } from '~/components/icons/Close';
import { PlayIcon } from '~/components/icons/Play';

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
  <div  class="gameBoxProvider8 after:col-span-1 cursor-pointer group hover:scale-125 transition-all ease-out duration-200 hover:z-10" > 
                          
                              
                          <div class=" rounded-lg game-wrapper overflow-hidden relative  ">
                           <div class="outerBorder"></div>
                           <div class="wrapperMask"></div>
                          <div class="innerBorder"></div>
                          {props.providerGameItem?.game_types?.length>0 &&
                         props.providerGameItem?.game_types.some((type)=>{
 
                             if( type.name?.toLowerCase()== GameTypeTop){
                                 return true;
                             }
                             return false;
                         })
                         && (<>
                             <div class="labelHot font-semibold text-xs   p-1 flex justify-center mt-2 rounded-r-[50px]  absolute"> {t('app.Hot Games@@Hot Games')}</div>
                         </>)
                         }
 
 {props.providerGameItem?.game_types?.length>0 &&
                         props.providerGameItem?.game_types.some((type)=>{
 
                             if( type.name == GameTypeNew){
                                 return true;
                             }
                             return false;
                         })
                         && (<>
                             <div class="labelNew font-semibold text-xs p-1 flex justify-center mt-2 rounded-r-[50px] absolute"> {t('app.New Game@@New Game')}</div>
 
                     
                         </>)
                         }
 
                         <div class="group-hover:opacity-100 opacity-0 absolute top-0 left-0 w-full h-full   flex-center flex-col gap-1 transition-all  duration-100 ease-in z-10">
                             <p class="text-xxs text-white text-center">{props.providerGameItem?.game_name} </p>
                             <button class="min-w-[70%] py-1 bg-white text-black rounded-md scale-0 group-hover:scale-100 transition-all  duration-200 flex-center text-xs mb-2"
                            
                             onClick$={async ()=>{
                     
                                 await  launchProviderGameItemQRL( props.providerGameItem,commonData.isAuth,  0) 
             
                                 }}>
                                 {t('app.Play@@Play')} <PlayIcon class="text-sm"></PlayIcon> 
                             </button>
 
                             {props.providerGameItem?.has_demo?<button class="min-w-[70%] py-1 bg-gray-600 text-white rounded-md  scale-0 group-hover:scale-100 transition-all  duration-200 text-xs"   onClick$={async ()=>{
                     
                                 await  launchProviderGameItemQRL( props.providerGameItem,commonData.isAuth,  1) 
 
                             }}> {t('app.Demo@@Demo')} </button> : ''}
                            
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
  </>);
});


