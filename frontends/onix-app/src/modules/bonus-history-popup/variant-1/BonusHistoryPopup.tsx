import { component$, useStyles$, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./BonusHistoryPopup.scss?inline";
import { useBonusHistoryModal } from "~/hooks/business/useBonus";
import Modal from "~/components/modal/variant-1/Modal1";
import type { BonusHistoryData } from "~/services/types";
import { Pagination } from "~/components/pagination/variant-1/Pagination1";
import reportListBoxStyles from "~/components/report-list/variant-1/ReportListBox1.scss?inline";
import reportListTableStyles from "~/components/report-list/variant-1/ReportListTable1.scss?inline";
import { numFormat } from "~/utils/common";
import Spinner from '~/components/spinner/variant-2/Spinner2';
import {
  inlineTranslate,  
    } from 'qwik-speak';
type Props = {
  // data?: BonusHistoryData[] | null;
};
export default component$(() => {
    useStyles$(reportListBoxStyles);
    useStyles$(reportListTableStyles);
    useStylesScoped$(styles);
    const t = inlineTranslate();
    const { 
      showBonusHistoryModal,
      toggleBonusHistoryMdQRL,
      currentPage,
      pageCount,
      rowsPerPage,
      setPage,
      currentTableData,
      isWaiting,
    } = useBonusHistoryModal();
    
    return <>
      {showBonusHistoryModal.value && (
        <Modal title='Bonus History (Last 5 records)    ' toggleModal$={toggleBonusHistoryMdQRL} maxWidth="max-w-6xl"    class={`modal p-5 pb-3`} inlineStyle="min-width:370px" >
          { !isWaiting.value  && currentTableData.value  && currentTableData.value.length?
          (<>
          <div class="">
              {currentTableData.value?.map((item: BonusHistoryData) => (
                  <>
                      <div class="rounded-xl report-item-box p-3 mb-5">
                        <div class="grid grid-cols-3 md:grid-cols-5 items-start gap-x-3 md:gap-x-4 gap-y-4 md:gap-y-5 leading-normal text-xs md:text-sm">
                          <div class="col-span-1">
                            <div class="font-bold">Bonus Event</div>
                            <div class="">{item.event_title}</div>
                          </div>
                          <div class="col-span-1">
                            <div class="font-bold">Bonus Code</div>
                            <div class="">{item.event_title}</div>
                          </div>
                          <div class="col-span-1">
                            <div class="font-bold">Bonus Credit Amount</div>
                            <div class="">{numFormat(item.bonus_credit, 2)}</div>
                          </div>
                          <div class="col-span-1">
                            <div class="font-bold">Turnover Multiply</div>
                            <div class="">x {item.turnover_multiply}</div>
                          </div>
                          <div class="col-span-1">
                            <div class="font-bold">Reached Turnover</div>
                            <div class="">{numFormat(item.reached_turnover, 2)}</div>
                          </div>
                          <div class="col-span-1">
                            <div class="font-bold">Turnover Target</div>
                            <div class="">{numFormat(item.turnover_target, 2)}</div>
                          </div>
                          <div class="col-span-1">
                            <div class="font-bold">Winning Multiply</div>
                            <div class="">x {item.winning_multiply}</div>
                          </div>
                          <div class="col-span-1">
                            <div class="font-bold">Reached Winning</div>
                            <div class="">{numFormat(item.reached_winning, 2)}</div>
                          </div>
                          <div class="col-span-1">
                            <div class="font-bold">Winning Target</div>
                            <div class="">{numFormat(item.winning_target, 2)}</div>
                          </div>
                          <div class="col-span-1">
                            <div class="font-bold">Created Date</div>
                            <div class="">{item.created_at}</div>
                          </div>
                          <div class="col-span-1">
                            <div class="font-bold">Bonus End Date</div>
                            <div class="">{item.bonus_end_at}</div>
                          </div>
                          <div class="col-span-1">
                            <div class="font-bold">Status</div>
                            <div class="">
                              <button type="button" class={`btn btn-sm btn-${item.status?.color} rounded-md py-0.5 px-2`}>
                                {item.status?.status_code}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                  </>
              ))}
             
              <Pagination
                  componentClass=" py-7  justify-center "
                  pages={pageCount.value}
                  page={currentPage.value}
                  rowsPerPage={rowsPerPage.value}
                  onPaging$={setPage}
                  defaultClass="p-2 mr-2.5"
                  activeClass="p-2 mr-2.5"
              />
               
          </div>
          </>) : (isWaiting.value == true ? (<><Spinner class="text-4xl"></Spinner></>) : (
          <>
            <div class="font-semibold px-2.5 py-16 text-center">{t('app.No records found.@@No records found.')}</div>
          </>
          ))
          }
        </Modal>
      )}
    </>;
})