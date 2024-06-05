import { component$, useStylesScoped$ ,  } from '@builder.io/qwik'; 
import styles from './SideNav1.scss?inline'; 
import {ProfileIcon} from "../../../components/icons/Profile";
// import {Slot2Icon} from "../../../components/icons/Slot2";
// import { FishShooting2Icon as FishShootingIcon}  from '~/components/icons/FishShooting2'; 
// import {EGames2Icon as EGamesIcon}  from '../../../components/icons/EGames2'; 
// import {Sports2Icon  as SportsIcon} from "~/components/icons/Sports2";

// import {Casino2Icon} from "../../../components/icons/Casino2";
// import {Lottery2Icon} from "../../../components/icons/Lottery2";
// import {KenoIcon} from "../../../components/icons/Keno";
import {ArrowRight} from "../../../components/icons/ArrowRight";
import {useSideNav} from "../../../hooks/business/useSideNav";
// import { Game3Icon } from '~/components/icons/Game3';
// import { Referral2Icon } from '~/components/icons/Referral2';
import { LogoutIcon } from '~/components/icons/Logout';
// import { DiamondIcon } from '~/components/icons/Diamond';
import { useRegisterModal } from '~/hooks/business/useRegisterModal';
import { useLoginModal } from '~/hooks/business/useLoginModal';
import { PhoneIcon } from "../../../components/icons/Phone2";
import { EmailIcon } from "~/components/icons/Email";
import { LineIcon } from "~/components/icons/Line";
import { SkypeIcon } from "~/components/icons/Skype";
import { HotlineIcon } from "~/components/icons/Hotline";
import {TelegramIcon } from "~/components/icons/Telegram";
import { WarningIcon } from "~/components/icons/Warning";
// import {TelegramArrowIcon } from "~/components/icons/TelegramArrow";
// import {PromotionIcon } from "~/components/icons/Promotion";
import ProfileAvatar from '~/components/profile-avatar/variant-1/ProfileAvatar1';
// import ImgReferralsilver from '~/media/images/svg/ReferralSilver.svg?jsx';
import {LanguageIcon} from "../../../components/icons/Language";
// import ImgSlotsilver from '~/media/images/svg/SlotSilver.svg?jsx';
// import ImgSportssilver from '~/media/images/svg/SportsSilver.svg?jsx';
// import ImgCasinosilver from '~/media/images/svg/CasinoSilver.svg?jsx';
// import ImgLotterysilver from '~/media/images/svg/LotterySilver.svg?jsx';
// import ImgFishshootingsilver from '~/media/images/svg/FishShootingSilver.svg?jsx';
// import ImgEgamessilver from '~/media/images/svg/EGamesSilver.svg?jsx';
// import ImgPromotionsilver from '~/media/images/svg/PromotionSilver.svg?jsx';
import { CloseIcon } from '~/components/icons/Close';
import { useComplaintModal } from "../../../hooks/business/useComplaintForm";
import {
  inlineTranslate,  
} from 'qwik-speak';
import { useLangMenu } from '~/hooks/business/useLangMenu';
import { useCommonViewData } from '~/hooks/app/useCommonViewData';
import { useMainNav1Mapping } from '~/hooks/business/useHeader';

