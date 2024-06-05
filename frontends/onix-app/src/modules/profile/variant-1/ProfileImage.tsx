import { component$, useStylesScoped$ ,useStyles$} from '@builder.io/qwik'; 
import styles from './ProfileImage.scss?inline';
import { DiamondIcon } from '../../../components/icons/Diamond';
import memberLevelCommonStyles from '~/components/member-level-styles/MemberLevelCommonStyles1.scss?inline';
import { inlineTranslate } from 'qwik-speak';
type Props = {
    memberLevel: string | undefined | null;
    username: string | undefined | null;
    isShowMobile: boolean;
};

export default component$((props: Props) => {
    useStylesScoped$(styles);
    const t = inlineTranslate();
    useStyles$(memberLevelCommonStyles);
    return <>
        <div class={`profile-box text-center pt-4 lg:absolute lg:left-16 lg:-top-24 lg:flex lg:items-center lg:w-[562px] lg:h-52 lg:pt-0.5 lg:pl-2` + (!props.isShowMobile ? ` hidden` : ``)}>
            <div class="relative rounded-full profile-pic-bg inline-block p-1 w-40 h-40 lg:w-48 lg:h-48">
                <div class="bg-[#EAE6E0] rounded-full w-full h-full flex-center">
                    <img src="/images/dummy_images/profile_pic_2.png" class="w-24 h-24 md:w-30 md:h-30" width="120" height="120" />
                </div>
                <div class="member-level absolute w-9 h-9 left-32 lg:left-40 bottom-4 lg:bottom-9 rounded-full p-0.5">
                    <div class="bg-black rounded-full w-full h-full pt-1 text-center">
                        <span class={`member-level-icon  text-2xl flex justify-center ${(props.memberLevel||"").toLowerCase()}`}><DiamondIcon></DiamondIcon></span> 
                    </div>
                </div>
            </div>
        <div class="text-left hidden lg:block lg:ml-12">
                <div class="font-medium text-2xl mb-2">{props.username}</div>
                <div class={`member-level-title text-sm font-semibold py-1 px-4 ` + (props.memberLevel||"").toLowerCase()} >{ t((props.memberLevel||"").toLowerCase()).toUpperCase()} {t('app.Member Level@@Member Level')}</div>
            </div>
        </div>
    </>;
})