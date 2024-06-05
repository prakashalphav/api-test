import { component$ } from "@builder.io/qwik";
import { extractImgMetaData } from "../../utils/common";

type Props = {
  id?:string;
  class?: string;
  imgClass?: string;
  imgStyle? :string;
  srcPC?: string; //src for PC
  src?: string; // src for default (default is mobile)
  heightPC?: number; //default
  widthPC?: number; //default
  height?: number; //default
  width?: number; //default
  alt?: string;
  extractMeta?: boolean; // MUST ASSIGN FALSE IF DON"T WANT EXTRACT META ELSE DEFAULT WILL
  breakpointPC? : number;
  isNotLazy?: boolean;
};


export default component$((props: Props) => {
  let meta = {
    w: props.width,
    h: props.height,
  };
  if (
    props.src &&
    (props.extractMeta === true || props.extractMeta === undefined)
  ) {
    // MUST ASSIGN FALSE IF DON"T WANT EXTRACT META ELSE DEFAULT WILL
    meta = extractImgMetaData(props.src || "");
  }
  let metaPC = {
    w: props.widthPC,
    h: props.heightPC,
  };
  if (
    props.srcPC &&
    (props.extractMeta === true || props.extractMeta === undefined)
  ) {
    // MUST ASSIGN FALSE IF DON"T WANT EXTRACT META ELSE DEFAULT WILL
    metaPC = extractImgMetaData(props.srcPC);
  }
  return (
    <>
      <picture id={props.id} class={`${props.class ?? ""}`}>
        <source 
          media={`(min-width:${ props.breakpointPC ??640 }px)`}
          srcset={props.srcPC}
          width={metaPC.w ?? props.widthPC}
          height={metaPC.h ?? props.heightPC}
        />
        <img
          style={props.imgStyle}
          class={props.imgClass}
          srcset={props.src}
          width={meta.w ?? props.width}
          height={meta.h ?? props.height}
          loading={props.isNotLazy? "eager" : "lazy"}
          decoding="async"
          alt={props.alt}
        />
      </picture>
    </>
  );
});
