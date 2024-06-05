export const Substract = (props: { color1: string, color2: string }) => (<svg width="160" height="165" viewBox="0 0 160 165" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M15 0C6.71573 0 0 6.71572 0 15V150C0 158.284 6.71573 165 15 165H145C153.284 165 160 158.284 160 150V119.696C160 114.248 156.84 109.416 152.943 105.609C146.808 99.6167 143 91.2531 143 82C143 72.7469 146.808 64.3833 152.943 58.3911C156.84 54.5843 160 49.7523 160 44.3043V15C160 6.71573 153.284 0 145 0H15Z" fill="url(#paint0_linear_4630_1415)" />
    <defs>
        <linearGradient id="paint0_linear_4630_1415" x1="141.5" y1="79" x2="-5.57808e-08" y2="79" gradientUnits="userSpaceOnUse">
            <stop stop-color={props.color1} />
            <stop offset="1" stop-color={props.color2} />
        </linearGradient>
    </defs>
</svg>);