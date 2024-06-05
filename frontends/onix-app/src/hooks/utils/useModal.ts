 
import {  type PropFunction,  useOnDocument, $,  type Signal , useSignal, createContextId, useContextProvider, ContextId   } from "@builder.io/qwik";
  
import {useClickOutside} from './useClickOutside';
 
import { useHasModal} from '../app/useAppState';

export const createSignals = ()=>{
    const showModal = useSignal<boolean>(false);

    return {showModal};
}
export const initModal = (toggleModal : PropFunction<() => void>  )=>{

   
    const ref = useSignal<HTMLDivElement>();
    const bindOnKeyDown = ()=>{

        useOnDocument("keydown", $((event : Event) => {
            let isEscape = false;
            if ("key" in event) {
              isEscape = (event.key === "Escape" || event.key === "Esc")
            } 
            // else {
            //   isEscape = (event.keyCode === 27)
            // }
            if (isEscape && document.body.classList.contains('modal-active')) {
              toggleModal()
            }
        }));
    }
    
    const bindOnClickOutside= ( )=>{

        useClickOutside(ref , toggleModal);
    }
    return {
        ref, 
        bindOnKeyDown,
        bindOnClickOutside
    } 
}
export const useModal = (showModal : Signal<boolean>  ) => {
  
    // const toggleModal= $(()=>{
    //     const body = document.querySelector<HTMLBodyElement>('body');
    //     if(body){
    //         body.classList.toggle('modal-active');
    //     }

    //     if(ref.value){
    //         ref.value.closest("modal")?.classList.toggle("opacity-0");
    //     }
        
    //     showModal.value= !showModal.value;
    // })
    const {setHasModalQRL } = useHasModal();

    const toggleModalQRL= $(( )=>{
        showModal.value= !showModal.value;
        setHasModalQRL(showModal.value); 
    });
    const setModalQRL= $(( value : boolean )=>{
        showModal.value=value;
        setHasModalQRL(showModal.value); 
    });
 
    console.log('usemodal',showModal.value )
    // if(showModal.value){
    //     //if initialized with true then run 
    //     toggleHasModalQRL(); 
    // }
    return { toggleModalQRL,setModalQRL } ;
};

/*The context below is for where it is created  is for modals that is only for that page , not in global app state*/ 
export const createModalContext= (contextId : ContextId<Signal<boolean>>)=>{ 
    const  {showModal  }= createSignals(); 
    useContextProvider(contextId, showModal); 
    return {showModal };
}