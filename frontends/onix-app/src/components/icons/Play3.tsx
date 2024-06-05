type Props ={ 
    class?:string;
}
export const PlayIcon = (props : Props) =>(
<>
<svg width="1em" height="1em" class={`${props.class??''}`} viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M0.625 25C0.625 11.5381 11.5381 0.625 25 0.625C38.4619 0.625 49.375 11.5381 49.375 25C49.375 38.4619 38.4619 49.375 25 49.375C11.5381 49.375 0.625 38.4619 0.625 25ZM35.6854 22.5415C37.6143 23.6131 37.6143 26.3871 35.6854 27.4587L21.6784 35.2404C19.8038 36.2818 17.5 34.9263 17.5 32.7818L17.5 17.2184C17.5 15.0739 19.8037 13.7184 21.6784 14.7598L35.6854 22.5415Z" fill="currentColor"/>
</svg>
</>
);
{/* 
// type Props ={ 
//    class?:string;
//}

//export const PlayIcon = (props : Props) =>(
//<svg class={`${props.class??''}`} width="1em" height="1em"  viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
//<path d="M10 0.923096C4.46667 0.923096 0 5.38976 0 10.9231C0 16.4564 4.46667 20.9231 10 20.9231C15.5333 20.9231 20 16.4564 20 10.9231C20 5.38976 15.5333 0.923096 10 0.923096ZM7.48889 15.1453V6.70087L14.2 10.9231L7.48889 15.1453Z" fill="currentColor"/>
//</svg> */}
