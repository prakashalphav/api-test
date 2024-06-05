import { $, Signal, component$,useStyles$, useStylesScoped$, useTask$,  } from "@builder.io/qwik";
import styles from "./PlayerReportModal1.scss?inline";
import { usePlayerReportModal, usePlayerReport, type Props, parsePlayerReportStatus } from "../../../hooks/business/usePlayerReport";
import Modal from "~/components/modal/variant-1/Modal1";
import { isServer } from '@builder.io/qwik/build';
import AlertMsg from "~/components/alert-msg/variant-1/AlertMsg1";
import FormInput from "~/components/form-input/variant-1/FormInput1";
import SubmitBtn from "~/components/button/variant-1/Button1";
import SelectDropDown from "~/components/select-drop-down/variant-2/SelectDropDown2";
import { Pagination } from "~/components/pagination/variant-1/Pagination1";
import type { PlayerReportItem } from "~/services/types";
import { copyText,   } from "~/utils/common";
import { CopyIcon } from "~/components/icons/Copy";
import reportListBoxStyles from "~/components/report-list/variant-1/ReportListBox1.scss?inline";
import reportListTableStyles from "~/components/report-list/variant-1/ReportListTable1.scss?inline";
import { formatISO9075    } from 'date-fns';
import Spinner from '~/components/spinner/variant-2/Spinner2';
import {
    inlineTranslate,  
  } from 'qwik-speak';
  
