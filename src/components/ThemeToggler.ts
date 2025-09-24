import type { ApplicationContext } from "../interfaces/interfaces";
import { createButton, createDiv, createImageFromSvg } from "../tools/elements";
import lightModeSymbolSvg from './../assets/light-mode-symbol.svg';
import darkModeSymbolSvg from './../assets/dark-mode-symbol.svg';
import { percent, pxToRem } from "../tools/measures";
import type { Themes } from "../types/types";

export default function ThemeToggler(applicationContext: ApplicationContext){
    applicationContext.subscribeToThemeListening((theme: Themes) => {
        switch(theme){
             default:
                throw new Error('Untreated theme: ' + theme);
            case 'light':
                themeModeSymbolImage.src = darkModeSymbolSvg;
                roundedClickableButton.style.left = percent(50);
                break;
            case 'dark':
                themeModeSymbolImage.src = lightModeSymbolSvg;                
                roundedClickableButton.style.left = percent(-50);
                break;
        }   
    });

    const theme = applicationContext.getTheme();

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
        case 'light':
            roundedClickableButton.style.left = percent(50);
            break;
        case 'dark':
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

    let themeModeSymbolSvg;
    switch(theme){
        default:
            throw new Error('Untreated theme: ' + theme);
        case 'light':
            themeModeSymbolSvg = darkModeSymbolSvg;
            break;            
        case 'dark':
            themeModeSymbolSvg = lightModeSymbolSvg;
            break;        
    }  

    const themeModeSymbolImage = createImageFromSvg(
        themeModeSymbolSvg,
        'theme-mode-symbol-image',
        [
            theme
        ],        
    );

    roundedClickableButton.addEventListener('click', () => {
        const theme = applicationContext.getTheme();
        switch(theme){
            default:
                throw new Error('Untreated theme: ' + theme);
            case 'light':
                applicationContext.setTheme('dark');
                return;
            case 'dark':
                applicationContext.setTheme('light');
                return;
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