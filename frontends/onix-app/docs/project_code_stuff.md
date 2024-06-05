# Game Launch Links

the link button code copy this for launch of the game since the type is `Provider` : 
https://prnt.sc/bdo00W15w_Dt

# QRLs
if the function is wrap in $, should end function name with QRL, this is to indicate the function is lazy loaded 

if ur functon is wrap in $ e.g. 

export const onClickSubmitQRL = $(()=>{  ... })
## i18n - language translate
1. import the lib `import {  inlineTranslate,  } from 'qwik-speak';`

2. then instantiate the `t` translate function by  `const t = inlineTranslate();` in the component / hook 
- use like this `t('{asset}.{key}@@{default value in english}')`

- available assets under /i18n are:
`app`  -> this is globally available 
`events`
`home`
`profile`
`referral`
`wallet`
`runtime` -> this is globally available 

- to use other assets , declare `useSpeak({assets:['home','events'],}); ` in the most parent file which is index.tsx in the /routes one time only . 

- Split the keys in different assets  so as to separate some keys that only used in certain modules

- if the text is very long or is our system messages to user then use short form : e.g. `t('wallet.DepositFormConsent@@I have read and agree to the Promotion Terms and Conditions. We do not accept the type of deposit in the form of a cheque. All types of payments in the form of checks to our account will be ignored')`  Otherwise just use back same english text as the key so to avoid duplicate values but different keys. DO NOT USE full capital on the key values, best is put capitalized (first letter is capital). Casing should handle using javascript functions toLowerCase , toUpperCase or capitalize function in utils/commmon. When doing translation in the .json , the keys are by alphabet order socan see if similar remove them and use back same key to minimize translations.



- {default value in english} is a Must. e.g `t('app.Password@@Password')`
More on https://github.com/robisim74/qwik-speak/blob/main/docs/translate.md

3. then run `npm run qwik-speak-extract`, and the keys with its default value will be auto added to the assets, for other languages not "en" need to translate it in the assets .json.


4. for dynamic keys, Make sure the keys are in 'runtime.json'
e.g. 
dynamic key: `t(item.method_name)` -> put all the possible "item.method_name" keys and its value in the runtime.json. 
More on https://github.com/robisim74/qwik-speak/blob/main/docs/translate.md

3.  if using `t` inside a function , need to instantiate the `t` again. 
```
e.g. const fnExampleQRL = $(()=>{
  const t = inlineTranslate();

  return t('app.key@@value');
       
})

const fnExample =  ()=>{
  const t = inlineTranslate();

  return t('app.key@@value');
       
} 

```

4. Demos/Themes:

For demos, using css variables in /public/css/themes. If change any value there need to manually add version in /routes/layout.tsx search ".css" as https://prnt.sc/rQ_i3fnrapQX

5. cater different template have diff font family
http://ghtrepo.hippo-server.com/seamlessapp/v2nsfrontends/commit/48bc71bd0f18bf6449c56a8ef15c2cae3e2abab1

6. for content UI that against the page, need to set a width limit using  `.max-w-screen--xs-full` or `.max-w-screen` classes (see global.scss for more details ). The content may not include the background, as depending on the design, the  backgrounds of the content  may need to be  `w-full`

ald done for wingaming , pls reference it and chg for ur template u re doing: 
http://ghtrepo.hippo-server.com/seamlessapp/v2nsfrontends/merge_requests/393/diffs

- `.max-w-screen--xs-full` is for the content on mobile to be full width . Such as Sliding Banner Section.
- otherwise use , `.max-w-screen` will set 12px left right margin on mobile.
both classes will set max width 1330px for screen above 1440px width .
- (abv ald inform to designer to update in the design , if u found the design not yet update still , pls inform to designer) 

No more using max-w-screen-2xl , because this too large


# Debug the API
https://prnt.sc/kSfXiKIsVE4z
to debug the v2ns frontends API , can use throw exception  `throw new \Exception(json_encode($data)) ` , it will show on the UI else in network tab
dd() is harder to chk


