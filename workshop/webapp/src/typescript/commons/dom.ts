export const createDiv = (id: string = null, classes: string[] = null, styles: string = null, dataset: { [index: string]: string } = null, innerHTML: string = null, innerTxt: string = null, contentEditable: string = null, node: HTMLElement = null) => {
    let div: HTMLDivElement = document.createElement('div');
    if (id !== null) {
        div.id = id
    }
    if (classes !== null) {
        for (let c of classes) {
            div.classList.add(c);
        }
    }
    if (styles !== null) {
        div.style.cssText = styles;
    }
    if (dataset !== null) {
        for (let d in dataset) {
            div.setAttribute('data-' + d, dataset[d]);
        }
    }
    if (innerHTML !== null) {
        div.innerHTML = innerHTML;
    }
    if (innerHTML !== null) {
        div.innerHTML = innerHTML;
    }
    if (innerTxt !== null) {
        div.innerText = innerTxt;
    }
    if (contentEditable != null) {
        if (contentEditable == "true") {
            div.contentEditable = "true";
        } else if (contentEditable == "false") {
            div.contentEditable = "false";
        }
    }
    if (node !== null) {
        div.appendChild(node);
    }
    return div;
}

export const createButton = (id: string = null, classes: string[] = null, styles: string = null, dataset: { [index: string]: string } = null, title: string = null, innerHTML: string = null, innerTxt: string = null, node: HTMLElement = null) => {
    let button: HTMLButtonElement = document.createElement('button');
    if (id !== null) {
        button.id = id
    }
    if (classes !== null) {
        for (let c of classes) {
            button.classList.add(c);
        }
    }
    if (styles !== null) {
        button.style.cssText = styles;
    }
    if (dataset !== null) {
        for (let d in dataset) {
            button.setAttribute('data-' + d, dataset[d]);
        }
    }
    if (title !== null) {
        button.title = title;
    }
    if (innerHTML !== null) {
        button.innerHTML = innerHTML;
    }
    if (innerHTML !== null) {
        button.innerHTML = innerHTML;
    }
    if (innerTxt !== null) {
        button.innerText = innerTxt;
    }
    if (node !== null) {
        button.appendChild(node);
    }
    return button;
}

export const createParagraph = (id: string = null, classes: string[] = null, styles: string = null, dataset: { [index: string]: string } = null, innerHTML: string = null, innerTxt: string = null, node: HTMLElement = null) => {
    let p: HTMLParagraphElement = document.createElement('p');
    if (id !== null) {
        p.id = id
    }
    if (classes !== null) {
        for (let c of classes) {
            p.classList.add(c);
        }
    }
    if (styles !== null) {
        p.style.cssText = styles;
    }
    if (dataset !== null) {
        for (let d in dataset) {
            p.setAttribute('data-' + d, dataset[d]);
        }
    }
    if (innerHTML !== null) {
        p.innerHTML = innerHTML;
    }
    if (innerHTML !== null) {
        p.innerHTML = innerHTML;
    }
    if (innerTxt !== null) {
        p.innerText = innerTxt;
    }
    if (node !== null) {
        p.appendChild(node);
    }
    return p;
}

export const createSpan = (id: string = null, classes: string[] = null, styles: string = null, dataset: { [index: string]: string } = null, innerHTML: string = null, innerTxt: string = null, node: HTMLElement = null) => {
    let span: HTMLSpanElement = document.createElement('span');
    if (id !== null) {
        span.id = id
    }
    if (classes !== null) {
        for (let c of classes) {
            span.classList.add(c);
        }
    }
    if (styles !== null) {
        span.style.cssText = styles;
    }
    if (dataset !== null) {
        for (let d in dataset) {
            span.setAttribute('data-' + d, dataset[d]);
        }
    }
    if (innerHTML !== null) {
        span.innerHTML = innerHTML;
    }
    if (innerHTML !== null) {
        span.innerHTML = innerHTML;
    }
    if (innerTxt !== null) {
        span.innerText = innerTxt;
    }
    if (node !== null) {
        span.appendChild(node);
    }
    return span;
}