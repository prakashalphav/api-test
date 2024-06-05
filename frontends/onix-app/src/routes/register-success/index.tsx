import { component$, useStylesScoped$, Resource } from "@builder.io/qwik";
import RegisterSuccessPage from "~/modules/register-success/variant-1/RegisterSuccess1";
import { routeLoader$ } from "@builder.io/qwik-city";
import { getRegisterSuccessContent } from "~/services/contentDB";
import { useGetCommonViewData } from "../layout";
import Title from "~/components/titles/variant-1/Title1";
import { inlineTranslate } from "qwik-speak";
import { makeAlertMsgCommonData } from "~/utils/sysUtils";
import { PATH_HOME } from "~/utils/constants/constants";

export const useGetRegisterSuccessContent = routeLoader$(async (ev) => {
  const commonData = await ev.resolveValue(useGetCommonViewData);

  if (!commonData.d?.isAuth) {
    throw ev.redirect(302, makeAlertMsgCommonData(commonData, PATH_HOME));
  }
  const rgSuccessContent = getRegisterSuccessContent(ev);
  return { rgSuccessContent };
});

export default component$(() => {
  // useStylesScoped$(styles);
  const RGSuccessContent = useGetRegisterSuccessContent();
  const { rgSuccessContent } = RGSuccessContent.value;
  const t = inlineTranslate();

  return (
    <>
      <div class="min-h-screen max-w-screen sm:mt-5 sm:rounded-2xl sm:p-4  content__pg mb-16">
        <Title class={`title__pg px-4 lg:px-0`}>
          {t("Register Success@@Register Success")}
        </Title>
        <Resource
          value={rgSuccessContent}
          onPending={() => <div>Loading...</div>}
          onRejected={(e) => <div>Error : {JSON.parse(e.message).message}</div>}
          onResolved={(d) => (
            <>
              <RegisterSuccessPage content={d.d?.content}></RegisterSuccessPage>
            </>
          )}
        />
      </div>
    </>
  );
});
