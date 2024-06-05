import { component$  ,  useTask$,} from '@builder.io/qwik';
import { useQwikSpeak } from 'qwik-speak';

import { config } from './speak-config';
import { translationFn } from './speak-functions';

import { QwikCityProvider, RouterOutlet, ServiceWorkerRegister } from '@builder.io/qwik-city';
import { RouterHead } from './components/router-head/RouterHead';
import { isServer } from '@builder.io/qwik/build';
import './global.scss';
import { useCreateAppState } from './hooks/app/useAppState';
import { useInteractState, useToasts } from './hooks/app/useInteract';
import AlertDialog from './components/dialog/variant-1/Dialog1';
import { QwikPartytown } from './components/partytown/partytown';
import ToastList from './components/toast-list/variant-1/ToastList1';
export const togglePause = (
  el: Element, 
  isIntersecting: boolean,
  intersectionRatio :number, 
) => {
  if (isIntersecting ) {
      //if in view then remove paused
      el.classList.remove('paused');
      return;
  }
  // If the element is not in viewport

  //Add Paused
  el.classList.add('paused');
};
export const animateOnScroll = (
  el: Element,
  animeName: string,
  isIntersecting: boolean,
  intersectionRatio :number, 
) => {
  if (isIntersecting ) {
      // Add the animation class

      el.classList.add(animeName);
      el.removeAttribute("anime-name");
      return;
  }
  // If the element is not in viewport

  //Remove the animation class
  //el.classList.remove(animeName);//do not reanimate again
};
export default component$(() => {
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Dont remove the `<head>` and `<body>` elements.
   */
  const {appHasModal} = useCreateAppState(); 
 
  const   {alertDialogShow, alertDialogProps, toasts,dismissToast} = useInteractState();
  const template = import.meta.env.VITE_APP_SUB_SKIN;
  // useTask$(({cleanup}) => {
  //   if (isServer) {
  //     return; // Server guard
  //   }
    
  //   window.name = !window.name? "parent"  + Date.now() + Math.floor(Math.random() * 100000000) : window.name;
  //       /*smooth scroll*/
  //       // const body = document.body,
  //       // scrollWrap = document.getElementsByClassName("smooth-scroll-wrapper")[0],
  //       // height = scrollWrap.getBoundingClientRect().height - 1,
  //       // speed = 0.08;

  //       // let offset = 0;
  //       // body.style.height = Math.floor(height) + "px";

  //       // function smoothScroll() {
  //       //     offset += (window.pageYOffset - offset) * speed;

  //       //     const scroll = "translateY(-" + offset + "px) translateZ(0)";
  //       //     scrollWrap.style.transform = scroll;

  //       //     window.requestAnimationFrame(smoothScroll);
  //       // }

  //       // smoothScroll();
        
  //       /*AOS*/
  //       const observer = new IntersectionObserver(
  //         (entries) => {
  //             // Loop over the entries
  //             entries.forEach((entry) => {
  //                 // If the element is visible
  //                 // console.log(
  //                 //     "intersectionCBCalled",entry,
                      
  //                 //     entry.target.id,
  //                 //     entry.target.classList,
  //                 //     entry.isIntersecting,
  //                 //     entry.intersectionRatio,   
  //                 // );
  //                 const isSpicrEle = entry.target.classList.contains('spicr'); 
  //                 if(isSpicrEle){
  //                   togglePause(
  //                     entry.target, 
  //                     entry.isIntersecting,
  //                     entry.intersectionRatio, 
  //                   );
  //                 }
  //                 else {
  //                   const animeName = entry.target.getAttribute("anime-name");
  //                   if (animeName) {
  //                     const isAnimeExist = entry.target.classList.contains(animeName);
  //                       animateOnScroll(
  //                           entry.target,
  //                           animeName,
  //                           isAnimeExist ?  false : entry.isIntersecting,
  //                           entry.intersectionRatio,  
  //                       );
  //                   } else {
  //                     const childElements = entry.target.querySelectorAll("[anime-name]");
                     
  //                     if(childElements && childElements.length){
  //                       childElements.forEach(childElement => {
  //                         // console.log(childElement.innerText);
  //                         const animeName =
  //                         childElement.getAttribute(
  //                             "anime-name"
  //                         );
  
  //                         if (animeName) {
  //                           animateOnScroll(
  //                              childElement,
  //                               animeName,
  //                               entry.isIntersecting,
  //                               entry.intersectionRatio, 
  //                           );
  //                        }
  //                       });
  //                     } 
  //                   }
  //                 }
               
  //             });
  //         },
  //         {
  //             root: null,
  //             rootMargin: "0px 0px 0px 0px",
  //             threshold: 0.2,
  //         }
  //     );
  //   // Doesn't set up the observers to respect prefers reduced motion  
  //   if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  //     const aosElList = document.querySelectorAll(".js-aos");
  //     aosElList.forEach((el: Element) => {
  //         // const animeName = el.getAttribute("anime-name");
  //         // if (animeName) {
  //         //     el.classList.remove(animeName);
  //         // }

  //         observer.observe(el);
  //     });
     
  //   }
  //    //toggle  class "paused" on slider when out of view
  //     const spicrSliders = document.querySelectorAll(".spicr");
  //     spicrSliders.forEach((el: Element) => { 
  //       observer.observe(el);
  //     });
  //     cleanup(() => (observer.disconnect()));

  
  //     document.dispatchEvent(new CustomEvent("qprefetch",{detail:{"bundles":["/build/q-0216ZPNr.js" ]}}));
  //     console.log("root run end");
  // },{eagerness:"load"});

  useQwikSpeak({ config, translationFn });
  return (
   
    <QwikCityProvider>
      <head> 
        <meta charSet="utf-8" />
        <QwikPartytown 
        resolveUrl={function(url) {
          if (url.hostname === "connect.facebook.net") {
            const _proxyUrl = 'https://fbq-proxy.web-ug.com';

            
           const proxyUrl=  new URL( _proxyUrl + (url.pathname? url.pathname: '/') + url.search);
            return proxyUrl;
          }
          return url;
        }}
        forward={['dataLayer.push', 'fbq']} />
        <meta name="viewport" content="width=device-width,initial-scale=1, maximum-scale=1, user-scalable=no" />
        <link rel="manifest" href="/manifest.json" />
        <RouterHead />
        <meta name="Content-Type" content="text/html"></meta>
        <meta name="twitter:card" content="summary"></meta>
        <meta name="og:type" content="website"></meta>
        

      </head>

      {/* DO NOT put signals on body elem , it will cause body to rerender, any dom appended in browser by 3rd party scripts will disappear including livechat dom*/}
      <body lang="en" class={`overflow-x-hidden ${template} `}> 
{/*       
      Test FBQ 
       <button onClick$={()=>{fbq('track', 'PageView'); console.log("push FBQ pageview")}}>Test</button> */}

        <RouterOutlet />
        <ServiceWorkerRegister />
        {/* <script src="./src/kute.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/spicr/dist/js/spicr.min.js"></script> */}
  
    <AlertDialog isShow={alertDialogShow} dialog={alertDialogProps} ></AlertDialog> 

     <ToastList toasts={toasts} dismiss$={dismissToast}></ToastList>
     
      </body>
   
    </QwikCityProvider> 
 
  );
});
