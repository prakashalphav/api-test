import { component$, useStylesScoped$ } from "@builder.io/qwik";
// import styles from './RegisterSuccess1.scss?inline';

type Props = {
  content?: any;
};

export default component$((props: Props) => {
  // useStylesScoped$(styles);

  return (
    <>
      <div dangerouslySetInnerHTML={props.content || "empty"}></div>
    </>
  );
});
