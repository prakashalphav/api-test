import { component$, Resource, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./ProfilePopup1.scss?inline";
import { MyProfileIcon } from "../../../components/icons/MyProfile";
import { MessagesIcon } from "../../../components/icons/Messages";
import { MyPromotionIcon } from "../../../components/icons/MyPromotion";
import { InfoIcon } from "../../../components/icons/Info";
import { GameIcon } from "../../../components/icons/Game";
import { ReloadIcon } from "../../../components/icons/Reload";
import { useProfilePopup } from "../../../hooks/business/useSideNav";
import { DiamondIcon } from "../../../components/icons/Diamond";
import { WalletIcon } from "../../../components/icons/Wallet";
import { useGetBalance } from "~/hooks/utils/useGetBalance";
import { CloseIcon } from "~/components/icons/Close";
import { useNotificationCtx } from "~/hooks/business/useNotifications";
import { priceFormat } from "~/utils/formatters/priceFormat";
import { inlineTranslate } from "qwik-speak";
import WalletSlider from "~/components/wallet-slider/variant-1/WalletSlider1";
import { useCommonViewData } from "~/hooks/app/useCommonViewData";

type Props = {
  zIndex: number;
  memberLevel?: string;
  userBal?: string;
  currencyCode?: string;
  username?: string;
  email?: string;
};
export default component$((props: Props) => {
  useStylesScoped$(styles);
  const t=  inlineTranslate();
  const { showProfilePopup, profilePopup, toggleProfilePopupQRL } =
    useProfilePopup();
  const { currentBalance, actionGetBal,   } = useGetBalance(
    props?.currencyCode + " " + props?.userBal
  );
  const { notificationCtx } = useNotificationCtx();
  const {commonData} = useCommonViewData(); 
  return (
    <>
    
      {showProfilePopup.value && (
        <>
          <div
            class="lg:hidden fixed inset-0 transition-opacity bg-black bg-opacity-40 backdrop-blur-sm"
            style={"z-index:" + props.zIndex + ";"}
          />
          <div ref={profilePopup}>
            <aside
              class={`overflow-x-hidden overflow-y-auto scroller fixed h-auto right-0  lg:hidden popUpMenuMobile top-0`}
              style={"z-index:" + props.zIndex + ";"}
            >
              <div class="relative p-4 py-10">
                {/* <div class="-top-3 left-7 absolute pr-1.5">
            <div class={"w-14 h-14 z-10 rounded-full  relative p-[1px] new-lvl"}> 
                    <img src="/images/avatars/Guy2.png" class="w-full"/>
                    <div class=" lvl-icon absolute bottom-0 right-0 w-5 h-5   translate-x-1/4   p-[1px] rounded-full"> 
                         <div class="bg-black rounded-full w-full h-full flex-center text-xs "><DiamondIcon></DiamondIcon></div>
                    </div>
                    </div>
            </div> */}
                <button
                  onClick$={toggleProfilePopupQRL}
                  class="absolute text-3xl right-4 top-2"
                >
                  <CloseIcon></CloseIcon>
                </button>
                <div class="inner__popUpMenuMobile relative  p-5 rounded-lg w-full">
                  <div class="absolute right-2 top-14 opacity-25" style="font-size:12rem;">
                    <WalletIcon></WalletIcon>
                  </div>
                  {/* <div class="pb-5 leading-8 relative">
                    <div class="">{t('app.Wallet Balance@@Wallet Balance')}</div>
                    <div class="flex text-2xl font-bold items-center">
                      <Resource
                        value={currentBalance}
                        onPending={() => <div>Loading...</div>}
                        onRejected={() => <div>Error</div>}
                        onResolved={(balance) => <>     {   priceFormat( balance  , {
                          prefix: `${props.currencyCode}`,
                          centsLimit: 2,
                        }) 
                      }</>}
                      />
                      <button
                        type="button"
                        class="text-lg pl-2"
                        onClick$={() => {
                          actionGetBal.value = true;
                        }}
                      >
                        <ReloadIcon></ReloadIcon>
                      </button>
                    </div>
                  </div> */}
                  <WalletSlider class="pb-5 leading-5 relative" />
                  <div class="pb-5 leading-5 relative">
                    <div>{t('app.Name@@Name')}</div>
                    <div class="flex font-bold">{props.username}</div>
                  </div>
                  <div class="pb-5 leading-5 relative">
                    <div>{t('app.Email@@Email')} </div>
                    <div class="flex font-bold">{props.email}</div>
                  </div>
                  {/* <div class="pb-5 leading-5 relative">
                    <div>Contact Number</div>
                    <div class="flex font-bold">+1234567890</div>
                  </div> */}
                </div>

                <ul class="sidenav-menu mt-6">
                  <li class="p-3 mb-1 bg-[var(--bg-head)] rounded-lg">
                    <a href="/deposit/" class="">
                    {t('app.Deposit@@Deposit')} 
                    </a>
                  </li>
                  <li class="p-3 mb-1 bg-[var(--bg-head)] rounded-lg">
                    <a href="/withdraw/" class="">
                    {t('app.Withdraw@@Withdraw')} 
                    </a>
                  </li>
                  <li class="p-3 mb-1 bg-[var(--bg-head)] rounded-lg">
                    <a href="/lastDirectTransfer/" class="">
                    {t('app.Last Direct Transfers@@Last Direct Transfers')} 
                    </a>
                  </li>
                  <li class="p-3 mb-1 bg-[var(--bg-head)] rounded-lg">
                    <a href="/statement/" class="">
                    {t('app.Statement@@Statement')} 
                    </a>
                  </li>
                  <li class="p-3 mb-1 bg-[var(--bg-head)] rounded-lg">
                    <a href="/profile/" class="">
                    {t('app.My Profile@@My Profile')}  
                    </a>
                  </li>
                  <li class="p-3 mb-1 bg-[var(--bg-head)] rounded-lg">
                    <a href="/profile/change-password/" class="">
                    {t('app.Change Password@@Change Password')}  
                    </a>
                  </li>
                  {commonData.website_settings?.isOffReferralMenu != '1' && 
                    <>
                    <li class="p-3 mb-1 bg-[var(--bg-head)] rounded-lg">
                      <a href="/profile/" class="">
                      {t('app.Referral Code@@Referral Code')}  
                      </a>
                    </li>
                    <li class="p-3 mb-1 bg-[var(--bg-head)] rounded-lg">
                      <a href="/profile/referral-downline/" class="">
                      {t('app.Referral Downline@@Referral Downline')}  
                      </a>
                    </li>
                    </>
                  }
                  <li class="p-3 mb-1 bg-[var(--bg-head)] rounded-lg">
                    <a href="/memo/" class="relative">
                    {t('app.Memo@@Memo')}    {notificationCtx?.inboxCnt > 0 && <span class="absolute flex-center  h-5 w-5 top-0 right-0 -translate-y-1/2 translate-x-full"><span class="animate-ping absolute  h-full w-full rounded-full bg-red-500 opacity-75 text-xs text-white"></span><span class="relative flex-center rounded-full h-5 w-5 bg-red-500 text-xs text-white">{notificationCtx.inboxCnt}</span>
                        </span>}
                    </a>
                  </li>
                  <li class="p-3 mb-1 bg-[var(--bg-head)] rounded-lg">
                    <a href="/profile/my-promo/" class="">
                    {t('app.My Promo@@My Promo')} 
                    </a>
                  </li>
                  <li class="p-3 mb-1 bg-[var(--bg-head)] rounded-lg">
                    <a href="/profile/my-bonus/" class="">
                    {t('app.My Bonus@@My Bonus')}  
                    </a>
                  </li>
                  <li class="p-3 bg-[var(--bg-head)] rounded-lg">
                    <a href="/profile/member-level/" class="">
                    {t('app.Member Level@@Member Level')}  
                    </a>
                  </li>
                </ul>
              </div>
            </aside>
            <aside
              class={`popUpMenu overflow-hidden fixed h-auto right-0 top-20 mt-1 hidden lg:block rounded-xl`}
              style={"z-index:" + props.zIndex + ";"}
            >
              <div class="p-2">
                <ul class="">
                  <li class="p-2 mb-1 rounded-lg">
                    <a href="/profile" class="flex items-center">
                      <div class=" mr-3 rounded-full icon__popUpMenu p-[10px] text-xl">
                        <MyProfileIcon></MyProfileIcon>{" "}
                      </div>
                      <span class="">{t('app.My Profile@@My Profile')}</span>
                    </a>
                  </li>
                  <li class="p-2 mb-1 rounded-lg">
                    <a href="/memo/" class="flex items-center ">
                      <div class="mr-3 rounded-full icon__popUpMenu p-[10px] text-xl">
                        <MessagesIcon></MessagesIcon>{" "}
                      </div>
                      <div class=" relative">
                      {t('app.Memo@@Memo')}    
                        {notificationCtx?.inboxCnt > 0  &&  <span class="absolute flex-center  h-5 w-5 top-0 right-0 -translate-y-3/4 translate-x-3/4">
                          <span class="animate-ping absolute  h-full w-full rounded-full bg-red-500 opacity-75 text-xs text-white"></span>
                          <span class="relative flex-center rounded-full h-5 w-5 bg-red-500 text-xs text-white">{notificationCtx.inboxCnt}</span>
                        </span>}
                      </div>
                    </a>
                  </li>
                  <li class="p-2 mb-1 rounded-lg">
                    <a href="/profile/my-promo" class="flex items-center">
                      <div class="mr-3 rounded-full icon__popUpMenu p-[10px] text-xl">
                        <MyPromotionIcon></MyPromotionIcon>{" "}
                      </div>
                      <span class="">{t('app.My Promo@@My Promo')} </span>
                    </a>
                  </li>
                  <li class="p-2 mb-1 rounded-lg">
                    <a href="/info/how-sportsbook" class="flex items-center">
                      <div class="mr-3 rounded-full icon__popUpMenu p-[10px] text-xl">
                        <GameIcon></GameIcon>{" "}
                      </div>
                      <span class=""> {t('app.How to play@@How to play')} </span>
                    </a>
                  </li>
                  <li class="p-2 mb-1 rounded-lg">
                    <a href="/info/terms-conditions" class="flex items-center">
                      <div class="mr-3 rounded-full icon__popUpMenu p-[10px] text-xl">
                        <InfoIcon></InfoIcon>{" "}
                      </div>
                      <span class="">{t('app.Info Center@@Info Center')} </span>
                    </a>
                  </li>
                </ul>
              </div>
              <a
                href="/logout"
                class="flex-center p-4 logout-btn font-semibold"
              >
              {t('app.Logout@@Logout')} 
              </a>
            </aside>
          </div>
        </>
      )}
    </>
  );
});
