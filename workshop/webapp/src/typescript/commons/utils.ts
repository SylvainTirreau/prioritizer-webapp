import {elements as elementsHeader} from "../header/dom";
import {elements as elementsNewList} from "../newList/dom";

export const getAllPairs = (array: string[]) => {

    return array.flatMap((x) => {
        return array.flatMap((y) => {
            return (x != y) ? [[x, y]] : []
        });
    });
}

export const toTime = (seconds: any) => {
    let date = new Date(null);
    date.setSeconds(seconds);
    let result = date.toISOString().substring(11, 19).split(':');
    return result[0] + 'h ' + result[1] + "mn " + result[2] + "s";
}

export const arrayNotInInArray = (arr: [string, string][], item: [string, string]) => {
    let item_as_string = JSON.stringify(item);
    let array_as_string = JSON.stringify(arr);

    return (array_as_string.indexOf(item_as_string) == -1);
}

export function* range(start: number = 0, end: number = null, step: number = 1) {
    if (end == null) {
        end = start;
        start = 0;
    }

    for (let i = start; i < end; i += step) {
        yield i;
    }
}

export const showScreen = (screen: string) => {
    let screens = document.querySelectorAll('*[id^="screen-"]');
    screens.forEach((element) => {
        if ("screen-" + screen == element.id) {
            if (element.classList.contains('hide-element')) element.classList.remove('hide-element');
        } else {
            if (!element.classList.contains('hide-element')) element.classList.add('hide-element');
        }
    })
    elementsHeader.siteName.dataset.current = screen;
}

export const sendEmail = (token:string) => {
            let address = atob(token);
            window.location.href = "mailto:" + address;
        }