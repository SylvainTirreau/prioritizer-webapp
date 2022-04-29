import {elements as elementsChangelog} from "./dom";
import {showScreen} from "../commons/utils";

export class Main {
    constructor() {
        this.eventListenerCloseBtn();
    }

    eventListenerCloseBtn = () => {
        elementsChangelog.changelogClose.addEventListener('click', ()=> {
            showScreen('home');
        })
    }
}