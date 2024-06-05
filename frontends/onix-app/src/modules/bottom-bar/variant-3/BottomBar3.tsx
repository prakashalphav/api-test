import { component$, useStylesScoped$, $   } from '@builder.io/qwik'; 

import styles from './BottomBar3.scss?inline';  
import {HomeIcon}  from '~/components/icons/Home4';
import {WalletIcon} from "~/components/icons/Wallet";
import { DepositIcon } from '~/components/icons/Deposit';
import { WithdrawIcon } from '~/components/icons/Withdraw';
import { StatementIcon } from '~/components/icons/Statement3';
import { useLocation } from '@builder.io/qwik-city';
import { nextFrame } from '~/utils/transitions';
import { LockIcon } from '~/components/icons/Lock';
import { useLoginModal } from "../../../hooks/business/useLoginModal";
import { useRegisterModal } from "../../../hooks/business/useRegisterModal";
import { AddUserIcon } from '~/components/icons/AddUser';
import {
    inlineTranslate,  
  } from 'qwik-speak';
import { LiveHelpIcon } from '~/components/icons/LiveHelp3';
import { ReferralIcon } from '~/components/icons/Referral4';
import { PromotionGiftIcon } from '~/components/icons/PromotionGift2';
import { Deposit2Icon } from '~/components/icons/Deposit2';
import { Withdraw2Icon } from '~/components/icons/Withdraw2';
import { WarningIcon } from "~/components/icons/Warning";
import { useCommonViewData } from "~/hooks/app/useCommonViewData";
import { useComplaintModal } from "../../../hooks/business/useComplaintForm";

type Props = {  
    zIndex : number,  
    isAuth : boolean,
    livechatUrl : string,
    class? : string,
};

export default component$((props: Props) => {
    useStylesScoped$(styles);
    const {url} =useLocation();
    console.log("url" ,url)

    const { toggleModalQRL: toggleComplaintQRL } = useComplaintModal();
    const {commonData} = useCommonViewData(); 
    const t = inlineTranslate();
    const  onCenterClickHandler = $(()=>{
        const popupmenu = document.querySelector('#popup-menu');

        if(!popupmenu) return ;
        if( popupmenu.classList.contains('hidden')){
            popupmenu.classList.remove('hidden')
         setTimeout(async () => {
             await nextFrame()
             popupmenu.classList.add('active');
        }, 0);
   
        
        }
        else {
            popupmenu.classList.remove('active')
         setTimeout( async () => {
            // await nextFrame() --> not work
            popupmenu.classList.add('hidden')
           
         }, 300 );//timing take from transition duration..
         
        } 
     })

     const { toggleModalQRL: toggleLoginQRL } = useLoginModal();
     const { toggleModalQRL: toggleRegQRL } = useRegisterModal();
    return <>
        <div class={`fixed  w-full bottom-0 left-0 text-center ${props.class? props.class: '' }`}  style={'z-index:'+ props.zIndex+';'}>

                <div class={`nav w-full sm:w-8/12 mx-auto grid grid-cols-5 justify-items-center items-center relative text-center`}>
                        <a class={`menu block  ${url.pathname==='/' ? 'active':''}`} href="/"> 
                            <p class=" icon text-2xl">
                                <HomeIcon></HomeIcon>
                                </p> 
                                <p class="title text-xs mt-1"> {t('app.Home@@Home')}</p>
                        </a>

                        <a class={`menu block ${url.pathname==='/promotions/' ? 'active':''}`} href="/promotions/"> 
                            <p class=" icon text-2xl">
                                <PromotionGiftIcon style="width:0.8em; margin-top:0.1em"></PromotionGiftIcon>
                            </p> 
                            <p class="title text-xs mt-1">{t('app.Promos@@Promos')}</p>
                        </a>

                        {props.isAuth && <>
                             <button onClick$={onCenterClickHandler} class={`menu block relative center ${url.pathname==='/withdraw/' || url.pathname==='/deposit/'|| url.pathname==='/statement/'  ? 'active':''}`}  > 
                        
                             <div class="circleSurface absolute rounded-full "></div>
                                 <p class=" icon rounded-full p-3 mb-1 ">
                                     {/* <TransactionIcon></TransactionIcon> */}
                                     <WalletIcon></WalletIcon>
                                     </p> 
                                     <p class="title text-xs mt-1">{t('app.Transaction@@Transaction')}</p>
                             </button>
                        
                        </>
                        }

 

                        {!props.isAuth && <>
                        <button class={`menu block relative center  `} onClick$={toggleRegQRL} > 
                        
                        <div class="circleSurface absolute rounded-full "></div>
                            <p class=" icon rounded-full p-3 mb-1 ">
                                <AddUserIcon></AddUserIcon>
                                </p> 
                                <p class="title text-xs mt-0.5"> {t('app.Account@@Account')}</p>
                        </button>

                        </>}

                        {
                        // commonData.website_settings?.isOffReferralMenu != '1' && 
                        //     <a class={`menu block ${url.pathname==='/referral/' ? 'active':''}`} href="/referral/"> 
                        //         <p class=" icon text-2xl">
                        //             <ReferralIcon style="margin-top:0.1em"></ReferralIcon>
                        //         </p> 
                        //         <p class="title text-xs mt-1">{t('app.Referral@@Referral')}</p>
                        //     </a>
                        }
                      
                      {commonData.website_settings?.is_allow_complaint_form == '1' && 
                        <button class={`menu block`} onClick$={toggleComplaintQRL}> 
                            <p class=" icon text-2xl">
                                <WarningIcon style="margin-top:0.1em"></WarningIcon>
                            </p> 
                            <p class="title text-xs mt-1">{t('app.Complaint@@Complaint')}</p>
                        </button>
                       }

                 
                        <a class={`menu block`} href={props.livechatUrl ?? '#'} target={props.livechatUrl ? '_blank' : ''}> 
                            <p class=" icon text-2xl">
                                <LiveHelpIcon style="margin-top:0.1em"></LiveHelpIcon>
                            </p> 
                            <p class="title text-xs mt-1">{t('app.Chat@@Chat')}</p>
                        </a>
                       
                </div> 

                <div class="left-0 right-0 mx-2 bottom-14 gap-6 p-6 absolute hidden flex-col place-content-center rounded-lg" id="popup-menu">
                                <a class={`w-full text-base popup-menu-row rounded-3xl flex-center ${url.pathname==='/deposit/' ? 'active':''}`} href="/deposit/">
                                    <p class="text-2xl mr-2.5">
                                        <Deposit2Icon/>
                                    </p>
                                    {t('app.Deposit@@Deposit')}
                                </a>
                                <a class={`w-full text-base popup-menu-row rounded-3xl flex-center ${url.pathname==='/withdraw/' ? 'active':''}`} href="/withdraw/">
                                    <p class="text-2xl mr-2.5">
                                        <Withdraw2Icon />
                                    </p>
                                    {t('app.Withdraw@@Withdraw')}
                                </a>
                                <a class={`w-full text-base popup-menu-row rounded-3xl flex-center ${url.pathname==='/statement/' ? 'active':''}`} href="/statement/">
                                    <p class="text-2xl mr-2.5">
                                        <StatementIcon />
                                    </p>
                                    {t('app.Statement@@Statement')}
                                </a>
                </div>
        </div>
    </>
})