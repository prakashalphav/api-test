import { component$ ,useStylesScoped$, Slot } from '@builder.io/qwik'; 
import styles from './Title1.scss?inline';
import { ArrowLeft } from '~/components/icons/ArrowLeft';

type Props = {
    isHideDesktop? : boolean;
    hasMobileBackUrl? : boolean;
    mobileBackUrl?: string;
    class? :string;
};

export default component$((props: Props) => {
    useStylesScoped$(styles);
    return <>
        <div class={`title text-base sm:text-2xl  sm:px-2.5 py-2.5 ${props.class??""} ` + (props.isHideDesktop ? (` lg:hidden`) : (``))}>
            <div class={` flex items-center sm:border-b  sm:border-solid sm:pb-2 sm:mb-7` + (props.isHideDesktop ? (` lg:hidden`) : (``))}>
               {!!props.hasMobileBackUrl && 
               <>
               <a href={props.mobileBackUrl} class={`mr-2 lg:hidden`}>
               <ArrowLeft></ArrowLeft>
               </a></>} 
               <h1><Slot /></h1>
            </div>
        </div>
    </>;
})