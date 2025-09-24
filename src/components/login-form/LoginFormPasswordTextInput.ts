import type { LoginFormContext } from "../../interfaces/interfaces";
import { createDiv, createParagraph, createTextInput } from "../../tools/elements";
import { percent, pxToRem } from "../../tools/measures";
import { changeThemeClasses } from "../../tools/themes";
import type { PasswordValidation, PasswordVisibility } from "../../types/types";
import LoginFormPasswordVisibilityButton from "./LoginFormPasswordVisibilityButton";

export default function LoginFormPasswordTextInput(applicationContext: LoginFormContext){
    let visibility: PasswordVisibility = 'hidden' as PasswordVisibility;

    applicationContext.subscribeToThemeListening(() => {
        changeThemeClasses(backgroundContainer);       
        changeThemeClasses(textInput);       
        changeThemeClasses(warningParagraph);       
    });    

    const theme = applicationContext.getTheme();    

    const passwordListener = function(state: PasswordValidation){
        let backgroundContainerClasses = [];
        let inputClasses = [];
        switch(state){
            default:
                throw new Error('Untreated state: ' + state);
            case 'invalid':
                backgroundContainerClasses = backgroundContainer.className.split(' ');
                backgroundContainerClasses = backgroundContainerClasses.filter((value) => value !== 'primary-input-background-color');
                backgroundContainerClasses.push('primary-input-warning-fill-color');
                backgroundContainer.className = backgroundContainerClasses.join(' ');

                inputClasses = textInput.className.split(' ');
                inputClasses = inputClasses.filter((value) => value !== 'primary-input-background-color');
                inputClasses.push('primary-input-warning-fill-color');
                textInput.className = inputClasses.join(' ');
                break;
            case 'valid':
                backgroundContainerClasses = backgroundContainer.className.split(' ');
                backgroundContainerClasses = backgroundContainerClasses.filter((value) => value !== 'primary-input-warning-fill-color');
                backgroundContainerClasses.push('primary-input-background-color');
                backgroundContainer.className = backgroundContainerClasses.join(' ');

                inputClasses = textInput.className.split(' ');
                inputClasses = inputClasses.filter((value) => value !== 'primary-input-warning-fill-color');
                inputClasses.push('primary-input-background-color');
                textInput.className = inputClasses.join(' ');                
                break;
        }
    }

    applicationContext.subscribeToPasswordListening(passwordListener);

    const setVisibility = function(){
        switch(visibility){
            default:
                throw new Error('Untreated visibility: ' + visibility);
            case 'hidden':
                textInput.type = 'password';
                break;
            case 'showing':
                textInput.type = 'text';
                break;                        
        }
    }

    const backgroundContainer: HTMLDivElement = createDiv(
        'login-form-password-text-input-background-container',
        [
            theme,               
            'primary-border-color',
            'primary-input-background-color',
            'flex',
            'flex-row',
            'flex-vertical-center',
            'w-100',
            'border-box',
            'position-relative'
        ],
        {
            height: pxToRem(50),
            borderWidth: pxToRem(4),
            borderRadius: pxToRem(16),
            borderStyle: 'solid'
        }
    );

    const getValue = function(): string {
        return textInput.value;
    }    

    const textInput: HTMLInputElement = createTextInput(
        'login-form-password-text-input',
        [
            theme,
            'border-box',
            'border-0',
            'padding-0',
            'text-color',
            'primary-input-background-color',
            'text-input-font'
        ],
        {
            width: percent(100),
            height: percent(100),
            borderRadius: pxToRem(12),
            padding: pxToRem(11)
        }
    );
    setVisibility();

    const warningParagraph: HTMLParagraphElement = createParagraph(
        'login-form-password-warning-paragraph',
        [
            theme,
            'position-absolute',
            'paragraph-font',
            'warning-text-color'
        ],
        {
            left: pxToRem(11)
        },
        'O password não foi informado!'
    );

    const setWarningParagraphVisibility = function(isVisible: boolean): void{
        warningParagraph.style.visibility = isVisible ? 'visible': 'hidden';
    }
    setWarningParagraphVisibility(false);

    const validateInput = function(){
        const isEmpty: boolean = getValue().length === 0;
        setWarningParagraphVisibility(isEmpty);
        applicationContext.setIsPasswordValid(isEmpty === false);            
    }
    
    warningParagraph.addEventListener('click', () => {
        setWarningParagraphVisibility(false);
        textInput.focus();
    });

    textInput.addEventListener('click', () => {
        setWarningParagraphVisibility(false);
        textInput.focus();
    });    

    textInput.addEventListener('focus', () => {
        setWarningParagraphVisibility(false);
    });        

    textInput.addEventListener('keydown', (event) => {
        switch(event.key){
            case 'Backspace':
            case 'Delete':
            case 'Control':
            case 'Enter':
            case 'Shift':                
            case 'Alt':         
                setWarningParagraphVisibility(getValue().length === 0);
                break;
            default:
                setWarningParagraphVisibility(false);                
                break;
        }        
    });    

    textInput.addEventListener('keyup', (event) => {
        switch(event.key){
            case 'Backspace':
            case 'Delete':
            case 'Control':
            case 'Enter':
            case 'Shift':                
            case 'Alt':
                setWarningParagraphVisibility(getValue().length === 0);
                break;
            default:                
                break;
        }         
        validateInput();
    });

    textInput.addEventListener('focusout', () => {
        validateInput();
    });    

    backgroundContainer.append(
        textInput
    );

    backgroundContainer.append(
        warningParagraph
    );

    backgroundContainer.append(
        LoginFormPasswordVisibilityButton({
            getTheme: applicationContext.getTheme,
            setTheme: applicationContext.setTheme,
            subscribeToThemeListening: applicationContext.subscribeToThemeListening,
            visibilityChange: () => {
                visibility = visibility === 'hidden' ? 'showing' : 'hidden';
                setVisibility();    
            },
            getVisibility: () => visibility,
            setIsPasswordValid: applicationContext.setIsPasswordValid,
            subscribeToPasswordListening: applicationContext.subscribeToPasswordListening,
            setIsUsernameValid: applicationContext.setIsUsernameValid,
            subscribeToUsernameListening: applicationContext.subscribeToUsernameListening
        })
    );

    return backgroundContainer;
}