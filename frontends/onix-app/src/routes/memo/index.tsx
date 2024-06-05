import { Resource, component$ ,useStylesScoped$  } from '@builder.io/qwik'; 
import styles from './memo.scss?inline';
import Title from '../../components/titles/variant-1/Title1';
import Memo from '../../modules/memo/variant-1/Memo';
import { getMemoData } from '../../services/contentDB';
import { routeLoader$ } from '@builder.io/qwik-city';
import { useGetCommonViewData } from '../layout';
import { makeAlertMsgCommonData } from '~/utils/sysUtils';
import { PATH_HOME } from '~/utils/constants/constants';
import {
    inlineTranslate,  
  } from 'qwik-speak';
import {
    useSpeak,
 } from 'qwik-speak';
export const useGetMemoData = routeLoader$( async ( ev) => {
    const commonData= await ev.resolveValue(useGetCommonViewData);
    if (!commonData.d?.isAuth) {
       
      throw ev.redirect(302,makeAlertMsgCommonData(commonData, PATH_HOME));
    }
  
    const memoData = getMemoData(ev);
    return { memoData };
});

export default component$(() => {
    useStylesScoped$(styles);
    const GetMemoData = useGetMemoData();
    const { memoData } = GetMemoData.value;

    const t = inlineTranslate();
    useSpeak({assets:['home','events' ],});

    return <>
  
    <div class="min-h-screen max-w-screen sm:mt-5 sm:rounded-2xl sm:p-4  content__pg mb-16">
        <Title  class={`title__pg px-4 lg:px-0`}  > {t('app.Memo@@Memo')} </Title>

        <Resource value={memoData} 
            onPending={() => <div>Loading...</div>}
            onRejected={(e) => <div>Error : {(JSON.parse(e.message).message)}</div>}
            onResolved={(d) => ( <>
                <Memo memoData={d.d}></Memo>
            </>)}/>
       
        </div>
        
    </>;
})