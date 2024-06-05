import { component$, useStylesScoped$, useSignal } from '@builder.io/qwik'; 
import { useLocation } from '@builder.io/qwik-city';
import { useNavTab} from "../../../hooks/business/useNavTab";
import styles from './ProfileMenu.scss?inline';
import TabsMenu from "../../../components/tabs-menu/variant-3/TabsMenu1";
import {
    inlineTranslate,  
  } from 'qwik-speak';
  
export default component$(() => {
    useStylesScoped$(styles);
    const t = inlineTranslate();
    const tabMenus = [
        { title:  t('app.My Profile@@My Profile'), value: "/profile/", url:"/profile"},
        { title:t('app.Change Password@@Change Password')  , value: "/profile/change-password/", url:"/profile/change-password"},
        { title: t('app.Referral Downline@@Referral Downline') , value: "/profile/referral-downline/", url:"/profile/referral-downline"},
        { title:t('app.Member Level@@Member Level') , value: "/profile/member-level/", url:"/profile/member-level"},
        { title: t('app.My Promo@@My Promo'), value: "/profile/my-promo/", url:"/profile/my-promo"},
        { title:t('app.My Bonus@@My Bonus') , value: "/profile/my-bonus/", url:"/profile/my-bonus"}
    ];

    const currentLocation = useLocation();
    const selMenu = useSignal("TermsConditions");
    const { onSelCategoryQRL } = useNavTab(selMenu);

    return <>
        <div class="hidden lg:block mr-5 ">
            <TabsMenu class={`innerContent__profile`} menus={tabMenus} onClickMenu$={onSelCategoryQRL} selMenus={[currentLocation.url.pathname]} ></TabsMenu>
        </div>
    </>;
})