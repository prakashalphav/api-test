import { useVisibleTask$ } from '@builder.io/qwik';
import { useSignal, $, useContext, type Signal } from "@builder.io/qwik";
import type { ApiData, BonusEventData, BonusHistoryData } from "~/services/types";
import { SHOW_BONUS_HISTORY_MODAL } from '../context';
import { createSignals as createBonusHistorySignals, useModal } from "../utils/useModal";

export const createSignals = () => {
  /*This should be called at a global context*/
  //test - const showModal = useSignal<boolean>(true);
  const { showModal } = createBonusHistorySignals();
  return { showModal };
};

export const useSignals = () => {
  const showBonusHistoryModal = useContext<Signal<boolean>>(SHOW_BONUS_HISTORY_MODAL);
  return { showBonusHistoryModal };
};

export function useBonus() {
  const init = () => {
    const form = useSignal<HTMLFormElement>();
    const result = useSignal<ApiData<Record<string,unknown>>>({ d: null });
    const isWaitingCheck = useSignal<boolean>(false);
    const isWaitingApply = useSignal<boolean>(false);
    const bonusEvent = useSignal<Record<string, unknown> | null>();
    const bonus = useSignal<BonusEventData>();
    const bonusHistory = useSignal<BonusHistoryData[]>([]);
    const { showBonusHistoryModal } = useSignals();
    const { toggleModalQRL: toggleBonusHistoryMdQRL } = useModal(showBonusHistoryModal);

    const onSubmitQRL = $(async () => {
      isWaitingCheck.value = true;
 
        const formData = new FormData(form.value);

        const resp = await fetch("/checkBonusEvent", {
          body: formData,
          method: "post",
        });
        
 
          result.value = await resp.json();
          // console.log(result.value);
          if(result.value.d?.status == 0){
            alert(result.value.d?.message);
          }else{
            bonusEvent.value = result.value.d;
            if (bonusEvent.value?.data) {
              bonus.value = bonusEvent.value?.data;
            }
          }
     
    
      isWaitingCheck.value = false;
    });
    const applyBonus = $(async () => {
      isWaitingApply.value = true;
      
        const formData = new FormData();
        formData.append("bonus_id", (bonus.value?.bonus_id ? bonus.value?.bonus_id : ''));
        formData.append("frontend", '1');


        const resp = await fetch("/applyBonusEvent", {
          body: formData,
          method: "post",
        });
        
       
          result.value = await resp.json();
          alert(result.value.d?.message);
          if(result.value.d?.status == 1){
            location.reload();
          }
        
    

      isWaitingApply.value = false;
    });
    const checkHistory = $(async () => {
      toggleBonusHistoryMdQRL();
    });

    return {
      onSubmitQRL,
      form,
      result,
      isWaitingCheck,
      isWaitingApply,
      bonusEvent,
      bonus,
      applyBonus,
      checkHistory,
      bonusHistory,
    };
  };

  return { init };
}
export function useBonusHistoryModal() {
  const { showBonusHistoryModal } = useSignals();
  const { toggleModalQRL: toggleBonusHistoryMdQRL } = useModal(showBonusHistoryModal);

  const currentPage = useSignal<number>(1);
  const pageCount = useSignal<number>(3);
  const rowsPerPage = useSignal<number>(5);
  const totalItem = useSignal<number>(0);
  const currentTableData = useSignal<BonusHistoryData[] | undefined>([]);
  const historyData = useSignal<BonusHistoryData[] | undefined>([]);
  const isWaiting = useSignal<boolean>(false);
  const setPage = $(async (page: number, pageSize?: number) => {
    //set number of pages
    rowsPerPage.value = pageSize ?? rowsPerPage.value;
    pageCount.value =
      totalItem.value < rowsPerPage.value
        ? 1
        : Math.ceil(totalItem.value / rowsPerPage.value);
    //set current page
    currentPage.value = page;
    const firstPageIndex = (currentPage.value - 1) * rowsPerPage.value;
    const lastPageIndex = firstPageIndex + rowsPerPage.value;
    currentTableData.value = historyData.value?.slice(
      firstPageIndex,
      lastPageIndex
    );
  });
  const getHistoryData = $(async () => {
    isWaiting.value = true;
    const controller = new AbortController();
    fetch("/checkBonusHistory" , {
      signal: controller.signal,
      body: "",
      method: "post",
      headers :  { 
        "Content-Type" : "application/json",
      }
    })
    .then((response) => response.json())
    .then((json) => {
      historyData.value = json.d;
      totalItem.value = historyData.value?.length||0; 
      setPage(1);
    })
    .catch((error) => {
      //TODO
      console.error(error);
    })
    .finally(() => {
      controller.abort(); // Abort the request
      // Clean up any other resources associated with the request
      isWaiting.value = false;
    });
  });

  useVisibleTask$(() => {
    console.log("ran here");
    getHistoryData();
  })

  return {
    showBonusHistoryModal,
    toggleBonusHistoryMdQRL,
    currentPage,
    pageCount,
    rowsPerPage,
    setPage,
    currentTableData,
    isWaiting
  };
}
