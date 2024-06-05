import { component$ ,useStylesScoped$, Resource  } from '@builder.io/qwik'; 

import Profile from '../../modules/profile/variant-1/user-account/UserAccount';
import { routeLoader$  } from '@builder.io/qwik-city';
import { getProfileData,   } from '../../services/contentDB'; 
import { useGetProfileLayout } from './layout';
import {
    useSpeak,
 } from 'qwik-speak';

export const useGetProfileData = routeLoader$( async ( ev) => {
 
        const {commonData}= await ev.resolveValue(useGetProfileLayout);
     
      
        const profileData = getProfileData(ev, 'edit'); 
      
        return { profileData, commonData };
});

export default component$(() => {
    // useStylesScoped$(styles);
    const GetProfileData = useGetProfileData();
    const { profileData, commonData } = GetProfileData.value; 
    useSpeak({assets:['profile', 'referral' ],});
    return <>
  
        <Resource value={profileData} 
            onPending={() => <div>Loading...</div>}
            onRejected={  (e) => {  
                return (<div class="py-8">{e.message}</div>);
            }}
            onResolved={(d) => ( <>
                 <Profile data={d.d} cd={commonData.d}></Profile>
            </>)}/>
 
    </>;
})