/*
Readme : 

1. The number of games banners  must not be less than 7
*/

import { component$, useStyles$ , useOn,$ } from '@builder.io/qwik';
import Splide from '@splidejs/splide';
import styles from './TrxListSlider1.scss?inline'; 
import  '@splidejs/splide/css/core'; 
type Props = {
    parentId: string; // '#parent'
};
export default component$(( props : Props) => {
    useStyles$(styles);  
    const avatars = [
       "/images/avatars/Guy1",
       "/images/avatars/Girl1",
       "/images/avatars/Girl2",
       "/images/avatars/Girl3",
       "/images/avatars/Guy2",  
    ];

    let avatarInd= 0;
    const list = [
        {
            name : "Bagus Shihab",
            amt : 89720,
            datetime : "04-13 08:30pm"
        },
        {
            name : "Rahma Kusuma",
            amt : 89720,
            datetime : "04-13 08:30pm"
        },
        {
            name : "Gladys Zakaria",
            amt : 89720,
            datetime : "04-13 08:30pm"
        },
        {
            name : "Kiki Falihi",
            amt : 89720,
            datetime : "04-13 08:30pm"
        },
        {
            name : "Dwi Lestari",
            amt : 89720,
            datetime : "04-13 08:30pm"
        },
        {
            name : "Bagus Shihab",
            amt : 89720,
            datetime : "04-13 08:30pm"
        },
        {
            name : "Rahma Kusuma",
            amt : 89720,
            datetime : "04-13 08:30pm"
        },
        {
            name : "Gladys Zakaria",
            amt : 89720,
            datetime : "04-13 08:30pm"
        },
        {
            name : "Kiki Falihi",
            amt : 89720,
            datetime : "04-13 08:30pm"
        },
        {
            name : "Dwi Lestari",
            amt : 89720,
            datetime : "04-13 08:30pm"
        },
    ];
    useOn( "qvisible", $(( ) => { 
        console.log("run on qvisible TrxListSlider1" );
        // will run when the component becomes visible  
        new Splide( props.parentId + ' .trx-slider' ,{
            type   : 'loop', 
            perPage: 5,
            autoplay : true,
            focus: 'center',
            lazyLoad : "nearby", 
            interval: 8000, 
            flickMaxPages: 1,
            updateOnMove: true,
            throttle: 300,
              arrows : false, 
              gap: "1em",
              pagination:false,
              breakpoints: {
                420: { //max-width
                    perPage: 2, 
                    flickMaxPages: 1,
                    arrows : false,
                  },
                640: { //max-width
                  perPage: 3, 
                  flickMaxPages: 1,
                  arrows : false,
                },
                1280: {  //max-width
                    perPage: 5, 
                    flickMaxPages: 1,
                }, 
              } 
          }).mount();
   }));
          
    return <>
    <div class="trx-slider splide  backdrop:" aria-label="SLIDER">
    
  <div class="splide__track">
		<ul class="splide__list">
            {list.map((item)=>{

                if(avatarInd> avatars.length){
                    avatarInd = 0;
                }
                avatarInd++;
                return <><li class="splide__slide">
            <div class="splide__slide__container">
    <div class="slide__content">  
       <div class="box-wrap  rounded-xl">
          <div class="box relative leading-5 text-center lg:text-left flex-center flex-col lg:flex-row  rounded-xl p-3">
            <div class="absolute top-0 -translate-y-[70%] lg:relative lg:translate-y-0 lg:pr-2">
            <picture>
  <source
    type="image/avif"
    media="(-webkit-min-device-pixel-ratio: 1.5)"
    srcSet={avatars[avatarInd] + '@2x-100.avif'}
    sizes="50px"
  />
  <source
    type="image/webp"
    media="(-webkit-min-device-pixel-ratio: 1.5)"
    srcSet={avatars[avatarInd] + '@2x-100.webp'}
    sizes="50px" 
  />
 
  <source type="image/avif" srcSet={avatars[avatarInd] + '@1x-50.avif'} />
  <source type="image/webp" srcSet={avatars[avatarInd] + '@1x-50.webp'} />
  <img src={avatars[avatarInd] + '@1x-50.png'} width="50" height="50" alt="Avatar"     loading="lazy" decoding="async" />
</picture>
                {/* <img src={avatars[avatarInd]} /> */}
                </div>
            <div class="flex-auto min-w-0">
                 <p class="trx-name font-bold leading-6">{item.name?.toUpperCase() }</p>
                 <p>{item.amt }</p>
                 <p>Deposit, {item.datetime }</p>
            </div>
          </div>
       </div>
    </div>
</div>  </li> </>;
            })}
		
        
		</ul>
  </div>
 
</div> 
     </>;
})