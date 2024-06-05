import {EventInterface} from '@splidejs/splide/dist/js/splide.esm.js';

export function Transition( Splide, Components ) {
  const { bind } = EventInterface( Splide );
  
  const { Move } = Components;
  const { list } = Components.Elements;

  let endCallback;

  function mount() {
    bind( list, 'transitionend', e => {
      if ( e.target === list && endCallback ) {
        // Removes the transition property
        cancel();

        // Calls the `done` callback
        endCallback();
      }
    } );
  }

  function start( index, done ) {
  
    // Moves the carousel to the destination.
    Move.jump( index );

    // Keeps the callback to invoke later.
    endCallback = done;
  }

  function cancel() {
    list.style.animation = '';
  }

  return {
    mount,
    start,
    cancel,
  };
}