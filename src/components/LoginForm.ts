import type {
    ApplicationContext,
    ElementParameters,
    ElementProperties,
} from '../interfaces/interfaces';
import { createForm } from '../tools/elements';
import { pxToRem } from '../tools/measures';
import { changeThemeClasses } from '../tools/themes';
import Filler from './Filler';
import LoginFormOneWeekReminder from './login-form/LoginFormOneWeekReminder';
import LoginFormPasswordTextInput from './login-form/LoginFormPasswordTextInput';
import LoginFormThemeToggler from './login-form/LoginFormThemeToggler';
import LoginFormTitle from './login-form/LoginFormTitle';
import LoginFormUsernameTextInput from './login-form/LoginFormUsernameTextInput';

export default function LoginForm(
    applicationContext: ApplicationContext,
    elementParameters: ElementParameters
): ElementProperties {
    applicationContext.subscribeToThemeListening(() => {
        changeThemeClasses(container);
    });

    const theme = applicationContext.getTheme();

    const usernameListeners: CallableFunction[] = [];
    const passwordListeners: CallableFunction[] = [];
    let isUsernameValid: boolean | undefined = undefined;
    let isPasswordValid: boolean | undefined = undefined;

    const setIsUsernameValid = function (value: boolean) {
        const previousValue = isUsernameValid;
        isUsernameValid = value;
        if (previousValue === undefined || previousValue !== isUsernameValid) {
            usernameListeners.forEach((value) =>
                value(isUsernameValid ? 'valid' : 'invalid')
            );
        }
    };

    const subscribeToPasswordListening = function (callback: CallableFunction) {
        passwordListeners.push(callback);
    };

    const setIsPasswordValid = function (value: boolean) {
        const previousValue = isPasswordValid;
        isPasswordValid = value;
        if (previousValue === undefined || previousValue !== isPasswordValid) {
            passwordListeners.forEach((value) =>
                value(isPasswordValid ? 'valid' : 'invalid')
            );
        }
    };

    const subscribeToUsernameListening = function (callback: CallableFunction) {
        usernameListeners.push(callback);
    };

    const container: HTMLFormElement = createForm(
        elementParameters.id,
        elementParameters.classes,
        elementParameters.styles
    );

    const loginFormTitle = LoginFormTitle(applicationContext, {
        id: 'login-form-title',
        classes: ['w-100', theme, 'flex', 'flex-row', 'flex-horizontal-center'],
    });

    container.append(loginFormTitle.element);

    container.append(
        Filler(applicationContext, {
            classes: ['w-100'],
            styles: {
                height: pxToRem(14),
            },
        }).element
    );

    const loginFormThemeToggler = LoginFormThemeToggler(applicationContext, {
        id: 'login-form-theme-toggler',
        classes: [theme, 'position-relative', 'flex', 'flex-center'],
        styles: {
            width: pxToRem(44),
            height: pxToRem(28),
        },
    });

    container.append(loginFormThemeToggler.element);

    container.append(
        Filler(applicationContext, {
            classes: ['w-100'],
            styles: {
                height: pxToRem(14),
            },
        }).element
    );

    const loginFormUsernameTextInput = LoginFormUsernameTextInput(
        {
            getTheme: applicationContext.getTheme,
            setTheme: applicationContext.setTheme,
            subscribeToThemeListening:
                applicationContext.subscribeToThemeListening,
            setIsPasswordValid,
            subscribeToPasswordListening,
            setIsUsernameValid,
            subscribeToUsernameListening,
        },
        {
            classes: [
                theme,
                'primary-border-color',
                'w-100',
                'border-box',
                'position-relative',
                'flex',
                'flex-row',
                'flex-vertical-center',
            ],
            styles: {
                height: pxToRem(50),
                borderWidth: pxToRem(4),
                borderRadius: pxToRem(16),
                borderStyle: 'solid',
            },
        }
    );

    container.append(loginFormUsernameTextInput.element);

    container.append(
        Filler(applicationContext, {
            classes: ['w-100'],
            styles: {
                height: pxToRem(50),
            },
        }).element
    );

    const loginFormPasswordTextInput = LoginFormPasswordTextInput(
        {
            ...applicationContext,
            setIsPasswordValid: setIsPasswordValid,
            subscribeToPasswordListening: subscribeToPasswordListening,
            setIsUsernameValid: setIsUsernameValid,
            subscribeToUsernameListening: subscribeToUsernameListening,
        },
        {
            classes: [
                theme,
                'primary-border-color',
                'primary-input-background-color',
                'flex',
                'flex-row',
                'flex-vertical-center',
                'w-100',
                'border-box',
                'position-relative',
            ],
            styles: {
                height: pxToRem(50),
                borderWidth: pxToRem(4),
                borderRadius: pxToRem(16),
                borderStyle: 'solid',
            },
        }
    );

    container.append(loginFormPasswordTextInput.element);

    container.append(
        Filler(applicationContext, {
            classes: ['w-100'],
            styles: {
                height: pxToRem(65),
            },
        }).element
    );

    const loginFormOneWeekReminder = LoginFormOneWeekReminder(
        applicationContext,
        {
            id: 'login-form-one-week-reminder',
            classes: ['w-100', 'flex', 'flex-row', 'flex-vertical-center'],
        }
    );

    container.append(loginFormOneWeekReminder.element);

    return {
        element: container,
    };
}
