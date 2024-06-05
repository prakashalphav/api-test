import { useSignal, $, type Signal, useResource$ } from "@builder.io/qwik";
import { enter, leave } from "../../utils/transitions";
import { createSignals as createMSignals, useModal } from "../utils/useModal";
import type {
  CommonViewData,
  DepositData,
  AgentTrxBank,
  Gateway,
  AgentTrxNewFund,
  FundMethod,
  DepoFormData,
  UserBank,
  TrxPromo,
  ApiData,
  GatewayBank,
RegisterWalletData,
} from "~/services/types";
import { useGetCurrency } from "../utils/useGetCurrency";
import { toStrId } from "~/utils/common"; 
import { useAddFundAccResource } from "../utils/useResources";
import { useAlertDialog } from "../app/useInteract";
import CustomError from "~/utils/customError";
export type Props = {
  de: DepositData;
  cd: CommonViewData;
};
 
export type _PayOpt = AgentTrxBank | Gateway | AgentTrxNewFund;
export type OnSelPayOptsArgs = {
  method: FundMethod;
  selItem: _PayOpt;
};

export type PayOpt =
  | ({
      __id: string;
      imgUrl: string;
      intMethod: FundMethod;
      isActive: boolean;
    } & _PayOpt)
  | null;

// export type PromoOpt  = {
//     id :string,
//     [key: string]: string
// }|null;

export type DepoFormData2 = {
  gateway_def_min: number;
  gateway_def_max: number;
} & DepoFormData;
export const useDepositForm = () => {
  const selPayOpt = useSignal<PayOpt>(null);
  const selPromo = useSignal<TrxPromo | null>(null);
  const selUserWallet = useSignal<UserBank | null>(null);
  const userBanks = useSignal<UserBank[] >([]);
  const confirmPay = useSignal<boolean>(false);
  const { showModal: showPromoModal } = createMSignals();
  const { showModal: showAddFundAccModal } = createMSignals();
  
  // const depositRes = useSignal<any>({});

  const submitResult = useSignal<ApiData<null>>({ d: null });
  const depositRes = useResource$<DepoFormData2>(async (ctx) => {
    ctx.track(() => confirmPay.value);
    const abortController = new AbortController();
    ctx.cleanup(() => abortController.abort("cleanup"));
    console.log(
      "useResource depositRes",
      confirmPay.value,
      JSON.stringify(selPayOpt.value)
    );
    if (confirmPay.value && selPayOpt.value) {
      const res = await fetch(
        `/getDepositForm?method=${selPayOpt.value.intMethod}&pID=${
          selPayOpt.value.id || ""
        }&provider=${selPayOpt.value.setting?.id || ""}&isgateway=${
          selPayOpt.value.gateway || "0"
        }`,
        {
          signal: abortController.signal,
        }
      );

      const json = await res.json();
      const data = json.d as DepoFormData2; 
      if(!data){
        throw new CustomError(json)
      }
       
      let gateway_def_min = data.bank_setting?.min;
      let gateway_def_max = data.bank_setting?.max;
       if(Array.isArray(data.bank) && data.bank.length>0){

          data.bank.map((item)=>{

              //get the largest min amt
              gateway_def_min =item.min_amount > gateway_def_min ? item.min_amount : gateway_def_min;

              //get the smallest max amt
              gateway_def_max =item.max_amount < gateway_def_max ? item.max_amount : gateway_def_max;
          })
       }
       data.gateway_def_min =gateway_def_min;
       data.gateway_def_max =gateway_def_max;

       userBanks.value= data.userBanks;

      return data;
    }

    return {};
  });

 const { addFundAccResource}=  useAddFundAccResource(showAddFundAccModal, false);
 

  return {
    selPayOpt,
    selPromo,
    confirmPay,
    showPromoModal,showAddFundAccModal,
    depositRes,
    selUserWallet,
    submitResult,
    addFundAccResource,
    userBanks
  };
};
export const getPayOptId = (item: _PayOpt) => {
  if ((item as any)?.gateway !== undefined) {
    const o = item as Gateway;
    return o.gateway + "__" + o.method;
  } else if ((item as any)?.bank_name !== undefined) {
    const o = item as AgentTrxBank;
    return o.id + "__" + o.setting.id;
  } else if(item) {
    const o = item as AgentTrxNewFund;
    return toStrId(o.id) + "__" + toStrId(o.setting?.id);
  }
};

