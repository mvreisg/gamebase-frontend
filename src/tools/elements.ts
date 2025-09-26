import type { CSSStyle } from '../types/types';

export const createH1 = function (
    id?: string | undefined,
    classes?: string[] | undefined,
    style?: CSSStyle | undefined,
    textContent?: string | undefined
): HTMLHeadingElement {
    const element: HTMLHeadingElement = document.createElement('h1');
    if (id) {
        element.id = id;
    }
    if (classes) {
        element.className = classes.join(' ');
    }
    if (textContent) {
        element.textContent = textContent;
    }
    if (style) {
        Object.assign(element.style, style);
    }
    return element;
};

export const createParagraph = function (
    id?: string | undefined,
    classes?: string[] | undefined,
    style?: CSSStyle | undefined,
    textContent?: string | undefined
): HTMLParagraphElement {
    const element: HTMLParagraphElement = document.createElement('p');
    if (id) {
        element.id = id;
    }
    if (classes) {
        element.className = classes.join(' ');
    }
    if (textContent) {
        element.textContent = textContent;
    }
    if (style) {
        Object.assign(element.style, style);
    }
    return element;
};

export const createDiv = function (
    id?: string | undefined,
    classes?: string[] | undefined,
    style?: CSSStyle | undefined,
    textContent?: string | undefined
): HTMLDivElement {
    const element: HTMLDivElement = document.createElement('div');
    if (id) {
        element.id = id;
    }
    if (classes) {
        element.className = classes.join(' ');
    }
    if (textContent) {
        element.textContent = textContent;
    }
    if (style) {
        Object.assign(element.style, style);
    }
    return element;
};

export const createLabel = function (
    id?: string | undefined,
    classes?: string[] | undefined,
    style?: CSSStyle | undefined
): HTMLLabelElement {
    const element: HTMLLabelElement = document.createElement('label');
    if (id) {
        element.id = id;
    }
    if (classes) {
        element.className = classes.join(' ');
    }
    if (style) {
        Object.assign(element.style, style);
    }
    return element;
};

export const createForm = function (
    id?: string | undefined,
    classes?: string[] | undefined,
    style?: CSSStyle | undefined,
    textContent?: string | undefined
): HTMLFormElement {
    const element: HTMLFormElement = document.createElement('form');
    if (id) {
        element.id = id;
    }
    if (classes) {
        element.className = classes.join(' ');
    }
    if (textContent) {
        element.textContent = textContent;
    }
    if (style) {
        Object.assign(element.style, style);
    }
    return element;
};

export const createTextInput = function (
    id?: string | undefined,
    classes?: string[] | undefined,
    style?: CSSStyle | undefined,
    textContent?: string | undefined
): HTMLInputElement {
    const element: HTMLInputElement = document.createElement('input');
    element.type = 'text';
    if (id) {
        element.id = id;
    }
    if (classes) {
        element.className = classes.join(' ');
    }
    if (textContent) {
        element.textContent = textContent;
    }
    if (style) {
        Object.assign(element.style, style);
    }
    return element;
};

export const createCheckInput = function (
    id?: string | undefined,
    classes?: string[] | undefined,
    style?: CSSStyle | undefined,
    textContent?: string | undefined
): HTMLInputElement {
    const element: HTMLInputElement = document.createElement('input');
    element.type = 'checkbox';
    if (id) {
        element.id = id;
    }
    if (classes) {
        element.className = classes.join(' ');
    }
    if (textContent) {
        element.textContent = textContent;
    }
    if (style) {
        Object.assign(element.style, style);
    }
    return element;
};

export const createButton = function (
    id?: string | undefined,
    classes?: string[] | undefined,
    style?: CSSStyle | undefined,
    textContent?: string | undefined,
    type: string = 'button'
): HTMLButtonElement {
    const element: HTMLButtonElement = document.createElement('button');
    if (id) {
        element.id = id;
    }
    if (classes) {
        element.className = classes.join(' ');
    }
    if (textContent) {
        element.textContent = textContent;
    }
    if (style) {
        Object.assign(element.style, style);
    }
    element.type = type as HTMLButtonElement['type'];
    return element;
};

export const createImageFromSvg = function (
    src: string,
    id?: string | undefined,
    classes?: string[] | undefined,
    style?: CSSStyle | undefined
): HTMLImageElement {
    const element = document.createElement('img');
    element.src = src;
    if (id) {
        element.id = id;
    }
    if (classes) {
        element.className = classes.join(' ');
    }
    if (style) {
        Object.assign(element.style, style);
    }
    return element;
};
