
// import ImgLandingImg from '~/media/images/dummy_images/landing_img.png?jsx';
import { $, component$, useStylesScoped$ } from '@builder.io/qwik';
import { useGameLaunch, type Provider } from '~/hooks/business/useGameList';
import styles from './Games2.scss?inline';
import LinkButton from '~/components/link-button/variant-1/LinkButton1';
import type {GameItem} from '~/services/types';
import { useCommonViewData } from '~/hooks/app/useCommonViewData';
import { isGameAllowed,   } from '~/utils/sysUtils';
import { useTransferWalletModal } from '~/hooks/business/useTransferWallet';
 
import {
  inlineTranslate,  
} from 'qwik-speak';

export type contentType = {
    
}

type Props = {
    games: GameItem[];
};
export default component$(( props : Props) => {
    useStylesScoped$(styles);
    const t = inlineTranslate();

    const { launchGameItemQRL}= useGameLaunch();
    const  {commonData} = useCommonViewData();
    const {showTransWalletModal ,toggleModalQRL :toggleTransWalletModal  ,transWalletCtx}= useTransferWalletModal();
    return <>
 
  
   
       <div class="grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 grid gap-4 lg:gap-8 ">
        {props.games.map((item: GameItem, idx)=>(
           
         <>
             
    <div class=" rounded-xl  col-span-1  relative  overflow-hidden ">
      {/* <div class="text-white">{
      isGameTransferWallet(item) ? 'isGameTransferWallet':'no'
    }</div> */}
         <LinkButton key={item.ID}   class={`w-full flex-center flex-col  ${ !isGameAllowed(item)? 'opacity-50' : ''}`} onClick$={async (e) => {

console.log("games onClick", item); 
              await launchGameItemQRL( item  ,  commonData.isAuth,item.game_code ,0 , 0 )
} }>

  {(item.isCO == 1 || (item.FilterTypes && item.FilterTypes.indexOf("NEW")!== -1) )&& (
<>
<div class="new-label z-10 font-semibold text-xxs w-16 py-1 flex justify-center rounded-tl-xl rounded-br-xl absolute -top-[1.5px] -left-[0.5px]">  {t('app.New@@New')}</div>
</>
)}
{(item.isTop == true  || (item.FilterTypes && item.FilterTypes.indexOf("TOP")!== -1))  && (
<>
<div class="hot-label z-10 font-semibold text-xxs w-16 py-1 flex justify-center rounded-tl-xl rounded-br-xl absolute -top-[1.5px] -left-[0.5px]"> {t('app.Hot@@Hot')}</div>
</>
)}
<img class=" rounded-xl w-full" src={item.ImgSrc} />
<div class="name font-semibold py-2 lg:text-lg">{item.Name}</div>


</LinkButton></div></>
            )
            )} 

       </div>
    
             
    </>;
})