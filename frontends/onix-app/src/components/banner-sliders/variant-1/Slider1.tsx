
import {
  $,
  component$,
  useSignal,
  useStyles$,
  useTask$,  
} from "@builder.io/qwik";
import { isServer } from '@builder.io/qwik/build';
// import DLL from '@thednp/dll'; 
// import Spicr from 'spicr';
import styles from "./Slider1.scss?inline"; 
import { bannerBase } from "../../../services/images";
import { ArrowRight } from "~/components/icons/ArrowRight";
import { ArrowLeft } from "~/components/icons/ArrowLeft";
import 'spicr/dist/css/spicr.min.css'; 
//import  Spicr  from "~/plugins/spicr"; 
import LinkButton from "~/components/link-button/variant-1/LinkButton1";
import { inlineTranslate } from "qwik-speak";
import ApkDownload from "~/components/apk-download/variant-4/ApkDownload4";

 
import { useSlidingBanner,type Props } from "~/hooks/business/useSlidingBanners";
 
 
export default component$((props: Props) => {
  useStyles$(styles);

  const t =inlineTranslate(); 
 
  const ArrowLeftIcon = props.arrowLeftIcon;
  const ArrowRightIcon = props.arrowRightIcon;
 const {showBtnApkDownload ,aspectRatio }= useSlidingBanner(props);
  // useOn( "qvisible", $(() => {
  //   console.log("run on qvisible Slider2" );
  // }));
  useTask$(async ( {cleanup}) => {
    console.log('spricrSlider' ) 
    if (isServer) {
      return; // Server guard
    }
   
    const Spicr =(await import( '~/plugins/spicr')).default;
    console.log('Spicr',Spicr)

     
    const  sliderElement= document.getElementById('spricrSlider');
    let spricrSlider = null;
    // const mySpicr = new Spicr(spricrSlider)
     const initSpicr = ()=>{
      spricrSlider=  new Spicr(sliderElement); 
     }
    
     const loadSliderMedia= ()=>{
          if(sliderElement)
          initSpicr();
           //DLL(sliderElement,initSpicr)
     }
   
     loadSliderMedia()
  
     cleanup(()=>{
        spricrSlider?.dispose();
     });
  },{eagerness:"load"});



  return (
    <>
       
       <div id="spricrSlider" class="spicr spicr-slider paused slider-variant-2 w-full relative bg-slate-500 md:leading-relaxed rounded-md" data-interval="5000">
        <div class="spicr-inner">
        
          {props.banners.map((item,index :number) => {  
            
            const bannerImg =  ( props.isMobile? ( item.mobilebannerImage||"") : item.bannerImage||"" ) as string ;
            return (
           <>
           { index % 4 == 0 && <LinkButton key={item.bannerImg} toUrl={item.bannerUrl}  class={`item ${index == 0? 'active' :'' }`} style={`aspect-ratio: ${aspectRatio}`}>
            <div class="item-bg spicr-layer bg-blue-700 item-bg-1" data-translate="y:100%" data-duration="700" data-easing="easingCubicInOut"   data-src={bannerBase + bannerImg} style={`background-image: url(${bannerBase + bannerImg});`}>
      
            {/* style="background-image: url(&quot;/images/dummy_images/main_banner/background1.webp&quot;);"  */}
              <div class="overlay absolute top-0 right-0 w-full h-full"></div>
            </div>
            {!props.isHideContent && <>
              <div class="container mx-auto px-4 h-full">  
            {/* IE9 fix */}
              <div class="flex items-end h-full">
                <div class="md:w-1/2 text-center my-0 mx-auto mb-8"  >
                  <div class="spicr-layer" data-translate="y:250" data-duration="600" data-rotate="z:15deg" data-easing="easingCubicInOut">
                    <h1 class="mb-6 font-bold text-2xl md:text-4xl ">Welcome to {props.webTitle}!</h1>
                  </div>
                  <div class="spicr-layer" data-translate="y:250" data-delay="350" data-duration="700" data-rotate="z:10deg" data-easing="easingCubicInOut">
                    <p class="lead text-lg font-bold">Best Online Gaming Platform</p> 
                  </div>
                  <div class="spicr-layer" data-translate="y:250" data-delay="450" data-duration="800" data-rotate="z:5deg" data-easing="easingCubicInOut">
                    <p class="mb-6">Welcome to play the trusted online casino indonesia 2023! We are the real casino online  where you will get the chance to play the most thrilling and top online casino indonesia games. <a class="text-light font-weight-bold" href="/">{props.webTitle}</a> for wide game online casino  </p>
                  </div>
                  {/* <div>
                    <p class="btns flex-center mb-8 gap-4 md:mx-16">
                      {  props.isAuth ?  (<>
                        <a class="btnSecondary px-2 py-2 leading-none rounded-2xl font-bold spicr-layer" href={`${props.apkUrl}`} role="button" data-translate="y:250" data-delay="550" data-duration="600" data-easing="easingCircularInOut">{t('app.Get Our App@@Get Our App')}</a>
                      <a class="btnSecondary px-2 py-2 leading-none rounded-2xl font-bold spicr-layer "  type="button"   role="button" data-translate="y:250" data-delay="650" data-duration="700" 
                      data-easing="easingCircularInOut" href={`/deposit/`} >{t('app.Deposit@@Deposit')}</a>
                      <a class="btnSecondary px-2 py-2 leading-none rounded-2xl font-bold spicr-layer" type="button"   role="button" data-translate="y:250" data-delay="750" data-duration="800" data-easing="easingCircularInOut" href={`/withdraw/`} >{t('app.Withdraw@@Withdraw')}</a>

                      </>) : (<>
                      
                        <a class="btnSecondary px-2 py-2 leading-none rounded-2xl font-bold spicr-layer" href={`${props.apkUrl}`} role="button" data-translate="y:250" data-delay="550" data-duration="600" data-easing="easingCircularInOut">{t('app.Get Our App@@Get Our App')}</a>
                      <button class="btnSecondary px-2 py-2 leading-none rounded-2xl font-bold spicr-layer "  type="button"   role="button" data-translate="y:250" data-delay="650" data-duration="700" 
                      data-easing="easingCircularInOut" onClick$={toggleRegQRL} >{t('app.Register@@Register')}</button>
                      <button class="btnSecondary px-2 py-2 leading-none rounded-2xl font-bold spicr-layer" type="button"   role="button" data-translate="y:250" data-delay="750" data-duration="800" data-easing="easingCircularInOut" onClick$={toggleLoginQRL} >{t('app.Login@@Login')}</button>
                      
                      </>)}
                     
                    </p>
                  </div>  */}
                </div> 
              </div>
            </div>
            </>}
          </LinkButton> 
           }
          { index % 4 == 1 && 
          <LinkButton key={item.bannerImg} toUrl={item.bannerUrl} class="item"  style={`aspect-ratio: ${aspectRatio}`}><>
            <div class="item-bg spicr-layer bg-pink-500 item-bg-2" data-translate="y:-100%" data-duration="700" data-easing="easingCubicInOut"   style={  `background-image: url(${bannerBase + bannerImg});` }>
              <div class="overlay absolute top-0 right-0 w-full h-full"></div>
            </div>
            {!props.isHideContent && <> <div class="container mx-auto px-4 h-full">
              <div class="flex flex-wrap  content-center h-full">
                <div class="md:w-1/2 md:pr-4 md:h-full">  
                  <div class="flex items-end md:items-center md:h-full">
                    <div class="w-full flex-col mb-8"> 
                      <div class="spicr-layer" data-translate="y:-150" data-duration="700" data-delay="350" data-easing="easingCircularOut">
                        <h1 class="mb-6 font-bold text-2xl md:text-4xl">We Offer Free Bet Casino</h1>
                      </div>
                      <div class="spicr-layer" data-translate="y:-150" data-duration="800" data-delay="450" data-easing="easingCircularOut">
                        <p>No more waiting; quickly join us for a thrilling and the best casino online for malaysian games and rewards!</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="md:w-1/2 md:pl-4  md:h-full">
                  <div class="flex items-start md:items-center md:h-full">
                    <div class="w-full flex-col mb-8"> 
                      <div class="spicr-layer" data-translate="y:-150" data-duration="800" data-delay="550" data-easing="easingCircularOut">
                        <h1 class="mb-6 font-bold text-2xl md:text-4xl">Online Casino Real Money</h1>
                      </div>
                      <div class="spicr-layer" data-translate="y:-150" data-duration="900" data-delay="650" data-easing="easingCircularOut">
                        <p> Online casino where you can play casino games using real money. By playing the games with real money, you will get the chance to win great rewards.The casino offering real money games is the place where you are enjoying the games in real-time.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> </>}
          </></LinkButton>
         
          
          
          }
          { index % 4 == 2 && 
         <LinkButton key={item.bannerImg} toUrl={item.bannerUrl} class="item perspective-500-1500" style={`aspect-ratio: ${aspectRatio}`}><> 
            <div class="item-bg spicr-layer bg-green-600 item-bg-3" data-rotate="x:90" data-transform-origin="z:50%v" data-duration="700" data-easing="easingCubicInOut"  style={  `background-image: url(${bannerBase + bannerImg});` }>
              <div class="overlay absolute top-0 right-0 w-full h-full"></div>
            </div>
            {!props.isHideContent && <> <div class="container mx-auto px-4 h-full">
              <div class="flex flex-wrap   h-full content-center">
                <div class="md:w-1/2 md:pr-4 md:h-full">
                  <div class="flex perspective-500 items-end md:items-center md:h-full">
                    <div class="w-full flex-col mb-8" >
                    <div class="spicr-layer" data-translate="y:10%" data-rotate="x:90" data-transform-origin="z:50%" data-duration="800" data-easing="easingCubicInOut">
                      <h1 class="mb-6 font-bold text-2xl md:text-4xl">Likes Real Casino</h1>
                      <p>Same betting , same support, same casino rules serving to you from your home!</p>
                    </div>
                    </div>
                    
                  </div>
                </div>
                <div class="md:w-1/2 md:pl-4 md:h-full">
                  <div class="flex perspective-500 items-start md:items-center md:h-full">
                  <div class="w-full flex-col mb-8" >
                    <div class="spicr-layer" data-translate="y:10%" data-rotate="x:90" data-transform-origin="z:50%" data-duration="900" data-delay="350" data-easing="easingCubicInOut">
                      <h1 class="mb-6 font-bold text-2xl md:text-4xl">High performance</h1>
                      <p>We make sure to server the best performance games. 24/7 Customer Service that is always ready to serve you </p>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> </>}
         
             </> </LinkButton>
          }
          { index % 4 == 3  &&
           <LinkButton key={item.bannerImg} toUrl={item.bannerUrl} class="item perspective-500-1500" style={`aspect-ratio: ${aspectRatio}`}><>   <div class="item-bg spicr-layer bg-indigo-600 item-bg-4" data-rotate="y:90" data-transform-origin="z:-50%" data-duration="1000" data-easing="easingCubicInOut"  style={  `background-image: url(${bannerBase + bannerImg});` }>
           <div class="overlay absolute top-0 right-0 w-full h-full"></div>
         </div>
         {!props.isHideContent && <>    <div class="container mx-auto px-4 h-full">
           <div class="flex md:w-1/2 items-center md:text-center md:justify-center h-full mx-auto mb-8" >
             <div class="spicr-layer" data-rotate="y:90" data-transform-origin="z:-50%" data-duration="1200" data-easing="easingCubicInOut">
               <h1 class="mb-6 font-bold text-2xl md:text-4xl"><span>What's crazy about it?</span><br/>IT IS FREE AND PLAYERS ARE PROTECTED!</h1>
               <p>That's right! {props.webTitle} is licensed under <a class="text-light" href="/" target="_blank">Curacao License</a> and this means you can are protected by license regulator. No scams , no registration fees. You can report to the license regulator for any misconduct on our side. Yey!</p>
             </div>
           </div>
         </div></>}</>  </LinkButton>
         }
          </>)} )}
      
      </div> 
     
        <a class={`${props.textClass ?? `text-white`} left spicr-control long-shadows absolute w-2/12 text-xl`} data-slide="prev">
          <span class="arrow-prev">
          {!props.arrowLeftIcon && (<ArrowLeft></ArrowLeft>) }
          {props.arrowLeftIcon && (<ArrowLeftIcon/>) }
          </span>
        </a>
        <a class={`${props.textClass ?? `text-white`} right spicr-control long-shadows absolute w-2/12 text-xl`} data-slide="next">
          <span class="arrow-next">
          {!props.arrowRightIcon && (<ArrowRight></ArrowRight>) }
          {props.arrowRightIcon && (<ArrowRightIcon />) }
          </span>
        </a>
        {/* APK download overlay */}
        { showBtnApkDownload.value && 
        <div class="w-full bottom-0 pb-5 text-center absolute z-10"> 
          <ApkDownload onHideApkDownload$={$(()=>{
            showBtnApkDownload.value = false
          })}></ApkDownload>
        </div>
        }

          <ol class="spicr-pages flex flex-row justify-center !pb-2">
        {props.banners.map((item,index :number) => (
          <li data-slide-to={index} key={index} class={`rounded-3xl ${index == 0 ?  'active' : ''}`}></li> 
          
          ))}
        </ol>
      </div>

    </>
  );
});
