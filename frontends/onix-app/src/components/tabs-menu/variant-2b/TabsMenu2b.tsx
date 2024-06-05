import { component$, useStylesScoped$, type PropFunction,Slot  } from '@builder.io/qwik';
import styles from './TabsMenu2b.scss?inline';
import { isMenuSelected } from '~/utils/common';
 
type Props = {
    class?:string;
    menus: Menu[];
    selMenus : string[];
    onClickMenu$? :  PropFunction<( menu : string) => void>
    lowercase?: boolean,
};

interface Menu {
    title?: string,
    value?: string,
    url?: string,
}

export default component$(( props : Props) => {
    useStylesScoped$(styles);
 
    return <>

      
        <div class={`tabsWrapper flex items-center justify-between gap-3  ${props.class||""}`}>
        <ul  class="overflow-x-auto scroller box-border tabsContent  flex-auto  flex items-center   gap-4 lg:gap-12">
            {props.menus.map((item) => (  <li key={item.value} class="">
                {item.url ?
                    (<a class={"tabItem px-3 py-1 whitespace-nowrap  text-sm lg:text-base " + ( isMenuSelected( item.value , props.selMenus) ? "font-semibold active text-base " : "  ")} href={item.url}>{item.title}</a>)
                    : ( 
                        <button 
                        onClick$={async (  )=>{

                            if(props.onClickMenu$)
                            await props.onClickMenu$(item.value||"" );
                        }}
                        class={"tabItem px-3 py-1  whitespace-nowrap  text-sm lg:text-base  " + ( isMenuSelected( item.value , props.selMenus) ? " font-semibold active text-base ":"  ")}>
                            {props.lowercase ? item.title : item.title?.toUpperCase() }
                        </button>
                    )}
        </li> ))}
        </ul>
        <Slot></Slot>
        </div> 
    </>;
})