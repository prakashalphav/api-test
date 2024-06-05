import { component$,   useStylesScoped$, $ } from '@builder.io/qwik';
import styles from './ProviderGames1b.scss?inline';
import {SearchIcon}  from '../../../../components/icons/Search';
import TabsMenu from "../../../../components/tabs-menu/variant-1/TabsMenu1";
import Slider1 from "../../../../components/provider-sliders/variant-1/Slider1";
import {     useProviderGamesLobby } from '~/hooks/business/useGameList';
import { useLocation } from '@builder.io/qwik-city';

import { CloseIcon } from '~/components/icons/Close';
 
 
import type { Props as ProviderGameBoxCmpProps} from "~/components/game-box-provider/propsType"; 


import {
    inlineTranslate,  
  } from 'qwik-speak';
   
  import type {
    ProviderGameItem,  Provider
  } from '~/services/types';
   
 
type Props = {
    gameList: ProviderGameItem[];
    providers: Provider[];
    category: string;
    gameCode: string;
    providerGameBoxCmp : Component<ProviderGameBoxCmpProps>;
}

export default component$(( props : Props) => {
    useStylesScoped$(styles);
    const t = inlineTranslate();
    const ProviderGameBoxCmp = props.providerGameBoxCmp;
  
     
    const {onSelTypeQRL,clearSearch,onInput,searchKey,dataList,selTypes, tabMenus} = useProviderGamesLobby( false, {  limit: null } , props.gameList);
    
    return <>
    <div class=" "> 
        <div class="lg:hidden">
        <Slider1 providers={props.providers} category={props.category}></Slider1>
        </div>      
        <div class="grid grid-cols-6  rounded-lg"> 
            <div class="providersWrapper col-span-1 my-2 m-1 rounded-lg hidden lg:block"> 
                <ul class="px-4 py-5">
                {props.providers.map((item: Provider)=>(
                    <li class="mb-6">
                          <a href={"/"+props.category+"/"+item.brand_slug}>
                              <div class="flex providerImgWrapper border-x border-t-2 rounded w-full justify-center">
                                 <img class="h-10 w-auto"    loading="lazy"
                decoding="async" src={`https://files.sitestatic.net/assets/imgs/game_logos/200x60/${item.game_code}${item.provider_gid?.v1?"/" + item.provider_gid?.v1:""}.png`}/>
                            
                              </div>
                          </a>
                      </li>
                    )
                    )} 
                </ul>
            </div>
            <div class="lg:col-span-5 lg:m-2 lg:mt-0 col-span-6">
                <div class="mt-0 lg:mt-3 my-4 relative">
                    <TabsMenu menus={tabMenus} onClickMenu$={onSelTypeQRL} selMenus={selTypes.value} ></TabsMenu>
                    <div class="searchInputWrapper absolute right-1 top-1 hidden lg:inline-block">
                        <span class="search-icon absolute left-auto top-2 right-1 text-lg"><SearchIcon></SearchIcon></span>
                        <input placeholder="Search" class="searchInput indent-2.5 w-[220px] h-8 rounded-sm" onInput$={onInput}/>
                    </div>
                    {searchKey.value && (<>
                    <button onClick$={clearSearch} class="lg:flex hidden absolute right-0 p-1 text-[var(--text-color)]" type="button"> {t('app.Clear Search@@Clear Search')}<CloseIcon></CloseIcon></button>
                    </>
                    )}
                </div>

                {/* for mobile search */}
                <div class="border rounded-sm lg:hidden block mb-6">
                     <div class="search relative">
                        <span class="search-icon absolute left-auto top-2 right-1 text-lg"><SearchIcon></SearchIcon></span>
                        <input placeholder="Search" class="indent-2.5 w-full h-8 rounded-sm" onInput$={onInput}/>
                    </div>
                    {searchKey.value && (<>
                        <button onClick$={clearSearch} class="absolute right-0 p-1 flex text-[var(--text-color)]" type="button"> {t('app.Clear Search@@Clear Search')}<CloseIcon></CloseIcon></button>
                    </>
                    )}        
                </div>
                {/* end of for mobile search */}

                <div class="grid grid-cols-3  xl:grid-cols-6 lg:grid-cols-5 sm:grid-cols-4 gap-2  ">
                {dataList.value.map((item)=>(
                    <>
              
              <ProviderGameBoxCmp class="" providerGameItem={item} />
                    </>
                    )
                )}
                </div> 
            </div>
        </div>

    </div>
    </>;
})