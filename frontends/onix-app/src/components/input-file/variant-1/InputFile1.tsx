

import { component$, useStyles$ ,useSignal  ,useVisibleTask$, useContext} from '@builder.io/qwik'; 
import styles from './InputFile1.scss?inline';
import {
    inlineTranslate,  
  } from 'qwik-speak';  
import { FieldWrapperContext } from "~/components/form-field-wrapper/FormFieldWrapper1";
/*remove this if CMP does not have props*/
type Props = {
      name : string;
};
export default component$(( props : Props) => {

    useStyles$(styles);
    const fieldWrapper = useContext(FieldWrapperContext); //formfieldwrapper is needed for 'required' validation - Brandon
    const t = inlineTranslate();
const fileInput = useSignal<HTMLInputElement>();
const fileMsg = useSignal<HTMLSpanElement>();
const dropArea = useSignal<HTMLDivElement>();
const msgDragDropFile = t('app.or drag and drop file here@@or drag and drop file here');
    useVisibleTask$(()=>{
        if(!fileInput.value){return;}

        [ 'dragenter', 'click', 'focus'].forEach( (event)=>{ 
            fileInput.value?.addEventListener(event, ()=>{
                dropArea.value?.classList.add('is-active');
            });
        });

        [ 'dragleave', 'blur', 'drop'].forEach( (event)=>{ 
            fileInput.value?.addEventListener(event, ()=>{
                dropArea.value?.classList.remove('is-active');
            });
        });
       
        fileInput.value.addEventListener('change', ()=>{
            // change inner text 
            const filesCount =  fileInput.value?.files?.length || 0;

            if(filesCount>0 && fileMsg.value){
                if (filesCount === 1) {
                    const fileName=fileInput.value?.value?.split('\\').pop();
    
                    fileMsg.value.innerText =fileName || msgDragDropFile;
                }
                else {
                    fileMsg.value.innerText =filesCount + ' files selected';
                }
            } 
            fieldWrapper.validateField(filesCount);
         
        });
    })
      
    return <>
     <div ref={dropArea} class="file-drop-area relative flex-center transition-colors w-full border p-2 gap-2 rounded">
            <span class="file-btn px-3 py-2 rounded">{t("app.Choose files@@Choose files")}</span>
            <span ref={fileMsg} class="file-msg text-xs text-ellipsis overflow-hidden whitespace-nowrap flex-auto min-w-0"> {msgDragDropFile}</span>
            <input name={props.name} ref={fileInput}  class="file-input absolute inset-0 cursor-pointer opacity-0 no-ol w-full h-full" type="file" value={null}/>
          </div>
    </>;
});