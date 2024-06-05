# v2nsfrontends

DOs :

1. Always componenize as much possibles so that the module and components are not bloated. This simplifies the module/component code , and we are able to reuse the components in multiple places.

2. always put logic in a central location such as hook or function even if it just one line. this is so that we don't have to duplicate logic anywhere, and when logic needs to be chged , we only need to change at one source. 


3. ALWAYS STRIVE FOR simplicity in your code without unnecessary complexity! Writing code that is easy to read, understand, and modify is crucial for creating scalable and adaptable software. It helps developers to avoid common mistakes and reduce the likelihood of bugs and errors. This includes for everything , code in templates and  functions , in html , CSS , javascript/php.

4. Always write comments where needed so that other team mates and yourself can easily understand your coding choices or  code flow or business logic. Remember, after a month or two, you will forget why you had written some particular code that way. 

5. READ THIS CSS standard practice: https://docs.google.com/document/d/1g_sN9CkzF0BofIdY4sVnysCYRM8OQKlvmRQaT5UYEE4/edit



6. read the materials in ./onix-app/docs/* 

7. Read README.md files that is in any folder you see. hence the name Readme!

8. remember that components are independent UI units. do not hardcode the gaps / margins between other components inside the component. Those gaps/margins should be put at the parent where you use the component , u may pass them to the component "props.class" from the parent. All components must manual put "class? :string" prop in its Props. 


Don'ts :

1. Don't copy and paste code , make into a function or component and reuse it.

Lastly :
Please use your discretion and common sense, as a developer should, we are not robots. Rules are flexible if there is justifiable reason that the rule is not appropriate in some cases.