import { component$, useSignal, useStylesScoped$ } from '@builder.io/qwik';
import styles from './Accordian1.scss?inline';
import { ArrowRight } from '../../../components/icons/ArrowRight';
 
type Props = {
    id: any;
    title: string;
    content?: string;
    index?: any;
};

export default component$(( props : Props) => {
    useStylesScoped$(styles);
  
    const selMenu = useSignal(-1);
    return <>
   

    <div class="accordion-list rounded-t-lg  mb-2">
      <h2 class="mb-0" id={"heading-"+ props.id}>
        <button
          onClick$={() => selMenu.value != props.index ? selMenu.value = props.index : selMenu.value = -1}
          class={
            `group relative w-full items-center border-0 collapse-title   collapse-title py-2 px-5 text-left text-base `
            + (selMenu.value == props.index ? `rounded-t` : `rounded`)
          }
          type="button"
        >
          <div class="flex justify-between items-center">
            <div>{(props.id  ? props.id + " . " : '')+ props.title}</div>
            <span class={`arrow transition-all ` + (selMenu.value == props.index ? `rotate-90` : `rotate-0`)}><ArrowRight></ArrowRight></span>
          </div>
        </button>
      </h2>
      <div
        id={"collapse-"+ props.id} 
        class={`accordion-content  p-2 rounded-b transition-all delay-150 duration-300 overflow-hidden ` + (selMenu.value == props.index ? `visible` : `hidden`)}
      >
        <div class="text-[var(--text-color)] leading-6" dangerouslySetInnerHTML={props.content }></div>
      </div>
    </div>
  
    </>;
})