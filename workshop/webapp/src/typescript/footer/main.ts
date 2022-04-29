import {elements as elementFooter} from "./dom";
import {showScreen} from "../commons/utils";

export class Main {
    constructor() {
        this.eventListenerChangelog();
    }

    eventListenerChangelog = () => {
        elementFooter.changelogLink.addEventListener('click', (event) => {
            showScreen('changelog');
        })
    }
}