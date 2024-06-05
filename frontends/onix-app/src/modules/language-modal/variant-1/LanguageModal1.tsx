import type { Signal} from "@builder.io/qwik";
import { $, component$, useSignal, useStylesScoped$, useTask$,  } from "@builder.io/qwik";
import styles from "./LanguageModal1.scss?inline"; 
import Modal from "~/components/modal/variant-1/Modal1"; 
import LanguageMenu from "~/components/language-menu/variant-1/LanguageMenu1";  
import { useLangMenu ,  } from '~/hooks/business/useLangMenu';
import { useCommonViewData } from "~/hooks/app/useCommonViewData";
import { isMobileDevice } from "~/utils/common";
type Props = {
 showLangMenu : Signal<boolean>
}
export default component$((props:  Props) => {
    useStylesScoped$(styles); 
    const { toggleLangMenu, currLang } = useLangMenu();
 
    const {commonData}=  useCommonViewData();
    const show = useSignal<boolean>(false)
    useTask$(({track})=>{
        track(() => props.showLangMenu.value);
        if(props.showLangMenu){
            show.value= isMobileDevice(null, commonData.device); 
        }
        
    })
    return (show.value && (<>{ 
    <Modal title={'Select Language' } isCloseOnClickOutside={false}  toggleModal$={toggleLangMenu} maxWidth="max-w-md" class="p-5 pb-3 modal" inlineStyle="min-width:370px">
       <LanguageMenu  langOpts={commonData.agent_lang_opts} currLang={currLang} class={"modal"}></LanguageMenu>
      </Modal>
       }
    </>));
})