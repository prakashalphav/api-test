type Props ={
    iconColor : string; 
}

export const TrashIcon = (props : Props) =>(<svg width="1em" height="1em" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" stroke-width="3" stroke={props.iconColor} fill="none"><path d="M45.49,54.87h-27a1,1,0,0,1-1-1l-2-36H48.46l-2,36A1,1,0,0,1,45.49,54.87Z"/><path d="M51,17.86H13c-.28,0-.5-.16-.5-.35l.93-4.35a.49.49,0,0,1,.5-.3H50.07a.49.49,0,0,1,.5.3l.93,4.35C51.5,17.7,51.28,17.86,51,17.86Z"/><line x1="24" y1="23.44" x2="24" y2="48.44"/><line x1="32" y1="23.44" x2="32" y2="48.44"/><line x1="40" y1="23.44" x2="40" y2="48.44"/><path d="M25.73,12.86V7.57a1,1,0,0,1,1-1H37.27a1,1,0,0,1,1,1v5.29"/></svg>
);