import {elements} from "./dom";
import {elements as elementsHome} from "../home/dom";
import {Main as computeList} from "../computeList/main";

export class Main {

    constructor() {
        this.eventListenerTextarea();
    }

    eventListenerOutsideTextarea = (event: any) => {
        if (!elements.newList.contains(event.target)) {
            this.disableTextarea();
        }
    }

    disableTextarea = () => {
        elements.newList.classList.add('inactive');
        elements.newList.blur();
        window.removeEventListener('click', this.eventListenerOutsideTextarea);
    }

    eventListenerTextarea = () => {
        elements.newList.addEventListener('click', (event) => {
            if (elements.newList.classList.contains('inactive')) {
                elements.newList.classList.remove('inactive');
                window.addEventListener('click', this.eventListenerOutsideTextarea);
            } else {
                this.disableTextarea();
            }
        })
        elements.newList.addEventListener('input', (event) => {
            let lineBreak;
            let value = (<HTMLTextAreaElement>elements.newList).value;
            (value.indexOf('\n') != -1) ? lineBreak = true : lineBreak = false;

            if (lineBreak) {
                (<HTMLButtonElement>elements.btnComputeList).disabled = false;
                (<HTMLButtonElement>elements.btnComputeList).addEventListener('click', this.eventListenerComputeBtn);
            } else {
                (<HTMLButtonElement>elements.btnComputeList).disabled = true;
                (<HTMLButtonElement>elements.btnComputeList).removeEventListener('click', this.eventListenerComputeBtn);
            }
        })
    }

    buildList = () => {
        if ((<HTMLTextAreaElement>elements.newList).value.indexOf('\n') != -1) {
            let listArray = (<HTMLTextAreaElement>elements.newList).value.split('\n');
            let result:{ [index: string]: string } = {};
            let i = 1;
            for (let item of listArray) {
                result[i.toString()] = item;
                i += 1;
            }
            return result;
        } else {
            console.error("Il n'y a pas de saut de ligne détecté !")
            return null;
        }
    }

    eventListenerComputeBtn = (event: any) => {
        elementsHome.screenNewList.classList.add('hide-screen');
        elementsHome.screenComputeList.classList.remove('hide-screen');
        let list:{ [index: string]: string };

        let buildList = new Promise((resolve, reject) => {
            list = this.buildList();
            resolve("List built.");
            reject("List not built.");
        })

        buildList.then(() => {
            let cl = new computeList(list);
            cl.launch();
        })
    }
}