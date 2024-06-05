import { component$ } from '@builder.io/qwik';

export const DoubleArrowRight = component$((props:{class?:string})=>( 
    <svg class={`${props.class??''}`} width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask id="mask0_76_802" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="54" height="54">
    <rect width="54" height="54" fill="currentColor"/>
    </mask>
    <g mask="url(#mask0_76_802)">
    <path d="M13.6126 42.75L24.8626 27L13.6126 11.25H19.1251L30.3751 27L19.1251 42.75H13.6126ZM27.0001 42.75L38.2501 27L27.0001 11.25H32.5126L43.7626 27L32.5126 42.75H27.0001Z" fill="url(#paint0_linear_76_802)"/>
    </g>
    <defs>
    <linearGradient id="paint0_linear_76_802" x1="31.0775" y1="46.4559" x2="31.0775" y2="4.30147" gradientUnits="userSpaceOnUse">
    <stop stop-color="currentColor"/>
    <stop offset="0.661458" stop-color="currentColor"/>
    <stop offset="0.739583" stop-color="currentColor"/>
    <stop offset="1" stop-color="currentColor"/>
    </linearGradient>
    </defs>
    </svg>
    ));