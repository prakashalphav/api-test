import { component$, useStyles$, useStylesScoped$ } from '@builder.io/qwik'; 
import styles from './MyPromo.scss?inline';
import type { ProfileData, CommonViewData } from '../../../../services/types';
import ProfileImage from '../ProfileImage';
import buttonActionStyles from "~/components/button-action-styles/variant-1/ButtonActionStyles1.scss?inline";
import {
    inlineTranslate,  
  } from 'qwik-speak';
  
type Props = {
    data: ProfileData | null;
    commonData: CommonViewData | null;
};

export default component$((props: Props) => {
    useStyles$(buttonActionStyles);
    useStylesScoped$(styles);
    // console.log(props.data);
    const user_member_level = props.commonData?.member_level?.toLowerCase() == 'new' ? 'New' : props.commonData?.member_level;
    const t = inlineTranslate();

    return <>
        {props.data && (
            <>
            <div class="profile-outer-container px-3 pb-6 rounded-lg lg:pt-32 relative lg:mt-28 w-full">
                <ProfileImage memberLevel={user_member_level} username={props.commonData?.user_name} isShowMobile={false}></ProfileImage>
                <div class="profile-inner-container pt-4 pb-4 px-3 lg:px-6 lg:pt-6 lg:pb-12 rounded-lg">
                    <div class="flex flex-wrap justify-between sm:justify-start lg:mb-16">
                        <div class="mb-5 sm:mb-9 w-1/2 pr-0.5 sm:w-40 lg:w-52">
                            <div class="text-sm font-medium profile-field-text"> {t('profile.Promotion@@Promotion')}</div>
                                <div class="field-box p-1  lg:p-0 lg:border-0 text-base font-medium lg:leading-6 rounded">{props.data.promo_event_info?.event_title?? '-'}</div>
                        </div>
                        <div class="mb-5 sm:mb-9 w-1/2 pr-0.5 sm:w-40 lg:w-52">
                            <div class="text-sm font-medium profile-field-text">{t('profile.Promotion Type@@Promotion Type')}</div>
                            <div class="field-box p-1  lg:p-0 lg:border-0 text-base font-medium lg:leading-6 rounded">{props.data.myPromo?.promo_type?? '-'}</div>
                        </div>
                        <div class="mb-5 sm:mb-9 w-1/2 pr-0.5 sm:w-40 lg:w-52">
                            <div class="text-sm font-medium profile-field-text">{t('profile.Total BonusDeposit@@Total Bonus + Deposit')}</div>
                            <div class="field-box p-1  lg:p-0 lg:border-0 text-base font-medium lg:leading-6 rounded">{props.data.myPromo?.total?? '-'}</div>
                        </div>
                        <div class="mb-5 sm:mb-9 w-1/2 pr-0.5 sm:w-40 lg:w-52">
                            <div class="text-sm font-medium profile-field-text">{t('profile.Current Turnover@@Current Turnover')}</div>
                            <div class="field-box p-1  lg:p-0 lg:border-0 text-base font-medium lg:leading-6 rounded">{props.data.myPromo?.reached_turnover?? '-'}</div>
                        </div>
                        <div class="mb-5 sm:mb-9 w-1/2 pr-0.5 sm:w-40 lg:w-52">
                            <div class="text-sm font-medium profile-field-text">{t('profile.Condition Promotion Ends@@Condition Promotion Ends')}</div>
                            <div class="field-box p-1  lg:p-0 lg:border-0 text-base font-medium lg:leading-6 rounded">{props.data.myPromo?.stored_turnover?? '-'}</div>
                        </div>
                        {!!props.data.myPromo?.winning_multiply_check && props.data.myPromo?.winning_multiply_check == 1 && (
                            <>
                            <div class="mb-5 sm:mb-9 w-1/2 pr-0.5 sm:w-40 lg:w-52">
                                <div class="text-sm font-medium profile-field-text">{t('profile.Total Winlose@@Total Winlose')}</div>
                                <div class="field-box p-1  lg:p-0 lg:border-0 text-base font-medium lg:leading-6 rounded">{props.data.myPromo?.reached_winning?? '-'}</div>
                            </div>
                            <div class="mb-5 sm:mb-9 w-1/2 pr-0.5 sm:w-40 lg:w-52">
                                <div class="text-sm font-medium profile-field-text">{t('profile.Winlose Target@@Winlose Target')}</div>
                                <div class="field-box p-1  lg:p-0 lg:border-0 text-base font-medium lg:leading-6 rounded">{props.data.myPromo?.winning_target?? '-'}</div>
                            </div>
                            </>
                        )}
                        <div class="mb-5 sm:mb-9 w-1/2 pr-0.5 sm:w-40 lg:w-52">
                            <div class="text-sm font-medium profile-field-text">{t('profile.Promotion End Date@@Promotion End Date')}</div>
                            <div class="field-box p-1  lg:p-0 lg:border-0 text-base font-medium lg:leading-6 rounded">{props.data.myPromo?.promotion_end_at?? '-'}</div>
                        </div>
                        <div class="mb-5 sm:mb-9 w-1/2 pr-0.5 sm:w-40 lg:w-52">
                            <div class="text-sm font-medium profile-field-text">{t('profile.Promo Status@@Promo Status')}</div>
                            <div class={`inline-block  pb-2 lg:border-0 font-medium lg:leading-6 rounded-full label-` + (props.data.myPromo?.status_type?? '')}>{props.data.myPromo?.status_name?? '-'}</div>
                        </div>
                    </div>
                </div>
            </div>
            </>
        )}
    </>;
})