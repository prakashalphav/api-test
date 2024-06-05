import { component$, useStylesScoped$ , } from "@builder.io/qwik";
import styles from "./ContactsBox2.scss?inline";
import { PhoneIcon } from "../../../components/icons/Phone2";
import { MailIcon } from "../../../components/icons/Mail";
import { EmailIcon } from "~/components/icons/Email";
import { LineIcon } from "~/components/icons/Line";
import { SkypeIcon } from "~/components/icons/Skype";
import { HotlineIcon } from "~/components/icons/Hotline";
import {TelegramIcon } from "~/components/icons/Telegram";
import {TelegramArrowIcon } from "~/components/icons/TelegramArrow";
 
 
export type Props = { 
  contactLinks?: any;
  class?:string;
};


export default component$((props: Props) => {
  useStylesScoped$(styles);
 
 
  return (
    <>
      {!!props.contactLinks && 
      <div class={`${props.class??''} relative rounded-full p-12  js-aos`}>
      
       <TelegramArrowIcon class="icon__bg absolute center-pos p-14 z-10 "></TelegramArrowIcon>
        <ul class="content flex-center text-3xl">
        {(true || !!props.contactLinks.email.value) && <li class="">
           <a href={props.contactLinks.email.url} class="block w-full h-full rounded-inherit animate"  anime-name="scale-in-center">

            <div class="circle  w-full h-full rounded-inherit  flex-center email "  >
                  <EmailIcon></EmailIcon>
              </div>
           </a>
          </li>
             }
             {(true ||  !!props.contactLinks.whatsapp.value) && 
          
          <li class="">
          <a  href={props.contactLinks.phone.url } class="block w-full h-full rounded-inherit animate"  anime-name="scale-in-center">
        <div class="circle  w-full h-full rounded-inherit  flex-center hotline  ">
                <HotlineIcon></HotlineIcon>
            </div>
            </a>
          </li>
             }
             {(true || !!props.contactLinks.skype.value) && 
          
          <li class="" >
          <a  href={props.contactLinks.skype.url } class="block w-full h-full rounded-inherit animate" anime-name="scale-in-center">
            <div class="circle  w-full h-full rounded-inherit  flex-center skype " >
                <SkypeIcon></SkypeIcon>
            </div>
            </a>
          </li>
             }
             {(true || !!props.contactLinks.line.value) && 
          
          <li class="" >
          <a  href={props.contactLinks.line.url } class="block w-full h-full rounded-inherit animate" anime-name="scale-in-center">
            <div class="circle  w-full h-full rounded-inherit  flex-center line " >
                <LineIcon></LineIcon>
            </div>
            </a>
          </li>
             }
             {(true ||  !!props.contactLinks.TelegramName.value) && 
          
          <li class="" >
               <a  href={props.contactLinks.TelegramName.url } class="block w-full h-full rounded-inherit animate" anime-name="scale-in-center"> 
            <div class="circle  w-full h-full rounded-inherit  flex-center telegram " >
                <TelegramIcon></TelegramIcon>
            </div>
            </a>
          </li>
             }
             {(true || !!props.contactLinks.phone.value) && 
          
          <li class="" >
          <a  href={props.contactLinks.phone.url } class="block w-full h-full rounded-inherit animate" anime-name="scale-in-center">
            <div class="circle  w-full h-full rounded-inherit  flex-center phone " >
                <PhoneIcon></PhoneIcon>
            </div>
            </a>
          </li>
             }           
        </ul>
      </div>
        }
    </>
    
  );
  <></>;
});
