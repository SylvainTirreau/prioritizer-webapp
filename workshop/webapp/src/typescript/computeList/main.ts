import {elements as elementsComputeList} from "./dom";
import {createButton, createDiv, createParagraph, createSpan} from "../commons/dom";
import {getAllPairs, arrayNotInInArray, toTime, range} from "../commons/utils";
import {loadTexts} from "../lang/main";

export class Main {
    list: { [index: string]: string };
    questionStep: number;
    questionIter: number;
    couplesToCompute: any[];
    pairsComputed: string[];
    pairsTransitivityApplied: string[];
    pairSequences: [string, string][];
    finalSequences: any[];
    timeleft: string;
    allPairs: string[];
    results: { [index: string]: number };
    loosers: string[];
    estimatedSeconds: number;
    startDate: any;
    firstComputing: boolean;

    constructor(list: {}) {
        this.list = list;
        this.pairsComputed = [];
        this.pairsTransitivityApplied = [];
        this.couplesToCompute = [];
        this.pairSequences = [];
        this.finalSequences = [];
        this.allPairs = [];
        this.questionStep = 1;
        this.questionIter = 1;
        this.results = {};
        this.loosers = [];
        this.estimatedSeconds = 0;
        this.firstComputing = true;
        elementsComputeList.timeLeft.innerHTML = "";
    }

    launch = () => {
        this.generateAllPairs();
        this.initQuestions();
    }

    generateAllPairs() {
        let combinations = getAllPairs(Object.keys(this.list));
        for (let pair of combinations) {
            let key = pair.join('_');
            this.allPairs.push(key);
        }
    }

    computeCouples = () => {
        this.couplesToCompute = [];
        let firstNumber = this.questionStep;
        let secondNumber = this.questionStep + this.questionIter;
        for (let number of range(this.questionStep, Object.keys(this.list).length, this.questionIter)) {
            let couple = [firstNumber, secondNumber];
            if (this.pairsComputed.indexOf(couple.join('_')) == -1 && secondNumber <= Object.keys(this.list).length) this.couplesToCompute.push(couple);
            firstNumber = secondNumber;
            secondNumber = secondNumber + this.questionIter;
        }
        this.questionIter += 1;
        if (this.couplesToCompute.length == 0) {
            this.generateCouples();
        }
    }

    generateCouples = () => {
        if (this.questionStep + this.questionIter <= Object.keys(this.list).length) {
            this.computeCouples();
        } else {
            if (this.questionStep != Object.keys(this.list).length - 1) {
                this.questionStep += 1;
                this.questionIter = 1;
                this.computeCouples();
            }
        }
    }

    initProgressBar = () => {
        (<HTMLProgressElement>elementsComputeList.progressBar).max = this.allPairs.length / 2;
    }

    setProgressValue = (last: boolean = false) => {
        if (last) {
            (<HTMLProgressElement>elementsComputeList.progressBar).value = this.allPairs.length / 2;
        } else {
            (<HTMLProgressElement>elementsComputeList.progressBar).value = this.pairsComputed.length / 2;
        }
    }

    initQuestions = () => {
        let generateCouples = new Promise((resolve, reject) => {
            this.generateCouples();
            resolve("Couples generated.");
            reject("Couples not generated.");
        })

        generateCouples
            .then(() => {
                this.initProgressBar();
            })
            .then(() => {
                this.writeButtons();
            })
    }

