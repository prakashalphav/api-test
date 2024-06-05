import type { PropFunction} from '@builder.io/qwik';
import { component$, useStylesScoped$} from '@builder.io/qwik';
import styles from './EventCard1.scss?inline';
import {
    inlineTranslate,   
  } from 'qwik-speak';
import LazyImage from '~/components/image/LazyImage';
import { truncateStringToChars } from '~/utils/common';
  
type Props = {
    id: string;
    class?:string;
    title: string;
    desc: string;
    banner: string;
    category?: string;
    noLimit: boolean;
    startDate: string;
    endDate: string;
    onClickReadMore$? :  PropFunction<(id: string) => void>
};
export default component$(( props : Props) => {
    useStylesScoped$(styles); 

    const t = inlineTranslate();
    return <>
   
        <div class={`${props.class??''}`} data-category={props.category}>
            <div class="rounded-t-md overflow-hidden">
                
                {/* <img src={props.banner} class="object-cover object-center h-[120px] w-full"/> */}

                <LazyImage src={props.banner} class="w-full" ></LazyImage> 
                </div>
               
            <div class="content p-5 rounded-b-md">
                <div class="title text-base">{props.title}</div>
                <div class="italic mt-1 text-xs">
                    {props.noLimit ? t("events.Valid for unlimited time@@Valid for unlimited time") : t("events.valid@@Valid from {{startDate}} till {{endDate}}"  , {startDate: props.startDate , endDate :props.endDate  })}
                   
                </div>
                {/* SL removed this cannot truncate html string else will hv html error */}
                {/* <div class="content text-sm mt-2 break-words" dangerouslySetInnerHTML={ truncateStringToChars( props.desc, 50) }></div> */}
                <div class="items-center grid mt-5">
                    <div class="text-right">
                        <button class="btnSecondary px-3 py-1.5 rounded" 
                           onClick$={async (  )=>{
                            if(props.onClickReadMore$)
                            await props.onClickReadMore$(props.id);
                        }}
                        >Read More
                        </button> 
                        {}
                        </div>
                    {/* <div class="text-right"><button class="register-btn px-4 py-1.5 ">Register</button> </div> */}
                </div>
            </div>
        </div>
    </>;
})

