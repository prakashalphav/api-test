import { component$, useStylesScoped$, Resource } from "@builder.io/qwik";
import styles from "./fish-hunter.scss?inline";

import Title from "../../../../../components/titles/variant-1/Title1";
import { inlineTranslate } from "qwik-speak";
import { ProviderGamesContent } from "~/routes/all-games/index";
import { useGetSubGames } from "../../layout";
import {
  GameTypeAll,
  type ProviderGamesFilters,
} from "~/hooks/business/useGameList";

export default component$(() => {
  useStylesScoped$(styles);
  const t = inlineTranslate();
  const subGamesRes = useGetSubGames();
  const { commonData: cd, subGames } = subGamesRes.value;
  return (
    <>
      <Title hasMobileBackUrl={true} mobileBackUrl={`/fish-hunter/`}> {t("app.Fish Hunter Games@@Fish Hunter Games")}</Title>

      <Resource
        value={subGames}
        onPending={() => <div>Loading...</div>}
        onRejected={(e) => <div>Error : {JSON.parse(e.message).message}</div>}
        onResolved={(d) => {
          const providerGamesPresetFilters = {
            game_codes: [d.d?.this_game_code],
            limit: 240,
            game_types: [GameTypeAll],
            category: d.d?.this_category,
          } as ProviderGamesFilters;

          return (
            <ProviderGamesContent
              presetGameList={d.d?.games || []}
              providers={Object.values(
                cd.d?.games_data[providerGamesPresetFilters.category] || {}
              )}
              providerGamesPresetFilters={providerGamesPresetFilters}
            ></ProviderGamesContent>
          );
        }}
      />
    </>
  );
});
