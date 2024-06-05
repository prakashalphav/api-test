type Props = {
    class? :string
    iconColor? : string;
}

export const RegisterIcon = (props: Props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20" fill="none" class={props.class}>
    <g>
      <path d="M10 0C8.02219 0 6.08879 0.586489 4.4443 1.6853C2.79981 2.78412 1.51809 4.3459 0.761209 6.17316C0.00433302 8.00042 -0.193701 10.0111 0.192152 11.9509C0.578004 13.8907 1.53041 15.6725 2.92894 17.0711C4.32746 18.4696 6.10929 19.422 8.0491 19.8078C9.98891 20.1937 11.9996 19.9957 13.8268 19.2388C15.6541 18.4819 17.2159 17.2002 18.3147 15.5557C19.4135 13.9112 20 11.9778 20 10C20 7.34783 18.9464 4.80429 17.0711 2.92893C15.1957 1.05357 12.6522 0 10 0ZM10 1.21143C11.6059 1.2091 13.1816 1.64739 14.5557 2.47857C15.9297 3.30975 17.0494 4.50197 17.7928 5.92542C18.5362 7.34886 18.8748 8.94898 18.7718 10.5515C18.6688 12.1541 18.1281 13.6977 17.2086 15.0143C17.2086 14.98 17.1743 14.9486 17.16 14.9143C17.092 14.7426 17.0128 14.5756 16.9229 14.4143L16.84 14.2657C16.7239 14.0721 16.5931 13.8877 16.4486 13.7143L16.3743 13.6343C16.2454 13.4863 16.106 13.3479 15.9571 13.22L15.8171 13.0971C15.6371 12.9453 15.4461 12.8068 15.2457 12.6829C15.1942 12.6518 15.1384 12.6287 15.08 12.6143H15.02C14.9914 12.6143 14.96 12.6143 14.9314 12.6143H14.9086C14.8651 12.6177 14.822 12.6254 14.78 12.6371L14.7143 12.6543C14.6509 12.6774 14.5919 12.7112 14.54 12.7543C13.2757 13.8311 11.6693 14.4225 10.0086 14.4225C8.34787 14.4225 6.74143 13.8311 5.47715 12.7543C5.38006 12.6724 5.25969 12.6231 5.13304 12.6133C5.0064 12.6036 4.8799 12.6339 4.77143 12.7C4.57108 12.8239 4.38009 12.9624 4.2 13.1143L4.06 13.2371C3.91186 13.3658 3.7725 13.5042 3.64286 13.6514L3.56858 13.7314C3.42407 13.9049 3.29321 14.0892 3.17715 14.2829L3.09429 14.4314C3.00439 14.5927 2.92518 14.7598 2.85715 14.9314C2.84286 14.9657 2.82286 14.9971 2.80858 15.0314C1.88516 13.716 1.34066 12.1722 1.23447 10.5685C1.12828 8.96479 1.46446 7.36271 2.20636 5.93698C2.94827 4.51124 4.0674 3.31658 5.44172 2.48328C6.81604 1.64999 8.39279 1.21004 10 1.21143ZM3.74286 16.1543C3.76 16.06 3.78 15.9657 3.80286 15.8686C3.82572 15.7714 3.84858 15.6714 3.88 15.5829C3.92708 15.45 3.98243 15.3202 4.04572 15.1943C4.07974 15.1124 4.11788 15.0323 4.16 14.9543C4.23715 14.8241 4.32407 14.6999 4.42 14.5829C4.46286 14.5257 4.5 14.4657 4.54572 14.4114C4.69695 14.2404 4.8644 14.0844 5.04572 13.9457C6.47045 15.0283 8.2106 15.6145 10 15.6145C11.7894 15.6145 13.5295 15.0283 14.9543 13.9457C15.1356 14.0844 15.3031 14.2404 15.4543 14.4114C15.5 14.4657 15.5371 14.5257 15.58 14.5829C15.6759 14.6999 15.7629 14.8241 15.84 14.9543C15.8821 15.0323 15.9203 15.1124 15.9543 15.1943C16.0176 15.3202 16.0729 15.45 16.12 15.5829C16.1514 15.6743 16.1743 15.7743 16.1971 15.8686C16.22 15.9629 16.24 16.0543 16.2571 16.1543C15.4423 16.9881 14.469 17.6507 13.3945 18.1031C12.32 18.5554 11.1659 18.7885 10 18.7885C8.83413 18.7885 7.68002 18.5554 6.60549 18.1031C5.53096 17.6507 4.55769 16.9881 3.74286 16.1543Z" fill={props.iconColor ? props.iconColor : 'currentColor'}/>
      <path d="M10.0002 13.0086C11.1103 13.0091 12.1956 12.6804 13.1188 12.0641C14.042 11.4477 14.7617 10.5713 15.1868 9.54585C15.6118 8.52038 15.7232 7.39188 15.5068 6.3031C15.2903 5.21432 14.7559 4.2142 13.9709 3.42926C13.186 2.64431 12.1858 2.10982 11.0971 1.89339C10.0083 1.67696 8.87978 1.78833 7.85431 2.2134C6.82884 2.63847 5.95248 3.35814 5.33611 4.28137C4.71973 5.20461 4.39104 6.28991 4.3916 7.39999C4.39312 8.88701 4.9845 10.3127 6.03599 11.3642C7.08747 12.4157 8.51315 13.007 10.0002 13.0086ZM10.0002 3.00856C10.8708 3.00857 11.7218 3.26684 12.4456 3.7507C13.1693 4.23456 13.7333 4.92225 14.0661 5.72674C14.3988 6.53124 14.4855 7.41637 14.315 8.27012C14.1445 9.12387 13.7246 9.90786 13.1084 10.5229C12.4922 11.1379 11.7074 11.5563 10.8533 11.7251C9.99922 11.8939 9.11426 11.8055 8.31042 11.4712C7.50657 11.1368 6.81998 10.5715 6.33754 9.84683C5.85509 9.12213 5.59848 8.27059 5.60017 7.39999C5.60093 6.23327 6.06474 5.11455 6.88974 4.28956C7.71473 3.46456 8.83345 3.00075 10.0002 2.99999V3.00856Z" fill={props.iconColor ? props.iconColor : 'currentColor'}/>
    </g>
    </svg>
);