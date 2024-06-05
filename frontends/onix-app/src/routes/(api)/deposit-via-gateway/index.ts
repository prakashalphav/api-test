 
import type { RequestEvent, RequestHandler } from "@builder.io/qwik-city";

import { storeDepositGateway } from "~/services/memberDB";

export const onPost: RequestHandler = async (ev: RequestEvent) => {


  try {

    const formData = await ev.request.formData(); 
    const apiData = await storeDepositGateway(ev, formData); 
    ev.json(200, apiData);
  } catch (error) {
      ev.json(500, error); 
  }
};
