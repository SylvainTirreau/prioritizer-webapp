import {elements as elementFooter} from "./dom";
import {showScreen} from "../commons/utils";

export class Main {
    constructor() {
        this.eventListenerChangelog();
        this.eventListenerContactIcon();
    }

    eventListenerChangelog = () => {
        elementFooter.changelogLink.addEventListener('click', (event) => {
            showScreen('changelog');
        })
    }

    eventListenerContactIcon = () => {
        elementFooter.contactIcon.addEventListener('click', (event) => {
            showScreen('contact');
        })
    }
}