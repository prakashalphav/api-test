import { component$,  useStylesScoped$, type PropFunction, type Signal } from '@builder.io/qwik';
import styles from './ProviderDropdown.scss?inline'; 
import type { Provider } from '~/services/types';
import { BurgerMenuIcon } from '~/components/icons/BurgerMenu2';
import { CloseIcon } from '~/components/icons/Close';
import Checkbox from "~/components/checkbox/variant-2/Checkbox2";
import { inlineTranslate } from "qwik-speak";
import { useProviderDropdownModal, createProviderDropdownModalCtx } from '~/hooks/business/useProviderDropdown';
import Modal from "~/components/modal/variant-1/Modal1";

type Props = {
  providers: Provider[];
  onSelect?: PropFunction<(item: Provider, multiSelect?: boolean) => Promise<void>>;
  selGameCodes?: Signal<(string | undefined)[]>; //selected game_codes 
  onClear?: PropFunction<() => Promise<void>>;
}

export default component$(( props : Props) => {
  useStylesScoped$(styles);

  const t = inlineTranslate();
  const { showModal } = createProviderDropdownModalCtx();

  const { showProviderDropdownModal, toggleModalQRL } = useProviderDropdownModal(showModal);
          
    return <>
      <div class="">
        <button class="relative rounded-md aspect-square h-8 sm:h-10 p-1 sm:p-2 flex-center menuBtn" onClick$={toggleModalQRL}>
          {showProviderDropdownModal.value && (<CloseIcon class="w-full h-full"></CloseIcon>)}
          {!showProviderDropdownModal.value && (<BurgerMenuIcon class="w-full h-full"></BurgerMenuIcon>)}
        </button>
        {showProviderDropdownModal.value && (
        <Modal toggleModal$={toggleModalQRL} maxWidth="max-w-md" modalContainerClass="text-white" modalContainerStyle="min-width:370px; background: transparent;" hasScroller={false}>
        {/* option btn box */}
        <div class="optionsContainer py-4 pl-4 pr-3 sm:py-7 sm:pl-7 sm:pr-4 right-0 rounded-md">
          <div class="flex items-center justify-between mb-4 sm:mb-9">
            <div class="text-sm sm:text-lg font-semibold">Providers ({props.selGameCodes?.value.length ?? 0}) </div>
            <button class="sm:text-sm font-medium" onClick$={async () => { if (props.onClear) await props.onClear();}}>{t('app.Clear All')}</button>
          </div>
          <div class="optionsGrid grid grid-cols-2 gap-x-2 scroller overflow-auto">
              {props.providers.map((item, index) => (
                <div class="" key="index">
                  <Checkbox
                      type ="checkbox"
                      id={`cbx-${index}`}
                      name="provider-opt"
                      value={item.category_slug}
                      checked={props.selGameCodes?.value ? props.selGameCodes?.value.includes(item.game_code) : false}
                      onChange$={async () => {
                        if(props.onSelect){
                          await props.onSelect(item, true);
                        }
                      }}
                    >
                      <div class="">{item.game_name}</div>
                  </Checkbox>
                </div>
              ))}
          </div>
        </div>
        {/* end of option btn box */}
        </Modal>
        )}
      
      </div>
     </>;
})