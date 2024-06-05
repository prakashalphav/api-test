import { component$,useStyles$,   Slot   } from '@builder.io/qwik';
import ProfileMenu from "../../modules/profile/variant-1/ProfileMenu";
import styles from './profile.scss?inline';
import Title from '../../components/titles/variant-1/Title1';
import { routeLoader$, useLocation } from '@builder.io/qwik-city';
import { useGetCommonViewData } from '../layout';
import { makeAlertMsgCommonData } from '~/utils/sysUtils';
import { PATH_HOME } from '~/utils/constants/constants';

import {
  inlineTranslate,  
} from 'qwik-speak';
export const useGetProfileLayout = routeLoader$( async ( ev) => {
 
  const commonData= await ev.resolveValue(useGetCommonViewData);
  if (!commonData.d?.isAuth) {
    
    
    throw ev.redirect(302,makeAlertMsgCommonData(commonData, PATH_HOME));
  }

  return {commonData};
});

export default component$(() => {
  const t = inlineTranslate();
  useStyles$(styles);
  const currentLocation = useLocation();
  const pathUrl = currentLocation.url.pathname;
  const {commonData}=   useGetProfileLayout();
  const pageTitle = [
    { title:  t('app.Profile@@Profile'), url: "/profile/"},
    { title:  t('app.Profile@@Profile'), url: "/profile/"},
    { title:  t('app.Change Password@@Change Password') , url: "/profile/change-password/"},
    { title:  t('app.Referral Downline@@Referral Downline') , url: "/profile/referral-downline/"},
    { title:  t('app.Member Level@@Member Level'),url: "/profile/member-level/"},
    { title:  t('app.My Promo@@My Promo'), url: "/profile/my-promo/"},
    { title:  t('app.My Bonus@@My Bonus'),url: "/profile/my-bonus/"},
  ];
  
  return (
    <> 
      <div class="profile min-h-screen max-w-screen sm:mt-5 bt-10 content__pg mb-16  sm:rounded-xl p-0 pt-0 sm:p-5 sm:pt-2 lg:pl-4 lg:pr-10 lg:py-10 lg:pt-3 lg:flex mt-3 sm:mt-10 lg:mt-5">
        <Title  class={`title__pg px-4 lg:px-0`}   isHideDesktop={true}>
          {pageTitle.map((l) => (
            <div>
              { l.url == pathUrl && (l.title) }
            </div>
          ))}
        </Title>
        <ProfileMenu></ProfileMenu>
        <Slot />  
      </div>   
    </>
  );
});