// THIS IS VERY SIMILAR TO variant-2/TabsMenu1 (Promotions)
import { component$, useStylesScoped$, type PropFunction  } from '@builder.io/qwik';
import styles from './TabsMenu1.scss?inline';
import { isMenuSelected } from '~/utils/common';
 
type Props = {
    menus: Menu[];
    selMenus : string[];
    inboxCount?: number;
    onClickMenu$? :  PropFunction<( menu : string) => void>
    uppercase?: boolean,
};

interface Menu {
    title?: string,
    value?: string,
    url?: string,
}

export default component$(( props : Props) => {
    useStylesScoped$(styles);
 
    return <>
       
        <ul id="nav-tab" class="tabs-nav overflow-x-auto p-1 lg:rounded flex flex-row">
            {props.menus.map((item) => (  <li class="rounded ml-2 flex">
            {item.url ? (
         <a 
         href={item.url}
             class={`flex rounded ` + (isMenuSelected( item.value , props.selMenus)  ? ` menu-active font-bold`:``)}>
           <span class="whitespace-nowrap rounded py-2 px-5">{props.uppercase ? item.title?.toUpperCase() : item.title}</span>  
         </a>
      ) : (
         <button 
            onClick$={async (  )=>{
                if(props.onClickMenu$)
                await props.onClickMenu$(item.value||"" );
            }}
            class={`flex rounded` + (isMenuSelected( item.value , props.selMenus)  ? ` menu-active font-bold`:``)}>
               <span class="whitespace-nowrap rounded py-2 px-5">
               	{(props.uppercase ? item.title?.toUpperCase() : item.title) + ( props.inboxCount ? ' (' + props.inboxCount +')' : '' )}
               </span> 
            </button>
            )}
      </li> ))}
        </ul>
    </>;
})