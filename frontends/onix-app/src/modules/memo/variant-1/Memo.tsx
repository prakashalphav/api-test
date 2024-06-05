import { component$ ,useSignal,useStylesScoped$, useStyles$ } from '@builder.io/qwik'; 
import styles from './Memo.scss?inline';
import TabsMenu from "../../../components/tabs-menu/variant-1/TabsMenu1";
import {createSignals, useMemos} from "../../../hooks/business/useMemo";
import { TrashIcon } from '../../../components/icons/Trash'; 
import Checkbox from '../../../components/checkbox/variant-3/Checkbox3';
import type { MemoData } from '../../../services/types';
import { Pagination } from "~/components/pagination/variant-1/Pagination1";
import AlertMsg from '~/components/alert-msg/variant-1/AlertMsg1';
import Spinner from '~/components/spinner/variant-2/Spinner2';
import {
    inlineTranslate,  
  } from 'qwik-speak';
  import { extendMemoAttachmentUrl } from "~/utils/sysUtils";
import { AttachmentIcon } from '~/components/icons/Attachment';
import tableDefaultStyles from "~/css/table/tableDefault.scss?inline";

type Props = {
    memoData: MemoData | null;
};

export default component$((props: Props) => {
    useStylesScoped$(styles);
    useStyles$(tableDefaultStyles);

    const t = inlineTranslate();

    const {   onSelCategoryQRL,
        onCheckMemoQRL,
        ajaxUpdateStatus,
        setPage,
        selMenu,   tabMenus,  selectAll, currentTableData, currentPage, pageCount, rowsPerPage , submitResult,isWaiting} =
        useMemos(props.memoData); 
    
    return <>
        <div>
            <div class="w-screen sm:w-full sm:mx-auto">
             
                <TabsMenu menus={tabMenus.value} onClickMenu$={onSelCategoryQRL} selMenus={[selMenu.value]} ></TabsMenu>
            </div>

            <div class="">

                {/* Alert */}
                {submitResult.value.type != "s" && ( 
                  <div class="mt-3"> 
                        <AlertMsg message ={submitResult}></AlertMsg>
                        </div>
                 )}
                 
                 {/* Content */}
                <div class="flex w-full justify-end my-4 items-center pr-2 sm:pr-7">
                    <div class="mr-4"><button class="delete-btn flex-center w-7 h-7 rounded-sm text-2xl" disabled={isWaiting.value} onClick$={() => ajaxUpdateStatus("delete")}>
                   {isWaiting.value ? (<><Spinner></Spinner></>) : (<TrashIcon iconColor='red'></TrashIcon>) }
                    </button></div>
                    <div class="flex items-center cursor-pointer">
                        <div class="mr-1.5 sm:mr-3 select-all">Select all</div> 
                            <Checkbox onChange$={ async (isChecked , ev)=>{
                                await onCheckMemoQRL('0', isChecked );
                            }}  value="1" type="checkbox" checked={selectAll}></Checkbox>
                    </div>
                </div>
                {currentTableData.value?.map((item: any) => (
                    // <EventCard key={item.title} title={item.title} banner={item.banner} desc={item.desc} category={item.category}></EventCard>
                    item.category == selMenu.value && (
                        <div key={item.id} class="memo-container cursor-pointer rounded pt-3 pl-4  pb-2 sm:pb-1 pr-2  sm:pr-7 mb-2 flex flex-wrap items-start justify-between w-full gap-3"
                         onClick$={()=>{onCheckMemoQRL(item.id, false)}} >
                            {item.image && (
                             <div class="w-full sm:w-auto  mt-2 shrink-0"><img width="40" height="40" style="height:40px;" src={item.image} class="aspect-square rounded-full"/></div>
                            )}
                            <div class="w-full sm:w-auto flex-auto">
                                <div class="text-sm leading-5 font-medium memo-sender">{item.topic}</div>
                                <div class="text-xs memo-time">{item.created_at}</div>
                                {(Array.isArray(item.attachments) ? item.attachments && item.attachments.length > 0 : item.attachments) && <>
                                    <a
                                    class="flex memo-content py-1"
                                    href={extendMemoAttachmentUrl(Array.isArray(item.attachments) ? item.attachments[0] : item.attachments)}
                                    target="_blank"
                                    >
                                    <AttachmentIcon></AttachmentIcon>
                                    <span class="ml-1 truncate">{Array.isArray(item.attachments) ? item.attachments[0] : item.attachments}</span>
                                </a>
                                </>}
                                <div class=" leading-5 memo-content break-words" dangerouslySetInnerHTML={item.content}></div>
                            </div>
                            <div class="w-full sm:w-auto shrink-0 self-center">
                         
                                <Checkbox key={item.checked? item.id + '_checked':item.id + '_unchecked' } value="1" type="checkbox" checked={item.checked}></Checkbox>
                            </div>
                        </div>
                    )
                ))}
                
                <Pagination 
                        componentClass="mt-5 md:mt-[60px] justify-end md:justify-center px-2  "                    
                    pages={pageCount.value} 
                    page={currentPage.value}
                    rowsPerPage={rowsPerPage.value}
                    onPaging$={setPage}
                    defaultClass="p-2 mr-2.5"
                    activeClass="p-2 mr-2.5"
                />
            
            </div>
        </div>   
    </>;
})