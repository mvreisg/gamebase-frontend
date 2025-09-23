import { Themes } from "../enums/enums";

export const set = function(theme: Themes = Themes.DARK){
    try{
        switch(theme){
            default:
                throw new Error('Untreated theme: ' + theme);
            case Themes.LIGHT:
                localStorage.setItem('theme', Themes.LIGHT);
                break;
            case Themes.DARK:
                localStorage.setItem('theme', Themes.DARK);
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
            case Themes.LIGHT:
                return Themes.LIGHT;
            case Themes.DARK:
                return Themes.DARK;
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