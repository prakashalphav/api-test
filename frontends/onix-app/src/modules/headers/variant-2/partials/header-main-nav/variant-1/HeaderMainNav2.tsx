


import { component$, useSignal, useStylesScoped$, $,  } from '@builder.io/qwik';
import styles from './HeaderMainNav2.scss?inline'; 

  import { useCommonViewData } from "~/hooks/app/useCommonViewData";

import { OptionIcon } from '~/components/icons/Option';
import type { LanguageOptions, Provider } from '~/services/types';
import { inlineTranslate } from 'qwik-speak';
import { useLoginModal } from '~/hooks/business/useLoginModal';
import { useRegisterModal } from '~/hooks/business/useRegisterModal';
import { CloseIcon } from '~/components/icons/Close';
import {    useOptions,   } from '~/hooks/business/useHeader';
import { isGameAllowed } from '~/utils/sysUtils';
import { useGameLaunch } from '~/hooks/business/useGameList';
import LinkButton from '~/components/link-button/variant-1/LinkButton1';
import { ArrowDownIcon } from '~/components/icons/ArrowDown';
import { useMainNav1Mapping } from "~/hooks/business/useHeader";

// import { SettingsIcon } from '~/components/icons/Settings';
// import { LogoutIcon } from '~/components/icons/Logout';


import SideNonAuthOptions from '~/modules/side-options/variant-1/SideNonAuthOptions1';
import SideProfileOptions from '~/modules/side-options/variant-1/SideProfileOptions1';
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
    const { toggleModalQRL: toggleLoginQRL } = useLoginModal();
    const { toggleModalQRL: toggleRegQRL } = useRegisterModal();
    const { openGameLobbyQRL, checkGameAllowedQRL}= useGameLaunch(); 

    const {navMenuMap} = useMainNav1Mapping()
  const  {isShowOptions :isShowProfileOptions, optionsEle: profileOptionsEle, toggleOptionsQRL: toggleProfileOptionsQRL,parentOptions :parentProfileOptions} = useOptions();
  const {isShowOptions, optionsEle, toggleOptionsQRL,parentOptions} = useOptions();

    return (<>
    <div class={`headerMainNav ${props.class}`}>
     <div class="content rounded-lg grid grid-cols-12 items-center justify-items-center relative">
        <div class="h-full col-span-8 flex items-center justify-self-start w-full flex-nowrap">
           {  Object.values(commonData.categories).map((category: string, index :number) => {
                const menuData = navMenuMap.get(category);

                return  (<>
              <div class="group h-full col-span-1" key={index}>
               <a href={menuData.href} class="h-full flex-center  px-3 navItem whitespace-nowrap">{menuData.name}

                  {menuData.isHot && <span class=" hotLabel ml-1 p-1 text-xxs">{t('app.Hot@@Hot').toUpperCase()}</span>}
               </a>
              <div class="group-hover:block hidden -z-20 absolute w-full h-fit top-16 left-0">
                  <div class="mx-5 contentInner rounded-2xl p-10 ">
                    <div class="h-96 overflow-auto scroller">
                      <div class="grid grid-cols-6 gap-6 px-10">
                      {Object.values(commonData.games_data[category]).map(
                              (item: Provider, idx : number)  => (
                          <>
                          <LinkButton  
                          key={idx}
                          toUrl={
                            !item.is_launch && isGameAllowed(item)
                              ? `/${item.category_slug}/${item.brand_slug}`
                              : ""
                          }   class={`w-full flex-center flex-col min-h-full ${!isGameAllowed(item)? 'opacity-50' : ''}`} onClick$= {async (e) => {
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
                                <p class="text-black py-2 font-semibold w-full break-words text-center ">{item.game_name}</p>
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
                  class="flex-center h-full   px-3 navItem   flex-center whitespace-nowrap"    
                >
                <img class="mr-1 w-6 h-6 " src={'https://files.sitestatic.net/ImageFile/' + commonData.website_contents.custom_menu_logo}/>
                {commonData.website_settings.custom_menu_title }
                </a>
              )}
{commonData.website_contents?.isOnCustomMenu2 == 1 && (
              <a
                href={commonData.website_contents.custom_menu2_url ?? "#"}
                target="_blank"
                class="flex-center h-full px-3 navItem capitalize flex-center whitespace-nowrap"    
              >
                <img class="mr-1 w-6 h-6 " src={'https://files.sitestatic.net/ImageFile/' + commonData.website_contents.custom_menu2_logo}/>
                   {commonData.website_contents.custom_menu2_title } 
              </a>
            )}
        </div>

        <div class="col-span-4 justify-self-end gap-2 flex items-center py-3 pr-3">
        {!props.isAuth && (<>
          <button class="rounded-md border w-fit px-6 py-3 loginBtn" onClick$={toggleLoginQRL}> {t('app.Login@@Login')}</button>
          <button class="rounded-md w-fit px-6 py-3 registerBtn" onClick$={toggleRegQRL}>{t('app.Register@@Register')} </button>
          </>
        )}

        {props.isAuth && (<>
          <button ref={parentProfileOptions} style="width:13rem;" class="rounded-md  p-1 pr-3 avatarProfile flex items-center relative" onClick$={toggleProfileOptionsQRL}>
            <p class="flex-center rounded-full p-1 mr-1 bg-white">
              <img src="/images/dummy_images/profile_pic_2.png"    loading="lazy"
                decoding="async" width="24" height="24" />
            </p>
            <div class="flex flex-col">
              <p class="text-xs italic welcomeText flex">{t('app.Hello@@Hello')} </p>
              <p class="flex w-32 truncate">{commonData.user_name}</p>
            </div>
            <p class="absolute right-3"><ArrowDownIcon></ArrowDownIcon></p>
          </button>
          </>
        )}
          <button ref={parentOptions} class="rounded-md w-10 h-10 p-3 flex-center sideOptsBtn" onClick$={toggleOptionsQRL}>
                {isShowOptions.value && (<CloseIcon class="w-full h-full"></CloseIcon>)}
                {!isShowOptions.value && (<OptionIcon class="w-full h-full"></OptionIcon>)}
                </button>
        </div>
      
     </div>

     {/* option btn box */}
     {isShowOptions.value && (
      <SideNonAuthOptions optionsEle={optionsEle} contactLinks={props.contactLinks} zIndex={-20}></SideNonAuthOptions>
     )}
      {/* end of option btn box */}

        {/* option btn box */}
     {isShowProfileOptions.value && (
     <SideProfileOptions  optionsEle={profileOptionsEle}   zIndex={-20}></SideProfileOptions>
     )}
      {/* end of option btn box */}
     </div>
    </>);
})