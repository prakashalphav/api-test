import { component$, type PropFunction, useStyles$ } from '@builder.io/qwik';
import styles from './TabsMenu4.scss?inline'; 
import { isMenuSelected } from '~/utils/common';
type Props = {
    menus: Menu[],
    selMenus : string[],
    onClickMenu$? :  PropFunction<( menu : string) => void>,

};

interface Menu {
    title: string,
    value: string,
    url?: string,
}

export default component$(( props : Props) => {
    useStyles$(styles);  
          
    return <>
    <div class="tab-menu flex-center">
      <div class="box-wrap  rounded-3xl w-fit">
          <ul class="box relative text-center  flex-center  rounded-3xl w-fit">
          {props.menus.map((item: Menu) => ( <>
            <li class={`rounded-3xl m-1` + ( isMenuSelected( item.value , props.selMenus) ? ` active-tab` : ``)}>
                <button type='button' class="p-3 px-8"    
                onClick$={async (  )=>{
                    if(props.onClickMenu$)
                    await props.onClickMenu$(item.value||"" );
                }}>
                    {item.title}
                </button>
            </li>
          </>))}
          </ul>
       </div>
    </div> 
     </>;
})