import type { PropFunction, QwikChangeEvent } from '@builder.io/qwik';
import { component$, useSignal, useTask$, type NoSerialize, $, useStyles$ } from '@builder.io/qwik';
import styles from './RangeSlider1.scss?inline';
import { priceFormat } from '~/utils/formatters/priceFormat';
import Tooltip1 from '~/components/tooltip/variant-1/Tooltip1';
type Props = {
  class?: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onInput$: PropFunction<(value: number) => void>;
  currencyCode?: string;
};


// function to get the progress of the slider
export const calcProgress = (value: number, min: number, max: number) => {
  return ((value - min) / (max - min)) * 100;
};
export default component$((props: Props) => {
  useStyles$(styles);

  // define refs for the slider component
  const sliderValue = useSignal(props.value);
  const slider = useSignal<HTMLInputElement>();
  const step = props.step ? props.step : 5;


  // function to set the css variable for the progress
  const setCSSProgress = $((progress: number) => {
    if (slider.value)
      slider.value.style.setProperty("--ProgressPercent", `${progress}%`);
  });

  const updateSlider = $(async () => {
    // update the slider progress

    if (slider.value) {

      const progress = calcProgress(sliderValue.value, parseFloat(slider.value.min), parseFloat(slider.value.max));

      // define extrawidth to ensure that the end of progress is always under the slider thumb.
      const extraWidth = 10 - (progress / 11);//(100 - progress) / 95 ;

      // set the css variable
      await setCSSProgress(progress + extraWidth);

      await props.onInput$(sliderValue.value);
    }

  });

  const decrease = $(async () => {
    if (sliderValue.value > props.min) {
      sliderValue.value = sliderValue.value - step;
      await updateSlider();
    }
  });

  const increase = $(async () => {
    if (sliderValue.value < props.max) {
      if (sliderValue.value < props.min) {
        sliderValue.value = props.min;
      }
      else {
        sliderValue.value = sliderValue.value + step;
      }
      await updateSlider();
    }

  });
  const onSliderValueChange = $(async (event: Event) => {
    sliderValue.value = parseFloat((event.target as HTMLInputElement).value);
    await updateSlider();
  })

  return <>
    <div class="custom-slider flex w-[330px]">
      <div class="relative w-full">
        <input
          ref={slider}
          value={sliderValue.value}
          min={props.min}
          max={props.max}
          step={step}
          type="range"
          onInput$={onSliderValueChange}
          class="slider w-full"
        />
        {sliderValue.value ? (<div
          class="absolute w-full -bottom-4 transform -translate-x-1/2"
          style={{
            left: `calc(${((sliderValue.value - props.min) / (props.max - props.min)) * 93}% + 12px)`,
          }}
        >
          <Tooltip1 size='sm' position='bottom'>{priceFormat(sliderValue.value, {
            prefix: `${props.currencyCode} `,
            centsLimit: 0,
          })}</Tooltip1>
        </div>) : <></>}
      </div>
    </div>
  </>;
})