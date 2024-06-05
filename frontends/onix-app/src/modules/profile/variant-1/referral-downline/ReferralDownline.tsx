import { component$, useVisibleTask$, useStylesScoped$, useSignal ,useStyles$} from '@builder.io/qwik'; 
import styles from './ReferralDownline.scss?inline';
import type { ProfileData, CommonViewData } from '~/services/types';
import ProfileImage from '../ProfileImage';
import FormInput from "~/components/form-input/variant-1/FormInput1";
import { easepick } from '@easepick/core';
import { RangePlugin } from '@easepick/range-plugin';
import { PresetPlugin } from '@easepick/preset-plugin';
import { Pagination } from "~/components/pagination/variant-1/Pagination1";
import { useReferralDownline } from "~/hooks/business/useReferralDownline";

import reportListBoxStyles from "~/components/report-list/variant-1/ReportListBox1.scss?inline";
import reportListTableStyles from "~/components/report-list/variant-1/ReportListTable1.scss?inline";
import buttonActionStyles from "~/components/button-action-styles/variant-1/ButtonActionStyles1.scss?inline";
import {
    inlineTranslate,  
  } from 'qwik-speak';
  
// import EasepickStyles from '@easepick/core/dist/index.css?url'
// import EasepickRangeStyles  from '@easepick/range-plugin/dist/index.css?url'
// import EasepickPresetStyles from '@easepick/preset-plugin/dist/index.css?url'
  import EasepickCustomStyles from '~/components/date-picker/variant-1/EasePickCustoms.css?url';

  import { subDays    } from 'date-fns'
type Props = {
    data: ProfileData | null;
    commonData: CommonViewData | null;
};

