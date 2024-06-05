import { component$,   Slot ,useStylesScoped$  } from '@builder.io/qwik';
 

export default component$(() => {
  
    return (
      <> 
      
      <div class="max-w-screen mb-16 overflow-hidden">
      <Slot />        </div>
     
      </>
    );
  });