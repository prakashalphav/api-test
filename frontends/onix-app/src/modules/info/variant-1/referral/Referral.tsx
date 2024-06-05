import { component$, useStylesScoped$, useStore, Resource } from '@builder.io/qwik';
import styles from './Referral.scss?inline';
import InfoMenu from "../InfoMenu";


type Props = {
    content: any;
  };
  export default component$(( props : Props) => {
    useStylesScoped$(styles);


    return <>
        <div class="text-[var(--text-dark-color)] w-full">
            <div class="tabwraper  sm:mb-5">
                <InfoMenu></InfoMenu>
            </div>
            <div class="py-5 max-sm:px-5">
                <div class="lg:max-w-[90%]" dangerouslySetInnerHTML={props.content.referral.description }>
                </div>
            </div>
        </div>
    </>;
})