import {
  component$,
  useStylesScoped$,
  useVisibleTask$,
} from "@builder.io/qwik";
// import styles from './Welcome1.scss?inline';

type Props = {
  content?: any;
};

export default component$((props: Props) => {
  // useStylesScoped$(styles);
  useVisibleTask$(() => {
    window.setTimeout(function () {
      window.location.href = "/";
    }, 5000);
  });

  return (
    <>
      <div dangerouslySetInnerHTML={props.content || "empty"}></div>
    </>
  );
});
