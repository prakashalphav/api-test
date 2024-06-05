import { $ } from '@builder.io/qwik';
import { inlineTranslate,   } from 'qwik-speak';



export function useEventsUtils (){
 
    const t= inlineTranslate();
    
  const mapPromoGivenTypeText = $((givenType :number )=>{
    const t= inlineTranslate();
    if(givenType == 0 ){
      return  t('app.Bonus Give Ahead@@Bonus Give Ahead' ) ;
    }else {
      return  t('app.Bonus After@@Bonus is given after reaching TurnOver requirement' ) ;
    }
  });
  
  return {
    mapPromoGivenTypeText
  }
  
}