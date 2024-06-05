 
import { useCommonViewData } from "../app/useCommonViewData";

export const useFooter= ()=>{
    const {commonData}    = useCommonViewData();
    const paymentTypeUrls = ["https://files.sitestatic.net/sprites/bank_logos/payment_types/bank_col.png?v=2"];
    if(commonData.website_settings.e_wallet  == 1){
        paymentTypeUrls.push("https://files.sitestatic.net/sprites/bank_logos/payment_types/ewallet_col.png?v=3");
    }

    if(commonData.website_settings.pulsa  == 1){
        if(commonData.website_settings.currencyCode === 'HKD'){
            paymentTypeUrls.push("https://files.sitestatic.net/sprites/bank_logos/payment_types/fps_col.png?v=3");
        }else{
            paymentTypeUrls.push("https://files.sitestatic.net/sprites/bank_logos/payment_types/pulsa_col.png?v=2");
        }
    }

    if(commonData.website_settings.crypto  == 1){
        paymentTypeUrls.push("https://files.sitestatic.net/sprites/bank_logos/payment_types/cryptocurrency_col.png?v=3");
    }
    const year = new Date().getFullYear();
     

    const version = 1.45;
    return {commonData, paymentTypeUrls,version,year};
}