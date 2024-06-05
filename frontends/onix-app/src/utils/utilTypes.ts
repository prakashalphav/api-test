
  /**
 * Any function
 */
  export type AnyFn = (...args: any[]) => any


  
export type FunctionArgs<Args extends any[] = any[], Return = void> = (...args: Args) => Return

export interface FunctionWrapperOptions<Args extends any[] = any[], This = any> {
  fn: FunctionArgs<Args, This>
  args: Args
  thisArg: This
}

export type EventFilter<Args extends any[] = any[], This = any, Invoke extends AnyFn = AnyFn> = (
  invoke: Invoke,
  options: FunctionWrapperOptions<Args, This>
) => ReturnType<Invoke> | Promise<ReturnType<Invoke>>

export type ArgumentsType<T> = T extends (...args: infer U) => any ? U : never
export type PromisifyFn<T extends AnyFn> = (...args: ArgumentsType<T>) => Promise<ReturnType<T>>