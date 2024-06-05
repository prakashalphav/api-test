import { component$, useSignal, useTask$ ,  type NoSerialize, $ } from '@builder.io/qwik'; 
  
type Props = {
    class?: string;
    color: string  ;
    height?: number;
};
export const go =  ( percent : Signal<number>, aniTimer :Signal<number>)=> {
  aniTimer.value = setTimeout( $(async () => {
    percent.value += 5;
    if (percent.value < 90) {
       go(percent,aniTimer);
    } else {
      clearTimeout(aniTimer.value);
    }
  }), 50 * (percent.value < 70 ? percent.value / 12 : percent.value / 5));
} ;
export default component$((props: Props) => {
  

    const show = useSignal(true);
    const percent = useSignal(0);

    const aniTimer = useSignal<NoSerialize<Timeout>>();
   
    const start = $(async ()=>{
        percent.value = 0;
        show.value = true; 
         go(percent,aniTimer);
     });
      
      const end = $(()=>{
        percent.value = 100;
        show.value = false;
        clearTimeout( aniTimer.value);
        setTimeout(() => {
          percent.value = 0;
        }, 400);
        setTimeout(() => {
          show.value = true;
        }, 500);
      })


    useTask$(async ({ track }) => {
        track(() => show.value);
      
          if(show.value){
            await start();
          }
          else {
            await end();
          }
      });
    
    

    return <>
    {percent.value}
    {props.color}
         <div
    class={`absolute top-0 left-0 ${props.class}`}
     style={
   `  z-index: 900;
   transition: width 0.2s ease-in-out, opacity 0.4s ease-in-out; width:${percent.value}% ;
   opacity: ${show.value ? 1 : 0};
   background-color: ${props.color};
   height: ${props.height}px;`
    } 
  ></div>
    </>;
})