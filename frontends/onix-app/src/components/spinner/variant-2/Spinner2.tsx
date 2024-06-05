
import { component$ ,useStylesScoped$    } from '@builder.io/qwik'; 
import styles from './Spinner2.scss?inline'; 

type Props = {
    class? : string;
};
export default component$( (props : Props)=>
{
 
    useStylesScoped$(styles); 

return (
    <>
 <div class={`sk-fading-circle ${props.class? props.class: '' }`} >
  <div class="sk-circle1 sk-circle"></div>
  <div class="sk-circle2 sk-circle"></div>
  <div class="sk-circle3 sk-circle"></div>
  <div class="sk-circle4 sk-circle"></div>
  <div class="sk-circle5 sk-circle"></div>
  <div class="sk-circle6 sk-circle"></div>
  <div class="sk-circle7 sk-circle"></div>
  <div class="sk-circle8 sk-circle"></div>
  <div class="sk-circle9 sk-circle"></div>
  <div class="sk-circle10 sk-circle"></div>
  <div class="sk-circle11 sk-circle"></div>
  <div class="sk-circle12 sk-circle"></div>
</div>
    </>
)});