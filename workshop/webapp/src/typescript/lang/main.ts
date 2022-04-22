import {texts as textsFr} from "./translations/fr";
import {texts as textsEn} from "./translations/en";
import {elements as headerElements} from "../header/dom";

const localesMapping: {[index:string]: any} = {
    'fr': textsFr,
    'en': textsEn
}

export const setPageLanguage = (lang: string=(<HTMLSelectElement>headerElements.languageSelector).value) => {
    document.documentElement.lang = lang;
}

export const loadTexts = (lang: string=(<HTMLSelectElement>headerElements.languageSelector).value) => {
    let elements = document.getElementsByClassName('prtz-i18n');
    Array.from(elements).forEach(function (element) {
        element.innerHTML = localesMapping[lang][element.id.split('i18n-')[1]];
    });
}