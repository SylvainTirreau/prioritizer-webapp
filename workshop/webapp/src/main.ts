import "./scss/main.scss";
import "../node_modules/promise-polyfill/src/polyfill";
import {Main as Header} from "./typescript/header/main";
import {Main as Home} from "./typescript/home/main";
import {loadTexts, setPageLanguage, localesMapping} from "./typescript/lang/main";

window.addEventListener("DOMContentLoaded", (event) => {
    let app = new Main();
    app.start();
});

interface Navigator {
  userLanguage?: string;
  browserLanguage?: string;
  languages: readonly string[];
  language: string;
}

const navigator: Navigator = window.navigator;

class Main {
    home: any;
    header: any;
    userLanguage: any;

    constructor() {
        this.header = new Header();
        this.home = new Home();
        let tmpLanguage = navigator['userLanguage'] || window.navigator.language;
        this.userLanguage = tmpLanguage.split('-')[0];
    }

    start() {
        (Object.keys(localesMapping).indexOf(this.userLanguage) != -1) ? setPageLanguage(this.userLanguage) : setPageLanguage();
        loadTexts();
    }
}