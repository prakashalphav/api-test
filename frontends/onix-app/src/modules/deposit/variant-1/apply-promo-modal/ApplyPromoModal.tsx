import { component$, useStylesScoped$, Resource ,useStyles$ } from "@builder.io/qwik";
import styles from "./ApplyPromoModal.scss?inline";

import { useApplyPromoModal, type Props } from "~/hooks/business/useApplyPromoModal";
import Checkbox from "../../../../components/checkbox/variant-1/Checkbox1";
import SubmitBtn from "../../../../components/button/variant-1/Button1";
import Modal from "~/components/modal/variant-1/Modal1";
import FormInput from "../../../../components/form-input/variant-1/FormInput1";
import AlertMsg from "~/components/alert-msg/variant-1/AlertMsg1";
import buttonActionStyles from "~/components/button-action-styles/variant-1/ButtonActionStyles1.scss?inline";
import ArrowRight2Icon from "~/components/icons/ArrowRight2";
import {
  inlineTranslate,  
} from 'qwik-speak';
/*remove this if CMP does not have props*/

export default component$((props: Props) => {
  useStylesScoped$(styles);

  const t = inlineTranslate();
  
useStyles$(buttonActionStyles);
  const {
    onViewDetailsQRL,
    onExitDetailsQRL,
    tempSelPromo,
    onExitQRL,
    selViewPromo,
    applyPromoResult,
    isWaiting,
    promoCodeInput,
    onConfirmPromoQRL,
    mapPromoGivenTypeText
  } = useApplyPromoModal(props);

  return (
    <>
      {props.showPromoModal.value && (
        <Modal title={selViewPromo.value !=null? t("wallet.View Promo Details@@View Promo Details") : t("wallet.Select Promotion@@Select Promotion")} toggleModal$={onExitQRL} maxWidth="max-w-md" class={`modal p-5 pb-3`} inlineStyle="min-width:370px">
          <div class="py-2 w-full h-0 border-t"></div>
 
          {  applyPromoResult.value?.type != "s" && (
        
        <div class="my-1"> 
                        <AlertMsg message ={applyPromoResult}></AlertMsg>
                        </div>
           )}
          <div class="flex overflow-hidden"> 
          <div id="content-select" class="w-full">
            <section id="sec-promo-code" class="mb-3">
              <label for="dp_promo_code" class="block pb-2 font-semibold">
                  {t('app.Add a promo code@@Add a promo code')}
              </label>
              <div class="flex-center gap-2">
                <div class="flex-auto min-w-0">
                  <FormInput
                    {...{
                      ...{
                        type: "text",
                        placeholder: "",
                        required: false,
                        disabled: false,
                        readonly: false,
                        maxLength: 100,
                        name: "promo_code",
                      },
                    }}
                    id="dp_promo_code"
                    ref={promoCodeInput}
                  ></FormInput>
                </div>
                {/* <button type="button" class="add-pcode-btn  rounded p-3 "> 
                Add
                </button> */}

                <SubmitBtn
            icon={ArrowRight2Icon}  type="button" class="apply-btn-v2 rounded p-3" onClick$={async(easing)=>{await onConfirmPromoQRL(true)}} text= {t('app.Add@@Add')} isWaiting={isWaiting}></SubmitBtn>
              </div>
            </section>
            <section id="sec-promo-list" class="mb-3">
            <Resource
        value={props.depositRes}
        onPending={() => <div>Loading...</div>}
        onRejected={() => <div>Failed to load data</div>}
        onResolved={(dr) => {
         return <> 
       
          
              <ul class="opt-list max-h-[200px] my-1.5 overflow-y-auto scroller pr-2">
              
                {dr.promotion_array?.map((item ) => {
                  return (
                    <>
                      <li
                        class={
                          "pay-opt rounded-[10px] p-2 my-1.5 first:mt-0 last:mb-0 " +
                          (tempSelPromo.value?.promo_code === item.promo_code ? "active" : "")
                        }
                      >
                        <Checkbox
                          type="radio"
                          id={`promo-opt-${item.promo_code}`}
                          name="promo-opt"
                          value={item.promo_code}
                          direction="flex-row"
                          onChange$={() => {
                            tempSelPromo.value = item;
                          }}
                        >
                          <div class=" leading-tight">
                            <p class="text-sm text-secondary">
                              {mapPromoGivenTypeText(item.given_after_turnover) }
                            </p>
                            <p class="text-base font-semibold">{item.title}</p>
                           
                          <div  class="grid grid-cols-12 gap-x-2">
                          <p class="text-xs italic text-secondary col-span-5"> {t('app.Code@@Code')} :  <span class="underline">{item.promo_code}</span></p>
                          <p class="text-xs italic text-secondary col-span-7"> {t('app.Type@@Type')} :  <span class="underline">{item.promo_type}</span></p>
                          <p class="text-xs italic text-secondary col-span-5">
                          {t('app.Min Deposit@@Min Deposit')}  :  <span class="underline">{item.min}</span>
                            </p>
                            <p class="text-xs italic text-secondary col-span-7">
                            {t('app.Max Rewarded@@Max Rewarded')}  :  <span class="underline">{item.max}</span>
                            </p>
                          </div>
                            
                            <button
                              type="button"
                              onClick$={async () => {
                                await onViewDetailsQRL(item);
                              }}
                              class="text-[var(--text-brand)]"
                            >
                             {t('app.view details@@view details')}  
                            </button>
                          </div>
                        </Checkbox>
                      </li>
                    </>
                  );
                })}
              </ul>
              </>
            }}/>
            </section>
            <div class="mb-3 text-center">
              <SubmitBtn
            icon={ArrowRight2Icon} 
               isWaiting={isWaiting}
                onClick$={async(e)=>{
                  await onConfirmPromoQRL(false);
                }}
                type="button"
                text={ t('app.Confirm@@Confirm')}
              ></SubmitBtn>

 
            </div>
          </div>
          <div id="content-details" class="hidden w-full">
            
          <p class="text-sm text-secondary">
                              {mapPromoGivenTypeText(selViewPromo.value?.given_after_turnover) }
                            </p>
            <h3 class="text-lg font-semibold">{selViewPromo.value?.title}</h3>
            <div class="grid grid-cols-12 gap-x-2">
            <p class="text-xs italic text-secondary col-span-5"> {t('app.Code@@Code')} : <span class="underline">{selViewPromo.value?.promo_code}</span></p>
            <p class="text-xs italic text-secondary col-span-7"> {t('app.Type@@Type')} : <span class="underline">{selViewPromo.value?.promo_type}</span></p>
            <p class="text-xs italic text-secondary col-span-5">
            {t('app.Min Deposit@@Min Deposit')}  :   <span class="underline">{selViewPromo.value?.min}</span>
            </p>
            <p class="text-xs italic text-secondary col-span-7">
            {t('app.Min Bonus Rewarded@@Min Bonus Rewarded')} :   <span class="underline">{selViewPromo.value?.max}</span>
            </p>
            </div>
           
            <p class="my-4 max-h-[300px] overflow-y-auto scroller pr-2">
              <label class="text-xs italic text-secondary"> {t('app.DescriptionT&C@@Description / T&C')}</label>
              {selViewPromo.value?.descriptionandtermAndCondition  ?  (<div dangerouslySetInnerHTML={selViewPromo.value?.descriptionandtermAndCondition} />) : (<div> - </div>) }
            </p>

            <div>
              <SubmitBtn
            icon={ArrowRight2Icon} 
                onClick$={onExitDetailsQRL}
                type="button"
                text={t('app.Back@@Back')} 
              ></SubmitBtn>
            </div>
          </div>
          </div>
        </Modal>
      )}
    </>
  );
});
