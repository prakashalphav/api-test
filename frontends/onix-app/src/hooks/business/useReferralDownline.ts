import { useSignal, $ } from '@builder.io/qwik';
import type { ApiData } from "~/services/types";
import { filterByKeyword } from '~/utils/common';

export function useReferralDownline() {
  
        const searchForm = useSignal<HTMLFormElement>();
        const allLevelSetting = useSignal<Record<string, null>[] | undefined>();
        const selLevelView = useSignal<Record<string, null> | undefined>();
        const result = useSignal<ApiData<Record<string,unknown>>>({ d: null });
        const refData = useSignal<Record<string, null>[]>([]);
        const isWaitingCheck = useSignal<boolean>(false);
        const currentPage = useSignal<number>(1);
        const pageCount = useSignal<number>(3);
        const totalItem = useSignal<number>(0);
        const rowsPerPage = useSignal<number>(5);
        const currentTableData = useSignal<Record<string, null>[] | undefined>([]);
        const searchKeyWord = useSignal<string>("");
        const setPage = $(async (page: number,  pageSize?: number) => {
            totalItem.value = refData.value.length;
            //set number of pages
            rowsPerPage.value = pageSize ?? rowsPerPage.value;
            pageCount.value =
                totalItem.value < rowsPerPage.value ? 1 : Math.ceil(totalItem.value / rowsPerPage.value);
            //set current page
            currentPage.value = page;
            const firstPageIndex = (currentPage.value - 1) * rowsPerPage.value;
            const lastPageIndex = firstPageIndex + rowsPerPage.value;

            let list = refData.value || [];
            if(searchKeyWord.value && refData.value){
                list = filterByKeyword(refData.value,searchKeyWord.value )
            }   
            currentTableData.value = list.slice(
                firstPageIndex,
                lastPageIndex
            );
        });
        const onSearchQRL= $((evt : Event)=>{
            searchKeyWord.value = (evt.target as HTMLInputElement).value;
            
            setPage(currentPage.value )
        })
        const getRefData = $(async () => {
            isWaitingCheck.value = true;
            
                const formData2 = new FormData(searchForm.value);
                const resp = await fetch("/getReferralDownline", {
                    body: formData2,
                    method: "post",
                });
 
                result.value = await resp.json();
                if (result.value.d?.ref_down) {
                    refData.value = result.value.d?.ref_down; 
                    
                    setPage(1);
                } 
          
            isWaitingCheck.value = false;
        })

        return {
            searchForm,
            allLevelSetting,
            selLevelView,
            getRefData,
            refData,
            isWaitingCheck,
            setPage,
            currentTableData,
            currentPage,
            pageCount,
            rowsPerPage,
            onSearchQRL
        }
    
}
