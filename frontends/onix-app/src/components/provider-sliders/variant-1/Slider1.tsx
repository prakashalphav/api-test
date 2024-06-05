import { component$,  useStylesScoped$   } from '@builder.io/qwik';
// import Splide from '@splidejs/splide';
import styles from './Slider1.scss?inline'; 
// import  '@splidejs/splide/css/core'; 


// import {ArrowLeft}  from '../../../components/icons/ArrowLeft';
// import {ArrowRight}  from '../../../components/icons/ArrowRight';
import {imgBase} from '../../../services/images'
import type { Provider } from '~/services/types';

type Props = {
    providers: Provider[];
    category: string;
}

export default component$(( props : Props) => {
    useStylesScoped$(styles);  
//     useVisibleTask$(( ) => { 
//         new Splide( ' .providers-slider' ,{
//             type   : 'loop', 
//             perPage: 7,
//             autoplay : true,
//             focus: 'center',
//             lazyLoad : "nearby",
//             interval: 1000, 
//             flickMaxPages: 1,
//             updateOnMove: true,
//             throttle: 300,
//               arrows : true,
//               gap:  16,
//               pagination:false,
//               breakpoints: {
//                 300: { //max-width
//                     perPage: 3, 
//                     flickMaxPages: 1,
//                   },
//                 640: { //max-width
//                   perPage: 5, 
//                   flickMaxPages: 1,
//                 },
//                 1280: {  //max-width
//                     perPage: 9, 
//                     flickMaxPages: 1,
//                 }, 
            
//               } 
//           }).mount();
//    });
          
    return <>
        {/* <div class=" providers-slider splide px-8 backdrop:" aria-label="PROVIDER-SLIDER">
            <div class="splide__arrows">
                <button class="splide__arrow splide__arrow--prev absolute left-0 top-1/2 p-0 flex items-center justify-center w-10 z-1 text-xl -translate-y-1/2">
                <ArrowLeft></ArrowLeft>
                </button>

                <button class="splide__arrow splide__arrow--next absolute right-0 top-1/2 p-0 flex items-center justify-center w-10 z-1 text-xl -translate-y-1/2">
                <ArrowRight></ArrowRight> 
                </button>
            </div>
            <div class="splide__track">
                <ul class="splide__list">
                {props.providers.map((item: Record<string, unknown>)=>(
                      <li class="splide__slide">
                      <a href={"/"+props.category+"/"+item.brand_slug} class="splide__slide__container">
                          <div class="slide__content">   
                          <img class="w-[50px] h-[50px] sm:w-20 sm:h-20 lg:w-25 lg:h-25" src={mobileProviderBase+item.brand_slug+".png"}/>
                          </div>
                            </a>
                        </li>
                    )
                    )} 
                </ul>
            </div>
        </div>  */}
        <div class="overflow-auto whitespace-nowrap pb-3 px-3">
            {props.providers.map((item )=>(
                <a href={"/"+props.category+"/"+item.brand_slug} class="content inline-block mr-3  rounded-full w-16 sm:w-20  lg:w-25 overflow-hidden aspect-square  ">
                  <div class="flex-center min-h-full">
                  <img width={70} height={49}    loading="lazy"
                decoding="async" class="w-full" src={  
                    `${imgBase}/assets/imgs/game_logos/100x70/${item.game_code}.png`
                }/>
                  </div>
                </a>
            ))}
        </div>
     </>;
})