import { component$, useStylesScoped$, useStyles$, $} from '@builder.io/qwik'; 
import styles from './ActivateReferral.scss?inline';
import ProfileImage from '../ProfileImage';
import type { ActivateReferralData } from '~/services/types';
import memberLevelCommonStyles from '~/components/member-level-styles/MemberLevelCommonStyles1.scss?inline';
import { inlineTranslate } from 'qwik-speak';
// import Checkbox from '~/components/checkbox/variant-1/Checkbox1';
import { useCommonViewData } from "~/hooks/app/useCommonViewData";
import FormInput from "~/components/form-input/variant-1/FormInput1";
import InputFile from "~/components/input-file/variant-1/InputFile1";
import Button from "~/components/button/variant-1/Button1";
import FormFieldWrapper from "~/components/form-field-wrapper/FormFieldWrapper1";
import UserFundAccounts from "~/components/user-fund-accs/UserFundAccounts";
import AddFundAccModal from '~/modules/deposit/variant-1/add-fund-acc-modal/AddFundAccModal';
import { emailPattern, remoteChkEmailQRL } from "~/utils/validation";
import { useActivateReferral, chkOtpIsVerified } from '~/hooks/business/useActivateReferral';
import TermsCheckbox from './partials/TermsCheckbox';

type Props = {
    data: ActivateReferralData | null;
};

