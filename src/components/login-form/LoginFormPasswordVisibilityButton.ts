import type { ElementParameters, LoginFormPasswordVisibilityButtonContext, PasswordVisibilityButtonElementProperties } from "../../interfaces/interfaces";
import { createDiv } from "../../tools/elements";
import { pxToRem } from "../../tools/measures";
import type { PasswordValidation } from "../../types/types";
import PasswordVisibilityButton from "../PasswordVisibilityButton";

export default function LoginFormPasswordVisibilityButton(
    applicationContext: LoginFormPasswordVisibilityButtonContext,
    elementParameters: ElementParameters
): PasswordVisibilityButtonElementProperties {
    const theme = applicationContext.getTheme();

    const passwordListener = function(state: PasswordValidation){
        let passwordVisibilityButtonClasses = [];
        switch(state){
            default:
                throw new Error('Untreated state: ' + state);
            case 'invalid':
                passwordVisibilityButtonClasses = passwordVisibilityButton.element.className.split(' ');
                passwordVisibilityButtonClasses = passwordVisibilityButtonClasses.filter((value) => value !== 'primary-input-background-color');
                passwordVisibilityButtonClasses.push('primary-input-warning-fill-color');
                passwordVisibilityButton.element.className = passwordVisibilityButtonClasses.join(' ');
                break;
            case 'valid':
                passwordVisibilityButtonClasses = passwordVisibilityButton.element.className.split(' ');
                passwordVisibilityButtonClasses = passwordVisibilityButtonClasses.filter((value) => value !== 'primary-input-warning-fill-color');
                passwordVisibilityButtonClasses.push('primary-input-background-color');
                passwordVisibilityButton.element.className = passwordVisibilityButtonClasses.join(' ');
                break;
        }
    }

    applicationContext.subscribeToPasswordListening(passwordListener);

    const setSvg = function(){
        passwordVisibilityButton.methods.setSvg();
    }

    const container: HTMLDivElement = createDiv(
        elementParameters.id,
        elementParameters.classes,
        elementParameters.styles
    );

    const passwordVisibilityButton = PasswordVisibilityButton(
        applicationContext,
        {
            id: 'password-visibility-button',
            classes: [
                theme,
                'border-0',
                'padding-0',
                'primary-input-background-color',
                'flex',
                'flex-center',
                'cursor-pointer'
            ],
            styles: {
                width: pxToRem(25),
                height: pxToRem(25)
            }
        }                
    );

    container.append(
        passwordVisibilityButton.element    
    );

    return {
        element: container,
        methods: {
            setSvg
        }
    };
}