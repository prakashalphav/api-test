import { component$, useStylesScoped$  ,$, useSignal } from '@builder.io/qwik'; 
 
import styles from './MainNav1.css?inline';  
 
import { ArrowRight } from "~/components/icons/ArrowRight";
import { ArrowLeft } from "~/components/icons/ArrowLeft";

import { CasinoIcon } from '~/components/icons/Casino3';
import { SportsIcon } from '~/components/icons/Sports3';
import { FishShootingIcon } from '~/components/icons/FishShoorting3';
import { CockFightIcon } from '~/components/icons/CockFight';
import { EGamesIcon } from '~/components/icons/EGames3';
import { KenoIcon } from '~/components/icons/Keno2';
import { SlotsIcon } from '~/components/icons/Slots2';

import {
  inlineTranslate,  
  } from 'qwik-speak';
 
// import { CloseIcon } from '~/components/icons/Close';
// import { AndroidIcon } from '~/components/icons/Android';
// import { DownloadIcon } from '~/components/icons/Download';
import { useCommonViewData } from "~/hooks/app/useCommonViewData";
import { useMainNav1Mapping } from '~/hooks/business/useHeader';
import { LotteryIcon } from '~/components/icons/Lottery3';
import { PokerIcon } from '~/components/icons/Poker';
type Props = { 
    isShowIcon?: boolean,
    class?:string
}
export default component$(( props : Props ) => {
  useStylesScoped$(styles); 
  const t = inlineTranslate();
  const {commonData} = useCommonViewData();  
  const {navMenuMap} = useMainNav1Mapping()
  //commonData.website_settings?.apk_url
  // const isShowDownload = useSignal<boolean>(true);

  return (
    <>
     {/* {isShowDownload.value && 
       <a class="absolute w-full flex-center text-xs -top-9 z-99 rounded-md"
       href={props.apkUrl||""}> 
          <div class="downloadApp flex-center w-fit px-4 py-2">
             <div onClick$={ async () => {
                isShowDownload.value = !isShowDownload.value
              }}><CloseIcon class="mr-1"></CloseIcon>
             </div>
             <AndroidIcon class="mr-1"></AndroidIcon>
             <span class="mr-1">Download mobile app fast, light and secure</span>
             <DownloadIcon class=""></DownloadIcon>
          </div>
       </a>
     } */}
   
     <div class={props.class + ' flex flex-nowrap justify-start w-full overflow-x-auto whitespace-nowrap leading-normal'} >
           {  Object.values(commonData.categories).map((category: string)  => {
            const menuData = navMenuMap.get(category);

            return (
              <>
              <div class="group ">
               <a href={menuData.href} 
               id={`${commonData.themeNumber===11 ? "categoryTab__custom" : " " }`}
               class="group-hover:before:block before:hidden relative w-fit flex-center py-2.5 px-3 categoryTab ">

                {props.isShowIcon && <>
                  {category === 'slots' && <div class="text-lg pr-1 icon"><SlotsIcon id="mobile"/></div>}
                  {category === 'sports' && <div class="text-lg pr-1 icon"><SportsIcon id="mobile"/></div>}
                  {category === 'casino' && <div class="text-lg pr-1 icon"><CasinoIcon id="mobile"/></div>}
                  {category === 'poker' && <div class="text-lg pr-1 icon"><PokerIcon id="mobile"/></div>}
                  {category === 'lottery' && <div class="text-lg pr-1 icon"><LotteryIcon/></div>}
                  {category === 'fish-hunter' && <div class="text-lg pr-1 icon"><FishShootingIcon id="mobile"/></div>}
                  {category === 'e-games' && <div class="text-lg pr-1 icon"><EGamesIcon id="mobile"/></div> }
                  {category === 'cockfight' && <div class="text-lg pr-1 icon"><CockFightIcon id="mobile"/></div>}
                </>}

                  {menuData.name}
                  {menuData.isHot && <span class=" hotLabel ml-1 p-1 text-xxs">HOT</span>}
               </a>
               </div>
               </>
            )})}
    </div>
    </>
  );
});
