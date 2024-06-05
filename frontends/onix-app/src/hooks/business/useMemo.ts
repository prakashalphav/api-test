import { useSignal , $, type Signal, useTask$} from '@builder.io/qwik';
import type { ApiData, MemoData } from '~/services/types';
import CustomError from '~/utils/customError';


export const arrangeMemoData = ( memoData : MemoData|null) => {
  
    
    const totalInbox = memoData?.inpox_msg_count;
    const totalAnnouncement = memoData?.sys_msg_count;
    const annoucementList = memoData?.sys_topics || [];
    const inboxList = memoData?.inbox || [];
    const _list:Record<string, unknown>[] = [];
    const _tabMenus = [
        { title: "Inbox ("+ totalInbox+")", value: "Inbox" },
        { title: "Announcement ("+totalAnnouncement+")", value: "Announcement" },
    ];
    inboxList.map((item)=>{
        item.category = 'Inbox';
        item.image = '/images/dummy_images/profile.png';
        _list.push(item);
    });
    annoucementList.map((item)=>{
        item.category = 'Announcement';
        item.image = '/images/dummy_images/profile.png';
        _list.push(item);
    });

 
    return {_list ,_tabMenus }
}

export const useMemos = ( memoData : MemoData|null, ) => {

    const  {_list ,_tabMenus } =  arrangeMemoData(memoData);
    const isWaiting = useSignal<boolean>(false);
    const selMenu = useSignal("Inbox"); 
    const selectAll = useSignal<boolean>(false);  
    const tabMenus = useSignal<Record<string, unknown>[]>(_tabMenus); 
    const dataList = useSignal<Record<string, unknown>[]>(_list); 
    const currentPage = useSignal<number>(1);
    const pageCount = useSignal<number>(3);
    const rowsPerPage = useSignal<number>(5);
    const currentTableData = useSignal<Record<string, unknown>[]>();
    const submitResult = useSignal<ApiData<any>>({ d: null });


    const setPage = $(async (page: number, pageSize?: number) => {
        const totalItem = dataList.value.length;
        //set number of pages
        rowsPerPage.value = pageSize ?? rowsPerPage.value;
        pageCount.value =
            totalItem < rowsPerPage.value
            ? 1
            : Math.ceil(totalItem / rowsPerPage.value);
        //set current page
        currentPage.value = page;
        const firstPageIndex = (currentPage.value - 1) * rowsPerPage.value;
        const lastPageIndex = firstPageIndex + rowsPerPage.value;
        currentTableData.value = dataList.value.slice(firstPageIndex, lastPageIndex);
    });

    const onSelCategoryQRL =  $((menu : string)=>{

        selMenu.value=   menu;
        dataList.value = _list.filter((item:any) => {
            if(selMenu.value === 'all'){
                return true;
            }else{
                return item.category === selMenu.value;
            }
          })
        setPage(currentPage.value);
    });

    const onCheckMemoQRL =  $((id: string, isSelectAll: boolean)=>{
        selectAll.value = isSelectAll;
        const newList: Record<string, unknown>[] = [];
        dataList.value.map((item) => {
            if(id == "0"){
                item.checked = isSelectAll;
            }else{
                if(item.id == id){
                    item.checked = !item.checked;
                }
            }
            newList.push(item);
        })
        dataList.value = newList;
        setPage(currentPage.value);
    });

    const ajaxUpdateStatus = $(async( type : "delete" | "read")=>{
        const formData = new FormData();
        formData.append("type", type);
        formData.append("mode", '1');

        isWaiting.value=true;
          dataList.value.map((item) => {
            if (item.checked) { 
              formData.append("msg_id[]", item.id);
            }
          });
      

          const resp = await fetch("/ajaxUpdateMemo", {
            body: formData,
            method: "post",
          });

         
            //   location.reload();
            submitResult.value = await resp.json() as ApiData<any>;
            if (submitResult.value.type == "s") {
                
                const respGet = await fetch("/getMemoList", {  
                    method: "GET", 
                    headers :  { 
                        "Accept" : "application/json",
                    }
                });

            const resultGet=  await respGet.json() as ApiData<MemoData>;
            const  {_list ,_tabMenus } =  arrangeMemoData( resultGet.d);
            dataList.value = _list;
            tabMenus.value = _tabMenus;
            setPage(currentPage.value);
            }
                 
            isWaiting.value=false;
          

    });

    useTask$(async () => {
        setPage(1);
    });

    
    return {
        onSelCategoryQRL,
        onCheckMemoQRL,
        ajaxUpdateStatus,
        setPage,
        selMenu, dataList, tabMenus,  selectAll, currentTableData, currentPage, pageCount, rowsPerPage,submitResult,isWaiting
    };
}

