import type {PropFunction } from "@builder.io/qwik";
import {     useOnDocument, $,  type Signal  } from "@builder.io/qwik";

export const useClickOutside = (ref: Signal<HTMLElement | undefined>, onClickOut: PropFunction<() => void>, parentElement?: Signal<HTMLElement | undefined>) => {
  useOnDocument("click", $((event) => {
    // console.log('useClickOutside',event.target, ref.value)
      if (!ref.value) { return }
      const target = event.target as HTMLElement;

      // parentElement (optional)
      if(parentElement && parentElement.value){
        if (!parentElement.value.contains(target)) {
            onClickOut();
        }else{
          return;
        }
      }

  
      if (!ref.value.contains(target)) {
          onClickOut();
      }
}));
};


//USAGE : 
//import { component$,  $, useSignal,  } from "@builder.io/qwik";
// export default component$(() => {
//     const hitBoxRef = useSignal<HTMLElement>();
//     useClickOutside(hitBoxRef, $(() => {
//       alert("you clicked outside of the box!")
//     }))
//     return <div style={"display: grid; place-content: center; width: 100%; height; 100%"}>
//       <div ref={hitBoxRef} style="width: 20rem; height: 20rem; border: 1px dashed white;"></div>
//     </div>
//   })

// const isOpenMenu = useSignal<boolean>(false);
// const menuRef = useSignal<HTMLElement>();

// if (menuRef.value) {
//     useClickOutside(menuRef.value, $(() => {
//         isOpenMenu.value = false;
//     }));
// }

// return (
//     <div class="relative ml-4 flex-shrink-0" ref={menuRef}>
//     ...