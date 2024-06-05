/*
Author : Brandon
Readme : 
*/

import { component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./GameBoxLobby2.scss?inline";
import type { Provider } from "~/services/types";
import LazyImage from "~/components/image/LazyImage";
import { PlayIcon } from "~/components/icons/Play2";
import { FireIcon } from "~/components/icons/Fire";
import { BellIcon } from "~/components/icons/Bell";
import LinkButton from '~/components/link-button/variant-1/LinkButton1'; 
import { isGameAllowed } from '~/utils/sysUtils';
import { useGameLaunch } from '~/hooks/business/useGameList';
import { useCommonViewData } from '~/hooks/app/useCommonViewData';
import { inlineTranslate } from 'qwik-speak';

type Props = {
  provider: Provider;
  class?: string;
};

export default component$((props: Props) => {
  useStylesScoped$(styles);

  const {commonData} = useCommonViewData();
  const { openGameLobbyQRL, checkGameAllowedQRL} = useGameLaunch();
  const t = inlineTranslate();

  return (
    <>
      <LinkButton
          toUrl={!props.provider.is_launch && isGameAllowed(props.provider) ? `/${props.provider.category_slug}/${props.provider.brand_slug}` : ''}
          class={`max-w-full ${props.class || ''} ${!isGameAllowed(props.provider) ? 'opacity-50' : ''}`}
          onClick$={async (e) => {
            if(props.provider.is_launch){ 
              await openGameLobbyQRL(e, props.provider, commonData.isAuth)
            }
            else {
              await checkGameAllowedQRL(props.provider.block, props.provider.maintenance, props.provider.isCO, props.provider.isPromoDisabled);
            }
          }}
        >
          <div class="gameBannerWrapper relative">
            {props.provider.isCO == 1 && (
            <>
              <div class="new-label z-10 text-xs font-semibold leading-none pl-2.5 pr-3.5 py-1 flex-center rounded-br-xl absolute"> <BellIcon class="h-4 w-4 mr-1" />{t('app.New@@New')}</div>
            </>
            )}
            {props.provider.isTop == true && (
            <>
              <div class="hot-label z-10 text-xs font-semibold leading-none pl-2.5 pr-3.5 py-1 flex-center rounded-br-xl absolute"> <FireIcon class="h-4 w-4 mr-1" />{t('app.Hot@@Hot')}</div>
            </>
            )}
            <LazyImage
              class=""
              src={`https://files.sitestatic.net/assets/imgs/game_logos/236x472/${props.provider.image}.webp`}
              height={471}
              width={236}
              extractMeta={true}
            />
            <div class="gameBannerIconWrapper absolute left-0 right-0 mx-auto">
                <PlayIcon class="w-full h-auto opacity-50" />
            </div>
          </div>
      </LinkButton>
    </>
  );
});
