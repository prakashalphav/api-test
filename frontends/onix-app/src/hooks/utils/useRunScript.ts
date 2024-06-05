import { $ } from "@builder.io/qwik";

export const useRunScript = ( ) => {

    const runScriptOnBrowser = $((script : string|null|undefined)=>{

        if (typeof document !== "undefined" && script) {
            
            const _script = script.replace(/<\/?script>/g, "").replace(/<noscript>[\s\S]*?<\/noscript>/gi, '');

            console.log("_script", _script)
            eval(_script);
          }
    })

    return {runScriptOnBrowser}
}