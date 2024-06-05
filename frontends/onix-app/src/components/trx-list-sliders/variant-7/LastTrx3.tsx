import { component$, $, useOn, useStylesScoped$ } from '@builder.io/qwik';
import styles from './LastTrx3.scss?inline';
import { inlineTranslate } from 'qwik-speak';
import type { LatestSiteTrx } from '~/services/types';
import { useCommonViewData } from '~/hooks/app/useCommonViewData';
import {   numFormat } from '~/utils/common';
import Splide from '@splidejs/splide';
import { Grid } from '@splidejs/splide-extension-grid';
import  '@splidejs/splide/css/core'; 
import { ArrowLeft } from '~/components/icons/ArrowLeft';
import { DoubleArrowRight } from '~/components/icons/DoubleArrowRight';
import { intlFormatDistance   } from 'date-fns';

type Props = {
  type : "deposit" | 'winner'; 
  parentId: string; // '#parent' - *must apply this if one page reuse this component*
  trxList : LatestSiteTrx[];
}

export default component$((props: Props) => {
    useStylesScoped$(styles);
    const t = inlineTranslate();
    const {commonData} = useCommonViewData();

    const list :LatestSiteTrx[] = props.trxList;
   
    useOn( "qvisible", $(( ) => { 
      console.log("run on qvisible GamesSlider1" );
      // will run when the component becomes visible  
      new Splide(`#trx-slider-${props.parentId}` ,{
        type   : 'loop', 
          perPage: 4,
          autoplay : true,
          lazyLoad : "nearby",
          interval: 8000, 
          flickMaxPages: 1,
          gap:  "1em",
          updateOnMove: true, 
          throttle: 300,
            arrows : true,
            pagination:false,
            breakpoints: {
              640: { //max-width
                perPage: 2, 
                flickMaxPages: 1,
                padding: '0rem',
                focus: 0,
                gap:  "0.5em",
                grid: {
                  rows:  2,
                  gap : {
                    row: '0em',
                  },
                },
              },
              1280: {  //max-width
                  perPage: 3, 
                  flickMaxPages: 1,
                  padding: '4rem',
                  focus: 'center',
                  gap:  "0.5em",
                  grid: {
                    rows: 1,
                    gap : {
                      row: '0em',
                    },
                  },
                }, 
              1536: {  //max-width
                  perPage: 4, 
                  flickMaxPages: 1,
                  padding: '2rem',
                  focus: 'center',
                }, 
              
            } 
          }).mount({ Grid });
  }));

  const titleBgImgMaxWidth = 242;
return <> 
        {list && list.length > 0 && <>
          <div class="lastTrxWrapper relative rounded-md">
            <div class="relative z-10 flex-center"> 
              <div class="title sm:px-4 xl:px-0" style={`max-width:${titleBgImgMaxWidth}px;`}>
              {props.type === 'deposit' && <>
              <img style={``} class="titleBgImg   " src="https://files.sitestatic.net/assets/imgs/onixv2/firegaming/yellowPolygonShape.webp" width={titleBgImgMaxWidth} height="47" loading="lazy" decoding="async"/>
 
              </>}

              {props.type === 'winner' && <>
              <img   class="titleBgImg  " src="https://files.sitestatic.net/assets/imgs/onixv2/firegaming/redPolygonShape.webp" width={titleBgImgMaxWidth} height="47" loading="lazy" decoding="async"/>
              
        
              </>}
             
              <div class=" absolute top-1/2  left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 whitespace-nowrap font-semibold text-md sm:text-lg xl:text-xl">
                {props.type === 'deposit' && <> {t("home.Latest Deposits@@Latest Deposits")} </>}
                {props.type === 'winner' && <> {t("home.Latest Winners@@Latest Winners")} </>}
              </div>
        
              </div>
            </div>
            <div id={`trx-slider-${props.parentId}`} class={`splide `} aria-label="SLIDER">
              <div class="splide__arrows">
                <button class={`splide__arrow splide__arrow--prev -left-4 !opacity-0 `}>
                  <ArrowLeft></ArrowLeft>
                </button>

                <button
                  class={`splide__arrow splide__arrow--next right-0 w-1/5 sm:!opacity-0`}
                >
                  <div class="arrowIcon ml-auto">
                    <DoubleArrowRight
                      class={"w-4 h-4 sm:w-auto sm:h-auto"}
                    ></DoubleArrowRight>
                  </div>
                </button>
              </div>
              <div class="splide__track">
                <div class="leftSurface sm:rounded-bl-md"></div>
                <div class="rightSurface sm:rounded-br-md"></div>
                <ul class="splide__list">
                  {list.map((item, index) =>(
                    <>
                      <li class="splide__slide">
                        <div class="splide__slide__container">
                          <div class="slide__content py-4 ">
                            <div class="flex items-center   px-2 gap-2  py-2 sm:px-4 sm:gap-3 rounded-md userRecordWrapper  ">
                              <img
                                  width="32"
                                  height="32"
                                  src="https://files.sitestatic.net/assets/imgs/onixv2/vega/user.png"
                                  loading="lazy"
                                  decoding="async"
                                  alt="user"
                                />
                              <div class="flex flex-col relative w-full">
                                <div class="grid grid-cols-2 items-center mb-2">
                                  <div class="usernameText text-xxs sm:text-xs truncate col-span-1">{item.user_fund_accname} {index % 3 == 0 ? "sdfsdfsdfsdfsdf" : ""}</div>
                                  <div class="timeText ml-auto text-right text-xxs sm:text-xs truncate col-span-1">{intlFormatDistance(new Date(item.created_at), new Date(), { style:  "short" })}</div>
                                </div>
                                <div class="font-semibold text-sm sm:text-lg truncate">{commonData.website_settings.currencyCode} {numFormat(item.amount)}</div>
                              </div>
                            </div>
                            
                          </div>
                        </div>
                      </li>
                    </>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </>} 
    </>;
});