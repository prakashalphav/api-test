import { component$, useStylesScoped$  } from '@builder.io/qwik'; 
import styles from './Sample1.scss?inline';  
/*remove this if CMP does not have props*/
// type Props = {
      
// };
export default component$(( ) => {

    useStylesScoped$(styles);
 
    return <></>;
});