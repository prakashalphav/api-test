import { component$ ,useStylesScoped$, Resource  } from '@builder.io/qwik'; 
import styles from './referral.scss?inline';
import Title from '../../components/titles/variant-1/Title1';
import RefCommissionsInfo from '../../modules/ref-commisions-info/variant-1/RefCommissionsInfo1';
import { routeLoader$  } from '@builder.io/qwik-city';
import { getReferralData } from '../../services/contentDB';
import {
    inlineTranslate,  
  } from 'qwik-speak';
  import { 
    useSpeak,
  } from 'qwik-speak';
import { useCommonViewData } from '~/hooks/app/useCommonViewData';
export const useGetReferralData = routeLoader$( async ( ev) => {
    const referralData = getReferralData(ev);
    return { referralData };
});

export default component$(() => {
    useStylesScoped$(styles);
    const GetReferralData = useGetReferralData();
    const { referralData } = GetReferralData.value;
    const {commonData} = useCommonViewData();
    const t = inlineTranslate();
    useSpeak({assets :   [ 'referral'] })
    return <>
     
    <div class="min-h-screen max-w-screen sm:mt-5 sm:rounded-2xl sm:p-4  content__pg mb-16    "> 
        <Title  class={`title__pg px-4 lg:px-0`}  > {t('app.Referral@@Referral')}</Title>
        <Resource value={referralData} 
            onPending={() => <div>Loading...</div>}
            onRejected={(e) => <div>Error : {(JSON.parse(e.message).message)}</div>}
            onResolved={(d) => ( <>
                <RefCommissionsInfo isAuth={commonData?.isAuth} isOffTable={d.d?.is_off_table} maxLvl={(d.d?.MaxLvl)} type={(d.d?.Type)} details={(d.d?.details)} commisions={(d.d?.commisions)}></RefCommissionsInfo>
            </>)}/>
            </div>
           
    </>;
})