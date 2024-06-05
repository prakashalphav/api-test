import { component$ ,useStylesScoped$, Resource  } from '@builder.io/qwik'; 
import styles from './ReferralDownline.scss?inline';
import ReferralDownline from '../../../modules/profile/variant-1/referral-downline/ReferralDownline';
import { routeLoader$  } from '@builder.io/qwik-city';
import { getProfileData } from '../../../services/contentDB';
import {
    inlineTranslate,  
  } from 'qwik-speak';
import { useGetProfileLayout } from '../layout';
import {
    useSpeak,
 } from 'qwik-speak';
export const useGetProfileData = routeLoader$( async ( ev) => {
    const {commonData}= await ev.resolveValue(useGetProfileLayout);
    const profileData = getProfileData(ev, 'referral-downline');
    return { profileData, commonData };
});

export default component$(() => {
    useStylesScoped$(styles);
    const GetProfileData = useGetProfileData();
    const {profileData, commonData} = GetProfileData.value; 

    const t = inlineTranslate();
    useSpeak({assets:['profile', 'referral' ],});
    return <>
    
        <Resource value={profileData} 
            onPending={() => <div>Loading...</div>}
            onRejected={(e) => <div>Error : {(JSON.parse(e.message).message)}</div>}
            onResolved={(d) => ( <>
                <ReferralDownline data={d.d} commonData={commonData.d}></ReferralDownline>
            </>)}/> 
    </>;
})