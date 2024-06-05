import { component$, useStylesScoped$, type PropFunction } from '@builder.io/qwik';
import styles from './ProviderGamesSearchBox.scss?inline';
import {SearchIcon}  from '~/components/icons/Search2';
import { CloseIcon } from '~/components/icons/Close';

type Props = {
    class?: string;
    searchKey: string | null;
    onSearchInputFocus: PropFunction<(ev: Event)=>void>,
    onSearchInputBlur: PropFunction<(ev: Event)=>void>,
    onInput: PropFunction<(ev: Event)=>void>,
    clearSearch: PropFunction<()=>void>,
}

export default component$(( props : Props) => {
    useStylesScoped$(styles);
    
    return <>
         <div class={`boxInputSearch  px-3 py-1.5  md:py-2.5  relative    rounded-md justify-between  ${props.class || ''}`}>
         <div class=" flex items-center shrink-0 ">
          <span class="text-lg mr-2">
            <SearchIcon></SearchIcon>
          </span>
          <input
            placeholder="Discover the games you choose."
            class="inputSearch outline-none border-none flex-auto rounded-sm bg-transparent ease-in-out transition-all "
            value={props.searchKey}
            onFocus$={props.onSearchInputFocus}
            onBlur$={props.onSearchInputBlur}
            onInput$={props.onInput}
          />
          {props.searchKey  && (
            <button type="button" onClick$={props.clearSearch} class=" text-lg">
              <CloseIcon></CloseIcon>
            </button>
          )}
          </div>
        </div>


       
    </>;
})