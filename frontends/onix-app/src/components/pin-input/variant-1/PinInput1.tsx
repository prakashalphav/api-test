 
 

import { component$, useStyles$ ,Slot,  } from '@builder.io/qwik'; 
import styles from './PinInput1.scss?inline';  
import type {Props } from '~/hooks/utils/usePinInput';
import { usePinInput  } from '~/hooks/utils/usePinInput';
 

export default component$(( props : Props) => {


   const  {  onKeyUpPinQRL,onKeyDownPinQRL, setPosQRL,clearPinQRL,addPinQRL,pinQuest,firstAutoFocus ,onSinglePinInputQRL} = usePinInput(props);
    useStyles$(styles);
 
    return <> 
           <div
    class="pin-code flex-center gap-2 lg:gap-4 "
    onKeyDown$={async (e)=> await onKeyDownPinQRL(e)}
    onKeyUp$={ async (e)=> await onKeyUpPinQRL(e)}
 
  >
    <input
      class="text-center  w-12 h-12 text-2xl  md:w-14 md:h-14 md:text-4xl modal rounded-lg box-shadow-md"
      type={pinQuest.value[0] === '8' ? 'password' : props.numberOnly ? 'number' : 'text'}
       
      value={pinQuest.value[0] === '8' ? '8' : undefined} 
      name={props.name + '[0]'}
      data-pos="0"
      readOnly={props.readonly}
      onClick$={async ()=>{await setPosQRL(0)}}
      onInput$={async (e  )=> { 
       await  onSinglePinInputQRL(e, 0)  
      }}
      maxLength={1} 
      autoFocus={firstAutoFocus.value == 0 } 
    />
    <input
      class="text-center w-12 h-12 text-2xl  md:w-14 md:h-14 md:text-4xl modal rounded-lg shadow-md"
 
      type={pinQuest.value[1] === '8' ? 'password' : props.numberOnly ? 'number' : 'text'}
       value={pinQuest.value[1] === '8' ? '8' : undefined}
       name={props.name + '[1]'}
      data-pos="1"
      readOnly={props.readonly}
      maxLength={1} 
      onClick$={async ()=>{await setPosQRL(1)}}
      onInput$={async (e  )=> { 
        await  onSinglePinInputQRL(e, 1)  
       }}
      autoFocus={firstAutoFocus.value == 1 }
      
    />
    <input
      class="text-center w-12 h-12 text-2xl  md:w-14 md:h-14 md:text-4xl modal rounded-lg shadow-md"
      type={pinQuest.value[2] === '8' ? 'password' : props.numberOnly ? 'number' : 'text'}
 
      value={pinQuest.value[2] === '8' ? '8' : undefined} 
      name={props.name + '[2]'}
      data-pos="2"
      readOnly={props.readonly}
      onClick$={async ()=>{await setPosQRL(2)}}
      onInput$={async (e  )=> { 
        await  onSinglePinInputQRL(e, 2)  
       }}
      maxLength={1} 
      autoFocus={firstAutoFocus.value == 2 }
    />
    <input
      class="text-center w-12 h-12 text-2xl  md:w-14 md:h-14 md:text-4xl modal rounded-lg shadow-md"
      type={pinQuest.value[3] === '8' ? 'password' : props.numberOnly ? 'number' : 'text'}
     
      value={pinQuest.value[3] === '8' ? '8' : undefined} 
      name={props.name + '[3]'}
      data-pos="3"
      readOnly={props.readonly}
      
      onClick$={async ()=>{await setPosQRL(3)}}
      onInput$={async (e  )=> { 
        await  onSinglePinInputQRL(e, 3)  
       }}
      maxLength={1} 
      autoFocus={firstAutoFocus.value == 3 }
    />
    <input
      class="text-center w-12 h-12 text-2xl  md:w-14 md:h-14 md:text-4xl modal rounded-lg shadow-md"
     
      type={pinQuest.value[4] === '8' ? 'password' : props.numberOnly ? 'number' : 'text'}
     
      value={pinQuest.value[4] === '8' ? '8' : undefined} 
      name={props.name + '[4]'}
      data-pos="4"
      readOnly={props.readonly} 
      onClick$={async ()=>{await setPosQRL(4)}}
      onInput$={async (e  )=> { 
        await  onSinglePinInputQRL(e, 4)  
       }}
      maxLength={1} 
      autoFocus={firstAutoFocus.value == 4 }
    />
    <input
      class="text-center w-12 h-12 text-2xl  md:w-14 md:h-14 md:text-4xl modal rounded-lg shadow-md"
     
      type={pinQuest.value[5] === '8' ? 'password' : props.numberOnly ? 'number' : 'text'}
      value={pinQuest.value[5] === '8' ? '8' : undefined} 
      name={props.name + '[5]'}
      data-pos="5"
       readOnly={props.readonly}
       onClick$={async ()=>{await setPosQRL(5)}}
       onInput$={async (e  )=> { 
        await  onSinglePinInputQRL(e, 5)  
       }}
      maxLength={1} 
      autoFocus={firstAutoFocus.value == 5 }
    />
  </div>
{props.readonly && 
  <div class="num-pad flex-center mt-3 gap-3 flex-wrap">
    <input
      type="button"
      class="num-btn text-xl text-white font-extrabold w-[66px] h-12 shadow-md rounded-lg flex-shrink-0 cursor-pointer"
      value="1"
      onClick$={async ( event) =>await  addPinQRL(1)}  
      
    />

    <input
      type="button"
      class="num-btn text-xl text-white font-extrabold w-[66px] h-12 shadow-md rounded-lg flex-shrink-0 cursor-pointer"
      value="2"
      onClick$={async ( event) =>await  addPinQRL(2)} 
    />
    <input
      type="button"
      class="num-btn text-xl text-white font-extrabold w-[66px] h-12 shadow-md rounded-lg flex-shrink-0 cursor-pointer"
      value="3"
      onClick$={async ( event) =>await  addPinQRL(3)}
    />
    <input
      type="button"
      class="num-btn text-xl text-white font-extrabold w-[66px] h-12 shadow-md rounded-lg flex-shrink-0 cursor-pointer"
      value="4"
      onClick$={async ( event) =>await  addPinQRL(4)}
    />
    <input
      type="button"
      class="num-btn text-xl text-white font-extrabold w-[66px] h-12 shadow-md rounded-lg flex-shrink-0 cursor-pointer"
      value="5"
      onClick$={async ( event) =>await  addPinQRL(5)}
    />
    <input
      type="button"
      class="num-btn text-xl text-white font-extrabold w-[66px] h-12 shadow-md rounded-lg flex-shrink-0 cursor-pointer"
      value="6"
      onClick$={async ( event) =>await  addPinQRL(6)}
    />
    <input
      type="button"
      class="num-btn text-xl text-white font-extrabold w-[66px] h-12 shadow-md rounded-lg flex-shrink-0 cursor-pointer"
      value="7"
      onClick$={async ( event) =>await  addPinQRL(7)}
    />
    <input
      type="button"
      class="num-btn text-xl text-white font-extrabold w-[66px] h-12 shadow-md rounded-lg flex-shrink-0 cursor-pointer"
      value="8"
      onClick$={async ( event) =>await  addPinQRL(8)}
    />
    <input
      type="button"
      class="num-btn text-xl text-white font-extrabold w-[66px] h-12 shadow-md rounded-lg flex-shrink-0 cursor-pointer"
      value="9"
      onClick$={async ( event) =>await  addPinQRL(9)}
    />
    <input
      type="button"
      class="num-btn text-xl text-white font-extrabold w-[66px] h-12 shadow-md rounded-lg flex-shrink-0 cursor-pointer"
      value="0"
      onClick$={async ( event) =>await  addPinQRL(0)}
    />
    <input
      type="button"
      class="num-btn text-xl text-white font-extrabold clear w-[144px] h-12 shadow-md rounded-lg min-w-0 cursor-pointer"
      value="Clear"
      onClick$={clearPinQRL}
    />
  </div>  
  }
    </>;
});