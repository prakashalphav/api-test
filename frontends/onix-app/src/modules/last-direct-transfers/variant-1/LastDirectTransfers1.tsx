import { component$,  useStylesScoped$, $, useSignal, Resource } from '@builder.io/qwik'; 
import styles from './LastDirectTransfers1.scss?inline';
 
import {
    inlineTranslate,  
  } from 'qwik-speak';
  import { priceFormat } from '~/utils/formatters/priceFormat';
  import { useLastDirectTransfers ,getLastTransferItemDetails  ,getLastTransferItemActions ,type Props} from "~/hooks/business/useLastDirectTransfers";
  import { Pagination } from "~/components/pagination/variant-1/Pagination1";
  import { useCommonViewData } from '~/hooks/app/useCommonViewData';
  import { useGetCurrency } from '~/hooks/utils/useGetCurrency';
  import {StrikedText} from '~/components/text/StrikedText';

export default component$((props: Props) => {
    useStylesScoped$(styles);
    const t = inlineTranslate();

    
    const {commonData} = useCommonViewData(); 
    const {currencyCode} = useGetCurrency(commonData);
    const {       statementData, currentTableData, 
        currentPage,
        pageCount,
        rowsPerPage,
        setPage,
        totalItem} = useLastDirectTransfers(props);
 
    return <>
      
      {!statementData.value?.transactions?.length ? (<div class="font-semibold px-2.5 py-16 text-center">No transaction record found.</div>): ( <> {/* Transactions */}
                    {/* desktop view start */}
                    <div class="hidden md:block overflow-x-auto w-screen sm:w-full -ml-7 sm:ml-0">
                        <table class="report-table w-full border rounded overflow-hidden">
                            <thead>
                                <tr>
                                    <td class="font-semibold px-2.5 py-5"> {t('wallet.Trans Date@@Trans Date')}</td>
                                    <td class="font-semibold px-2.5 py-5"> {t('wallet.Status@@Details')}</td>
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
                                         
                                            <td class="py-5 px-2.5">{getLastTransferItemDetails(item)}</td>
                                            <td class="py-5 px-2.5"><span class={`status-${item.status_color} inline-block p-2 rounded-full`}>{item.status_name}</span></td>
                                            <td class="what py-5 px-2.5" dangerouslySetInnerHTML={getLastTransferItemActions(item)}></td>
                                            
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
                                    <td colSpan={4} class="py-4 px-2.5 text-right"> {t('wallet.Total@@Total')} </td>
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
                                    <td colSpan={6} class="py-4 px-2.5">
                                   
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
                                    <div class="grid grid-cols-3 gap-x-3 gap-y-2 items-center">
                                        <div class="col-span-1"> {t('wallet.Trans Date@@Trans Date')}</div>
                                        <div class="col-span-1"> {t('wallet.Trans ID@@Trans ID')}</div>
                                        <div class="col-span-1"> {t('wallet.Status@@Status')}</div>
                                     
                                        <div class="col-span-1 text-xs break-all">{item.created_at}</div>
                                        <div class="col-span-1 text-xs break-all">{getLastTransferItemDetails(item)}</div>   
                                        <div class="col-span-1 text-xs break-all">{item.status_name}</div>
                                       
                                      
                                       
                                        <div class="col-span-1"> {t('wallet.Reason@@Reason')}</div>
                                        <div class="col-span-1"> {t('wallet.Debit@@Debit')}</div>
                                        <div class="col-span-1"> {t('wallet.Credit@@Credit')}</div>
                                        <div class="col-span-1 text-xs break-all" dangerouslySetInnerHTML={getLastTransferItemActions(item)}></div>
                                       
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
                    {/* mobile view end */} </>)}
                   
                   
    </>
})