import type { PropFunction } from "@builder.io/qwik";
import type { GameItem } from "~/hooks/business/useGameList";
 

 export type Collection<T> = {
    page?: number;
    results?: T[];
    total_pages?: number;
    total_results?: number;
  };
  
  export type HttpResponse<T = unknown> = {
    status : number , //200, 500, 404   
    data :  ApiData<T>, 
    cookies? : string|null, 
    metadata? :Record<string,unknown>,
}
export enum INTERACT_MSG_TYPE {
  INFO = "i",
  SUCCESS = "s",
  WARNING = "w",
  ERROR = "f",
}
export type ApiData<T = unknown> = {
    d : T | null, 
    action? : string|null ,
    redirectUrl? : string|null , 
    message? : string|null ,  
    type? :INTERACT_MSG_TYPE.SUCCESS | INTERACT_MSG_TYPE.ERROR| INTERACT_MSG_TYPE.WARNING | INTERACT_MSG_TYPE.INFO, // "w - warning, s - success, f- failed, i - info"
    title? : string|null , 
    code? : string,
    status : number;//500,426
}

export type Provider = {
  game_id: string,//to depreciate - this can't use because in DB categories also have this field
  provider_gid? : {v1 : string ; v2:string};
  category:string,
  game_name:string,
  game_brand:string,
  game_code:string,
  maintenance:number,
  self_maintenance:number,
  status:number,
  self_status:number,
  maintenance_disabled:number,
  seq:number,
  brand_slug:string,
  category_slug:string,
  display_name:string,
  img_src:string,
  group:string,
  banner_logo:string,
  is_launch:boolean,
  block :number;//1 | 0 
  isPromoDisabled :number;//1 | 0 
  isCO :number;//1 | 0 
  isTop: boolean; 
  image:string;
}

export type GameItem = {
  FilterTypes: string[],
  ID: string,
  ImgSrc?: string,
  img_src?: string,
  Name:string,
  SubID:string,
  brand_slug?: string,
  game_code?: string,


  /*TOCHECK*/
  maintenance:number,
   block :number;//1 | 0 
  isPromoDisabled :number;//1 | 0 
  isCO :number;//1 | 0 
}

export type LanguageOptions = {
  [langCode: string]: {
      name: string;
  };
};
// Define a utility type to change the type of a specific property
type ChangePropertyType<T, K extends keyof T, NewType> = {
  [P in keyof T]: P extends K ? NewType : T[P];
};

export type CommonViewData =  ChangePropertyType<CommonViewData__Api, 'games_data', Record<string,Provider[]>> & {themeNumber : number;} //this is processed at layout.tsx after fetch };

 
export type TransferWalletGameCodes = string[];
export type CommonViewData__Api = {  
    canURL : string, 
    seo : Record<string,unknown>,
    annoucement : string,
    website_settings : WebsiteSettings,
    babysite_sliding_banners : Record<string,unknown>[],
    babysite_cs_contacts : BabysiteCsContacts,
    categories: Record<string,unknown>[],
    games_data: Record<string,Record<string, Provider>>, //{'slots' : {'ttg' : {p : s ... }}}
    isNonSeoSite : boolean,
    agent_lang_opts : LanguageOptions,
    country_name : string,
    country_code: string,
    website_contents : Record<string,unknown>[],
    merchant_id : string,
    acc_length:number; // min fund acc no. length
    user_email? : string,
    user_name?:string,
    user_bal?:string,
    user_ref_wallet_bal?:string,
    isAuth:boolean,
    deposit_notice : string |null;
    member_level? :string,
    curr_lang?: string,
    register_pwd_regex?: string,
    device: "mobile"| "desktop",
    player_object_id  : string,
    agent_ob_id: string,
    alert_msg: ApiData<null>;
    tw_games: TransferWalletGameCodes; //transfer wallet games 
    app_sub_skin: string;
};

export type BabysiteCsContacts = {
  DisplayedColumns: string,
  DisplayedColumns2: string,
  email: string,
  phone: string,
  skype: string,
  line: string,
  wechat_url: string,
  wechat: string,
  whatsapp: string,
  whatsapp_2: string,
  whatsapp_3: string,
  fb_url: string,
  twitter_url: string,
  ig_url: string,
  google_url: string,
  YoutubeUrl: string,
  TelegramName: string,
  telegram_group_link: string,
  Telegram: string,
  Viber: string,
  Zalo: string,
}

