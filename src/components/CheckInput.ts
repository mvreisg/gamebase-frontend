import type { ApplicationContext } from "../interfaces/interfaces";
import { createCheckInput, createDiv } from "../tools/elements";
import { pxToRem } from "../tools/measures";
import { changeThemeClasses } from "../tools/themes";

export default function CheckInput(applicationContext: ApplicationContext){
    applicationContext.subscribeToThemeListening(() => {
        changeThemeClasses(container);
    });

    const theme = applicationContext.getTheme();  
    let checked: boolean = false;

    const container: HTMLDivElement = createDiv(
        'check-input-container',
        [
            theme,
            'flex',
            'flex-center',            
            'primary-border-color'
        ],
        {
            width: pxToRem(16),
            height: pxToRem(16),
            borderRadius: pxToRem(4),
            borderStyle: 'solid',
            borderWidth: pxToRem(4)
        }
    );

    const input: HTMLInputElement = createCheckInput(
        'check-input',
        [
            'w-100',
            'h-100',
            'margin-0',
            'appearance-none',
            'cursor-pointer'
        ],
        {
            borderRadius: pxToRem(4)
        }
    );  
    checked = input.checked;

    input.addEventListener('click', () => {
        checked = input.checked;
        let classes = container.className.split(' ');
        if (checked){
            classes.push('primary-input-fill-color');
        }
        else {
            classes = classes.filter((value) => value !== 'primary-input-fill-color');
        }
        container.className = classes.join(' ');
    });

    container.append(
        input
    );

    return container;
}