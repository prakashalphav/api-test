import { component$, useStylesScoped$ , useStyles$} from '@builder.io/qwik';
import styles from './Promotions.scss?inline';
import moduleStyles from '../Promotions.scss?inline';
import tableDefaultStyles from "~/css/table/tableDefault.scss?inline";
import EventCard from "~/components/event-cards/variant-1/EventCard1";
import TabsMenu from "~/components/tabs-menu/variant-1/TabsMenu1";
import PromotionPopup from '../../promotions-popup/variant-1/PromotionsPopup';
import {createSignals, usePromotions} from "~/hooks/business/useEvents";
import type { Promo ,PromoCategory} from '~/services/types';
import {init, usePromotion} from "~/hooks/business/usePromotionModal";
type Props = {
    categories?: PromoCategory[];
    list?: Promo[];
};

export default component$((props: Props) => {
    useStyles$(tableDefaultStyles);
    useStyles$(moduleStyles);
    useStylesScoped$(styles);
    
    // const categories = props.categories?.map((category:any) => {
    //     return {
    //         title: category,
    //         value: category.toLowerCase(),
    //     };
    //   }) || [];

    
    const {selMenu , dataList }  = createSignals(props?.list || []); 
    const { onSelCategoryQRL } = usePromotions(props?.list || [], selMenu, dataList); 
    
    const { selPromo} = init();
    const { onSelPromoQRL } = usePromotion(selPromo, props?.list || []);
   
    // const filteredItem= dataList.value.filter((item:any) => {item.rowId === selPromo.value});
    return <>
   
     
    <div class="tabwraper  sm:mb-5">
            <TabsMenu menus={props.categories} onClickMenu$={onSelCategoryQRL} selMenus={[selMenu.value]} ></TabsMenu>
    </div>
                <div  class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-sm:p-5">
                    {dataList.value.map((item: Promo, index) => (
                        <div>
                            <EventCard
                                class={`card__promoItem`}
                                onClickReadMore$={onSelPromoQRL} 
                                key={item.rowId} 
                                id={item.rowId} 
                                title={item.name} 
                                banner={item.image} 
                                desc={item.description} 
                                category={item.category} 
                                noLimit={item.no_limit} 
                                startDate={item.datefrom} 
                                endDate={item.dateto}
                            ></EventCard>
                        </div>
                    ))}
                </div> 
                {selPromo.value && (
                    <>
                    <PromotionPopup 

                        promo={selPromo} 
                    ></PromotionPopup>
                    </>
                )}
                {/* {dataList.value.map((item:any) => (
                    item.rowId == selPromo.value && (
                        <PromotionPopup title={item.name} banner={item.image} desc={item.description}></PromotionPopup>  
                    )
                ))} */}
                {/* <PromotionPopup 
        title="Promo-2" 
        banner="https://files.sitestatic.net/promotion_banners/6407357a7b5b4_6204c4bfbabc6_607a533d66a5b_photo-1596838132731-3301c3fd4317.webp" 
        desc="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing.">
        </PromotionPopup>   */}
    </>;
})

