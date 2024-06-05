export const StrikedText = (props: { text: string, isStrike : boolean }) => {
    return props.isStrike ? (<strike>{props.text}</strike>) : (<span>{props.text}</span>) ;
};