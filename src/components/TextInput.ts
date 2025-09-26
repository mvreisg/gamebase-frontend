import type {
    ElementParameters,
    LoginFormContext,
    TextInputElementProperties,
} from '../interfaces/interfaces';
import { createTextInput } from '../tools/elements';
import { changeThemeClasses } from '../tools/themes';

export default function TextInput(
    applicationContext: LoginFormContext,
    elementParameterProperties: ElementParameters
): TextInputElementProperties {
    applicationContext.subscribeToThemeListening(() => {
        changeThemeClasses(textInput);
    });

    const textInput: HTMLInputElement = createTextInput(
        elementParameterProperties.id,
        elementParameterProperties.classes,
        elementParameterProperties.styles
    );

    const getValue = function (): string {
        return textInput.value;
    };

    return {
        element: textInput,
        methods: {
            getValue,
        },
    };
}
