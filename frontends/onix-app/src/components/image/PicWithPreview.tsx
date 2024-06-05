import { $, type QwikVisibleEvent, component$, useOn, useSignal, useStylesScoped$,    } from "@builder.io/qwik";

import styles from "./PicWithPreview.scss?inline";
import { isServer } from "@builder.io/qwik/build";

type Props = {
  class?: string;
  style?: string;
  srcBlur?: string;
  srcsetJpg?: string;
  srcsetWebp?: string;
  srcsetAvif?: string;
  height: number; //default
  width: number; //default
  alt?: string;
  imgClass?: string;
  imgStyle?: string;
};

export default component$((props: Props) => {
  useStylesScoped$(styles);
 const isBlurLoaded = useSignal<boolean>(false);
  const pic = useSignal<HTMLElement>();
  // const img = useSignal<HTMLImageElement>();
  // const imgReal = useSignal<HTMLImageElement>();
  const onBlurLoaded = $(() => {
    if(!isBlurLoaded.value)
      isBlurLoaded.value = true;
    // console.log("isBlurLoaded.value ", props.srcsetJpg , isBlurLoaded.value )
  });
  const onRealLoaded = $(() => {
    pic.value?.classList.remove("show-preview");
  });
 
  
  useOn( "qvisible", $(async (event : QwikVisibleEvent)=>{  
  const ele=  event.detail.target.children[0] as HTMLImageElement
  console.log("run on qvisible picwithpreview" );
  if(ele.complete){ 
    await onBlurLoaded();
  }
 
  })) 
  return (
    <>
      <div ref={pic} class={` relative   show-preview ${props.class}`} style={props.style}>
        <img   
          //  ref={img}
          onLoad$={onBlurLoaded}
          loading="lazy"
          decoding="async"
          src={props.srcBlur}
          height={props.height}
          width={props.width} 
          class={`preview  w-full ${props.imgClass}`}
          alt={props.alt}
          style={props.imgStyle}
        />
        {isBlurLoaded.value  && (
          <figure class="real absolute inset-0">
            <picture>
              <source srcset={props.srcsetAvif} type="image/avif" />
              <source srcset={props.srcsetWebp} type="image/webp" />

              <img
                //  ref={imgReal}
                onLoad$={onRealLoaded}
                alt={props.alt}
                src={props.srcsetJpg}
                loading="lazy"
                decoding="async"
                height={props.height}
                width={props.width}
                class={ `w-full ${props.imgClass}`}
                style={props.imgStyle}
              />
            </picture>
          </figure>
        )}
      </div>
    </>
  );
});
