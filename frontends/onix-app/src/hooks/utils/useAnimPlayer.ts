import { $, noSerialize, useStore } from "@builder.io/qwik";
import  * as rive from "@rive-app/canvas";


export const useAnimRive = (canvasId:string)=>{

  const store = useStore({
    anim: noSerialize({} ),
  });

     const createInstance = $((src:string)=>{

      store.anim =  noSerialize(new rive.Rive({
          src: src,
          // Or the path to a public Rive asset
          // src: '/public/example.riv',
          canvas: document.getElementById(canvasId),
          autoplay: true,
         // stateMachines: "bumpy",
          fit: rive.Fit.Cover,
          onLoad: () => {
              store.anim?.resizeDrawingSurfaceToCanvas();
          },
      }));
    });

     const cleanUpInstance = $(()=>{
      store.anim?.cleanup()

     });

     return {createInstance,cleanUpInstance}
}