import { component$ ,useStylesScoped$  } from '@builder.io/qwik'; 
import styles from './ChangePassword.scss?inline';
import ChangePassword from '../../../modules/profile/variant-1/change-password/ChangePassword';
import { routeLoader$  } from '@builder.io/qwik-city'; 
import {
    useSpeak,
 } from 'qwik-speak';
import { useGetProfileLayout } from '../layout';
export const useGetProfileData = routeLoader$( async ( ev) => {
    const {commonData} = await ev.resolveValue(useGetProfileLayout); 
    return { commonData };
});

export default component$(() => {
    useStylesScoped$(styles);
    const GetCommonData = useGetProfileData();
    const commonData = GetCommonData.value;
    useSpeak({assets:['profile', 'referral' ],});
    return <>
        <ChangePassword commonData={commonData.commonData.d}></ChangePassword> 
    </>;
})