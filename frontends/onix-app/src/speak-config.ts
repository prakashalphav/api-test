import type { SpeakConfig } from 'qwik-speak';

export const config: SpeakConfig = {
  defaultLocale: { lang: 'en',  },
  supportedLocales: [
    { lang: 'en',  },
    { lang: 'id',   },
    {lang: 'cn', }
  ],
  assets: [
    'app' // Translations shared by the pages
  ],
  runtimeAssets: [
    'runtime' // Translations with dynamic keys or parameters
  ]
};