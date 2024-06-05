 

import { component$, useStylesScoped$  } from '@builder.io/qwik'; 
import styles from './ProfileAvatar1.scss?inline';  
import {DiamondIcon} from '~/components/icons/Diamond';
import { ProfileIcon } from '~/components/icons/Profile';
/*remove this if CMP does not have props*/
type Props = {
  memberLevel :string,
  class?:string,
};
export default component$(( props : Props) => {

    useStylesScoped$(styles);
 
    return <>
   
   <div class={`w-[2.5em] h-[2.5em] rounded-full  relative ${props.class||""} avatar ${props.memberLevel.toLowerCase()}`}> 
        <p class="text-[2.5em] flex-center h-full">
          <img src="/images/dummy_images/profile_pic_2.png" width="24" height="24" />
        </p>
        <div class=" lvl-icon absolute bottom-0 right-0 w-[1.375em] h-[1.375em]   translate-x-1/4   p-[1px] rounded-full"> 
          <div class="bg-black rounded-full w-full h-full flex-center text-xs "><DiamondIcon></DiamondIcon></div>
        </div>
      </div>
    </>;
});