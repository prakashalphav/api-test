import { component$, useStylesScoped$ } from "@builder.io/qwik";

import styles from "./Announcement1.scss?inline";
import type {  Component} from '@builder.io/qwik';
type Props = {
    annoucement?: string;
    class?: string;
    icon? : Component<{ class: string }>;
};
export default component$((props: Props) => {
    useStylesScoped$(styles);
    const Icon = props.icon;
    return (<>
        <div class={props.class + ' '}>
          {/* <AnnouncementIcon class="w-5 h-5"></AnnouncementIcon> */}
          {props.icon && (<Icon class="w-5 h-5"/>) }
          <marquee class="ml-1" scrollamount="5" width="100%" direction="left">
            {props.annoucement}
          </marquee>
        </div>
    </>)
})