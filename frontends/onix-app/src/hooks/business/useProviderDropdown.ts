import { useContext, type Signal, createContextId } from '@builder.io/qwik';
import { createModalContext, useModal } from "~/hooks/utils/useModal";

export const SHOW_PROVIDER_DROPDOWN_MODAL = createContextId<Signal<boolean>>('showProviderDropdownModal');

export const useSignals = () => {
  const showProviderDropdownModal = useContext<Signal<boolean>>(SHOW_PROVIDER_DROPDOWN_MODAL);

  return { showProviderDropdownModal };
}
export function useProviderDropdownModal(_showModal?: Signal<boolean>) {
  let showProviderDropdownModal;
  
  if(!_showModal){
    const { showProviderDropdownModal: _showModal } = useSignals();
    showProviderDropdownModal = _showModal;
  } else {
    showProviderDropdownModal = _showModal;
  }
  
  const { toggleModalQRL } = useModal(showProviderDropdownModal);

  return { showProviderDropdownModal, toggleModalQRL };
}
export const createProviderDropdownModalCtx = () => {
  //use this is the first parent component that uses the modal only
  // as this modal is not globally used, hence its context not need to create in app level, just the compnent level

  const { showModal } = createModalContext(SHOW_PROVIDER_DROPDOWN_MODAL);

  return { showModal };
}