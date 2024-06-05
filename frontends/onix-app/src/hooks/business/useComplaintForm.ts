import {
  useContext,
  useSignal,
  type Signal,
  $,
  useStore,
} from "@builder.io/qwik";
import type { ApiData  } from "~/services/types";
import { type Form, useForm } from "../utils/useForm";
import { SHOW_COMPLAINT_MODAL } from "../context";
import { createSignals as createMSignals, useModal } from "../utils/useModal"; 

export function useComplaint() {
  const { showComplaintModal, toggleModalQRL } = useComplaintModal();
  const captchaVersion = useSignal<number>(1);
  const captchaImg = useSignal<string>(); 
  // const captchaTag= useSignal<HTMLImageElement>( );
  const result = useSignal<ApiData<null>>({ d: null });
  const isWaiting = useSignal<boolean>(false);
 

  const validatedForm = useStore<Form>( { user_name :null, email : null, subject:null, message:null, captcha : null });

  const {setFieldQRL,getFormStatusData} =  useForm(validatedForm);
 
  const onSubmitQRL = $(async () => {
    isWaiting.value = true;
    // const formData = new FormData(form.value);

    const formData =  await getFormStatusData();

    if(formData.validation.status === "success"){
      
      const controller = new AbortController();
      fetch("/submitComplaint", {
        signal: controller.signal,
        body: formData.data,
        method: "post",
      })
        .then((response) => response.json())
        .then((json) => {
          result.value = json;
          if (result.value.type === "s") {
            if (typeof window !== "undefined") {
              alert(result.value.message);
              location.reload();
            }
          }
        })
        .catch((error) => {
          //TODO
          console.error(error);
        })
        .finally(() => {
          isWaiting.value = false;
          controller.abort(); // Abort the request
          // Clean up any other resources associated with the request
        });
    }
    else {
       isWaiting.value = false;
    }
 
  });

  const onRefreshCaptchaQRL = $(() => {
    captchaVersion.value = captchaVersion.value + 1;
    const controller = new AbortController();

    fetch("/captcha-image/?v=" + captchaVersion.value, {
      signal: controller.signal,
    })
      .then((response) => response.text())
      .then((text) => {
        captchaImg.value = text;
      })
      .catch((error) => console.error(error))
      .finally(() => {
        controller.abort(); // Abort the request
        // Clean up any other resources associated with the request
      });
  });
 
  return {
    onSubmitQRL,
    captchaImg, 
    result,
    onRefreshCaptchaQRL,
    isWaiting, 
    validatedForm, 
    setFieldQRL,
    showComplaintModal, 
    toggleModalQRL,
  };
}

export const createSignals = () => {
  const { showModal } = createMSignals();
  return { showModal };
};
export const useSignals = () => {
  const showComplaintModal = useContext<Signal<boolean>>(SHOW_COMPLAINT_MODAL);
  return { showComplaintModal };
};

export function useComplaintModal() {
  const { showComplaintModal } = useSignals();
  const { toggleModalQRL } = useModal(showComplaintModal);

  return { showComplaintModal, toggleModalQRL };
}
