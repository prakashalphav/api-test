import { component$, useStylesScoped$  } from '@builder.io/qwik'; 
import styles from './ContactsBox1.scss?inline';  
import { PhoneIcon } from '../../../components/icons/Phone';
import { MailIcon } from '../../../components/icons/Mail';
import { MessageIcon } from '../../../components/icons/Message';

export type Props = {
    phone?: string | unknown,
    email?: string | unknown,
}
export default component$((props: Props) => {

    useStylesScoped$(styles);
    return ( 
    <>
        <div class="py-2.5 px-[40px] w-full sm:px-2.5 sm:w-1/2">
            <div class="contact-box text-center font-bold text-xl ml-auto mr-auto rounded-[20px] flex flex-wrap py-9 min-w-[280px]">
                <div class="w-full sm:w-1/2 lg:w-1/3 text-center mb-9">
                    <div class="pb-1"><span class="inline-block text-[47px]"><PhoneIcon bgColor='white' iconColor='black'></PhoneIcon></span></div>
                    <div class="text-sm desc-1">Hotline</div>
                    <div class="text-lg desc-2">{(props.phone ? `${props.phone}` :`001-100 010`)}</div>
                </div>
                <div class="w-full sm:w-1/2 lg:w-1/3 text-center mb-9">
                    <div class="pb-1"><span class="inline-block text-[47px]"><MailIcon bgColor='white' iconColor='black'></MailIcon></span></div>
                    <div class="text-sm desc-1">email with us</div>
                    <div class="text-lg desc-2">{(props.email ? `${props.email}` :`support@onix.com`)}</div>
                </div>
                <div class="w-full sm:w-1/2 lg:w-1/3 text-center mb-9">
                    <div class="pb-1"><span class="inline-block text-[47px]"><MessageIcon bgColor='white' iconColor='black'></MessageIcon></span></div>
                    <div class="text-sm desc-1">chat with us</div>
                    <div class="text-lg desc-2">{(props.phone ? `${props.phone}` :`001-100 010`)}</div>
                </div>
            </div>
        </div>
    </> 
    );<>
        
    </>;
});