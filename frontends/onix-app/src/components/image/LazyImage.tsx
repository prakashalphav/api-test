import { component$,    } from '@builder.io/qwik'; 
import {extractImgMetaData} from "../../utils/common"

type Props = { 
    class? : string;
    src: string;
    height?:number; //default
    width?:number;//default
    alt?:string;
    extractMeta?: boolean; // MUST ASSIGN FALSE IF DON"T WANT EXTRACT META ELSE DEFAULT WILL
};


export default component$((props: Props) => {

    let meta = {
        w : props.width,
        h : props.height
    }
    if(props.extractMeta === true || props.extractMeta === undefined){
      // MUST ASSIGN FALSE IF DON"T WANT EXTRACT META ELSE DEFAULT WILL
        meta =  extractImgMetaData(props.src);
    } 
 

   
    return ( 
        <>
          <img alt={props.alt} class={`${props.class?? ''}`} src={props.src} loading="lazy"
                decoding="async" width={meta.w??props.width}
                height={meta.h??props.height}></img>
        </>
        )
});