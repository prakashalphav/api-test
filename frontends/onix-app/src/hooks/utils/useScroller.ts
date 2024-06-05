import { $ } from "@builder.io/qwik";

export const useScroller = (scrollEleSelecter :string ,scrollAmt:number)=>{


    const onSideScroll =  $(  ( direction : "left"|"right"  ) =>{ 
        const nav = document.querySelector(scrollEleSelecter);
    
        if(nav){
            if(direction === 'left'){
                nav.scrollLeft -= scrollAmt;
            }
            else {
                nav.scrollLeft += scrollAmt;
            }
        }
     
    });

    const scrollToElement = $((selectedElement: string) => {
        const nav = document.querySelector(scrollEleSelecter);
        const selectedItem = document.querySelector(scrollEleSelecter + ' ' + selectedElement);
        if (nav && selectedItem) {
            const left = selectedItem.offsetLeft;
            const contWidth = nav.offsetWidth / 2;
            const scrollLeftDistance = left - contWidth;
            nav.scrollLeft += scrollLeftDistance;
        }
    });

    return {onSideScroll, scrollToElement}
}