    writeButtons = () => {
        elementsComputeList.combinations.innerHTML = "";
        if (this.couplesToCompute.length > 0) {
            let i = 1;
            for (let couple of this.couplesToCompute) {
                let showHiddenClass: string;
                (i == 1) ? showHiddenClass = 'show' : showHiddenClass = 'hidden';
                let wrapperId = "btn-wrapper-" + i.toString();
                let coupleId = couple.join('_');
                let twinId = [couple[1], couple[0]].join('_');
                let wrapper = createDiv(wrapperId, ["btn-wrapper", "d-flex", "flex-column", showHiddenClass]);
                let wrapperBtn1 = createDiv(null, ["d-flex", "justify-content-center"]);
                let wrapperBtn2 = createDiv(null, ["d-flex", "justify-content-center"]);
                let btn1 = createButton(null, ['btn', 'btn-primary', 'btn1'], null, {
                    "id": couple[0],
                    "couple": coupleId,
                    "iter": i.toString()
                }, null, null, this.list[couple[0]]);
                let btn2 = createButton(null, ['btn', 'btn-primary', 'btn2'], null, {
                    "id": couple[1],
                    "couple": coupleId,
                    "iter": i.toString()
                }, null, null, this.list[couple[1]]);

                btn1.addEventListener('click', () => {
                    this.computeChoiceAndLoadNext(btn1);
                })

                btn2.addEventListener('click', () => {
                    this.computeChoiceAndLoadNext(btn2);
                })

                wrapperBtn1.appendChild(btn1);
                wrapperBtn2.appendChild(btn2);
                wrapper.appendChild(wrapperBtn1);
                wrapper.appendChild(wrapperBtn2);
                elementsComputeList.combinations.appendChild(wrapper);
                i += 1;
            }
        } else {
            if (this.allPairs.filter(n => !this.pairsComputed.includes(n)).length / 2 == 0) {
                this.computePriorities();
            } else {
                console.error("Il ne devrait pas rester des paires non calculées. Or, il en reste", this.allPairs.filter(n => !this.pairsComputed.includes(n)).length / 2);
            }
        }
    }

    computeAndWriteTimeLeft = () => {
        let computeTimeLeft = new Promise((resolve, reject) => {
            this.computeTimeLeft();
            resolve("Couples generated.");
            reject("Couples not generated.");
        })

        computeTimeLeft.then(() => {
            this.writeTimeLeft();
        })
    }

    computeTimeLeft = () => {
        // Todo: remplacer le includes par indexof : ça ne fonctionne pas sous IE.
        let couplesLeftSize = this.allPairs.filter(n => !this.pairsComputed.includes(n)).length / 2;
        let seconds = couplesLeftSize * 5;
        if (this.firstComputing) {
            this.startDate = new Date();
            this.estimatedSeconds = seconds;
            this.firstComputing = false;
        }
        this.timeleft = toTime(seconds);
    }

    writeTimeLeft = (last: boolean = false) => {
        let writeTimeLeft = new Promise((resolve, reject) => {
            if (last) {
                let endDate: any = new Date();
                let timeDifference = endDate - this.startDate;
                timeDifference /= 1000
                elementsComputeList.timeLeft.innerHTML = "<span id='i18n-real-time' class='prtz-i18n' style='font-weight: bold'></span><span> : " + toTime(Math.round(timeDifference)) + "</span><br>";
                elementsComputeList.timeLeft.innerHTML += "<span id='i18n-estimated-time' class='prtz-i18n' style='font-weight: bold'></span><span> : " + toTime(this.estimatedSeconds) + "</span>";
            } else {
                elementsComputeList.timeLeft.innerHTML = "<span id='i18n-time-left' class='prtz-i18n' style='font-weight: bold'></span><span> : " + this.timeleft + "</span>";
            }
            resolve("Time left written.");
            reject("Time left not written.");
        })

        writeTimeLeft
            .then(() => {
                loadTexts();
            })

    }

    computeChoiceAndLoadNext = (btn: any) => {
        let recordChoice = new Promise((resolve, reject) => {
            let couple = btn.dataset.couple.split('_');
            let twinId = [couple[1], couple[0]].join('_');
            this.recordChoice(btn.dataset.couple, twinId, btn.dataset.id);
            resolve("Couples generated.");
            reject("Couples not generated.");
        })

        recordChoice
            .then(() => {
                (parseInt(btn.dataset.iter) <= this.couplesToCompute.length - 1) ? this.showNextCouple(btn) : this.computeAndLoadNextStep();
            })
            .then(() => {
                if (parseInt(btn.dataset.iter) <= this.couplesToCompute.length - 1) {
                    this.applyTransitivity();
                }
            })
            .then(() => {
                if (parseInt(btn.dataset.iter) <= this.couplesToCompute.length - 1) {
                    this.setProgressValue();
                }
            })
            .then(() => {
                if (parseInt(btn.dataset.iter) <= this.couplesToCompute.length - 1) {
                    this.computeAndWriteTimeLeft();
                }
            })
    }

    recordChoice = (coupleId: string, twinId: string, winner: string) => {
        let arrayCouple = coupleId.split('_');
        (arrayCouple[0] == winner) ? this.pairSequences.push([arrayCouple[0], arrayCouple[1]]) : this.pairSequences.push([arrayCouple[1], arrayCouple[0]]);
        if (this.pairsComputed.indexOf(coupleId) == -1) this.pairsComputed.push(coupleId);
        if (this.pairsComputed.indexOf(twinId) == -1) this.pairsComputed.push(twinId);
    }

