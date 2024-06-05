/// <reference types="vite/client" />
import { fileURLToPath, URL } from "node:url";
import { defineConfig, splitVendorChunkPlugin } from "vite";
import { qwikVite, type QwikVitePluginOptions } from "@builder.io/qwik/optimizer";
import { qwikCity } from "@builder.io/qwik-city/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { partytownVite } from "@builder.io/partytown/utils";
import { join } from "path";
import { qwikSpeakInline } from 'qwik-speak/inline';

// const themeFolder = process.env.THEME;

export default defineConfig(() => {
  return {
    plugins: [
      qwikCity(),
      qwikVite({
        // client: {
        //   outDir: `dist/${themeFolder}/`, // This is the right setting
        // }, 
        // ssr :{
        //   outDir: `server/${themeFolder}/`,
        // }
      } as QwikVitePluginOptions),
      qwikSpeakInline({
        basePath: './',
        assetsPath: 'i18n',
        supportedLangs: ['en', 'id','cn'],
        defaultLang: 'en'
      }),
      tsconfigPaths(),
      partytownVite({ dest: join(__dirname, "dist", "~partytown") }),
    ],
    preview: {
      headers: {
        "Cache-Control": "public, max-age=600",
      },
    }, 
    resolve: {
      // alias: {
      //   "@themes": fileURLToPath(
      //     new URL(`./src/themes/${themeFolder}`, import.meta.url),
      //   ),
      // },
    },
    worker: {
      format: "es"
    },
    ssr: {
      // external : ['@easepick/core','@splidejs/splide'  ],
      noExternal: ["@splidejs/splide"],
    },
  };
});
