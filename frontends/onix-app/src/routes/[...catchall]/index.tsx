
import { component$,   Resource, useStyles$  } from '@builder.io/qwik';

import { getCustomMenuContent} from '~/services/contentDB'; 
import { 
  useSpeak,  
} from 'qwik-speak';
import { routeLoader$  } from '@builder.io/qwik-city'; 
import {useGetCommonViewData} from '~/routes/layout'; 
import type {CustomMenuContent, ApiData} from "~/services/types";
import tableDefaultStyles from "~/css/table/tableDefault.scss?inline";

export const useGetCustomMenuContent = routeLoader$( async ( ev) => {
    
 const commonData  = await ev.resolveValue(useGetCommonViewData);  
 const customMenuContent =   getCustomMenuContent(ev,ev.params.catchall) as Promise<ApiData<CustomMenuContent>>;  
 return  {commonData , customMenuContent};  
});

export default component$(() => {  
    useStyles$(tableDefaultStyles);

    const { commonData , customMenuContent} = useGetCustomMenuContent().value; 
    return <>
    <div class="max-w-screen mt-5 mb-16 overflow-hidden px-2">
         <Resource value={customMenuContent} 
            onPending={() => <div>Loading...</div>}
            onRejected={(e) => <div>Error : {e.message}</div>}
            onResolved={(d) => ( <>
              
             <div dangerouslySetInnerHTML={d.d.content}></div>
            </>)}/>
    </div>
    </>;
})