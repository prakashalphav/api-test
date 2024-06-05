import { component$, useStylesScoped$,useOn , $, useSignal  } from '@builder.io/qwik'; 
import styles from './Jackpot2.scss?inline';

type Props = {
    device?: string;
    progressive_img?: string;
    progressive_img_mobile?: string;
    currencyCode?: string;
    class? : string;
};
export default component$((props: Props) => {

    useStylesScoped$(styles);
   
    const jpstr = useSignal('');
     

    useOn( "qvisible", $(() => {
        console.log("run on qvisible Jackpot2" );
        const video = document.getElementById("jackpot-video")

        const screenWidth = window.innerWidth
        const isMobile = screenWidth<=600

        // Only runs in the client
        let jpAmount = 6904750901;
        let duration = 3000;
        const  timer=   setInterval(() => {
            duration -= 1000;
            const min = Math.ceil(2451);
            const max = Math.floor(3470);
            const randomInt = Math.floor(Math.random() * (max - min + 1)) + min;

            jpAmount+= randomInt;
 
            if(duration <=0 ){
             
                if(!jpstr.value){
                    //if empty means hidden, then show
                    jpstr.value = props.currencyCode + " "+jpAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                    if(isMobile){
                        //show for 10seconds
                        duration = 15000;
                    }
                    else {
                        duration = 9000;
                    }
                   
                }
                else {

                    jpstr.value = "";
                     //hide for 3seconds
                    duration = 3000;
                }
            } 
       
        }, 1000)
        
        return () => { 
            clearInterval(timer);
        };
    }));
 
    return ( 
    <>
        <div class={`relative text-center ${props.class||""}`}>
        {/* <picture>
              <source media="(min-width: 640px)" srcSet="https://files.sitestatic.net/progressive_img/onix_desktop_jackpot-7.gif?v=3"  width="1140" height="128"  /> 
              <img class="w-full max-w-screen-lg mx-auto"  src="https://files.sitestatic.net/progressive_img/onix_jackpot-7.gif?v=2" width="350" height="80"   />
            </picture> */}
            <video autoPlay loop muted playsInline class="hidden md:inline-block  rounded-3xl"> 
        <source src="/images/dummy_images/jackpot/Desktop@1440px_270px.webm" type="video/webm" width="1440px"  height="270px"></source>
        <source src="/images/dummy_images/jackpot/Desktop@1440px_270px.mp4" type="video/mp4" width="1440px"   height="270px"></source>
        <img src="/images/dummy_images/jackpot/Desktop@1440px_270px.gif" width="1440px" height="270px"/>
        </video>

        <video autoPlay loop muted playsInline class="inline-block  md:hidden rounded-3xl"  > 
        <source src="/images/dummy_images/jackpot/Mobile@450px_270px.webm" type="video/webm"  width="270px"  height="270px"></source>
        <source src="/images/dummy_images/jackpot/Mobile@450px_270px.mp4" type="video/mp4" width="270px" height="270px"></source>
        <img src="/images/dummy_images/jackpot/Mobile@450px_270px.gif" height="270px"/>
        </video>
        <div  class="jackpot_amount absolute text-xl sm:text-3xl left-1/2  top-[60%] -translate-x-1/2">  {jpstr.value} </div>
        </div>
    </> 
    );
});