export default component$((props: Props) => {

    useStyles$(reportListBoxStyles);
    useStyles$(reportListTableStyles);
    useStyles$(buttonActionStyles);
    useStylesScoped$(styles);
    const t = inlineTranslate();

    // console.log(props.data, props.commonData);
    // console.log(props.commonData?.member_level);
    const user_member_level = props.commonData?.member_level?.toLowerCase() == 'new' ? 'New' : props.commonData?.member_level;
    const dateRangePickerRef = useSignal<HTMLElement|undefined>();

    const { searchForm, getRefData, refData, isWaitingCheck, setPage, currentTableData, currentPage, pageCount, rowsPerPage ,onSearchQRL} = useReferralDownline();

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
                position: 'right',
            },
            RangePlugin: {
                tooltip: true,
                startDate: subDays(new Date(), 30),
                endDate : new Date(),
            },
            grid: 2,
            calendars: 2,
        })

        await getRefData();

    }); 

    return <>
        <div class="profile-outer-container px-2 pb-6 rounded-lg lg:pt-32 relative lg:mt-28 w-full">
            <ProfileImage memberLevel={user_member_level} username={props.commonData?.user_name} isShowMobile={false}></ProfileImage>
            <div class="profile-inner-container rounded-lg px-2 pb-4 lg:px-6 lg:pt-6 lg:pb-12 ">
                <form
                    ref={searchForm}
                    method="POST"
                    encType="multipart/form-data"
                    preventdefault:submit
                    onSubmit$={getRefData}
                >
                    <div class="grid grid-cols-3 md:grid-cols-6 items-end gap-y-5 py-4">
                       

                        <div class="text-right col-span-3 md:col-span-2 row-start-1 md:row-start-auto">
                            <FormInput {...{
                                type: "text",
                                placeholder: "Search",
                                required: false,
                                disabled: false,
                                readonly: false,
                                name: "search_name",  
                                onInput$: onSearchQRL
                            }}  ></FormInput>
                        </div>
                        <div class="text-right col-span-1 hidden md:block"></div>
                        <div class="grid grid-cols-3 col-span-3 items-end gap-x-5">
                            <div class="col-span-2">
                                <div class="text-sm md:text-base font-medium mb-2"> {t('app.Select Date@@Select Date')}</div>
                                <div class="">
                                    <FormInput  ref={dateRangePickerRef} {...{
                                        type: "text",
                                        placeholder: "",
                                        required: true,
                                        disabled: false,
                                        readonly: false,
                                        name: "daterange",  
                                    }}  ></FormInput>
                                </div>
                            </div>
                            <div class="col-span-1">
                                <button type="submit" class={`btnPrimary rounded text-lg py-2.5 md:py-3 w-full text-center sm:w-24 ` } disabled={isWaitingCheck.value ? true : false}> {t('app.Apply@@Apply')}</button>
                            </div>
                        </div>
                    </div>
                </form>
                {refData.value && refData.value.length ? (
                    <> 
                    {/* desktop view start */}
                    <div class="hidden md:block overflow-x-auto w-screen sm:w-full -ml-7 sm:ml-0">
                        <table class="report-table w-full border rounded overflow-hidden">
                            <thead>
                                <tr>
                                    <td class="font-semibold px-2.5 py-5 text-center">#</td>
                                   
                                    <td class="font-semibold px-2.5 py-5">{t('referral.Date@@Date')}</td>
                                    <td class="font-semibold px-2.5 py-5"> {t('referral.Created On@@Created On')}</td>
                                    <td class="font-semibold px-2.5 py-5"> {t('referral.Last Login@@Last Login')}</td>
                                    <td class="font-semibold px-2.5 py-5"> {t('referral.First Deposit@@First Deposit')}</td>
                                    <td class="font-semibold px-2.5 py-5">{t('referral.Last Deposit@@Last Deposit')}</td>
                                </tr>
                            </thead>
                            <tbody>
                                {currentTableData.value?.map((item: any, index: number)=>(
                                    <>
                                    <tr>
                                        <td class="py-5 px-2.5 opacity-70">{index + 1}</td>
                                        <td class="py-5 px-2.5 font-semibold">{item.user_name}</td>
                                        <td class="py-5 px-2.5 opacity-70">{item.created_on}</td>
                                        <td class="py-5 px-2.5 opacity-70">{item.last_login}</td>
                                        <td class="py-5 px-2.5 opacity-70">{item.fst_depo}</td>
                                        <td class="py-5 px-2.5 opacity-70">{item.lst_depo}</td>
                                    </tr>
                                    </>
                                ))}
                                <tr>
                                    <td colSpan={6} class="py-4 px-2.5">
                                    
                                        <Pagination 
                                        componentClass="  text-right"                    
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
                        {currentTableData.value?.map((item: any)=>(
                            <>
                            <div class="rounded-xl referralItem p-3 mb-2.5">
                                <div class="mb-4 font-semibold">{item.user_name}</div>
                                <div class="grid grid-cols-4 gap-x-3 gap-y-3 items-center">
                                    <div class="col-span-1">{t('referral.Date of Joining@@Date of Joining')}</div>
                                    <div class="col-span-1">{t('referral.Last Login@@Last Login')}</div>
                                    <div class="col-span-1">{t('referral.First Deposit@@First Deposit')}</div>
                                    <div class="col-span-1">{t('referral.Last Deposit@@Last Deposit')}</div>
                                    <div class="col-span-1 text-xs">{item.created_on}</div>
                                    <div class="col-span-1 text-xs">{item.last_login}</div>
                                    <div class="col-span-1 text-xs">{item.fst_depo}</div>
                                    <div class="col-span-1 text-xs">{item.lst_depo}</div>
                                </div>
                            </div>
                            </>
                        ))}
                      
                        <Pagination 
                                componentClass="  text-right text-center py-7"    
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
                ) : (
                    <>
                    <div class="font-semibold px-2.5 py-5 text-center">{t('referral.No Referrals@@No Referrals this month.')}</div>
                    </>
                )}
            </div>
        </div>
    </>;
})