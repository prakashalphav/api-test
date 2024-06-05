import type { ProviderGameItem } from "~/services/types";

export type Props = {
    providerGameItem: ProviderGameItem;
    class?: string;
    imgDprList? : number[];// game image dpr list,  if not assigned , default is [1, 2, 3]
    
    
    noAdjustTransformOrigin? : boolean; // only need for components that use "adjust-transform-origin" utility class  , is used to disable it . default will have  
    noScaleOnHover? : boolean; // only need for components that have scale larger on hover , is used to disable it . default will have scale larger on hover 
  };
 