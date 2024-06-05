import { createContextId, type Signal, type Store } from '@builder.io/qwik';
 
import type {CommonViewData, DepositData, MultipleAuthAction, NeedRegisterWallet, SecondPinContext, Toast,NotificationCtx, TransferWalletCtx,  } from "~/services/types";
export const APP_HAS_MODAL = createContextId<Signal<boolean>>('hasModal');
 
// export const USER_CTX = createContextId<{}>('user_ctx');

export const SHOW_LOGIN_MODAL = createContextId<Signal<boolean>>('showLoginModal');
export const SHOW_SIDE_NAV = createContextId<Signal<boolean>>('showSideNav');
export const SHOW_REGISTER_MODAL = createContextId<Signal<boolean>>('showRegisterModal');
export const SHOW_COMPLAINT_MODAL = createContextId<Signal<boolean>>('showComplaintModal');
export const SHOW_PROFILE_POPUP = createContextId<Signal<boolean>>('showProfilePopup');
export const SHOW_PROMOTION_MODAL = createContextId<Signal<boolean>>('showPromotionModal');
export const SHOW_TRANSACTION_POPUP = createContextId<Signal<boolean>>('showTransactionPopup');
export const SHOW_BONUS_HISTORY_MODAL = createContextId<Signal<boolean>>('showBonusHistoryModal');
export const SHOW_POPUP_BANNER = createContextId<Signal<boolean>>('showPopupBanner');
export const ALERT_DIALOG_PROPS = createContextId<Signal<any>>('alertDialogProps');
export const ALERT_DIALOG_SHOW = createContextId<Signal<boolean>>('alertDialogShow');
export const SHOW_FORGOT_PWD_MODAL = createContextId<Signal<boolean>>('showForgotPwdModal');
export const SHOW_RESET_PWD_MODAL = createContextId<Signal<boolean>>('showResetPwdModal');
export const SHOW_FORCE_RESET_PWD_MODAL = createContextId<Signal<boolean>>('showForceResetPwdModal');
export const SHOW_WALLET_POPUP = createContextId<Signal<boolean>>('showWalletPopup');
export const SHOW_HELP_POPUP = createContextId<Signal<boolean>>('showHelpPopup');


export const SHOW_SECOND_PIN_MODAL = createContextId<Signal<boolean>>('showSecondPinModal');
// export const MULTIPLE_AUTH_ACTION = createContextId<Signal<MultipleAuthAction>>('multipleAuthAction');
export const SECOND_PIN_MODAL_CTX = createContextId<Signal<SecondPinContext>>('secondPinModalCtx');

export const COMMON_VIEW_DATA=  createContextId<CommonViewData>("commonViewData");
export const DEPOSIT_CONTENT = createContextId<DepositData|NeedRegisterWallet>('depositContent');

export const TOASTLIST = createContextId<Toast[]>('toastList');
export const NOTIFICATION_CTX= createContextId<Store<NotificationCtx>>("notification_ctx");

export const SHOW_TRANS_WALLET_MODAL= createContextId<Signal<boolean>>("showtransferWalletModal");

export const TRANS_WALLET_CTX= createContextId<Signal<TransferWalletCtx|null|undefined>>("transferWalletCtx");
export const SHOW_GAMES_TRANS_MENU = createContextId<Signal<boolean>>("showGamesTransMenu");
export const SHOW_TRANS_MENU = createContextId<Signal<boolean>>("showTransMenu");
export const SHOW_USR_BAL_WALLET_MENU = createContextId<Signal<boolean>>("showUsrBalWalletMenu");

export const SHOW_LANG_MENU= createContextId<Signal<boolean>>("showLangMenu");
