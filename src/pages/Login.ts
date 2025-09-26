import { createDiv } from '../tools/elements';
import LoginForm from '../components/LoginForm';
import type {
    ApplicationContext,
    ElementParameters,
    ElementProperties,
} from '../interfaces/interfaces';
import { changeThemeClasses } from '../tools/themes';
import { pxToRem, toString } from '../tools/measures';

export default function Login(
    applicationContext: ApplicationContext,
    elementParameters: ElementParameters
): ElementProperties {
    applicationContext.subscribeToThemeListening(() => {
        changeThemeClasses(container);
    });

    const theme = applicationContext.getTheme();

    const container: HTMLDivElement = createDiv(
        elementParameters.id,
        elementParameters.classes
    );

    const loginForm = LoginForm(applicationContext, {
        id: 'login-form',
        classes: [
            'secondary-background-color',
            'primary-border-color',
            theme,
            'flex',
            'flex-column',
            'flex-horizontal-center',
        ],
        styles: {
            width: toString(CSS.px(600)),
            height: pxToRem(500),
            borderWidth: pxToRem(4),
            borderStyle: 'solid',
            borderRadius: pxToRem(15),
            padding: pxToRem(36),
        },
    });

    container.append(loginForm.element);

    return {
        element: container,
    };
}
