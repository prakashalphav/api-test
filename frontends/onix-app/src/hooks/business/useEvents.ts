import { useSignal , $, type Signal,} from '@builder.io/qwik';
import type { Promo } from '~/services/types';
import type { ApiData} from "~/services/types";


export const createSignals = (list: Promo[]|undefined|null) => {
    const selMenu = useSignal<string>("all"); //default is "all" 
    const dataList = useSignal<Promo[]>(list?.length? list :[]);
    const checkAllSignal = useSignal<boolean>(false);
    return { selMenu, dataList, checkAllSignal }
}

// interface Promo extends Record<string, unknown>{
//     category: string,
//     title?: string,
//     desc?: string,
//     banner? : string
// }
export const usePromotions = (list : Promo[]|undefined|null, selCategory: Signal<string>, dataList: Signal<Record<string, unknown>[]>) => {

 
    const onSelCategoryQRL =  $((selMenu : string)=>{
       
        selCategory.value = selMenu;
        dataList.value = (list?.length?list: [] ).filter((promo:any) => {
            if(selCategory.value === 'all'){
                return true;
            }else{
                return promo.category?.toLowerCase().includes(selCategory.value);
            }
        })
        console.log("onSelCategoryQRL",selCategory.value, list, list.length,dataList.value)
    });
    
     
    return {
        onSelCategoryQRL,  
    };

}


