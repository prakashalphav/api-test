Modules folder is for a UI that serve a group of related functionality and requires business hooks .

e.g. usePromotions for /modules/promotions/variant-1


# Use useCommonViewData hook for the CommonViewData in the modules instead of passing into it as Props. 
Code : 
import { useCommonViewData } from "~/hooks/app/useCommonViewData";
const {commonData} = useCommonViewData();


