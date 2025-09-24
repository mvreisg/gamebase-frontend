import type { CSSStyle } from "../types/types";

export const createH1 = function(
    id?: string|undefined, 
    classes?: string[]|undefined,
    style?: CSSStyle|undefined,
    textContent?: string|undefined
): HTMLHeadingElement {
    try{
        const element: HTMLHeadingElement = document.createElement('h1');
        if (id){
            element.id = id;
        }
        if (classes){
            element.className = classes.join(' ');
        }    
        if (textContent){
            element.textContent = textContent;
        }    
        if (style){        
            Object.assign(element.style, style);                
        }
        return element;
    } catch (e){
        throw e;
    }
}

export const createParagraph = function(
    id?: string|undefined, 
    classes?: string[]|undefined,
    style?: CSSStyle|undefined,
    textContent?: string|undefined
): HTMLParagraphElement {
    try{
        const element: HTMLParagraphElement = document.createElement('p');
        if (id){
            element.id = id;
        }
        if (classes){
            element.className = classes.join(' ');
        }    
        if (textContent){
            element.textContent = textContent;
        }    
        if (style){        
            Object.assign(element.style, style);                
        }
        return element;
    } catch (e){
        throw e;
    }
}

export const createDiv = function(
    id?: string|undefined, 
    classes?: string[]|undefined,
    style?: CSSStyle|undefined,
    textContent?: string|undefined
): HTMLDivElement{
    try{
        const element: HTMLDivElement = document.createElement('div');
        if (id){
            element.id = id;
        }
        if (classes){
            element.className = classes.join(' ');
        }    
        if (textContent){
            element.textContent = textContent;
        }    
        if (style){        
            Object.assign(element.style, style);                
        }
        return element;
    } catch (e){
        throw e;
    }
}

export const createTextInput = function(
    id?: string|undefined, 
    classes?: string[]|undefined,
    style?: CSSStyle|undefined,
    textContent?: string|undefined
): HTMLInputElement{
    try{
        const element: HTMLInputElement = document.createElement('input');
        element.type = 'text';
        if (id){
            element.id = id;
        }
        if (classes){
            element.className = classes.join(' ');
        }    
        if (textContent){
            element.textContent = textContent;
        }    
        if (style){        
            Object.assign(element.style, style);                
        }
        return element;
    } catch (e){
        throw e;
    }
}

export const createCheckInput = function(
    id?: string|undefined, 
    classes?: string[]|undefined,
    style?: CSSStyle|undefined,
    textContent?: string|undefined
): HTMLInputElement{
    try{
        const element: HTMLInputElement = document.createElement('input');
        element.type = 'checkbox';
        if (id){
            element.id = id;
        }
        if (classes){
            element.className = classes.join(' ');
        }    
        if (textContent){
            element.textContent = textContent;
        }    
        if (style){        
            Object.assign(element.style, style);                
        }
        return element;
    } catch (e){
        throw e;
    }
}

export const createButton = function(
    id?: string|undefined, 
    classes?: string[]|undefined,
    style?: CSSStyle|undefined,
    textContent?: string|undefined
): HTMLButtonElement{
    try{
        const element: HTMLButtonElement = document.createElement('button');
        if (id){
            element.id = id;
        }
        if (classes){
            element.className = classes.join(' ');
        }    
        if (textContent){
            element.textContent = textContent;
        }    
        if (style){        
            Object.assign(element.style, style);                
        }
        return element;
    } catch (e){
        throw e;
    }
}

export const createImageFromSvg = function(
    src: string,
    id?: string|undefined, 
    classes?: string[]|undefined,
    style?: CSSStyle|undefined,
): HTMLImageElement {
    try {
        const element = document.createElement('img');
        element.src = src;
        if (id){
            element.id = id;
        }
        if (classes){
            element.className = classes.join(' ');
        }    
        if (style){        
            Object.assign(element.style, style);                
        }
        return element;
    } catch (e){
        throw e;
    }
}