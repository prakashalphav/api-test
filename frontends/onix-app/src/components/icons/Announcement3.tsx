import { component$ } from '@builder.io/qwik';

type Props = {
    class? :string
}
export const Announcement3Icon =  component$((props: Props) =>  
<svg width="1em" height="1em" class={props.class} viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.3292 14.8902C14.5235 16.1141 13.4592 17.3004 11.9522 17.5397C10.4449 17.7791 9.06547 16.981 8.87129 15.7572C8.67671 14.5332 14.1348 13.6664 14.3292 14.8902Z"/>
<path d="M12.4255 14.3061C12.6267 14.9189 12.6158 15.6153 12.4687 16.2233C12.3514 16.7081 12.1479 17.168 11.8564 17.5507C11.8883 17.5464 11.9198 17.5446 11.9519 17.5396C13.4591 17.3002 14.5233 16.1141 14.3289 14.8901C14.255 14.4252 13.4206 14.2625 12.4255 14.3061Z" fill="currentColor"/>
<path d="M17.7892 11.0151L17.59 11.0468L16.4609 7.13224C15.733 4.71346 14.1065 3.12509 11.9459 2.71028C11.9586 2.53225 11.9535 2.35038 11.9245 2.1665C11.7186 0.869803 10.5004 -0.0145078 9.2035 0.191381C7.9068 0.397269 7.02249 1.61564 7.22838 2.91234C7.26088 3.11702 7.32103 3.30978 7.40036 3.49125C5.47813 4.61859 4.38591 6.69625 4.57323 9.02016L4.68929 13.0955L4.39338 13.1426C3.42732 13.296 2.76868 14.2035 2.92208 15.1696C3.07549 16.1356 3.98301 16.7943 4.94907 16.6409L18.3449 14.5133C19.311 14.3599 19.9696 13.4524 19.8162 12.4864C19.6628 11.5203 18.7553 10.8617 17.7892 11.0151ZM10.0349 1.95657C10.0351 1.96868 10.0382 2.00522 10.0363 2.02823C10.0361 2.03085 10.0357 2.03368 10.0351 2.0363C10.0258 2.0795 10.0166 2.1227 10.0032 2.16488C10.0016 2.16973 9.9996 2.17437 9.99718 2.17901C9.99354 2.18608 9.95701 2.25935 9.93359 2.29447C9.93218 2.29649 9.93077 2.29851 9.92915 2.30053C9.90049 2.33706 9.86759 2.37077 9.83348 2.40226C9.82944 2.40609 9.8252 2.40932 9.82056 2.41235C9.81955 2.41296 9.81874 2.41356 9.81773 2.41417C9.79169 2.43072 9.73679 2.46544 9.71035 2.48098C9.70914 2.48179 9.70792 2.48239 9.70671 2.483C9.70429 2.48441 9.70187 2.48562 9.69924 2.48684C9.69662 2.48805 9.694 2.48906 9.69137 2.48986C9.64797 2.505 9.60397 2.51792 9.55956 2.52943C9.55391 2.53084 9.54806 2.53185 9.5422 2.53225C9.54119 2.53225 9.54019 2.53225 9.53918 2.53245C9.51072 2.53366 9.43704 2.53548 9.40838 2.53548C9.40696 2.53548 9.40555 2.53548 9.40394 2.53548C9.40091 2.53548 9.39808 2.53508 9.39505 2.53488C9.39182 2.53447 9.3886 2.53366 9.38516 2.53306C9.3563 2.5264 9.2907 2.51045 9.26224 2.50278C9.26143 2.50258 9.26082 2.50238 9.26002 2.50218C9.2586 2.50177 9.25699 2.50137 9.25557 2.50076C9.25235 2.49975 9.24932 2.49834 9.24629 2.49693C9.24488 2.49632 9.24326 2.49551 9.24185 2.49471C9.2142 2.48038 9.15949 2.4503 9.13224 2.43476C9.13144 2.43435 9.13043 2.43375 9.12962 2.43314C9.12336 2.42951 9.11751 2.42527 9.11226 2.42043C9.07835 2.39055 9.04464 2.36007 9.01356 2.32717C9.01073 2.32414 9.0079 2.32091 9.00528 2.31768C8.95017 2.24986 8.91546 2.17275 8.90153 2.08636C8.90052 2.04296 8.89951 1.99977 8.8985 1.95637C8.90839 1.87159 8.93826 1.79469 8.98812 1.72545C8.99256 1.72081 8.997 1.71617 9.00124 1.71152C9.00911 1.69396 9.01598 1.676 9.02668 1.65965C9.05211 1.60212 9.09046 1.55388 9.14133 1.51492C9.19078 1.47112 9.2471 1.44286 9.31028 1.42974C9.37164 1.40532 9.43583 1.39805 9.50244 1.40794C9.5087 1.40875 9.51516 1.40976 9.52121 1.41117C9.52404 1.41177 9.52706 1.41238 9.52989 1.41319C9.57228 1.42328 9.61548 1.43317 9.65746 1.44468C9.66675 1.4473 9.67603 1.45053 9.68471 1.45477C9.72548 1.47435 9.76545 1.49635 9.80401 1.51997C9.80703 1.52199 9.81026 1.524 9.81309 1.52622C9.84821 1.55368 9.87909 1.58638 9.91058 1.61766C9.913 1.62009 9.91502 1.62251 9.91704 1.62513C9.97679 1.70385 10.0182 1.78459 10.0325 1.88391C10.0361 1.90712 10.0347 1.94507 10.0349 1.95657Z" fill="currentColor"/>
<path d="M6.17411 12.782C5.35177 8.16262 6.1505 4.95359 8.64094 3.96855C7.24433 3.03761 7.6769 1.52817 8.3531 0.501953C7.5467 0.986598 7.07174 1.92602 7.22838 2.91226C7.26088 3.11694 7.32103 3.30971 7.40036 3.49117C5.47813 4.61851 4.38591 6.69617 4.57323 9.02008L4.68929 13.0955L4.39338 13.1425C3.42732 13.2959 2.76868 14.2034 2.92208 15.1695C3.07549 16.1355 3.98301 16.7942 4.94908 16.6408L5.81845 16.5027C4.32374 16.4474 3.53309 14.2704 5.40748 13.4846C5.41757 13.4806 6.11961 12.8157 6.17411 12.782Z" fill="currentColor"/>
<path d="M17.7887 11.0151L17.5895 11.0468L16.4603 7.13233C15.7324 4.71354 14.1059 3.12517 11.9453 2.71037C11.958 2.53233 11.953 2.35047 11.9239 2.16658C11.7572 1.11695 10.9272 0.338006 9.9292 0.188232C10.0713 0.475063 10.6292 0.707596 10.7947 1.49461C11.0967 2.92897 10.7816 3.43885 10.8458 3.61204C10.8813 3.70812 13.8467 3.74707 14.8021 8.44557C15.0346 9.58946 15.3241 11.2059 14.5381 12.1271C15.9242 12.6156 16.3761 13.8818 15.4733 14.9694L18.3442 14.5134C19.3102 14.36 19.9689 13.4525 19.8155 12.4864C19.6623 11.5204 18.7547 10.8617 17.7887 11.0151Z" fill="currentColor"/>
<path d="M17.7888 11.0145L17.5896 11.0462L17.546 10.6282C17.3237 10.7261 9.16046 12.745 4.68359 12.5355L4.68824 13.0853C6.24552 13.5413 16.2414 12.2038 17.7888 11.0145Z" fill="currentColor"/>
<path d="M8.43282 4.8377C8.27578 4.61143 7.98027 4.4992 7.71201 4.55834C7.69041 4.56319 7.67063 4.57308 7.64923 4.57873C7.64722 4.57873 7.6452 4.57772 7.64318 4.57772C7.39914 4.57832 7.19406 4.65846 6.99867 4.80218C6.72536 5.00322 6.51564 5.28945 6.37394 5.59505C6.20176 5.96625 6.15069 6.44 6.47486 6.7454C6.77623 7.0292 7.23988 6.98984 7.6024 6.8647C8.14639 6.67697 8.60298 6.09584 8.61287 5.51391C8.61691 5.26785 8.57553 5.04319 8.43282 4.8377Z" fill="currentColor"/>
<path d="M7.07134 7.70084C7.03561 7.62333 6.98354 7.55934 6.91471 7.50908L6.80591 7.44954C6.72436 7.41805 6.64039 7.40917 6.5538 7.42249L6.4993 7.43117C6.43289 7.43924 6.37374 7.46266 6.32146 7.50161C6.26515 7.53028 6.21913 7.57145 6.1832 7.62515C6.14343 7.67601 6.1186 7.73253 6.10871 7.7949C6.08772 7.85667 6.08388 7.92046 6.0968 7.98586C6.10932 8.02744 6.12163 8.06882 6.13415 8.1104C6.16987 8.18791 6.22195 8.2519 6.29078 8.30216L6.39958 8.3617C6.48113 8.39319 6.5651 8.40207 6.65169 8.38875L6.70619 8.38007C6.7724 8.3722 6.83174 8.34858 6.88402 8.30963C6.94034 8.28096 6.98636 8.23978 7.02249 8.18609C7.06226 8.13523 7.08709 8.07871 7.09698 8.01634C7.11797 7.95457 7.12181 7.89078 7.10889 7.82538C7.09617 7.7838 7.08386 7.74242 7.07134 7.70084Z" fill="currentColor"/>
<path d="M7.38146 14.6958C6.46768 14.3426 5.41522 14.4312 4.45683 14.231C3.87166 14.1088 3.7661 15.043 4.35308 15.157C5.35224 15.3512 6.53287 15.5174 7.41537 14.9088C7.49429 14.8545 7.46361 14.7275 7.38146 14.6958Z" fill="currentColor"/>
<path d="M9.04406 14.3007L8.38743 14.3936C8.03985 14.4426 8.12664 14.9933 8.47302 14.9321L9.12601 14.8169C9.45725 14.7585 9.37772 14.2535 9.04406 14.3007Z" fill="currentColor"/>
<path d="M11.4948 17.7429C10.3562 17.7429 9.29101 17.1171 8.74561 16.0887L9.03123 15.9371C9.58955 16.9904 10.7573 17.5707 11.9336 17.3848C13.1114 17.1977 14.0402 16.2831 14.2448 15.1091L14.5634 15.1646C14.3351 16.4747 13.2988 17.4952 11.9847 17.7037C11.8206 17.7302 11.6569 17.7429 11.4948 17.7429Z" fill="currentColor"/>
<path d="M4.66684 16.8248C4.26233 16.8248 3.86953 16.6979 3.53587 16.4557C3.11804 16.1525 2.84332 15.7046 2.76238 15.1949C2.59524 14.1424 3.31545 13.1501 4.3679 12.9828L4.52353 12.9582L4.4115 9.0247C4.22418 6.703 5.26392 4.61687 7.19847 3.42393C7.13791 3.26265 7.09431 3.09955 7.06868 2.93767C6.84906 1.55498 7.79534 0.251226 9.17802 0.0318131C10.5613 -0.188407 11.8645 0.758276 12.0839 2.14116C12.1065 2.28286 12.1162 2.43001 12.1133 2.57978C14.2548 3.04485 15.8912 4.67944 16.6158 7.08571L17.7058 10.8648L17.764 10.8557C18.818 10.6882 19.8089 11.4088 19.9759 12.4612C20.143 13.5139 19.4228 14.506 18.3703 14.6731L4.97426 16.8002C4.87152 16.8168 4.76878 16.8248 4.66684 16.8248ZM9.57749 0.323287C9.46223 0.323287 9.34596 0.33237 9.22869 0.35094C8.02202 0.542699 7.19604 1.68033 7.3876 2.887C7.41606 3.06645 7.47016 3.24791 7.54807 3.42655L7.6056 3.55796L7.48186 3.63062C5.57982 4.74626 4.5526 6.75609 4.73406 9.00734L4.85457 13.2331L4.41857 13.3021C3.54233 13.4414 2.94243 14.268 3.0815 15.1442C3.14912 15.5689 3.37762 15.9417 3.72561 16.1943C4.0732 16.4468 4.4981 16.5483 4.9234 16.4813L18.3193 14.3538C18.744 14.2862 19.1168 14.0577 19.3695 13.7097C19.622 13.3617 19.724 12.9362 19.6565 12.5117C19.5173 11.6352 18.6895 11.0364 17.8146 11.1744L17.4743 11.2287L16.3056 7.17675C15.5919 4.8058 14.0325 3.27516 11.9151 2.86883L11.774 2.84179L11.7845 2.69867C11.797 2.52407 11.7904 2.35371 11.7645 2.19183C11.5916 1.10243 10.6475 0.323287 9.57749 0.323287Z" fill="currentColor"/>
<path d="M9.51552 2.79082C9.11948 2.79082 8.77028 2.50258 8.7065 2.09948C8.63565 1.65298 8.94125 1.23233 9.38754 1.16148C9.83222 1.08901 10.2547 1.39603 10.3255 1.84252C10.3964 2.28902 10.0908 2.70968 9.6445 2.78053C9.6011 2.78759 9.55811 2.79082 9.51552 2.79082ZM9.51632 1.47435C9.49049 1.47435 9.46445 1.47636 9.438 1.4806C9.16773 1.5234 8.98263 1.77854 9.02542 2.04902C9.06841 2.3193 9.32315 2.50298 9.59383 2.4616C9.86411 2.41861 10.0492 2.16367 10.0064 1.89319C9.96766 1.64895 9.75592 1.47435 9.51632 1.47435Z" fill="currentColor"/>
<path d="M15.737 2.2362C15.8323 2.2903 15.9257 2.34762 16.0166 2.40899C16.0579 2.43684 16.0985 2.4655 16.1389 2.49477C16.1591 2.50951 16.1788 2.52465 16.1988 2.53938C16.2469 2.57491 16.1161 2.47297 16.1833 2.52788C16.3496 2.66332 16.5071 2.80805 16.6522 2.9665C16.7228 3.04361 16.7852 3.12838 16.8552 3.20569C16.8262 3.1738 16.7993 3.13222 16.8431 3.19055C16.8581 3.21054 16.8728 3.23052 16.8873 3.25091C16.9192 3.29552 16.9503 3.34053 16.9806 3.38635C17.0987 3.56539 17.2018 3.75332 17.2908 3.94831C17.3383 4.05246 17.4747 4.14188 17.5805 4.17115C17.6966 4.20304 17.851 4.18871 17.9541 4.1223C18.1929 3.96829 18.2412 3.70649 18.1281 3.45902C17.7347 2.59731 17.0494 1.8658 16.2267 1.39932C16.0061 1.27418 15.6867 1.33978 15.5634 1.57332C15.4417 1.80283 15.5014 2.10258 15.737 2.2362Z" fill="currentColor"/>
<path d="M17.2001 1.63182C17.3737 1.81954 17.5473 2.00726 17.7207 2.19498C17.7647 2.24222 17.8166 2.27572 17.8767 2.2953C17.9344 2.32558 17.9968 2.33951 18.0634 2.33709C18.1302 2.33951 18.1924 2.32578 18.2501 2.2953C18.3103 2.27572 18.3622 2.24242 18.4062 2.19498C18.4909 2.10254 18.5539 1.98122 18.5481 1.85224C18.5422 1.80925 18.5366 1.76625 18.5307 1.72346C18.5077 1.64131 18.4661 1.57005 18.406 1.5095C18.2324 1.32177 18.0588 1.13405 17.8854 0.946331C17.8414 0.899097 17.7895 0.86559 17.7294 0.846011C17.6716 0.815733 17.6093 0.801805 17.5426 0.804227C17.4758 0.801805 17.4137 0.815531 17.3559 0.846011C17.2958 0.86559 17.2439 0.898896 17.1999 0.946331C17.1151 1.03878 17.0521 1.16009 17.058 1.28907C17.0638 1.33207 17.0695 1.37506 17.0754 1.41786C17.0986 1.50001 17.1399 1.57126 17.2001 1.63182Z" fill="currentColor"/>
<path d="M2.01125 6.33669C2.03809 6.25757 2.06776 6.17965 2.09865 6.10214C2.12307 6.04058 2.08593 6.12535 2.0823 6.1411C2.08633 6.12414 2.09764 6.10618 2.1049 6.09023C2.12206 6.05228 2.13982 6.01454 2.15819 5.97699C2.23167 5.82722 2.31463 5.68189 2.40647 5.54261C2.44987 5.4768 2.49569 5.41262 2.54232 5.34903C2.59217 5.28101 2.48862 5.41625 2.52576 5.36982C2.53747 5.35529 2.54878 5.34076 2.56048 5.32622C2.58672 5.29372 2.61337 5.26163 2.64062 5.23014C2.74982 5.10378 2.86689 4.98489 2.99083 4.87286C3.17956 4.7025 3.17714 4.35814 2.99083 4.18718C2.78918 4.00208 2.50659 4.00531 2.30514 4.18718C1.73875 4.69867 1.32152 5.35791 1.07647 6.07893C0.994722 6.31933 1.17013 6.61949 1.41498 6.6752C1.68364 6.73656 1.92364 6.59405 2.01125 6.33669Z" fill="currentColor"/>
<path d="M0.903973 5.18682C1.08079 4.94338 1.25741 4.69995 1.43424 4.45652C1.46976 4.40081 1.48894 4.34086 1.49176 4.27627C1.5061 4.21187 1.50327 4.14748 1.48308 4.08289C1.4522 3.97046 1.3652 3.84854 1.26024 3.79323C1.14781 3.73369 1.01136 3.70402 0.886614 3.74439C0.84806 3.76074 0.809506 3.77688 0.770751 3.79323C0.697882 3.83643 0.639951 3.89436 0.596755 3.96723C0.419933 4.21066 0.243313 4.4541 0.0664912 4.69753C0.0309654 4.75324 0.0117895 4.81319 0.00896358 4.87778C-0.00536787 4.94217 -0.00254195 5.00656 0.0176432 5.07116C0.0485265 5.18359 0.135524 5.30551 0.240487 5.36081C0.352918 5.42016 0.48937 5.45003 0.614114 5.40966C0.652668 5.39331 0.691221 5.37716 0.729977 5.36081C0.803047 5.31762 0.860978 5.25969 0.903973 5.18682Z" fill="currentColor"/>
</svg>
)