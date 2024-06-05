import { Resource, component$ ,useStylesScoped$  } from '@builder.io/qwik'; 
import styles from './TermsCondtions.scss?inline';
import Title from '../../../components/titles/variant-1/Title1';
import Faq from '../../../modules/info/variant-1/terms-conditions/TermsCondtions';
import { routeLoader$ } from '@builder.io/qwik-city';
import { getInfoData } from '~/services/contentDB';
 
export const useGetInfoData = routeLoader$( async ( ev) => {
    const infoData = getInfoData(ev, 'terms-terms-conditions');
    return { infoData };
});
export default component$(() => {
    useStylesScoped$(styles);
    const GetInfoData = useGetInfoData();
    const {infoData} = GetInfoData.value; 


    return <>   
        {/* Title Brandon TODO */}
        <div class="min-h-screen max-w-screen sm:mt-5 sm:rounded-2xl sm:p-4  content__pg mb-16">
        <Title  class={`title__pg px-4 lg:px-0`}  >Terms & Condtions</Title>
        <Resource value={infoData} 
            onPending={() => <div>Loading...</div>}
            onRejected={(e) => <div>Error : {(JSON.parse(e.message).message)}</div>}
            onResolved={(d) => ( <>
                 <Faq title_arr={d.d?.title_arr} data_arr={d.d?.data_arr}></Faq>
            </>)}/> 
        </div>
    </>;
})