type Props ={
    bgColor : string; 
    iconColor : string;
    class?: string;
}

export const TelegramIcon = (props: Props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 40 41" fill="none" class={props.class}>
    <rect y="0.330811" width="40" height="40" rx="20" fill={props.bgColor}/>
    <path d="M24.251 26.2941L26.3839 16.2395C26.5724 15.3546 26.0645 15.0064 25.4841 15.2237L12.9484 20.055C12.0923 20.3884 12.1071 20.8675 12.8036 21.0848L16.0099 22.0858L23.4534 17.3993C23.8016 17.1672 24.121 17.2981 23.8601 17.5302L17.8392 22.9707L17.6071 26.2792C17.9404 26.2792 18.0862 26.1344 18.2599 25.9598L19.8264 24.4509L23.0764 26.8447C23.6716 27.1781 24.0922 27.0045 24.2519 26.2932L24.251 26.2941ZM33 20.3308C33 27.5124 27.1816 33.3308 20 33.3308C12.8184 33.3308 7 27.5124 7 20.3308C7 13.1492 12.8184 7.33081 20 7.33081C27.1816 7.33081 33 13.1492 33 20.3308Z" fill={props.iconColor}/>
    </svg>
);