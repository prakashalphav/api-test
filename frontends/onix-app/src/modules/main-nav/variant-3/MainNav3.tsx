import { component$, useStylesScoped$  ,$ } from '@builder.io/qwik'; 
 
import styles from './MainNav3.css?inline';  
 
import { ArrowRight } from "~/components/icons/ArrowRight";
import { ArrowLeft } from "~/components/icons/ArrowLeft";

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

  const {onSideScroll}= useScroller('#mainNav3Scroller', 100)
  return (
    <>
     <div class={`${props.class??''}  relative p-1`}>
        <div id="mainNav3Scroller"  class="flex flex-nowrap justify-start gap-1 w-full text-center top-bar overflow-x-auto scroller scroller--invisible pr-10" > 
       {
          Object.values(commonData.categories).map((category: string) => {
            const menuData = navMenuMap.get(category);

            return (<>
               {menuData  &&    <a href={`/${category}/`} class="flex p-2.5 gap-1 items-center cursor-pointer rounded-2xl" >
                <span class="w-6 h-6 ">
                    <img   src={`${menuData.icon}`}      
                            width="24"
                            height="24"  
                            loading='lazy' decoding='async'class=" " ></img>
                    </span>
                
                    <span class="text-xs font-medium whitespace-nowrap">{menuData.name}</span>
                </a>}
            </>)})
        }
          
        </div>
    
  
     </div>
    
    </>
  );
});
