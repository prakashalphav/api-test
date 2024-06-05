import { component$ ,useStylesScoped$, Resource  } from '@builder.io/qwik'; 
import styles from './MyBonus.scss?inline';
import MyBonus from '../../../modules/profile/variant-1/my-bonus/MyBonus';
import { routeLoader$  } from '@builder.io/qwik-city';
import { getProfileData } from '../../../services/contentDB'; 
import {
    useSpeak,
 } from 'qwik-speak';
import { useGetProfileLayout } from '../layout';
export const useGetProfileData = routeLoader$( async ( ev) => {
    const {commonData}  = await ev.resolveValue(useGetProfileLayout); 
    const profileData = getProfileData(ev, 'my-bonus');
    return { profileData, commonData };
});

export default component$(() => {
    useStylesScoped$(styles);
    const GetProfileData = useGetProfileData();
    const { profileData, commonData } = GetProfileData.value;
    useSpeak({assets:['profile', 'referral' ],});
    return <>
         <Resource value={profileData} 
            onPending={() => <div>Loading...</div>}
            onRejected={(e) => <div>Error : {(JSON.parse(e.message).message)}</div>}
            onResolved={(d) => ( <>
                <MyBonus data={d.d} commonData={commonData.d}></MyBonus>
            </>)}/> 
    </>;
})