export type ComplaintViewData = {
  register_banner: string
};
export type MaintenceContent = {
  content: string,
  is_custom_maint: number,
  timeDate: string,
  logo: string,
  chatUrl: string,
  email: string,
  websiteLogo: string,
  livechatCode: string,
  whatsapp: number
};
export type WebsiteSettings = {
    webTitle:string;
    websiteLogo_mobile:string;
    websiteLogo:string; 
    PageTitle:string;
    googleAnalytics:string;
    analytics:{ gtag : {key : string } , fbq : {key:string}} | undefined | null  ;
    chatUrl:string;
    amp_redirect_url:string;
    livechatCode:string;
    webUrl :string |null;
    websiteStatus :number; // 1 
    style_config_id2 : string |null;
    reason : string |null;
    chatLicence : string |null;
    webHostSeo : string |null;
    canonicalUrl:string;
    isHas2ndPin :string;
    isMobileBottomBar :string;
    custom_menu_title:string;
    isOnCustomMenu:string; // '1',
    is_allow_complaint_form:string; // '1' 
    is_email_subscription:string; // '0',
    websiteFavicon:string; 
    progressive_img: string; // 'test',
    progressive_img_mobile : string; // 'test_mo',
    initial_deposit_amount:number;
    withdraw_new_bank:number; //0
    deposit_new_bank:number; //0
    register_has_bank:number;  //0
    register_has_ewallet:number;  //0
    is_no_home_def_footer:number; //1

    apk_url : string|null;
    apk_qr_code: string;
    bankgroup_auto_mode:number; //0
    amp_url: string;//'',
    googleAnalyticsID: string;//'',
    ownerVeriCode: string; //'',
    pusher_app_id: string; // '',
    pusher_key:  string; //'',
    pusher_secret: string; //'',
    pusher_cluster: string ; //'',
    companyOn: 0,
    isOffReferralMenu: string ; // '0',
    currencyCode:string ; //'IDR',
    agent_id: string; //'CABAAAE',
    isNoHomeDefFooter: number ; //0,
    e_wallet: number |null ; //null
    pulsa: number |null ; //null
    crypto: number |null ; //null
    device: string;
    has_otp_refferal?: number; //0,1
    register_form_no_steps:boolean;
} 

export type ProfileData = {
  tabName: string;
  device: string;
  currency: string;
  pwd_regex: string;
  is_2nd_pin_on?: boolean;
  User?: Record<string, string>;
  isUseAF?: boolean;
  member_level?: Record<string, Record<string, null> | [Record<string, null>]>;
  myPromo?: Record<string, null>;
  promo_event_info?: Record<string, null>;
  myBonus?: Record<string, null> | MyBonusDataApi;
  ref_down?: Record<string, null>[];
  is_activated_referral?: boolean;
};

export type ActivateReferralData = {
  User?: Record<string, string>;
  referral_tnc?: string;
  is_activated_referral?: boolean;
  latest_activate_record?: ActivateReferralFormData;
  bank?: AgentBank[];
  countryList?: Record<string, Record<string, string>>;
  userBanks?: UserBank[];
  user_ewallet_add_status?: boolean;
  user_bank_add_status?: boolean;
  user_full_name?: string;
  show_referral_form?: boolean;
  fullname_regex?: string;
}
export type ActivateReferralFormData = {
  _id: string;
  agent_id: string;
  player_id: string;
  user_identification: string;
  method: number;
  user_bank_id: string;
  user_fund_name: string;
  acc_name: string;
  acc_no: string;
  status: number;
  use_by: string;
  created_at: string;
  updated_at: string;
  email: string;
  approved_by: string;
  approved_date: string;
  reject_reason: string;
}

export type InfoData = {
  title_arr: Record<string, null>[];
  data_arr: Record<string, null>[];
};


export type MyBonusDataApi = {
  data?: MyBonusData;
  message?: string;
  status?: boolean;
}
export type MyBonusData = {
  id: string;
  player_id: string;
  agent_id: string;
  transaction_id: string;
  bonus_id: Record<string, string>;
  bonus_freq_type: string;
  event_title: string;
  turnover_multiply_check: number;
  turnover_multiply: number;
  bonus_credit: number;
  turnover_target: number;
  winning_multiply_check: number;
  winning_multiply: number;
  winning_target: number;
  reached_winning: number;
  reached_amount: number;
  reached_turnover: number;
  reached_turnover_progress_percent: number;
  reached_winning_progress_percent: number;
  status: number;
  remark: string;
  creator: string;
  created_at: string;
  bonus_end_at: string | null;
  updated_at: string;
}

