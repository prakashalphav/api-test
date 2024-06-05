import { useContext , useSignal,   type Signal,$, useStore, useVisibleTask$, createContextId, useContextProvider  } from '@builder.io/qwik'; 
import type { ApiData, GameStatementItem, GetPlayerReportParams, PlayerReport, PlayerReportFilterOpts, PlayerReportItem } from "~/services/types";
 
import {createModalContext , useModal} from "../utils/useModal";
import type { Form} from '../utils/useForm';
import { useForm } from '../utils/useForm'; 
import { prepareForMapping } from '~/utils/common';

export const SHOW_HISTORY_MODAL = createContextId<Signal<boolean>>('showHistoryModal');

// import { globalAction$ } from '@builder.io/qwik-city';

// export const useLoginAction = globalAction$((loginData) => {
 
//  });
 
export const useSignals = ()=>{

    const showModal    = useContext<Signal<boolean>>(SHOW_HISTORY_MODAL);


    return {showModal};
}

export const createHistoryModalCtx = () =>{

    //use this is the first parent component that uses the modal only
    // as this modal is not globally used, hence its context not need to create in app level, just the compnent level


   const {showModal } = createModalContext(SHOW_HISTORY_MODAL);

    return {showModal };
}
export type Props = {
    item :Signal<GameStatementItem  & {outstanding_view : string ,  }  >, 
  };

