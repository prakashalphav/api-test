import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './LastTrxList.scss?inline';
import type { LatestSiteTrx } from '~/services/types';
import { isMobileDevice, numFormat } from "~/utils/common";
import { useCommonViewData } from '~/hooks/app/useCommonViewData';

type Props = {
  trxList : LatestSiteTrx[];
  isMobile: boolean
}

export default component$((props: Props) => {
    useStylesScoped$(styles);
    const {commonData} = useCommonViewData();
    const trxList :LatestSiteTrx[] = props.trxList;

return <>
      <div class="grid grid-cols-3 gap-2">
                {trxList && trxList.slice(0,8).map((item, index)=>(
                    <>
                      {index < 3 &&
                      <>
                       <div class={`${(index == 0 && props.isMobile || index == 1 && !props.isMobile) ? `numOneUserWrapper` : (index == 1 && props.isMobile || index == 0 && !props.isMobile) ? `numTwoUserWrapper` : index == 2 ? `numThreeUserWrapper` : `userWrapper`} relative col-span-3 lg:col-span-1 flex-center lg:flex-col rounded-lg p-3 lg:pt-8`}>
                        <div class="text-4xl absolute -top-4 lg:block hidden">
                        {index == 0 && 
                            <img width="46" height="46" src="https://files.sitestatic.net/assets/imgs/onixv2/vega/second_place_ribbon.png" loading="lazy" decoding="async" alt="second_place_ribbon"/>
                          }
                           {index == 1 && 
                            <img width="46" height="46" src="https://files.sitestatic.net/assets/imgs/onixv2/vega/first_place_ribbon.png" loading="lazy" decoding="async" alt="first_place_ribbon"/>
                          }
                           {index == 2 && 
                            <img width="46" height="46" src="https://files.sitestatic.net/assets/imgs/onixv2/vega/third_place_ribbon.png" loading="lazy" decoding="async" alt="third_place_ribbon"/>
                          }
                          </div>
                          <div class="flex items-center lg:justify-center w-full">
                            <span class="mr-1 block lg:hidden">
                            {index == 0 && 
                            <img width="35" height="32" src="https://files.sitestatic.net/assets/imgs/onixv2/vega/first_place_ribbon.png" loading="lazy" decoding="async" alt="first_place_ribbon"/>
                            }
                             {index == 1 && 
                            <img width="35" height="32" src="https://files.sitestatic.net/assets/imgs/onixv2/vega/second_place_ribbon.png" loading="lazy" decoding="async" alt="second_place_ribbon"/>
                            }
                            {index == 2 && 
                            <img width="35" height="32" src="https://files.sitestatic.net/assets/imgs/onixv2/vega/third_place_ribbon.png" loading="lazy" decoding="async" alt="third_place_ribbon"/>
                            }
                            </span> 
                            <img
                                width="28"
                                height="28"
                                src="https://files.sitestatic.net/assets/imgs/onixv2/vega/user.png"
                                loading="lazy"
                                decoding="async"
                                alt="user"
                              />
                               <span class="ml-3 lg:text-base lg:font-medium">{item.user_fund_accname}</span></div>
                            <span class="lg:mt-6 lg:text-lg text-base font-medium flex lg:justify-center justify-end w-full prizeAmtText">{commonData.website_settings.currencyCode} {numFormat(item.amount)}</span>
                        </div>
                      </>
                      }

                    {index >= 3 &&
                      <>
                        <div class="col-span-3 userWrapper relative flex items-center rounded-lg px-5 py-3 lg:py-4">
                          <div class="flex items-center">
                              <span class="ml-1 mr-3">#{index+1}</span> 
                              <img
                                width="28"
                                height="28"
                                src="https://files.sitestatic.net/assets/imgs/onixv2/vega/user.png"
                                loading="lazy"
                                decoding="async"
                                alt="user"
                              />
                              <span class="ml-3 lg:text-base lg:font-medium">{item.user_fund_accname}</span>
                            </div>
                            <span class="prizeAmtText flex justify-end w-full font-medium lg:text-lg text-base">{commonData.website_settings.currencyCode} {numFormat(item.amount)}</span>
                        </div>
                      </>
                      }
                     
                    </>
                  ))}
                </div>
    </>;
});