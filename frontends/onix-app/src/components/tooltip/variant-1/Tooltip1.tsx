import { component$, useStylesScoped$, Slot, type Signal } from "@builder.io/qwik";
import styles from "./Tooltip1.scss?inline";

type Props = {
  id?:string;
  title?: string;
  message?: string;
  class?: string;
  style?: string;
  size?: "sm" | "md" | "lg";
  position: "bottom" | "top" | "left" | "right" | "bottom-right";
  ref?:Signal<HTMLElement>;
};
export default component$((props: Props) => {
  useStylesScoped$(styles);

  return (
    <>
      <div
       ref={props.ref}
       id= {props.id} 
       style={props.style}
        class={`tooltip  block  leading-3 absolute ${props.class?? "rounded-md"} ${props.position} ${props.size}`}
      >
        {!!props.message && (
          <>
            {props.title && <h3>{props.title}</h3>}
            <p>{props.message}</p>
          </>
        )}
        {!props.message && (
          <>
            <Slot></Slot>
          </>
        )}
        <i class="overflow-hidden absolute"> </i>
      </div>
    </>
  );
});
