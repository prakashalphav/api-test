import { component$ } from '@builder.io/qwik';

export const DoubleArrowLeft = component$((props:{class?:string})=>( 
<svg class={`${props.class??''}`}  width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
<mask id="mask0_76_814" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="54" height="54">
<rect x="54" y="54" width="54" height="54" transform="rotate(180 54 54)" fill="currentColor"/>
</mask>
<g mask="url(#mask0_76_814)">
<path d="M40.3875 11.25L29.1375 27L40.3875 42.75H34.875L23.625 27L34.875 11.25H40.3875ZM27 11.25L15.75 27L27 42.75H21.4874L10.2374 27L21.4874 11.25H27Z" fill="url(#paint0_linear_76_814)"/>
</g>
<defs>
<linearGradient id="paint0_linear_76_814" x1="22.9225" y1="7.54412" x2="22.9225" y2="49.6985" gradientUnits="userSpaceOnUse">
<stop stop-color="currentColor"/>
<stop offset="0.661458" stop-color="currentColor"/>
<stop offset="0.739583" stop-color="currentColor"/>
<stop offset="1" stop-color="currentColor"/>
</linearGradient>
</defs>
</svg>
    ));