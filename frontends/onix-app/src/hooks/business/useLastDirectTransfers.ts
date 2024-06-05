32
import { useSignal, $, useResource$ } from '@builder.io/qwik';
import type { ApiData, LastDirectTransferResult ,LastDirectTransferTrx } from "~/services/types";
import CustomError from '~/utils/customError';

export type Props = {

    data : LastDirectTransferResult,
}
export function getLastTransferItemDetails(item:LastDirectTransferTrx){

    if([90, 91, 92].includes(item.status)){

        return item.transaction_type_name
    }
    
    return item.fund_method_details;
}

export function getLastTransferItemActions(item:LastDirectTransferTrx){

    if(item.payment_gateway && [1,5].includes(item.status) ){

        return item.actions;
    }
    
    return item.rejected_reason;
}
export function useLastDirectTransfers(props :Props) {
    const statementData = useSignal<LastDirectTransferResult>();

    // const isWaitingCheck = useSignal<boolean>(false);

    const currentPage = useSignal<number>(1);
    const pageCount = useSignal<number>(3);
    const rowsPerPage = useSignal<number>(5);
    const totalItem = useSignal<number>(0);

    const currentTableData = useSignal<LastDirectTransferTrx[]|undefined>([]);

    const setPage = $(async (page: number, pageSize?: number) => {
        //set number of pages
        rowsPerPage.value = pageSize ?? rowsPerPage.value;
        pageCount.value =
            totalItem.value < rowsPerPage.value ? 1 : Math.ceil(totalItem.value / rowsPerPage.value);
        //set current page
        currentPage.value = page;
        const firstPageIndex = (currentPage.value - 1) * rowsPerPage.value;
        const lastPageIndex = firstPageIndex + rowsPerPage.value;
        currentTableData.value = statementData.value?.transactions.slice(
            firstPageIndex,
            lastPageIndex
        );
    });

    statementData.value = props.data; 
     if(statementData.value .transactions){
        currentTableData.value = statementData.value.transactions;
        totalItem.value = statementData.value.transactions.length;
        setPage(1);
      }
      
      return {
        statementData,
        currentTableData, 
        currentPage,
        pageCount,
        rowsPerPage,
        setPage,
        totalItem,
        
    } 
}