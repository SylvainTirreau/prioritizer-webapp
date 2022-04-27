import {elements as headerElements} from "./dom";
import {loadTexts, setPageLanguage} from "../lang/main";
import {showScreen} from "../commons/utils";
import {Main as Modal} from "../modal/main";

export class Main {
    validationResult: boolean;

    constructor() {
        this.eventListenerLanguageSelector();
        this.eventListenerSiteName();
    }

    async askConfirmation(headerThis: any) {
        let modal = new Modal("list-opened");
        headerThis.validationResult = await modal.waitClick();
        return this.validationResult;
    }

    eventListenerSiteName() {
        headerElements.siteName.addEventListener('click', (event) => {
            if (event.target instanceof HTMLHeadingElement) {
                if (event.target.dataset.current == "compute-list") {
                    this.askConfirmation(this).then(() => {
                        (this.validationResult) ? showScreen('home') : showScreen('compute-list');
                    });
                } else if (event.target.dataset.current == "new-list") {
                    showScreen('home');
                } else {
                    showScreen('home');
                }
            }
        })
    }

    eventListenerLanguageSelector() {
        headerElements.languageSelector.addEventListener('change', function () {
            setPageLanguage((<HTMLSelectElement>this).value);
            loadTexts((<HTMLSelectElement>this).value);
        })
    }
}