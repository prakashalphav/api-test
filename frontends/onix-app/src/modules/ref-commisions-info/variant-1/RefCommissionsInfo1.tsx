import { component$ ,useStylesScoped$ } from '@builder.io/qwik'; 
import styles from './RefCommisionsInfo1.scss?inline';
import { PeopleIcon } from '../../../components/icons/PeopleHex';
import { CloseIcon } from '../../../components/icons/Close';
import {
    inlineTranslate,  
  } from 'qwik-speak';
type Props = {
    isOffTable?: number;
    maxLvl?: number;
    type?: string;
    details?: string;
    commisions?: Record<string, unknown>[];
    isAuth?: boolean;
};

export default component$((props: Props) => {
    useStylesScoped$(styles);
    
    const t = inlineTranslate();

    return <>
        <div class="sm:mb-5 p-4 sm:px-1 sm:py-0 lg:px-4">
            {props.isOffTable != 1 && props.commisions && (
                <>
                <div class="mb-5 overflow-x-auto">
                    <table class="referal-table table-auto mb-3 sm:mb-5 text-xs sm:text-sm lg:w-full">
                        <thead>
                            <tr>
                                <th></th>
                                <th class="refColumn text-center align-middle  min-w-[85px] font-semibold pt-[7px] sm:pt-0 px-[10px]">
                                    <div class="text-3xl inline-block sm:text-5xl mb-1 sm:mb-2">
                                    <PeopleIcon></PeopleIcon>
                                    </div>
                                    <div> {t('referral.Referrals l@@Referrals l')} </div>
                                </th>
                                {props.maxLvl && props.maxLvl > 1 && (
                                    <>
                                    <th class="text-center align-middle refColumn-secondary min-w-[85px] font-semibold pt-[7px] sm:pt-0 px-[10px]">
                                        <div class="text-3xl inline-block sm:text-5xl mb-1 sm:mb-2">
                                        <PeopleIcon></PeopleIcon>
                                        </div>
                                        <div>{t('referral.Referrals ll@@Referrals ll')}</div>
                                    </th>
                                    <th class="text-center align-middle refColumn-tertiery min-w-[85px] font-semibold pt-[7px] sm:pt-0 px-[10px]">
                                        <div class="text-3xl inline-block sm:text-5xl mb-1 sm:mb-2">
                                        <PeopleIcon></PeopleIcon>
                                        </div>
                                        <div>{t('referral.Referrals lll@@Referrals lll')}</div>
                                    </th>
                                    </>
                                )}
                                <th class="text-left align-middle sm:text-sm text-xxs w-[40%] min-w-[150px] font-semibold pt-[7px] sm:pt-0 px-[10px]">{t('referral.Number of Active Label@@Number of Active Member Monthly Based on Games Turnover@@Number of Active Member Monthly Based on Games Turnover')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.values(props.commisions).map((item) => (
                                <tr class="h-[45px] border-b table-row">
                                    <td class="align-middle py-[7px] px-[10px] sm:py-[20px] text-left font-semibold pl-0">{`` + (item.Title)}</td>
                                    <td class="refColumn text-center align-middle py-[7px] px-[10px] sm:py-[20px]  min-w-[85px] font-semibold">{`` + (item.ReffLvl1 || "")}</td>
                                    {props.maxLvl && props.maxLvl > 1 && (
                                        <>
                                            <td class="text-center align-middle py-[7px] px-[10px] sm:py-[20px] refColumn-secondary min-w-[85px] font-semibold">{`` + (item.ReffLvl2 || "")}</td>
                                            <td class="text-center align-middle py-[7px] px-[10px] sm:py-[20px] refColumn-tertiery min-w-[85px] font-semibold">{`` + (item.ReffLvl3 || "")}</td>
                                        </>
                                    )}
                                    <td class="align-middle py-[7px] px-[10px] sm:py-[20px] text-left sm:text-sm text-xxs w-[40%] min-w-[150px]">
                                        <div class="flex items-center text-left">
                                            <span class="icon-close text-white inline-block rounded-full mr-2"><CloseIcon></CloseIcon></span> {t('referral.No terms and conditions@@No terms and conditions')}
 
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                </>
            )}
           {props.details?  (<>
            <div class="content mb-3 sm:mb-5" dangerouslySetInnerHTML={ props.details }></div>
           </>)
           : (<>

            <div class="flex w-full flex-wrap mb-3 sm:mb-5 leading-tight">
                <div class="w-[100%] text-center sm:w-[30%]">
                    <img src="/images/dummy_images/referral_img_1.png" class="inline-block"/>
                </div>
                <div class="p-2 sm:w-[60%] sm:pl-10 content">
                    <div class="text-[26px] font-medium mb-3 ">Refer and earn 20%</div>
                    <p class="mb-3 leading-snug sm:leading-6">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley.
                    </p>
                    <ul class="list-disc pl-5">
                        <li class="mb-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                        <li class="mb-3">Donec dapibus ligula imperdiet lorem faucibus, sed porttitor diam hendrerit.</li>
                        <li class="mb-3">Aenean consectetur lacus eget condimentum porttitor.</li>
                        <li class="mb-3">Mauris eu erat fermentum, rhoncus diam mollis, venenatis elit.</li>
                    </ul>
                </div>
            </div>
            <div class="flex w-full flex-wrap mb-3 sm:mb-5 leading-tight">    
                <div class="w-[100%] text-center sm:w-[30%]">
                    <img src="/images/dummy_images/referral_img_2.png" class="inline-block"/>
                </div>
                <div class="p-2 sm:w-[60%] sm:pl-10 referral-content">
                    <div class="text-[26px] font-medium mb-3">Refer and earn 20%</div>
                    <p class="mb-3 leading-snug sm:leading-6">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley.
                    </p>
                    <ul class="list-disc pl-5">
                        <li class="mb-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                        <li class="mb-3">Donec dapibus ligula imperdiet lorem faucibus, sed porttitor diam hendrerit.</li>
                        <li class="mb-3">Aenean consectetur lacus eget condimentum porttitor.</li>
                        <li class="mb-3">Mauris eu erat fermentum, rhoncus diam mollis, venenatis elit.</li>
                    </ul>
                </div>
            </div>
      
      
           </>)}

            {props.isAuth && 
              <div class="mt-4 lg:mt-auto w-full flex-center">
              <a href='/profile/referral-downline' class="referralBtn py-3 px-6 rounded-lg">
              {t('app.View@@View')} {t('app.Referral Downline@@Referral Downline')} </a>
              </div>
            }
          
        </div>   
    </>;
})