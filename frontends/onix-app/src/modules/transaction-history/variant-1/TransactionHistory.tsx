import { component$, useVisibleTask$, useStyles$, useStylesScoped$, $, useSignal } from '@builder.io/qwik';
import { easepick } from '@easepick/core';
import { RangePlugin } from '@easepick/range-plugin';
import { PresetPlugin } from '@easepick/preset-plugin';
import styles from './TransactionHistory.scss?inline';
import reportListBoxStyles from "~/components/report-list/variant-1/ReportListBox1.scss?inline";
import reportListTableStyles from "~/components/report-list/variant-1/ReportListTable1.scss?inline";
import buttonActionStyles from "~/components/button-action-styles/variant-1/ButtonActionStyles1.scss?inline";

import FormInput from "~/components/form-input/variant-1/FormInput1";
import SelectDropDown from "~/components/select-drop-down/variant-2/SelectDropDown2";
import { useTransactionHistory } from "~/hooks/business/useTransactionHistory";
import { Pagination } from "~/components/pagination/variant-1/Pagination1";

import PlayerReportModal from '~/modules/player-report-modal/variant-1/PlayerReportModal1';
import Spinner from '~/components/spinner/variant-2/Spinner2';

// import EasepickStyles from '@easepick/core/dist/index.css?url'
// import EasepickRangeStyles  from '@easepick/range-plugin/dist/index.css?url'
// import EasepickPresetStyles from '@easepick/preset-plugin/dist/index.css?url'
import EasepickCustomStyles from '~/components/date-picker/variant-1/EasePickCustoms.css?url';
import AlertMsg from '~/components/alert-msg/variant-1/AlertMsg1';
import {
    inlineTranslate,  
  } from 'qwik-speak';

import { formatISO9075    } from 'date-fns';
import { priceFormat } from '~/utils/formatters/priceFormat';
import { useCommonViewData } from '~/hooks/app/useCommonViewData';
import { useGetCurrency } from '~/hooks/utils/useGetCurrency';
import {StrikedText} from '~/components/text/StrikedText';



