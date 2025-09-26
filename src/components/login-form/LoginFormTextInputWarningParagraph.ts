import type { LoginFormContext, TextInputWarningParagraphElementParameters, TextInputWarningParagraphElementProperties } from "../../interfaces/interfaces";
import { createParagraph } from "../../tools/elements";
import { changeThemeClasses } from "../../tools/themes";
import type { WarningParagraphVisibility } from "../../types/types";

export default function LoginFormTextInputWarningParagraph(
    applicationContext: LoginFormContext, 
    elementParameters: TextInputWarningParagraphElementParameters
): TextInputWarningParagraphElementProperties {
    let visibility: WarningParagraphVisibility = 'hidden' as WarningParagraphVisibility;

    applicationContext.subscribeToThemeListening(() => {
        changeThemeClasses(warningParagraph);       
    });    

    const setVisibility = function(value: WarningParagraphVisibility){
        visibility = value;
        warningParagraph.style.visibility = visibility === 'visible' ? 'visible': 'hidden';
    }

    const getVisibility = function(): WarningParagraphVisibility {
        return visibility;
    }

    const warningParagraph: HTMLParagraphElement = createParagraph(
        elementParameters.id,
        elementParameters.classes,
        elementParameters.styles,
        elementParameters.text
    );

    return {
        element: warningParagraph,
        methods: {
            getVisibility,
            setVisibility
        }
    };
}