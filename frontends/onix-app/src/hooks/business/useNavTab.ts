import { $, type Signal,} from '@builder.io/qwik';


export const useNavTab = (selCategory: Signal<string>) => {
    const onSelCategoryQRL =  $((selMenu : string)=>{
        selCategory.value=   selMenu;
    });
return {onSelCategoryQRL} ;
}