export type FundMethod =   5| 6|7|8|9 & number;

export type Gateway =  { gateway: string;//  'comitpay',
full_method: string;// 'bank',
status:number;// 1,
currency: string;// 'IDR',
maintenance: number;//0,
method: 'bank' | 'ewallet' |'crypto' ;// 'bank',
min_deposit:"";
max_deposit:"";
id: string ; //Gateway doesn;t have this data, This is just to make compatible
setting : AgentTrxBankSetting;//Gateway doesn;t have this data, This is just to make compatible
provider_name : string;//Gateway doesn;t have this data, This is just to make compatible
banklist:  { //gateway bank_codes 
   bank? : string[]; //['BNI','MDR' ]
   ewallet? : string[];
   crypto? : string[];
}  ;
}; 
export type PopupBanner = {
  image : string, url:string 
}
export type DepositData =  {
  in: number;// 0,
  online:  number;//0,
  gateways_lists:{
    bank :Gateway[];
    ewallet :Gateway[]; 
    crypto:  Gateway[];
  } ;// [],
  pg_logos:Record<string,string>;

  /*
   {
    BNI: 'bni_blue',
    BCA: 'bca',
    MDR: 'mandiri',
    DMN: 'danamon',
    BRI: 'bri_short',
    CIMBN: 'cimb_short',
    BSNB: 'bank_rakyat',
    CIMB: 'cimb_short',
    PBB: 'public_bank',
    HLB: 'hong_leong',
    MBB: 'maybank',
    BPMT: 'bank-permata',
    OCBCN: 'ocbc',
    GOPAY: 'gopay_block',
    OVO: 'ovo',
    DANA: 'dana',
    SAKUKU: 'sakuku',
    LINKAJA: 'link-aja',
    SHOPEEPAY: 'shopepay',
    DOKUWALLET: 'dokuwallet',
    DUITNOW: 'DuitNow',
    TNG: 'TNG-EWALLET',
    BOOST: 'Boost',
    MAE: 'MAE-by-Maybank2u',
    GRAB: 'Grab-Pay',
    ETH: 'eth_coin2pay',
    BTC: 'btc_coin2pay',
    BIDR: 'bidr',
    BUSD: 'busd_coin2pay',
    USDT: 'usdt_coin2pay',
    BNB: 'bnb_coin2pay'
  },*/
  has_pulsa:  boolean;//false,
  has_crypto:boolean;// false,
  has_ewallet:boolean;// false,
  pulsa_fundmethod_list: AgentTrxBank[];
  ewallet_fundmethod_list: AgentTrxBank[];
  crypto_fundmethod_list: AgentTrxBank[];
  site_bank_list: AgentTrxBank[]; 
  newFundMethodList?: AgentTrxNewFund[],
  isMultipleMethods:number;// 2,
  deposit_notice: string|null;// null,
  method_int: Record<string,FundMethod>;//{ bank: 5, ewallet: 7, crypto: 8 }
  popup_banner?: PopupBanner;
}   ;
export type NeedRegisterWallet = {
  is_show_register_bank: boolean; //true
   redirectUrl: string;// '/register-acc' 
};

