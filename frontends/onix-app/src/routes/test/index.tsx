import { component$   , useVisibleTask$,   useSignal, } from '@builder.io/qwik'; 
import type { DocumentHead} from '@builder.io/qwik-city'; 
import { easepick } from '@easepick/core';
import { RangePlugin } from '@easepick/range-plugin';
import { PresetPlugin } from '@easepick/preset-plugin';
import FormInput from '~/components/form-input/variant-1/FormInput1';
// import EasepickStyles from '@easepick/core/dist/index.css?url'
// import EasepickRangeStyles  from '@easepick/range-plugin/dist/index.css?url'
// import EasepickPresetStyles from '@easepick/preset-plugin/dist/index.css?url'
  import EasepickCustomStyles from '~/components/date-picker/variant-1/EasePickCustoms.css?url';

export default component$(() => { 
  const dateRangePickerRef = useSignal<HTMLElement|undefined>();
  useVisibleTask$(() => {
    const picker = new easepick.create({
      element: dateRangePickerRef.value!,
      css: [
        "https://cdn.jsdelivr.net/npm/@easepick/bundle@1.2.1/dist/index.css",
        // EasepickStyles,
        // EasepickRangeStyles,
        // EasepickPresetStyles,  
         EasepickCustomStyles
      ],
      zIndex: 200,
      plugins: [
        RangePlugin,
        PresetPlugin
      ],
      PresetPlugin: {
        position: 'left',
      },
      RangePlugin: {
        tooltip: true,
      },
      grid: 2,
      calendars: 2,
  })
  });

  return ( 
    <> 
       <FormInput  ref={dateRangePickerRef} {...{
                    type: "text",
                    placeholder: "",
                    required: true,
                    disabled: false,
                    readonly: false,
                    maxLength: 50,
                    name: "date",  
                  }}  ></FormInput>
    </>  
  );
});
 