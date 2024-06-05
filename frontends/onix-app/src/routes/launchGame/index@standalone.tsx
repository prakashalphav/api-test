import { $, Resource, component$, useVisibleTask$,   } from '@builder.io/qwik'; 
import { routeLoader$, type DocumentHead} from '@builder.io/qwik-city';  
import { useAlertDialog } from '~/hooks/app/useInteract';
 
import { launchGame } from '~/services/contentDB'; 
import { onClose } from '~/utils/common';
 
 

export const useGetGameLaunchUrl = routeLoader$(async (  ev) => {
 
  try {
    const apiData = await launchGame(ev); 
    console.log('useGetGameLaunchUrl',apiData); 
    return apiData; 
  } catch (error) {
    
    console.log('useGetGameLaunchUrl',error)
    return error;
  }
 
 
});

export default component$(() => {  
  const launchData =  useGetGameLaunchUrl(); 

  const {openDialogQRL} = useAlertDialog();
  useVisibleTask$(async ( ) => {
    // will run when the component becomes visible

    if( launchData.value.d?.launch_url){
      window.location.href = launchData.value.d?.launch_url;
    }
    else {
     await  openDialogQRL( { message: launchData.value.message ||""  , onCancel$ : $(onClose), onConfirm$ : $(onClose)} , 'f')
    }
  });  
  return ( 
    <> 
     <Resource value={launchData} 
                  onPending={() => <div>Loading...</div>}
                  onRejected={() => <div>Error</div>}
                  onResolved={(d) => ( <>     
        
      
    </>)}/>
    </>  
  );
});
 