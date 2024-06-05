import type {PropFunction  } from '@builder.io/qwik';
import { component$ ,useStyles$, Slot    } from '@builder.io/qwik'; 
import styles from './Modal1.scss?inline';
import {CloseIcon}  from '../../icons/Close';
import { initModal} from '../../../hooks/utils/useModal';
 
type Props = {
    id? :string;
    toggleModal$: PropFunction<(...args:any  ) => void>; 
    title?: string | null | undefined;
    class?: string; 
    modalContainerClass?: string; 
    maxWidth?:string;
    closeBtnPosition? :'innerTopRight' | 'outerTopRight';
    closeBtnClass?: string;
    isCloseOnClickOutside? :boolean;
    titlePosittion? : 'center';
    modalContainerStyle?: string;
    hasScroller? : boolean; // default is true
};
export default component$((  props :Props ) => {
 
    useStyles$(styles);
   
    const { ref, bindOnKeyDown,
      bindOnClickOutside} = initModal(props.toggleModal$);
      bindOnKeyDown( );
      if(props.isCloseOnClickOutside !== false){
        bindOnClickOutside( );
      }
        
      const hasScroller = props.hasScroller ?? true ;

    return <>
    <div 
      id ={props.id}
                class={`modal1 fixed inset-0 min-h-screen w-full ${props.class}`}
                aria-labelledby={props.title}
                role="dialog"
                style={`z-index : 50; `}
                aria-modal="true"
            >
                <div class="modalOverlay fixed inset-0 transition-opacity bg-black bg-opacity-40 backdrop-blur-sm z-20" />

                
                    <div class="flex items-center justify-center min-h-screen  p-4 text-center modalWrapper">
                        <div
                            ref={ref}
                            class={`modalContainer fixed transition-all transform rounded-lg shadow-xl z-20 ${props.modalContainerClass ?  props.modalContainerClass: 'modalContainer--default p-1 text-left '} ${props.maxWidth? props.maxWidth:'max-w-auto' }`}
                             style={` ${props.modalContainerStyle || " min-width:370px;   "}`}
                        >
                              {/* Add margin if you want to see some of the overlay behind the modal */}
      <div class={`modalContent ${hasScroller ? ' overflow-y-auto scroller p-3 ' : ''} `} style ={`min-height:40vh ; max-height: 75vh; `}>
                             {/* Title */}
                            <div class="flex justify-end items-start pb-3">
                            {props.title &&  <p 
                                 class={`flex-auto text-2xl font-bold  ${props.titlePosittion && props.titlePosittion === 'center' ? 'flex-center' : ''}`}>{props.title}</p> }
                              { ( !props.closeBtnPosition || props.closeBtnPosition ===  "innerTopRight" )   && <button type="button" onClick$={props.toggleModal$} class={`modal-close cursor-pointer  z-[200] text-2xl ${props.closeBtnClass? props.closeBtnClass:'modal-close--default'}`}> 
                                  <CloseIcon></CloseIcon>
                                </button> }
                            </div>

                            {props.closeBtnPosition ===  "outerTopRight" &&  <button type="button" onClick$={props.toggleModal$} class={` cursor-pointer z-[200] text-2xl absolute  -top-6 -right-5 p-1 rounded-full  ${props.closeBtnClass? props.closeBtnClass:'modalOuterCloseBtn'}`}> 
                                  <CloseIcon></CloseIcon>
                                </button> }
                            <Slot />
                                  {/* Footer */}
      {/* <div class="flex justify-end pt-2">
        <button class="px-4 bg-transparent p-3 rounded-lg text-indigo-500 hover:bg-gray-100 hover:text-indigo-400 mr-2">Action</button>
        <button class="modal-close px-4 bg-indigo-500 p-3 rounded-lg text-white hover:bg-indigo-400">Close</button>
      </div> */}
                        </div>
                        </div>
                    </div>
            </div>
  

    
    </>;
})