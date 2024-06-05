import { component$, useStylesScoped$  ,$ } from '@builder.io/qwik'; 
 
import styles from './MainNav2.css?inline';  
 
// import {Game3Icon} from '~/components/icons/Game3';

 
import { ArrowRight } from "~/components/icons/ArrowRight";
import { ArrowLeft } from "~/components/icons/ArrowLeft";

// import ImgSlotsilver from '~/media/images/svg/SlotSilver.svg?jsx';
// import ImgSportssilver from '~/media/images/svg/SportsSilver.svg?jsx';
// import ImgCasinosilver from '~/media/images/svg/CasinoSilver.svg?jsx';
// import ImgLotterysilver from '~/media/images/svg/LotterySilver.svg?jsx';
// import ImgFishshootingsilver from '~/media/images/svg/FishShootingSilver.svg?jsx';
// import ImgEgamessilver from '~/media/images/svg/EGamesSilver.svg?jsx';
import {
    inlineTranslate,  
  } from 'qwik-speak';
import { useScroller } from '~/hooks/utils/useScroller';
import { useCommonViewData } from "~/hooks/app/useCommonViewData";
import { useMainNav1Mapping } from '~/hooks/business/useHeader';
type Props = {
    class?:string
}
export default component$(( props : Props ) => {
  useStylesScoped$(styles); 
  const t = inlineTranslate();
  const {commonData} = useCommonViewData();  
  const {navMenuMap} = useMainNav1Mapping()

  const {onSideScroll}= useScroller('#mainNav2Scroller', 100)
  return (
    <>
     <div class={`${props.class??''}  relative px-5`}>
        <div id="mainNav2Scroller"  class="flex flex-nowrap justify-start gap-4 w-full text-center top-bar overflow-x-auto scroller scroller--invisible pr-10" > 
       {
          Object.values(commonData.categories).map((category: string) => {
            const menuData = navMenuMap.get(category);

            return (<>
               {menuData  &&    <a href={`/${category}/`} class="block item content cursor-pointer rounded-2xl p-1 px-3 min-w-[70px]" >
                <div class="inline-block  placeholder:"> 
                    <img   src={`${menuData.icon}`}      
                            width="48"
                            height="48"  
                            loading='lazy' decoding='async'class="w-8 h-8  sm:w-10  sm:h-10 " ></img>
                    {/* <ImgSlotsilver class="w-8 h-8  sm:w-10  sm:h-10 "  /> */}
                </div>
                    <div class="text-xs font-bold truncate">{menuData.name}</div>
                </a>}
            </>)})
        }
          
        </div>
    
        <button class="left-ctrl absolute text-lg  opacity-50 left-0 top-1/2 -translate-y-1/2" type="button" onClick$={()=>{
            onSideScroll('left' )
        }}>
          <span class="arrow-prev">
          <ArrowLeft></ArrowLeft>
          </span>
        </button>
        <button class="right-ctrl absolute text-lg  opacity-50 right-0 top-1/2 -translate-y-1/2" type="button" onClick$={()=>{
            onSideScroll('right' )
        }}>
          <span class="arrow-next">
          <ArrowRight></ArrowRight>
          </span>
        </button>
     </div>
    
    </>
  );
});
