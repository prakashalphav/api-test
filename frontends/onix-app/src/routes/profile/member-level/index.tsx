import { component$ ,useStylesScoped$, Resource  } from '@builder.io/qwik'; 
import styles from './MemberLevel.scss?inline';
import MemberLevel from '../../../modules/profile/variant-1/member-level/MemberLevel';
import { routeLoader$  } from '@builder.io/qwik-city';
import { getProfileData } from '../../../services/contentDB';
import { useGetProfileLayout } from '../layout';
import {
    useSpeak,
 } from 'qwik-speak';
export const useGetProfileData = routeLoader$( async ( ev) => {
    const {commonData}= await ev.resolveValue(useGetProfileLayout);
    const profileData = getProfileData(ev, 'member-level');
    return { profileData };
});

export default component$(() => {
    useStylesScoped$(styles);
    const GetProfileData = useGetProfileData();
    const { profileData } = GetProfileData.value;
    useSpeak({assets:['profile', 'referral' ],});
    return <>
        <Resource value={profileData} 
            onPending={() => <div>Loading...</div>}
            onRejected={(e) => <div>Error : {(JSON.parse(e.message).message)}</div>}
            onResolved={(d) => ( <>
                <MemberLevel data={d.d?.member_level}></MemberLevel>
            </>)}/> 
    </>;
})