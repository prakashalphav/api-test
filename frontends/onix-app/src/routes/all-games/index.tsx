import { component$ ,useStylesScoped$, Resource,    } from '@builder.io/qwik';
import { routeLoader$,    } from '@builder.io/qwik-city';

import styles from './sub-lobby.scss?inline';
// import Game1 from '../../../../../modules/games-lobby/games/variant-1/ProviderGames1';
import ProviderGames1b from '~/modules/games-lobby/games/variant-1b/ProviderGames1b';
import ProviderGames1c from '~/modules/games-lobby/games/variant-1c/ProviderGames1c';
import ProviderGames1d from '~/modules/games-lobby/games/variant-1d/ProviderGames1d';
import ProviderGames1e from '~/modules/games-lobby/games/variant-1e/ProviderGames1e';
import ProviderGameItem4 from "~/components/game-box-provider/variant-4/GameBoxProvider4";
// import ProviderGameItem3 from "~/components/game-box-provider/variant-3/GameBoxProvider3";
import ProviderGameItem2 from "~/components/game-box-provider/variant-2/GameBoxProvider2";
import ProviderGameItem1 from "~/components/game-box-provider/variant-1/GameBoxProvider1";
import ProviderGameItem5 from "~/components/game-box-provider/variant-5/GameBoxProvider5";
import ProviderGameItem6 from "~/components/game-box-provider/variant-6/GameBoxProvider6";
import Title from '~/components/titles/variant-1/Title1';
import {
    inlineTranslate,  
  } from 'qwik-speak'; 

  import { getProviderGames } from '~/services/memberDB';
import { GameTypeAll, type ProviderGamesFilters } from '~/hooks/business/useGameList';
import { useCommonViewData } from '~/hooks/app/useCommonViewData';
import { capitalize, flattenObjToArr } from '~/utils/common';
import type { Provider, ProviderGameItem } from '~/services/types';

export const useGetProviderGames = routeLoader$( async( ev) => { 
  const searchGameKeyword =  ev.url.searchParams.get("keyword");
  const gameType = ev.url.searchParams.get("type");
  const gameBrand = ev.url.searchParams.get("brand");
  const gameCategory = ev.url.searchParams.get("category");

 const providerGamesPresetFilters =  {category : gameCategory, brands : gameBrand? [gameBrand] : [], game_types :gameType? [gameType]: [], search_key : searchGameKeyword , limit: 240} as ProviderGamesFilters;
  const providerGames = getProviderGames(ev,providerGamesPresetFilters); 

  return  {providerGames , providerGamesPresetFilters};  
}); 


type ProviderGamesContentProps = {
  presetGameList?: ProviderGameItem[];
  providers: Provider[];
  class?: string;
  //Current Preset Filters  of the gameList
  providerGamesPresetFilters: ProviderGamesFilters; 
};
export  const ProviderGamesContent =  component$( (props : ProviderGamesContentProps) => {
  useStylesScoped$(styles);
  const {commonData : cd } = useCommonViewData(); 
  const t = inlineTranslate();

  
  return   ( <>


         { cd.app_sub_skin ==="onixgaming"
           && (
             <ProviderGames1b  gameList={props.presetGameList} category={props.providerGamesPresetFilters.category} gameCode ={props.providerGamesPresetFilters.game_codes[0]} providers={props.providers} providerGameBoxCmp={ProviderGameItem4} ></ProviderGames1b>
           )
           
           }

     { (  cd.app_sub_skin ==="wingaming"  )   
           && (
             <ProviderGames1c providerGameBoxCmp={ProviderGameItem5}   presetGameList={props.presetGameList} providers={props.providers}  presets={props.providerGamesPresetFilters} ></ProviderGames1c>
           )
           
} 
   { (  cd.app_sub_skin ==="vega"  )
           && (
             <ProviderGames1c providerGameBoxCmp={ProviderGameItem2}   presetGameList={props.presetGameList} providers={props.providers}  presets={props.providerGamesPresetFilters} ></ProviderGames1c>
           )
           
} 
     {(  cd.app_sub_skin ==="firegaming"  ) && (
             <ProviderGames1c providerGameBoxCmp={ProviderGameItem1}   presetGameList={props.presetGameList} providers={props.providers}  presets={props.providerGamesPresetFilters} ></ProviderGames1c>
           )
           
} 

     {  cd.app_sub_skin ==="zplay"
       && (
         <ProviderGames1d providerGameBoxCmp={ProviderGameItem6}     presetGameList={props.presetGameList} providers={props.providers}  presets={props.providerGamesPresetFilters} ></ProviderGames1d>
       )
     } 
     { cd.app_sub_skin ==="idrgaming"
       && (
         <ProviderGames1e  presetGameList={props.presetGameList} providers={props.providers}  presets={props.providerGamesPresetFilters}   providerGameBoxCmp={ProviderGameItem4} ></ProviderGames1e>
         
       )
     } 
        {cd.app_sub_skin === "gamingonnet" && (
          <ProviderGames1e
            presetGameList={props.presetGameList}
            providers={props.providers}
            presets={props.providerGamesPresetFilters}
            providerGameBoxCmp={ProviderGameItem4}
          ></ProviderGames1e>
        )}
 
 </>);
});

export default component$(() => {
  useStylesScoped$(styles);
  const {commonData : cd } = useCommonViewData();
  const providerGamesRes = useGetProviderGames();
  const { providerGames , providerGamesPresetFilters} = providerGamesRes.value; 
  const t = inlineTranslate();

    return (<> 
         <div class="max-w-screen mb-16" >
        <Title>{ (providerGamesPresetFilters.category ? t(`app.${capitalize(providerGamesPresetFilters.category)}`) : "" )+ " " + t('app.Games@@Games')}</Title> 
        
        <Resource value={providerGames} 
              onPending={() => <div>Loading...</div>}
              onRejected={(e) => <div>Error : {
                 JSON.stringify(e.message)
                }</div>}
              onResolved={(d) =>   {  
                if(d.d?.this_game_code){
                  providerGamesPresetFilters.game_codes = [d.d?.this_game_code];
                }
                if(d.d?.this_category){
                  providerGamesPresetFilters.category = d.d?.this_category;
                }

                return (
                <ProviderGamesContent    presetGameList={d.d?.games||[]} providers={Object.values((providerGamesPresetFilters.category? cd.games_data[providerGamesPresetFilters.category] : flattenObjToArr<Provider>(cd.games_data || {}))  )}  providerGamesPresetFilters={ providerGamesPresetFilters} ></ProviderGamesContent>

                )
                
              }
            }/>
        </div>
    </> )
})
