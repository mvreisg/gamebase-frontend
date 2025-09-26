import type { ApplicationContext, ElementParameters, ElementProperties } from "../../interfaces/interfaces";
import { createDiv } from "../../tools/elements";
import { changeThemeClasses } from "../../tools/themes";
import Title from "../Title";

export default function LoginFormTitle(
    applicationContext: ApplicationContext,
    elementParameters: ElementParameters
): ElementProperties {
    applicationContext.subscribeToThemeListening(() => {
        changeThemeClasses(container);        
    });

    const theme = applicationContext.getTheme();    

    const container: HTMLDivElement = createDiv(
        elementParameters.id,
        elementParameters.classes,
        elementParameters.styles
    );

    const title = Title(
        applicationContext,
        {
            classes: [
                'text-color',
                theme,
                'h1-title-font',            
            ],        
            styles: {
                
            },        
            text: 'Gamebase'
        }
    );

    container.append(
        title.element
    );

    return {
        element: container
    };
}