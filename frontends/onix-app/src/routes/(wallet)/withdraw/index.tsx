import { component$  ,Resource,useStylesScoped$ } from '@builder.io/qwik';
import styles from './withdraw.scss?inline'; 
import Withdraw from  '../../../modules/withdraw/variant-1/Withdraw';
import type { RequestEvent, RequestHandler} from '@builder.io/qwik-city';
import { routeLoader$ } from '@builder.io/qwik-city';
import { getWithdraw } from '~/services/contentDB';
import { useGetCommonViewData } from '~/routes/layout';
import { storeWithdraw } from '~/services/memberDB';
import { useGetWalletViewData } from '../layout';
import { 
  useSpeak,
} from 'qwik-speak';

// POST req
export const onPost: RequestHandler = async (ev: RequestEvent) => {
  try {
  const formData = await ev.request.formData();
  console.log("storeWithdraw", formData);
  const apiData = await storeWithdraw(ev, formData);
  console.log("storeWithdraw", apiData);
  ev.json(200, apiData);
} catch (error) {
  ev.json(500, error); 
}
};

export const useGetWithdrawData = routeLoader$( async ( ev) => {
  const {commonData} = await ev.resolveValue(useGetWalletViewData);
 
  const withdrawData = await getWithdraw(ev);

  const wd = withdrawData.d as any;
  if (
    wd.is_show_register_bank !== undefined &&
    wd.is_show_register_bank === true
  ) {
    throw ev.redirect(302, "/register-acc?back_url=withdraw");
  }

  return  {commonData, withdrawData};  
 });
export default component$(() => {   
  useStylesScoped$(styles);
  const withdrawResource  =  useGetWithdrawData();
  const { commonData:cd, withdrawData: wd} = withdrawResource.value; 

  useSpeak({assets:['wallet', ],});
  return (
    <>
     
     <Resource value={withdrawResource} 
              onPending={() => <div>Loading...</div>}
              onRejected={() => <div>Error</div>}
              onResolved={(d) => ( <>  

              {console.log('withdraw', wd.d)}
             {  wd.d && (<Withdraw wd={wd.d} cd={cd.d} userFullName={wd.d?.user_full_name} bankList={wd.d?.user_banks} currencyCode={cd.d?.website_settings.currencyCode} userBal={cd.d?.user_bal} minWd={wd.d?.min_wd} maxWd={wd.d?.max_wd} wdToken={wd.d?.withdraw_token}></Withdraw>)}
        </>)}/>
       
    </>
  );
});
