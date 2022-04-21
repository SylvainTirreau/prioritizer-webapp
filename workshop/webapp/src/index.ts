import "./scss/main.scss";
import "../node_modules/promise-polyfill/src/polyfill";
import {Main as Test} from "./typescript/test/main";
import {mokeList} from "./typescript/test/data";

window.addEventListener("DOMContentLoaded", (event) => {
    let app = new Main();
    app.start();
});

class Main {
    test: any;

    constructor() {
        let test = new Test(mokeList);
    }

    start() {

    }
}