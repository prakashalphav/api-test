import { component$, useStylesScoped$ ,Resource } from '@builder.io/qwik'; 
import styles from './register-acc.scss?inline';  

import RegisterWallet from '~/modules/register-wallet/variant-1/RegisterWallet1';
import { routeLoader$ } from '@builder.io/qwik-city';
import { getRegWalletAcc } from '~/services/contentDB';
import { 
  useSpeak,
} from 'qwik-speak';
import { useGetWalletViewData } from '../layout';
export const useGetRegWalletAcc =  routeLoader$( async (ev)=>{
  //TODO should add guard if ald hv wallet acc then redirect?

    const backUrl= ev.query.get('back_url');
    console.log('back_url', ev.query.get('back_url'));
    const {commonData} = await ev.resolveValue(useGetWalletViewData);
 
    const regWalletData = getRegWalletAcc(ev);  
    return  {commonData , regWalletData ,backUrl};   
 
} 
); 

export default component$((  ) => {

    useStylesScoped$(styles); 

    const resource= useGetRegWalletAcc();

    const {  regWalletData ,backUrl, commonData}  =resource.value;

    useSpeak({assets:['wallet', ],});
    return <>
    
       <Resource value={regWalletData} 
              onPending={() => <div>Loading...</div>}
              onRejected={(e) => <div>Error : {
                 JSON.stringify(e.message)
                }</div>}
              onResolved={(rw) => ( <>

              {console.log('rw ', rw.d)}
              {rw.d && (<>
                <RegisterWallet accNoMinLength={commonData.d?.acc_length||0} rw={rw.d} backUrl={backUrl}></RegisterWallet>
              </>)}
    </>)}/>
   
    </>;
});