    showNextCouple(btn: any) {
        let currentIteration = parseInt(btn.dataset.iter);
        let nextElementIteration = currentIteration + 1;
        let currentElement = document.getElementById("btn-wrapper-" + currentIteration.toString());
        let nextElement = document.getElementById("btn-wrapper-" + nextElementIteration.toString());
        currentElement.classList.remove('show');
        currentElement.classList.add('hidden');
        nextElement.classList.remove('hidden');
        nextElement.classList.add('show');
    }

    computeAndLoadNextStep = () => {
        let applyTransitivity = new Promise((resolve, reject) => {
            this.applyTransitivity();
            resolve("Couples generated.");
            reject("Couples not generated.");
        })

        applyTransitivity.then(() => {
            this.initQuestions();
        })
    }

    hasTransitivity = () => {
        for (let currentSequence of this.pairSequences) {
            for (let sequence of this.pairSequences) {
                if (sequence != currentSequence && currentSequence[1] == sequence[0] && arrayNotInInArray(this.pairSequences, [currentSequence[0], sequence[1]])) {
                    return true;
                }
            }
        }
        return false;
    }

    computeTransitiveElements = (currentSequence: string[]) => {
        for (let sequence of this.pairSequences) {
            if (sequence != currentSequence && currentSequence[1] == sequence[0]) {
                let coupleId = currentSequence[0] + "_" + sequence[1];
                let twinId = sequence[1] + "_" + currentSequence[0];
                if (this.pairsComputed.indexOf(coupleId) == -1) this.pairsComputed.push(coupleId);
                if (this.pairsComputed.indexOf(twinId) == -1) this.pairsComputed.push(twinId);
                if (arrayNotInInArray(this.pairSequences, [currentSequence[0], sequence[1]])) this.pairSequences.push([currentSequence[0], sequence[1]]);
                //DEBUG console.log("transitivité applicable sur", currentSequence, "et", sequence, "qui donne", currentSequence[0], ">", sequence[1]);
            }
        }
    }

    applyTransitivity = () => {
        if (this.hasTransitivity()) {
            let sequencesCopy = JSON.parse(JSON.stringify(this.pairSequences));
            for (let sequence of sequencesCopy) {
                this.computeTransitiveElements(sequence);
            }
            this.applyTransitivity();
        }
    }

    computePriorities = () => {
        let sortResults = new Promise((resolve, reject) => {
            this.sortResults();
            resolve("Results sorted.");
            reject("Results not sorted.");
        })

        sortResults
            .then(() => {
                this.getLoosers();
            })
            .then(() => {
                this.comfortLooser();
            })
            .then(() => {
                if (this.hasDuplicate()) {
                    console.warn("Finally there is duplicates. Fix it.");
                } else {
                    this.writeResults();
                }
            })
    }

    hasDuplicate = () => {
        let score: number[] = [];
        for (let result in this.results) {
            if (score.indexOf(this.results[result]) == -1) {
                score.push(this.results[result]);
            } else {
                return true;
            }
        }
        return false;
    }

    sortResults = () => {
        for (let pairSequence of this.pairSequences) {
            if (Object.keys(this.results).indexOf(pairSequence[0]) == -1) {
                this.results[pairSequence[0]] = 1;
            } else {
                this.results[pairSequence[0]] += 1;
            }
        }
    }

    writeResults = () => {
        let sortedResults = Object.entries(this.results).sort((a, b) => b[1] - a[1]);
        let i = 1;
        elementsComputeList.combinations.innerHTML = "";
        for (let element of sortedResults) {
            let p = createParagraph(null, null, null, null, null, i.toString() + " - " + this.list[element[0].toString()]);
            elementsComputeList.combinations.appendChild(p);
            i += 1;
        }
        this.setProgressValue(true);
        this.writeTimeLeft(true);
        elementsComputeList.computeListTip.classList.add('hide-element');
        elementsComputeList.computeListResult.classList.remove('hide-element');
    }

    comfortLooser = () => {
        if (this.loosers.length > 0) {
            for (let looser of this.loosers) {
                this.results[looser] = 0;
            }
        }
    }

    getLoosers = () => {
        if (Object.keys(this.list).length > Object.keys(this.results).length) {
            for (let key in this.list) {
                if (Object.keys(this.results).indexOf(key) == -1) this.loosers.push(key);
            }
        }
    }

}