import type { CommonViewData } from "~/services/types";

export const useGetCurrency= (cd : CommonViewData)=>{
    const currencyCode =  cd.website_settings.currencyCode;
    return {currencyCode};
}