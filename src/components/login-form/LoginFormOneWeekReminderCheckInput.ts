import type {
    ApplicationContext,
    CheckInputElementProperties,
    ElementParameters,
} from '../../interfaces/interfaces';
import { createLabel } from '../../tools/elements';
import { changeThemeClasses } from '../../tools/themes';
import CheckInput from '../CheckInput';

export default function LoginFormOneWeekReminderCheckInput(
    applicationContext: ApplicationContext,
    elementParameters: ElementParameters
): CheckInputElementProperties {
    applicationContext.subscribeToThemeListening(() => {
        changeThemeClasses(label);
    });

    const theme = applicationContext.getTheme();

    const label: HTMLLabelElement = createLabel(
        elementParameters.id,
        elementParameters.classes,
        elementParameters.styles
    );

    const checkInput = CheckInput(applicationContext, {
        id: 'login-form-one-week-reminder-check-input',
        classes: [
            theme,
            'w-100',
            'h-100',
            'margin-0',
            'appearance-none',
            'cursor-pointer',
        ],
    });

    label.append(checkInput.element);

    return {
        element: label,
        methods: checkInput.methods,
    };
}