export default component$(() => {

    useStyles$(reportListBoxStyles);
    useStyles$(reportListTableStyles);
    useStyles$(buttonActionStyles);
    useStylesScoped$(styles); 
    // console.log(props.statement);
    const dateRangePickerRef = useSignal<HTMLElement | undefined>();

    const {commonData} = useCommonViewData();
    const t = inlineTranslate();
    const {currencyCode} = useGetCurrency(commonData);
    useVisibleTask$(async () => {
      
        
        const picker = new easepick.create({
            element: dateRangePickerRef.value!,
            css: [  
                "https://cdn.jsdelivr.net/npm/@easepick/bundle@1.2.1/dist/index.css",
                // EasepickStyles,
                // EasepickRangeStyles,
                // EasepickPresetStyles,  
                EasepickCustomStyles
            ],
            zIndex: 200,
            plugins: [
                RangePlugin,
                PresetPlugin
            ],
            PresetPlugin: {
                position: 'left',
            },
            RangePlugin: {
                tooltip: true,
                startDate: new Date() , //30days ago
                endDate :new Date() //today
            },
            grid: 2,
            calendars: 2,
        })
    });

    const { searchForm, getTransactionStatement, statementData, isWaitingCheck, setPage, currentTableData, currentPage, pageCount, rowsPerPage, transactionType, onSelectGameAmt, selectedGameStatement ,result} = useTransactionHistory();

    return <>
        <div>
            <form
                ref={searchForm}
                method="POST"
                encType="multipart/form-data"
                preventdefault: submit
                onSubmit$={getTransactionStatement}
            >
                <div class="grid grid-cols-12 items-end gap-x-5 mb-5 gap-y-2">
                    <div class="col-span-12 md:col-span-4">
                        <div class="text-sm md:text-base font-medium mb-2"> {t('wallet.Transaction Type@@Transaction Type')}</div>
                        <SelectDropDown name="transaction_type" id="transaction_type" placeholder="Select" required={true} disabled={false} selectionList={[{ label:t('wallet.Transaction@@Transaction')   , value: 2 }, { label: t('wallet.Game@@Game') , value: 1 }]} cbValue$={(item) => item.value} cbText$={(item) => item.label} cbSelected$={() => false}></SelectDropDown>
                    </div>
                    <div class="col-span-12 md:col-span-2"></div>
                    <div class="col-span-9 md:col-span-4">
                        <div class="text-sm md:text-base font-medium mb-2"> {t('app.Select Date@@Select Date')}</div>
                        <FormInput ref={dateRangePickerRef} {...{
                            type: "text",
                            placeholder: "",
                            required: true,
                            disabled: false,
                            readonly: false,
                            name: "date_range",
                        }}  ></FormInput>
                    </div>
                    <div class="col-span-3 md:col-span-2">
                        <button type="submit" class={`btnPrimary first-letter:rounded text-lg py-2.5 md:py-3 w-full text-center sm:w-24 ` } disabled={isWaitingCheck.value ? true : false}> {t('app.Search@@Search')}</button>
                    </div>
                </div>
            </form>
            {/* Test price format <button type="button" onClick$={()=>{
                console.log( priceFormat( 10000, {
                    prefix: `${currencyCode}`,
                    centsLimit: 2,
                  }));
            }}>test</button> */}
            {!isWaitingCheck.value && transactionType.value && statementData.value?.transactions  && statementData.value?.transactions.length? (transactionType.value === 2 ? (
                <>
                    {/* Transactions */}
                    {/* desktop view start */}
                    <div class="hidden md:block overflow-x-auto w-screen sm:w-full -ml-7 sm:ml-0">
                        <table class="report-table w-full border rounded overflow-hidden">
                            <thead>
                                <tr>
                                    <td class="font-semibold px-2.5 py-5"> {t('wallet.Trans Date@@Trans Date')}</td>
                                    <td class="font-semibold px-2.5 py-5"> {t('wallet.Trans ID@@Trans ID')}</td>
                                    <td class="font-semibold px-2.5 py-5"> {t('wallet.Trans Type@@Trans Type')}</td>
                                    <td class="font-semibold px-2.5 py-5"> {t('wallet.Bank Name@@Bank Name')}</td>
                                    <td class="font-semibold px-2.5 py-5"> {t('wallet.Status@@Status')}</td>
                                    <td class="font-semibold px-2.5 py-5"> {t('wallet.Reason@@Reason')}</td>
                                    <td class="font-semibold px-2.5 py-5"> {t('wallet.Debit@@Debit')}</td>
                                    <td class="font-semibold px-2.5 py-5"> {t('wallet.Credit@@Credit')}</td>
                                </tr>
                            </thead>
                            <tbody>
                                {currentTableData.value?.map((item: any) => (
                                    <>
                                        <tr>
                                            <td class="py-5 px-2.5">{item.created_at}</td>
                                            <td class="py-5 px-2.5">{item.trans_id}</td>
                                            <td class="py-5 px-2.5">{item.transaction_type_name}</td>
                                            <td class="py-5 px-2.5">{item.note}</td>
                                            <td class="py-5 px-2.5"><span class={`status-${item.status_color} inline-block p-2 rounded-full`}>{item.status_name}</span></td>
                                            <td class="py-5 px-2.5">{item.admin_remark ? item.admin_remark : '-'} ; {item.rejected_reason}</td>
                                            <td class="py-5 px-2.5">
                                            <StrikedText text={priceFormat( item.debit , {
                                                        prefix: `${currencyCode}`,
                                                        centsLimit: 2,
                                                      })} isStrike={item.status_type =='failed'}/>
                                                </td>
                                            <td class="py-5 px-2.5"> <StrikedText text={priceFormat( item.credit , {
                                                        prefix: `${currencyCode}`,
                                                        centsLimit: 2,
                                                      })} isStrike={item.status_type =='failed'}/></td>
                                        </tr>
                                    </>
                                ))}
                                <tr>
                                    <td colSpan={6} class="py-4 px-2.5 text-right"> {t('wallet.Total@@Total')} </td>
                                    <td class="py-4 px-2.5">{  priceFormat( statementData.value?.total_debit , {
                                                        prefix: `${currencyCode}`,
                                                        centsLimit: 2,
                                                      })}</td>
                                    <td class="py-4 px-2.5">{  priceFormat( statementData.value?.total_credit , {
                                                        prefix: `${currencyCode}`,
                                                        centsLimit: 2,
                                                      })}</td>
                                </tr>
                                <tr>
                                    <td colSpan={8} class="py-4 px-2.5">
                                   
                                            <Pagination 
                                             componentClass=" py-7  justify-end "
                                                pages={pageCount.value}
                                                page={currentPage.value}
                                                rowsPerPage={rowsPerPage.value}
                                                onPaging$={setPage}
                                                defaultClass="p-2 mr-2.5"
                                                activeClass="p-2 mr-2.5"
                                            />
                                    
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    {/* desktop view end */}
                    {/* mobile view start */}
                    <div class="md:hidden">
                        <div class="report-summary-box rounded-xl grid grid-cols-3 items-center p-3 mb-2.5">
                            <div class="col-span-1 font-semibold text-center"> {t('wallet.Total@@Total')}</div>
                            <div class="col-span-1">
                                <div class="font-semibold">{   priceFormat(  statementData.value?.total_debit , {
                                                        prefix: `${currencyCode}`,
                                                        centsLimit: 2,
                                                      })  }</div>
                                <div class="text-sm"> {t('wallet.Debit@@Debit')}</div>
                            </div>
                            <div class="col-span-1">
                                <div class="font-semibold">{priceFormat( statementData.value?.total_credit   , {
                                                        prefix: `${currencyCode}`,
                                                        centsLimit: 2,
                                                      })  }</div>
                                <div class="text-sm"> {t('wallet.Credit@@Credit')}</div>
                            </div>
                        </div>
                        {currentTableData.value?.map((item: any, index: number) => (
                            <>
                                <div class="rounded-xl report-item-box p-3 mb-2.5">
                                    <div class="mb-4 font-semibold"> {t('wallet.Transaction@@Transaction')} {index + 1}</div>
                                    <div class="grid grid-cols-4 gap-x-3 gap-y-2 items-center">
                                        <div class="col-span-1"> {t('wallet.Trans Date@@Trans Date')}</div>
                                        <div class="col-span-1"> {t('wallet.Trans ID@@Trans ID')}</div>
                                        <div class="col-span-1"> {t('wallet.Trans Type@@Trans Type')}</div>
                                        <div class="col-span-1"> {t('wallet.Bank Name@@Bank Name')}</div>
                                        <div class="col-span-1 text-xs break-all">{item.created_at}</div>
                                        <div class="col-span-1 text-xs break-all">{item.trans_id}</div>
                                        <div class="col-span-1 text-xs break-all">{item.transaction_type_name}</div>
                                        <div class="col-span-1 text-xs break-all">{item.note}</div>
                                        <div class="col-span-1"> {t('wallet.Status@@Status')}</div>
                                        <div class="col-span-1"> {t('wallet.Reason@@Reason')}</div>
                                        <div class="col-span-1"> {t('wallet.Debit@@Debit')}</div>
                                        <div class="col-span-1"> {t('wallet.Credit@@Credit')}</div>
                                        <div class="col-span-1 text-xs break-all">{item.status_name}</div>
                                        <div class="col-span-1 text-xs break-all">{item.admin_remark ? item.admin_remark : '-'} ; {item.rejected_reason}</div>
                                        <div class="col-span-1 text-xs break-all">{ priceFormat( item.debit  , {
                                                        prefix: `${currencyCode}`,
                                                        centsLimit: 2,
                                                      })  }</div>
                                        <div class="col-span-1 text-xs break-all">{ priceFormat( item.credit  , {
                                                        prefix: `${currencyCode}`,
                                                        centsLimit: 2,
                                                      }) } </div>
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
                    {/* mobile view end */}
                </>
            ) :
                (
                    <>
                        {/* Game Statement */}

                        {/* desktop view start */}
                        <div class="hidden md:block overflow-x-auto w-screen sm:w-full -ml-7 sm:ml-0">
                            <table class="report-table w-full border rounded overflow-hidden">
                                <thead>
                                    <tr>
                                        <td class="font-semibold px-2.5 py-5"> {t('wallet.Date@@Date')}</td>
                                        <td class="font-semibold px-2.5 py-5"> {t('wallet.Betting Type@@Betting Type')}</td>
                                        <td class="font-semibold px-2.5 py-5"> {t('wallet.Turn Over@@Turn Over')}</td>
                                        <td class="font-semibold px-2.5 py-5"> {t('wallet.Outstanding@@Outstanding')}</td>
                                        <td class="font-semibold px-2.5 py-5"> {t('wallet.Win/Lose@@Win/Lose')}</td>
                                        <td class="font-semibold px-2.5 py-5"> {t('wallet.Total Win/Lose@@Total Win/Lose')}</td>

                                    </tr>
                                </thead>
                                <tbody>
                                    {currentTableData.value?.map((item: any) => (
                                        <>
                                            <tr>
                                                <td class="py-5 px-2.5">{`${ formatISO9075(new Date(item.date))} - ${formatISO9075(new Date(item.date_end))}`}</td>
                                                <td class="py-5 px-2.5">{item.game_type}</td>
                                                <td class="py-5 px-2.5"> { priceFormat( item.turnover , {
                                                        prefix: `${currencyCode}`,
                                                        centsLimit: 2,
                                                      }) }</td>
                                                <td class="py-5 px-2.5">
                                                    <button class={`col-span-2  text-left ${item.outstanding != 0 ? 'report-text-link' : ''}`} onClick$={async () => {

                                                        await onSelectGameAmt(item.outstanding, item, "1");
                                                    }}>{ priceFormat( item.outstanding , {
                                                        prefix: `${currencyCode}`,
                                                        centsLimit: 2,
                                                      }) }</button>
                                                </td>
                                                <td class="py-5 px-2.5">
                                                    <button class={`col-span-2  text-left ${item.winlose != 0 ? 'report-text-link' : ''}`} onClick$={async () => {

                                                        await onSelectGameAmt(item.winlose, item, "");
                                                    }}> { priceFormat( item.winlose , {
                                                        prefix: `${currencyCode}`,
                                                        centsLimit: 2,
                                                      }) }</button>

                                                </td>
                                                <td class="py-5 px-2.5">
                                                    <button class={`col-span-2   text-left ${item.winlose != 0 ? 'report-text-link' : ''}`} onClick$={async () => {

                                                        await onSelectGameAmt(item.winlose, item, "");
                                                    }}> { priceFormat( item.acc_winlose , {
                                                        prefix: `${currencyCode}`,
                                                        centsLimit: 2,
                                                      }) }</button>

                                                </td>
                                            </tr>
                                        </>
                                    ))}
                                    <tr>
                                        <td colSpan={2} class="py-4 px-2.5 text-right"> {t('wallet.Total@@Total')}</td>

                                        <td class="py-4 px-2.5">{ priceFormat( statementData.value?.total_turnover , {
                                                        prefix: `${currencyCode}`,
                                                        centsLimit: 2,
                                                      }) }</td>
                                        <td class="py-4 px-2.5"> { priceFormat( statementData.value?.total_outstanding , {
                                                        prefix: `${currencyCode}`,
                                                        centsLimit: 2,
                                                      }) }</td>


                                        <td class="py-4 px-2.5"> { priceFormat( statementData.value?.total_win_lose_with_out_outstanding, {
                                                        prefix: `${currencyCode}`,
                                                        centsLimit: 2,
                                                      }) }</td>
                                        <td class="py-4 px-2.5">{ priceFormat(statementData.value?.total_win_lose , {
                                                        prefix: `${currencyCode}`,
                                                        centsLimit: 2,
                                                      }) }</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={8} class="py-4 px-2.5">
                                             
                                                <Pagination 
                                                  componentClass="  justify-end "
                                                    pages={pageCount.value}
                                                    page={currentPage.value}
                                                    rowsPerPage={rowsPerPage.value}
                                                    onPaging$={setPage}
                                                    defaultClass="p-2 mr-2.5"
                                                    activeClass="p-2 mr-2.5"
                                                />
                                         
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        {/* desktop view end */}
                        {/* mobile view start */}
                        <div class="md:hidden">
                            <div class="report-summary-box rounded-xl grid grid-cols-4 items-center p-3 mb-2.5">
                                <div class="col-span-1 font-semibold text-center"> {t('wallet.Total@@Total')}</div>
                                <div class="col-span-1">
                                    <div class="font-semibold"> { priceFormat( statementData.value?.total_turnover , {
                                                        prefix: `${currencyCode}`,
                                                        centsLimit: 2,
                                                      }) }</div>
                                    <div class="text-sm"> {t('wallet.Turnover@@Turnover')}</div>
                                </div>
                                <div class="col-span-1">
                                    <div class="font-semibold"> { priceFormat( statementData.value?.total_win_lose, {
                                                        prefix: `${currencyCode}`,
                                                        centsLimit: 2,
                                                      }) }</div>
                                    <div class="text-sm"> {t('wallet.Lose@@Lose')}Win/</div>
                                </div>
                                <div class="col-span-1">
                                    <div class="font-semibold"> { priceFormat( statementData.value?.total_outstanding , {
                                                        prefix: `${currencyCode}`,
                                                        centsLimit: 2,
                                                      }) }</div>
                                    <div class="text-sm"> {t('wallet.Outstanding@@Outstanding')}</div>
                                </div>
                            </div>
                            {currentTableData.value?.map((item: any, index: number) => (
                                <>
                                    <div class="rounded-xl report-item-box p-3 mb-2.5">
                                        <div class="mb-4 font-semibold"> {t('wallet.Transaction@@Transaction')} {index + 1}</div>
                                        <div class="grid grid-cols-4 gap-x-3 gap-y-2 items-center">
                                            <div class="col-span-2"> {t('wallet.Date@@Date')}</div>
                                            <div class="col-span-1"> {t('wallet.Betting Type@@Betting Type')}</div>
                                            <div class="col-span-1"> {t('wallet.Turn Over@@Turn Over')}</div>

                                            <div class="col-span-2 text-xs break-words">{`${ formatISO9075(new Date(item.date))} - ${formatISO9075(new Date(item.date_end))}`}</div>
                                            <div class="col-span-1 text-xs break-all">{item.game_type}</div>
                                            <div class="col-span-1 text-xs break-all"> { priceFormat( item.turnover , {
                                                        prefix: `${currencyCode}`,
                                                        centsLimit: 2,
                                                      }) }</div>

                                            <div class="col-span-2" > {t('wallet.Outstanding@@Outstanding')}</div>
                                            <div class="col-span-1" > {t('wallet.Win/Lose@@Win/Lose')}</div>
                                            <div class="col-span-1"> {t('wallet.Total Win/Lose@@Total Win/Lose')}</div>

                                            <button class={`col-span-2 text-xs break-all text-left ${item.outstanding != 0 ? 'report-text-link' : ''}`} onClick$={async () => {

                                                await onSelectGameAmt(item.outstanding, item, "1");
                                            }}> { priceFormat( item.outstanding , {
                                                prefix: `${currencyCode}`,
                                                centsLimit: 2,
                                              }) }</button>
                                            <button class={`col-span-1 text-xs break-all  text-left ${item.winlose != 0 ? 'report-text-link' : ''}`} onClick$={async () => {

                                                await onSelectGameAmt(item.winlose, item, "");
                                            }}  > { priceFormat( item.winlose , {
                                                prefix: `${currencyCode}`,
                                                centsLimit: 2,
                                              }) }</button>
                                            <button class={`col-span-1 text-xs break-all text-left ${item.winlose != 0 ? 'report-text-link' : ''}`} onClick$={async () => {

                                                await onSelectGameAmt(item.winlose, item, "");
                                            }}   > { priceFormat( item.acc_winlose , {
                                                prefix: `${currencyCode}`,
                                                centsLimit: 2,
                                              }) }</button>
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
                        {/* mobile view end */}
                    </>
                )


            ) : (isWaitingCheck.value ? (<><Spinner class="text-4xl"></Spinner></>) : (
                <>
                    <div class="font-semibold px-2.5 py-16 text-center">No transaction record found.</div>
                </>
            ))
            }
   {result.value.type != "s" && (
        
<div class="mt-3"> 
                <AlertMsg message ={result}></AlertMsg>
                </div>
   )}
        </div>

        <PlayerReportModal item={selectedGameStatement} ></PlayerReportModal>
    </>;
});