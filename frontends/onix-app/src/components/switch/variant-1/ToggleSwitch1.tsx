import type { PropFunction, QwikChangeEvent, Signal  } from '@builder.io/qwik';
import { component$,  useStylesScoped$ } from '@builder.io/qwik'; 
import styles from './ToggleSwitch1.scss?inline';  
import {
    inlineTranslate,  
  } from 'qwik-speak';

type Props = {
    class?: string;
    isOn :Signal<boolean|undefined>;
    isWaiting :Signal<boolean>
    onChange$?: PropFunction<() => void>; 
    name?:string;
    value:any;
};
 
 
export default component$((props: Props) => {
    useStylesScoped$(styles);  
    const t = inlineTranslate();
    return <>
    
      <span class="switch__label"> {t('app.OFF@@OFF')}</span>
                                <label class="switch relative inline-block w-12 h-6 mx-1.5 align-middle">
                                    <input type="checkbox" class="opacity-0 w-0 h-0" name={`${props.name}`} value={`${props.value}`} checked={(props.isOn.value == true? true : false)} disabled={ props.isWaiting.value ? true:false} onChange$={async () => { if(props.onChange$){ 
                                            await props.onChange$();
                                    } }} />
                                    <span class="slider round absolute cursor-pointer transition-all top-0 left-0 right-0 bottom-0 rounded-full"></span>
                                </label>
                                <span class="switch__label"> {t('app.ON@@ON')}</span>
 
    </>;
})