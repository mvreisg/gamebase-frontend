import type { ElementParameters, ElementProperties, LoginFormContext, PasswordVisibilityButtonElementProperties } from "../../interfaces/interfaces";
import { createLabel } from "../../tools/elements";
import { percent, pxToRem } from "../../tools/measures";
import { changeThemeClasses } from "../../tools/themes";
import type { PasswordValidation, PasswordVisibility } from "../../types/types";
import LoginFormPasswordVisibilityButton from "./LoginFormPasswordVisibilityButton";
import LoginFormTextInput from "./LoginFormTextInput";
import LoginFormTextInputWarningParagraph from "./LoginFormTextInputWarningParagraph";

export default function LoginFormPasswordTextInput(
    applicationContext: LoginFormContext, 
    elementParameters: ElementParameters
): ElementProperties {
    let visibility: PasswordVisibility = 'hidden' as PasswordVisibility;

    applicationContext.subscribeToThemeListening(() => {
        changeThemeClasses(container);               
    });    

    const theme = applicationContext.getTheme();    

    const passwordListener = function(state: PasswordValidation){
        let containerClasses = [];
        let inputClasses = [];
        switch(state){
            default:
                throw new Error('Untreated state: ' + state);
            case 'invalid':
                containerClasses = container.className.split(' ');
                containerClasses = containerClasses.filter((value) => value !== 'primary-input-background-color');
                containerClasses.push('primary-input-warning-fill-color');
                container.className = containerClasses.join(' ');

                inputClasses = textInput.element.className.split(' ');
                inputClasses = inputClasses.filter((value) => value !== 'primary-input-background-color');
                inputClasses.push('primary-input-warning-fill-color');
                textInput.element.className = inputClasses.join(' ');
                break;
            case 'valid':
                containerClasses = container.className.split(' ');
                containerClasses = containerClasses.filter((value) => value !== 'primary-input-warning-fill-color');
                containerClasses.push('primary-input-background-color');
                container.className = containerClasses.join(' ');

                inputClasses = textInput.element.className.split(' ');
                inputClasses = inputClasses.filter((value) => value !== 'primary-input-warning-fill-color');
                inputClasses.push('primary-input-background-color');
                textInput.element.className = inputClasses.join(' ');                
                break;
        }
    }

    applicationContext.subscribeToPasswordListening(passwordListener);

    const setVisibility = function(value: PasswordVisibility){
        visibility = value;
        switch(visibility){
            default:
                throw new Error('Untreated visibility: ' + visibility);
            case 'hidden':
                (textInput.element as HTMLInputElement).type = 'password';
                break;
            case 'visible':
                (textInput.element as HTMLInputElement).type = 'text';
                break;                        
        }
    };

    const getVisibility = (): PasswordVisibility => {
        return visibility;
    }

    const container: HTMLLabelElement = createLabel(
        elementParameters.id,
        elementParameters.classes,
        elementParameters.styles
    );

    const getValue = function(): string {
        return textInput.methods.getValue();
    }    

    const textInput = LoginFormTextInput(
        applicationContext,
        {
            id: 'login-form-password-text-input',
            classes: [
                theme,
                'border-box',
                'border-0',
                'padding-0',
                'text-color',
                'primary-input-background-color',
                'text-input-font'
            ],
            styles: {
                width: percent(100),
                height: percent(100),
                borderRadius: pxToRem(12),
                padding: pxToRem(11)
            }
        }        
    );    

    const warningParagraph = LoginFormTextInputWarningParagraph(
        applicationContext,
        {
            id: 'login-form-password-warning-paragraph',
            classes: [
                theme,
                'position-absolute',
                'paragraph-font',
                'warning-text-color'
            ],
            styles: {
                left: pxToRem(11)
            },
            text: 'O password não foi informado!'
        }

    );    

    const passwordVisibilityButton: PasswordVisibilityButtonElementProperties = LoginFormPasswordVisibilityButton(
        {
            ...applicationContext,
            setVisibility: setVisibility,
            getVisibility: getVisibility,
        },
        {
            id: 'login-form-password-visibility-button-container',
            classes: [],
            styles: {
                padding: pxToRem(9)
            }
        }
    );    

    const setWarningParagraphVisibility = function(isVisible: boolean): void{
        warningParagraph.methods.setVisibility(isVisible ? 'visible': 'hidden');
    }    

    const validateInput = function(){        
        const isEmpty = getValue().length === 0;
        setWarningParagraphVisibility(isEmpty);
        applicationContext.setIsPasswordValid(isEmpty === false);            
    }
    
    warningParagraph.element.addEventListener('click', () => {
        setWarningParagraphVisibility(false);
        textInput.element.focus();
    });

    textInput.element.addEventListener('click', () => {
        setWarningParagraphVisibility(false);
        textInput.element.focus();
    });    

    textInput.element.addEventListener('focus', () => {
        setWarningParagraphVisibility(false);
    });        

    textInput.element.addEventListener('keydown', (event) => {        
        switch(event.key){
            case 'Backspace':
            case 'Delete':
                validateInput();
                break;
            case 'Control':
            case 'Enter':
            case 'Shift':                
            case 'Alt':         
            case 'Tab':                
                break;
            default:
                validateInput();
                break;
        }        
    });    

    textInput.element.addEventListener('keyup', (event) => {
        switch(event.key){
            case 'Backspace':
            case 'Delete':
                validateInput();
                break;
            case 'Control':
            case 'Enter':
            case 'Shift':                
            case 'Alt':         
            case 'Tab':                
                break;
            default:
                validateInput();
                break;
        }                 
    });

    textInput.element.addEventListener('focusout', () => {
        validateInput();
    });    

    container.append(
        textInput.element
    );

    container.append(
        warningParagraph.element
    );

    container.append(
        passwordVisibilityButton.element
    );

    setVisibility('hidden');
    setWarningParagraphVisibility(false);
    passwordVisibilityButton.methods.setSvg();

    return {
        element: container
    };
}