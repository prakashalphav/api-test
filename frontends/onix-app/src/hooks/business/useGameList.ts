import { useSignal , $, type Signal,} from '@builder.io/qwik';
import { useAlertDialog } from '~/hooks/app/useInteract';
import type { ApiData, SubGameData, Provider,GameItem, ProviderGameItem } from '~/services/types'; 
import { isString } from '~/utils/common';
import { isGameTransferWallet } from '~/utils/sysUtils';
import { useTransferWalletModal } from './useTransferWallet';
import { inlineTranslate,   } from 'qwik-speak'; 
import { useCommonViewData } from '../app/useCommonViewData';

export const GameTypeAll = "all";
export const GameTypeTop = "Top";
export const GameTypeNew = "New";
export const GameTypeHoldAndWin = "Hold And Win";
export const GameTypeBuyBonusFeature = "Buy Bonus Feature";
export const GameTypeJackpot = "JP Progressive";

export const _tabMenus = (app_sub_skin: string)=>{
    const t = inlineTranslate();
    return [
        { title:t('app.All@@All'), value: GameTypeAll },
        { title:t('app.Popular@@Popular'), value: GameTypeTop }, 
        { title:t('app.New@@New') , value: GameTypeNew },
        { title:t('app.Hold And Win@@Hold And Win') , value: GameTypeHoldAndWin },
        { title:t('app.Buy Bonus Feature@@Buy Bonus Feature') , value: GameTypeBuyBonusFeature },
        { title:t('app.Jackpot@@Jackpot') , value: GameTypeJackpot },
        // { title:t('app.Video Slot@@Video Slot') , value: 'Video Slot' },
        // { title:t('app.Classic Slot@@Classic Slot') , value: 'Classic Slot' },
    ];

}

export const useGamesLobby = (list : GameItem[] ,searchGameKeyword : string|null) => { 
    const selMenu = useSignal<string>("all"); //default is "all" 

    const t = inlineTranslate();
    const cd = useCommonViewData();
    const tabMenus = _tabMenus(cd.commonData.app_sub_skin);
    
    const { gameFilterList } = searchGame(searchGameKeyword,list, false);
    const dataList = useSignal<typeof list>(gameFilterList);
    const isSearch = useSignal<boolean>(!!searchGameKeyword );
     
     
    const onSelTypeQRL =  $((selected : string)=>{
        selMenu.value=   selected;
        // dataList.value = list;
        dataList.value = list.filter((item:GameItem) => {
            if(selMenu.value === 'all'){
                return true;
            }else{
                let isExist = false;
                item.FilterTypes.map((type:string)=>{
                    if(type?.toLowerCase() == selMenu.value.toLowerCase()){
                        isExist = true;
                    }
                })
                return isExist;
            }
          })
    });


    const onInput = $((ev :Event) => {
        isSearch.value = true;
        const { gameFilterList } = searchGame((ev.target as HTMLInputElement).value, list, true);
        dataList.value = gameFilterList; 
    })

  

    const clearSearch = $(() => {
        isSearch.value = false;
        dataList.value = list;
    })
return {onSelCategoryQRL: onSelTypeQRL,clearSearch,onInput,isSearch,dataList,selMenu,tabMenus } ;
}

export type ProviderGamesFilters = {
    game_types? : string[]; // default is ["all"]
    game_codes?: string[];  //if pass in this means this provider games is from this gameCode
    limit?: number|null; // if null means no limit  
    category? : string | null | undefined; 
    brands? : string[];
    search_key? : string| null | undefined; 
  }
   
export const adjustGameCategoryType  = (types   :  string[] | undefined ,category? : string |null|undefined  )=>{
    if(!types ||types?.length == 0){

        return  [GameTypeAll] ;
    }
    //if category is Slots, can return All 
    if(category && category !== "slots" && !types?.includes(GameTypeAll)  ){
        return [GameTypeAll] 
    }

    return types;
}

