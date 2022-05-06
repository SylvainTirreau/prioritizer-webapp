import {elements as elementsContact} from "./dom";
import {sendEmail, showScreen} from "../commons/utils";

export class Main {
    constructor() {
        this.eventListenerSendMail();
        this.eventListenerCloseBtn();
    }

    eventListenerSendMail = ()=> {
        elementsContact.sendMailBtn.addEventListener('click', ()=> {
            sendEmail('c3lsdmFpbkBzb3J0bGlzdHMuYXBw');
        })
    }

    eventListenerCloseBtn = () => {
        elementsContact.contactClose.addEventListener('click', ()=> {
            showScreen('home');
        })
    }
}