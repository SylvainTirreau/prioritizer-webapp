import {elements as elementsNewList} from "./dom";
import {Main as computeList} from "../computeList/main";
import {showScreen} from "../commons/utils";

export class Main {

    constructor() {
        this.eventListenerTextarea();
    }

    eventListenerOutsideTextarea = (event: any) => {
        if (!elementsNewList.newList.contains(event.target)) {
            this.disableTextarea();
        }
    }

    disableTextarea = () => {
        elementsNewList.newList.classList.add('inactive');
        elementsNewList.newList.blur();
        window.removeEventListener('click', this.eventListenerOutsideTextarea);
    }

    eventListenerTextarea = () => {
        elementsNewList.newList.addEventListener('click', (event) => {
            if (elementsNewList.newList.classList.contains('inactive')) {
                elementsNewList.newList.classList.remove('inactive');
                window.addEventListener('click', this.eventListenerOutsideTextarea);
            } else {
                this.disableTextarea();
            }
        })
        elementsNewList.newList.addEventListener('input', (event) => {
            let lineBreak;
            let emptyLine = false;
            let value = (<HTMLTextAreaElement>elementsNewList.newList).value;
            let lines = value.split('\n');
            for (let item of lines) {
                if (item == "") emptyLine = true;
            }
            (value.indexOf('\n') != -1) ? lineBreak = true : lineBreak = false;

            if (lineBreak && !emptyLine) {
                (<HTMLButtonElement>elementsNewList.btnComputeList).disabled = false;
                (<HTMLButtonElement>elementsNewList.btnComputeList).addEventListener('click', this.eventListenerComputeBtn);
            } else {
                (<HTMLButtonElement>elementsNewList.btnComputeList).disabled = true;
                (<HTMLButtonElement>elementsNewList.btnComputeList).removeEventListener('click', this.eventListenerComputeBtn);
            }
        })
    }

    buildList = () => {
        if ((<HTMLTextAreaElement>elementsNewList.newList).value.indexOf('\n') != -1) {
            let listArray = (<HTMLTextAreaElement>elementsNewList.newList).value.split('\n');
            let result: { [index: string]: string } = {};
            let i = 1;
            for (let item of listArray) {
                if (item != "") {
                    result[i.toString()] = item;
                    i += 1;
                }
            }
            return result;
        } else {
            console.error("Il n'y a pas de saut de ligne détecté !")
            return null;
        }
    }

    eventListenerComputeBtn = (event: any) => {
        showScreen('compute-list');
        let list: { [index: string]: string };

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