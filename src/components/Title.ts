import type {
    ApplicationContext,
    TitleElementParameters,
    ElementProperties,
} from '../interfaces/interfaces';
import { createH1 } from '../tools/elements';
import { changeThemeClasses } from '../tools/themes';

export default function Title(
    applicationContext: ApplicationContext,
    elementParameters: TitleElementParameters
): ElementProperties {
    applicationContext.subscribeToThemeListening(() => {
        changeThemeClasses(h1);
    });

    const h1: HTMLHeadingElement = createH1(
        elementParameters.id,
        elementParameters.classes,
        elementParameters.styles,
        elementParameters.text
    );

    return {
        element: h1,
    };
}
