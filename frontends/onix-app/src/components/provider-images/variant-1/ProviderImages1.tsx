import { component$, useStyles$ } from "@builder.io/qwik";
import styles from "./ProviderImages1.scss?inline";
import { useCommonViewData } from "~/hooks/app/useCommonViewData";
import type { Provider } from "~/services/types";
import LinkButton from "~/components/link-button/variant-1/LinkButton1";
import { isGameAllowed } from "~/utils/sysUtils";
import { useGameLaunch } from "~/hooks/business/useGameList";

type Props = {
  providersList: Provider[];
  hideText?: boolean;
};

export default component$((props: Props) => {
  useStyles$(styles);

  const { commonData } = useCommonViewData();
  const { openGameLobbyQRL, checkGameAllowedQRL } = useGameLaunch();
  return (
    <>
      {props.providersList &&
        props.providersList.map((item: Provider) => (
          <>
            <LinkButton
              toUrl={
                !item.is_launch && isGameAllowed(item)
                  ? `/${item.category_slug}/${item.brand_slug}`
                  : ""
              }
              class={`providerImage w-full flex-center flex-col min-h-full ${
                !isGameAllowed(item) ? "opacity-50" : ""
              }`}
              onClick$={async (e) => {
                if (item.is_launch) {
                  await openGameLobbyQRL(e, item, commonData.isAuth);
                } else {
                  await checkGameAllowedQRL(
                    item.block,
                    item.maintenance,
                    item.isCO,
                    item.isPromoDisabled
                  );
                }
              }}
            >
              <img
                src={`https://files.sitestatic.net/assets/imgs/game_logos/100x70/${item.image}.png`}
                class="rounded-2xl "
                loading="lazy"
                decoding="async"
                width="150"
                height="150"
              />
              {!props.hideText && (
                <p class=" py-2 font-semibold w-full break-words text-center">
                  {item.game_name}
                </p>
              )}
            </LinkButton>
          </>
        ))}
    </>
  );
});
