export const ArrowCircle = (props: { color1: string, color2: string }) => (<svg width="36" height="62" viewBox="0 0 36 62" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.69995 30.8996C9.69995 35.4996 13.4 39.1996 18 39.1996C22.6 39.1996 26.2999 35.4996 26.2999 30.8996C26.2999 26.2996 22.6 22.5996 18 22.5996C13.4 22.5996 9.69995 26.2996 9.69995 30.8996ZM24.4 30.8996C24.4 34.3996 21.5 37.2996 18 37.2996C14.5 37.2996 11.6 34.3996 11.6 30.8996C11.6 27.3996 14.5 24.4996 18 24.4996C21.5 24.4996 24.4 27.3996 24.4 30.8996Z" fill={props.color1} />
    <path d="M22.8 17.8V23.1L36 11.6L22.8 0V5.2C18.8 5.3 5.8 6.9 2.6 22.5L2 25.4L4.2 23.4C10.8 17.2 19.7 17.5 22.8 17.8ZM23.1 7.1C23.3 7.1 23.5 7.1 23.7 7.1H24.7V4.3L33 11.6L24.7 18.9V16.2L23.9 16.1C22 15.8 12.9 14.8 5.2 20.2C9 8.1 19.7 7.1 23.1 7.1Z" fill="url(#paint0_linear_4632_1439)" />
    <path d="M13.2 43.9998V38.6998L0 50.1998L13.2 61.6998V56.4998C17.2 56.3998 30.2 54.7998 33.4 39.1998L34 36.2998L31.8 38.2998C25.2 44.5998 16.3 44.2998 13.2 43.9998ZM12.3 54.6998H11.3V57.5998L3 50.2998L11.3 42.9998V45.7998L12.1 45.8998C14 46.1998 23.2 47.1998 30.8 41.7998C26.7 54.4998 14.8 54.6998 12.3 54.6998Z" fill="url(#paint1_linear_4632_1439)" />
    <defs>
        <linearGradient id="paint0_linear_4632_1439" x1="31.5" y1="9.5" x2="2" y2="23" gradientUnits="userSpaceOnUse">
            <stop stop-color={props.color2} />
            <stop offset="1" stop-color="white" />
        </linearGradient>
        <linearGradient id="paint1_linear_4632_1439" x1="29.5" y1="45.7998" x2="7.32957e-07" y2="59.2998" gradientUnits="userSpaceOnUse">
            <stop stop-color="white" />
            <stop offset="1" stop-color={props.color2} />
        </linearGradient>
    </defs>
</svg>);