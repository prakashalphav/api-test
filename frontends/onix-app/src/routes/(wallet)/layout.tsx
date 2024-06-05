import { component$, Slot, useStyles$ } from "@builder.io/qwik";
import TabsMenu_M from "../../components/tabs-menu/variant-2/TabsMenu1";
import TabsMenu_PC from "../../components/tabs-menu/variant-3/TabsMenu1";
import moduleStyles from "./wallet.scss?inline";

import Title from "~/components/titles/variant-1/Title1";
import { routeLoader$, useLocation } from "@builder.io/qwik-city";
import { useGetCommonViewData } from "../layout";
import { makeAlertMsgCommonData } from "~/utils/sysUtils";
import { PATH_HOME } from "~/utils/constants/constants";
import {
  inlineTranslate,  
} from 'qwik-speak';
export const useGetWalletViewData  =  routeLoader$( async (ev)=>{
 
  const commonData= await ev.resolveValue(useGetCommonViewData);
  if(!commonData.d?.isAuth){
      throw ev.redirect(302,makeAlertMsgCommonData(commonData,PATH_HOME));
   }
    
   return {commonData};
 
} 
); 
export default component$(() => {
  useStyles$(moduleStyles);
  const t = inlineTranslate();
  const menuList = [
    { title:t('app.Deposit@@Deposit')  , value: "deposit", url: "/deposit/" },
    { title: t('app.Withdraw@@Withdraw') , value: "withdraw", url: "/withdraw/" },
    { title: t('app.Statement@@Statement'), value: "statement", url: "/statement/" },
    { title: t('app.Last Direct Transfers@@Last Direct Transfers'), value: "lastDirectTransfer", url: "/lastDirectTransfer/" },
  ];

  const selMenu = useLocation().url.pathname.replace(/\//g,"");

  return (
    <>   
    <div class="min-h-screen max-w-screen sm:mt-5 sm:rounded-2xl sm:p-4  content__pg mb-16">
        <div class="hidden lg:block">
        <Title class={`title__pg`}>
         {t('app.Wallet Transactions@@Wallet Transactions')}
      </Title>
      </div>
       <div class="  lg:flex lg:items-stretch "> 
        <TabsMenu_M menus={menuList} selMenu={selMenu} class="lg:hidden pb-2"></TabsMenu_M> 
       <div class="min-h-full hidden lg:block ">  
       <TabsMenu_PC class={`innerContent__wallet`}  menus={menuList} selMenu={selMenu}></TabsMenu_PC> 
       </div>
        <div class="px-2.5 lg:px-4 lg:flex-auto lg:min-w-0 min-h-full">
          <Slot></Slot>
        </div>
       </div>
      </div>
    </>
  );
});
