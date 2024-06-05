import { component$ ,useStylesScoped$, Slot } from '@builder.io/qwik'; 
import styles from './PlatformProvider1.scss?inline';
import { inlineTranslate} from 'qwik-speak';

type Props = {
    websiteLogo? :string;
    appSubSkin? :string;
    class? :string;
};

export default component$((props: Props) => {
    useStylesScoped$(styles);
    const t = inlineTranslate();

    let platformLogo = null;
    if (props.appSubSkin === 'vega') {
        platformLogo = 'https://files.sitestatic.net/assets/imgs/platform/vegaGaming.webp';
        
    }
    else if(props.appSubSkin === 'onixgaming'){
        platformLogo = 'https://files.sitestatic.net/assets/imgs/platform/onix-logo.webp';
    }
    else{
        platformLogo = props.websiteLogo;
    }

    return <>
         <img class={props.class  +' '} 
                     src={platformLogo} 
                     width="128" height="50"
                     loading="lazy"
                     decoding="async"
                     alt={t('app.Platform Service Provider@@Platform Service Provider')}
                     />
    </>;
})