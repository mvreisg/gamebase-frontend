import { Themes } from "../enums/enums";
import type { ElementInterface } from "../interfaces/interfaces";
import { createButton, createDiv, createImageFromSvg } from "../tools/element-creator";
import { get, set } from "../tools/theme-manager";
import lightModeSymbolSvg from './../assets/light-mode-symbol.svg';
import darkModeSymbolSvg from './../assets/dark-mode-symbol.svg';
import { percent, pxToRem } from "../tools/measures";

export default function ThemeToggler(elementInterface: ElementInterface){
    const theme: Themes = get();    
    const containerDiv: HTMLDivElement = createDiv(        
        'theme-toggler-container-div',
        [
            theme,
            'position-relative',
            'flex',
            'flex-center'
        ],
        {
            width: pxToRem(44),
            height: pxToRem(28)
        }
    );

    const barDiv: HTMLDivElement = createDiv(
        'theme-toggler-bar-div',
        [
            theme,
            'position-absolute',
            'tertiary-background-color'
        ],
        {
            width: pxToRem(30),
            height: pxToRem(14),
            borderRadius: pxToRem(16)
        }
    );

    const roundedClickableButton: HTMLButtonElement = createButton(        
        'theme-toggler-rounded-clickable-button',
        [
            theme,
            'position-absolute',
            'tertiary-background-color',
            'flex',
            'flex-center',
            'cursor-pointer'
        ],
        {
            width: pxToRem(28),
            height: pxToRem(28),
            borderRadius: percent(100),
            top: percent(-50),            
            borderWidth: '0',
            padding: '0'
        }
    );
    switch(theme){
        default:
            throw new Error('Untreated theme: ' + theme);
        case Themes.LIGHT:
            roundedClickableButton.style.left = percent(50);
            break;
        case Themes.DARK:
            roundedClickableButton.style.left = percent(-50);
            break;
    }      

    const internalRoundedDiv: HTMLDivElement = createDiv(
        'theme-toggler-internal-rounded-div',
        [
            theme,
            'position-relative',
            'quaternary-background-color',
            'flex',
            'flex-center'
        ],
        {
            width: pxToRem(20),
            height: pxToRem(20),
            borderRadius: percent(100),
        }
    );    

    let themeModeSymbolImage: HTMLImageElement;
    switch(theme){
        default:
            throw new Error('Untreated theme: ' + theme);
        case Themes.LIGHT:
            themeModeSymbolImage = createImageFromSvg(
                lightModeSymbolSvg,
                'theme-toggler-symbol-image',
                [
                    theme
                ],        
            );
            break;
        case Themes.DARK:
            themeModeSymbolImage = createImageFromSvg(
                darkModeSymbolSvg,
                'theme-toggler-symbol-image',
                [
                    theme
                ],        
            );
            break;
    }  
    

    roundedClickableButton.addEventListener('click', () => {
        console.log('a');
        const theme: Themes = get();
        switch(theme){
            default:
                throw new Error('Untreated theme: ' + theme);
            case Themes.LIGHT:
                set(Themes.DARK);
                break;
            case Themes.DARK:
                set(Themes.LIGHT);
                break;
        }        
        elementInterface.themeChanger();
        const themeTogglerSymbolImage: HTMLImageElement|null = document.querySelector('#theme-toggler-symbol-image');
        if (themeTogglerSymbolImage === null || themeTogglerSymbolImage === undefined){
            throw new Error('Theme toggler symbol image not found!');
        }
        switch(get()){
            default:
                throw new Error('Untreated theme: ' + theme);
            case Themes.LIGHT:
                themeTogglerSymbolImage.src = lightModeSymbolSvg;
                roundedClickableButton.style.left = percent(50);
                break;
            case Themes.DARK:
                themeTogglerSymbolImage.src = darkModeSymbolSvg;
                roundedClickableButton.style.left = percent(-50);
                break;
        }     
    });

    internalRoundedDiv.append(
        themeModeSymbolImage
    );
    
    roundedClickableButton.append(
        internalRoundedDiv        
    );

    barDiv.append(
        roundedClickableButton
    );

    containerDiv.append(
        barDiv
    );

    return containerDiv;
}