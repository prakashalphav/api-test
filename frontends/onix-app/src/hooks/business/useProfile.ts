import { useSignal, $ } from "@builder.io/qwik";
import type { ApiData } from "~/services/types";
import CustomError from "~/utils/customError";
import { useSecondPinModal } from "./useSecondPin";

export const useProfile = (is2ndPinOn: boolean | undefined, isUserSubscribed: boolean | undefined) => {
    const form = useSignal<HTMLFormElement>();
    const result = useSignal<ApiData<null>>({ d: null });
    const isWaiting = useSignal<boolean>(false);
    const isWaitingSub = useSignal<boolean>(false);
    const isSecondPinOn = useSignal<boolean | undefined>(is2ndPinOn);
    const isSubscribed = useSignal<boolean | undefined>(isUserSubscribed);
  
    const {toggleModalQRL : toggle2ndPinModalQRL} = useSecondPinModal();
    const update2ndpin = $(async () => {
      isSecondPinOn.value = !isSecondPinOn.value;
      isWaiting.value = true;
   
        const formData = new FormData(form.value);

        const resp = await fetch("/ajaxUpdate2ndPinFlag", {
          body: formData,
          method: "post",
        });
 
          result.value = await resp.json();
          if (result.value.type === "s") {
              if(isSecondPinOn.value){
                //if user on second pin
               await toggle2ndPinModalQRL("setup", false);

              }
          }
         

      isWaiting.value = false;
    });
    const updateEmailSubscription = $(async (isChecked:boolean) => {
        isSubscribed.value = !isSubscribed.value;
        isWaitingSub.value = true;
      
            const formData = new FormData();
            formData.append("is_email_subscription", (isSubscribed.value ? 1 : 0));

            const resp = await fetch("/ajaxUpdateEmailSubscription", {
                body: formData,
                method: "post",
            });

           
            result.value = await resp.json();
             
        isWaitingSub.value = false;
    });

    return { 
      form,
      result,
      isWaiting,
      isWaitingSub,
      isSecondPinOn,
      isSubscribed,
      update2ndpin,
      updateEmailSubscription,
    };

}
