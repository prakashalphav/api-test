type Props ={
    id? : string;  // this id needed if one page reuse same icon (id cannot duplicate)
}
export const SlotsIcon= (props : Props)=>(
<svg width="1em" height="1em" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path={`url(#${props.id})`}>
<path d="M12.6088 8.32605H3.47836C3.1182 8.32605 2.82617 8.61804 2.82617 8.97824V14.6304C2.82617 14.9906 3.11816 15.2826 3.47836 15.2826H12.6088C12.9689 15.2826 13.261 14.9906 13.261 14.6304V8.9782C13.2609 8.61804 12.9689 8.32605 12.6088 8.32605ZM5.86965 13.9782H4.13051V9.63038H5.86965V13.9782ZM8.91312 13.9782H7.17398V9.63038H8.91312V13.9782ZM11.9566 13.9782H10.2175V9.63038H11.9566V13.9782Z" fill={`url(#paint0_linear${props.id})`}/>
<path d="M18.0435 0.5C16.9646 0.5 16.087 1.3777 16.087 2.45652C16.087 3.30676 16.6322 4.03164 17.3913 4.30086V9.63043H16.087V8.54348C16.087 4.10832 12.4787 0.5 8.04348 0.5C3.60832 0.5 0 4.10832 0 8.54348V18.5435C0 19.6223 0.877695 20.5 1.95652 20.5H14.1304C15.2093 20.5 16.087 19.6223 16.087 18.5435V10.9348H18.0435C18.4036 10.9348 18.6957 10.6428 18.6957 10.2826V4.30086C19.4547 4.03164 20 3.30676 20 2.45652C20 1.3777 19.1223 0.5 18.0435 0.5ZM14.7826 18.5435C14.7826 18.9031 14.49 19.1957 14.1304 19.1957H1.95652C1.59691 19.1957 1.30434 18.9031 1.30434 18.5435V8.54348C1.30434 4.82754 4.3275 1.80434 8.04348 1.80434C11.7595 1.80434 14.7826 4.8275 14.7826 8.54348V18.5435ZM18.0435 3.10871C17.6839 3.10871 17.3913 2.81613 17.3913 2.45652C17.3913 2.09691 17.6839 1.80434 18.0435 1.80434C18.4031 1.80434 18.6957 2.09691 18.6957 2.45652C18.6957 2.81613 18.4031 3.10871 18.0435 3.10871Z" fill={`url(#paint1_linear${props.id})`}/>
<path d="M12.3479 6.15161C11.7025 4.33153 9.9728 3.10864 8.04358 3.10864C6.11432 3.10864 4.38459 4.33149 3.73932 6.15161C3.61897 6.4911 3.79663 6.86387 4.13612 6.98422C4.47569 7.10465 4.84838 6.92696 4.96873 6.5875C5.42983 5.28684 6.66553 4.41302 8.04362 4.41302C9.42166 4.41302 10.6574 5.28688 11.1185 6.5875C11.2134 6.85493 11.4648 7.02196 11.7332 7.02188C11.8055 7.02188 11.8791 7.00973 11.9512 6.98422C12.2906 6.86383 12.4683 6.4911 12.3479 6.15161Z" fill={`url(#paint2_linear${props.id})`}/>
<path d="M8.04354 7.02178C8.40374 7.02178 8.69573 6.72979 8.69573 6.36959C8.69573 6.0094 8.40374 5.71741 8.04354 5.71741C7.68335 5.71741 7.39136 6.0094 7.39136 6.36959C7.39136 6.72979 7.68335 7.02178 8.04354 7.02178Z" fill={`url(#paint3_linear${props.id})`}/>
<path d="M11.3043 16.5869H4.78256C4.4224 16.5869 4.13037 16.8789 4.13037 17.2391C4.13037 17.5993 4.42236 17.8913 4.78256 17.8913H11.3043C11.6644 17.8913 11.9565 17.5993 11.9565 17.2391C11.9565 16.8789 11.6645 16.5869 11.3043 16.5869Z" fill={`url(#paint4_linear${props.id})`}/>
</g>
<defs>
<linearGradient id={`paint0_linear${props.id}`} x1="2.82617" y1="11.8043" x2="13.261" y2="11.8043" gradientUnits="userSpaceOnUse">
<stop stop-color="currentColor"/>
<stop offset="1" stop-color="currentColor"/>
</linearGradient>
<linearGradient id={`paint1_linear${props.id}`} x1="1.49012e-07" y1="10.5" x2="20" y2="10.5" gradientUnits="userSpaceOnUse">
<stop stop-color="currentColor"/>
<stop offset="1" stop-color="currentColor"/>
</linearGradient>
<linearGradient id={`paint2_linear${props.id}`} x1="3.70166" y1="5.06528" x2="12.3856" y2="5.06528" gradientUnits="userSpaceOnUse">
<stop stop-color="currentColor"/>
<stop offset="1" stop-color="currentColor"/>
</linearGradient>
<linearGradient id={`paint3_linear${props.id}`} x1="7.39136" y1="6.36959" x2="8.69573" y2="6.36959" gradientUnits="userSpaceOnUse">
<stop stop-color="currentColor"/>
<stop offset="1" stop-color="currentColor"/>
</linearGradient>
<linearGradient id={`paint4_linear${props.id}`} x1="4.13037" y1="17.2391" x2="11.9565" y2="17.2391" gradientUnits="userSpaceOnUse">
<stop stop-color="currentColor"/>
<stop offset="1" stop-color="currentColor"/>
</linearGradient>
<clipPath id={`${props.id}`}>
<rect width="20" height="20" fill="currentColor" transform="translate(0 0.5)"/>
</clipPath>
</defs>
</svg>
);