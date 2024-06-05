import type { QwikChangeEvent } from '@builder.io/qwik';
import { component$, useStyles$ ,Slot, type PropFunction } from '@builder.io/qwik'; 
import styles from './Checkbox1.scss?inline';  
/*remove this if CMP does not have props*/
type Props = {
      id : string; 
      name : string;
      checked? :string|boolean;
      value:string|number;
      type : 'checkbox' | 'radio',
      direction: "flex-row" | "flex-row-reverse" | "flex-col" | "flex-col-reverse"  ;
      onChange$?: PropFunction<(  value : string|number,evt : QwikChangeEvent  )=>void >  
};
export default component$(( props : Props) => {

    useStyles$(styles);
 
    return <> 
            <input checked={( typeof  props.checked == "boolean" ?  props.checked : props.checked==props.value)} onChange$={async (evt)=>{ 
                if(props.onChange$)
                await props.onChange$(evt.target.value ,evt);
            }} name={props.name} value={props.value}  id={props.id} class="inp-cbx hidden" type={props.type} ></input>
            <label class={`cbx flex-center gap-2 ${props.direction}`} for={props.id}> 
                <div class="min-w-0 flex-auto"> <Slot></Slot></div>
                <div class="shrink-0 outer-circle relative rounded-full w-3.5 h-3.5 p-[2px] ">
                  <div class="inner-circle rounded-full w-full h-full bg-transparent  "></div>
                </div>
            </label> 
    </>;
});