import { component$, useStyles$, useStylesScoped$ } from '@builder.io/qwik'; 
import styles from './MemberLevel.scss?inline';
import ProfileImage from '../ProfileImage';
import { LevelRegularIcon } from '~/components/icons/LevelRegular';
import { LevelSilverIcon } from '~/components/icons/LevelSilver';
import { LevelGoldIcon } from '~/components/icons/LevelGold';
import { LevelPlatinumIcon } from '~/components/icons/LevelPlatinum';
import { PromotionIcon } from '~/components/icons/Promotion';
import { MoneyBagIcon } from '~/components/icons/MoneyBag';
import { CrownRegularIcon } from '~/components/icons/CrownRegular';
import { CrownSilverIcon } from '~/components/icons/CrownSilver';
import { CrownGoldIcon } from '~/components/icons/CrownGold';
import { CrownPlatinumIcon } from '~/components/icons/CrownPlatinum';
import type { MemberLevelData } from '../../../../services/types';
import { init } from "~/hooks/business/useMemberLevel";
import buttonActionStyles from "~/components/button-action-styles/variant-1/ButtonActionStyles1.scss?inline";
import memberLevelCommonStyles from '~/components/member-level-styles/MemberLevelCommonStyles1.scss?inline';
import {
    inlineTranslate,  
  } from 'qwik-speak';
type Props = {
    data: MemberLevelData | undefined;
};
const getIcon = (level: string | null) => {
    let icon = <></>;
    switch (level) {
        case "Regular":
            icon = <LevelRegularIcon class="text-5xl md:text-8xl"></LevelRegularIcon>;
            break;
        case "Silver":
            icon = <LevelSilverIcon class="text-5xl md:text-8xl"></LevelSilverIcon>;
            break;
        case "Gold":
            icon = <LevelGoldIcon class="text-5xl md:text-8xl"></LevelGoldIcon>;
            break;
        case "Platinum":
            icon = <LevelPlatinumIcon class="text-5xl md:text-8xl"></LevelPlatinumIcon>;
            break;
        default:
            icon = <></>;
    } 
    return icon;
}
const getCrownIcon = (level: string | null | undefined) => {
    let icon = <></>;
    switch (level) {
        case "Regular":
            icon = <div class="-mb-5"><CrownRegularIcon class="inline-block text-7xl"></CrownRegularIcon></div>;
            break;
        case "Silver":
            icon = <div class="-mb-5"><CrownSilverIcon class="inline-block text-7xl"></CrownSilverIcon></div>;
            break;
        case "Gold":
            icon = <div class="-mb-5"><CrownGoldIcon class="inline-block text-7xl"></CrownGoldIcon></div>;
            break;
        case "Platinum":
            icon = <div class="-mb-5"><CrownPlatinumIcon class="inline-block text-7xl"></CrownPlatinumIcon></div>;
            break;
        default:
            icon = <></>;
    } 
    return icon;
}

