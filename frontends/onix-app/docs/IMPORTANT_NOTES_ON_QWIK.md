

HOW TO LEARN : GO THRU THE Docs on QWIK THEN USE THE TUTORIAL
https://qwik.builder.io/tutorial/welcome/overview/


IMPORTANT THINGS TO NOTE ( if anything don't understand then ask )

1. how to Use $   
https://qwik.builder.io/tutorial/qrl/


(this point seems to be depreciated)
<!-- 2. Do not pass Signals into child components. 
a. Do this  <Child prop={signal.value}/>  to display the signal value in the child. 
b. To set the signal value use ,do like this  <Child onClickMenu$={onClickMenuQRL} />  where onClickMenuQRL is $(()->{ signal.value  = false;  ... }); (see this   https://qwik.builder.io/tutorial/props/closures/#declaring-callback-props) -->


3. Always try to use signals instead of store unless your data has many nested values that need to keep track of changes. Signals are faster for performance.

Example on using signals :
signals can only keep reassign a new value for it, changing any nested properties in its value will not give reactivity: 
signal.value = new_data_obj
signal.value.new_data_obj.prop = new_value; -> this will not cause any reactivity

do this instead :

const signal = useSignal(data_obj);
const signal2 = useSignal(data_obj.prop);
signal.value = new_data_obj;
signal2.value= new_value;

if you do not know the difference btw signals and store . please read the guide first and if still don't know ask your colleagues.


4. Destructing props is anti-pattern in qwik. Hence do not destructure the props of component  

Example : 
IF props of a component is: 
type Props = {p1 : string , p2 : string  ,  p3 : string...}

This following is INCORRECT : 
component$( ({p1, p2, p3} : Props)  => ({p1 + p2 + p3 } ) )   

This following is CORRECT : 
component$( ( props  : Props)  => ({props.p1 + props.p2 + props.p3 } ) )   


5. make sure your file does not show Red from the eslint checking. Fix the red warnings seen on the code. Else the production build not able to compile success.


https://prnt.sc/HHjAs9D5cVH6

https://prnt.sc/69j4diOVZYpZ



6. the pages cannot call multiple loader$ , only can call 1. so if u need to use more than one, have to do like below  sample in homepage
https://prnt.sc/SdINtcPTiMcb


export const useGetHomeData = routeLoader$( async ( ev) => {
  
 const commonData= await ev.resolveValue(useGetCommonViewData); //--> this is Signal 
 const homeData = getHomeData(ev); //--> this is Promise
 return  {commonData , homeData};  
});
  

The promise you can use below to resolve 
<Resource value={homeData} 
              onPending={() => <div>Loading...</div>}
              onRejected={() => <div>Error</div>}
              onResolved={(hd) =>()}/>
