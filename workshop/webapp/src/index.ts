import "./scss/main.scss";
import "../node_modules/promise-polyfill/src/polyfill";
import {Main as Home} from "./typescript/home/main";
import {Main as NewList} from "./typescript/newList/main";
import {mokeList} from "./typescript/computeList/data";
import {loadTexts, setPageLanguage} from "./typescript/lang/main";
import {elements as headerElements} from "./typescript/header/dom";

window.addEventListener("DOMContentLoaded", (event) => {
    let app = new Main();
    app.start();
});

class Main {
    computeList: any;
    home: any;

    constructor() {
        this.home = new Home();
        // Todo : à rebasculer dans l'event listenter du home main
        new NewList();
        this.eventListenerLanguageSelector();

    }

    start() {
        setPageLanguage();
        loadTexts();
    }

    eventListenerLanguageSelector() {
        headerElements.languageSelector.addEventListener('change', function() {
            setPageLanguage((<HTMLSelectElement>this).value);
            loadTexts((<HTMLSelectElement>this).value);
        })
    }
}