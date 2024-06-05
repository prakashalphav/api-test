import { component$ ,useStylesScoped$  } from '@builder.io/qwik'; 
import styles from "./statement.scss?inline";
import TransactionHistory from "~/modules/transaction-history/variant-1/TransactionHistory";
import { 
  useSpeak,
} from 'qwik-speak';
export default component$(() => {
    useStylesScoped$(styles);
    useSpeak({assets:['wallet', ],});
    return <>
    
      <TransactionHistory></TransactionHistory>
     
    </>;

});
