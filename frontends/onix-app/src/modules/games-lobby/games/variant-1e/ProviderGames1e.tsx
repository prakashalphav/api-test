import { component$, useStylesScoped$, $, type Component } from "@builder.io/qwik";
import styles from "./ProviderGames1e.scss?inline";
import { SearchIcon } from "../../../../components/icons/Search";
import TabsMenu from "../../../../components/tabs-menu/variant-2b/TabsMenu2b";

import {
  type ProviderGamesFilters, 
  useProviderGamesLobby, 
} from "~/hooks/business/useGameList";
import { useLocation } from "@builder.io/qwik-city";
import Spinner from "~/components/spinner/variant-1/Spinner1";

import { CloseIcon } from "~/components/icons/Close"; 
import { inlineTranslate } from "qwik-speak";

import ProviderDropdown from '~/components/provider-dropdown/variant-1/ProviderDropdown';
import type { ProviderGameItem, Provider } from "~/services/types";
// import ProvidersSlider from "../../../../components/provider-sliders/variant-3/Slider3";
import type { Props as ProviderGameBoxCmpProps} from "~/components/game-box-provider/propsType"; 
import ProviderGamesSearchBox from './partials/ProviderGamesSearchBox';
type Props = {
  presetGameList?: ProviderGameItem[];
  providers: Provider[];
  class?: string;
  //Current Preset Filters  of the gameList
  presets: ProviderGamesFilters;
  isSPA?: boolean; 
  providerGameBoxCmp : Component<ProviderGameBoxCmpProps>;
};

export default component$((props: Props) => {
  useStylesScoped$(styles);
  const t = inlineTranslate();
  const ProviderGameBoxCmp = props.providerGameBoxCmp;
 
  const {
    onSelTypeQRL,
    clearSearch,
    onInput,
    searchKey,
    dataList,
    selTypes,
    onSelProvider,
    hasMoreGames,
    getProviderGames,
    isWaiting,
    selGameCodes,
    onSearchInputBlur,
    onSearchInputFocus,
    tabMenus, 
    clearProvider,
  } = useProviderGamesLobby( 
    true,
    props.presets,
    props.presetGameList
  );
 
  return (
    <>
      <div class={`providerGames ${props.class ?? ""}`}>
      <ProviderGamesSearchBox class="block sm:hidden  mb-2 w-full" searchKey={searchKey.value} onSearchInputFocus={onSearchInputFocus} onSearchInputBlur={onSearchInputBlur} onInput={onInput} clearSearch={selTypes.valuelearSearch} /> 
        <TabsMenu
          menus={tabMenus}
          
          selMenus={selTypes.value}
          onClickMenu$={onSelTypeQRL}
          class="flex items-end border-b-2 mb-2.5 lg:mb-5 justify-between"
        >
           <ProviderGamesSearchBox class="hidden sm:block  " searchKey={searchKey.value} onSearchInputFocus={onSearchInputFocus} onSearchInputBlur={onSearchInputBlur} onInput={onInput} clearSearch={clearSearch} /> 
           <ProviderDropdown providers={props.providers} onSelect={onSelProvider} selGameCodes={selGameCodes} onClear={clearProvider} />
        </TabsMenu>

        {/* <ProvidersSlider
          class="mt-1"
          categorySlug={props.presets?.categorySlug}
          selGameCodes={selGameCodes}
          providers={props.providers}
          onSelect={props.isSPA ? onSelProvider : undefined}
        ></ProvidersSlider> */}

        {/* Games List */}
        <div class="mt-3">
          <div class="flex items-center">
            <p class="md:text-xl font-semibold">
              {`${selTypes.value[0] ? t(selTypes.value[0]).toUpperCase() : ""} `}{" "}
            </p>
            <div>
              {isWaiting.value ? (
                <Spinner></Spinner>
              ) : (
                `(${dataList.value?.length})`
              )}
            </div>
          </div>
          <div class="mt-6 md:mt-8  grid grid-cols-3 sm:grid-cols-4  md:grid-cols-5  lg:grid-cols-6   xl:grid-cols-7        gap-3 sm:gap-6 ">
            {dataList.value?.length > 0 ? (
              dataList.value.map((item) => (
                <>
                 <ProviderGameBoxCmp class="" providerGameItem={item} />
                </>
              ))
            ) : (
              <>
                <p class="col-span-full py-16 font-semibold text-center">
                  {t("app.No records found.@@No records found.")}
                </p>
              </>
            )}
          </div>
          <div class="text-center mt-10">
            {isWaiting.value ? (
              <Spinner></Spinner>
            ) : hasMoreGames.value ? (
              <button type="button" onClick$={getProviderGames}>
                {" "}
                + Load More Games{" "}
              </button>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
});