export type AgentTrxNewFund = {
  id: ObjectId;//,
      provider_name:string;// 'Telkomsel',
      provider_name_slug: string;//'telkomsel',
      bank_code: string|null;//null,
      url: string|null;//'telkomsel.com',
      status:number ; // 1,
      method:FundMethod ; // 6,
      img_src:string;// 'telkomsel_new',
      created_at: string;//'2023-03-09 10:51:43',
      updated_at: string;//'2023-03-09 10:51:43',
      created_by: string;//'stgonix@agent',
      updated_by: string;//'stgonix@agent',
      setting: {
        id:ObjectId;// [Object],
        acc_name: string;//'',
        bank_group_type:number ;// 0,
        acc_no:string;// '0856236955',
        o_acc_name: string;//'_enco_',
        status:number ;// 1,
        percentage: number ;//0,
        percent_check: number ;//0,
        admin_fee:string;// 'IDR 0.00',
        s_percent_check: number ;//0,
        subsidi:string;// 'IDR 0',
        min_deposit: string;//'1000',
        max_deposit: string;//'10000000',
        barcode: boolean; //false,
        account_image:string|null;// null,
        is_show_acc_no:boolean; // true,
        is_mask_acc_no: boolean; //false,
        is_show_acc_name:boolean; // false,
        is_mask_acc_name: boolean; //false,
        s_percentage: number ;//0,
        bank: string|null;//null
      },
      trx_type_name:string;// 'Deposit',
      logo_image: string;//'telkomsel_new',
      qr_img_folder:string;// 'e-wallet',
      sequence: number ; //1
      
      //this is from api 
      min_length: number ;  
      max_length :number ;

      //Below is just to make compatible with AgentTrxBank | AgentBank
      bank_name?: string;//'BCA',
      bank_name_slug?:string;// 'bca',
      bank_image?: string;//'bank_bca',

      //below is just to make compatible with Gateway
      gateway?:string;
}
export type AgentTrxBank = {
  bank_name: string;//'BCA',
  bank_name_slug:string;// 'bca',
  url: string;//'asd.v',
  status: number ; //1,
  bank_image: string;//'bank_bca',
  bank_code: string;//'BCA',
  id:string;// '64083ea7ee39883b9502dd54',
  setting: AgentTrxBankSetting,
  trx_type_name:string;// 'Deposit',
  provider_name:string;// 'BCA',
  logo_image: string;//'bank_bca',
  sequence:number ; //1
    //below is just to make compatible with Gateway
    gateway:string;
};
export type AgentTrxBankSetting = {
  id:string;// '64083eb9250b402d600a5d04',
  bank_transaction_type: number ; //1,
  acc_name: string;//'batests',
  bank_group_type:number ; // 1,
  acc_no: string;//'13231232323',
  status: number ; //1,
  percentage:number ; // 0,
  percent_check: number ; //0,
  admin_fee:string;// 'IDR 0.00',
  s_percent_check:number ; // 0,
  subsidi: string;//'IDR 0',
  min_deposit: string;//'1000',
  max_deposit:string;// '100000000',
  is_show_acc_no: number ; //1,
  is_mask_acc_no: number ; //0,
  is_show_acc_name: number ; //1,
  is_mask_acc_name:number ; // 0,
  s_percentage: number ; //0,
  account_image: '',
  autom: number ; //0
};
 
export type DepoFormData = {

  supported : boolean;
  bank_setting: { //getDate  - formsettings 
    min : number;
    max:number;
  },
 
  promotion_array: TrxPromo[],
  user_promo_exists : boolean;
  user_allow_promo : boolean;
  userBanks:  UserBank[]; // if Manual Bank/Ewallet/Pulsa/Crypto will have this data
  is_allow_add_fundacc: boolean;
  is_ref_no_required: boolean;
  user_ewallet_add_status: boolean;
  user_bank_add_status: boolean;
  
  deposit_token : string;

  choose_bank : null | 1 | 0 , //choose_bank -gateway_choose_bank
  bank : GatewayBank[], // bank - gateway_banks
}

export type GatewayBank = {
  id: number ;//1,
  bank_name: string;// "BANK MANDIRI",
  bank_code:string;// "MDR",
  standard_code: string;//"MDR",
  currency: string;//"IDR",
  min_amount: number ;//50000,
  max_amount:number ;// 100000,
  trans_type:string;// "5"
  user_hp: number;


  //For coin2pay (or crypto gateway)
  Network?: string;
  Token? : string;
  Price_Deposit?: string;
  Estimate_Given_Credit?: string;
}

export type TrxPromo = {
  deposit_method : string;
  descriptionandtermAndCondition : string;
  given_after_turnover : number;
  max : string;
  min : string;
  promo_code : string;
  title : string;
  promo_type: string; 
}
export type ApplyPromoDetails = {
//fields return at post applyPromo ( /promo_details api) 
  event_title: string;// "HKB",
  turnover_multiply_check:number;// 1,
   turnovers: number;//10,
   winning_multiply_check:number;// 0,
   winning_multiply:number;// 0,
  promo_type: string;// "EveryTime",
  promo_code:  string;//"HKB",
  percentage:  string;//"100",
  sequence:number;// 2,
  min_deposit:  string;//"100000",
   max_deposit: string;// "1000000",
   release_type:number;// 0,
   given_after_turnover: string;//"0",
  date_start:  string;//"2023-08-11",
   date_until:string|null;// null,
   date_start_utc: any;// { "$date: {"$numberLong: "1691683200000"}}
  date_until_utc: any;// null,
  display: string;//"1",
  apply: string;//"1",
  member_level:string;// "0",
   deposit_method: string;//"0,comitpay,ypay,pay24u,coin2pay,rubicpay,bayargw",
  count_limit: string;//"0",
  descriptionandtermAndCondition:string|null;// null,
  lose_amount:number;// 0,
   upline_ref: null,
   apply_type: number;//0,
  auto_cancel_promo: number;//0,
  no_of_days: number;//0
}
 
