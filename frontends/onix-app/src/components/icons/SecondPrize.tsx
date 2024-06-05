type Props ={
    id? : string;  // this id needed if one page reuse same icon (id cannot duplicate)
}
export const SecondPrizeIcon= (props : Props)=>(
<svg width="1em" height="1em" viewBox="0 0 48 42" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<rect x="0.666626" width="47.1579" height="42" fill={`url(#patternSecondPrize${props.id})`}/>
<defs>
<pattern id={`patternSecondPrize${props.id}`} patternContentUnits="objectBoundingBox" width="1" height="1">
<use xlink:href={`#image0_93_14007${props.id}`} transform="scale(0.015625 0.0175439)"/>
</pattern>
<image id={`image0_93_14007${props.id}`} width="64" height="64" xlink:href="data:image/png;base64,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"/>
</defs>
</svg>

);