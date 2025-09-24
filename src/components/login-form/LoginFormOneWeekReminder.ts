import type { ApplicationContext } from "../../interfaces/interfaces";
import { createDiv, createParagraph } from "../../tools/elements";
import { pxToRem } from "../../tools/measures";
import { changeThemeClasses } from "../../tools/themes";
import CheckInput from "../CheckInput";

export default function LoginFormOneWeekReminder(applicationContext: ApplicationContext){
    applicationContext.subscribeToThemeListening(() => {
        changeThemeClasses(paragraph);        
    });

    const theme = applicationContext.getTheme();    

    const container: HTMLDivElement = createDiv(
        'login-form-one-week-reminder-container',
        [
            'w-100',
            'flex',
            'flex-row',
            'flex-vertical-center',            
        ]        
    );

    const paragraph: HTMLParagraphElement = createParagraph(
        'login-form-one-week-reminder-paragraph',
        [
            theme,
            'text-color',
            'paragraph-font'
        ],
        {},        
        'Lembrar de mim por uma semana'
    )

    container.append(
        CheckInput(applicationContext)
    )

    container.append(
        createDiv(
            'login-form-one-week-reminder-filler',
            [
                'h-100'
            ],
            {
                width: pxToRem(8)
            }
        )
    )

    container.append(
        paragraph
    );

    return container;
}