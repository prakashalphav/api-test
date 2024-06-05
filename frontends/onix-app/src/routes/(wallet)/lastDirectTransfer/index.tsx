import { Resource, component$ ,useStylesScoped$ ,useStyles$ } from '@builder.io/qwik'; 
import styles from "./lastDirectTransfer.scss?inline";
import LastDirectTransfers from "~/modules/last-direct-transfers/variant-1/LastDirectTransfers1";
import { 
  useSpeak,
} from 'qwik-speak';
import { routeLoader$ } from '@builder.io/qwik-city';
import { getLastDirectTransfer } from "~/services/memberDB"; 
import { useGetWalletViewData } from '../layout';
import reportListBoxStyles from "~/components/report-list/variant-1/ReportListBox1.scss?inline";
import reportListTableStyles from "~/components/report-list/variant-1/ReportListTable1.scss?inline";
export const useGetLastDirectTransferData = routeLoader$( async ( ev) => {
  const {commonData} = await ev.resolveValue(useGetWalletViewData);
 
  const lastDirectTransferData=   getLastDirectTransfer(ev);  
  return  {commonData , lastDirectTransferData};  
 });
export default component$(() => {
    useStylesScoped$(styles);
    useSpeak({assets:['wallet', ],});
    useStyles$(reportListBoxStyles);
    useStyles$(reportListTableStyles);
    const   {commonData , lastDirectTransferData} = useGetLastDirectTransferData().value;
    return <>
       <Resource value={lastDirectTransferData} 
            onPending={() => <div>Loading...</div>}
            onRejected={(e) => <div>Error : {(JSON.parse(e.message).message)}</div>}
            onResolved={(d) => ( <>
             
      <LastDirectTransfers data={d.d}></LastDirectTransfers>
      </>)}/>
    </>;

});
