import { component$, useStylesScoped$, useSignal } from '@builder.io/qwik';
import styles from './Faq.scss?inline';
import InfoMenu from "../InfoMenu";
import TabsMenu from "../../../../components/tabs-menu/variant-2/TabsMenu1";
import Accordion from "../../../../components/accordian/variant-1/Accordian1";
import { useNavTab} from "../../../../hooks/business/useNavTab";

type Props = {
  result_arr: any;
};


export default component$(( props : Props) => {
  useStylesScoped$(styles);

  const tabMenus = [
    {  title: "General", value: "general" },
    { title: "Deposit", value: "deposit" },
    { title: "Withdraw", value: "withdraw" },
    { title: "Gaming", value: "gaming" },
    { title: "Technical", value: "technical" },
    { title: "Banking", value: "banking" }
  ];

  const selMenu = useSignal("general");
  const { onSelCategoryQRL } = useNavTab(selMenu);
  return <>

    
      <div class="tabwraper  sm:mb-5">
        <InfoMenu></InfoMenu>
      </div>
      <div>
        <div>
          
          <TabsMenu menus={tabMenus} onClickMenu$={onSelCategoryQRL} selMenus={[selMenu.value]} lowercase={true}></TabsMenu>
        </div>
      
        <div class="Accordian py-5">
          {tabMenus.map((item: any, index) => (
            <div id={item.value} key={index} class={"hidden" + (selMenu.value == item.value ? "visible" : "")}>
               {props.result_arr.general && item.value === 'general' && props.result_arr.general.title_arr.map((data, index) => (
               <Accordion key={index} id={null} title={data} content={props.result_arr.general.data_arr[index]}  />
            ))}
            {props.result_arr.deposit && item.value === 'deposit' && props.result_arr.deposit.title_arr.map((data, index) => (
               <Accordion key={index} id={null} title={data} content={props.result_arr.deposit.data_arr[index]}  />
            ))}
            {props.result_arr.withdraw && item.value === 'withdraw' && props.result_arr.withdraw.title_arr.map((data, index) => (
               <Accordion key={index} id={null} title={data} content={props.result_arr.withdraw.data_arr[index]}  />
            ))}
             {props.result_arr.games && item.value === 'gaming' && props.result_arr.games.title_arr.map((data, index) => (
               <Accordion key={index} id={null} title={data} content={props.result_arr.games.data_arr[index]}  />
            ))}
             {props.result_arr.technical && item.value === 'technical' && props.result_arr.technical.title_arr.map((data, index) => (
               <Accordion key={index} id={null} title={data} content={props.result_arr.technical.data_arr[index]}  />
            ))}
            {item.value === 'banking' && (
              <div key={index} class="text-[var(--text-dark-color)] border muted-bd-color  p-5 text-base" >
                <div dangerouslySetInnerHTML={props.result_arr.banking.description }></div>
                <div class="max-md:overflow-scroll">
                  <table class="border-collapse border border-slate-400 w-full">
                    <thead>
                      <tr>
                        <th rowspan="2" class="border-collapse border border-slate-400 p-2">Bank Name</th>
                        <th rowspan="2" class="border-collapse border border-slate-400 p-2">Status</th>
                        <th rowspan="2" class="border-collapse border border-slate-400 p-2">Transaction</th>
                        <th rowspan="2" class="border-collapse border border-slate-400 p-2">Banking Method</th>
                        <th colspan="2" class="border-collapse border border-slate-400 p-2">Transaction Limit</th>
                        <th rowspan="2" class="border-collapse border border-slate-400 p-2">Processing Time</th>
                      </tr>
                      <tr>
                        <th class="border-collapse border border-slate-400 p-2">Min</th>
                        <th class="border-collapse border border-slate-400 p-2">Max</th>
                      </tr>
                    </thead>
                    {props.result_arr.banking && props.result_arr.banking.bankingOptionsList.map((data, index) => (<>
                    <tbody>
                    <tr class="border-collapse border border-slate-400 p-2">
                      <td rowspan="2" class="border-collapse border border-slate-400 p-2">{data.bank_name}</td>
                      <td rowspan="2" class="border-collapse border border-slate-400 p-2">{data.status == 1 ? 'Active' : 'Inactive'}</td>
                      <td class="border-collapse border border-slate-400 p-2">Deposit</td>
                      <td class="border-collapse border border-slate-400 p-2">{data.Deposit ? data.Deposit.trx_type_name : '-'}</td>
                      <td class="border-collapse border border-slate-400 p-2">{data.Deposit ? data.Deposit.setting.min_deposit : '-'}</td>
                      <td class="border-collapse border border-slate-400 p-2">{data.Deposit ? data.Deposit.setting.max_deposit : '-'}</td>
                      <td class="border-collapse border border-slate-400 p-2">{data.Deposit ? '1000' : '-'}</td>
                    </tr>
                    <tr>
                    <td class="border-collapse border border-slate-400 p-2">Withdrawal</td>
                    <td class="border-collapse border border-slate-400 p-2">{data.Withdrawal ? data.Withdrawal.trx_type_name : '-'}</td>
                      <td class="border-collapse border border-slate-400 p-2">{data.Withdrawal ? data.Withdrawal.setting.min_withdrawal : '-'}</td>
                      <td class="border-collapse border border-slate-400 p-2">{data.Withdrawal ? data.Withdrawal.setting.max_withdrawal : '-'}</td>
                      <td class="border-collapse border border-slate-400 p-2">{data.Withdrawal ? '1000' : '-'}</td>
                    </tr>
                    </tbody>
                    </>
                    ))}
                   </table></div>
              </div>
            )}
   
              
            </div>))}
        </div>
      </div>

  </>;
})