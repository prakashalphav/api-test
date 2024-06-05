import { component$ ,useStylesScoped$, Resource  } from '@builder.io/qwik'; 
import styles from './others.scss?inline';
import Lobby1 from '~/modules/games-lobby/brands-lobby/variant-1/BrandsLobby1';
import Lobby2 from '~/modules/games-lobby/brands-lobby/variant-2/BrandsLobby2';
import {useGetCommonViewData} from '../../layout';
import { useCommonViewData } from "~/hooks/app/useCommonViewData";

export default component$(() => {
    useStylesScoped$(styles);
    const cvResource = useGetCommonViewData();
    const {commonData} = useCommonViewData();

    return <>
            <Resource value={cvResource} 
              onPending={() => <div>Loading...</div>}
              onRejected={() => <div>Error</div>}
              onResolved={(d) => ( <>     
                { commonData.app_sub_skin === "zplay" ? (
                  <Lobby2 providers={Object.values(d.d?.games_data.others as any)}></Lobby2>
                ) : (
                  <Lobby1 providers={Object.values(d.d?.games_data.others as any)}></Lobby1>
                )} 
        </>)}/>
    </>;
})