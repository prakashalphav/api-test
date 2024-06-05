import { component$, useStylesScoped$, type PropFunction  } from '@builder.io/qwik';
import styles from './TabsMenu1.scss?inline';
import { isMenuSelected } from '~/utils/common';
 
type Props = {
    class?:string;
    menus: Menu[];
    selMenus : string[];
    onClickMenu$? :  PropFunction<( menu : string) => void>
};

interface Menu {
    title?: string,
    value?: string,
    url?: string,
    class?: string,
}

export default component$(( props : Props) => {
    useStylesScoped$(styles);
 
    return <>

        <div class={`tabs ${props.class??''} rounded-lg w-[180px]  py-4 px-3 text-base h-full ${props.class||""}`}>
            {props.menus.map((item) => (<div class="mb-[20px]">
                {item.url ? (
                    <a 
                        href={item.url}
                        class={`` + (  isMenuSelected( item.value , props.selMenus) ? "  tab--selected":"tab  ")}>
                        {item.title}
                    </a>
                ): (
                    <button 
                        onClick$={async (  )=>{
                            if(props.onClickMenu$)
                            await props.onClickMenu$(item.value||"" );
                        }}
                        class={"" + ( isMenuSelected( item.value , props.selMenus)? " text-[var(--menu-active-text-color)] border-[var(--menu-active-bd-color)]":" text-[var(--menu-text-color)]")}>
                            {item.title}
                    </button>
                )}
            </div> ))}
        </div>
    </>;
})