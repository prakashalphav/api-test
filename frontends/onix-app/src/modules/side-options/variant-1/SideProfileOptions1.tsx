
import type { Signal} from '@builder.io/qwik';
import { component$, useStylesScoped$ ,  } from '@builder.io/qwik'; 
import styles from './SideOptions1.scss?inline'; 

import {
    inlineTranslate,  
  } from 'qwik-speak'; 
  import { useCommonViewData } from '~/hooks/app/useCommonViewData';
 
  import { useNotificationCtx } from '~/hooks/business/useNotifications'; 
  import { DownloadAppIcon } from '~/components/icons/DownloadApp';
  import { Profile2Icon } from '~/components/icons/Profile2';
import { NotificationIcon } from '~/components/icons/Notification';
import { StatementIcon } from '~/components/icons/Statement';
import { TransactionIcon } from '~/components/icons/Transaction';
import { Deposit2Icon } from '~/components/icons/Deposit2';
import { Withdraw2Icon } from '~/components/icons/Withdraw2'; 
import { Logout2Icon } from '~/components/icons/Logout2';   
import { Promotion3Icon } from '~/components/icons/Promotion3';
import { BonusIcon } from '~/components/icons/Bonus';
import { MemberLevelIcon } from '~/components/icons/MemberLevel';
  type Props ={
    optionsEle : Signal<HTMLDivElement>,  
    zIndex : number,
  
   
  }
export default component$(( props :Props) => {
    useStylesScoped$(styles); 
    const t = inlineTranslate();
    const {commonData} = useCommonViewData(); 
    const { notificationCtx } = useNotificationCtx();
    return (
        <>
 <div ref={props.optionsEle} class="  absolute  h-fit pt-10 p-6  right-0 optionsContainer rounded-[10px] rounded-t-none" style={`top:2.3rem; width:18rem;z-index:${props.zIndex} `}>
              <div>
                <ul class="optionBox">
                  <li class="mb-4"><a class="flex" href="/profile/my-promo/"><Promotion3Icon></Promotion3Icon> <span class="ml-3 flex items-center">{t('app.My Promo@@My Promo')}</span> </a></li>
                  <li class="mb-4"><a class="flex" href="/profile/my-bonus/"><BonusIcon></BonusIcon><span class="ml-3 flex items-center">{t('app.My Bonus@@My Bonus')}  </span> </a></li> 
                  <li class="mb-4"><a class="flex" href="/deposit/"><Deposit2Icon></Deposit2Icon> <span class="ml-3 flex items-center">{t('app.Deposit@@Deposit')}</span> </a></li>
                  <li class="mb-4"><a class="flex" href="/withdraw/"><Withdraw2Icon></Withdraw2Icon><span class="ml-3 flex items-center">{t('app.Withdraw@@Withdraw')}</span> </a></li>
                 
                  <li class="mb-4"><a class="flex" href="/lastDirectTransfer/"><TransactionIcon></TransactionIcon><span class="ml-3 flex items-center">{t('app.Last Direct Transfers@@Last Direct Transfers')}</span> </a></li>
                  <li class="mb-4"><a class="flex" href="/statement/"><StatementIcon></StatementIcon><span class="ml-3 flex items-center">{t('app.Statement@@Statement')}</span> </a></li>
                  
                  <li class="mb-4"><a class="flex" href="/profile/"><Profile2Icon></Profile2Icon> <span class="ml-3 flex items-center">{t('app.My Profile@@My Profile')}  </span> </a></li>
                  <li class="mb-4"><a class="flex" href="/profile/member-level/"><MemberLevelIcon></MemberLevelIcon><span class="ml-3 flex items-center">{t('app.Member Level@@Member Level')}  </span> </a></li>
                  {commonData.website_settings?.isOffReferralMenu != '1' && 
                    <li class="mb-4"><a class="flex" href="/profile/referral-downline/"><MemberLevelIcon></MemberLevelIcon><span class="ml-3 flex items-center">   {t('app.Referral Downline@@Referral Downline')}   </span> </a></li>
                  }
                  <li class="mb-4"><a class="flex" href="/profile/change-password/"><MemberLevelIcon></MemberLevelIcon><span class="ml-3 flex items-center">  {t('app.Change Password@@Change Password')}   </span> </a></li>
                  <li class="mb-4"><a class="flex" href="/memo/"><NotificationIcon></NotificationIcon><span class="ml-3 relative">{t('app.Memo@@Memo')} 
                  {notificationCtx.inboxCnt > 0 && <span class="absolute flex-center  h-5 w-5 top-0 right-0 -translate-y-1/2 translate-x-full"><span class="animate-ping absolute  h-full w-full rounded-full bg-red-500 opacity-75 text-xs text-white"></span><span class="relative flex-center rounded-full h-5 w-5 bg-red-500 text-xs text-white">{notificationCtx.inboxCnt}</span>
                        </span>}
                  </span> </a></li>
                  <li class="mb-4"><a class="flex" href="/logout/"><Logout2Icon></Logout2Icon> <span class="ml-3 flex items-center">{t('app.Logout@@Logout')} </span> </a></li>
                  <li class="flex-center mt-2"> 
                    <a href={commonData?.website_settings?.apk_url||""}  class="rounded-full border w-fit py-2 px-4 flex-center"> <span class="mr-1">{t('app.Download mobile app@@Download mobile app')}</span> <DownloadAppIcon class="w-4 h-4"></DownloadAppIcon> </a>
                  </li>
                </ul>
              </div>
       </div>
       </>
  )
});
