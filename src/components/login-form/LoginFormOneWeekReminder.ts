import type {
    ApplicationContext,
    ElementParameters,
    ElementProperties,
} from '../../interfaces/interfaces';
import { createDiv, createParagraph } from '../../tools/elements';
import { pxToRem } from '../../tools/measures';
import { changeThemeClasses } from '../../tools/themes';
import Filler from '../Filler';
import LoginFormOneWeekReminderCheckInput from './LoginFormOneWeekReminderCheckInput';

export default function LoginFormOneWeekReminder(
    applicationContext: ApplicationContext,
    elementParameters: ElementParameters
): ElementProperties {
    applicationContext.subscribeToThemeListening(() => {
        changeThemeClasses(paragraph);
    });

    const theme = applicationContext.getTheme();

    const container: HTMLDivElement = createDiv(
        elementParameters.id,
        elementParameters.classes,
        elementParameters.styles
    );

    const paragraph: HTMLParagraphElement = createParagraph(
        'login-form-one-week-reminder-paragraph',
        [theme, 'text-color', 'paragraph-font'],
        undefined,
        'Lembrar de mim por uma semana'
    );

    const checkInput = LoginFormOneWeekReminderCheckInput(applicationContext, {
        classes: [theme, 'flex', 'flex-center', 'primary-border-color'],
        styles: {
            width: pxToRem(16),
            height: pxToRem(16),
            borderRadius: pxToRem(4),
            borderStyle: 'solid',
            borderWidth: pxToRem(4),
        },
    });

    container.append(checkInput.element);

    container.append(
        Filler(applicationContext, {
            classes: ['h-100'],
            styles: {
                width: pxToRem(8),
            },
        }).element
    );

    container.append(paragraph);

    return {
        element: container,
    };
}
