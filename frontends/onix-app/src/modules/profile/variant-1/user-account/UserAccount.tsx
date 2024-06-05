import { component$, useStylesScoped$ ,useStyles$} from '@builder.io/qwik'; 
import { useLocation } from '@builder.io/qwik-city';
import styles from './UserAccount.scss?inline';
import { CopyIcon } from '~/components/icons/Copy';
import { DiamondIcon } from '~/components/icons/Diamond';
import { InfoIcon } from '~/components/icons/Info';
import { CheckmarkCircleIcon } from '~/components/icons/CheckmarkCircle';
import ToggleSwitch from '~/components/switch/variant-1/ToggleSwitch1';
import ProfileImage from '../ProfileImage';
import type { ProfileData, CommonViewData } from '~/services/types';
import { useProfile } from "~/hooks/business/useProfile";
import AlertMsg from "~/components/alert-msg/variant-1/AlertMsg1"; 
import { copyText } from "~/utils/common";
import memberLevelCommonStyles from '~/components/member-level-styles/MemberLevelCommonStyles1.scss?inline';
import {
    inlineTranslate,  
  } from 'qwik-speak';
import Checkbox2 from '~/components/checkbox/variant-2/Checkbox2';
type Props = {
    data: ProfileData | null;
    cd: CommonViewData | null;
};

