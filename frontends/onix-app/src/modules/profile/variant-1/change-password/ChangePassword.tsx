import { component$, useStylesScoped$ ,useStyles$,} from '@builder.io/qwik'; 
import styles from './ChangePassword.scss?inline';
import type { CommonViewData } from '../../../../services/types';
import { useChangePassword } from "../../../../hooks/business/useChangePassword";
import SubmitBtn from "../../../../components/button/variant-1/Button1";
import FormInput from "../../../../components/form-input/variant-1/FormInput1";
import AlertMsg from "../../../../components/alert-msg/variant-1/AlertMsg1"; 
import ProfileImage from '../ProfileImage';
import buttonActionStyles from "~/components/button-action-styles/variant-1/ButtonActionStyles1.scss?inline";
import ArrowRight2Icon from "~/components/icons/ArrowRight2";
import {
    inlineTranslate,  
  } from 'qwik-speak';
  
type Props = {
    commonData: CommonViewData | null;
};

export default component$((props: Props) => {
    useStylesScoped$(styles);
    useStyles$(buttonActionStyles);
    const t = inlineTranslate();
    const user_member_level = props.commonData?.member_level?.toLowerCase() == 'new' ? 'New' : props.commonData?.member_level;
    const { init } = useChangePassword();
    const { onSubmitQRL, form, result, isWaiting} = init();

    return <>
        <div class="profile-outer-container px-3 pb-6 rounded-lg lg:pt-32 relative lg:mt-28 w-full">
            <ProfileImage memberLevel={user_member_level} username={props.commonData?.user_name} isShowMobile={false}></ProfileImage>
            <div class="profile-inner-container pt-8 pb-4 sm:pt-0 px-3 lg:px-6 lg:pt-6 lg:pb-12  rounded-lg">
                <AlertMsg   message={result}></AlertMsg>
                <form ref={form} method="POST" preventdefault:submit onSubmit$={onSubmitQRL}   >
                    <div class="lg:flex lg:justify-between lg:mb-9">
                        <div class="mb-5 lg:w-1/2 lg:mr-8">
                            <div class="text-sm font-medium profile-field-text">{t('profile.Current Password@@Current Password')} * </div>
                            <div class="lg:max-w-[429px]">
                                <FormInput
                                    {...{
                                    ...{
                                        type: "password",
                                        placeholder: "",
                                        required: true,
                                        disabled: false,
                                        readonly: false,
                                        maxLength: 100,
                                        name: "currentPwd",
                                    },
                                    }}
                                    id="current-pwd"
                                ></FormInput> 
                            </div>
                        </div>
                        <div class="mb-5 lg:w-1/2">
                            <div class="text-sm font-medium profile-field-text"> {t('profile.New Password@@New Password')} *</div>
                            <div class="lg:max-w-[429px]">
                                <FormInput
                                    {...{
                                    ...{
                                        type: "password",
                                        placeholder: "",
                                        required: true,
                                        disabled: false,
                                        readonly: false,
                                        maxLength: 100,
                                        name: "newPwd",
                                    },
                                    }}
                                    id="new-pwd"
                                ></FormInput> 
                            </div>
                        </div>
                    </div>
                    <div class="lg:flex">
                        <div class="mb-5 lg:w-1/2 lg:mr-8">
                            <div class="text-sm font-medium profile-field-text"> {t('app.Confirm Password@@Confirm Password')} *</div>
                            <div class="relative lg:max-w-[429px]">
                                <FormInput
                                    {...{
                                    ...{
                                        type: "password",
                                        placeholder: "",
                                        required: true,
                                        disabled: false,
                                        readonly: false,
                                        maxLength: 100,
                                        name: "confirmPwd",
                                    },
                                    }}
                                    id="confirm-pwd"
                                ></FormInput> 
                            </div>
                        </div>
                        <div class="mb-5 lg:w-1/2 lg:max-w-[429px] flex justify-end items-center text-center">
                            <a href="/profile" class="cancel-btn h-9 w-24 mr-2.5 pt-2 pb-2.5 rounded-full inline-block text-sm">Cancel</a>
                            <SubmitBtn
            icon={ArrowRight2Icon}  
                                type={"submit"}
                                text= {t('app.Save@@Save')} 
                                isWaiting={isWaiting}
                            ></SubmitBtn>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </>;
})