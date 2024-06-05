type Props ={
    id? : string;  // this id needed if one page reuse same icon (id cannot duplicate)
}
export const CasinoIcon= (props : Props)=>(
<svg width="1em" height="1em" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.1413 2.34332V0H0.878906V11.8902L1.83113 13.1996L0.878906 14.558V17.6566H3.22223V20H15.4846V2.34332H13.1413ZM2.05078 14.9279L3.27102 13.1871L2.05078 11.5092V1.17188H11.9694V5.62937L10.7977 7.01965L11.9694 8.47387V16.4848H2.05078V14.9279ZM14.3127 18.8281H4.3941V17.6567H13.1413V8.06051L12.3162 7.03641L13.1413 6.05734V3.51516H14.3128V18.8281H14.3127Z" fill={`url(#paint0_linear${props.id})`}/>
<path d="M3.27222 2.4541H4.44409V3.62597H3.27222V2.4541Z" fill={`url(#paint1_linear${props.id})`}/>
<path d="M9.58789 14.1571H10.7598V15.329H9.58789V14.1571Z" fill={`url(#paint2_linear${props.id})`}/>
<path d="M9.43388 7.77116L6.95342 5.29065L4.47292 7.77116C3.77042 8.47362 3.77042 9.6167 4.47292 10.3192C4.82417 10.6704 5.28553 10.846 5.74694 10.846C5.95729 10.846 6.16756 10.8092 6.36748 10.7362V11.7705H7.53936V10.7364C8.17775 10.9696 8.92252 10.8305 9.43388 10.3192C10.1364 9.6167 10.1364 8.47362 9.43388 7.77116ZM8.60525 9.49053C8.35967 9.73608 7.9601 9.73612 7.71451 9.49053L6.95342 8.7294L6.19233 9.49053C5.94674 9.73608 5.54714 9.73608 5.30155 9.49053C5.05596 9.24495 5.05596 8.84538 5.30155 8.59979L6.95342 6.94795L8.60529 8.59979C8.8508 8.84538 8.8508 9.24495 8.60525 9.49053Z" fill={`url(#paint3_linear${props.id})`}/>
<defs>
<linearGradient id={`paint0_linear${props.id}`} x1="0.878906" y1="9.99999" x2="15.4846" y2="9.99999" gradientUnits="userSpaceOnUse">
<stop stop-color="currentColor"/>
<stop offset="1" stop-color="currentColor"/>
</linearGradient>
<linearGradient id={`paint1_linear${props.id}`} x1="3.27222" y1="3.04004" x2="4.44409" y2="3.04004" gradientUnits="userSpaceOnUse">
<stop stop-color="currentColor"/>
<stop offset="1" stop-color="currentColor"/>
</linearGradient>
<linearGradient id={`paint2_linear${props.id}`} x1="9.58789" y1="14.743" x2="10.7598" y2="14.743" gradientUnits="userSpaceOnUse">
<stop stop-color="currentColor"/>
<stop offset="1" stop-color="currentColor"/>
</linearGradient>
<linearGradient id={`paint3_linear${props.id}`} x1="3.94604" y1="8.53057" x2="9.96076" y2="8.53057" gradientUnits="userSpaceOnUse">
<stop stop-color="currentColor"/>
<stop offset="1" stop-color="currentColor"/>
</linearGradient>
</defs>
</svg>
);