import { component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./ProfilePopup2.scss?inline";
import { MessagesIcon } from "../../../components/icons/Messages3";
import { useProfilePopup } from "../../../hooks/business/useSideNav";
import { useNotificationCtx } from "~/hooks/business/useNotifications";
import { inlineTranslate } from "qwik-speak";
import { ProfileIcon } from "~/components/icons/Profile";
import { SettingsIcon } from "~/components/icons/Settings";
import { LogoutIcon } from "~/components/icons/Logout";
import { MemberLevelIcon } from "~/components/icons/MemberLevel2";
import { Referral2Icon } from "~/components/icons/Referral2";
import { Promotion3Icon } from "~/components/icons/Promotion3";
import { BonusIcon } from "~/components/icons/Bonus";
import { useCommonViewData } from "~/hooks/app/useCommonViewData";
import Tooltip from "~/components/tooltip/variant-1/Tooltip1";
type Props = {
  zIndex: number;
};
export default component$((props: Props) => {
  useStylesScoped$(styles);
  const t=  inlineTranslate();
  const { showProfilePopup, profilePopup, toggleProfilePopupQRL } =
    useProfilePopup();
  const { notificationCtx } = useNotificationCtx();
  const { commonData } = useCommonViewData();
  return (
    <>
    
      {showProfilePopup.value && (
        <>
        <div style={"z-index:" + props.zIndex + ";"}>
       
          <div
            class="lg:hidden overlay fixed inset-0 transition-opacity bg-black bg-opacity-40 "
            style={`z-index:${props.zIndex + 1};`}></div>
  
            <Tooltip id="profileMenu2ToolTip" ref={profilePopup} class="rounded-md w-max profilePopupMenu" position={"bottom-right"} size={"lg"} style={`min-width: 245px;z-index:${props.zIndex + 1};`}>
            <aside
              class={`popUpMenu overflow-hidden  h-auto mt-1 block rounded-xl`}
              style={"z-index:" + props.zIndex + ";"}
            >
              <div class="p-2">
                <ul class="">
                <li class="p-3 rounded-lg">
                    <a href="/profile/" class="flex items-center menuTab">
                      <div class=" mr-3 icon text-lg">
                        <ProfileIcon></ProfileIcon>{" "}
                      </div>
                      <span class="">{t('app.My Profile@@My Profile')}</span>
                    </a>
                  </li>
                <li class="p-3 rounded-lg">
                    <a href="/profile/my-promo/" class="flex items-center menuTab">
                      <div class=" mr-3 icon text-lg">
                        <Promotion3Icon></Promotion3Icon> {" "}
                      </div>
                      <span class="">{t('app.My Promo@@My Promo')}</span>
                    </a>
                  </li>
                  <li class="p-3 rounded-lg">
                    <a href="/profile/my-bonus/" class="flex items-center menuTab">
                      <div class=" mr-3 icon text-lg">
                        <BonusIcon></BonusIcon> {" "}
                      </div>
                      <span class="">{t('app.My Bonus@@My Bonus')}</span>
                    </a>
                  </li>
                  <li class="p-3 rounded-lg">
                    <a href="/profile/member-level/" class="flex items-center menuTab">
                      <div class="mr-3  text-lg">
                        <MemberLevelIcon></MemberLevelIcon>{" "}
                      </div>
                      <span class="">{t('app.Member Level@@Member Level')} </span>
                    </a>
                  </li>
                  {commonData.website_settings?.isOffReferralMenu != '1' &&
                    <li class="p-3 rounded-lg">
                      <a href="/profile/referral-downline/" class="flex items-center menuTab">
                        <div class="mr-3  text-lg">
                          <Referral2Icon></Referral2Icon> {" "}
                        </div>
                        <span class="">{t('app.Referral Downline@@Referral Downline')} </span>
                      </a>
                    </li>
                  }
                  <li class="p-3 rounded-lg">
                    <a href="/profile/change-password/" class="flex items-center menuTab">
                      <div class="mr-3  text-lg">
                        <SettingsIcon></SettingsIcon> {" "}
                      </div>
                      <span class="">{t('app.Change Password@@Change Password')} </span>
                    </a>
                  </li>
                  <li class="p-3 rounded-lg">
                    <a href="/memo/" class="flex items-center menuTab">
                      <div class="mr-3  text-lg">
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
                  <li><div class="line"></div></li>
                  <li class="p-3 rounded-lg">
                    <a href="/logout/" class="flex items-center menuTab">
                      <div class="mr-3  text-lg">
                      <LogoutIcon></LogoutIcon>{" "}
                      </div>
                      <div class=" relative">
                        {t('app.Logout@@Logout')} 
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </aside>
        
          
          </Tooltip>
          </div>
        </>
      )}
    </>
  );
});