export type UserBank = {
  acc_name: string ;//"sadfasdf"
acc_no: string ;//"XXX - XXX - 3111" 
id: string ;//"6408dba2444600002a002194"
method: number; //5
method_name: string ;//"Bank"
provider_name: string ;//"BCA";
status :  number; //1
_id: ObjectId;
};
export type RegisterWalletData = {
 
  agent_banks : AgentBank[];
  fullName: string;// '';
  new_fund_banks_list: Record<string, AgentTrxNewFund>;// [], //TODO
  has_ewallet: boolean; //true
  is_user_allow_e_wallet: boolean;
  is_user_allow_bank: boolean;
}

export type ObjectId = { 
  '$oid' : string ;
}
export type AgentBank = { 
  id: ObjectId;//{ '$oid': '64083ea7ee39883b9502dd54' },
  bank_name: string;// 'BCA',
  bank_name_slug: string;// 'bca',
  bank_code: string;// 'BCA',
  url: string;// 'asd.v',
  status: number;// 1,
  bank_image: string;// 'bank_bca',
  created_at:  string;//'2023-03-08 15:52:07',
  updated_at: string;// '2023-03-08 15:52:07',
  created_by:  string;//'stgonix@agent',
  updated_by:  string;//'stgonix@agent' 
  min_length: number ;  
  max_length :number ;
}
export type MemberLevelData = {
  player?: Record<string, null>;
  next_lvl?: Record<string, null>;
  level_settings?: Record<string, null>[];
};
export type BonusEventData = {
  bonus_id?: string;
  event_title?: string;
  bonus_type?: string;
  turnover_multiply_check?: boolean;
  turnovers?: string;
  winning_multiply_check?: boolean;
  winning_multiply?: string;
  max_bonus_credit?: number;
};
export type BonusHistoryData = {
  event_title?: string;
  bonus_code?: string;
  bonus_credit?: string;
  turnover_multiply?: string;
  reached_turnover?: string;
  turnover_target?: string;
  winning_multiply?: string;
  reached_winning?: string;
  winning_target?: string;
  created_at?: string;
  bonus_end_at?: string;
  status?: Record<string, null>;
}

export type HomeData = {
  hotGames: ProviderGameItem[],
  casinoGames: ProviderGameItem[],
  popup_banner?: PopupBanner,
  popup_banner_status: number,
  homeInfoList: Record<string, unknown>[],
  recommended_games: Record<string, unknown>[],
  new_games: ProviderGameItem[],
  promos: Promo[],
  last_deposits :LatestSiteTrx[],
  last_withdrawals :LatestSiteTrx[],
  top_players?: LatestSiteTrx[],
  hkb_lottery_results?: HKBLotteryResult[],
}
export type HKBLotteryResult = {
  game_name: string;
  number1: string;
  date: string;
}

export type LatestSiteTrx = {
  user_fund_accname :  string;
  created_at :  string;
  amount : number;
}

export type ProviderGameItem = { 
  game_code:string;
  provider_gid : {v1 : string ; v2:string};
  game_name:string;
  has_demo: 1| 0;
  slug:string;
  category_slug:string;
  brand_slug:string; 
  id:string;
  img_v :string; 
  img_src:string;
  game_types : {name : string, rank:number}[],
  bets : { min : number, max : number} | undefined | null,
  rtp : {given : number}| undefined | null,
  img_base_size : {w: number, h : number},
}
export type SubGameData = {
  this_category: string,
  this_game_code: string,
  brand: string,
  data: {Title : string,Slots : { Name:string, ID  :string, ImgSrc:string, SubID:string,FilterTypes:string[]}[] },
  launch_url: string,
}

export type ReferralData = {
  is_use_affiliate: boolean,
  MaxLvl: number,
  details: string,
  ref_code: string,
  Type: string,
  commisions: Record<string, unknown>[],
  is_off_table: string,
}
export type Promo = {
  id: string;
  rowId: string,
  name: string,
  image: string, //"https://files.sitestatic.net/promotion_banners/20231219140202000000f912738c31CABAAAE__1128x252.jpg"
  description: string,
  category?: string, //"Special"
  no_limit: boolean,
  isHomePromo: number , //0,
  datefrom : string, // "2023-04-06", 
  dateto : string,// "2023-03-09",
  filterTypes: string,// "All,Special"
}
export type PromoCategory = {title : string , value : string} ;

