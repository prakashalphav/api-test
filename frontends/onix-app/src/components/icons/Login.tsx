type Props = {
    class? :string
    iconColor? : string;
}

export const LoginIcon = (props: Props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20" fill="none" class={props.class}>
    <path d="M1.48273 13.2069C1.34479 12.8621 0.931002 12.6897 0.586174 12.8276C0.241346 12.9655 0.0689316 13.3448 0.206863 13.7241C0.965483 15.5862 2.24135 17.1724 3.89652 18.2759C5.48273 19.3448 7.41376 20 9.48273 20C12.2413 20 14.7241 18.8621 16.5172 17.069C18.3448 15.2414 19.4482 12.7586 19.4482 10C19.4482 7.24138 18.3448 4.75862 16.5172 2.93103C14.7241 1.13793 12.2413 0 9.48273 0C7.41376 0 5.48273 0.655172 3.89652 1.72414C2.24135 2.82759 0.965483 4.41379 0.206863 6.27586C0.0689316 6.65517 0.241346 7.03448 0.586174 7.17241C0.931002 7.31034 1.34479 7.13793 1.48273 6.7931C2.1379 5.2069 3.24135 3.82759 4.65514 2.86207C6.03445 1.93103 7.68962 1.37931 9.48273 1.37931C11.862 1.37931 14 2.34483 15.5517 3.93103C17.1034 5.48276 18.0689 7.62069 18.0689 10C18.0689 12.3793 17.1034 14.5172 15.5517 16.069C14 17.6552 11.862 18.6207 9.48273 18.6207C7.68962 18.6207 6.03445 18.069 4.65514 17.1379C3.24135 16.1724 2.1379 14.7931 1.48273 13.2069Z" fill={props.iconColor ? props.iconColor : 'currentColor'}/>
    <path d="M11.2069 9.31034H0.689621C0.31031 9.31034 -3.43323e-05 9.62069 -3.43323e-05 10C-3.43323e-05 10.3793 0.31031 10.6897 0.689621 10.6897H11.2069V12.2414C11.2069 12.6207 11.5172 12.931 11.8965 12.931C12.0344 12.931 12.1724 12.8966 12.3103 12.7931C12.4482 12.7241 14.1724 11.7241 14.1724 11.7241L16.1379 10.5862C16.4482 10.4138 16.5517 9.96552 16.3793 9.65517C16.3103 9.55172 16.2069 9.44828 16.1034 9.41379L12.2413 7.17241C11.8965 6.96552 11.4827 7.10345 11.3103 7.41379C11.2413 7.51724 11.2069 7.65517 11.2069 7.75862V9.31034Z" fill={props.iconColor ? props.iconColor : 'currentColor'}/>
    </svg>
);