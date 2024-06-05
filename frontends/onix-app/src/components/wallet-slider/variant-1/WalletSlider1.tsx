import { component$, useStylesScoped$, useVisibleTask$, Resource } from "@builder.io/qwik";
import styles from "./WalletSlider1.scss?inline";
import {
    inlineTranslate,  
  } from 'qwik-speak';
import { useCommonViewData } from "~/hooks/app/useCommonViewData";
import { Splide } from '@splidejs/splide';
import "@splidejs/splide/css/core";
import { ReloadIcon } from "~/components/icons/Reload";
import { useGetBalance } from "~/hooks/utils/useGetBalance";
import { priceFormat } from "~/utils/formatters/priceFormat";
import {ArrowLeft} from "~/components/icons/ArrowLeft";
import {ArrowRight} from "~/components/icons/ArrowRight";

type Props = { 
    class?: string;
};

export default component$((props: Props) => {
    useStylesScoped$(styles);
    const t = inlineTranslate();
    const {commonData} = useCommonViewData();
    const { currentBalance, actionGetBal, actionGetRefBal, currentRefBalance } = useGetBalance(
        commonData.website_settings.currencyCode + " " + commonData.user_bal,
        commonData.website_settings.currencyCode + " " + commonData.user_ref_wallet_bal
    );
    useVisibleTask$(() => {
        new Splide('.splide', {
            perPage: 1,
            autoplay: false,
        }).mount();
    });
    
    return (<>
        <section class="splide px-5 text-center">
            <div class="splide__track">
                <ul class="splide__list">
                    <li class="splide__slide">
                        <div class={props.class}>
                            <div class="mb-1">{t('app.Game Wallet@@Game Wallet')}</div>
                            <div class="flex-center text-2xl font-bold max-w-full">
                                <Resource
                                value={currentBalance}
                                onPending={() => <div>Loading...</div>}
                                onRejected={() => <div>Error</div>}
                                onResolved={(balance) => <>     {   priceFormat( balance  , {
                                    prefix: `${commonData.website_settings.currencyCode}`,
                                    centsLimit: 2,
                                }) 
                                }</>}
                                />
                                <button
                                    type="button"
                                    class="text-lg pl-2"
                                    onClick$={() => {
                                        actionGetBal.value = true;
                                    }}
                                >
                                <ReloadIcon></ReloadIcon>
                                </button>
                            </div>
                        </div>
                    </li>
                    <li class="splide__slide">
                        <div class={props.class}>
                            <div class="mb-1">{t('app.Referral Wallet@@Referral Wallet')}</div>
                            <div class="flex-center text-2xl font-bold max-w-full">
                                <Resource
                                value={currentRefBalance}
                                onPending={() => <div>Loading...</div>}
                                onRejected={() => <div>Error</div>}
                                onResolved={(balance) => <>     {   priceFormat( balance  , {
                                    prefix: `${commonData.website_settings.currencyCode}`,
                                    centsLimit: 2,
                                }) 
                                }</>}
                                />
                                <button
                                    type="button"
                                    class="text-lg pl-2"
                                    onClick$={() => {
                                        actionGetRefBal.value = true;
                                    }}
                                >
                                <ReloadIcon></ReloadIcon>
                                </button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="splide__arrows">
                <button class="splide__arrow splide__arrow--prev -left-3">
                    <ArrowLeft></ArrowLeft>
                </button>
                <button class="splide__arrow splide__arrow--next -right-3">
                    <ArrowRight></ArrowRight> 
                </button>
            </div>
        </section>
    </>)
})