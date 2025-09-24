import type { ApplicationContext } from "../../interfaces/interfaces";
import { createDiv } from "../../tools/elements";
import { changeThemeClasses } from "../../tools/themes";
import Title from "../Title";

export default function LoginFormTitle(applicationContext: ApplicationContext){
    applicationContext.subscribeToThemeListening(() => {
        changeThemeClasses(containerDiv);        
    });

    const theme = applicationContext.getTheme();    

    const containerDiv: HTMLDivElement = createDiv(
        'login-form-title-container-div',
        [
            'w-100',
            theme,
            'flex',
            'flex-row',
            'flex-horizontal-center'
        ]
    );

    containerDiv.append(
        Title(applicationContext)
    );

    return containerDiv;
}