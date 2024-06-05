type Props = {
    class? :string
    iconColor? : string;
}

export const ChatIcon = (props: Props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20" fill="none" class={props.class}>
    <path d="M15.2654 0H4.72858C2.12736 0 0 1.976 0 4.4V10.718C0 13.134 2.12736 15.118 4.72858 15.118H8.09757L14.5956 20V15.11H15.2714C17.8706 15.11 20 13.134 20 10.71V4.4C19.994 1.976 17.8666 0 15.2654 0ZM18.7944 10.718C18.7944 12.478 17.2108 13.918 15.2654 13.918H13.396V17.6L8.81736 14.15L8.49745 13.908H4.72858C2.78317 13.91 1.19964 12.478 1.19964 10.718V4.4C1.19964 2.64 2.78317 1.2 4.72858 1.2H15.2654C17.2108 1.2 18.7944 2.632 18.7944 4.4V10.718Z" fill={props.iconColor ? props.iconColor : 'currentColor'}/>
    <path d="M9.99687 6.448C9.76949 6.4476 9.5471 6.51464 9.35782 6.64064C9.16854 6.76664 9.02087 6.94593 8.93349 7.15585C8.84611 7.36577 8.82295 7.59689 8.86692 7.81998C8.91089 8.04306 9.02003 8.2481 9.18053 8.40916C9.34103 8.57023 9.54569 8.68008 9.76862 8.72482C9.99156 8.76957 10.2228 8.74721 10.433 8.66056C10.6432 8.57391 10.823 8.42687 10.9497 8.23803C11.0763 8.04919 11.1441 7.82703 11.1445 7.59965C11.1424 7.29555 11.021 7.00443 10.8063 6.78902C10.5917 6.57361 10.301 6.45114 9.99687 6.448Z" fill={props.iconColor ? props.iconColor : 'currentColor'}/>
    <path d="M5.95219 6.44802C5.72475 6.44487 5.50149 6.50926 5.31066 6.63303C5.11983 6.75681 4.97001 6.93441 4.88015 7.14337C4.79028 7.35232 4.76442 7.58323 4.80584 7.80689C4.84725 8.03054 4.95408 8.23689 5.11281 8.39981C5.27153 8.56273 5.47501 8.67491 5.69751 8.72215C5.92001 8.76939 6.15152 8.74957 6.36275 8.66519C6.57397 8.58081 6.75543 8.43568 6.88414 8.24814C7.01286 8.06061 7.08305 7.83911 7.08584 7.61167C7.08822 7.46071 7.06074 7.31078 7.00499 7.17048C6.94923 7.03018 6.86629 6.90229 6.76094 6.79415C6.65559 6.68602 6.5299 6.59977 6.39111 6.54036C6.25231 6.48096 6.10315 6.44958 5.95219 6.44802Z" fill={props.iconColor ? props.iconColor : 'currentColor'}/>
    <path d="M14.0616 6.44802C13.8332 6.44485 13.6091 6.50977 13.4178 6.6345C13.2264 6.75924 13.0766 6.93814 12.9874 7.14838C12.8981 7.35862 12.8735 7.59068 12.9167 7.81496C12.9599 8.03923 13.0689 8.24556 13.2299 8.40763C13.3908 8.5697 13.5964 8.68016 13.8203 8.72492C14.0443 8.76968 14.2765 8.74672 14.4874 8.65897C14.6982 8.57121 14.8782 8.42264 15.0043 8.23219C15.1303 8.04175 15.1968 7.81807 15.1953 7.58968C15.1942 7.28859 15.0747 7.00001 14.8626 6.78636C14.6504 6.57271 14.3627 6.45117 14.0616 6.44802Z" fill={props.iconColor ? props.iconColor : 'currentColor'}/>
    </svg>
);