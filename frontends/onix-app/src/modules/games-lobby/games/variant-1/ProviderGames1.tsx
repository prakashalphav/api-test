import { component$, useSignal, useStylesScoped$, $ } from '@builder.io/qwik';
import styles from './ProviderGames1.scss?inline';
import {SearchIcon}  from '../../../../components/icons/Search';
import TabsMenu from "../../../../components/tabs-menu/variant-1/TabsMenu1";
import Slider1 from "../../../../components/provider-sliders/variant-1/Slider1";
import {     useGamesLobby,  useGameLaunch } from '~/hooks/business/useGameList';
import { useLocation } from '@builder.io/qwik-city';
 
import { CloseIcon } from '~/components/icons/Close';
import { useCommonViewData } from '~/hooks/app/useCommonViewData';
import {
    inlineTranslate,  
  } from 'qwik-speak';
  
export type contentType = {
    
}
type Props = {
    gameList: GameItem[];
    providers: Provider[];
    category: string;
    gameCode: string;
}

export default component$(( props : Props) => {
    useStylesScoped$(styles);
    const t = inlineTranslate();

  

   const location = useLocation();
   const searchGameKeyword = location.url.searchParams.get("q");
 
   
   const {onSelTypeQRL,clearSearch,onInput,isSearch,dataList,selMenu, tabMenus} = useGamesLobby(  props.gameList ,searchGameKeyword);

  
 
  
    const {launchGameItemQRL}= useGameLaunch();
    const  {commonData} = useCommonViewData();
    return <>
    <div class=" "> 
        <div class="lg:hidden">
        <Slider1 providers={props.providers} category={props.category}></Slider1>
        </div>      
        <div class="grid grid-cols-6  rounded-lg"> 
            <div class="provider-wrapper col-span-1 my-2 m-1 rounded-lg hidden lg:block"> 
                <ul class="px-4 py-5">
                {props.providers.map((item: Provider)=>(
                    <li class="mb-6">
                          <a href={"/"+props.category+"/"+item.brand_slug}>
                              <div class="flex provider-image border-x border-t-2 rounded w-full justify-center">
                                 <img class="h-10 w-auto" src={`https://files.sitestatic.net/assets/imgs/game_logos/200x60/${item.game_code}${item.provider_gid?.v1?"/" + item.provider_gid?.v1:""}.png`}/>
                                  
                              </div>
                          </a>
                      </li>
                    )
                    )} 
                </ul>
            </div>
            <div class="lg:col-span-5 lg:m-2 lg:mt-0 col-span-6">
                <div class="mt-0 lg:mt-3 my-4 relative">
                    <TabsMenu menus={tabMenus} onClickMenu$={onSelTypeQRL} selMenus={[selMenu.value]} ></TabsMenu>
                    <div class="search absolute right-1 top-1 hidden lg:inline-block">
                        <span class="search-icon absolute left-auto top-2 right-1 text-lg"><SearchIcon></SearchIcon></span>
                        <input placeholder="Search" class="indent-2.5 w-[220px] h-8 rounded-sm" onInput$={onInput}/>
                    </div>
                    {isSearch.value && (<>
                    <button onClick$={clearSearch} class="absolute right-0 p-1 flex text-[var(--text-color)]" type="button"> {t('app.Clear Search@@Clear Search')}<CloseIcon></CloseIcon></button>
                    </>
                    )}
                </div>
                <div class="grid grid-cols-3  xl:grid-cols-6 lg:grid-cols-5  sm:grid-cols-4 gap-2  ">
                {dataList.value.map((item)=>(
                    <>
                     <div class="col-span-1 relative cursor-pointer" onClick$={async ()=>{
                    
                    await launchGameItemQRL(item,commonData.isAuth,props.gameCode, 0 ,0);

                    }}>
                            { (JSON.stringify(item?.FilterTypes)?.toLowerCase().includes("top") || JSON.stringify(item?.FilterTypes)?.toLowerCase().includes("hot")) && (<>
                                 <div class="hot-label font-semibold text-xs w-16  py-1 flex justify-center rounded-tl-xl rounded-br-2xl absolute"> {t('app.Hot@@Hot')}</div>
                             </>)}
                             { JSON.stringify(item?.FilterTypes)?.toLowerCase().includes("new") && (<>
                                 <div class="new-label font-semibold text-xs w-16  py-1 flex justify-center rounded-tl-xl rounded-br-2xl absolute"> {t('app.New@@New')}</div>
                             </>)}
                         <div class="rounded-2xl game-wrapper">
                           <img class="w-full h-[140px] lg:h-[180px] rounded-2xl" src={item.ImgSrc as string || (item.img_src as string)?.replace("{{device}}","mobile").replace("{{type}}","normal")}/>
                         </div>
                     </div>
                    </>
                    )
                )}
                </div> 
            </div>
        </div>

    </div>
    </>;
})