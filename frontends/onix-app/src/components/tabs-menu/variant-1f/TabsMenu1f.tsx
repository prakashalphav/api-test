import {
    component$,
    useStylesScoped$,
    type PropFunction,
  Slot,
  } from "@builder.io/qwik";
  import styles from "./TabsMenu1f.scss?inline";
  import { isMenuSelected } from '~/utils/common';
  type Props = {
      class?:string;
    menus: Menu[];
    selMenus : string[];
    inboxCount?: number;
    onClickMenu$?: PropFunction<(menu: string) => void>;
    uppercase?: boolean;
  };
  
  interface Menu {
    title?: string;
    value?: string;
    url?: string;
  }
  
  export default component$((props: Props) => {
    useStylesScoped$(styles);
  
    return (
      <>
        <div class={`tabsMenu p-1 sm:p-4 rounded-lg flex items-center justify-between  ${props.class??''}`}>
          <ul class=" gap-2 flex flex-row flex-auto scroller overflow-x-auto">
            {props.menus.map((item) => (
              <li key={item.value} class="flex">
                {item.url ? (
                  <a href={item.url} class={
                    `tabItem whitespace-nowrap rounded-md py-2.5  md:py-4 px-3 md:px-3.5 ` +
                    ( isMenuSelected( item.value , props.selMenus) ? ` active font-bold` : ``)
                  }
                > 
                    {props.uppercase ? item.title?.toUpperCase() : item.title}
               
                </a>
              ) : (
                <button
                onClick$={async () => {
                  if (props.onClickMenu$ )
                    await props.onClickMenu$(item.value || "");
                }}
                class={
                  `tabItem whitespace-nowrap py-2.5  md:py-4 px-2.5 md:px-3.5 ` +
                  ( isMenuSelected( item.value , props.selMenus) ? `active` : ``)
                }
              >
                  {(props.uppercase ? item.title?.toUpperCase() : item.title) +
                    (props.inboxCount ? " (" + props.inboxCount + ")" : "")}
              </button>
              )}
            </li>
          ))}
        </ul>
     
     <Slot></Slot>
     </div>
     
      </>
    );
  });
  