

export async  function enter(element : HTMLElement, transition : string) {
    element.classList.remove('hidden');
   
    element.classList.add(`${transition}-enter-active`);
    element.classList.add(`${transition}-enter-from`);
   
    // Wait until the above changes have been applied...
    await nextFrame();
 
    element.classList.remove(`${transition}-enter-from`);
    element.classList.add(`${transition}-enter-to`);
    
     // Wait until the transition is over...
    await afterTransition(element);
    
    element.classList.remove(`${transition}-enter-to`);
  element.classList.remove(`${transition}-enter-active`);
       
  }

  export async function leave(element : HTMLElement, transition : string) {
    element.classList.remove('hidden');
   
    element.classList.add(`${transition}-leave-active`);
    element.classList.add(`${transition}-leave-from`);
    // Wait until the above changes have been applied...
    await nextFrame();
   
    element.classList.remove(`${transition}-leave-from`);
    element.classList.add(`${transition}-leave-to`);

     // Wait until the transition is over...
    await afterTransition(element);
   
    element.classList.remove(`${transition}-leave-to`);
    element.classList.remove(`${transition}-leave-active`);
   
    element.classList.add('hidden');
  }


  function afterTransition(element : HTMLElement) {
    return new Promise(resolve => {
      const duration = Number(
        getComputedStyle(element)
          .transitionDuration
          .replace('s', '')
      ) * 1000;
   
      setTimeout(() => {
         resolve(null);
      }, duration);
    });
  }
  export async  function nextFrame() {
    return new Promise(resolve => {
      requestAnimationFrame(() => {
        requestAnimationFrame(resolve);
      });
    });
  }