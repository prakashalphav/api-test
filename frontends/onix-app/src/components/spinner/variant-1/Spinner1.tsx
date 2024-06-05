
import { component$ ,useStylesScoped$    } from '@builder.io/qwik'; 
import styles from './Spinner1.scss?inline'; 
export default component$( ()=>
{
 
    useStylesScoped$(styles); 

return (
    <>
    <div class="spinner">
        <div class="rect1"></div>
        <div class="rect2"></div>
        <div class="rect3"></div>
        <div class="rect4"></div>
        <div class="rect5"></div>
    </div>
    </>
)});