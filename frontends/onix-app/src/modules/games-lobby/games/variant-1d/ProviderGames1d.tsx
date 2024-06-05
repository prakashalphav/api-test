import { component$,  useStylesScoped$, $ } from '@builder.io/qwik';
import styles from './ProviderGames1d.scss?inline';
import TabsMenu from "~/components/tabs-menu/variant-1c/TabsMenu1c";
 
import {  type ProviderGamesFilters,    useProviderGamesLobby,  } from '~/hooks/business/useGameList';
import { useLocation } from '@builder.io/qwik-city';
import Spinner from '~/components/spinner/variant-1/Spinner1';
 
import { inlineTranslate } from 'qwik-speak';
import type { ProviderGameItem, Provider } from '~/services/types';
// import Slider2 from '~/components/provider-sliders/variant-2/Slider2';
 
import ProviderDropdown from '~/components/provider-dropdown/variant-1/ProviderDropdown';
import ProviderGamesSearchBox from './partials/ProviderGamesSearchBox';
import type { Props as ProviderGameBoxCmpProps} from "~/components/game-box-provider/propsType"; 

type Props = {
    presetGameList?: ProviderGameItem[]; 
    providers: Provider[];  
    class? :string; 
    //Current Preset Filters  of the gameList
    presets : ProviderGamesFilters;
    isSPA? : boolean;  
    providerGameBoxCmp : Component<ProviderGameBoxCmpProps>;
}

export default component$(( props : Props) => {
    useStylesScoped$(styles);
    const t = inlineTranslate();
    const ProviderGameBoxCmp = props.providerGameBoxCmp;  
   const location = useLocation();
   const searchGameKeyword = location.url.searchParams.get("q");
  
  const {
    onSelTypeQRL,
    clearSearch,
    onInput,
    searchKey,
    dataList,
    selTypes,
    onSelProvider ,
    hasMoreGames,
    getProviderGames,
    isWaiting,
    selGameCodes,
    onSearchInputBlur,
    onSearchInputFocus,
    tabMenus,
    clearProvider,
  } = useProviderGamesLobby( true, props.presets, props.presetGameList);
  
    
    return <>
    <div class={`providerGames ${props.class?? ''}`}>
    <TabsMenu menus={tabMenus} selMenus={selTypes.value} onClickMenu$={onSelTypeQRL} class="text-xs sm:text-sm">
        <ProviderGamesSearchBox class="hidden  " searchKey={searchKey.value} onSearchInputFocus={onSearchInputFocus} onSearchInputBlur={onSearchInputBlur} onInput={onInput} clearSearch={clearSearch} />
        <ProviderDropdown providers={props.providers} onSelect={onSelProvider} selGameCodes={selGameCodes} onClear={clearProvider} />
    </TabsMenu>

    {/* <Slider2 class="mt-1" categorySlug={props.presets?.categorySlug} selGameCodes={selGameCodes} providers={props.providers} onSelect={props.isSPA? onSelProvider : undefined} ></Slider2> */}

    {/* Games List */}
    <div class="mt-2.5 sm:mt-5 providerGameList">
          <div class="listTitle flex justify-between items-center mb-2.5 sm:mb-5">
            <div class="flex items-center w-full justify-between text-xs sm:text-sm">
              <div>
                <span class="text-base sm:text-xl font-semibold"> 
                  {`${ selTypes.value[0] ? t(selTypes.value[0]).toUpperCase() : ""} `}&nbsp;
                </span>
                {isWaiting.value? <Spinner></Spinner> : (`(${dataList.value?.length})`) }
              </div>
              <ProviderGamesSearchBox class="sm:hidden" searchKey={searchKey.value} onSearchInputFocus={onSearchInputFocus} onSearchInputBlur={onSearchInputBlur} onInput={onInput} clearSearch={clearSearch} />
            </div>
            {/* <button onClick$={async () => { await onSelTypeQRL('all') }} class="text-sm">{t('app.See All Games@@See All Games')}</button> */}
          </div>
          <div class="grid grid-cols-3 sm:grid-cols-4  md:grid-cols-5  lg:grid-cols-6   xl:grid-cols-7        gap-3 sm:gap-6  ">
            {dataList.value?.length> 0 ? dataList.value.map((item)=>(
                    <>
                           <ProviderGameBoxCmp class="" providerGameItem={item} />
                           
                  
                    </>
                    )
                ) :  <>
                 <p class="col-span-full py-16 font-semibold text-center">{t('app.No records found.@@No records found.')}</p>
                </>}
                </div>  
                <div class="text-center mt-10">

                  {isWaiting.value? <Spinner></Spinner> : (hasMoreGames.value? <button type="button"  onClick$={getProviderGames}> + Load More Games  </button> : <></>) } 
               
                </div>
       </div>
       </div>
    </>;
})