export type Memo = {
  id: string;
  recipient_id: number,
  recipient_type: string,
  recipient_name: string,
  sender_id: string,
  sender_name: string,
  sender_type: number
  topic: string,
  subject: string,
  content: string,
  sender_status: boolean,
  recipient_status: boolean,
  created_at : string,
  recp_status : boolean,
}
export type MemoData = {
  inbox: Memo[],
  inpox_msg_count: number
  sys_topics: Record<string, unknown>[],
  sys_msg_count: number,

}

export type PromotionData = {
  promo_categories: Record<string, unknown>[],
  banners: Promo[],
  current_data: string,
}

export type WithdrawData = {
  acc_no_length: number,
  is_allow_add_fundacc: boolean,
  is_max_bank_accs: boolean,
  is_user_promotion: boolean,
  user_full_name: string,
  min_wd: number,
  max_wd: number,
  user_banks: UserBank[],
  banks: [],
  fund_methods: [],
  user_ewallet_add_status: boolean,
  user_bank_add_status:boolean,
  has_ewallet: boolean,
  has_pulsa: boolean,
  ext_withdraw: string,
  appskin: string,
  withdraw_token: string,
}

// acc_no_length: 8,
// is_allow_add_fundacc: false,
// is_max_bank_accs: true,
// is_user_promotion: false,
// user_full_name: 'sadfasdf',
// min_wd: 0,
// max_wd: 0,
// user_banks: [
//   {
//     _id: [Object],
//     provider_name: 'BCA',
//     acc_name: 'sadfasdf',
//     acc_no: 'XXX - XXX - 3111',
//     method: 5,
//     status: 1,
//     created_at: [Object],
//     method_name: 'Bank',
//     acc_no_fmt: '12312312312332223111',
//     id: '6408dba2444600002a002194'
//   },
//   {
//     _id: [Object],
//     provider_name: 'BCA',
//     acc_name: 'sadfasdf',
//     acc_no: 'XXX - XXX - 4342',
//     method: 5,
//     status: 1,
//     created_at: [Object],
//     method_name: 'Bank',
//     acc_no_fmt: '23434532423423424342',
//     id: '6408dcc7444600002a002195'
//   },
//   {
//     _id: [Object],
//     provider_name: 'BCA',
//     acc_name: 'sadfasdf',
//     acc_no: 'XXX - XXX - 2312',
//     method: 5,
//     status: 1,
//     created_at: [Object],
//     method_name: 'Bank',
//     acc_no_fmt: '1231312312',
//     id: '6408e043444600002a002196'
//   },
//   {
//     _id: [Object],
//     provider_name: 'BCA',
//     acc_name: 'sadfasdf',
//     acc_no: 'XXX - XXX - 3424',
//     method: 5,
//     status: 1,
//     created_at: [Object],
//     method_name: 'Bank',
//     acc_no_fmt: '34534534535434523424',
//     id: '6408e0ae444600002a002197'
//   },
//   {
//     _id: [Object],
//     provider_name: 'BCA',
//     acc_name: 'sadfasdf',
//     acc_no: 'XXX - XXX - 3434',
//     method: 5,
//     status: 1,
//     created_at: [Object],
//     method_name: 'Bank',
//     acc_no_fmt: '23423423423423423434',
//     id: '6408e0e0444600002a002198'
//   }
// ],
// banks: [],
// fund_methods: [],
// ewallet_acc_add_status: false,
// has_ewallet: true,
// has_pulsa: true,
// ext_withdraw: null,
// appskin: 'ugsports',
// withdraw_token: 'CABAAAE0006-20230502220036-64518804342f17.54243839'


export type ValidateResult = boolean|string;

export type TransactionStatement = {
  transactions: TransactionStatementItem[],
  total_debit: number,
  total_credit: number
}
export type TransactionStatementItem = {
  trans_id: string,
  transaction_id: null,
  transaction_type: number,
  transaction_type_name: string,
  note: string,
  status_type: string,
  status_color: string,
  status_name: string,
  promotion_id: string,
  cashback_id: string,
  cash_rebate_id: string,
  fund_method_details: string,
  agent_fund_name: string,
  user_fund_name: string,
  credit: number | string,
  debit: number | string,
  amount: number,
  gross_amount: number,
  status: number,
  admin_remark: string | null,
  rejected_reason: string | null,
  agent_note: string,
  updated_at: string,
  created_at: string,
  confirm_date: string,
  payment_gateway: string,
  actions: string
}
 

