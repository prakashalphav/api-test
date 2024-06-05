/*
Readme : 

1. The number of games banners  must not be less than 7
*/

import { component$, useStyles$ , useOn,$ } from '@builder.io/qwik';
import Splide from '@splidejs/splide';
import styles from './GamesSlider1.scss?inline'; 
import  '@splidejs/splide/css/core'; 
import {ArrowLeft}  from '../../icons/ArrowLeft';
import {ArrowRight}  from '../../icons/ArrowRight';
import {hotGamesBase} from "../../../services/images";
import { type GameItem } from '~/routes';

type Props = {
    parentId: string, // '#parent'
    gameList: GameItem[],
};

export default component$(( props : Props) => {
    useStyles$(styles);  
    useOn( "qvisible", $(( ) => { 
        console.log("run on qvisible GamesSlider1" );
        // will run when the component becomes visible  
        new Splide( props.parentId + ' .games-slider' ,{
            type   : 'loop', 
            perPage: 7,
            autoplay : true,
            focus: 'center',
            lazyLoad : "nearby",
            interval: 8000, 
            flickMaxPages: 1,
            updateOnMove: true, 
            throttle: 300,
              arrows : true,
              gap:  "0em",
              pagination:false,
              breakpoints: {
                640: { //max-width
                  perPage: 3, 
                  flickMaxPages: 1,
                  arrows : false,
                },
                1280: {  //max-width
                    perPage: 5, 
                    flickMaxPages: 1,
                }, 
                1536: {  //max-width
                    perPage:7, 
                    flickMaxPages: 1,
                }, 
                
              } 
          }).mount();
   }));
          
    return <> {props.gameList && (<>
    <div class="games-slider splide  backdrop:" aria-label="SLIDER">
    <div class="splide__arrows">
		<button class="splide__arrow splide__arrow--prev left-6">
        <ArrowLeft></ArrowLeft>
        </button>

		<button class="splide__arrow splide__arrow--next right-6">
        <ArrowRight></ArrowRight> 

		</button>
  </div>
  <div class="splide__track">
    <ul class="splide__list">
            {Object.values(props.gameList).map((item)=>(
            <li class="splide__slide">
                <div class="splide__slide__container">
                    <div class="slide__content"> 
                       <a href={"/"+item.category_slug +"/"+item.brand_slug+"?q="+ item.game_name}>
                        <div class="image-wrap rounded-xl relative py-1.5 px-1 w-full">

                        <picture>
                   
                      <source srcSet={    item.img_src +
          '.avif?v=' +
          item.img_v +
          ' 1x, ' +
          item.img_src +
          '@2x.avif?v=' +
          item.img_v +
          ' 2x, ' +
          item.img_src +
          '@3x.avif?v=' +
          item.img_v +
          ' 3x, '} type="image/avif"  width="220"
                        height="220"/>
                           <source srcSet={item.img_src +'.webp?v=' +
          item.img_v +
          ' 1x, ' +
          item.img_src +
          '@2x.webp?v=' +
          item.img_v +
          ' 2x, ' +
          item.img_src +
          '@3x.webp?v=' +
          item.img_v +
          ' 3x, '} type="image/webp"   width="220"
                        height="220"/>

<img
                        src={item.img_src + '.jpg?v=' + item.img_v}
                        alt={ item.game_name}
                        width="220"
                        height="220"
                        loading="lazy"
                        decoding="async"
                        // srcSet="small.png 1x, medium.png 2x, large.png 3x"
                      />
                    </picture>
                                {/* <img src={props.parentId == '#hot-games' ? hotGamesBase + item.img_src : ""+item.img_src} 
                                class=" h-[150px] sm:h-[160px] md:h-[200px] lg:h-[250px] w-full rounded-xl" height="150px" width="115px"/> */}
                                 
                            </div>
                       </a>
                    </div>
                </div>
            </li>
            )
            )} 
        </ul>
    </div>
 
</div> 
</>)}
     </>;
})