export default component$((props: Props) => {
    useStylesScoped$(styles);
    useStyles$(memberLevelCommonStyles);
    const currentLocation = useLocation();
    const t = inlineTranslate();
    const {
        form,
        result,
        isWaiting,
        isWaitingSub,
        isSecondPinOn,
        isSubscribed,
        update2ndpin,
        updateEmailSubscription
    } = useProfile(props.data?.is_2nd_pin_on, props.data?.User?.is_email_subscription);
    const referralLink = currentLocation.url.host + '/register?ref=' + props.data?.User?.agent_id;

    return <>
        <div class="profile-outer-container px-3 pb-6 rounded-lg lg:pt-32 relative lg:mt-28 w-full">
            <ProfileImage memberLevel={props.data?.User?.member_level} username={props.data?.User?.user_name} isShowMobile={true}></ProfileImage>
            <div class="profile-inner-container pt-4 pb-4 px-3 lg:px-6 lg:pt-6 lg:pb-12 lg:rounded-lg">
                <div class="grid grid-cols-1 lg:grid-cols-5 lg:gap-y-16 lg:mb-16">
                    <div class="mb-5">
                        <div class="text-sm font-medium profile-field-text"> {t('profile.Username@@Username')}</div>
                        <div class="field-box p-2.5 lg:p-0 lg:border-0 lg:font-medium lg:leading-6 rounded break-words lg:pr-1">{props.data?.User?.user_name}</div>
                    </div>
                    <div class="hidden lg:block mb-5">
                        <div class="text-sm font-medium profile-field-text"> {t('profile.Member Level@@Member Level')}</div>
                        <div class="field-box p-2.5 lg:p-0 lg:border-0 lg:font-medium lg:leading-6 rounded lg:flex lg:items-center">
                            <div class="member-level inline-block w-9 h-9 rounded-full p-0.5 mr-2.5">
                                <div class="bg-black rounded-full w-full h-full pt-1 text-center">
                                 
<span class={`member-level-icon text-2xl flex justify-center ${(props.data?.User?.member_level ||"").toLowerCase()}`}><DiamondIcon></DiamondIcon></span>
                                </div>
                            </div>
                            <div>{props.data?.User?.member_level}</div>
                        </div>
                    </div>
                    <div class="mb-5">
                        <div class="text-sm font-medium profile-field-text"> {t('profile.Full name@@Full name')}</div>
                        <div class="field-box p-2.5 lg:p-0 lg:border-0 lg:font-medium lg:leading-6 rounded break-words lg:pr-1">{props.data?.User?.fullname ?? '-'}</div>
                    </div>
                    <div class="mb-5">
                        <div class="text-sm font-medium profile-field-text">  {t('app.Email@@Email')}</div>
                        <div class="field-box p-2.5 lg:p-0 lg:border-0 lg:font-medium lg:leading-6 rounded break-words lg:pr-1">
                            <div class="">{props.data?.User?.email}</div>
                        </div>
                    </div>
                    <div class="mb-5">
                        <div class="text-sm font-medium profile-field-text"> {t('profile.Contact No@@Contact No')}</div>
                        <div class="field-box p-2.5 lg:p-0 lg:border-0 lg:font-medium lg:leading-6 rounded break-words lg:pr-1">{props.data?.User?.mobile}</div>
                    </div>
                    {!props.data?.isUseAF && 
                        <div class="mb-5 lg:mr-5 lg:col-span-2">
                            {props.data?.is_activated_referral &&
                                <>
                                <div class="flex items-center text-sm font-medium mb-1 lg:mb-2">
                                    {t('profile.Referral Code@@Referral Code')}
                                    <span class="verified py-0.5 px-1 rounded inline-flex items-center gap-1 ml-2">
                                        <CheckmarkCircleIcon /> {t('app.Verified@@Verified')}
                                    </span>
                                </div>
                                <div
                                    class="field-box-referral p-2.5 rounded flex justify-between items-center"
                                    onClick$={() => { copyText(referralLink); } }
                                >
                                    <span class="">{referralLink}</span>
                                    <span class="ml-2 cursor-pointer"><CopyIcon></CopyIcon></span>
                                </div>
                                </>
                            }
                            {!props.data?.is_activated_referral &&
                                <>
                                <div class="text-sm font-medium mb-1 lg:mb-2">{t('profile.Referral Code@@Referral Code')}</div>
                                <div class="field-box-referral p-2.5 rounded flex justify-between items-center">
                                    <a class="leading-normal" href="/profile/activate-referral">
                                        <span class="unverified py-0.5 px-1 rounded inline-flex items-center gap-1 mr-2">
                                            <InfoIcon /> {t('app.Unverified@@Unverified')}
                                        </span>
                                        <span>{t('app.Click here to activate referral@@Click here to activate referral')}</span>
                                    </a>
                                </div>
                                </>
                            }
                        </div>
                    }
                    {/* <div class="mb-5 lg:mr-5 lg:col-span-2">
                        <div class="text-sm font-medium lg:mb-2"> {t('profile.Referral Code@@Referral Code')}</div>
                        <div
                            class="field-box-referral p-2.5 rounded flex justify-between items-center"
                            onClick$={() => { copyText(referralLink); }}
                        >
                            <span class="">{referralLink}</span>
                            <span class="ml-2 cursor-pointer"><CopyIcon></CopyIcon></span>
                        </div>
                    </div> */}
                    <div class="mb-5">
                        <div class="inline-block lg:block mr-7 lg:mb-5 lg:mr-0"> {t('profile.Second Pin@@Second Pin')}:</div>
                        <div class="inline-block lg:block">
                            <form ref={form} method="POST">

                                <ToggleSwitch name='is_use_second_pin' isWaiting={isWaiting} isOn={isSecondPinOn}
                                onChange$={update2ndpin}
                                value={'1'}
                                > </ToggleSwitch>
                            </form>
                        </div>
                    </div>
                </div>
                { props.cd?.website_settings.is_email_subscription && 
                    <div class="mb-5">
                       
                        <Checkbox2
                        checked={isSubscribed}
                        value="1"
                        disabled={isWaitingSub}
                        name="emailSub"
                        id="emailSub" 
                        type ="checkbox" 
                        onChange$={updateEmailSubscription}
                        >
{t('app.mailingListSubscribeQues@@Would you like to subscribe to mailing list?')}
                        </Checkbox2>
                      
                    </div>
                }
                <AlertMsg  message={result}></AlertMsg>
            </div>
        </div>
    </>;
})