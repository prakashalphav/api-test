


import { component$, useStylesScoped$,  } from '@builder.io/qwik';
import styles from './HeaderMainNav4.scss?inline'; 

  import { useCommonViewData } from "~/hooks/app/useCommonViewData";
import type { Provider } from '~/services/types';
import { inlineTranslate } from 'qwik-speak';
import { isGameAllowed } from '~/utils/sysUtils';
import { useGameLaunch } from '~/hooks/business/useGameList';
import LinkButton from '~/components/link-button/variant-1/LinkButton1';
// import { SettingsIcon } from '~/components/icons/Settings';
// import { LogoutIcon } from '~/components/icons/Logout';
import { useMainNav1Mapping } from "~/hooks/business/useHeader";
import { SlotsIcon } from '~/components/icons/Slots2';
import { CasinoIcon } from '~/components/icons/Casino3';
import { SportsIcon } from '~/components/icons/Sports3';
import { FishShootingIcon } from '~/components/icons/FishShoorting3';
import { CockFightIcon } from '~/components/icons/CockFight';
import { EGamesIcon } from '~/components/icons/EGames3';
import { LotteryIcon } from '~/components/icons/Lottery3';
import { PokerIcon } from '~/components/icons/Poker';

type Props = {  
  contactLinks?: any;
  platform: string;
  isOnCustomMenu1?: string | number;
  isOnCustomMenu2?: string | number; 
  isAuth: boolean;
  class?:string; 
};


export default component$((props: Props) => {
    useStylesScoped$(styles); 
    const {commonData} = useCommonViewData(); 
    const t = inlineTranslate();
    const { openGameLobbyQRL, checkGameAllowedQRL}= useGameLaunch(); 
    const {navMenuMap} = useMainNav1Mapping()

    return (<>
    <div class={`headerMainNav ${props.class}`}>
     <div class="content rounded-full grid grid-cols-12 flex-center  content-stretch  min-h-full ">
        <div class="mx-auto col-span-8 flex w-full flex-nowrap content-stretch  min-h-full ">
           {  Object.values(commonData.categories).map((category: string) => {
                const menuData = navMenuMap.get(category);

                return  (<>
              <div class="group col-span-1 px-1">
               <a href={menuData.href} class="h-full group-hover:before:block before:hidden relative flex-center py-4  navItem ">
                {category === 'slots' && <div class="text-lg pr-1 icon"><SlotsIcon/></div>}
                {category === 'sports' && <div class="text-lg pr-1 icon"><SportsIcon/></div>}
                {category === 'casino' && <div class="text-lg pr-1 icon"><CasinoIcon/></div>}
                {category === 'poker' && <div class="text-lg pr-1 icon"><PokerIcon/></div>}
                {category === 'lottery' && <div class="text-lg pr-1 icon"><LotteryIcon/></div>}
                {category === 'fish-hunter' && <div class="text-lg pr-1 icon"><FishShootingIcon/></div>}
                {category === 'e-games' && <div class="text-lg pr-1 icon"><EGamesIcon/></div> }
                {category === 'cockfight' && <div class="text-lg pr-1 icon"><CockFightIcon/></div>}

                {menuData.name}

                  {menuData.isHot && <span class=" hotLabel ml-1 p-1" style="font-size:10px;">HOT</span>}
               </a>
              <div class="group-hover:block hidden z-10 absolute w-full h-fit top-full left-0">
                  <div class="contentInner rounded max-w-screen py-10 pr-4">
                    <div class="overflow-auto scroller " style="height:318px;">
                      <div class="grid grid-cols-6 gap-6">
                      {Object.values(commonData.games_data[category]).map(
                              (item: Provider)  => (
                          <>
                          <LinkButton  
                          toUrl={
                            !item.is_launch && isGameAllowed(item)
                              ? `/${item.category_slug}/${item.brand_slug}`
                              : ""
                          }   class={`w-full flex-center flex-col min-h-full subMenuItem rounded ${!isGameAllowed(item)? 'opacity-50' : ''}`} onClick$= {async (e) => {
                            if (item.is_launch) {
                              await openGameLobbyQRL(
                                e,
                                item,
                                commonData.isAuth
                              );
                            } else {
                              await checkGameAllowedQRL(
                                item.block,
                                item.maintenance,
                                item.isCO,
                                item.isPromoDisabled
                              );
                            }
                          }}>
                                <img src={`https://files.sitestatic.net/assets/imgs/game_logos/150x150/${
                                      item.image
                                    }.png`} class="rounded-2xl "
                                   loading="lazy"
                                   decoding="async" width="150" height="150"/>
                                <p class=" py-2 font-semibold w-full break-words text-center">{item.game_name}</p>
                          </LinkButton>
                          </>
                      ))}
                      </div>
                    </div>
                 
                  </div>
              </div>
              </div>
          </>)})}

          {commonData.website_settings?.isOnCustomMenu == 1 &&
              commonData.website_contents !== undefined && (
                <a
                  href={
                    "/" + commonData.website_settings.custom_menu_title ?? "#"
                  }
                  
                  target="_blank"
                  class="flex-center h-full py-4 px-3 navItem group-hover:before:block before:hidden relative "    
                >
                <img class="mr-1 w-6 h-6 " src={'https://files.sitestatic.net/ImageFile/' + commonData.website_contents.custom_menu_logo}/>
                {commonData.website_settings.custom_menu_title?.toUpperCase()}
                </a>
              )}
                {commonData.website_contents?.isOnCustomMenu2 == 1 && (
              <a
                href={commonData.website_contents.custom_menu2_url ?? "#"}
                target="_blank"
                class="flex-center h-full  py-4 px-3 navItem group-hover:before:block before:hidden relative "    
              >
             <img class="mr-1 w-6 h-6 " src={'https://files.sitestatic.net/ImageFile/' + commonData.website_contents.custom_menu2_logo}/>
                   {commonData.website_contents.custom_menu2_title?.toUpperCase()} 
              </a>
            )}
        </div>

        <div class="col-span-4 justify-self-end gap-2 flex items-center py-4">

        </div>
      
     </div>

     </div>
    </>);
})