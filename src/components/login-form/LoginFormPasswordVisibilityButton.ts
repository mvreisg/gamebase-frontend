import type { LoginFormPasswordVisibilityButtonContext } from "../../interfaces/interfaces";
import { createDiv } from "../../tools/elements";
import { pxToRem } from "../../tools/measures";
import type { PasswordValidation } from "../../types/types";
import PasswordVisibilityButton from "../PasswordVisibilityButton";

export default function LoginFormPasswordVisibilityButton(applicationContext: LoginFormPasswordVisibilityButtonContext){
    const passwordListener = function(state: PasswordValidation){
        let passwordVisibilityButtonClasses = [];
        switch(state){
            default:
                throw new Error('Untreated state: ' + state);
            case 'invalid':
                passwordVisibilityButtonClasses = passwordVisibilityButton.className.split(' ');
                passwordVisibilityButtonClasses = passwordVisibilityButtonClasses.filter((value) => value !== 'primary-input-background-color');
                passwordVisibilityButtonClasses.push('primary-input-warning-fill-color');
                passwordVisibilityButton.className = passwordVisibilityButtonClasses.join(' ');
                break;
            case 'valid':
                passwordVisibilityButtonClasses = passwordVisibilityButton.className.split(' ');
                passwordVisibilityButtonClasses = passwordVisibilityButtonClasses.filter((value) => value !== 'primary-input-warning-fill-color');
                passwordVisibilityButtonClasses.push('primary-input-background-color');
                passwordVisibilityButton.className = passwordVisibilityButtonClasses.join(' ');
                break;
        }
    }

    applicationContext.subscribeToPasswordListening(passwordListener);

    const container: HTMLDivElement = createDiv(
        'login-form-password-visibility-button-container',
        [],
        {
            padding: pxToRem(9)
        }
    );

    const passwordVisibilityButton = PasswordVisibilityButton(applicationContext);

    container.append(
        passwordVisibilityButton    
    );

    return container;
}