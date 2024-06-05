import type {PropFunction } from "@builder.io/qwik";
import {     useOnDocument, $,  type Signal, useOn  } from "@builder.io/qwik";

export const useScrollTop = (ref: Signal<HTMLElement | undefined>, isMobile: boolean) => {
  useOn( "qvisible", $(() => {
    if (!ref.value) { return }
    if(isMobile){
      if(document.documentElement.scrollTop > 0){
        ref.value.classList.add('top-0');
      }else{
        ref.value.classList.remove('top-0');
      }
    }
  }));

  useOnDocument( "scroll", $(async () => {
    if (!ref.value) { return }

    if(isMobile){
      if(document.documentElement.scrollTop > 0){
        ref.value.classList.add('top-0');
      }else{
        ref.value.classList.remove('top-0');
      }
    }
  }));
};
