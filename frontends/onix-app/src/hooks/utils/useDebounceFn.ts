import { createFilterWrapper ,noop } from "~/utils/common"
import type { QRL} from "@builder.io/qwik";
import { NoSerialize, Signal, useSignal} from "@builder.io/qwik";
import { noSerialize } from "@builder.io/qwik";
import {  $ } from "@builder.io/qwik";
import type{ AnyFn,EventFilter,FunctionArgs ,PromisifyFn} from "~/utils/utilTypes"

export interface  DebounceFilterOptions {
    /**
     * The maximum time allowed to be delayed before it's invoked.
     * In milliseconds.
     */
    maxWait?:number
  
    /**
     * Whether to reject the last call if it's been cancel.
     *
     * @default false
     */
    rejectOnCancel?: boolean
  }

 
  
export  function useDebounceFn<T extends FunctionArgs>(
    fn$: QRL<T>,
    ms: number = 200,
    options: DebounceFilterOptions = {},
  ):   PromisifyFn<T>  {
 
    return  createFilterWrapper(
      debounceFilter(ms, options),
      fn$,
    ) 
  }
  
 export type Debouncer = {
  timer?: ReturnType<typeof setTimeout> | undefined,
  maxTimer?: ReturnType<typeof setTimeout> | undefined | null,
  lastRejector? :AnyFn|undefined
}
/**
 * Create an EventFilter that debounce the events
 *
 * @param ms
 * @param options
 */
export function debounceFilter(ms: number, options: DebounceFilterOptions = {} ) {
    // let timer: ReturnType<typeof setTimeout> | undefined
    // let maxTimer: ReturnType<typeof setTimeout> | undefined | null
    // let lastRejector: QRL<AnyFn> = $(noop)
  
    const debouncer : Debouncer= { 
    }; 

    
  const filter$: QRL<EventFilter> =  $((invoke) => {
    const duration = ms
    const maxDuration = options.maxWait
  
    const _clearTimeout =(timer: ReturnType<typeof setTimeout>) => {
      clearTimeout(timer)
      if(debouncer.lastRejector)
      debouncer.lastRejector()
      debouncer.lastRejector = noop
    };
 
    if ( debouncer.timer)
      _clearTimeout(debouncer.timer)

    if (duration <= 0 || (maxDuration !== undefined && maxDuration <= 0)) {
      if (debouncer.maxTimer) {
        _clearTimeout(debouncer.maxTimer)
        debouncer.maxTimer = null
      }
      return Promise.resolve(invoke())
    }

    return new Promise((resolve, reject) => {
      debouncer.lastRejector = options.rejectOnCancel ? reject : resolve
      // Create the maxTimer. Clears the regular timer on invoke
      if (maxDuration && !debouncer.maxTimer) {
        debouncer.maxTimer = setTimeout(() => {
          if (debouncer.timer)
            _clearTimeout(debouncer.timer)
            debouncer.maxTimer = null
          resolve(invoke())
        }, maxDuration)
      }

      // Create the regular timer. Clears the max timer on invoke
      debouncer.timer = setTimeout(() => {
        if (debouncer.maxTimer)
          _clearTimeout(debouncer.maxTimer)
          debouncer.maxTimer = null
        resolve(invoke())
      }, duration)
    })
  })

  return filter$
}