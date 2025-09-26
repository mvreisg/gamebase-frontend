import type {
    ElementParameters,
    LoginFormContext,
    TextInputElementProperties,
} from '../../interfaces/interfaces';
import { changeThemeClasses } from '../../tools/themes';
import TextInput from '../TextInput';

export default function LoginFormTextInput(
    applicationContext: LoginFormContext,
    elementParameters: ElementParameters
): TextInputElementProperties {
    applicationContext.subscribeToThemeListening(() => {
        changeThemeClasses(textInput.element);
    });

    const textInput = TextInput(applicationContext, elementParameters);

    const getValue = function (): string {
        return textInput.methods.getValue();
    };

    return {
        element: textInput.element,
        methods: {
            getValue,
        },
    };
}
