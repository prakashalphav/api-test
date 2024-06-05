import {
  component$,
  useStylesScoped$,
  type PropFunction,
  type Signal,
  useSignal,
} from "@builder.io/qwik";
import { ZodBooleanDef } from "zod";

import styles from "./SelectDropDown2.scss?inline";
export type Props<T> = {
  name: string;
  id?: string;
  placeholder: string;
  required: boolean;
  disabled: boolean | Signal<boolean>;
  selectionList: T[] | Signal<T[]>;
  cbValue$: PropFunction<(item: T) => string>;
  cbText$: PropFunction<(item: T) => string>;
  cbSelected$: PropFunction<(item: T) => boolean>;
  onChange$?: PropFunction<(value: string) => void>;
};

export default component$((props: Props) => {
  useStylesScoped$(styles);

  const inputTag = useSignal<HTMLInputElement>();
  const isDisabled =
    typeof props.disabled == "boolean" ? props.disabled : props.disabled.value;
   
  return (
    <>
      <div class="w-full select--md">
        <select
          onChange$={async (e) => {
            console.log("onchg", (e.target as HTMLSelectElement).value);
            if (props.onChange$)
              await props.onChange$((e.target as HTMLSelectElement).value);
          }}
          class="select__inner w-full"
          disabled={isDisabled}
          required={props.required}
          id={props.id}
          name={props.name}
        >
          <option value="" disabled selected>
            {props.placeholder}
          </option>
          {(props.selectionList.value || props.selectionList).map(async (item) => {
            const val = await props.cbValue$(item);
            const text = await props.cbText$(item);
            const isSelected = await props.cbSelected$(item);
            return (
              <>
                {" "}
                <option value={val} selected= {isSelected}>{text}</option>
              </>
            );
          })}
        </select>
      </div>
    </>
  );
});
