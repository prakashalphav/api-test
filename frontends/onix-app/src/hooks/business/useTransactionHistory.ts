import { useSignal, $ } from '@builder.io/qwik';
import type { ApiData, GameStatement, GameStatementItem, TransactionStatement, TransactionStatementItem } from "~/services/types";
import { createHistoryModalCtx,  type Props as PlayerReportProps , usePlayerReportModal } from '~/hooks/business/usePlayerReport';
import CustomError from "~/utils/customError";
import { addDays    } from 'date-fns'
export function useTransactionHistory() {
    const searchForm = useSignal<HTMLFormElement>();
    const allLevelSetting = useSignal<Record<string, null>[] | undefined>();
    const selLevelView = useSignal<Record<string, null> | undefined>();
    const result = useSignal<ApiData<Record<string,unknown>>>({ d: null });
    const statementData = useSignal<TransactionStatement |GameStatement>();
    const isWaitingCheck = useSignal<boolean>(false);
    const currentPage = useSignal<number>(1);
    const pageCount = useSignal<number>(3);
    const rowsPerPage = useSignal<number>(5);
    const totalItem = useSignal<number>(0);
    const currentTableData = useSignal<TransactionStatementItem[]  |GameStatementItem[] | undefined>([]);
    const transactionType=useSignal<number>();
    const {showModal}= createHistoryModalCtx();
    const  { toggleModalQRL :togglePRModalQRL  } = usePlayerReportModal(showModal);
    
    
    const selectedGameStatement = useSignal<PlayerReportProps["item"]>();
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

    const getTransactionStatement = $(async () => {
        isWaitingCheck.value = true;
        console.log('gets', 'getTransactionStatement',)
        
            const formData2 = new FormData(searchForm.value);
            const _date = formData2.get('date_range');
            const splitDateRange = _date.split(" - ");
           
            transactionType.value = parseInt(formData2.get('transaction_type')||"");
            console.log('gets', formData2 ,formData2.get('transaction_type'),transactionType.value )
            let startTime  = 'T00:00';
            let endTime =  'T00:00';
            if( transactionType.value == 1 ) { // Game History - cut off time is 12pm - 11:59pm
                startTime = "T12:00";
                endTime = "T11:59"; 
            }

            const utcStartDt =    new Date( splitDateRange[0] +startTime).toISOString();
            const utcEndDt =  addDays(  new Date( splitDateRange[1] +endTime), 1).toISOString();

            const postData = {
                transaction_type : transactionType.value,
                start_date : utcStartDt, 
                end_date  : utcEndDt, 

            };
            console.log('gets',postData,)
            const resp = await fetch("/getStatement", { 
                body: JSON.stringify(postData)  ,
                method: "post", 
                headers :  { 
                    "Content-Type" : "application/json",
                  }
            });

            console.log('gets',resp,)
         
            result.value = await resp.json();
            if (result.value.d ) {
                statementData.value = result.value.d;
                if (statementData.value?.transactions) {
                    currentTableData.value = statementData.value.transactions;
                    totalItem.value = statementData.value.transactions.length
                    setPage(1);
                }
            } 
        isWaitingCheck.value = false; 
    })


    const onSelectGameAmt = $(async(amount :number ,item :GameStatementItem , outstanding_view : string)=>{


        console.log( 'outstanding_view onSelectGameAmt', outstanding_view)
        if(amount >0  || true){
 
            const mergedObj = { ...item,  ...{outstanding_view : outstanding_view} };
            selectedGameStatement.value= mergedObj  ;
            
            await togglePRModalQRL();

        }

        return false;
    })

    return {
        searchForm,
        allLevelSetting,
        selLevelView,
        getTransactionStatement,
        statementData,
        isWaitingCheck,
        setPage,
        currentTableData,
        currentPage,
        pageCount,
        rowsPerPage,
        transactionType,
        onSelectGameAmt,
        selectedGameStatement,
        result, 
    } 
}
