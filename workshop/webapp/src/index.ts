import "./scss/main.scss";
import "../node_modules/promise-polyfill/src/polyfill";
import {Main as Header} from "./typescript/header/main";
import {Main as Home} from "./typescript/home/main";
import {Main as NewList} from "./typescript/newList/main";
import {loadTexts, setPageLanguage} from "./typescript/lang/main";

window.addEventListener("DOMContentLoaded", (event) => {
    let app = new Main();
    app.start();
});

class Main {
    home: any;
    header: any;

    constructor() {
        this.header = new Header();
        this.home = new Home();
        // Todo : à rebasculer dans l'event listenter du home main
        new NewList();
    }

    start() {
        setPageLanguage();
        loadTexts();
    }
}