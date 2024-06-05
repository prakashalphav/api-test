import {useSideNavQRL ,useTrxPopupQRL ,useProfilePopupQRL, useWalletPopupQRL, useHelpPopupQRL} from './useSideNav';
import { useSignal, $, useVisibleTask$ } from '@builder.io/qwik';
import { milisecondsToHMS } from '~/utils/common';
import { useClickOutside } from '../utils/useClickOutside';
import { inlineTranslate,  } from "qwik-speak";

export function useHeader() {
    const {toggleSideNavQRL}=   useSideNavQRL();
  const {toggleTrxPopupQRL}=   useTrxPopupQRL();
const {toggleProfilePopupQRL} = useProfilePopupQRL();
const {toggleWalletPopupQRL} = useWalletPopupQRL();
const {toggleHelpPopupQRL} = useHelpPopupQRL();

 return {toggleSideNavQRL,toggleProfilePopupQRL ,toggleTrxPopupQRL,toggleWalletPopupQRL, toggleHelpPopupQRL};
}
 
export function useDateTime(){
  const ms = useSignal<number>(0);
  const timeToShow = useSignal<string>('');
  const gmtLabel = useSignal<string>('');

  useVisibleTask$(() => {
    const localDate = new Date(new Date().toString());
    const diffGMT = (localDate.getTimezoneOffset() / 60).toString().replace('-','');
    const symbolUTC = localDate.getTimezoneOffset() > 0 ? '-' : '+';
    const hour = 3600000;
    const dateTime = localDate.getTimezoneOffset() > 0 ? localDate.getTime() - (Number(diffGMT) * hour) : localDate.getTime() + (Number(diffGMT) * hour);
    ms.value = dateTime;
    gmtLabel.value = ' (GMT'+ symbolUTC + diffGMT + ':00)';
    timeToShow.value = milisecondsToHMS(ms.value) + gmtLabel.value;
  })


  return { ms, timeToShow, gmtLabel };
}
 
 
export function useOptions() {
  const isShowOptions = useSignal<boolean>(false);
  const optionsEle = useSignal<HTMLDivElement>();
  const parentOptions = useSignal<HTMLDivElement>();
  const toggleOptionsQRL=   $(()=>{ 
      isShowOptions.value = !isShowOptions.value;
  });
  const toggleOptionsOutSideQRL=   $(()=>{ 
    isShowOptions.value = false;
  });
  useClickOutside(optionsEle, toggleOptionsOutSideQRL,parentOptions);

 return {isShowOptions, optionsEle, toggleOptionsQRL,parentOptions};
}



export function useMainNav1Mapping(){
  const t = inlineTranslate();


  // category_slug -> { ... } 
  const navMenuMap = new Map();
  navMenuMap.set("slots", {
    icon: "/images/svg/SlotSilver.svg",
    name: t("app.Slots@@Slots"),
    href : "/slots/",
  });
  navMenuMap.set("sports", {
    icon: "/images/svg/SportsSilver.svg",
    name: t("app.Sports@@Sports"),
    href : "/sports/",
  });
  navMenuMap.set("casino", {
    icon: "/images/svg/CasinoSilver.svg",
    name: t("app.Casino@@Casino"),
    href : "/casino/",
  });
  navMenuMap.set("poker", { icon: "/images/svg/PokerSilver.svg", name: t("app.P2P@@P2P") , href : "/poker/",});
  navMenuMap.set("fish-hunter", {
    icon: "/images/svg/FishShootingSilver.svg",
    name: t("app.Fish Shooting@@Fish Shooting"),
    href : "/fish-hunter/",
  });
  navMenuMap.set("lottery", {
    icon: "/images/svg/LotterySilver.svg",
    name: t("app.Lottery@@Lottery"),
    href : "/lottery/",
  });
  navMenuMap.set("e-games", {
    icon: "/images/svg/EGamesSilver.svg",
    name: t("app.E-Games@@E-Games"),
    href : "/e-games/",
  });

  navMenuMap.set("cockfight", {
    icon: "/images/svg/CockfightSilver.svg",
    name: t("app.Cockfight@@Cockfight"),
    href : "/cockfight/",
  });

  return {navMenuMap}
}