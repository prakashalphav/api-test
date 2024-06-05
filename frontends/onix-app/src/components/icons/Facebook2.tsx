type Props ={
    bgColor : string; 
    iconColor : string;
    class?: string;
}

export const FacebookIcon = (props: Props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 40 41" fill="none" class={props.class}>
    <rect y="0.330811" width="40" height="40" rx="20" fill={props.bgColor} />
    <path d="M33.1581 20.0801C33.1581 12.8555 27.3025 7 20.079 7C12.8555 7 7 12.8555 7 20.0801C7 26.6071 11.783 32.0179 18.0353 32.9989V23.8603H14.7151V20.079H18.0353V17.1981C18.0353 13.9194 19.9886 12.1089 22.9752 12.1089C24.4064 12.1089 25.9029 12.3639 25.9029 12.3639V15.5827H24.2549C22.6307 15.5827 22.1239 16.591 22.1239 17.6254V20.0801H25.7514L25.1716 23.8614H22.1239V33C28.3762 32.019 33.1591 26.6082 33.1591 20.0801H33.1581Z" fill={props.iconColor}/>
    </svg>
);