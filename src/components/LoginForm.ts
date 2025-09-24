import type { ApplicationContext } from "../interfaces/interfaces";
import { createDiv } from "../tools/elements";
import { pxToRem, toString } from "../tools/measures";
import { changeThemeClasses } from "../tools/themes";
import LoginFormOneWeekReminder from "./login-form/LoginFormOneWeekReminder";
import LoginFormPasswordTextInput from "./login-form/LoginFormPasswordTextInput";
import LoginFormThemeToggler from "./login-form/LoginFormThemeToggler";
import LoginFormTitle from "./login-form/LoginFormTitle";
import LoginFormUsernameTextInput from "./login-form/LoginFormUsernameTextInput";

export default function LoginForm(applicationContext: ApplicationContext): HTMLElement{  
    applicationContext.subscribeToThemeListening(() => {
        changeThemeClasses(backgroundContainer);
    });

    const theme = applicationContext.getTheme();  

    const usernameListeners: CallableFunction[] = [];
    const passwordListeners: CallableFunction[] = [];
    let isUsernameValid: boolean|undefined = undefined;
    let isPasswordValid: boolean|undefined = undefined;

    const setIsUsernameValid = function(value: boolean){
        const previousValue = isUsernameValid;
        isUsernameValid = value
        if (previousValue === undefined || previousValue !== isUsernameValid){
            usernameListeners.forEach((value) => value(isUsernameValid ? 'valid' : 'invalid'))
        }
    };

    const subscribeToPasswordListening = function(callback: CallableFunction){
        passwordListeners.push(callback);
    };

    const setIsPasswordValid = function(value: boolean){
        const previousValue = isPasswordValid;
        isPasswordValid = value
        if (previousValue === undefined || previousValue !== isPasswordValid){
            passwordListeners.forEach((value) => value(isPasswordValid ? 'valid' : 'invalid'))
        }
    };

    const subscribeToUsernameListening = function(callback: CallableFunction){
        usernameListeners.push(callback);
    };    

    const backgroundContainer: HTMLDivElement = createDiv(
        'login-form-background-container',
        [
            'secondary-background-color',
            'primary-border-color',
            theme,
            "flex",
            'flex-column',
            'flex-horizontal-center'
        ],
        {
            width: toString(CSS.px(600)),
            height: pxToRem(500),
            borderWidth: pxToRem(4),
            borderStyle: 'solid',
            borderRadius: pxToRem(15),
            padding: pxToRem(36)           
        },        
    );

    backgroundContainer.append(
        LoginFormTitle(applicationContext)
    );

    backgroundContainer.append(
        LoginFormThemeToggler(applicationContext)
    )    

    backgroundContainer.append(
        LoginFormUsernameTextInput({
            getTheme: applicationContext.getTheme,
            setTheme: applicationContext.setTheme,
            subscribeToThemeListening: applicationContext.subscribeToThemeListening,
            setIsPasswordValid: setIsPasswordValid,
            subscribeToPasswordListening: subscribeToPasswordListening,
            setIsUsernameValid: setIsUsernameValid,
            subscribeToUsernameListening: subscribeToUsernameListening,
        })
    );

    backgroundContainer.append(
        createDiv(
            'login-form-text-inputs-filler',
            [
                'w-100'        
            ],
            {
                height: pxToRem(50)
            }
        )
    );

    backgroundContainer.append(
        LoginFormPasswordTextInput({
            getTheme: applicationContext.getTheme,
            setTheme: applicationContext.setTheme,
            subscribeToThemeListening: applicationContext.subscribeToThemeListening,
            setIsPasswordValid: setIsPasswordValid,
            subscribeToPasswordListening: subscribeToPasswordListening,
            setIsUsernameValid: setIsUsernameValid,
            subscribeToUsernameListening: subscribeToUsernameListening,
        })
    );

    backgroundContainer.append(
        createDiv(
            'login-form-text-inputs-one-week-reminder-filler',
            [
                'w-100'        
            ],
            {
                height: pxToRem(65)
            }
        )
    );    

    backgroundContainer.append(
        LoginFormOneWeekReminder(applicationContext)
    );

    return backgroundContainer;
}