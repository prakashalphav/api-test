import { Resource, component$ ,useStylesScoped$  } from '@builder.io/qwik'; 
import styles from './referral.scss?inline';
import Title from '../../../components/titles/variant-1/Title1';
import Referral from '../../../modules/info/variant-1/referral/Referral';
import { routeLoader$ } from '@builder.io/qwik-city';
import { getInfoData } from '~/services/contentDB';
 

export const useGetInfoData = routeLoader$( async ( ev) => {
    const infoData = getInfoData(ev, 'faq-referral');
    return { infoData };
});
export default component$(() => {
    useStylesScoped$(styles);
    const GetInfoData = useGetInfoData();
    const {infoData} = GetInfoData.value; 

    return <>

<div class="min-h-screen max-w-screen sm:mt-5 sm:rounded-2xl sm:p-4  content__pg mb-16">
        <Title  class={`title__pg px-4 lg:px-0`}  >Referral</Title>
        <Resource value={infoData} 
                onPending={() => <div>Loading...</div>}
                onRejected={(e) => <div>Error : {(JSON.parse(e.message).message)}</div>}
                onResolved={(d) => ( <>
                     <Referral content={d.d}></Referral>
                </>)}/>
         </div>
    </>;
})