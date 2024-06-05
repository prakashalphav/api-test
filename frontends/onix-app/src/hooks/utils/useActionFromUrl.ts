import { $ ,useVisibleTask$ } from "@builder.io/qwik";
import type { ApiData } from "~/services/types";
import { useAlertDialog } from "../app/useInteract";
import type { dialogProps } from "~/components/dialog/variant-1/Dialog1";
import { PATH_HOME } from "~/utils/constants/constants";
import { removeQueryParams } from "~/utils/common";

 
export const useActionFromUrl= ( alertMsg:ApiData<any>)=>{ 

    const {openDialogQRL} = useAlertDialog();

    useVisibleTask$(async ({ cleanup }) => {

        // /*prompt message if Action Alert in Query string*/
         // Get the current URL
       const currentURL = window.location.href;
        // // Create a URL object from the current URL
       const url = new URL(currentURL);
    
        // Get the value of the "token" query parameter
       
         const actionFromUrl = url.searchParams.get("action");
        if(!alertMsg){
            return;
        }
        const action =  alertMsg.action ? alertMsg.action: actionFromUrl;

        if(  action == "alert"){
          const message =alertMsg.message;//  url.searchParams.get("message") ||"";
          const title =alertMsg.title;// url.searchParams.get("title")||"";
          const type = alertMsg.type;//url.searchParams.get("type")||"w";
        //   removeQueryParams(["message","title","type","action"]);
          removeQueryParams(["action"]);
          await openDialogQRL({title :  title  , message: message  } as dialogProps, type);
        }
      });
}