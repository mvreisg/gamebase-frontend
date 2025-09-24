import type { Themes } from "../types/types";

const listeners: CallableFunction[] = [];

export const subscribe = function(callback: CallableFunction){    
    try{
        listeners.push(callback);
    } catch (e){
        throw e;
    }
}

export const notify = function(){    
    try {
        listeners.forEach((callback) => callback(get()));
    } catch (e){
        throw e;
    }
}

export const set = function(theme: Themes = 'dark'){
    try{
        switch(theme){
            default:
                throw new Error('Untreated theme: ' + theme);
            case 'light':
            case 'dark':
                localStorage.setItem('theme', theme);
                break;
        }
    } catch (e){
        throw e;
    }
}

export const get = function(): Themes {
    try{
        const theme = localStorage.getItem('theme');
        if (theme === null){
            throw new Error('Theme value not defined!');
        }
        switch(theme){
            default:
                throw new Error('Untreated theme: ' + theme);
            case 'light':
            case 'dark':
                return theme;
        }
    } catch (e){
        throw e;
    }
}

export const create = function(){
    try{
        const theme = localStorage.getItem('theme');
        if (theme === null){
            set();
        }        
    } catch (e){
        throw e;
    }    
}

export const changeThemeClasses = function(element: HTMLElement){
    try{
        let classes = element.className.split(' ');
        classes = classes.filter((value) => value === 'light' || value === 'dark' ? false : true);
        const theme = get();
        switch(theme){
            default:
                throw new Error('Untreated theme: ' + theme);
            case 'dark':
                classes.push('dark');
                break;
            case 'light':
                classes.push('light');
                break;
        }       
        element.className = classes.join(' '); 
    } catch (e){
        throw e;
    }    
}