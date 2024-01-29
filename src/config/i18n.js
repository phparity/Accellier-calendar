import i18next from 'i18next'
import LanguageDetector from "i18next-browser-languagedetector"
import {initReactI18next} from 'react-i18next'
import HttpApi from 'i18next-http-backend';
import languageEN from '../config/en/translate.json'
import languageEN_GB from '../config/en_GB/translate.json'

i18next
.use(HttpApi)
.use(LanguageDetector)
.use(initReactI18next)
.init({
    resources: {
        en: languageEN,
        en_GB: languageEN_GB
    },
    /* default language when load the website in browser */
    
    lng: "en",
    /* When react i18next not finding any language to as default in borwser */
    // fallbackLng: "en",
    /* debugger For Development environment */
    debug: false,
    ns: ["translations"],
    defaultNS: "translations",
    keySeparator: ".",
    interpolation: {
        escapeValue: false,
        formatSeparator: ","
    },
    react: {
        wait: true,
        bindI18n: 'languageChanged loaded',
        bindStore: 'added removed',
        nsMode: 'default'
    }
})

export default i18next;