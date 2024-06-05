// THIS IS VERY SIMILAR TO variant-2/TabsMenu1 (zplay providergames)
import {
  component$,
  useStylesScoped$,
  type PropFunction,
Slot,
} from "@builder.io/qwik";
import styles from "./TabsMenu1c.scss?inline";
import { BuyBonusFeatureIcon } from "~/components/icons/BuyBonusFeature";
import { HoldAndWinIcon } from "~/components/icons/HoldAndWin";
import { PopularIcon } from "~/components/icons/Popular";
import { AllIcon } from "~/components/icons/All";
import { NewIcon } from "~/components/icons/New";
import { JackpotIcon } from "~/components/icons/Jackpot";
import { GameTypeAll, GameTypeTop, GameTypeNew, GameTypeHoldAndWin, GameTypeBuyBonusFeature, GameTypeJackpot } from '~/hooks/business/useGameList';
import { isMenuSelected } from "~/utils/common";

type Props = {
    class?:string;
  menus: Menu[];
  selMenus: string[];
  inboxCount?: number;
  onClickMenu$?: PropFunction<(menu: string) => void>;
  uppercase?: boolean;
};

interface Menu {
  title?: string;
  value?: string;
  url?: string;
}

export default component$((props: Props) => {
  useStylesScoped$(styles);

  return (
    <>
    <div class={`tabsMenu rounded-md px-4 py-2.5 md:px-2.5 md:py-3 flex items-center justify-between gap-3 ${props.class ?? ''}`}>
      <ul class=" overflow-x-auto gap-2.5 md:gap-2.5 flex flex-row flex-auto overflow-y-hidden scroller">
        {props.menus.map((item) => (
          <li key={item.value} class="">
            <a
              href={item.url || undefined}
              onClick$={async () => {
                if (props.onClickMenu$ && !item.url)
                  await props.onClickMenu$(item.value || "");
              }}
              class={
                `tabItem whitespace-nowrap py-1.5 rounded-md md:py-2.5 px-1.5 md:px-3 flex-center gap-1.5` +
                ( isMenuSelected( item.value , props.selMenus) ? ` active` : ``)
              }
            >
              {item.value == GameTypeAll && (<AllIcon class="text-lg" />)}
              {item.value == GameTypeTop && (<PopularIcon class="text-lg" />)}
              {item.value == GameTypeNew && (<NewIcon class="text-lg" />)}
              {item.value == GameTypeHoldAndWin && (<HoldAndWinIcon class="text-lg" />)}
              {item.value == GameTypeBuyBonusFeature && (<BuyBonusFeatureIcon class="text-lg" />)}
              {item.value == GameTypeJackpot && (<JackpotIcon class="text-lg" />)}
              {props.uppercase ? item.title?.toUpperCase() : item.title}
            </a>
          </li>
        ))}
      </ul>
      <Slot></Slot>
    </div>
    </>
  );
});