export const usePlayerReport=(props :Props)=>{
    
    const searchForm = useSignal<HTMLFormElement>();

    const currentTableData = useSignal< PlayerReportItem[] | undefined>([]);
    const currentPage = useSignal<number>(1);
    const pageCount = useSignal<number>(3);
    const rowsPerPage = useSignal<number>(5);
    const totalItem = useSignal<number>(0); 

    const reportResult = useSignal<ApiData<PlayerReport>>({ d: null });
    const reportOptsResult = useSignal<ApiData<PlayerReportFilterOpts>>({ d: null });
    const isWaiting = useSignal<boolean>(false);

    const dateRangePickerRef = useSignal<HTMLElement|undefined>();
    const searchBy = useSignal<{label:string,value:any}>(); 

    const providerSelOpts = useSignal<{label:string,value:any}[]>([]); 

 
    const winLoseSelOpts = [{label : "ALL", value : "0" },{label : "Win", value : "1" },{label : "Lose", value : "2" },{label : "Draw", value : "3" }]

    const searchBySelOpts =[{label : "Ticket Id", value : "ticket_id" },] ;
    if(!props.item.value?.outstanding_view ){ 
      searchBySelOpts.push({label : "Win/lose status", value : "win_lose_status" });
    }
    console.log( 'outstanding_view usePlayerReport', props.item)


    const onChangeSearchByQRL = $((value)=>{
      searchBy.value = {
        label :"",
        value :value
    }; 

    })

    const cbSelectedSearchByQRL  = $( (item) => { 

      if(!searchBy.value){
          searchBy.value = searchBySelOpts[0];
      } 
      return searchBy.value.value == item.value;

    })
    const setPage = $(async (page: number, pageSize?: number) => {
        //set number of pages
        rowsPerPage.value = pageSize ?? rowsPerPage.value;
        pageCount.value =
            totalItem.value < rowsPerPage.value ? 1 : Math.ceil(totalItem.value / rowsPerPage.value);
        //set current page
        currentPage.value = page;
        const firstPageIndex = (currentPage.value - 1) * rowsPerPage.value;
        const lastPageIndex = firstPageIndex + rowsPerPage.value;
        currentTableData.value = reportResult.value.d?.player_report_data.slice(
            firstPageIndex,
            lastPageIndex
        );
    });
    const getHistoryDataQRL = $(async () => {
        isWaiting.value = true;
  
        const formData  = new FormData(searchForm.value); 
        const provider = formData.get('provider');
        const ticketId = formData.get('ticket_id');  
        const winLoseStatus = formData.get('win_lose_status');  
        console.log('getHistoryFilterOptsQRL provider' , provider, ticketId, winLoseStatus)
         
      
        const postData  :GetPlayerReportParams = {
            filter_date_start : props.item.value.strtime_date,
            filter_date_end : props.item.value.strtime_date_end,
            currency : props.item.value.currency,
            category : props.item.value.category_id,
            provider : provider?.toString()||"0",//get from selection
            outstanding_view : props.item.value.outstanding_view,
            provider_option : provider?.toString()||"0",//get from selection
            search_option:searchBy.value?.value ,
            ticket_value: ticketId?.toString()||"",
            win_lose_status : winLoseStatus?.toString()||""
        };
      
        const controller = new AbortController();
        fetch("/getPlayerReport" , {
          signal: controller.signal,
          body: JSON.stringify(postData)  ,
          method: "post",
          headers :  { 
            "Content-Type" : "application/json",
          }
        })
          .then((response) => response.json())
          .then((json) => {
            console.log('forgot-pwd', json)
            reportResult.value = json; 
            totalItem.value = reportResult.value.d?.player_report_data.length||0; 
            setPage(1);
          })
          .catch((error) => {
            //TODO
            console.error(error);
          })
          .finally(() => {
            isWaiting.value = false;
            controller.abort(); // Abort the request
            // Clean up any other resources associated with the request
          });
       
       
      });

      const getHistoryFilterOptsQRL = $(async () => {
       
  
        const formData  = new FormData(searchForm.value); 
        const provider = formData.get('provider'); 
         

        console.log('getHistoryFilterOptsQRL provider' , provider)
        const postData  :GetPlayerReportParams = {
            filter_date_start : props.item.value.strtime_date,
            filter_date_end : props.item.value.strtime_date_end,
            currency : props.item.value.currency,
            category : props.item.value.category_id,
            provider : provider?.toString()||"0",//get from selection
            outstanding_view : props.item.value.outstanding_view,
        };
      
        const controller = new AbortController();
        fetch("/getPlayerReportFilterOpts" , {
          signal: controller.signal,
          body: JSON.stringify(postData)  ,
          method: "post",
          headers :  { 
            "Content-Type" : "application/json",
          }
        })
          .then((response) => response.json())
          .then((json) => {
            console.log('forgot-pwd', json)
            reportOptsResult.value = json;

              console.log("prepareForMapping", reportOptsResult.value.d?.games)

              if( reportOptsResult.value.d?.games){
  
  
                
                  const opts = [{label:"ALL", value: 0 }] 
                  
                  prepareForMapping(reportOptsResult.value.d?.games).map((opt,index)=>{
  
                      opts.push({label : opt , value : opt})
                  })
              
                  providerSelOpts.value = opts;
  
                  console.log("prepareForMapping", providerSelOpts.value,opts)
              }
              

     
          })
          .catch((error) => {
            //TODO
            console.error(error);
          })
          .finally(() => {
          
            controller.abort(); // Abort the request
            // Clean up any other resources associated with the request
          });
       
       
      });
 
     
      return {searchForm,reportResult,reportOptsResult,isWaiting,getHistoryDataQRL,          setPage,
        currentTableData,
        currentPage,
        pageCount,
        rowsPerPage,dateRangePickerRef ,getHistoryFilterOptsQRL,providerSelOpts,searchBy , winLoseSelOpts,searchBySelOpts,cbSelectedSearchByQRL,onChangeSearchByQRL };
  
}
export function usePlayerReportModal( _showModal? : Signal<boolean>) {
 
    let showModal  ;

    if(!_showModal){
        const  {showModal : __showModal} = useSignals();
        showModal =  __showModal;
    }
    else {
        showModal = _showModal;
    } 

    const {toggleModalQRL} = useModal(showModal);
 
    
    return {showModal ,toggleModalQRL  };
}


 export function parsePlayerReportStatus (status : number, winLose  :number  ){

    let statusText="";
    switch (status) {
        case 1:
            case 2:
                case 4:
                    case 5: 

                    statusText = winLose == 0  ? "DRAW" : (winLose>0 ? "WIN" : "LOSE")
            break;
            case 3:
              statusText =   "Running"

            break;
            case 6:
                case 7:
                    statusText = "CANCEL";
                    break;
                    case 1:
                        case 8:
                            statusText = "VOID";
                            break;
        default:
            break;
    }

    return statusText;

 }