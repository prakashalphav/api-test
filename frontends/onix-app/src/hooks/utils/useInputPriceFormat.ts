 
import {
  priceFormat as _priceFormat,
  defaultOpts,
  normalizePriceFormatOpts,
  type PriceFormatOpts,
} from "~/utils/formatters/priceFormat"; 
import type { QwikKeyboardEvent, Signal, UseSignal} from "@builder.io/qwik";
import { $, useVisibleTask$ } from "@builder.io/qwik";
import type { FormField } from "./useForm";

export function useInputPriceFormat(
  el: Signal<string> | FormField<string | (string | number)[] | null | undefined>,
  inputOpts: PriceFormatOpts
) {
  const opts = normalizePriceFormatOpts(defaultOpts, inputOpts);
  const priceFormat = $((str: string, ignore = false) => {
    return _priceFormat(str, opts, ignore, true);
  });


  const keyCheck = $(async(e: KeyboardEvent) => {
    const key = e.key;
    // console.log("keyCheck", key);
    const typed =
      key.length === 1 ? key : String.fromCharCode(e.keyCode || e.which);
    let functional = false;
    const str = e.target.value;
    const newValue = await priceFormat(str + typed);
    // console.log("keyCheck", str);

    // allow key numbers, 0 to 9
    if ((key >= "0" && key <= "9") || (key >= "Num0" && key <= "Num9"))
      functional = true;
    if (key === "Backquote") functional = true;

    // check Backspace, Tab, Enter, Delete, and left/right arrows
    if (key === "Backspace") functional = true;
    if (key === "Tab") functional = true;
    if (key === "Enter") functional = true;
    if (key === "Delete") functional = true;
    if (key === "ArrowLeft") functional = true;
    if (key === "ArrowRight") functional = true;

    // Minus Sign, Plus Sign
    if (
      opts.allowNegative &&
      (key === "Minus" || key === "NumpadSubtract" || key === "Minus")
    )
      functional = true; // dash as well
    if (
      opts.insertPlusSign &&
      (key === "Equal" || key === "NumpadAdd" || key === "Equal")
    )
      functional = true;

    // Allow Home, End, Shift, Caps Lock, Esc
    if (
      key === "Home" ||
      key === "End" ||
      (key >= "Shift" && key <= "CapsLock")
    )
      functional = true;
    if (key === "Escape") functional = true;
    if (key >= "PageUp" && key <= "ArrowDown") functional = true;
    if (key >= "Comma" && key <= "Period") functional = true;

    // allow Ctrl shortcuts (copy, paste, etc.)
    if (window.ctrlDown || window.metaKey) {
      if (key === "v") functional = true; // v: paste
      if (key === "c") functional = true; // c: copy
      if (key === "x") functional = true; // x: cut
      if (key === "r") functional = true; // r: reload
      if (key === "t") functional = true; // t: new tab
      if (key === "l") functional = true; // l: URL bar
      if (key === "w") functional = true; // w: close window/tab
      if (key === "q") functional = true; // q: quit
      if (key === "n") functional = true; // n: new window/tab
      if (key === "a") functional = true; // a: select all
    }
    // console.log(newValue, "keyCheck-3-", functional);

    if (!functional) {
      e.preventDefault();
      e.stopPropagation();
      if (str !== newValue) e.target.value = newValue;
    }
  });

  const priceIt = $( async () => {
    const str = el.value;
    const price = await priceFormat(str);
    // console.log("priceIt", price , "---", str);
    if (str && str != price) {
      el.value = price;
    }
  });
  // Add prefix on focus
  const addPrefix = $( () => {
    const val = el.value;
    el.value = opts.prefix + val;
  });
  const addSuffix = $( () => {
    const val = el.value;
    el.value = val + opts.suffix;
  });
 

  // Clear prefix on blur if is set to true
  const clearPrefix =$( () => {
    if (opts.prefix.trim() != "" && opts.clearPrefix) {
      const array = el.value.split(opts.prefix);
      el.value = array[1];
    }
  });
  // Clear suffix on blur if is set to true

  const clearSuffix =$( () => {
    if (opts.suffix.trim() != "" && opts.clearSuffix) {
      const array = el.value.split(opts.suffix);
      el.value = array[0];
    }
  });
  
  // #region initialize


  const onPressCtrlKeyQRL =$( (e) => {
    window.ctrlDown = e.ctrlKey;
    window.metaKey = e.metaKey;
    return true;
  });

  
  useVisibleTask$(({cleanup})=>{
   // detect if ctrl or metaKey(Mac) is pressed
   window.ctrlDown = false;
   window.metaKey = false;
   window.addEventListener("keyup", onPressCtrlKeyQRL);
   window.addEventListener("keydown", onPressCtrlKeyQRL);

   cleanup(()=>{
    window.removeEventListener("keyup", onPressCtrlKeyQRL);
    window.removeEventListener("keydown", onPressCtrlKeyQRL);
   })
  })

  if (el.value?.length > 0) {
    priceIt();
    clearPrefix();
  }
  // #endregion

  const onBlur = $(() => {
    if (opts.clearPrefix) {
      clearPrefix();
    }

    if (opts.clearSuffix) {
      clearSuffix();
    }
  });

  const onFocus = $(() => {
    if (opts.clearPrefix) {
      addPrefix();
    }

    if (opts.clearSuffix) {
      addSuffix();
    }
  });
  const onKeyup = $((e: QwikKeyboardEvent) => {
    priceIt();
  });

  const onKeydown = $((e: QwikKeyboardEvent) => {
    keyCheck(e);
  });
  return { onBlur, onFocus, onKeyup, onKeydown };
}
