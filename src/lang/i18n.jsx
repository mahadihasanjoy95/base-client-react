import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import en from "./en.json"
import bn from "./bn.json"

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        // we init with resources
        resources: {
            en: {
                translations: en
            },
            bn: {
                translations: bn
            }
        },
        fallbackLng: "en",
        // lng: 'en', // default language
        debug: false,

        // have a common namespace used around the full app
        ns: ["translations"],
        defaultNS: "translations",

        // keySeparator: false, // we use content as keys

        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
