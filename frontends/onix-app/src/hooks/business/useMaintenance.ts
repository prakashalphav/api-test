import type { Signal} from '@builder.io/qwik';
import { useSignal , $} from '@builder.io/qwik';
import type { MaintenceContent } from '~/services/types';
 
import { useRunScript } from '../utils/useRunScript';

export const useMaintenance = (maintenceContent: MaintenceContent) => {
 
    const timer = useSignal<timer>({
        days: "00",
        hours: "00",
        minutes: "00",
        seconds: "00",
    });
    const  {runScriptOnBrowser} =  useRunScript();

    const runScript = $(async ()=>{
      await runScriptOnBrowser(maintenceContent?.d?.livechatCode);
    })
    // if(maintenceContent?.d?.livechatCode){
    //     if (typeof document !== "undefined") {
    //       const script = maintenceContent.value?.d?.livechatCode.replace(/<\/?script>/g, "");
    //       eval(script);
    //     }
    // }
    return { timer,runScript }
}

export const msToTime = (duration: number, timer: Signal<timer>) => {
    let seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24),
      days = Math.round(Math.floor(duration / (1000 * 60 * 60) / 24));
  
    days = days < 10 ? "0" + days : days;
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
  
    timer.value = {
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
    };

    return {
      days,
      hours,
      minutes,
      seconds,
    };
}; 

type timer = {
    days: string | number;
    hours: string | number;
    minutes: string | number;
    seconds: string | number;
};