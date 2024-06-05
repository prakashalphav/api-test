import { component$, useStylesScoped$, useSignal } from '@builder.io/qwik';
import styles from './TermsConditions.scss?inline';
import InfoMenu from "../InfoMenu";
import TabsMenu from "../../../../components/tabs-menu/variant-2/TabsMenu1";
import Accordion from "../../../../components/accordian/variant-1/Accordian1";
import { useNavTab } from "../../../../hooks/business/useNavTab";

type Props = {
  title_arr: any;
  data_arr: any;
};

export default component$(( props : Props) => {
  useStylesScoped$(styles);

  const tabMenus = [
    { title: "Terms & Conditions", value: "TermsConditions" },

  ];

  const selMenu = useSignal("TermsConditions");
  const { onSelCategoryQRL } = useNavTab(selMenu);

  return <>
    <div class="text-[var(--text-dark-color)]">
      <div class="tabwraper  sm:mb-5">
        <InfoMenu></InfoMenu>
      </div>
      <div>
        <div>
          <TabsMenu menus={tabMenus} onClickMenu$={onSelCategoryQRL} selMenus={[selMenu.value]} lowercase={true}></TabsMenu>
        </div>

        <div class="Accordian p-5">
          {tabMenus.map((item: any, index) => (
            <div id={item.value} key={index} class={"hidden" + (selMenu.value == item.value ? "visible" : "")}>
                  {props.title_arr && item.value === 'TermsConditions' && props.title_arr.map((data, index) => (
                    <Accordion id={null} key={index} title={data} content={props.data_arr[index]} />
                  ))} 
            </div>
          ))}
        </div>
      </div>
    </div>
  </>;
})