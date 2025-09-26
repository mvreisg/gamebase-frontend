import type {
    ApplicationContext,
    ElementParameters,
    ElementProperties,
} from '../interfaces/interfaces';
import { createDiv } from '../tools/elements';
import { changeThemeClasses } from '../tools/themes';

export default function Filler(
    applicationContext: ApplicationContext,
    elementParameters: ElementParameters
): ElementProperties {
    applicationContext.subscribeToThemeListening(() => {
        changeThemeClasses(div);
    });

    const div = createDiv(
        elementParameters.id,
        elementParameters.classes,
        elementParameters.styles
    );

    return {
        element: div,
    };
}
