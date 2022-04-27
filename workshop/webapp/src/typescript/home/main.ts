import {elements} from "./dom";
import {showScreen} from "../commons/utils";
import {Main as NewList} from "../newList/main";

export class Main {

    constructor() {
        this.eventListenerNewList();
    }

    eventListenerNewList = () => {
        elements.btnCreateList.addEventListener('click', () => {
            new NewList();
            showScreen('new-list');
        })
    }
}