export const useProviderGamesLobby = (isGetGamesByApi = false ,   presets : ProviderGamesFilters ,presetGameList : ProviderGameItem[] = []  
) => { 
    const selTypes = useSignal<string[]>(
        adjustGameCategoryType(presets.game_types, presets.category  ) ) ; // (default is "all") FIRST PARAM - will take from search 1st, if search no have will take preset
    const selGameCodes = useSignal<string[]>(presets.game_codes||[]); // will take preset 1st, if preset no have will take from search. else will pass empty
    const selCategory = useSignal<(string|null|undefined)>(presets.category);
    const searchKey = useSignal<string|null|undefined>( presets.search_key);

    // const { gameFilterList } = searchProviderGame(searchKey.value,presetGameList ); //SL removed because using API to search keyword
    
    const dataList = useSignal<ProviderGameItem[]>( presetGameList); // if have preset limit datalist will based on the limit size, else show all

    const offset = useSignal<number>(presets.limit ? presets.limit : presetGameList.length); // if have preset limit will take it as offset value, else take all games size
    const hasMoreGames = useSignal<boolean>( ( !(!(presets.limit) && presetGameList.length>0) )); // if presetslimit is null then it means presetGameList is ald all , should have no more games 
    const {openDialogQRL} = useAlertDialog(); 
    const isWaiting = useSignal<boolean>(false); 

    const t = inlineTranslate();
    const cd = useCommonViewData();
    const tabMenus = _tabMenus(cd.commonData.app_sub_skin);
    const resetOnFilterChged =$(()=>{
        offset.value  = 0;
        hasMoreGames.value = true;
        selTypes.value=    adjustGameCategoryType(  selTypes.value  , selCategory.value ) ; 
        console.log('reset offset ', offset.value)
    })
    const getProviderGames = $( async (isResetFilter: boolean = false)=>{
        const gameTypes=selTypes.value;

        isWaiting.value = true;
        const result  = await callProviderGamesApi(  selGameCodes.value, gameTypes , searchKey.value ,presets.limit, offset.value ,selCategory.value )
        console.log('API return', isResetFilter)

        if(result.status !==200){
            isWaiting.value = false;
            await openDialogQRL( {message : result.message } , result.type);
            
            return false;
        }
        if(result.d?.games && result.d?.games.length >= 0 ){
            if(offset.value == 0 ){
                dataList.value = result.d?.games ; 
            }
            else {
              
                //assign w/o reference
                const _tempList = dataList.value.splice(0);

                _tempList.push(...result.d.games)  ; 
                dataList.value = _tempList;

                console.log("result.d.games",result.d.games,dataList.value);
            }
         
            // nid check on typeof becoz onclick will pass event type
            if(typeof isResetFilter !== 'boolean' || (typeof isResetFilter === 'boolean' && !isResetFilter)){
                offset.value += !presets.limit? result.d.games.length : presets.limit;
            }
            console.log("presets.limit", presets.limit);

            if( result.d?.games.length == 0) {
                hasMoreGames.value= false 
            } 
        }
     
        console.log(offset.value, "isWaiting.value " , isWaiting.value ,result.d );
        isWaiting.value = false;
        console.log("isWaiting.value " , isWaiting.value );
    }
    )
    const onSelTypeQRL =  $(async (selected : string , multiSelect : boolean = false)=>{
        if (multiSelect) {
            if(!selTypes.value[0]){
                selTypes.value =[selected]; 
            } else if (!selTypes.value.includes(selected)) {
                selTypes.value.push(selected);
            } else {
                selTypes.value.splice(selTypes.value.indexOf(selected), 1);
            }
        } else {
        selTypes.value=[selected]   ;
        }
        selTypes.value= adjustGameCategoryType(   selTypes.value, selCategory.value ) ;
        await resetOnFilterChged()
        if(isGetGamesByApi){
            getProviderGames(true);
        }
        else {
                // dataList.value = list;
                dataList.value = presetGameList.filter((item:ProviderGameItem) => {
                    if(selTypes.value.includes(GameTypeAll)){
                        return true;
                    }else{
                        let isExist = false;
                        item.game_types.map(( type)=>{
                            if(type?.name.toLowerCase() == selTypes.value.toLowerCase()){
                                isExist = true;
                            }
                        })
                        return isExist;
                    }
                })
        }

       
    });

   

    const onSelProvider = $(async (item: Provider, multiSelect?: boolean) => {
        if (multiSelect) {
            if(!selGameCodes.value[0]){
                selGameCodes.value = [item.game_code];
            } else if (!selGameCodes.value.includes(item.game_code)) {
                selGameCodes.value.push(item.game_code);
            } else {
                selGameCodes.value.splice(selGameCodes.value.indexOf(item.game_code), 1);
            }
        } else {
            selGameCodes.value = [item.game_code];
        }
        selCategory.value = item.category_slug;
        await resetOnFilterChged()
        if(isGetGamesByApi){
            getProviderGames(true);
        }
    } )
    const clearProvider = $(async () => {
        selGameCodes.value = [];
        selCategory.value = undefined;

        await resetOnFilterChged()
        if(isGetGamesByApi){
            getProviderGames(true);
        }else {
            dataList.value = presetGameList;
        }
    })

    const onInput = $(async (ev :Event) => {

     
        searchKey.value = (ev.target as HTMLInputElement).value;
        await resetOnFilterChged()
        if(isGetGamesByApi){
            getProviderGames((searchKey.value && searchKey.value.length > 0) ? true : false);
        }else {
            const { gameFilterList } = searchProviderGame( searchKey.value , presetGameList, true);
            dataList.value = gameFilterList;
        }
       
    })
    const onSearchInputFocus = $((ev :Event) => {
      
        const ele =ev.target as HTMLInputElement;
        ele.classList.add("inputSearch--expand")
    })
    const onSearchInputBlur = $((ev :Event) => {
      
        const ele =ev.target as HTMLInputElement;
        ele.classList.remove("inputSearch--expand")
    })

    const clearSearch = $(async () => {
        searchKey.value   = null;

        await resetOnFilterChged()
        if(isGetGamesByApi){
            getProviderGames();
        }else {

            dataList.value = presetGameList;
        }
    })
return {  onSelTypeQRL,clearSearch,onInput,searchKey,dataList, selTypes , onSelProvider ,hasMoreGames ,getProviderGames,isWaiting ,selGameCodes,    onSearchInputBlur,onSearchInputFocus,tabMenus, clearProvider } ;
}

