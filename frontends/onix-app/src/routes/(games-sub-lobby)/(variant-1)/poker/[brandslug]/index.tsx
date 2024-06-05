 

import { component$ ,useStylesScoped$, Resource  } from '@builder.io/qwik'; 
import styles from './poker.scss?inline';
import GamesLobby from '~/modules/games-lobby/games/variant-2/Games2';
import Title from '~/components/titles/variant-1/Title1';
 
import {useGetSubGames} from '../../layout';
import type { GameItem } from '~/services/types';
import {
  inlineTranslate,  
} from 'qwik-speak';

export default component$(() => {
    useStylesScoped$(styles);
    const t = inlineTranslate();
    const subGamesRes = useGetSubGames();
    const {commonData : cd , subGames} = subGamesRes.value;
   
    const prepareData = ( list : GameItem[] )=>{

      const  newList =Object.entries( list).map(([key, item])=>{

        if(item && item.ImgSrc){
          item.ImgSrc = item.ImgSrc.replace("{{device}}", "mobile").replace("{{type}}", "normal");
 
          return item
        } 
       
      })

      return newList ;
    }
    return <> 
  
        <Title hasMobileBackUrl={true} mobileBackUrl={`/poker/`}>{t('app.P2P Games@@P2P Games')}</Title>
        
        
        <Resource value={subGames} 
              onPending={() => <div>Loading...</div>}
              onRejected={(e) => <div>Error :                 
                {JSON.stringify(e.message)}
              </div>}
              onResolved={(data) => ( <> 
                 <GamesLobby games={prepareData(data.d)}  ></GamesLobby>
              </>)}/> 
    </>;
})