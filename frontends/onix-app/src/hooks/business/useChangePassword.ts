import { useSignal, $ } from "@builder.io/qwik";
import type { ApiData } from "~/services/types";
import { useAlertDialog } from "../app/useInteract";

export function useChangePassword() {
  const init = () => {
    const form = useSignal<HTMLFormElement>();
    const result = useSignal<ApiData<null>>({ d: null });
    const isWaiting = useSignal<boolean>(false);

    const {openDialogQRL} = useAlertDialog();
    const onSubmitQRL = $(async () => {
      isWaiting.value = true;
      
        const formData = new FormData(form.value);

        const resp = await fetch("/change-password", {
          body: formData,
          method: "post",
        });
 
         result.value = await resp.json();
     
         await openDialogQRL( {message : result.value.message  } , result.value.type);
      
 

      isWaiting.value = false;
    });

    return {
      onSubmitQRL,
      form,
      result,
      isWaiting,
    };
  };

  return { init };
}
