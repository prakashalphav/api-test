import { component$, useStyles$, useStylesScoped$ } from '@builder.io/qwik'; 
import styles from './MyBonus.scss?inline';
import type { ProfileData, CommonViewData } from '~/services/types';
import ProfileImage from '../ProfileImage';
import { useBonus } from "~/hooks/business/useBonus";
import BonusPopup from '~/modules/bonus-history-popup/variant-1/BonusHistoryPopup';
import buttonActionStyles from "~/components/button-action-styles/variant-1/ButtonActionStyles1.scss?inline";
import { numFormat } from "~/utils/common";
import ProgressBar1 from '~/components/progress-bar/variant-1/ProgressBar1';
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
    const t = inlineTranslate();
    // console.log(props.data);
    const bonusData = props.data?.myBonus?.data;
    const user_member_level = props.commonData?.member_level?.toLowerCase() == 'new' ? 'New' : props.commonData?.member_level;
    const { init } = useBonus();
    const { onSubmitQRL, form, bonus, applyBonus, isWaitingApply, isWaitingCheck, checkHistory, bonusHistory } = init();

    return <>
            <div class="profile-outer-container px-3 pb-6 rounded-lg lg:pt-32 relative lg:mt-28 w-full">
                <ProfileImage memberLevel={user_member_level} username={props.commonData?.user_name} isShowMobile={false}></ProfileImage>
        {bonusData && (
            <>
                <div class="profile-inner-container px-3 pt-4 pb-4 lg:px-6 lg:pt-6 lg:pb-12 rounded-lg">
                    <div class="flex flex-wrap justify-between sm:justify-start lg:mb-16">
                        <div class="mb-5 sm:mb-9 w-full pr-0.5">
                                <button class=" btnPrimary text-sm font-medium inline-block rounded py-1.5 px-2.5 border" onClick$={() => checkHistory()}> {t('profile.Check bonus history@@Check bonus history')}</button>
                        </div>
                        <BonusPopup data={bonusHistory.value}></BonusPopup>
                        <div class="mb-5 sm:mb-9 w-1/2 pr-0.5 sm:w-40 lg:w-52">
                            <div class="text-sm font-medium profile-field-text"> {t('app.My Bonus@@My Bonus')}</div>
                            <div class="field-box p-1  lg:border-0 text-base font-medium lg:leading-6 rounded">
                                {bonusData.event_title?? '-'}
                            </div>
                        </div>
                        <div class="mb-5 sm:mb-9 w-1/2 pr-0.5 sm:w-40 lg:w-52">
                            <div class="text-sm font-medium profile-field-text"> {t('profile.Bonus Type@@Bonus Type')}</div>
                            <div class="field-box p-1  lg:border-0 text-base font-medium lg:leading-6 rounded">
                                {bonusData.bonus_freq_type?? '-'}
                            </div>
                        </div>
                        <div class="mb-5 sm:mb-9 w-1/2 pr-0.5 sm:w-40 lg:w-52">
                            <div class="text-sm font-medium profile-field-text"> {t('profile.Total Bonus Credit@@Total Bonus Credit')}</div>
                            <div class="field-box p-1  lg:border-0 text-base font-medium lg:leading-6 rounded">
                                {props.data?.currency} {numFormat(bonusData.bonus_credit, 2)}
                            </div>
                        </div>
                        <div class="mb-5 sm:mb-9 w-1/2 pr-0.5 sm:w-40 lg:w-52">
                            <div class="text-sm font-medium profile-field-text"> {t('profile.Turnover Target@@Turnover Target')}</div>
                            <div class="field-box p-1  lg:border-0 text-base font-medium lg:leading-6 rounded">
                                {props.data?.currency} {numFormat(bonusData.bonus_credit, 2)} x {bonusData.turnover_multiply}
                                <br/> = {props.data?.currency} {numFormat(bonusData.turnover_target, 2)}
                            </div>
                        </div>
                        <div class="mb-5 sm:mb-9 w-1/2 pr-0.5 sm:w-40 lg:w-52">
                            <div class="text-sm font-medium profile-field-text"> {t('profile.Current Turnover@@Current Turnover')}</div>
                            <div class="field-box p-1  lg:border-0 text-base font-medium lg:leading-6 rounded">
                                {props.data?.currency} {numFormat(bonusData.reached_turnover, 2)}
                            </div>
                        </div>
                        <div class="mb-5 sm:mb-9 w-1/2 pr-0.5 sm:w-40 lg:w-52">
                            <div class="text-sm font-medium profile-field-text"> {t('profile.Bonus Turnover Progress@@Bonus Turnover Progress')}</div>
                            <ProgressBar1 progress={bonusData.reached_turnover_progress_percent} displayText={true} class="mt-2.5"></ProgressBar1>
                        </div>
                        {bonusData.winning_multiply_check == 1 && (
                        <>
                        <div class="mb-5 sm:mb-9 w-1/2 pr-0.5 sm:w-40 lg:w-52">
                            <div class="text-sm font-medium profile-field-text"> {t('profile.Winning Target@@Winning Target')}</div>
                            <div class="field-box p-1  lg:border-0 text-base font-medium lg:leading-6 rounded">
                                {props.data?.currency} {numFormat(bonusData.bonus_credit, 2)} x {bonusData.winning_multiply}
                                <br/> = {props.data?.currency} {numFormat(bonusData.winning_target, 2)}
                            </div>
                        </div>
                        <div class="mb-5 sm:mb-9 w-1/2 pr-0.5 sm:w-40 lg:w-52">
                            <div class="text-sm font-medium profile-field-text"> {t('profile.Current Winning@@Current Winning')}</div>
                            <div class="field-box p-1  lg:border-0 text-base font-medium lg:leading-6 rounded">
                                {numFormat(bonusData.reached_winning, 2)}
                            </div>
                        </div>
                        <div class="mb-5 sm:mb-9 w-1/2 pr-0.5 sm:w-40 lg:w-52">
                            <div class="text-sm font-medium profile-field-text"> {t('profile.Bonus Winning Progress@@Bonus Winning Progress')}</div>
                            <ProgressBar1 progress={bonusData.reached_winning_progress_percent} displayText={true} class="mt-2.5"></ProgressBar1>
                        </div>                        
                        </>
                        )}
                        <div class="mb-5 sm:mb-9 w-1/2 pr-0.5 sm:w-40 lg:w-52">
                            <div class="text-sm font-medium profile-field-text">{t('profile.Condition Promotion Ends@@Condition Promotion Ends')}</div>
                            <div class="field-box p-1  lg:border-0 text-base font-medium lg:leading-6 rounded">{bonusData.bonus_end_at?? '-'}</div>
                        </div>

                        {props.data?.myBonus?.message == 'Sorry, member do not have bonus' && (
                            <>
                            <form ref={form} method="POST" preventdefault:submit>
                                <div class="mb-5 sm:mb-9">
                                    <div class="text-sm font-medium profile-field-text mb-2.5">{t('profile.Apply Bonus@@Apply Bonus')}</div>
                                        <input type="text" name="bonus_code" placeholder="Enter Bonus Code" class="field-box-referral lg:max-w-52 p-2.5 pr-8 mr-2.5 rounded inline-block" />
                                        <button class="btnSecondary rounded py-3.5 px-5" disabled={ isWaitingCheck.value ? true:false} onClick$={async () => { await onSubmitQRL()}}>Check</button>
                                </div>
                            </form>
                            </>
                        )}
                        {bonus.value && (
                            <>
                            <div class="w-full bonus-event rounded p-3 border">
                                <div class="text-center mb-3 font-bold">{bonus.value?.event_title}</div>
                                <div class="inline-block w-1/2">{t('profile.Bonus Type@@Bonus Type')}</div>
                                <div class="inline-block w-1/2 text-right mb-2"><div class="event-desc inline-block rounded py-1 px-2">{bonus.value?.bonus_type}</div></div>
                                <div class="inline-block w-1/2">{t('profile.Turnover Multiply@@Turnover Multiply')}</div>
                                <div class="inline-block w-1/2 text-right mb-2"><div class="event-desc inline-block rounded py-1 px-2">{bonus.value?.turnovers}</div></div>
                                <div class="inline-block w-1/2">{t('profile.Winning Multiply@@Winning Multiply')}</div>
                                <div class="inline-block w-1/2 text-right mb-2"><div class="event-desc inline-block rounded py-1 px-2">{bonus.value?.winning_multiply}</div></div>
                                <div class="inline-block w-1/2">{t('profile.Max Bonus Credit@@Max Bonus Credit')}</div>
                                <div class="inline-block w-1/2 text-right mb-2"><div class="event-desc inline-block rounded py-1 px-2">{bonus.value?.max_bonus_credit}</div></div>
                                <div class="text-right mt-10">
                                    <button class="btnPrimary rounded py-2.5 px-5" disabled={ isWaitingApply.value ? true:false} onClick$={() => applyBonus()}>{t('profile.Apply@@Apply')} </button>
                                </div>
                            </div>
                            </>
                        )}
                    </div>
                </div>
            </>
        )}
        </div>
    </>;
})