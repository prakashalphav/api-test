// faq tabs 
import { component$, useStylesScoped$, type PropFunction  } from '@builder.io/qwik';
import styles from './TabsMenu1.scss?inline';
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

      
        <div class={`tabwraper  sm:mb-2 sm:px-5 ${props.class||""}`}>
        <ul id="nav-tab" class="overflow-x-auto box-border tabwraper__menu py-2 max-sm:my-2 pr-2 lg:py-1 flex md:justify-center lg:rounded">
            {props.menus.map((item) => (  <li class="mx-5">
                {item.url ?
                    (<a class={" inline-block p-1 pt-0 font-semibold whitespace-nowrap  text-base " + ( isMenuSelected( item.value , props.selMenus) ? " menu-active-text-color border-b-[3px] menu-active-bd-color" : " menu-text-color")} href={item.url}>{item.title}</a>)
                    : ( 
                        <button 
                        onClick$={async (  )=>{

                            if(props.onClickMenu$)
                            await props.onClickMenu$(item.value||"" );
                        }}
                        class={" p-1 font-[600] whitespace-nowrap  text-base " + ( isMenuSelected( item.value , props.selMenus)? " menu-active-text-color border-b-[3px] menu-active-bd-color":" menu-text-color")}>
                            {props.lowercase ? item.title : item.title?.toUpperCase() }
                        </button>
                    )}
        </li> ))}
        </ul>
        </div> 
    </>;
})