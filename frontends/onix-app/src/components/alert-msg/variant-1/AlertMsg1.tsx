import { type Signal, component$ } from "@builder.io/qwik";
import {CloseIcon} from "../../icons/Close";
import type { ApiData } from "~/services/types";
 
type Props = {
 
  message :Signal<ApiData<any>> | {value :ApiData<any> } ;
};
export default component$(( props :Props) => {
 
  return (
    <> <div class={!props.message?.value?.type || !props.message?.value.message? 'hidden':'block'}>
      <div
        class={ "border px-4 py-3 rounded relative  transition-opacity " + 
    (!props.message?.value?.type ? 'opacity-0 ' : ' opacity-100 ' + (props.message?.value?.type ===  "f"? "bg-red-100 border-red-400 text-red-700" :
    (props.message?.value?.type ===  "s" ? "bg-green-100  border-green-400 text-green-700 " :  "bg-yellow-100 border-yellow-400 text-yellow-700")
    ))}
        role="alert"
      >
        <strong class="font-bold">{props.message?.value?.title}! </strong>
        <span class="block sm:inline">{props.message?.value?.message}</span>
        <span  
         class={ "absolute top-0 bottom-0 right-0 px-4 py-3 " + 
        ( props.message?.value?.type ===  "f"? "text-red-500" :
        (props.message?.value?.type ===  "s" ? "text-green-500" :  "text-yellow-500")
        )}
        >
            <CloseIcon></CloseIcon>
        </span>
      </div>
      </div>
    </>
  );
});