export type GameStatement = {
  transactions: GameStatementItem[],
  total_win_lose: number,
  total_win_lose_with_out_outstanding: number,
  total_outstanding :number ,
  total_turnover : number,//
}
export type GameStatementItem = {
  date: string, // "2023-08-11T00:00:00Z",
  date_end: string, //  "2023-08-12T00:00:00Z",
  game_type:string, //   "hkb poker",
  outstanding: number,// 0,
  winlose: number,// 4800,
  turnover:  number,//6000,
  category_id:  number,//23,
  currency:string, //  "IDR",
  date_range: string, // "20230810200000 - 20230810235959",
  strtime_date: number,// 1691712000,
  strtime_date_end: number,// 1691798400,
  acc_winlose: number,// 4800,
  acc_outstanding:  number,//0,
  acc_total_turnover:  number,//6000
 
}


export type GetPlayerReportParams = {
  filter_date_start : number ,
  filter_date_end : number,
  currency : string,
  category :number,
  provider : string,//get from selection
  outstanding_view :string,
  provider_option:string,
  win_lose_status:string|number,
  search_option:string,
  ticket_value:string,
};


export type PlayerReportFilterOpts = {
  filter_date_start: string ; // "2023-08-11 00:00:00",
 filter_date_end: string ; //  "2023-08-12 00:00:00",
  date_start:  string ; // "2023-08-11 00:00:00",
  date_end:  string ; // "2023-08-12 00:00:00",
  player_agent_id: string ; //  "CABAAAE0008",
  category: string ; //  "23",
  games: string[]; //   [
 //     "HKBPoker"
 // ],
  provider:string ; //  "0",
  turnover: boolean; // false,
  currency: string ; // "IDR",
  connection: string|null ; // null
 outstanding_view: string ; // "undefined"
};


export type  PlayerReportItem ={
 id: number;// 9537616,
 player_id: string;//"CABAAAE0008",
 agent_id: string;//"CABAAAE",
 ip_address: string;//"147.139.180.217",
 game_id: string;//"TXH-100",
 status:  number;// 2,
 game_name: string;//"Texas Poker",
 type: string;//"BET",
 category_id:  number;//23,
 game: string;//"HKBPoker",
 g_id:  number;//95,
 currency: string;//"IDR",
 is_promo: number;// 0,
 stake:  number;//4000,
 win_lose:  number;//3200,
 turnover:  number;//4000,
 draw_turnover:  number;//0,
 prog_jackpot:  number; //0,
 prog_jackpot_cm:  number;//0,
 prog_jackpot_sm:  number;//0,
 prog_jackpot_ma: number;// 0,
 prog_jackpot_a:  number;//0,
 gross_commission: number;// 40,
 gross_comm_sm: number;// 0,
 gross_comm_ma: number;// 0,
 gross_comm_a:  number;//0,
 gross_comm_player: number;// 0,
 comm_c: number;// 0,
 comm_sm: number;// 0,
 comm_ma: number;// 0,
 comm_a: number;// 0,
 comm_m:  number;//0,
 pt_comm_c: number;// 38.8,
 pt_comm_sm: number;// 1.2,
 pt_comm_ma:  number;//-32,
 pt_comm_a: number;// 32,
 perc_comm_sm: string;//"0.000",
 perc_comm_ma: string;//"0.000",
 perc_comm_a: string;//"0.000",
 perc_comm_m: string;//"0.000",
 pt_c:  number;//-3104,
 pt_sm: number;// -96,
 pt_ma:  number;//2560,
 pt_a:  number;//-2560,
 perc_pt_cm:  number;//97,
 perc_pt_sm: number;// 3,
 perc_pt_ma:  number;//-80,
 perc_pt_a: number;// 80,
 company_total: number;// -3008,
 requested_at: string;//"2023-08-11 12:32:29",
 created_at: string;//"2023-08-11 00:32:29",
 updated_at: string;//"2023-08-14 17:41:06"
}

