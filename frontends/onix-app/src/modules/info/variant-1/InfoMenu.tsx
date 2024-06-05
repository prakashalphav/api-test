import { component$, useStylesScoped$, useSignal} from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import styles from './InfoMenu.scss?inline';
import TabsMenu from "../../../components/tabs-menu/variant-1/TabsMenu1";
import { useNavTab} from "../../../hooks/business/useNavTab";
export default component$(() => {
    useStylesScoped$(styles);

    //promo list
    const tabMenus = [
        { title: "TERMS & CONDITIONS", value: "/info/terms-conditions/", url:"/info/terms-conditions"},
        { title: "FAQs", value: "/info/faq/", url:"/info/faq"},
        { title: "HOW TO PLAY", value: "/info/how-sportsbook/", url:"/info/how-sportsbook"},
        { title: "REFERRAL", value: "/info/referral/", url:"/info/referral"}
    ];
   
   
    const currentLocation = useLocation();
    const selMenu = useSignal("TermsConditions");
    const { onSelCategoryQRL } = useNavTab(selMenu);
    return <>

        <TabsMenu menus={tabMenus} onClickMenu$={onSelCategoryQRL} selMenus={[currentLocation.url.pathname]} uppercase={false} ></TabsMenu>
           
    </>;
})