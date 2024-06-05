import { component$, useStylesScoped$, useSignal, $   } from '@builder.io/qwik'; 

import styles from './BottomBar1.scss?inline';  
import {HomeIcon}  from '~/components/icons/Home';
import { PromotionIcon}  from '~/components/icons/Promotion';
import {ChatIcon}  from '~/components/icons/Chat';
import {WalletIcon} from "~/components/icons/Wallet";
import {TransactionIcon} from "~/components/icons/Transaction";
import {MessagesIcon} from "~/components/icons/Messages";
import { DepositIcon } from '~/components/icons/Deposit';
import { WithdrawIcon } from '~/components/icons/Withdraw';
import { StatementIcon } from '~/components/icons/Statement';
import { useLocation } from '@builder.io/qwik-city';
import { nextFrame } from '~/utils/transitions';
import { LockIcon } from '~/components/icons/Lock';
import { useLoginModal } from "../../../hooks/business/useLoginModal";
import { useRegisterModal } from "../../../hooks/business/useRegisterModal";
import { AddUserIcon } from '~/components/icons/AddUser';
import {
    inlineTranslate,  
  } from 'qwik-speak';
type Props = {  
    zIndex : number,  
    isAuth : boolean,
    livechatUrl : string,
    class? : string
};

export default component$((props: Props) => {
    useStylesScoped$(styles);
    const {url} =useLocation();
    console.log("url" ,url)

    const t = inlineTranslate();
    const  onCenterClickHandler = $(()=>{

        const ele = document.querySelector('#popup-menu');

        if(!ele) return ;
        if( ele.classList.contains('hidden')){
         ele.classList.remove('hidden')
         setTimeout(async () => {
             await nextFrame()
             ele.classList.add('show')
         }, 0);
   
        
        }
        else {
         ele.classList.remove('show')
         setTimeout( async () => {
            // await nextFrame() --> not work
             ele.classList.add('hidden')
           
         }, 300 );//timing take from transition duration..
         
        } 
     })

     const { toggleModalQRL: toggleLoginQRL } = useLoginModal();
     const { toggleModalQRL: toggleRegQRL } = useRegisterModal();
    return <>
        <div class={`fixed  w-full bottom-0 left-0   p-2 text-center ${props.class? props.class: '' }`}  style={'z-index:'+ props.zIndex+';'}>

                <div class={`  bottomBarNav w-full sm:w-8/12 mx-auto h-14  rounded-full flex justify-evenly items-center relative text-center`}>
                
                        <a class={`menu block  ${url.pathname==='/' ? 'active':''}`} href="/"> 
                            <p class=" icon text-2xl">
                                <HomeIcon></HomeIcon>
                                </p> 
                                <p class="title text-xs mt-1"> {t('app.Home@@Home')}</p>
                        </a>
                        {props.isAuth && <>
                        <a class={`menu block ${url.pathname==='/memo/' ? 'active':''}`} href="/memo/"> 
                            <p class=" icon text-2xl">
                                <MessagesIcon></MessagesIcon>
                              </p> 
                              <p class="title text-xs mt-1">{t('app.Inbox@@Inbox')}</p>
                        </a> 
 
                        <button onClick$={onCenterClickHandler} class={`menu block relative center ${url.pathname==='/withdraw/' || url.pathname==='/deposit/'|| url.pathname==='/statement/'  ? 'active':''}`}  > 
                        
                        <div class="curve absolute rounded-full "></div>
                            <p class=" icon rounded-full p-3  ">
                                <TransactionIcon></TransactionIcon>
                                </p> 
                                
                        </button>
                        </>}

                        {!props.isAuth && <>
                        <button class={`menu block  `} onClick$={toggleLoginQRL} > 
                            <p class=" icon text-2xl">
                                <LockIcon></LockIcon>
                              </p> 
                              <p class="title text-xs mt-1"> {t('app.Login@@Login')}</p>
                        </button> 
 
                        <button onClick$={toggleRegQRL} class={`menu block relative center  `}  > 
                        
                        <div class="curve absolute rounded-full "></div>
                            <p class=" icon rounded-full p-3 mb-1 ">
                                <AddUserIcon></AddUserIcon>
                                </p> 
                                
                        </button>
                        </>}

                        <a class={`menu block ${url.pathname==='/promotions/' ? 'active':''}`} href="/promotions/"> 
                      
                            <p class=" icon text-2xl">
                                <PromotionIcon></PromotionIcon>
                                </p> 
                                <p class="title text-xs mt-1">{t('app.Promos@@Promos')}</p>
                                
                        </a>
                        <a class={`menu block`} href={props.livechatUrl ?? '#'} target={props.livechatUrl ? '_blank' : ''}> 
                            <p class=" icon text-2xl">
                                <ChatIcon></ChatIcon>
                              </p> 
                              <p class="title text-xs mt-1">{t('app.Chat@@Chat')}</p>
                        </a>
                       
                </div> 

                <div id="popup-menu" class="popup-menu  absolute hidden">
                                <a class={`block icon rounded-full flex-center flex-col absolute ${url.pathname==='/deposit/' ? 'active':''}`}  href="/deposit/">
                                <p class="text-2xl">
                                <DepositIcon></DepositIcon>
                                </p>
                               
                               
                                <p class=" text-xxs mt-1">{t('app.Deposit@@Deposit')}</p>
                                </a>  
                                <a class={`block icon rounded-full flex-center flex-col absolute ${url.pathname==='/withdraw/' ? 'active':''}`} href="/withdraw/" >
                                <p class="text-2xl">
                                <WithdrawIcon></WithdrawIcon>
                                </p>
                               
                                <p class="  text-xxs mt-1">{t('app.Withdraw@@Withdraw')}</p>
                                </a>  
                                <a class={`block icon rounded-full flex-center flex-col absolute ${url.pathname==='/statement/' ? 'active':''}`} href="/statement/">
                                <p class="text-2xl" >
                                <StatementIcon></StatementIcon>
                                </p>
                                <p class="  text-xxs mt-1">{t('app.Statement@@Statement')}</p>
                                </a>  
                                </div>
        </div>

        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="filter-svg">
                    <defs>
                        <filter id="goo">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
                            <feBlend in="SourceGraphic" in2="goo" operator="atop"/>
                        </filter>
                    </defs>
                </svg>
    </>
})