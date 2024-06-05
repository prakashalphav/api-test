
type Props = {
    class? :string;
    style? :string;
}
export const WarningIcon = ( props :Props ) =>(<svg style={props.style??""} xmlns="http://www.w3.org/2000/svg" class={props.class||"last:"} width="1em" height="1em" viewBox="0 0 512 512"><path fill="currentColor" d="M449.07 399.08L278.64 82.58c-12.08-22.44-44.26-22.44-56.35 0L51.87 399.08A32 32 0 0 0 80 446.25h340.89a32 32 0 0 0 28.18-47.17Zm-198.6-1.83a20 20 0 1 1 20-20a20 20 0 0 1-20 20Zm21.72-201.15l-5.74 122a16 16 0 0 1-32 0l-5.74-121.95a21.73 21.73 0 0 1 21.5-22.69h.21a21.74 21.74 0 0 1 21.73 22.7Z"/></svg>
);