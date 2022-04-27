import {showScreen} from "../commons/utils";
import {createSpan} from "../commons/dom";
import {elements as elementsModal} from "./dom";
import {loadTexts} from "../lang/main";

export class Main {
    validationValue: boolean;

    constructor(messageId: string) {
        showScreen('modal');
        this.validationValue = null;
        this.loadText(messageId);
    }

    loadText = (messageId: string) => {
        let insertText = new Promise((resolve, reject) => {
            elementsModal.modalText.innerHTML = "";
            let span = createSpan("i18n-" + messageId, ['prtz-i18n']);
            elementsModal.modalText.appendChild(span);
            resolve("Text inserted.");
            reject("Text not inserted.");
        })

        insertText.then(() => {
            loadTexts();
            this.eventListenerBtns();
        })
    }

    eventListenerBtns = () => {
        elementsModal.modalBtnOk.addEventListener('click', this.validation, {once: true})
        elementsModal.modalBtnCancel.addEventListener('click', this.cancel, {once: true})
    }

    validation = () => {
        elementsModal.modalBtnCancel.removeEventListener('click', this.cancel);
        this.validationValue = true;
    }

    cancel = () => {
        elementsModal.modalBtnOk.removeEventListener('click', this.cancel);
        this.validationValue = false;
    }

    waitClick() {
        return new Promise(resolve => {
            let checkResponse = () => {
                setTimeout(() => {
                    if (this.validationValue == null) {
                        checkResponse();
                    } else {
                        elementsModal.screenModal.classList.add('hide-element');
                        resolve(this.validationValue);
                    }
                }, 500);
            }
            checkResponse();

        });
    }

}