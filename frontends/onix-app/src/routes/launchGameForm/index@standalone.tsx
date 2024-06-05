import { $, Resource, component$, useVisibleTask$,   } from '@builder.io/qwik'; 
import { routeLoader$, type DocumentHead, useLocation} from '@builder.io/qwik-city';  
 
 

export const useGetGameLaunchParams = routeLoader$(async (  ev) => {
 

  console.log(' ev.url.search' ,  ev.url.searchParams)
     
  return  ev.url.searchParams; 
 
});

export default component$(() => {   
  const loc  =  useGetGameLaunchParams();
 
  useVisibleTask$(async ( ) => {
    // will run when the component becomes visible

    console.log("sdfsdf")
    document.launchform.submit();
  },
  { strategy: 'document-ready' });  
  return ( 
    <> 
        <Resource value={loc} 
      onPending={() => <div>Loading...</div>}
      onRejected={() => <div>Error</div>}
      onResolved={(d) => ( 
      <>
 
      <div class="hidden">
          <form id="launchForm" name="launchform" method="post" action={d.get('toUrl')}  >
          
        {d.forEach((value, key)=> (<>
                <input name={key} value={value} />
              </>))}
				<input type="submit"/>
          </form>

      </div>
    </>
      )}/>
    </>

  );
});
 