export default component$((props: Props) => {
    useStylesScoped$(styles);
    useStyles$(memberLevelCommonStyles);
  
    const {commonData: cd} = useCommonViewData();
    const t = inlineTranslate();
    // console.log(props.data, cd.website_settings);
    const {
        isWaiting,
        showAddFundAccModal,
        formStatus,
        setFieldQRL,
        addFundAccResource,
        activateReferralForm,
        selUserWallet,
        onSelUserWalletQrl,
        toggleAddFundAccMdQRL,
        onSubmitQRL,
        showStep2Form,
        onClickNextStep,
        otpSubmitResult,
        sendOTP,
        verifyOTP,
        is_disable_send_otp,
    } = useActivateReferral(cd.website_settings.has_otp_refferal, props.data?.User?.first_name);
    const isVerifiedOtp = chkOtpIsVerified(otpSubmitResult);

    return <>
        <AddFundAccModal
            accNoMinLength={cd.acc_length || 0}
            addFundAccResource={addFundAccResource}
            showAddFundAccModal={showAddFundAccModal}
            toggleAddFundAccMdQRL={toggleAddFundAccMdQRL}
        ></AddFundAccModal> 

        <div class="profile-outer-container px-0 sm:px-3 pb-6 rounded-lg lg:pt-32 relative lg:mt-28 w-full">
            <ProfileImage memberLevel={props.data?.User?.member_level} username={props.data?.User?.user_name} isShowMobile={true}></ProfileImage>
            <div class="profile-inner-container mt-4 lg:mt-0 pt-4 pb-4 px-3 lg:px-6 lg:pt-6 lg:pb-12 lg:rounded-lg">
                <div class="mb-6 font-bold text-xl">{t('app.Activation Referral Form@@Activation Referral Form')}</div>
                {(!props.data?.latest_activate_record || (props.data?.latest_activate_record && props.data?.latest_activate_record.status == 7)) &&
                    <>
                    <form
                        ref={activateReferralForm}
                        method="POST"
                        noValidate
                        enctype="multipart/form-data"
                        preventdefault:submit
                        onSubmit$={onSubmitQRL}
                    > 
                        <div class={`step_one_form mb-6 grid grid-cols-1 md:grid-cols-2 gap-6 ${!showStep2Form.value ? 'block': 'hidden'}`}>
                            {/* TODO brandon - verify otp by mobile or email option */}
                            {/* <div class="col-span-1 md:col-span-2">
                                <label for="reg-email" class="block pb-2">
                                    {t('app.Verify Type@@Verify Type')} *
                                </label>
                                <ul class="opt-list grid grid-cols-2 gap-4 my-1.5 overflow-hidden pr-2">
                                    <li class="pay-opt wallet-type rounded-[10px] p-2 cursor-pointer">
                                        <Checkbox
                                            type="radio"
                                            id='otp_verify_type'
                                            name="otp_verify_type"
                                            value="game"
                                            checked={true}
                                            direction="flex-row"
                                        >
                                            <div class="flex-center gap-4 leading-tight">
                                            <div class="min-w-0 flex-auto">
                                                <p class="text-xs font-semibold">
                                                {t('app.Game Wallet@@Game Wallet')}
                                                </p>
                                                <p class="text-sm text-secondary">
                                                </p>
                                            </div>
                                            </div>
                                        </Checkbox>
                                    </li>
                                    <li class="pay-opt wallet-type rounded-[10px] p-2 cursor-pointer">
                                        <Checkbox
                                            type="radio"
                                            id='otp_verify_type'
                                            name="otp_verify_type"
                                            value="referral"
                                            direction="flex-row"
                                        >
                                            <div class="flex-center gap-4 leading-tight">
                                            <div class="min-w-0 flex-auto">
                                                <p class="text-xs font-semibold">
                                                {t('app.Referral Wallet@@Referral Wallet')}
                                                </p>
                                                <p class="text-sm text-secondary">
                                                </p>
                                            </div>
                                            </div>
                                        </Checkbox>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <label for="reg-mobile" class="block pb-2">
                                    {t('app.Phone Number@@Phone Number')}* 
                                </label>
                                <FormInput
                                {...{
                                    ...{
                                    type: "tel",
                                    placeholder: "",
                                    required: true,
                                    disabled: false,
                                    readonly: false,
                                    maxLength: 20,
                                    rules :{
                                        required :  {rule : true }, 
                                        pattern :  {rule : mobileNoPattern },
                                        maxLength :   {rule : 20 }, 
                                        remote :{
                                        rule : remoteChkMobileNoQRL, 
                                        } 
                                    },
                                    name: "mobile_no",
                                    setField$: setFieldQRL,
                                    form : validatedForm,
                                    },
                                }}
                                id="reg-mobile"
                                ></FormInput>
                            </div> */}
                            <div class="">
                                <label for="reg-email" class="block pb-2">
                                    {t('app.Email@@Email')} *
                                </label>
                                <div>
                                <FormInput
                                    {...{
                                        ...{
                                        type: "email",
                                        placeholder: "",
                                        required: true,
                                        disabled: false,
                                        readonly: isVerifiedOtp ? true : false,
                                        maxLength: 100,
                                        rules :{
                                            required :  {rule : true }, 
                                            pattern :  {rule : emailPattern }, 
                                            remote :{
                                                rule: remoteChkEmailQRL, 
                                            } 
                                        },
                                        name: "email",
                                        value: props.data?.User?.email,
                                        setField$: setFieldQRL,
                                        form : formStatus,
                                        },
                                    }}
                                    id="reg-email"
                                ></FormInput>
                                </div>
                            </div>
                            <div class="">
                                <label for="otp" class="block pb-2 ">
                                    {t('app.OTP@@OTP')} *
                                </label>
                                <div class="flex items-start">
                                    <input type="hidden" name="otp_success_code" value={otpSubmitResult.value.d?.success_code} />
                                    <FormInput
                                        {...{
                                            ...{
                                                type: "text",
                                                placeholder: "-",
                                                required: true,
                                                disabled: true,
                                                readonly: true,
                                                maxLength: 6,
                                                name: "otp_prefix",
                                                form: formStatus,
                                                class: "shrink-0 input--md",
                                                inlineStyle: "min-width:5rem",
                                            },
                                        }}
                                        id="otp_prefix"
                                    ></FormInput>
                                    <FormInput
                                        {...{
                                            ...{
                                            type: "text",
                                            placeholder: "",
                                            required: true,
                                            disabled: isVerifiedOtp, 
                                            readonly: false,
                                            maxLength: 6,
                                            rules :{
                                                required : {rule : true }, 
                                                maxLength : {rule : 6 }, 
                                            },
                                            name: "otp",
                                            setField$ : setFieldQRL,
                                            form : formStatus,
                                            class : "flex-auto input--md"
                                            },
                                        }}
                                        id="otp"
                                    ></FormInput>
                                    <Button 
                                        isWaiting={isWaiting}
                                        class={`${isVerifiedOtp ?? 'hover:opacity-80'} ml-1 sm:ml-2 btnPrimary rounded py-3.5 px-3 whitespace-nowrap leading-normal`}
                                        type="button"
                                        text={t("app.Verify@@Verify")}
                                        onClick$={verifyOTP}
                                        disabled={isVerifiedOtp}
                                    />
                                    <Button 
                                        isWaiting={isWaiting}
                                        class={`${is_disable_send_otp.value ?? 'hover:opacity-80'} ml-1 sm:ml-2 btnPrimary rounded py-3.5 px-3 whitespace-nowrap leading-normal`}
                                        type="button"
                                        text={t("app.Send OTP@@Send OTP")}
                                        onClick$={sendOTP}
                                        disabled={is_disable_send_otp}
                                    />
                                </div>
                                {otpSubmitResult.value.message &&
                                    <div class={`mt-3 ${otpSubmitResult.value.type == 'f' ? 'feedback-error' : 'feedback-success'}`}>
                                        {otpSubmitResult.value.message}
                                    </div>
                                }
                            </div>
                            <div class="">
                                <label for="dp-fund" class="block pb-2 ">
                                    {t('wallet.Registered Fund Accounts@@Registered Fund Accounts')} *
                                </label>
                                <FormFieldWrapper
                                    fieldName="bank_name"
                                    required={true}
                                    msgPosition="bottom"
                                    value={selUserWallet.value}
                                    rules={{
                                        required :  {rule : true },
                                    }}
                                    setField$={setFieldQRL}
                                    form={formStatus}
                                >
                                    <UserFundAccounts
                                        userBanks={Object.values(props.data?.userBanks)}
                                        onChgUserWallet$={onSelUserWalletQrl}
                                        selUserWallet={selUserWallet}
                                    />
                                </FormFieldWrapper>
                                {(props.data?.user_ewallet_add_status || props.data?.user_bank_add_status) &&
                                    <button 
                                        onClick$={async ()=>{
                                            await toggleAddFundAccMdQRL()
                                        }} 
                                        type="button" class="my-4 text-xs font-bold underline"
                                    >
                                        {t('wallet.Add more@@Add more')}  
                                    </button>
                                } 
                            </div>
                            <div class="">
                                <label for="name" class="block pb-2 ">
                                    {t('app.Account Name@@Account Name')} *
                                </label>
                                <div>
                                <FormInput
                                    {...{
                                    ...{
                                        type: "text",
                                        placeholder: "",
                                        required: true,
                                        disabled: false,
                                        readonly: props.data?.User?.first_name ? true : false,
                                        maxLength: 100,
                                        value: props.data?.User?.first_name,
                                        setField$: setFieldQRL,
                                        form: formStatus,
                                        name: "name",
                                        rules:{
                                            required : {rule : $(()=>{
                                                return props.data?.User?.first_name ? true : false;
                                            })},
                                            pattern : {rule : $(()=>{
                                                return props.data?.User?.first_name ? props.data?.fullname_regex : null;
                                            })},
                                        },
                                    },
                                    }}
                                    id="name"
                                ></FormInput>
                                </div>
                            </div>
                            <div class="">
                                <label for="user_identification" class="block pb-2">
                                    {t('app.ID CARD (KTP / SIM / PASSPORT)@@ID CARD (KTP / SIM / PASSPORT)')} *
                                </label>
                                <div>
                                    <FormFieldWrapper
                                        fieldName="user_identification"
                                        required={true}
                                        msgPosition="bottom"
                                        rules={{
                                            required :  {rule : true },
                                        }}
                                        setField$={setFieldQRL}
                                        form={formStatus}
                                    >
                                        <InputFile name="user_identification"></InputFile>
                                    </FormFieldWrapper>
                                </div>
                            </div>
                            <div class="text-right self-end mr-6">
                                <Button 
                                    isWaiting={isWaiting}
                                    type="button"
                                    text={t("app.Next@@Next")} 
                                    onClick$={onClickNextStep}
                                />
                            </div>
                        </div>
                        <div class={`step_two_form mb-6 ${showStep2Form.value ? 'block': 'hidden'}`}>
                            <div class="leading-normal mb-6" dangerouslySetInnerHTML={ props.data?.referral_tnc }></div>
                            <div class="mb-6">
                                <FormFieldWrapper
                                    fieldName="tnc_chkbox"
                                    required={true}
                                    msgPosition="bottom"
                                    rules={{
                                        required: {
                                            rule: true,
                                            message: t('app.Confirmation of Terms & Conditions is required@@Confirmation of Terms & Conditions is required')
                                        },
                                    }}
                                    setField$={setFieldQRL}
                                    form={formStatus}
                                >
                                    <TermsCheckbox />
                                </FormFieldWrapper>
                            </div>
                            <div class="text-center">
                                <Button 
                                    isWaiting={isWaiting}
                                    type="submit"
                                    text={t("app.Submit@@Submit")} 
                                />
                            </div>
                        </div>
                    </form>
                    {props.data?.latest_activate_record?.status && props.data.latest_activate_record.status == 7 &&
                        <div class="rounded inline-block p-2.5" id="result-text">
                            {t('app.Your submission to activate referral is in rejected due to@@Your submission to activate referral is in rejected due to')} {props.data.latest_activate_record.reject_reason ?? ""}
                        </div>
                    }
                    </>
                }
                {props.data?.latest_activate_record?.status && props.data.latest_activate_record.status == 1 &&
                    <div class="rounded inline-block p-2.5" id="result-text">
                      {t('app.Your submission to activate referral is in process.@@Your submission to activate referral is in process.')}
                    </div>
                }
                <picture>
                    <source media="(min-width: 640px)" srcSet="https://files.sitestatic.net/assets/imgs/asf/ASF_desktop.webp"  width="350" height="140"  /> 
                    <img class="mx-auto" src="https://files.sitestatic.net/assets/imgs/asf/ASF_mobile.webp" width="200" height="78" alt="asf"/>
                </picture>
            </div>
        </div>
    </>;
})