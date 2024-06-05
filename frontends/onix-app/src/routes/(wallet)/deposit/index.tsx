import {   component$, useStylesScoped$,   } from "@builder.io/qwik";
import styles from "./deposit.scss?inline";
import Deposit from "../../../modules/deposit/variant-1/Deposit";
import { routeLoader$ } from "@builder.io/qwik-city";
import PopupBanner from "~/modules/popup-banner/variant-1/PopupBanner";


import { getDepositData } from "../../../services/contentDB"; 

import type { RequestEvent, RequestHandler } from "@builder.io/qwik-city";

import { storeDeposit } from "~/services/memberDB"; 
import { useGetWalletViewData } from "../layout";
import { 
  useSpeak,
} from 'qwik-speak';
import type { DepositData } from "~/services/types";
export const onPost: RequestHandler = async (ev: RequestEvent) => {
  try {
  const formData = await ev.request.formData();
  console.log("storeDeposit", formData);
  const apiData = await storeDeposit(ev, formData);
  console.log("storeDeposit", apiData);
  ev.json(200, apiData);
} catch (error) {
  ev.json(500, error); 
}
};

export const useGetDepositData = routeLoader$(async (ev) => {
  const {commonData} = await ev.resolveValue(useGetWalletViewData);
 
  const depositData = await getDepositData(ev);
  // if (!depositData.d) {
  //   throw ev.redirect(302, "/");
  // }

  const o = depositData.d as any;
  if (
    o.is_show_register_bank !== undefined &&
    o.is_show_register_bank === true
  ) {
    throw ev.redirect(302, "/register-acc?back_url=deposit");
  }
  // const depositData = ev.defer(d);
  return { commonData, depositData };
});

export default component$(() => {
  const resource = useGetDepositData();

  const { commonData, depositData } = resource.value;
  useStylesScoped$(styles);
  useSpeak({assets:['wallet', ],});

 
  return (
    <>  
      {(depositData.d as DepositData).popup_banner && (
        <PopupBanner
          banner={depositData.d.popup_banner.image}
          url={depositData.d.popup_banner.url}
          popUpBannerLocation={"deposit"}
        ></PopupBanner>
      )}
       <Deposit cd={commonData.d as any} de={depositData.d as any}></Deposit> 
      
    </>
  );
});