export const callProviderGamesApi = async (gameCodes : string[]|undefined ,gameTypes : string[] ,searchKey : string|null = null  , limit : number|undefined|null , offset = 0,  selCategory : string|null = null )=>{

const postData ={
    game_codes : gameCodes,
    brands : [],
    game_types :gameTypes,
    search_key : searchKey,
    category: selCategory,
    limit :limit, // if undefined|null will be no limit
    offset :offset,
} as ProviderGamesFilters;
    const resp = await fetch("/getProviderGames", {  
        body: JSON.stringify(postData),
        method: "POST", 
        headers :  { 
            "Accept" : "application/json",
            "Content-Type" : "application/json",
        }

    });

    const result=  await resp.json() as ApiData<{games: ProviderGameItem[] }>;
    
    return result;
}
export const searchGame = (gameName: string | null, list : GameItem[], inputSearch: boolean) => {
    const gameFilterList = list.filter((item:GameItem) => {

        if(!gameName){
            return true;
        }
        if(!inputSearch){
            if(item.Name === gameName || !gameName){
                return true;
            }
        }else{
            if(gameName && item.Name.toLowerCase().includes(gameName?.toLowerCase())){
                return true;
            }
        }
      
      })
      return {gameFilterList};
} 


export const searchProviderGame= (gameName: string | null, list : ProviderGameItem[], inputSearch: boolean,  ) => {
    
    const providersList = Array.isArray(list) ? list : Object.values(list) as ProviderGameItem[] ;
    const gameFilterList = providersList.filter((item:ProviderGameItem) => {
        if(!gameName){
            return true;
        }

        if(!inputSearch){
            if(item.game_name === gameName || !gameName){
                return true;
            }
        }else{
            if( item.game_name.toLowerCase().includes(gameName?.toLowerCase())){
                return true;
            }
        }
      
      });
 

      return {gameFilterList};
} 


 
export const useGameLaunch= ( )=>{
    const {openDialogQRL}= useAlertDialog();
    const t= inlineTranslate();
    const { toggleModalQRL :toggleTransWalletModal  }= useTransferWalletModal();
    
    const {commonData} = useCommonViewData();
     //below openGameLobby and launchGameQRL, the game item is already checked that is for launching the game
     
     const isGameTransferWalletQRL =  $((item )=> isGameTransferWallet(item,commonData.tw_games ));
     const checkGameAllowedQRL= $(async (block: 1|0|undefined,maintenance: 1|0|undefined,isCO : 1|0|undefined,isPromoDisabled: 1|0|undefined) : Promise<boolean>=>{
        const t= inlineTranslate();
        if ( block == 1) { 
            await openDialogQRL({ message :t('app._9@@You are suspended / blocked from playing this game. Please contact CS for more info.' ), }, "i")
            return false;
            }
            if ( maintenance == 1) { 
                await openDialogQRL({ message :t('app._10@@Game is under maintenance.' ), }, "i")
                return false;
                }
                if ( isCO == 1) {
                    
                    await openDialogQRL({ message :t('app._11@@Game is coming soon' ) , }, "i")
                    return false;
                    }
                    if ( isPromoDisabled == 1) {
                      
                        await openDialogQRL({ message :t('app._12@@The game you clicked does not belong to the current promotion category. After the promotion is finished, you can return to playing' ) , }, "i")
                        return false;
                        }
        return true;
     })

     const _openGameLobbyQRL = $(async(e : Event , item : Provider  )=>{
        console.log('openGameLobbyQRL',item)
       
        const checkResult= await checkGameAllowedQRL(item.block,item.maintenance ,item.isCO  ,item.isPromoDisabled ) ;
       
        if(!checkResult){
            return false;
        }
            const controller = new AbortController();
            const windowReference = window.open("about:blank", "_blank");
            
            if (windowReference) windowReference.blur();
            window.focus();
            
            return new Promise<void>((resolve, reject) => {
            
            fetch("/getGameLaunchData/", {
            signal: controller.signal,
            body: JSON.stringify({ category_slug: item.category_slug, brand_slug: item.brand_slug, slug: "" }),
            method: "post",
            headers: {
            "Content-Type": "application/json", 
            },
            })
            .then((response) => response.json())
            .then(async (json: ApiData<SubGameData>) => {
            console.log('getGameLaunchData', json);
            if (windowReference && json.d?.launch_url && isString(json.d?.launch_url)) {
            windowReference.location = json.d?.launch_url;
            }
            else if(windowReference && json.d?.url && isString(json.d?.url) ){ 
                 
                windowReference.location =  `/launchGameForm/?toUrl=${encodeURIComponent(json.d?.url)}&token=${json.d?.token}&lobby=${json.d?.lobby}&lang=${json.d?.lang}`
           
            }
            else {
            
            console.error('error', json);
            throw new Error(`Launch url missing. ${json.message}`);
            
            }
            
            resolve();
            })
            .catch(async (error) => {
                
            console.error('getGameLaunchData error', JSON.stringify(error));
            //TODO prompt error 
            await openDialogQRL({ message : error.message, }, "f")
            if (windowReference) {
            windowReference.close();
            }
            window.focus();
            resolve();
            })
            .finally(() => {
            controller.abort(); // Abort the request
            
            // Clean up any other resources associated with the request
            });
            });


     });
    
     const _checkGameAuth = $(async (isAuth : boolean, hasDemo: 1|0 |undefined, isDemo: 1|0) : Promise<boolean>=>{
        const t= inlineTranslate();
        if(isDemo === 1 && hasDemo === 0  ){
            await openDialogQRL({ message :t('app._8@@This game has no demo.' )  , }, "i")
            return false ; 
        }

        if(!isAuth  ){
            await openDialogQRL({ message :t('app._13@@Please login first' )  , }, "i")
            return false ; 
        }

        return true;
     })
     const openGameLobbyQRL = $(async(e : Event , item : Provider, isAuth : boolean )=>{

        const checkResult= await _checkGameAuth(isAuth, item.has_demo, 0);

        if(!checkResult){
            return false;
        }
        

        if(await isGameTransferWalletQRL(item)){
            await toggleTransWalletModal({gameCode:item.game_code,launchGame$ :$(async ()=>  { await _openGameLobbyQRL( null, item); })}); 
            return false;
         }
     
         return await _openGameLobbyQRL(e,item  )
    })

    const _launchGameQRL = $(async (gameCode :string, gameId : string,isDemo : 0 | 1 , gameSubId : undefined|null|string, hasDemo : 0 | 1 , isAuth : boolean )=>{

        console.log('launchGameQRL',isAuth )
      
        const url =  `/launchGame?isDemo=${isDemo}&gameID=${gameId}&gameCode=${gameCode}&subGameID=${gameSubId}`;

        if(typeof window !== 'undefined'){
            // window.open(url);
            console.log(url);
            // window.location.href = (url);
            window.open(url, '_blank');
        } else {
            console.log('no window: ' ,url);
        }
    
    }) 
    
    const launchProviderGameItemQRL = $(async(item:ProviderGameItem, isAuth : boolean, isDemo: 1|0)=>{
   
        const checkResult1= await checkGameAllowedQRL(item.block,item.maintenance ,item.isCO  ,item.isPromoDisabled ) ;
        if(!checkResult1){
            return false;
        }
        const checkResult= await _checkGameAuth(isAuth, item.has_demo, isDemo);

        if(!checkResult){
            return false;
        }
        
        if(await isGameTransferWalletQRL(item)){
            await toggleTransWalletModal({gameCode:item.game_code, launchGame$: $(async()=>{
              return await _launchGameQRL( item.game_code ,item.provider_gid.v1,isDemo ,item.provider_gid.v2, item.has_demo,isAuth);
            })});

            return false ;
         }
         return  await _launchGameQRL( item.game_code ,item.provider_gid.v1,isDemo ,item.provider_gid.v2, item.has_demo,isAuth);
    })
    const launchGameItemQRL = $(async(item:GameItem , isAuth : boolean ,gameCode : string ,isDemo : 1|0 ,hasDemo : 1|0)=>{
 
        const checkResult1= await checkGameAllowedQRL(item.block,item.maintenance ,item.isCO  ,item.isPromoDisabled ) ;
        if(!checkResult1){
            return false;
        }
        const checkResult= await _checkGameAuth(isAuth, hasDemo, isDemo);

        if(!checkResult){
            return false;
        }
        
        if(await isGameTransferWalletQRL(item)){
       
            await toggleTransWalletModal({gameCode:gameCode, launchGame$: $(async()=>{
              return await _launchGameQRL( gameCode ,item.ID, isDemo,item.SubID, hasDemo , isAuth);
            })});

            return false ;
         }
         return await _launchGameQRL( gameCode ,item.ID, isDemo,item.SubID, hasDemo , isAuth);
    })
   
     return {openGameLobbyQRL ,launchGameItemQRL,launchProviderGameItemQRL, checkGameAllowedQRL};
}