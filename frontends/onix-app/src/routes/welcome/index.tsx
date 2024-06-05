import { component$, useStylesScoped$, Resource } from "@builder.io/qwik";
import WelcomePage from "~/modules/welcome/variant-1/Welcome1";
import { routeLoader$ } from "@builder.io/qwik-city";
import { getWelcomeContent } from "~/services/contentDB";
import { useGetCommonViewData } from "../layout";

export const useGetWelcomeContent = routeLoader$(async (ev) => {
  const commonData = await ev.resolveValue(useGetCommonViewData);

  if (!commonData.d?.isAuth) {
    throw ev.redirect(302, "/");
  }
  const welcomeContent = getWelcomeContent(ev);
  return { welcomeContent };
});

export default component$(() => {
  // useStylesScoped$(styles);
  const GetWelcomeContent = useGetWelcomeContent();
  const { welcomeContent } = GetWelcomeContent.value;

  return (
    <>
      <div class="min-h-screen max-w-screen sm:mt-5 sm:rounded-2xl sm:p-4  content__pg mb-16">
        <Resource
          value={welcomeContent}
          onPending={() => <div>Loading...</div>}
          onRejected={(e) => <div>Error : {JSON.parse(e.message).message}</div>}
          onResolved={(d) => (
            <>
              <WelcomePage content={d.d?.success_content}></WelcomePage>
            </>
          )}
        />
      </div>
    </>
  );
});
