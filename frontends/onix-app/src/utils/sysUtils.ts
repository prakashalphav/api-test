import type { ApiData, CommonViewData, GameItem, ProviderGameItem, Provider, BabysiteCsContacts, TransferWalletGameCodes } from "~/services/types";
 
import { isString } from "./common";
export const makeContactLinks =  (  babysite_cs_contacts: BabysiteCsContacts|undefined|null, displayField? :  'DisplayedColumns'| 'DisplayedColumns2',webTitle?:string) => {
    let contactLinks = null;

    if(babysite_cs_contacts){

      const checkDisplayColumn = (field: string, displayField='DisplayedColumns') => {
        const displayedColumns = babysite_cs_contacts[displayField];
        const columnIndex = displayedColumns?.indexOf(field);
        return columnIndex !== -1 && babysite_cs_contacts[field] !== null;
      };

      contactLinks =   {
             email:{ url:  babysite_cs_contacts.email ? 'https://mail.google.com/mail/?view=cm&fs=1&to='+babysite_cs_contacts.email : null,
                          icon:'icon-envelope',
                          value: babysite_cs_contacts.email ?? null,
                          displayColumn: checkDisplayColumn('email'),
                          displayColumn2: checkDisplayColumn('email','DisplayedColumns2'),
                        },
             phone:{ url:  babysite_cs_contacts.phone ?  'tel:' +babysite_cs_contacts.phone : null,
                         icon:'icon-phone',
                          value:babysite_cs_contacts.phone,
                          displayColumn: checkDisplayColumn('phone'),
                          displayColumn2: checkDisplayColumn('phone','DisplayedColumns2'),
                        },
             skype:{ url: babysite_cs_contacts.skype ? 'skype:'+babysite_cs_contacts.skype +'?chat' : null,
                          icon:'icon-skype',
                          value:babysite_cs_contacts.skype,
                          displayColumn: checkDisplayColumn('skype'),
                          displayColumn2: checkDisplayColumn('skype','DisplayedColumns2'),
                        },
             line:{ url: babysite_cs_contacts.line ?  'https://line.me/ti/p/~'+babysite_cs_contacts.line : null,
                        icon:'icon-line',
                        value:babysite_cs_contacts.line,
                        displayColumn: checkDisplayColumn('line'),
                        displayColumn2: checkDisplayColumn('line','DisplayedColumns2'),
                        },
            wechat:{url: babysite_cs_contacts.wechat ?  (babysite_cs_contacts.wechat_url  != "" ? babysite_cs_contacts.wechat_url : 'javascript:void(0)') : null,
                        icon:'icon-wechat',
                        value:babysite_cs_contacts.wechat,
                        displayColumn: checkDisplayColumn('wechat'),
                        displayColumn2: checkDisplayColumn('wechat','DisplayedColumns2'),
                        },
            whatsapp:{url: babysite_cs_contacts.whatsapp ?  'https://api.whatsapp.com/send?phone='+babysite_cs_contacts.whatsapp : null,
                         icon:'icon-whatsapp',
                         value:babysite_cs_contacts.whatsapp,
                         displayColumn: checkDisplayColumn('whatsapp'),
                         displayColumn2: checkDisplayColumn('whatsapp','DisplayedColumns2'),
                        },
             whatsapp_2:{url: babysite_cs_contacts.whatsapp_2 ?  'https://api.whatsapp.com/send?phone='+babysite_cs_contacts.whatsapp_2 : null,
                            icon:'icon-whatsapp',
                            value:babysite_cs_contacts.whatsapp_2,
                            displayColumn: checkDisplayColumn('whatsapp_2'),
                            displayColumn2: checkDisplayColumn('whatsapp_2','DisplayedColumns2'),
                           },
            whatsapp_3:{url: babysite_cs_contacts.whatsapp_3 ?  'https://api.whatsapp.com/send?phone='+babysite_cs_contacts.whatsapp_3 : null,
                            icon:'icon-whatsapp',
                            value:babysite_cs_contacts.whatsapp_3,
                            displayColumn: checkDisplayColumn('whatsapp_3'),
                            displayColumn2: checkDisplayColumn('whatsapp_3','DisplayedColumns2'),
                           },
             fb_url:{url: babysite_cs_contacts.fb_url ?  'https://'+babysite_cs_contacts.fb_url : null,
                           icon:'icon-facebook',
                           value:'Facebook',
                           displayColumn: checkDisplayColumn('fb_url'),
                           displayColumn2: checkDisplayColumn('fb_url','DisplayedColumns2'),
                          }     ,             
            twitter_url:{url: babysite_cs_contacts.twitter_url ? 'https://'+babysite_cs_contacts.twitter_url : null,
                           icon:'icon-twitter',
                           value:'Twitter',
                           displayColumn: checkDisplayColumn('twitter_url'),
                           displayColumn2: checkDisplayColumn('twitter_url','DisplayedColumns2'),
                          }    ,              
             ig_url:{url: babysite_cs_contacts.ig_url ?  'https://'+babysite_cs_contacts.ig_url : null,
                           icon:'icon-instagram',
                           value:'Instagram',
                           displayColumn: checkDisplayColumn('ig_url'),
                           displayColumn2: checkDisplayColumn('ig_url','DisplayedColumns2'),
                          }       ,           
             google_url:{url: babysite_cs_contacts.google_url ? 'https://'+babysite_cs_contacts.google_url : null,
                           icon:'icon-chrome',
                           value:'Google',
                           displayColumn: checkDisplayColumn('google_url'),
                           displayColumn2: checkDisplayColumn('google_url','DisplayedColumns2'),
                          }   ,               
            YoutubeUrl:{url: babysite_cs_contacts.YoutubeUrl ? 'https://'+babysite_cs_contacts.YoutubeUrl : null,
                           icon:'icon-youtube-play',
                           value:'Youtube',
                           displayColumn: checkDisplayColumn('YoutubeUrl'),
                           displayColumn2: checkDisplayColumn('YoutubeUrl','DisplayedColumns2'),
                          }   ,               
             TelegramName:{url: babysite_cs_contacts.TelegramName ? 'https://t.me/'+babysite_cs_contacts.TelegramName : null,
                         icon:'icon-telegram',
                         value:babysite_cs_contacts.TelegramName,
                         displayColumn: checkDisplayColumn('TelegramName'),
                         displayColumn2: checkDisplayColumn('TelegramName','DisplayedColumns2'),
                        },
            telegram_group_link:{url: babysite_cs_contacts.telegram_group_link ? 'https://t.me/'+babysite_cs_contacts.telegram_group_link : null,
                      icon:'icon-telegram',
                      value:webTitle,
                      displayColumn: checkDisplayColumn('telegram_group_link'),
                      displayColumn2: checkDisplayColumn('telegram_group_link','DisplayedColumns2'),
                     },                     
            };


    }


    return contactLinks
};

