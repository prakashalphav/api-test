import {
  component$,
  useStyles$,
  useOn,
  $
} from "@builder.io/qwik";
import Splide from "@splidejs/splide";
import styles from "./GamesSlider3.scss?inline";
import "@splidejs/splide/css/core";
import { bannerBase } from "~/services/images";
import { Transition } from './Transition';

type Props = {
    parentId: number; // '#parent'
  gameList: Record<string, unknown>[]; 
  tag :string;
};

export default component$((props: Props) => {
  useStyles$(styles);
  useOn("qvisible", $(() => {
    console.log("run on qvisible grid GamesSlider3" );
    // will run when the component becomes visible
    const main =  new Splide(props.parentId +   " .grid-games-slider"  , {
      type: "loop", 
      perPage: 1,
      autoplay: true,
      direction: "rtl",
      width: '42.6%', //456,//
      gap:16,
      height: 484,
      cover: true, 
        autoWidth: true,
      //autoHeight: true,
      arrows: false,
      // heightRatio:0.375,
      updateOnMove : true,
      pauseOnHover : true,
      pauseOnFocus: true,
      interval :3000, 
      breakpoints: {
        1145: { //max-width
            width: '50%',//'42.6%',
		},
		768: { //max-width
            width: '100%',
            height:'auto',
            fixedHeight: 'auto',
            autoHeight: true,
            cover: false,  
		} 
        }
    });

   const vertical=  new Splide(props.parentId + " .grid-games-slider-1"  , {
      type: "loop",
      cover: true,  
      autoplay: true,
      isNavigation: true,
      direction: "ttb",
    //  width: 614,
    width: '57.3%',
      height: 484,
      perPage: 3,
      gap : 8,  
      fixedHeight: 156,
      pagination : false,
      // autoWidth: false,
     // autoHeight: true,
      arrows: false, 
      updateOnMove : true,
      pauseOnHover : true,
      pauseOnFocus: true,
      interval :3000,
      drag: false,
      breakpoints: {
        
        1145: { //max-width
            width: '50%',
		},
		768: { //max-width
            width: '100%', 
            cover: false,  
		},
        }
    });
    main.sync(vertical).mount( {},  Transition);
    vertical.mount();
  }));

  return (
    <>
      <div>
        <div class="flex-center gap-4 flex-col md:flex-row grid-games">
          
            <div
              class={`grid-games-slider  splide  backdrop:`}
              aria-label={`SLIDER` }
            >
              <div class="splide__track">
                <ul class="splide__list">
                  {Object.values(props.gameList).map((item) => (
                    <li class="splide__slide    ">
                      <div class="splide__slide__container">
                        <div class="slide__content rounded-[20px] overflow-hidden  ">
                          <a
                            href={
                              "/" +
                              item.category_slug +
                              "/" +
                              item.brand_slug +
                              "?q=" +
                              item.game_name
                            }
                            class="block"
                          >
                            <div class="absolute top-4 left-4 tag-category rounded-3xl px-3 py-1 text-lg">{props.tag}</div>
                          <div class="flex flex-col">

                          <div class="image-wrap rounded-[20px]  w-auto">
                              <picture>
                                <source
                                  srcSet={
                                    item.img_src +
                                    "@3x.avif?v=" +
                                    item.img_v +
                                    " 1x, "  
                                  }
                                  type="image/avif"
                                  width="660"
                                  height="660"
                                />
                                <source
                                  srcSet={
                                    item.img_src +
                                    "@3x.webp?v=" +
                                    item.img_v +
                                    " 1x, "  
                                  }
                                  type="image/webp"
                                  width="660"
                                  height="660"
                                />

                                <img
                                  src={item.img_src + ".jpg?v=" + item.img_v}
                                  alt={item.game_name}
                                  width="660"
                                  height="660"
                                  class="max-w-full w-full"
                                  loading="lazy"
                                  decoding="async"
                                  // srcSet="small.png 1x, medium.png 2x, large.png 3x"
                                />
                              </picture>
                              {/* <img src={props.parentId == '#hot-games' ? hotGamesBase + item.img_src : ""+item.img_src} 
                                class=" h-[150px] sm:h-[160px] md:h-[200px] lg:h-[250px] w-full rounded-xl" height="150px" width="115px"/> */}
                            </div>
                            <div class="relative px-4 flex-auto z-10   text-2xl text-left font-medium">{item.game_name}</div>
                          </div>
                            <div class="absolute bg-overlay inset-0"></div>
                         
                         
                          </a>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
    
        
        
            <div
              class={`grid-games-slider-1  splide  backdrop:`}
              aria-label={`SLIDER` }
            >
              <div class="splide__track">
                <ul class="splide__list">
                  {Object.values(props.gameList).map((item) => (
                    <li class="splide__slide    ">
                      <div class="splide__slide__container">
                        <div class="slide__content game-row   overflow-hidden flex items-start  px-5 py-2 gap-4">
                     
                            <div class="image-wrap rounded-[20px] relative overflow-hidden  max-w-[140px]">
                              <picture>
                                <source
                                  srcSet={
                                    item.img_src +
                                    ".avif?v=" +
                                    item.img_v +
                                    " 1x, " +
                                    item.img_src +
                                    "@2x.avif?v=" +
                                    item.img_v +
                                    " 2x, " +
                                    item.img_src +
                                    "@3x.avif?v=" +
                                    item.img_v +
                                    " 3x, "
                                  }
                                  type="image/avif"
                                  width="220"
                                  height="220"
                                />
                                <source
                                  srcSet={
                                    item.img_src +
                                    ".webp?v=" +
                                    item.img_v +
                                    " 1x, " +
                                    item.img_src +
                                    "@2x.webp?v=" +
                                    item.img_v +
                                    " 2x, " +
                                    item.img_src +
                                    "@3x.webp?v=" +
                                    item.img_v +
                                    " 3x, "
                                  }
                                  type="image/webp"
                                  width="220"
                                  height="220"
                                />

                                <img
                                  src={item.img_src + ".jpg?v=" + item.img_v}
                                  alt={item.game_name}
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
                            <div class="flex-auto min-w-0 text-left">
                              <p class="my-4">
                                <span class="tag-category rounded-3xl px-3 py-1 ">Slot</span>
                              </p>
                              <p class="game-name text-xl mb-6 font-medium">{item.game_name}</p>
                              <div>
                                <a    href={
                              "/" +
                              item.category_slug +
                              "/" +
                              item.brand_slug +
                              "?q=" +
                              item.game_name
                            } class="px-4 py-1 play-btn rounded-3xl"> Play Now</a>
                              </div>
                            </div>
                            <div class="absolute top-0 right-0 bottom-0 w-[150px] h-full wave -z-10" ></div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
        
        
        </div>
      </div>
    </>
  );
});
