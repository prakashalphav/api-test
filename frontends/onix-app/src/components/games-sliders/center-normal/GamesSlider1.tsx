/*
Readme : 

1. The number of games banners  must not be less than 7
*/

import { component$, useStyles$ , useOn, $ } from '@builder.io/qwik';
import Splide from '@splidejs/splide';
import styles from './GamesSlider1.scss?inline'; 
import  '@splidejs/splide/css/core';  
import { useGameLaunch } from '~/hooks/business/useGameList';
import { useCommonViewData } from '~/hooks/app/useCommonViewData';
 
type Props = {
    id: number; // '#parent'
    gameList: Record<string, unknown>[];
    gameCode: string;
};

export default component$((props: Props) => {

 
    const {launchGameItemQRL}= useGameLaunch();


    const  {commonData} = useCommonViewData();
    useStyles$(styles);  
    useOn( "qvisible", $(( ) => { 
        console.log("run on qvisible GamesSlider1" );
        // will run when the component becomes visible  
        new Splide( ' .games-slider' + props.id ,{
            type   : 'loop', 
            perPage: 8,
            autoplay : false,
            lazyLoad : "nearby",
            interval: 1000, 
            flickMaxPages: 1,
            updateOnMove: true,
            throttle: 300,
            gap:  "1em",
            arrows : false,
            pagination:false,
            breakpoints: {
                460: { //max-width
                    perPage: 3, 
                    flickMaxPages: 1,
                },
                640: { //max-width
                perPage: 4, 
                flickMaxPages: 1,
                },
                1024: {  //max-width
                    perPage: 5, 
                    flickMaxPages: 1,
                }, 
                1280: {  //max-width
                    perPage: 6, 
                    flickMaxPages: 1,
                }, 
            } 
          }).mount();
   }));
          
    return <>
       <div class={`games-slider`+props.id+` splide  backdrop:`} aria-label={`SLIDER`+props.id}>
            <div class="splide__track">
                <ul class="splide__list">
                    {props.gameList.map((item:any, idx)=>(
                    <li class="splide__slide">
                        <a href="#" class="splide__slide__container" onClick$={async ()=>{  
                        await launchGameItemQRL(item,commonData.isAuth,props.gameCode, 0 ,0)
                        }}>
                            <div class="slide__content rounded-xl">   
                            { idx == 0 && (<>
                                <div class="hot-label font-semibold text-xxs w-16  py-1 flex justify-center rounded-tl-2xl rounded-br-2xl absolute -top-[1px] -left-[1px]">Hot</div>
                            </>)}
                            { idx == 1 && (<>
                                <div class="new-label font-semibold text-xxs w-16  py-1 flex justify-center rounded-tl-2xl rounded-br-2xl absolute -top-[1px] -left-[1px]">Hot</div>
                            </>)}
                            <img class="w-full h-[140px] lg:h-[180px] rounded-xl" src={item.ImgSrc || item.img_src.replace("{{device}}","mobile").replace("{{type}}","normal")}/>
                            </div>
                        </a>
                    </li>
                    )
                    )} 
                </ul>
            </div>
        </div> 
     </>;
})