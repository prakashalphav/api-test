import { component$, useStylesScoped$, useSignal, $   } from '@builder.io/qwik'; 

import styles from './BottomBar2.scss?inline';  
import {HomeIcon}  from '~/components/icons/Home3';
import { PromotionGiftIcon}  from '~/components/icons/PromotionGift2';
import {ChatIcon}  from '~/components/icons/Chat3';
import {TransactionIcon} from "~/components/icons/Transaction3";
import { DepositIcon } from '~/components/icons/Deposit3';
import { WithdrawIcon } from '~/components/icons/Withdraw3';
import { StatementIcon } from '~/components/icons/Statement2';
import { useLocation } from '@builder.io/qwik-city';
import { nextFrame } from '~/utils/transitions';
import { LoginIcon } from '~/components/icons/Login2';
import { useLoginModal } from "~/hooks/business/useLoginModal";
import { useRegisterModal } from "~/hooks/business/useRegisterModal";
import { RegisterIcon } from '~/components/icons/Register2';
import { UserIcon } from '~/components/icons/User';
import { WhatsappIcon } from '~/components/icons/Whatsapp';
import {makeContactLinks } from "~/utils/sysUtils"; 


import {
    inlineTranslate,  
  } from 'qwik-speak';
import { useCommonViewData } from '~/hooks/app/useCommonViewData';
import { Curve } from './partials/Curve';

type Props = {  
    zIndex : number,  
    class? : string
};

