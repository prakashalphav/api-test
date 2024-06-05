import { Resource, component$, useStylesScoped$, useVisibleTask$ } from '@builder.io/qwik';
import { routeLoader$, type DocumentHead } from '@builder.io/qwik-city';
import styles from './maintenance.scss?inline';
import { getMaintenaceContent } from '~/services/contentDB';
import { useMaintenance, msToTime } from '../../hooks/business/useMaintenance';

export const useGetMaintenaceContent = routeLoader$(async (ev) => {
  try {
    const response = await getMaintenaceContent(ev);
    console.log('getMaintenaceContent', response);
    ev.status(503);
    ev.headers.set('Retry-After', "5400");
    return response;
  } catch (error) {
    console.log('getMaintenaceContent', error);
    if (error.code === "NO_MAINTENANCE") {
      throw ev.redirect(
        308,
        new URL('/', ev.url).toString()
      );
    }
    throw ev.error(500, error.message);
  }
});

export default component$(() => {
  useStylesScoped$(styles);
  const maintenceContent = useGetMaintenaceContent();
  const { timer, runScript } = useMaintenance(maintenceContent.value);

  useVisibleTask$(() => {
    runScript();
    let timespan = Number(maintenceContent?.value?.d?.timeDate);

    if (timespan) {
      const interval = setInterval(() => {
        const { days, hours, minutes, seconds } = msToTime(timespan, timer);
        timespan -= 1000;
        if (timespan < 0) {
          location.reload();
        }
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }
  });

  return (
    <div class="py-3 max-w-screen flex-col h-screen flex items-center lg:justify-center leading-normal">
      <Resource
        value={maintenceContent}
        onPending={() => <div>Loading...</div>}
        onRejected={() => <div>Error</div>}
        onResolved={(d) => (
          <>
            {/* <div dangerouslySetInnerHTML={{ __html: d.d.content }}></div> */}
            {!d.d.content && (
              <div>
                <img
                  class="web-logo mb-4 mx-auto block"
                  src={'https://files.sitestatic.net/ImageFile/' + d?.d?.logo}
                />
                <h3 class="text-2xl lg:text-3xl mt-5 pb-2 leading-smug">MAINTENANCE</h3>
                <p class="mb-2">
                  Our website is temporarily unavailable due to maintenance. We are working hard to make our website available soon. Please check back later or you may leave your contact number for our customer support to be contacted once the service is resumed.
                </p>
                <p class="mb-2">
                  We would like to assure you as our valued players that your details and funds are secure and safe with us. On behalf of the management and team, we sincerely apologize for the inconvenience that may have caused you and we seek your kind understanding for this temporary maintenance.
                </p>
                <p>
                  Please contact our customer support for any inquiry.
                  <a href={d?.d?.chatUrl}> Live Chat </a> or
                  <a href={'mailto:' + d?.d?.email}> {d?.d?.email} </a> or
                  <a href={'https://wa.me/' + d?.d?.whatsapp}> Whatsapp </a>
                </p>

                {d?.d?.timeDate && (
                  <div class="my-8 lg:my-24 flex-center gap-2 lg:gap-4">
                    <div class="text-center">
                      <p class="text-2xl lg:text-5xl font-bold">{timer.value?.days}</p>
                      <p>DAYS</p>
                    </div>
                    <p class="text-2xl lg:text-5xl font-bold">:</p>
                    <div class="text-center">
                      <p class="text-2xl lg:text-5xl font-bold">{timer.value?.hours}</p>
                      <p>HOURS</p>
                    </div>
                    <p class="text-2xl lg:text-5xl font-bold">:</p>
                    <div class="text-center">
                      <p class="text-2xl lg:text-5xl font-bold">{timer.value?.minutes}</p>
                      <p>MINUTES</p>
                    </div>
                    <p class="text-2xl lg:text-5xl font-bold">:</p>
                    <div class="text-center">
                      <p class="text-2xl lg:text-5xl font-bold">{timer.value?.seconds}</p>
                      <p>SECONDS</p>
                    </div>
                  </div>
                )}
            
                <h3 class="text-2xl lg:text-3xl mt-5 pb-2 leading-smug">PENINGKATAN</h3>
                <p class="mb-2">
                  Situs web kami untuk sementara tidak dapat diakses karena pemeliharaan. Kami bekerja keras untuk membuat
                  situs web kami segera tersedia. Silakan periksa kembali nanti atau Anda dapat meninggalkan nomor kontak Anda agar customer service kami dapat menghubungi setelah layanan dilanjutkan.
                </p>
                <p class="mb-2">
                  Kami ingin meyakinkan Anda sebagai pemain kami yang berharga bahwa detail dan dana Anda aman dan
                  terjamin bersama kami. Atas nama manajemen dan tim, kami dengan tulus meminta maaf atas ketidaknyamanan
                  yang mungkin Anda dapatkan dan kami mohon untuk pengertian Anda untuk pemeliharaan sementara ini.
                </p>
                <p>
                  Silakan hubungi customer service kami untuk informasi lebih lanjut.
                  <a href={d?.d?.chatUrl}> Live Chat </a> atau
                  <a href={'mailto:' + d?.d?.email}> {d?.d?.email} </a> atau
                  <a href={'https://wa.me/' + d?.d?.whatsapp}> Whatsapp </a>
                </p>

                {d?.d?.timeDate && (
                  <div class="my-8 lg:my-24 flex-center gap-2 lg:gap-4">
                    <div class="text-center">
                      <p class="text-2xl lg:text-5xl font-bold">{timer.value?.days}</p>
                      <p>HARI</p>
                    </div>
                    <p class="text-2xl lg:text-5xl font-bold">:</p>
                    <div class="text-center">
                      <p class="text-2xl lg:text-5xl font-bold">{timer.value?.hours}</p>
                      <p>JAM</p>
                    </div>
                    <p class="text-2xl lg:text-5xl font-bold">:</p>
                    <div class="text-center">
                      <p class="text-2xl lg:text-5xl font-bold">{timer.value?.minutes}</p>
                      <p>MENIT</p>
                    </div>
                    <p class="text-2xl lg:text-5xl font-bold">:</p>
                    <div class="text-center">
                      <p class="text-2xl lg:text-5xl font-bold">{timer.value?.seconds}</p>
                      <p>DETIK</p>
                    </div>
                  </div>
                )}
            
                <h3 class="text-2xl lg:text-3xl mt-5 pb-2 leading-smug">正在维修</h3>
                <p class="mb-2">
                  由于维护，我们的网站暂时不可用。 我们正在努力使我们的网站尽快可用。
                  请稍后再回来检查，否则您可以留下您的联系电话，以便在恢复服务后立即联系我们的客户支持。
                </p>
                <p class="mb-2">
                  我们想向您保证，作为我们尊贵的参与者，您的详细信息和资金对我们而言是安全的。 谨代表管理层和团队，对给您带来的不便深表歉意
                  我们希望通过这种临时维护来寻求您的谅解。
                </p>
                <p class="mb-4">
                  如有任何查询，请联系我们的客户支持。
                  <a href={d?.d?.chatUrl}> 在线聊天 </a> 或
                  <a href={'mailto:' + d?.d?.email}> {d?.d?.email} </a> 或
                  <a href={'https://wa.me/' + d?.d?.whatsapp}> Whatsapp </a>
                </p>

                {d?.d?.timeDate && (
                  <div class="my-8 lg:my-24 flex-center gap-2 lg:gap-4">
                    <div class="text-center">
                      <p class="text-2xl lg:text-5xl font-bold">{timer.value?.days}</p>
                      <p>天</p>
                    </div>
                    <p class="text-2xl lg:text-5xl font-bold">:</p>
                    <div class="text-center">
                      <p class="text-2xl lg:text-5xl font-bold">{timer.value?.hours}</p>
                      <p>小时</p>
                    </div>
                    <p class="text-2xl lg:text-5xl font-bold">:</p>
                    <div class="text-center">
                      <p class="text-2xl lg:text-5xl font-bold">{timer.value?.minutes}</p>
                      <p>分钟</p>
                    </div>
                    <p class="text-2xl lg:text-5xl font-bold">:</p>
                    <div class="text-center">
                      <p class="text-2xl lg:text-5xl font-bold">{timer.value?.seconds}</p>
                      <p>秒</p>
                    </div>
                  </div>
                )}


              </div>
            )}
            
          </>
        )}
      />
    </div>
  );
});