export const getImgSuffixByStatus = (item: _PayOpt) => {
  if (!isPayOptActive(item)) {
    return { img_suffix: "_gray.jpg?v=1", status_name: "offline" };
  } else {
    return { img_suffix: "_col.jpg?v=1", status_name: "online" };
  }
};
export const isPayOptActive = (item: _PayOpt) => {
  if ((item as any).gateway !== undefined) {
    const o = item as Gateway;
    return isGatewayOptActive(o);
  } else if ((item as any).bank_name !== undefined) {
    const o = item as AgentTrxBank;
    if (o.setting.status !== 2) {
      return true;
    }
    return false;
  } else {
    const o = item as AgentTrxNewFund;
    if (o.setting.status !== 2) {
      return true;
    }
    return false;
  }
};
export const isGatewayOptActive = (item: Gateway) => {
  if (item.maintenance) {
    return true;
  }
  return false;
};

export const pgModeNames: Record<number, string> = {
  5: "Bank Gateway",
  7: "E-Wallet Gateway",
  8: "Crypto Currency Gateway",
};

export const getBankImgUrl = (item: _PayOpt, currencyCode: string) => {
  if ((item as any).gateway !== undefined) {
    const o = item as Gateway;
    return getGatewayImgUrl(o);
  } else if ((item as any).bank_name !== undefined) {
    const o = item as AgentTrxBank;
    const imgd = getImgSuffixByStatus(item);

    return (
      "https://files.sitestatic.net/sprites/bank_logos/" +
      currencyCode +
      "/" +
      o.logo_image +
      imgd.img_suffix
    );
  } else {
    const o = item as AgentTrxNewFund;
    const imgd = getImgSuffixByStatus(item);

    return (
      "https://files.sitestatic.net/sprites/bank_logos/ewallet/" +
      o.logo_image +
      imgd.img_suffix
    );
  }
};

export const getGatewayImgUrl = (item: Gateway) => {
  return (
    "https://files.sitestatic.net/sprites/bank_logos/payment_gtway/bank_logos/" +
    item.gateway +
    ".png?v=1.1"
  );
};

