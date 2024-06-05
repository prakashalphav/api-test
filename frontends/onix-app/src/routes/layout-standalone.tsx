import { component$,  Slot ,  } from '@builder.io/qwik';
import { DocumentHead } from '@builder.io/qwik-city';
 
 
 

export default component$(() => {
  //const serverTime = useServerTimeLoader(); 

  return (
    <> 

      <main class="relative">  
          <Slot />  
      </main>
    </>
  );
});

