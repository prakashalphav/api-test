import {
  component$,
  useStylesScoped$,
  $,
  type Component,
} from "@builder.io/qwik";
import styles from "./ProviderGames1f.scss?inline";
import { SearchIcon } from "../../../../components/icons/SearchIconButton";
import TabsMenu from "../../../../components/tabs-menu/variant-1f/TabsMenu1f";

import {
  type ProviderGamesFilters,
  useProviderGamesLobby,
} from "~/hooks/business/useGameList";
import Spinner from "~/components/spinner/variant-1/Spinner1";
import { GameControllerIcon } from "~/components/icons/GameController";
import { inlineTranslate } from "qwik-speak";

import type { ProviderGameItem, Provider } from "~/services/types";

import type { Props as ProviderGameBoxCmpProps } from "~/components/game-box-provider/propsType";

type Props = {
  presetGameList?: ProviderGameItem[];
  providers: Provider[];
  class?: string;
  //Current Preset Filters  of the gameList
  presets: ProviderGamesFilters;
  isSPA?: boolean;
  providerGameBoxCmp: Component<ProviderGameBoxCmpProps>;
};

export default component$((props: Props) => {
  useStylesScoped$(styles);
  const t = inlineTranslate();
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
  } = useProviderGamesLobby(true, props.presets, props.presetGameList);
  const ProviderGameBoxCmp = props.providerGameBoxCmp;

  return (
    <>
      <div class={`providerGames ${props.class ?? ""}`}>
        <div class="">
          <TabsMenu
            menus={tabMenus}
            selMenus={selTypes.value}
            onClickMenu$={onSelTypeQRL}
          >
            <div class="boxInputSearch relative flex items-center rounded-md justify-between px-3">
              <input
                placeholder=""
                class="inputSearch outline-none border-none flex-auto rounded-sm bg-transparent ease-in-out transition-all "
                value={searchKey.value}
                onFocus$={onSearchInputFocus}
                onBlur$={onSearchInputBlur}
                onInput$={onInput}
              />
              <button
                onClick$={$((ev: Event) => {
                  const inputSearch = document.querySelector(".inputSearch");
                  if (inputSearch) {
                    if (inputSearch.classList.contains("inputSearch--expand")) {
                      inputSearch.classList.remove("inputSearch--expand");
                    } else {
                      inputSearch.classList.add("inputSearch--expand");
                    }
                  }
                })}
                type="button"
                class="absolute btnSearch"
              >
                <SearchIcon></SearchIcon>
              </button>
            </div>
          </TabsMenu>

          {/* Games List */}
          <div class="">
            <div class="flex items-center selectedMenuTitle">
              <p class="md:text-xl font-semibold">
                <GameControllerIcon class="inline-block mr-2"></GameControllerIcon>
                {`${t(
                  selTypes.value[0] ? selTypes.value[0] : ""
                ).toUpperCase()} `.replace("TOP", "HOT")}{" "}
                GAME{" "}
              </p>
              {/* <div>  
                  {isWaiting.value? <Spinner></Spinner> : (`(${dataList.value?.length})`) }
                </div> */}
            </div>
            <div class="mt-6 md:mt-8  grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7   gap-2 lg:gap-4   ">
              {dataList.value?.length > 0 ? (
                dataList.value.map((item) => (
                  <>
                    <ProviderGameBoxCmp
                      key={item.id}
                      class=""
                      providerGameItem={item}
                    />
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
      </div>
    </>
  );
});