export default component$((props: Props) => {
    useStyles$(reportListBoxStyles);
    useStyles$(reportListTableStyles);
    useStylesScoped$(styles);
    const t = inlineTranslate();

    const { showModal, toggleModalQRL, } = usePlayerReportModal();

    const { searchForm, reportResult, reportOptsResult, isWaiting, getHistoryDataQRL, setPage,
        currentTableData,
        currentPage,
        pageCount,
        rowsPerPage, dateRangePickerRef, getHistoryFilterOptsQRL , providerSelOpts,searchBy, winLoseSelOpts,searchBySelOpts,cbSelectedSearchByQRL,onChangeSearchByQRL} = usePlayerReport(props);



    useTask$(async ({ track }) => {
        track(() => props.item.value);

        if (!isServer) {
            const r1 = getHistoryDataQRL(); 
            const r2 = getHistoryFilterOptsQRL();

            
            dateRangePickerRef.value
            await  Promise.all([ r1 , r2 ]);
          

        }
    })
    return <>{showModal.value && (
        <Modal title= {t('wallet.Player Report@@Player Report')  + " "} toggleModal$={toggleModalQRL}  modalContainerClass={`p-2`} >
            <>
            <div class="text-sm md:text-base font-medium mb-2">{ `${ formatISO9075(new Date(props.item.value?.date ))} - ${formatISO9075(new Date(props.item.value?.date_end))}`}</div>
                <form
                    ref={searchForm}
                    method="POST"
                    encType="multipart/form-data"
                    preventdefault:submit
                    onSubmit$={getHistoryDataQRL}
                >
                    <div class="grid grid-cols-12 items-end gap-x-5 mb-5 gap-y-2">
                  
                    {!props.item.value?.outstanding_view &&   (<>
                        <div  class="col-span-12 md:col-span-4">
                     
                            <SelectDropDown name="provider" id="pr-provider" placeholder=  {t('app.Select@@Select')} required={true} disabled={false} selectionList={providerSelOpts } cbValue$={(item) => item.value} cbText$={(item) => item.label} cbSelected$={() => false}></SelectDropDown>
                        </div>
                    </>) }  
                      
                        <div class="col-span-6 md:col-span-3"> 
                            <SelectDropDown name="search_by" id="pr-search_by" placeholder=  {t('app.Select@@Select')} required={true} disabled={false} selectionList={searchBySelOpts} cbValue$={(item) => item.value} cbText$={(item) => item.label} cbSelected$={cbSelectedSearchByQRL} onChange$={onChangeSearchByQRL}></SelectDropDown>
                        </div>
                        <div class="col-span-6 md:col-span-3"> 

                         {  searchBy.value?.value=== "win_lose_status"  && (<>
                            <SelectDropDown name="win_lose_status" id="pr-win_lose_status" placeholder= {t('app.Select@@Select')} required={true} disabled={false} selectionList={winLoseSelOpts } cbValue$={(item) => item.value} cbText$={(item) => item.label} cbSelected$={() => false}></SelectDropDown>
                         </>) }

                         {  searchBy.value?.value=== "ticket_id"  && (<>
                            <FormInput  {...{
                            type: "text",
                            placeholder: "",
                            required: false,
                            disabled: false,
                            readonly: false,
                            name: "ticket_id",
                         }}  ></FormInput>
                         </>) }
                        </div>
                        <div class="col-span-3 md:col-span-2">
                            <button type="submit" class={`rounded text-lg py-2.5 md:py-3 w-full text-center sm:w-24 ` + (isWaiting.value ? `cancel-btn` : `apply-btn`)} disabled={isWaiting.value ? true : false}> {t('app.Search@@Search')}</button>
                        </div>
                    </div>
                </form>
                { !isWaiting.value  && reportResult.value.d?.player_report_data && reportResult.value.d?.player_report_data.length ?
                    (<>
                        {/* mobile view start */}
                        <div class="">
                            {!reportOptsResult.value.d?.outstanding_view && (<>
                                <div class="report-summary-box rounded-xl grid grid-cols-3  p-3 mb-2.5 gap-2">
                                <div class="col-span-3 font-semibold text-center"> {t('wallet.Total Summary@@Total Summary')}</div>
                                <div class="col-span-1">
                                    <div class="font-semibold">{reportResult.value.d?.provider ?t('app.All@@All') : ''}</div>
                                    <div class="text-xs truncate"> {t('wallet.Game Provider@@Game Provider')}</div>
                                </div>
                                <div class="col-span-1">
                                    <div class="font-semibold">{reportResult.value.d?.total_wager}</div>
                                    <div class="text-xs truncate"> {t('wallet.Wager@@Wager')}</div>
                                </div>
                     
                                <div class="col-span-1">
                                    <div class="font-semibold text-danger">{reportResult.value.d?.total_to }</div>
                                    <div class="text-sm truncate"> {t('wallet.Turnover@@Turnover')}</div>
                                </div>
                            
                                <div class="col-span-1">
                                    <div class="font-semibold text-danger">{reportResult.value.d?.total_stake }</div>
                                    <div class="text-xs truncate"> {t('wallet.Stake@@Stake')}</div>
                                </div>
                                <div class="col-span-1">
                                    <div class="font-semibold">{reportResult.value.d?.total_win }</div>
                                    <div class="text-xs truncate"> {t('wallet.Win@@Win')}</div>
                                </div>
                                <div class="col-span-1">
                                    <div class="font-semibold">{reportResult.value.d?.total_jp }</div>
                                    <div class="text-xs truncate"> {t('wallet.Jackpot@@Jackpot')}</div>
                                </div>
                                <div class="col-span-1">
                                    <div class="font-semibold">{reportResult.value.d?.total_jp_win }</div>
                                    <div class="text-xs truncate">   {t('wallet.JP Win@@JP Win')}</div>
                                </div>
                                <div class="col-span-1">
                                    <div class={`font-semibold ${reportResult.value.d?.total_stake + reportResult.value.d?.total_win < 0 ? 'text-danger': ''}`} >{reportResult.value.d?.total_stake + reportResult.value.d?.total_win }</div>
                                    <div class="text-sm truncate"> {t('wallet.Winlose@@Winlose')}</div>
                                </div>
                                <div class="col-span-1">
                                    <div class="font-semibold">{reportResult.value.d?.total_comm_m }</div>
                                    <div class="text-sm truncate"> {t('wallet.Commission@@Commission')}</div>
                                </div>

                                <div class="col-span-1">
                                    <div  class={`font-semibold ${reportResult.value.d?.total_stake + reportResult.value.d?.total_win + reportResult.value.d?.total_comm_m  < 0 ? 'text-danger': ''}`}>{reportResult.value.d?.total_stake + reportResult.value.d?.total_win  + reportResult.value.d?.total_comm_m }</div>
                                    <div class="text-xs truncate"> {t('wallet.Winlose + Comm@@Winlose + Comm')}</div>
                                </div>

                            </div>
                            </>) }
                            {currentTableData.value?.map((item: PlayerReportItem, index: number) => (
                                <>
                                    <div class="rounded-xl report-item-box p-3 mb-2.5">
                                     
                                        <div class="grid grid-cols-3 gap-x-2 gap-y-2 items-center">
 
                                        <button class="col-span-3 text-xs text-left font-semibold" onClick$={()=>{
                                                copyText(item.game_id)
                                            }}  >
                                          
                                            <div class="flex items-center"><div>
                                            {t('wallet.Ticket@@Ticket')} </div> <CopyIcon></CopyIcon></div> 
                                             <div>{item.game_id}</div>
                                        </button>
                                        <div class="col-span-2 report-text-accent text-sm">{`${
                                                reportResult.value.d?.games.hasOwnProperty(item.category_id) ? reportResult.value.d?.games[item.category_id] : ""
                                            } - ${
                                                item.game
                                            }`}</div>
                                        <div class="col-span-1 text-xs">
                                             { formatISO9075(new Date(item.created_at + " UTC")) }
                                        </div>
                                         
                                            <div class="col-span-3">

                                                    <hr></hr>
                                                    </div>
                                            <div class="col-span-2">

                                         
                                            {t('wallet.Selection@@Selection')}
                                             </div>
                                             <div class="col-span-1  text-xs">
                                                {item.requested_at}
                                             </div> 
                                            <div class="col-span-2 report-text-accent">{`  ${item.game_name}`  }</div>

                                            <button class="col-span-1 report-text-link " type="button"

                                            onClick$={()=>{ 
                                                window.open(`/bet-details?transaction_id=${item.id}&game_id=${item.g_id}`,"Bet Detail","menubar=0,resizable=0,width=1100,height=700");
                                            }}  
                                         > {t('wallet.Bet Details@@Bet Details')}</button>
                                            <div class="col-span-3">

                                                <hr></hr>
                                            </div>
                                            <div class="col-span-1">Stake</div>
                                            {!reportOptsResult.value.d?.outstanding_view ?  (<>
                                            
                                            <div class="col-span-1"> {t('wallet.Turnover@@Turnover')}</div>
                                        </> ):  (<>
                                            
                                            <div class="col-span-1"> {t('wallet.IP address@@IP address')}</div>
                                        </> )  }
                                          
                                            <div class="col-span-1"> {t('wallet.Status@@Status')}</div>

                                            <div class="col-span-1 text-xs">{item.stake}</div> 
                                            {!reportOptsResult.value.d?.outstanding_view ?  (<>
                                            
                                            <div class="col-span-1 text-xs">{item.turnover}</div>
                                        </> ):  (<>
                                            
                                            <div class="col-span-1 text-xs">{item.ip_address}</div>
                                        </> )  }
                                            <div  class={  `col-span-1 text-xs break-all ${item.win_lose<=0 ? "text-danger" : ""}`} >{parsePlayerReportStatus(item.status, item.win_lose)}</div>

                                            {!reportOptsResult.value.d?.outstanding_view 
                                          && (<>
                                             <div class="col-span-2">  {t('wallet.Win / Comm@@Win / Comm')}</div>
                                            <div class="col-span-1">  {t('wallet.Total@@Total')} </div>

                                            <div class="col-span-2 text-xs break-words"> 
                                             <span class={item.win_lose<=0 ? "text-danger" : ""} >
                                             {item.win_lose} 
                                             </span>
                                             <span> / </span>
                                             <span class={  `text-xs ${item.comm_m<=0 ? "text-danger" : ""}`} >
                                             {item.comm_m}
                                             </span>
                                            </div>
 
                                            <div class={`col-span-1 text-xs break-all ${
                                                item.win_lose + item.comm_m <= 0 ? "text-danger" : ""
                                            }`}>{item.win_lose + item.comm_m}</div>
                                          </>)
                                        }
                                        </div>
                                    </div>
                                </>
                            ))}
                      
                                <Pagination
                                     componentClass="justify-center   py-7"                    
                                    pages={pageCount.value}
                                    page={currentPage.value}
                                    rowsPerPage={rowsPerPage.value}
                                    onPaging$={setPage}
                                    defaultClass="p-2 mr-2.5"
                                    activeClass="p-2 mr-2.5"
                                />
                           
                        </div>
                        {/* mobile view end */}

                    </>) : (isWaiting.value  ?  (<><Spinner  class="text-4xl"></Spinner></>) : (
                        <>
                            <div class="font-semibold px-2.5 py-16 text-center">{t('app.No records found.@@No records found.')}</div>
                        </>
                    ))
                }
            </>
        </Modal>
    )}
    </>;
})