export type PlayerReportGameCategoryOpts =  Record<string,string>  //   {
//     "1": "SLOT",
//     "2": "LIVE CASINO",
//     "3": "RNG",
//     "4": "P2P (1GPOKER)",
//     "5": "COCKFIGHT",
//     "6": "SPORT",
//     "7": "FISHING",
//     "8": "LIVE CASINO (SBO)",
//     "9": "LOTTERY (TOGEL)",
//     "10": "P2P (IDN)",
//     "11": "SLOT (PLAYTECH)",
//     "12": "LIVE CASINO (PLAYTECH)",
//     "13": "PROGRESSIVE JACKPOT",
//     "14": "LOTTERY (NUMBER)",
//     "15": "P2P (P2PLAY)",
//     "19": "LIVE CASINO (IDN)",
//     "20": "Lottery (SPECIAL 4D)",
//     "23": "HKB POKER",
//     "24": "HKB LOTTERY",
//     "25": "HKB LIVE",
//     "26": "LOTTERY 2 (Togel)"
//   }
export type  PlayerReport  ={
 player_report_data : PlayerReportItem[],
 games :  PlayerReportGameCategoryOpts, 
 decimal : number,//
 total_wager: number,//3,
 total_to:number,// 6000,
 total_stake: number,//-6000,
 total_bonus:number,// 0,
 total_bonus_win:number,// 0,
 total_win: number,//10800,
 total_jp:number,// 0,
 total_jp_win:number,// 0,
 total_comm_m: number,//0,
 provider : string | null,
}


export type LaunchLobbyGameParams = {category_slug : string, brand_slug :string, slug : string}; 


export type MultipleAuthAction = "setup"|"validate";


export type SecondPinContext ={action: MultipleAuthAction, forLogin: boolean};

export type Toast ={
  id: number;
  title: string;
  content: string;
  type: INTERACT_MSG_TYPE;
  duration: number;
  timeoutId : any;
};

export type NotificationCtx ={
  inboxCnt:number;

}
export type TransferWalletCtx ={
  gameCode:string;
  launchGame$? : PropFunction<(...args:any  ) => any |ApiData<any>>,


}
export type TransferToGameResult ={
  amount  : string;
}
export type FormId ={
  token  : string;
}


export type RegisterFormSettings = {
  banks: AgentBank[],
  fund_methods: AgentTrxNewFund[],
  is_register_need_acc: false,
  is_register_need_e_wallet: false,
  is_register_need_bank: false,
  referral_code: "",
  acc_no_length: 8,
  promoTitles: Promo[], 
//   {
//     rowId: 3463772608,
//     name: "Promo-2",
//     name_lang_2: "testerr",
//     promo_code: "8888",
//     image: "https://files.sitestatic.net/promotion_banners/20231219140202000000f912738c31CABAAAE__1128x252.jpg",
//     multipleImgName: "",
//     description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing.",
//     description_lang_2: null,
//     sequence: 1,
//     expiredTime: 1,
//     language: "en",
//     datefrom: "2023-03-09",
//     dateto: "2023-04-06", 
//     type: "2",
//     status: "2",
//     url: "https://stgonix.web-sample.live/promotion",
//     isHomePromo: 0,
//     homeDescription: null,
//     jackpot_text: null,
//     jackpot_amount: 0,
//     homoPromoImgSrc: "",
//     category: "Special",
//     created_by: "cabaaae@felix",
//     created_at: "2023-03-07 21:00:42",
//     updated_at: "2023-12-19 14:02:02",
//     img_type: "0",
//     no_limit: true,
//     filterTypes: "All,Special"
// }
  pwd_regex: string, // "/^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+])[A-Za-z\\d!@#$%^&*()_+]{8,20}$/",
  accname_regex: string, // "/^\\s{0,1}[a-zA-Z-.\\/,']+(?:\\s[a-zA-Z]+)*\\s{0,1}$/",
  register_token:string, // "CABAAAE-20240104035328-65962bb81089e2.28755099",
  is_show_email: boolean,// true
  pwd_requirement : {message: string, example:string},
  username_requirement: {message: string, example:string},
}


export type LastDirectTransferResult= {

  transactions : LastDirectTransferTrx[],

  total_credit : number,
  total_debit : number,
}

export type LastDirectTransferTrx= {

   
}


export type CustomMenuContent = {content:string};


export type HeadElements = {
 links : { rel : string, href : string}[],
 meta :  {name : string, content: string}[],
 scripts : { props : { type? : string , async? : boolean , nonce? : string } , src? : string , innerText? : string}[]
 styles : { props : {type? : string, nonce? : string }, innerText? : string }[] 
}
 export type LoginForm  = {
  submitResult: ApiData<null> | null,
  isWaiting: boolean,
}
export type WelcomeContent = {
  content?: string,
  user_name?: string,
  home_button?: string,
  success_content?: string,
}
