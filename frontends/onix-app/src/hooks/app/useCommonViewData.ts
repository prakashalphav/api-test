import {  useContextProvider,   useSignal, useContext, type Signal, $ } from "@builder.io/qwik";
import {  COMMON_VIEW_DATA} from  '../context';
 
import type {CommonViewData} from "~/services/types"; 
export const useCommonViewData= ()=>{

    const commonData    = useContext<CommonViewData>(COMMON_VIEW_DATA);

  
    
    return {commonData };

}

export const useCreateCommonDataCtx= (data : CommonViewData ) : CommonViewData =>{

    useContextProvider(COMMON_VIEW_DATA, data);

    return data;

}


 