type Props ={
    bgColor : string;
    iconColor : string; 
}

export const MessageIcon = (props : Props) => (
<svg width="1em" height="1em" viewBox="0 0 24 24" fill={props.bgColor} xmlns="http://www.w3.org/2000/svg">
<path d="M7 4C4.79086 4 3 5.79073 3 7.9997V13.2642C3 15.4732 4.79086 17.2639 7 17.2639L7 19.8998C7 19.9834 7.09639 20.0301 7.16197 19.9783L10.6 17.2639H17C19.2091 17.2639 21 15.4732 21 13.2642V7.99971C21 5.79073 19.2091 4 17 4H7Z" stroke={props.iconColor} stroke-width="1" stroke-linecap="round"/>
<path d="M9 11C9 11.5523 8.55228 12 8 12C7.44772 12 7 11.5523 7 11C7 10.4477 7.44772 10 8 10C8.55228 10 9 10.4477 9 11Z" fill={props.iconColor}/>
<path d="M13 11C13 11.5523 12.5523 12 12 12C11.4477 12 11 11.5523 11 11C11 10.4477 11.4477 10 12 10C12.5523 10 13 10.4477 13 11Z" fill={props.iconColor}/>
<path d="M17 11C17 11.5523 16.5523 12 16 12C15.4477 12 15 11.5523 15 11C15 10.4477 15.4477 10 16 10C16.5523 10 17 10.4477 17 11Z" fill={props.iconColor}/>
</svg>
);