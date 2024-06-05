import { component$, useStylesScoped$, Resource } from "@builder.io/qwik";
import DepositSuccessPage from "~/modules/deposit-success/variant-1/DepositSuccess1";
import { routeLoader$ } from "@builder.io/qwik-city";
import { getDepositSuccessContent } from "~/services/contentDB";
import { useGetCommonViewData } from "../layout";
import Title from "~/components/titles/variant-1/Title1";
import { inlineTranslate } from "qwik-speak";
import { makeAlertMsgCommonData } from "~/utils/sysUtils";
import { PATH_HOME } from "~/utils/constants/constants";

export const useGetDepositSuccessContent = routeLoader$(async (ev) => {
  const commonData = await ev.resolveValue(useGetCommonViewData);

  if (!commonData.d?.isAuth) {
    throw ev.redirect(302, makeAlertMsgCommonData(commonData, PATH_HOME));
  }
  const dpSuccessContent = getDepositSuccessContent(ev);
  return { dpSuccessContent };
});

export default component$(() => {
  // useStylesScoped$(styles);
  const DPSuccessContent = useGetDepositSuccessContent();
  const { dpSuccessContent } = DPSuccessContent.value;
  const t = inlineTranslate();

  return (
    <>
      <div class="min-h-screen max-w-screen sm:mt-5 sm:rounded-2xl sm:p-4  content__pg mb-16">
        <Title class={`title__pg px-4 lg:px-0`}>
          {t("Deposit Success@@Deposit Success")}
        </Title>
        <Resource
          value={dpSuccessContent}
          onPending={() => <div>Loading...</div>}
          onRejected={(e) => <div>Error : {JSON.parse(e.message).message}</div>}
          onResolved={(d) => (
            <>
              <DepositSuccessPage content={d.d?.content}></DepositSuccessPage>
            </>
          )}
        />
      </div>
    </>
  );
});
