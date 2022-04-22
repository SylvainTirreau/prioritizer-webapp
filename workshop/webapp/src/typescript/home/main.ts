import {elements} from "./dom";

export class Main {

    constructor() {
        this.eventListenerNewList();
    }

    eventListenerNewList = () => {
        elements.btnCreateList.addEventListener('click', () => {
            elements.screenHome.classList.add('hide-screen');
            elements.screenNewList.classList.remove('hide-screen');
        })
    }
}