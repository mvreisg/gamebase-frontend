import { Themes } from '../enums/enums';
import { get } from './theme-manager';

export const change = function(rootElement?: HTMLElement|null){    
    try{                
        if (rootElement === null || rootElement === undefined){
            return;
        }
        if (rootElement.classList !== null && rootElement.classList !== undefined){
            if (rootElement.classList.length > 0){
                const classes: string[] = rootElement.className.split(' ');
                const theme: Themes = get();
                const newClasses = classes.map((value: string) => {                
                    switch(value){
                        default:                        
                            return value;
                        case Themes.LIGHT:                                                
                        case Themes.DARK:
                            return theme;
                    }
                });
                rootElement.className = newClasses.join(' ');
            }        
        }        
        if (rootElement.hasChildNodes()){
            rootElement.childNodes.forEach((child) => change(child as HTMLElement));
        }        
    } catch (e){
        throw e;
    }    
}