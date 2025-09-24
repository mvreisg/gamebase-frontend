import type { ApplicationContext } from "../interfaces/interfaces";
import { createH1 } from "../tools/elements";
import { changeThemeClasses } from "../tools/themes";
import type { Themes } from "../types/types";

export default function Title(applicationContext: ApplicationContext){
    applicationContext.subscribeToThemeListening(() => {
        changeThemeClasses(h1);        
    });

    const theme: Themes = applicationContext.getTheme();

    const h1: HTMLHeadingElement = createH1(
        'login-form-title',
        [
            'text-color',
            theme,
            'h1-title-font',            
        ],        
        {
            
        },        
        'Gamebase'
    );

    return h1;
}