export default component$((props: Props) => {
    useStylesScoped$(styles);
    const {url} =useLocation();
    const {commonData} = useCommonViewData();
    const selectedMenu = useSignal<string>('');

    const t = inlineTranslate();

    const toggleLivechatList = $(( isShow : boolean) => {
        const livechatList = document.querySelector('#livechatMenu');
        const livechatButton = document.querySelector('#livechatButton');
    
        if(isShow == undefined){
            isShow =  livechatList?.classList.contains('hidden') ? true : false ;
         }
         if (isShow) {
            livechatList.classList.remove('hidden');
            setTimeout(async () => {
                await nextFrame();
                livechatList.classList.add('active');
                livechatButton?.classList.add('active');
            }, 0);
        } else {
            livechatList?.classList.remove('active');
            livechatButton?.classList.remove('active');
            setTimeout(async () => {
                livechatList?.classList.add('hidden');
            }, 300); // timing take from transition duration
        }
    });

    const togglePopMenu = $((isShow? : boolean) => {
        const trxicon = document.querySelector('#trx-icon');
        const loginicon = document.querySelector('#user-icon');
        const popupmenu = document.querySelector('#popup-menu');
        const circleicon = document.querySelector('#circle-icon');
        const curvearea = document.querySelector('#curve-area');
        const curvearealeft = document.querySelector('#curve-area-left');
        const curvearearight = document.querySelector('#curve-area-right');
    
        if (commonData.isAuth) {
            selectedMenu.value = 'trx';
        } else {
            selectedMenu.value = 'login';
        }
    

         if(isShow == undefined){
            isShow =  popupmenu.classList.contains('hidden') ? true : false ;
         }
        if (!popupmenu) return;
        if (isShow) {
            popupmenu.classList.remove('hidden');
            popupmenu.classList.add('flex');

            if (selectedMenu.value === 'trx') {
                trxicon?.classList.add('selected-menu')
            } else {
                loginicon?.classList.add('selected-menu')
            }
            circleicon?.classList.remove('hidden')
            curvearea?.classList.remove('hidden')
            curvearealeft?.classList.remove('hidden')
            curvearearight?.classList.remove('hidden')

            setTimeout(async () => {
                await nextFrame()
                popupmenu.classList.add('active');
            }, 0);
            toggleLivechatList(false);
        } else {
            popupmenu.classList.remove('active');
            setTimeout(async () => {
                if (selectedMenu.value === 'trx') {
                    trxicon?.classList.remove('selected-menu')
                } else {
                    loginicon?.classList.remove('selected-menu')
                }
                popupmenu.classList.add('hidden');
                selectedMenu.value = '';
                circleicon?.classList.add('hidden')
                curvearea?.classList.add('hidden')
                curvearealeft?.classList.add('hidden')
                curvearearight?.classList.add('hidden')
            }, 300); // timing take from transition duration..
        }
    });
    
    
    const onCenterClickHandler = $(()=>{
        togglePopMenu();
     })
    const onLivechatClickHandler = $(() => {
        toggleLivechatList();
        togglePopMenu(false);
    });

     const { toggleModalQRL: toggleLoginQRL } = useLoginModal();
     const { toggleModalQRL: toggleRegQRL } = useRegisterModal();
    const csContacts = makeContactLinks(commonData.babysite_cs_contacts);
    return <>
        <div class={`bottomBar fixed  w-full bottom-0 left-0   p-1 text-center ${props.class? props.class: '' } ${selectedMenu.value === '' ? '' : 'menu-shadow'}`}  style={'z-index:'+ props.zIndex+';'}>
            <div class={`bottomBarNav w-full sm:w-8/12 mx-auto h-20  rounded-lg flex justify-evenly items-center relative text-center`}>
                    <a class={`menu flex-center flex-col  ${url.pathname==='/' ? 'active':''}`} href="/"> 
                        <p class=" icon text-2xl w-10 h-10 flex-center rounded-full">
                            <HomeIcon></HomeIcon>
                            </p> 
                            <p class="title text-xs mt-1"> {t('app.Home@@Home')}</p>
                    </a>
                    {commonData.isAuth && <>
                    <button onClick$={onCenterClickHandler} class={`menu flex-center flex-col relative center h-full ${url.pathname==='/withdraw/' || url.pathname==='/deposit/'|| url.pathname==='/statement/'  ? 'active':''}`}  > 
                        <div id="circle-icon" class="circle absolute rounded-full z-10 hidden"></div>
                        <div class="icon rounded-full p-2 text-2xl">
                        <div id="trx-icon" class="w-10 h-10 mx-auto flex-center"><TransactionIcon></TransactionIcon></div>
                        <p class="title text-xs mt-1">{t('app.Account@@Account')}</p>
                        </div> 
                        
                        <div id="curve-area-left" class="hidden curve-object-left"></div>
                        <div id="curve-area-right" class="hidden curve-object-right"></div>
                        <div id="curve-area" class="hidden curve-object menu-shadow -z-10 h-5/6">
                            <Curve />
                        </div>
                    </button>
                    </>}
                    {!commonData.isAuth && <>
                    <button class={`menu flex-center flex-col h-full`} onClick$={onCenterClickHandler} > 
                        <div id="circle-icon" class="circle absolute rounded-full z-10 hidden"></div>
                        
                        <div id="curve-area-left" class="hidden curve-object-left !-left-6"></div>
                        <div id="curve-area-right" class="hidden curve-object-right !-right-14"></div>
                        <div id="curve-area" class="hidden curve-object menu-shadow -z-10 h-5/6">
                          <Curve />
                        </div>
                        <p id="user-icon" class="icon text-2xl w-10 h-10 mx-auto flex-center rounded-full">
                            <UserIcon />
                        </p> 
                        <p class="title text-xs mt-1">{t('app.Account@@Account')}</p>
                    </button> 
                    </>}
                    <a class={`menu flex-center flex-col  block ${url.pathname==='/promotions/' ? 'active':''}`} href="/promotions/"> 
                        <p class=" icon text-2xl w-10 h-10 flex-center rounded-full">
                            <PromotionGiftIcon />
                        </p> 
                        <p class="title text-xs mt-1">{t('app.Promos@@Promos')}</p>
                    </a>
                    <button id="livechatButton" class={`menu flex-center flex-col h-full`} onClick$={onLivechatClickHandler}> 
                   
                        <p class=" icon text-2xl w-10 h-10 flex-center rounded-full">
                            <ChatIcon></ChatIcon>
                        </p> 
                        <p class="title text-xs mt-1">{t('app.Chat@@Chat')}</p>
                   </button>
                   <div id="livechatMenu" class="livechatMenu hidden absolute bottom-full right-9 flex flex-wrap gap-2 w-10 pb-2">
                   <a class={`menu block  shadow-md`} href={commonData.website_settings.chatUrl ?? '#'} target={commonData.website_settings.chatUrl ? '_blank' : ''}> 
                        <span class=" livechatIcon text-2xl w-10 h-10 flex-center rounded-full">
                            <ChatIcon></ChatIcon>
                        </span> 
                    </a>
                    {csContacts?.whatsapp.value && <>
                        <a
                                href={(csContacts?.whatsapp.url ? `${csContacts.whatsapp.url}` :`#`)}
                                target={csContacts?.whatsapp.url ? '_blank' : ''}
                                class="text-3xl shadow-md"
                            >
                                <span class="livechatIcon text-2xl w-10 h-10 flex-center rounded-full">
                                    <WhatsappIcon class="w-8 h-8"></WhatsappIcon>
                                </span>
                            </a>
                </>}
                    
                               
                               
                               
                                </div>
                    {/* <a class={`menu block`} href={commonData.website_settings.chatUrl ?? '#'} target={commonData.website_settings.chatUrl ? '_blank' : ''}> 
                        <p class=" icon text-2xl w-10 h-10 flex-center rounded-full">
                            <ChatIcon></ChatIcon>
                        </p> 
                        <p class="title text-xs mt-1">{t('app.Chat@@Chat')}</p>
                    </a> */}
                   
            </div> 
            <div class="left-0 right-0 bottom-0 absolute p-5 pb-7 hidden flex-col place-content-center" style="height: 240px;" id="popup-menu">
               {selectedMenu.value === 'login' && <> 
               <button class={`w-full popup-menu-row rounded-3xl p-2.5 mb-2.5 flex-center ${url.pathname==='/statement/' ? 'active':''}`} 
               onClick$={toggleRegQRL}>
                    <p class="text-2xl mr-2.5">
                        <RegisterIcon />
                    </p>
                    {t('app.Register@@Register')}
                </button>
               <button class={`w-full popup-menu-row rounded-3xl p-2.5 mb-2.5 flex-center ${url.pathname==='/statement/' ? 'active':''}`} 
               onClick$={toggleLoginQRL}>
                    <p class="text-2xl mr-2.5">
                        <LoginIcon />
                    </p>
                    {t('app.Login@@Login')}
                </button>
                </>}
                {selectedMenu.value === 'trx' && <> 
               <a class={`w-full popup-menu-row rounded-3xl p-2.5 mb-2.5 flex-center ${url.pathname==='/statement/' ? 'active':''}`} href="/statement/">
                    <p class="text-2xl mr-2.5">
                        <StatementIcon />
                    </p>
                    {t('app.Statement@@Statement')}
                </a>
                <a class={`w-full popup-menu-row rounded-3xl p-2.5 mb-2.5 flex-center ${url.pathname==='/withdraw/' ? 'active':''}`} href="/withdraw/">
                    <p class="text-2xl mr-2.5">
                        <WithdrawIcon />
                    </p>
                    {t('app.Withdraw@@Withdraw')}
                </a>
                <a class={`w-full popup-menu-row rounded-3xl p-2.5 flex-center ${url.pathname==='/deposit/' ? 'active':''}`} href="/deposit/">
                    <p class="text-2xl mr-2.5">
                        <DepositIcon />
                    </p>
                    {t('app.Deposit@@Deposit')}
                </a>
                </>}
                <span id="transparent"></span>
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