type Props ={
  zIndex : number,
  isAuth:boolean,
  username?: string,
  memberLevel? :string,
  email? :string,
  isOnCustomMenu1?: string | number;
  isOnCustomMenu2?: string | number; 
  contactLinks?: Record<string, Record<string, string>>;
}
export default component$(( props :Props) => {
  useStylesScoped$(styles); 
  const {showSideNav, sideNav, toggleSideNavQRL} = useSideNav();
  const {toggleModalQRL : toggleLoginQRL} =useLoginModal();
  const {toggleModalQRL :toggleRegQRL} = useRegisterModal();
  const { toggleModalQRL: toggleComplaintQRL } = useComplaintModal();
  const {toggleLangMenu}= useLangMenu();
  const t = inlineTranslate();
  const {commonData} = useCommonViewData();
  const { navMenuMap } = useMainNav1Mapping()

  return (
     <>
        { showSideNav.value && (<>
        
         {/* overlay */}
        <div class=" fixed inset-0 transition-opacity bg-black bg-opacity-40 backdrop-blur-sm" style={'z-index:'+ props.zIndex+';'}/>
        <aside ref={sideNav} class={`overflow-y-auto fixed h-auto  top-0`}  style={'z-index:'+ props.zIndex+';'}>
        <div class="flex justify-between items-center py-4 px-2.5 bg-[var(--bg-head)]">
          <div class=" ">
            {props.isAuth && (<>
              <ProfileAvatar class="mr-2 text-sm inline-block" memberLevel={props.memberLevel||""}></ProfileAvatar>
              <div class="inline-block" >
                <h2 class="text-base"><button>{props.username}</button></h2>
                <p class="text-xs text-secondary">{props.email}</p>
            </div>
            </>)}
            {!props.isAuth && (<>
              <div class="text-4xl pr-1.5 mr-1 inline-block">
               <ProfileIcon></ProfileIcon>
            </div>
              <div class="inline-block" >
                <h2 class="text-base"><button onClick$={toggleLoginQRL}>{t('app.Login@@Login')}</button></h2>
                <p class="text-xs text-secondary">{t("app.Don't have account?@@Don't have account?")} <button onClick$={toggleRegQRL} class="text-[var(--text-brand)]">{t('app.Join@@Join')}</button></p>
            </div>
            </>)}
            </div>
            <button onClick$={toggleSideNavQRL} class="text-3xl"><CloseIcon></CloseIcon></button>
            
        </div>
        <div class=" h-[calc(100vh_-_72px_-_200px)] overflow-y-auto">
                <ul class="sidenav-menu">
                    { Object.values(commonData.categories).map((category: string) => {
                      const menuData = navMenuMap.get(category);

                      return (
                        <>
                          <li class="p-4 flex-center navItem">
                            <div class="mx-2 rounded-full text-lg flex-center ">
                              <img src={menuData.icon} class="w-6 h-6" width="24" height="24" />
                            </div>
                            <a href={menuData.href} class="block flex-auto min-w-0">{menuData.name}</a>
                            <div class="text-[var(--text-brand)]"><ArrowRight ></ArrowRight></div>
                          </li>
                        </>
                      )
                    })}
                    <li class="p-4 flex-center navItem">
                    <div class="mx-2 rounded-full text-lg flex-center  ">
                            {/* <PromotionIcon></PromotionIcon> */}
                            <img src="/images/svg/PromotionSilver.svg" class="w-6 h-6 " ></img>
                            {/* <ImgPromotionsilver class="w-6 h-6 "/> */}
                       </div>
                       <a class="block flex-auto min-w-0" href="/promotions/">{t("app.Promotions@@Promotions")}</a>
                      <div class="text-[var(--text-brand)]">  <ArrowRight ></ArrowRight>

                      </div>
                    </li>
                    {commonData.website_settings?.isOffReferralMenu != '1' &&
                      <li class="p-4 flex-center navItem">
                        <div class="mx-2 rounded-full text-lg flex-center  ">
                          {/* <Referral2Icon></Referral2Icon> */}
                          <img src="/images/svg/ReferralSilver.svg" class="w-6 h-6 " ></img>
                          {/* <ImgReferralsilver class="w-6 h-6 "/> */}
                        </div>
                        <a class="block flex-auto min-w-0" href="/referral/">{t("app.Referral@@Referral")}</a>
                        <div class="text-[var(--text-brand)]">  <ArrowRight ></ArrowRight>

                        </div>
                      </li>
                    }

                    {
                commonData.website_settings?.isOnCustomMenu ==1 && commonData.website_contents !== undefined && 
                (
                    <li class="p-4 flex-center navItem">
                      <div class="mx-2 rounded-full text-lg flex-center  ">
                        <img class="w-6 h-6 " src={'https://files.sitestatic.net/ImageFile/' + commonData.website_contents.custom_menu_logo}/>
                      </div> 
                      <a
                        class="block flex-auto min-w-0" href={"/"+ commonData.website_settings.custom_menu_title?? '#'}   
                        target="_blank"
                      >
                        {commonData.website_settings.custom_menu_title?.toUpperCase() }
                      </a>
                      <div class="text-[var(--text-brand)]">
                        <ArrowRight ></ArrowRight>
                      </div>
                    </li>
                    )

                  }

              {
                commonData.website_contents?.isOnCustomMenu2 ==1 &&  
                    <li class="p-4 flex-center navItem">
                      <div class="mx-2 rounded-full text-lg flex-center ">
                        <img class="w-6 h-6 " src={'https://files.sitestatic.net/ImageFile/' + commonData.website_contents.custom_menu2_logo}/>
                      </div> 
                      <a
                        class="block flex-auto min-w-0" href={commonData.website_contents.custom_menu2_url??"#"}
                        target= "_blank"
                      >
                        {commonData.website_contents.custom_menu2_title?.toUpperCase()}
                      </a>
                      <div class="text-[var(--text-brand)]">
                        <ArrowRight ></ArrowRight>
                      </div>
                    </li>
                    }
                    {props.isAuth && (<>
                    <li class="p-4 flex-center navItem logout-btn">
                       <div class="mx-2 rounded-full text-lg w-8 h-8 flex-center left-menu-icon">
                            <LogoutIcon></LogoutIcon>
                       </div> 
                       <a href="/logout/" class="block flex-auto min-w-0">{t("app.Logout@@Logout")}</a>
                      <div class="text-[var(--text-brand)]">  <ArrowRight ></ArrowRight>
                      </div>
                    </li>
                    </>)}

                </ul>
         </div>
         <div>
          
          <ul class="px-5 my-2 flex flex-wrap gap-3">
            {!!props.contactLinks && <>
            {!!props.contactLinks.phone.displayColumn && 
            <li>
              <a
                href={props.contactLinks.phone.url }
                class="rounded-lg flex-center w-8 h-8 bg-[var(--popup-icon-bg)] text-lg socialLink"
              ><PhoneIcon/></a>
            </li>
            }
            {!!props.contactLinks.email.displayColumn && 
            <li>
              <a
                href={props.contactLinks.email.url}
                class="rounded-lg flex-center w-8 h-8 bg-[var(--popup-icon-bg)] text-lg socialLink"
              ><EmailIcon/></a>
            </li>
            }
            {!!props.contactLinks.line.displayColumn && 
            <li>
              <a
                href={props.contactLinks.line.url}
                class="rounded-lg flex-center w-8 h-8 bg-[var(--popup-icon-bg)] text-lg socialLink"
              ><LineIcon/></a>
            </li>
            }
            {!!props.contactLinks.skype.displayColumn && 
            <li>
              <a
                href={props.contactLinks.skype.url}
                class="rounded-lg flex-center w-8 h-8 bg-[var(--popup-icon-bg)] text-lg socialLink"
              ><SkypeIcon/></a>
            </li>
            }
            {!!props.contactLinks.whatsapp.displayColumn && 
            <li>
              <a
                href={props.contactLinks.whatsapp.url}
                class="rounded-lg flex-center w-8 h-8 bg-[var(--popup-icon-bg)] text-lg socialLink"
              ><HotlineIcon/></a>
            </li>
            }
            {!!props.contactLinks.whatsapp_2.displayColumn && 
            <li>
              <a
                href={props.contactLinks.whatsapp_2.url}
                class="rounded-lg flex-center w-8 h-8 bg-[var(--popup-icon-bg)] text-lg socialLink"
              ><HotlineIcon/></a>
            </li>
            }
            {!!props.contactLinks.whatsapp_3.displayColumn && 
            <li>
              <a
                href={props.contactLinks.whatsapp_3.url}
                class="rounded-lg flex-center w-8 h-8 bg-[var(--popup-icon-bg)] text-lg socialLink"
              ><HotlineIcon/></a>
            </li>
            }
            {!!props.contactLinks.TelegramName.displayColumn && 
            <li>
              <a
                href={props.contactLinks.TelegramName.url}
                class="rounded-lg flex-center w-8 h-8 bg-[var(--popup-icon-bg)] text-lg socialLink"
              ><TelegramIcon/></a>
            </li>
            }</>}
            {commonData.website_settings?.is_allow_complaint_form == '1' &&
            <li>
              <button class="rounded-lg flex-center gap-1 h-8 px-2 bg-[var(--popup-icon-bg)] "
                type="button"
                onClick$={toggleComplaintQRL}
              >
                <WarningIcon class="text-lg"></WarningIcon>
                <span>{t('app.Complaint@@Complaint')}</span>
              </button>
            </li> 
        }
          </ul>
          {/* Language Menu */}
          <div><button class="block px-6 my-3  flex-center gap-3 navItem" onClick$={async ()=>{
            // close side nave first
            await toggleSideNavQRL();
            await toggleLangMenu();

          }}> 
          <LanguageIcon class='text-2xl'></LanguageIcon>
            Language</button>
            
            </div>
       
         </div>
    </aside></>)}
     </>
  );
});
