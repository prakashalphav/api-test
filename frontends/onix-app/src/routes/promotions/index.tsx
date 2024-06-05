import { component$ ,useStylesScoped$, Resource  } from '@builder.io/qwik'; 
import styles from './promotions.scss?inline';
import Title from '../../components/titles/variant-1/Title1';
import Promotions from '../../modules/promotions/variant-1/Promotions';
import { routeLoader$  } from '@builder.io/qwik-city';
import { getPromotionData } from '../../services/contentDB';
import {
    useSpeak, inlineTranslate,  
  } from 'qwik-speak';
   
// export default component$(() => {
//     useStylesScoped$(styles);
//     return <>

//         {/* Title Brandon TODO */}
//         <Title>Promotions</Title>
//         <Promotions></Promotions>
//     </>;
// })



export const useGetPromotionData = routeLoader$( async ( ev) => {
    const promotionData = getPromotionData(ev);
    return { promotionData };
});

export default component$(() => {
    useStylesScoped$(styles);
    const GetPromotionData = useGetPromotionData();
    const { promotionData } = GetPromotionData.value;
    const t = inlineTranslate();
    useSpeak({assets:['events'  ],});
    return <> 
  
<div class="min-h-screen max-w-screen sm:mt-5 sm:rounded-2xl sm:p-4  content__pg mb-16 overflow-hidden">
        <Title  class={`title__pg px-4 lg:px-0`}  >{t('events.Promotions@@Promotions')}</Title>
        <Resource value={promotionData} 
            onPending={() => <div>Loading...</div>}
            onRejected={(e) => <div>Error : {(JSON.parse(e.message).message)}</div>}
            onResolved={(d) => ( <>
            {/* <div>{d.d?.banners}</div> */}
                <Promotions categories={d.d?.promo_categories} list={d.d?.banners}></Promotions>
            </>)}/>
            </div> 
    </>;
})