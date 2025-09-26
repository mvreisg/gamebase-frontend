import type {
    ApplicationContext,
    ElementParameters,
    ElementProperties,
} from '../../interfaces/interfaces';
import ThemeToggler from '../ThemeToggler';

export default function LoginFormThemeToggler(
    applicationContext: ApplicationContext,
    elementParameters: ElementParameters
): ElementProperties {
    const themeToggler = ThemeToggler(applicationContext, elementParameters);

    return {
        element: themeToggler.element,
    };
}
