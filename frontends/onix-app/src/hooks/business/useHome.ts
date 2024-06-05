 
import type {CommonViewData ,ApiData, HomeData} from '~/services/types';
import { useNavTab } from '~/hooks/business/useNavTab';
import { useSignal } from '@builder.io/qwik';
import { type GameItem } from './useGameList';
import { flattenObjToArr } from "~/utils/common";
import type { Provider } from "~/services/types";
 

export type Props = { cd : ApiData<CommonViewData>, homeData : ApiData<HomeData>};
export function useHome({cd    , homeData } :Props ){
   
 // some - similar to map but it can break looping after match
//  const newGameList: GameItem[] = [];
//  homeData?.d?.new_games.some((game: GameItem)=>{
//      Object.values(cd.d?.games_data[game.category_slug])?.some((gameData: GameItem)=>{
//        if(gameData.game_code == game.game_code){
//          game.brand_slug = gameData.brand_slug;
//          newGameList.push(game);
//          return true;
//        }
//      });
//  });

//  const hotGameList: GameItem[] = [];
//  Object.values(homeData?.d?.hotGames).some((game: GameItem)=>{
//    Object.values(cd.d?.games_data[game.category_slug])?.some((gameData: GameItem)=>{
//      if(gameData.game_code == game.game_code){
//        game.brand_slug = gameData.brand_slug;
//        hotGameList.push(game);
//        return true;
//      }
//    });
//  });

// const recommendList : GameItem[] = [];
//  Object.values(homeData?.d?.recommended_games).some((game: GameItem)=>{
//    Object.values(cd.d?.games_data[game.category_slug])?.some((gameData: GameItem)=>{
//      if(gameData.game_code == game.game_code){
//        game.brand_slug = gameData.brand_slug;
//        game.category = game.category_slug;
//        recommendList.push(game);
//        return true;
//      }
//    });
//  });
const newGameList =homeData?.d?.new_games;
const hotGameList =homeData?.d?.hotGames;
const casinoGameList =homeData?.d?.casinoGames;

 const  tabMenus= [
    { title: "Last Withdraw", value: "withdraw" },
    { title: "Last Deposit", value: "deposit" },
  ];

  const popupBanner = homeData?.d?.popup_banner ?? null;
  
  const selMenu = useSignal("withdraw");
  const { onSelCategoryQRL } = useNavTab(selMenu);
  const gamesDataArr = flattenObjToArr<Provider>(cd.d?.games_data || {});
  let casinoTypeGames = []
  let slotTypeGames = [];
  if(cd.d?.games_data){ 
      casinoTypeGames  = cd.d.games_data["casino"] ;
      slotTypeGames =  flattenObjToArr<Provider>( { 0 : cd.d.games_data["fish-hunter"], 1 :cd.d.games_data["slots"]} )
  }
 
  
 
 return { hotGameList, newGameList,casinoGameList,onSelCategoryQRL,selMenu,tabMenus, popupBanner, gamesDataArr, casinoTypeGames,slotTypeGames,  };
}
 