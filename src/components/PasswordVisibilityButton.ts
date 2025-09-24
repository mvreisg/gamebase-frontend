import type { PasswordVisibilityButtonContext } from "../interfaces/interfaces";
import { createButton, createImageFromSvg } from "../tools/elements";
import { pxToRem } from "../tools/measures";
import darkShowPasswordSymbol from './../assets/dark-show-password-symbol.svg';
import darkHidePasswordSymbol from './../assets/dark-hide-password-symbol.svg';
import lightShowPasswordSymbol from './../assets/light-show-password-symbol.svg';
import lightHidePasswordSymbol from './../assets/light-hide-password-symbol.svg';
import type { Themes } from "../types/types";
import { changeThemeClasses } from "../tools/themes";

export default function PasswordVisibilityButton(applicationContext: PasswordVisibilityButtonContext){
    applicationContext.subscribeToThemeListening(() => {
        changeThemeClasses(button);
    });

    const theme: Themes = applicationContext.getTheme();

    const button: HTMLButtonElement = createButton(
        'password-visibility-button',
        [
            theme,
            'border-0',
            'padding-0',
            'primary-input-background-color',
            'flex',
            'flex-center',
            'cursor-pointer'
        ],
        {
            width: pxToRem(25),
            height: pxToRem(25)
        }
    );

    applicationContext.subscribeToThemeListening(() => {
        setSvg();
    });

    const setSvg = function(){
        const visibility = applicationContext.getVisibility();
        const theme = applicationContext.getTheme();
        switch(visibility){
            default:
                throw new Error('Untreated password visibility: ' + visibility);
            case 'hidden':
                switch(theme){
                    default:
                        throw new Error('Untreated theme: ' + theme);                    
                    case 'dark':
                        passwordSymbolImage.src = darkHidePasswordSymbol;
                        break;
                    case 'light':
                        passwordSymbolImage.src = lightHidePasswordSymbol;
                        break;
                }
                break;
            case 'showing':
                switch(theme){
                    default:
                        throw new Error('Untreated theme: ' + theme);                    
                    case 'dark':
                        passwordSymbolImage.src = darkShowPasswordSymbol;
                        break;
                    case 'light':
                        passwordSymbolImage.src = lightShowPasswordSymbol;
                        break;
                }
                break;
        }    
    }

    button.addEventListener('click', () => {
        applicationContext.visibilityChange();
        setSvg();
    });

    let passwordSymbolImage: HTMLImageElement;
    const visibility = applicationContext.getVisibility();    
    let passwordSymbolImageSvg;
    switch(visibility){
        default:
            throw new Error('Untreated password visibility: ' + visibility);
        case 'hidden':
            switch(theme){
                default:
                    throw new Error('Untreated theme: ' + theme);                    
                case 'dark':
                    passwordSymbolImageSvg = darkHidePasswordSymbol;
                    break;
                case 'light':
                    passwordSymbolImageSvg = lightHidePasswordSymbol;                    
                    break;
            }
            break;
        case 'showing':
            switch(theme){
                default:
                    throw new Error('Untreated theme: ' + theme);                    
                case 'dark':
                    passwordSymbolImageSvg = darkShowPasswordSymbol; 
                    break;
                case 'light':
                    passwordSymbolImageSvg = lightShowPasswordSymbol;  
                    break;
            }
            break;
    }    
    passwordSymbolImage = createImageFromSvg(
        passwordSymbolImageSvg,
        'password-visibility-button-symbol-image',
    );    

    button.append(passwordSymbolImage);

    return button;
}