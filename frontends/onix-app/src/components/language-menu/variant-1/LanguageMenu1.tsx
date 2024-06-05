import { component$,     } from '@builder.io/qwik'; 
//import styles from './LinkButton1.scss?inline';
import type { LanguageOptions } from '~/services/types';
import { useLangMenu ,getCountryCodeByLang } from '~/hooks/business/useLangMenu';
 

type Props = {   
    langOpts : LanguageOptions;
    class? : string;
    currLang?: string; 
};
export default component$((props: Props) => {

    //useStylesScoped$(styles); 
    const {  onSelectLang,currLang  }  = useLangMenu( );
    return ( 
    <>

<aside class={`overflow-hidden  h-auto mt-10 rounded-xl  ${props.class?? " " } `}>
                        <div class="relative p-3">
                            <ul>
                            {props.langOpts && Object.entries(props.langOpts).map(([langCode, value]) => (
                                <li class="p-2 mb-1 flex items-center cursor-pointer rounded-xl " onClick$={() => onSelectLang(langCode)}>
                                    <span class="w-7 h-7 mr-2"><img src={`https://files.sitestatic.net/assets/imgs/country-flags/${getCountryCodeByLang(langCode)}.png`} loading="lazy" decoding="async"  width="28" height="28" /></span>
                                    {/* <span class={`mr-2 circle-lang-` + key}></span> */}
                                    <span>{value.name}</span>
                                </li>
                            ))}
                            </ul>
                        </div>
                    </aside>
       
    </> 
    );
});