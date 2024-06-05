import { Resource, component$, useStylesScoped$, useStyles$ } from "@builder.io/qwik";
import styles from "./TransferWalletModal1.scss?inline";
import Modal from "~/components/modal/variant-1/Modal1";
import ArrowTransferCircle from "~/components/icons/ArrowTransferCircle";
import SubmitBtn from "~/components/button/variant-1/Button1";
import AlertMsg from "~/components/alert-msg/variant-1/AlertMsg1";

import { WalletIcon } from "~/components/icons/Wallet2";
import { ArrowCircle } from "~/components/icons/ArrowCircle";
import { Substract } from "~/components/icons/Substract";
import { GameIcon } from "~/components/icons/Game4";
import RangeSlider from "~/components/range-slider/variant-1/RangeSlider1";

import { useTransferWallet } from "~/hooks/business/useTransferWallet";
import { priceFormat } from "~/utils/formatters/priceFormat";
import { useCommonViewData } from "~/hooks/app/useCommonViewData";
import { isString } from "~/utils/common";
import buttonActionStyles from "~/components/button-action-styles/variant-1/ButtonActionStyles1.scss?inline";

import {
    inlineTranslate
} from 'qwik-speak';

type Props = {

};

export default component$((props: Props) => {
    useStylesScoped$(styles);

    useStyles$(buttonActionStyles);

    const t = inlineTranslate();

    const { showTransWalletModal, toggleModalQRL, transWalletCtx, gameBalance, currentBalance, confirmResult, onInputSliderQRL, onTransferToGame, transferAmt } = useTransferWallet();

    const {commonData} = useCommonViewData();

    return (
        <>
            {showTransWalletModal.value &&
                <Modal title={t('app.Transfer Credit to Games@@Transfer Credit to Games')} toggleModal$={async () => {

                    await toggleModalQRL(transWalletCtx.value);

                }} maxWidth="max-w-md" modalContainerClass="p-2 text-center min-w-full"   >

                    <Resource
                        value={currentBalance}
                        onPending={() => <div class="flex-center" style="min-height:350px">Loading...</div>}
                        onRejected={() => <div class="flex-center" style="min-height:350px">Error</div>}
                        onResolved={(walletBalance) => (
                            <>
                                {console.log('getBal walletBalance', walletBalance)}

                                <div class="mt-2 flex justify-center items-center">
                                    {/* Current Wallet */}
                                    <div class="flex flex-col justify-center items-center h-[165px] w-[160px]" style="color: #19FDAA;">
                                        <div class="absolute h-[165px] w-[160px] -z-10"><Substract color1="#8B67FF" color2="#6435FA"></Substract></div>
                                        <div class="text-4xl flex-center">
                                            <WalletIcon></WalletIcon>
                                        </div>
                                        <div class="font-bold text-base">
                                            <span class="p-1 pr-2">{
                                                priceFormat(walletBalance - transferAmt.value, {
                                                    prefix: `${commonData?.website_settings?.currencyCode}`,
                                                    centsLimit: 2,
                                                })
                                            }</span>
                                        </div>
                                        <div class="py-1 text-xs text-white"> {t('app.Current Balance@@Current Balance')}</div>
                                    </div>
                                    <div class="text-2xl flex-center">
                                        <ArrowCircle color1="#EBE4FF"
                                            color2="#C7B6FF"></ArrowCircle>
                                    </div>
                                    <div class="flex flex-col justify-center items-center h-[165px] w-[160px]" style="color: #FAFF1E;">
                                        <div class="absolute h-[165px] w-[160px] -z-10" style="transform: scaleX(-1);"><Substract color1="#8B67FF" color2="#6435FA"></Substract></div>
                                        <div class="text-4xl  flex-center">
                                            <GameIcon></GameIcon>
                                        </div>
                                        <div class="font-bold text-base">
                                            <Resource
                                                value={gameBalance}
                                                onPending={() => <div>Loading...</div>}
                                                onRejected={() => <div>Error</div>}
                                                onResolved={(bal) => (
                                                    <>
                                                        <span class="px-1 pr-2">
                                                            {
                                                                isString(bal) ? bal :
                                                                    priceFormat(bal, {
                                                                        prefix: `${commonData?.website_settings?.currencyCode}`,
                                                                        centsLimit: 0,
                                                                    })
                                                            }
                                                        </span>
                                                    </>
                                                )}
                                            />
                                        </div>
                                        <div class="py-1 text-xs text-white"> {t('app.Game Wallet Balance@@Game Wallet Balance')}</div>
                                    </div>
                                </div>
                                {/* Slider div */}
                                <div class="flex justify-center mt-4 text-gray-700">
                                    <RangeSlider currencyCode={commonData?.website_settings?.currencyCode} onInput$={onInputSliderQRL} min={2000} max={walletBalance} value={0}>algo</RangeSlider>
                                </div>
                                {/* Transfer Credit to Games div */}
                                <div class="flex w-full justify-center">
                                    <button class="flex justify-center items-center px-9 h-9 mt-16 rounded-full text-white" style="background: var(--demo-green, linear-gradient(180deg, #00F9A7 0%, #00C97B 100%));" onClick$={onTransferToGame}>
                                        {t('app.Transfer Credit to Games@@Transfer Credit to Games')}
                                    </button>
                                </div>
                                {/* Submit and cancel div */}
                                <div class="flex w-full h-full justify-center items-center gap-2 text-xs tracking-tighter">
                                    <div style="color: #6435FA;">
                                        <SubmitBtn
                                            icon={ArrowTransferCircle} onClick$={async () => {
                                                if (transWalletCtx.value?.launchGame$) {
                                                    await transWalletCtx.value?.launchGame$();
                                                }
                                                setTimeout(toggleModalQRL, 100);
                                            }} class="p-4 save-btn" text={t('app.Play Game@@Play Game')} type="submit"></SubmitBtn>
                                    </div>
                                    <button class="p-4" onClick$={async () => {
                                        await toggleModalQRL(transWalletCtx.value);
                                    }}> {t('app.Cancel@@Cancel')}</button>
                                </div>

                                <div class="mt-1 my-2">
                                    <AlertMsg message={confirmResult} ></AlertMsg>
                                </div>
                            </>
                        )}
                    />
                </Modal>}
        </>
    );
});        