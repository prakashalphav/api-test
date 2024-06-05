import { component$,  useStylesScoped$ ,   } from "@builder.io/qwik";

import styles from './BrandsLobby2.scss?inline';
import { useCommonViewData } from '~/hooks/app/useCommonViewData';
import type { Provider } from "~/services/types";
import LazyImage from  "~/components/image/LazyImage";
import { mktBannerFileBase } from '~/services/images';
import GameBoxLobby2 from "~/components/game-box-lobby/variant-2/GameBoxLobby2";

type Props = {
    providers: Provider[];
};
export default component$(( props : Props) => {
    useStylesScoped$(styles);
    const  {commonData} = useCommonViewData();
  
    return <>
        <div class="img-wrapper relative">
            {commonData.seo?.mkt_banner && ( <>
                <LazyImage class="w-full block lg:hidden" src={`${mktBannerFileBase}${commonData.seo?.mkt_banner}` } />
            </>)}
        </div>
        <div class="mt-2.5 sm:mt-8 px-4 grid-cols-3 sm:grid-cols-6 grid gap-2 lg:gap-2.5">
            {props.providers.map((item: Provider)=>(
                <>
                <div class="box-wrapper h-max relative overflow-hidden ">
                    <GameBoxLobby2 provider={item} />
                </div>
                </>
            ))}
        </div>
    </>;
})