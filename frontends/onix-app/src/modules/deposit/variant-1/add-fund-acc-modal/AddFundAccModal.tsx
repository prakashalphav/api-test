import type { Signal, PropFunction, ResourceReturn   } from "@builder.io/qwik";
import { component$, useStylesScoped$,Resource   } from "@builder.io/qwik";
import styles from "./AddFundAccModal.scss?inline";

import {
  inlineTranslate,  
} from 'qwik-speak';
import Modal from "~/components/modal/variant-1/Modal1";
import RegisterWallet from "~/modules/register-wallet/variant-1/RegisterWallet1"; 
import type { RegisterWalletData } from "~/services/types";
/*remove this if CMP does not have props*/
type Props = { 
  showAddFundAccModal :Signal<boolean> ;  
  toggleAddFundAccMdQRL : PropFunction<( ) => void>;
  addFundAccResource :ResourceReturn<RegisterWalletData>;
  accNoMinLength : number;
}
export default component$((props: Props) => {
  useStylesScoped$(styles);

  const t = inlineTranslate();

  

  return (
    <>
        
 
     {props.showAddFundAccModal.value &&    <Modal title= {t('app.Add Fund Account@@Add Fund Account')} toggleModal$={async ()=>{ await props.toggleAddFundAccMdQRL()}} maxWidth="max-w-md" class={`modal p-5 pb-3`} inlineStyle="min-width:370px">
          <div class="py-2 w-full h-0 border-t"></div>
          <Resource
              value={props.addFundAccResource}
              onPending={() => <div>Loading...</div>}
              onRejected={(e) => <div>Failed to load data. {JSON.stringify(e)}</div>}
              onResolved={(data) => {
                console.log('addFundAccResource', data)
                return (
                  <> 
                  {data &&  <RegisterWallet  accNoMinLength={props.accNoMinLength} rw={data} showAddFundAccModal={props.showAddFundAccModal} toggleAddFundAccMd$={props.toggleAddFundAccMdQRL} ></RegisterWallet>}
                  </>
            )}}/>

        </Modal>
       }
    </>
  );
});
