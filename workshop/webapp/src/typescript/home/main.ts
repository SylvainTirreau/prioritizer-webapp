import {elements} from "./dom";
import {showScreen} from "../commons/utils";

export class Main {

    constructor() {
        this.eventListenerNewList();
    }

    eventListenerNewList = () => {
        elements.btnCreateList.addEventListener('click', () => {
            showScreen('new-list');
        })
    }
}