export default component$((props: Props) => {

    useStyles$(buttonActionStyles);
    useStylesScoped$(styles);
   
    useStyles$(memberLevelCommonStyles);

    const t = inlineTranslate();
    const { allLevelSetting, selLevelView, chg_level } = init(props.data?.next_lvl, props.data?.level_settings);
    
    return <>
        {props.data && (
            <>
            <div class="profile-outer-container px-3 pb-6 rounded-lg lg:pt-32 relative lg:mt-28 w-full">
                <ProfileImage memberLevel={props.data.player?.level_name} username={props.data.player?.player_name} isShowMobile={false}></ProfileImage>
                <div class="profile-inner-container pt-4 pb-4 px-3 lg:px-6 lg:pt-6 lg:pb-12 rounded-lg">
                    <div class="bg-black overflow-hidden rounded-lg text-white w-screen sm:w-full -ml-6 sm:ml-0">
                        <div class={`py-7 ` + (selLevelView.value?.level_name) + `-bg` }>
                            <div class="text-center">
                                    { getCrownIcon(props.data.player?.level_name) }
                                    <div class={`relative rounded-full inline-block p-1 w-20 h-20 ` + (props.data.player?.level_name) + `-circle-bg`}>
                                    <img src="/images/dummy_images/profile_pic_2.png" class="w-full h-full"/>
                                </div>
                                <div class="font-medium mb-2"> {t('profile.Your Member Level@@Your Member Level')}</div>
                                <div class={`member-level-title inline-block text-black py-1 px-4 ` + (props.data.player?.level_name||"").toLowerCase()} >{props.data.player?.level_name}  {t('profile.Member Level@@Member Level')}</div>
                            </div>

                            <div class="grid grid-cols-3 gap-x-3 gap-y-5 py-5 px-5 md:px-12 transparent-bg rounded-xl mx-2 md:mx-7 my-7">
                                <div class="col-span-1 grid grid-cols-1 md:grid-cols-2">
                                    <div class="col-span-1 title-secondary" dangerouslySetInnerHTML={t('profile.Current Deposit Amt@@Current<br/>Deposit Amt')}/>
                                    <div class="col-span-1">{ props.data.player?.current_deposit }</div>
                                </div>
                                <div class="col-span-1 grid grid-cols-1 md:grid-cols-2">
                                    <div class="col-span-1 title-secondary" dangerouslySetInnerHTML= {t('profile.Required Turnover@@Required Turnover<br/>Amt for Next Level ')}/>
                                    <div class="col-span-1">{ selLevelView.value?.min_turnover }</div>
                                </div>
                                <div class="col-span-1 grid grid-cols-1 md:grid-cols-2">
                                    <div class="col-span-1 title-secondary" dangerouslySetInnerHTML= {t('profile.Required Deposit Amt@@Required Deposit Amt<br />for Next Level')}/>
                                    <div class="col-span-1">{ selLevelView.value?.min_deposit }</div>
                                </div>
                                <div class="col-span-1 grid grid-cols-1 md:grid-cols-2">
                                    <div class="col-span-1 title-secondary" dangerouslySetInnerHTML= {t('profile.Current<br/>Turnover@@Current<br/>Turnover')}/>
                                    <div class="col-span-1">{ props.data.player?.current_turnover }</div>
                                </div>
                                <div class="col-span-1 grid grid-cols-1 md:grid-cols-2">
                                    <div class="col-span-1 title-secondary" dangerouslySetInnerHTML= {t('profile.Level Upgraded On@@Level Upgraded<br/>On')}/>
                                    <div class="col-span-1">{ props.data.player?.level_start_date }</div>
                                </div>
                                <div class="col-span-1 grid grid-cols-1 md:grid-cols-2">
                                    <div class="col-span-1 title-secondary" dangerouslySetInnerHTML= {t('profile.Level Expire On@@Level Expire If inactive<br/>On')}/>
                                    <div class="col-span-1">{ props.data.player?.level_expired_date }</div>
                                </div>
                            </div>
                            <div class="grid grid-cols-2 md:grid-cols-3 items-center w-10/12 mb-3 mx-auto gap-y-5">
                                <div class="col-span-2 md:col-span-1 text-center">
                                    {props.data.next_lvl?.level_name}  {t('profile.Exclusive@@Exclusive')}
                                </div>
                                <div class="col-span-1 flex items-center highlight-text">
                                    <MoneyBagIcon class="text-3xl mr-3"></MoneyBagIcon>
                                    <div class=""> {t('profile.Higher rebate rate@@Higher rebate rate')}</div>
                                </div>
                                <div class="col-span-1 flex items-center highlight-text">
                                    <PromotionIcon class="text-3xl mr-3"></PromotionIcon>
                                    <div class="" dangerouslySetInnerHTML= {t('profile.Unlock@@Unlock {{level_name}} level<br/>Promotions/Bonus', {level_name :props.data.next_lvl?.level_name })}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3 class="font-semibold text-2xl text-center py-8"> {t('profile.Privileges@@Privileges')}</h3>
                        <div class="grid grid-cols-2 gap-4">
                            {(allLevelSetting.value && allLevelSetting.value.length > 0) && (
                                allLevelSetting.value.map((item: Record<string, null>, index: number) => (
                                    <>
                                    <div class="col-span-1 black-bg rounded-xl overflow-hidden cursor-pointer" onClick$={() => chg_level(index)}>
                                            <div class={`flex items-center text-white p-2 md:p-4 ` + (item.level_name) + `-bg` }>
                                            { getIcon(item.level_name) }
                                            <div class="text-base md:text-xl ml-4 md:ml-8 highlight-text">{item.level_name}</div>
                                        </div>
                                    </div>
                                    </>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>        
            </>
        )}
    </>;
})