import { component$ ,useStylesScoped$  } from '@builder.io/qwik'; 
import styles from './how-sportsbook.scss?inline';
import Title from '../../../components/titles/variant-1/Title1';
import SportsBook from '../../../modules/info/variant-1/how-sportsbook/HowSportsbook';
 
export default component$(() => {
    useStylesScoped$(styles);
    return <>

        {/* Title Brandon TODO */}
        <div class="min-h-screen max-w-screen sm:mt-5  sm:rounded-2xl sm:p-4  content__pg mb-16">
        <Title  class={`title__pg px-4 lg:px-0`}  >How To Play</Title>
        <SportsBook></SportsBook>
        </div>
    </>;
})