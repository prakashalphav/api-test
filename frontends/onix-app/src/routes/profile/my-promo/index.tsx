import { component$ ,useStylesScoped$, Resource  } from '@builder.io/qwik'; 
import styles from './MyPromo.scss?inline';
import MyPromo from '../../../modules/profile/variant-1/my-promo/MyPromo';
import { routeLoader$  } from '@builder.io/qwik-city';
import { getProfileData } from '../../../services/contentDB';
 
import { useGetProfileLayout } from '../layout';
import {
    useSpeak,
 } from 'qwik-speak';
export const useGetProfileData = routeLoader$(async (ev) => {
     
    const {commonData}= await ev.resolveValue(useGetProfileLayout);
    const profileData = getProfileData(ev, 'my-promo');
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
                <MyPromo data={(d.d)} commonData={commonData.d}></MyPromo>
            </>)}/> 
    </>;
})