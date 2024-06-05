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
        <div class={`boxInputSearch relative rounded-md pl-3 pr-4 md:py-2.5 py-2 ${props.class || ''}`}>
          <div class=" flex items-center shrink-0 ">
          <span class="text-base sm:text-lg mr-1.5 sm:mr-2.5"><SearchIcon></SearchIcon></span>
          <input
            placeholder="Search"
            class="inputSearch outline-none border-none flex-auto rounded-sm bg-transparent ease-in-out transition-all "
            value={props.searchKey}
            onFocus$={props.onSearchInputFocus}
            onBlur$={props.onSearchInputBlur}
            onInput$={props.onInput}
            style="max-width:82%;"
          />
          {props.searchKey && <button type="button" onClick$={props.clearSearch} class=" text-lg"><CloseIcon></CloseIcon></button> }
          </div>
        </div>  
    </>;
})