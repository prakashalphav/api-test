import { component$, Resource, useStylesScoped$ , useStyles$ } from "@builder.io/qwik";
import { BurgerMenu } from "../../../components/icons/BurgerMenu";
import { useHeader } from "../../../hooks/business/useHeader";
import { useLoginModal } from "../../../hooks/business/useLoginModal";
import { useRegisterModal } from "../../../hooks/business/useRegisterModal";
import styles from "./Header1.scss?inline"; 
import ProfileAvatar from "../../../components/profile-avatar/variant-1/ProfileAvatar1";
import { WalletIcon } from "~/components/icons/Wallet";
import { ArrowDown2Icon } from "~/components/icons/ArrowDown2";
import { ReloadIcon } from "~/components/icons/Reload";
import { TransactionIcon } from "~/components/icons/Transaction";
import { Game2Icon } from "~/components/icons/Game2";
import { useGetBalance } from "~/hooks/utils/useGetBalance";
import { LockIcon } from "~/components/icons/Lock";
import { AddUserIcon } from "~/components/icons/AddUser";
import Announcement from  "~/components/announcement/variant-1/Announcement1";
import { AnnouncementIcon } from "~/components/icons/Announcement";
import { useUsrBalWalletMenu } from "~/hooks/business/useUsrBalWalletMenu";
import WalletMenu from "~/modules/wallet-menu/variant-1/WalletMenu1";

import LazyImage from  "~/components/image/LazyImage";
import { useGamesTransferMenu } from "~/hooks/business/useGamesTransferMenu";
import MainNav from "./partials/header-main-nav/variant-1/HeaderMainNav1";
import GamesTransferMenu from "~/modules/games-transfer-menu/variant-1/GamesTransferMenu1";
 import { homeLogoBase } from '~/services/images';
