import { component$ ,useStylesScoped$, Resource  } from '@builder.io/qwik'; 
// import styles from './ActivateReferral.scss?inline';
import ActivateReferralForm from '~/modules/profile/variant-1/activate-referral/ActivateReferral';
import { routeLoader$  } from '@builder.io/qwik-city';
import { getActivatedReferral  } from '~/services/contentDB';
import {
    inlineTranslate,  
  } from 'qwik-speak';
import {
    useSpeak,
 } from 'qwik-speak';
export const useGetProfileData = routeLoader$( async ( ev) => { 
 
     
    // const profileData = getProfileData(ev, 'edit'); 
    const activateReferralData = await getActivatedReferral(ev);
    const activateReferral = activateReferralData.d as any;
    if (
        activateReferral.is_show_register_bank !== undefined &&
        activateReferral.is_show_register_bank === true
    ) {
        throw ev.redirect(302, "/register-acc?back_url=profile/activate-referral");
    }

    return { activateReferralData };
});

export default component$(() => {
    // useStylesScoped$(styles);
    const GetProfileData = useGetProfileData();
    const { activateReferralData } = GetProfileData.value;

    const t = inlineTranslate();
    useSpeak({ assets: ['referral'], });
    
    return <>
     
        <Resource value={activateReferralData} 
            onPending={() => <div>Loading...</div>}
            onRejected={(e) => <div>Error : {(JSON.parse(e.message).message)}</div>}
            onResolved={(d) => ( <>
                <ActivateReferralForm data={d.d}></ActivateReferralForm>
            </>)}/>
            
    </>;
})