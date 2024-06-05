import { component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./HelpPopup1.scss?inline";
import { inlineTranslate } from "qwik-speak";
import { useHelpPopup } from "~/hooks/business/useSideNav";
import { PhoneIcon } from "~/components/icons/Phone2";
import { LiveHelpIcon } from "~/components/icons/LiveHelp2";
import { InfoIcon } from "~/components/icons/Info";
type Props = {
  zIndex: number;
  classDesktop?: string;
  chatUrl?: string;
};
export default component$((props: Props) => {
  useStylesScoped$(styles);
  const t=  inlineTranslate();
  const { showHelpPopup, helpPopup } =   useHelpPopup();
  
  return (
    <>
    
      {showHelpPopup.value && (
        <>
          <div ref={helpPopup}>
            <aside
              class={`${props.classDesktop} helpPopUpMenu lg:block hidden overflow-hidden absolute h-auto right-0 top-20 mt-1 rounded-xl`}
              style={"z-index:" + props.zIndex + ";"}
            >
              <div class="p-2">
                <ul class="">
                  <li class="p-3 rounded-lg">
                    <a href={props.chatUrl || "#"} 
                       target="_blank" 
                       class="flex items-center menuTab">
                      <div class=" mr-3 icon text-lg">
                         <PhoneIcon></PhoneIcon>{" "}
                      </div>
                      <span class="">{t('app.Quick Contact@@Quick Contact')}</span>
                    </a>
                  </li>
                  <li><div class="line"></div></li>
                  <li class="pt-4 p-3 rounded-lg">
                    <a href="/info/how-sportsbook/" class="flex items-center menuTab">
                      <div class=" mr-3 icon text-lg">
                         <LiveHelpIcon></LiveHelpIcon> {" "}
                      </div>
                      <span class="">{t('app.How to play@@How to play')}</span>
                    </a>
                  </li>
                  <li class="p-3 rounded-lg">
                    <a href="/info/faq/" class="flex items-center menuTab">
                      <div class=" mr-3 icon text-lg">
                         <InfoIcon></InfoIcon>{" "}
                      </div>
                      <span class="">{t('app.Info Center@@Info Center')}</span>
                    </a>
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </>
      )}
    </>
  );
});