export const getGatewayBankLogoUrl = (
  item: GatewayBank,
  pg_logos: Record<string, string>
) => {
  let logo_name = pg_logos[item.bank_code];

  let pgIndex = 0;
  if(!Array.isArray(pg_logos)){
    Object.keys(pg_logos).map((pgItem, index)=>{
      if(pgItem == item.standard_code){
        console.log(pgItem, index)
        pgIndex = index;
      }
    })
    logo_name = Object.values(pg_logos)[pgIndex];
  }

  return `https://files.sitestatic.net/sprites/bank_logos/payment_gtway/bank_logos/${logo_name}.png?v=1`;
};
export const useDeposit = (
  selPayOpt: Signal<PayOpt>,
  confirmPay: Signal<boolean>,
  showPromoModal: Signal<boolean>,
  selPromo: Signal<TrxPromo | null>,
  selUserWallet: Signal<UserBank | null>,
  submitResult: Signal<ApiData<null>>,
  showAddFundAccModal: Signal<boolean>,
  userBanks: Signal<UserBank[]>,
  props: Props
) => {
  const { currencyCode } = useGetCurrency(props.cd);

  const onOkPayOptQRL = $(async () => {
    if (selPayOpt.value && !confirmPay.value) {
      window.scrollTo(0, 0);
      confirmPay.value = true;
      const element = document.querySelector<HTMLElement>("#deposit-form");

      if (element) {
        enter(element, "slide-in");
      }
      const element2 = document.querySelector<HTMLElement>("#pay-methods");

      if (element2) {
        leave(element2, "slide-in");
      }
    } 
  });
  const onSelPayOptQRL = $(async ({ method, selItem }: OnSelPayOptsArgs) => {
    if (selItem) {
      selPayOpt.value = {
        __id: getPayOptId(selItem),
        imgUrl: getBankImgUrl(selItem, currencyCode),
        intMethod: method,
        isActive: isPayOptActive(selItem),
        // id: selItem.id,
        ...selItem,
      };

      await onOkPayOptQRL();
    }
  });
  const {openDialogQRL} = useAlertDialog();

  const onCloseSubmitResultDialog =  $(()=>{
    if (submitResult.value.type === "s") {

      if(submitResult.value.redirectUrl){
        //payment gateway
        location.href =submitResult.value.redirectUrl;
      }
      else if(submitResult.value.d?.popup){
        //payment gateway
        window.open(submitResult.value.d.pg_url);
        location.reload();
      }
      else {
        //if success then redirect to home page 
        location.href = "/";
      }
    
    }
   
    //else do not redirect
    return false;

  });
  const onSubmitFormQRL = $(
    async (
      dpForm: Signal<HTMLFormElement | undefined>,
      isWaiting: Signal<boolean>
    ) => {
      console.log("onSubmitFormQRL", dpForm.value);
      if (!dpForm.value) {
        submitResult.value = {
          d: null,
          type: "f",
          message: "Form is undefined",
          title: "An error occured",
        };
        return;
      }
      isWaiting.value = true;
      const formData = new FormData(dpForm.value);

      const receipt: HTMLInputElement | null =
        "receipt" in dpForm.value.elements
          ? (dpForm.value.elements as any)["receipt"]
          : null;

      if (receipt && (!receipt.files || receipt.files.length <= 0)) {
        formData.delete("receipt");
      }
      const controller = new AbortController();

      let postFetch: Promise<Response>;
      if (!selPayOpt.value?.gateway) {
        postFetch = fetch("/deposit/", {
          signal: controller.signal,
          body: formData,
          method: "post",
        });
      } else {
        postFetch = fetch("/deposit-via-gateway/", {
          signal: controller.signal,
          body: formData,
          method: "post",
        });
      }

      const response = await postFetch;

      submitResult.value = await response.json();

      await openDialogQRL( {message : submitResult.value.message ,onConfirm$ :onCloseSubmitResultDialog , onCancel$ :onCloseSubmitResultDialog} , submitResult.value.type);
      isWaiting.value = false;
      controller.abort(); 
    
    }
  );

  const onChgPayOptQRL = $(() => {
    confirmPay.value = false;
    const element = document.querySelector<HTMLElement>("#deposit-form");

    if (element) {
      leave(element, "slide-out");
    }
    const element2 = document.querySelector<HTMLElement>("#pay-methods");

    if (element2) {
      enter(element2, "slide-out");
    }
  });
  const { toggleModalQRL: togglePromoMdQRL } = useModal(showPromoModal);
  const { toggleModalQRL: _toggleAddFundAccMdQRL } = useModal(showAddFundAccModal);
  const onSelectPromoQRL = $(async (item?: TrxPromo) => {
    if (item && item !== undefined) {
      selPromo.value = item;
    }
    await togglePromoMdQRL();
  });
 
  const toggleAddFundAccMdQRL = $(async (items?: UserBank[]) => {
   
    if(items !== undefined){

        userBanks.value= items;
    }
    
    await _toggleAddFundAccMdQRL();
  });
 
  return {
    onSelPayOptQRL,
    onOkPayOptQRL,
    onChgPayOptQRL,
    onSubmitFormQRL,
    onSelectPromoQRL,
    togglePromoMdQRL,
    toggleAddFundAccMdQRL
  };
};