import { priceFormat } from "~/utils/formatters/priceFormat";
import {
  inlineTranslate,  
} from 'qwik-speak';
import { useCommonViewData } from "~/hooks/app/useCommonViewData";
import { isMobileDevice } from "~/utils/common";
type Props = {
  annoucement?: string;
  zIndex: number;
  isAuth: boolean;
  memberLevel?: string;
  userBal?: string;
  currencyCode?: string;
  username?: string;
  websiteLogo?: string;
};
export default component$((props: Props) => {
 
  useStylesScoped$(styles); 
  const t = inlineTranslate();
  const { currentBalance, actionGetBal } = useGetBalance(
    props?.currencyCode + " " + props?.userBal
  );

  const { toggleModalQRL: toggleLoginQRL } = useLoginModal();
  const { toggleModalQRL: toggleRegQRL } = useRegisterModal();
  const { toggleSideNavQRL, toggleProfilePopupQRL, toggleTrxPopupQRL } =
    useHeader();
 
    const {commonData} = useCommonViewData();
    const {toggleGamesTransMenu} = useGamesTransferMenu();
    const { toggleWalletMenu } = useUsrBalWalletMenu();
    
   const isMobile=   isMobileDevice(null, commonData.device );
  return (
    <>
      <div class={` header relative`}    style={"z-index:" + props.zIndex + ";"}>

        {/* Header Top */}
      <div
        
        class={`surfaceTop fixed  w-full z-10`}
      
      >  
        <div class="max-w-screen mx-auto h-full flex flex-auto items-center justify-between lg:justify-start gap-1 ">
          <button
            class="text-2xl block lg:hidden"
            type="button"
            onClick$={toggleSideNavQRL}
          >
            <BurgerMenu></BurgerMenu>
          </button>
          <a
            class="  sm:px-3  logo flex-center animate fade-in-bottom"
            href="/"
          >
            
            <LazyImage src={homeLogoBase + props.websiteLogo} height={70} width={180}></LazyImage>
            {/* <picture>
              <source
                srcSet="/images/dummy_images/onix/desktop/Logo.avif 1x"
                type="image/avif"
                width="181"
                height="53"
              />
              <source
                srcSet="/images/dummy_images/onix/desktop/Logo.webp 1x"
                type="image/webp"
                width="181"
                height="53"
              />
      
              <img
                src="/images/dummy_images/onix/desktop/Logo.png"
                alt="A description of the image."
                width="181"
                height="53"
                class="max-h-[40px] lg:max-h-[47px] w-auto"
                loading="lazy"
                decoding="async"
              />
            </picture> */}
          </a>

          <Announcement
            icon={AnnouncementIcon}
            annoucement={props.annoucement}
            class="w-1/2 ml-48 hidden lg:flex"
          ></Announcement>
          {!props.isAuth && (
            <button
              class="text-2xl block lg:hidden "
              type="button"
              onClick$={toggleLoginQRL}
            >
              <LockIcon></LockIcon>
            </button>
          )}
        </div>
    
        <div class={`contentTop absolute h-full top-0 right-0 items-center ${!props.isAuth ? "hidden lg:flex" : "flex"}`}>
          {/* hide for mobile when not authenticated */}
          <div class="triangle"></div>
          {!props.isAuth && (
            <ul class="px-2.5 h-full flex-center gap-2">
              <li>
                <button
                  class=" btnSecondary  py-1.5 px-3  rounded-full font-medium   flex-center gap-1.5 md:text-base md:px-5 animate fade-in-bottom"
                  type="button"
                  onClick$={toggleLoginQRL}
                >
                  <LockIcon></LockIcon>
                  <span>{t('app.Login@@Login')}</span>{" "}
                </button>
              </li>
              <li>
                <button
                  class="btnPrimary py-1.5 px-3  rounded-full   font-medium   flex-center gap-1.5 md:text-base md:px-5 animate fade-in-bottom"
                  type="button"
                  onClick$={toggleRegQRL}
                >
                  <AddUserIcon></AddUserIcon> <span>{t('app.Join@@Join')}</span>
                </button>
              </li>
            </ul>
          )}
          {props.isAuth && (
            <>
              <ul class="menu px-2.5 h-full flex-center gap-2">
                <li>
                  <button
                    type="button"
                    onClick$={() => {
                      //TODO
                      //get balance
                    }}
                  ></button>
                </li>
                <li class="pr-4 lg:block hidden relative">
                  <div class="mr-1 flex-center">
                    <button
                      type="button"
                      class="mr-2 flex-center"
                      onClick$={() => {
                        actionGetBal.value = true;
                      }}
                    >
                      <div class="walletIcon  rounded-full p-2 flex-center">
                        <WalletIcon class=""></WalletIcon>
                      </div>
                      <Resource
                        value={currentBalance}
                        onPending={() => <div>Loading...</div>}
                        onRejected={() => <div>Error</div>}
                        onResolved={(balance) => (
                          <>
                            <span class="px-1 pr-2"> 
                        {   priceFormat( balance  , {
                                          prefix: `${props.currencyCode}`,
                                          centsLimit: 2,
                                        }) 
                                      }
                            </span>
                          </>
                        )}
                      />
                      <div class="">
                        <ReloadIcon></ReloadIcon>
                      </div>
                    </button>
                    <div class="text-xxxs cursor-pointer" onClick$={async()=>{
                      await toggleWalletMenu();
                    }}>
                      <ArrowDown2Icon />
                    </div>
                    <WalletMenu />
                  </div>
                </li>
                <li class="pr-4 lg:block hidden relative"> 
            <button type="button" class=" flex-center mr-1" onClick$={async()=>{
              await toggleGamesTransMenu();
            }}> 
              <div class="walletIcon  rounded-full p-2 flex-center">
              <Game2Icon class=""></Game2Icon> 
              </div>
              <span class="px-1 pr-2">{t('app.Game transfer@@Game transfer')}</span>
              <div class="text-xxxs"><ArrowDown2Icon></ArrowDown2Icon></div>
            
            </button>
            <GamesTransferMenu   ></GamesTransferMenu>
          </li>
                <li class="pr-4 lg:block hidden">
                  <button
                    type="button"
                    class="flex items-center"
                    onClick$={toggleTrxPopupQRL}
                  >
                    <div class="walletIcon  rounded-full p-2 mr-1">
                      <TransactionIcon></TransactionIcon>
                    </div>
                    <span class="px-1 pr-2">{t('app.Transaction@@Transaction')}</span>
                    <div class="text-xxxs">
                      <ArrowDown2Icon></ArrowDown2Icon>
                    </div>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    class="flex items-center"
                    onClick$={toggleProfilePopupQRL}
                  >
                    <div class="">
                      <ProfileAvatar
                        class="mr-1"
                        memberLevel={props.memberLevel || ""}
                      ></ProfileAvatar>
                    </div>
                    <span class="px-1 pr-2 lg:w-28">{props?.username}</span>
                    <div class="text-xxxs lg:block hidden">
                      <ArrowDown2Icon></ArrowDown2Icon>
                    </div>
                  </button>
                </li>
              </ul>
            </>
          )}
        </div>
     
            
      </div>

      <div class="relative -z-1 w-full h-0 blkPadding"></div>

      {/* Header Inner - Mobile */}
      {props.isAuth && (
        <>
          <div class="grid grid-cols-2 lg:hidden w-full p-2  contentInner">
            <div
              class="col-span-1 flex items-center"
              onClick$={() => {
                actionGetBal.value = true;
              }}
            >
              <div class="walletIcon   flex-center rounded-full  p-2">
                <WalletIcon></WalletIcon>
              </div>
              <div class="flex-center mx-2">
                <Resource
                  value={currentBalance}
                  onPending={() => <div>Loading...</div>}
                  onRejected={() => <div>Error</div>}
                  onResolved={(balance) => <>
                          {   priceFormat( balance  , {
                                        prefix: `${props.currencyCode}`,
                                        centsLimit: 2,
                                      }) 
                                    }
                  </>}
                />
              </div>
              <ReloadIcon class="iconAction"></ReloadIcon>
            </div>
            <div class="col-span-1 relative">
            <button onClick$={async()=>{
              await toggleGamesTransMenu();
            }} class=" w-full  flex items-center justify-end ">
            <div class="walletIcon  rounded-full p-2 flex-center">
            <Game2Icon class="   "></Game2Icon>
            </div>
              <div class="inline-grid align-middle mx-1">{t('app.Game transfer@@Game transfer')}</div>
              <div class="inline-grid align-middle text-xxxs">
                <ArrowDown2Icon></ArrowDown2Icon>
              </div>

            </button>
             <GamesTransferMenu   ></GamesTransferMenu>
            </div>
          
          </div>
        </>
      )}

       {/*Header Bottom - Nav Menu */}
 <MainNav
  class={`relative    `}
  isMobile={isMobile}
                isOnCustomMenu1={commonData.website_settings.isOnCustomMenu}
                isOnCustomMenu2={commonData.website_settings.isOnCustomMenu2}
                
                langOpts={commonData.agent_lang_opts} 
              ></MainNav>
      </div>
    </>
  );
});
