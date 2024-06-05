import { component$, useStyles$, useStylesScoped$ } from '@builder.io/qwik'; 
import styles from './ProgressBar1.scss?inline';

type Props = {
    class?: string;
    progress: number | null;
    displayText: boolean;
};

export default component$((props: Props) => {
    useStylesScoped$(styles);

    return <>
        <div class={`mainDiv h-5 w-40 rounded-xl bg-[#f5f5f5] relative border ` + props.class ?? ''}>
            <div class="childDiv h-full rounded-xl bg-[#34A853]" style={`width:${props.progress ?? 0}%`}></div>
            {props.displayText && (
                <>
                <span class="text text-black text-center absolute top-0 left-0 right-0 leading-5">{props.progress ?? 0}%</span>
                </>
            )}
        </div>
    </>;
})