export const extendProtocol = (val: string   ) => {
  return !(val||"").includes('http') ?'https://' + val : val;
}

export const extendMemoAttachmentUrl = (val: string   ) => {
  return 'https://files.sitestatic.net/mail_attachments/' + val;
}

export const isGameAllowed = (item : Provider|GameItem)=>{
  return !(item.maintenance == 1 || item.isPromoDisabled == 1 || item.block == 1 || item.isCO == 1) ;
}
export const isGameTransferWallet = (item : Provider|GameItem|ProviderGameItem , transferWalletGames : TransferWalletGameCodes)=>{

  let gameCode = item.game_code;

  if((item as ProviderGameItem).game_code !== undefined ){ 
      gameCode = (item as ProviderGameItem).game_code; 
  }

  // Object.values(transferWalletGames).some((gameCodes)=>{
  //  if( gameCodes.indexOf(gameCode)!=-1){
  //   return true;
  //  }
  //  return false;
  // })

  return transferWalletGames?.indexOf(gameCode)!=-1;
 
}


export const makeAlertMsgCommonData = ( commonData : ApiData<CommonViewData>, path:string)=>{
 return  path +`?action=alert` ;

//  +`?action=alert&title=${commonData.d?.alert_msg.title}&message=${commonData.d?.alert_msg.message}&type=${commonData.d?.alert_msg.type}`
}


export const  isLightTheme =(themeNumber?: string|null|number)=>{

  if(themeNumber == null){
    return false;
  }
  const _themeNumber = isString(themeNumber)? parseInt(themeNumber):themeNumber;
  return  _themeNumber==3 ||  _themeNumber==4||  _themeNumber==8||_themeNumber==15
}



export function sortBySeq<T>(obj : Record<string, Record<string,T>>) {
  const sorted: Record<string,T[]> = {};

  // Iterate through the outer object
  for (const  [key, innerObject] of Object.entries(obj)) {
 
    // Iterate through the inner objects
    sorted[key]=  Object.values(innerObject).sort(function(a,b){

      return a.seq - b.seq;
    })
    
  }

  return sorted;

}


export function checkIsHkbGame( gameCode  :  string){
if (gameCode.toLowerCase().startsWith( "hkb_")) {
    return true
  }  
  return false 
}