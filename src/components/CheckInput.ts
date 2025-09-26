import type { ApplicationContext, CheckInputElementProperties, ElementParameters } from "../interfaces/interfaces";
import { createCheckInput } from "../tools/elements";
import { changeThemeClasses } from "../tools/themes";

export default function CheckInput(
    applicationContext: ApplicationContext,
    elementParameters: ElementParameters
): CheckInputElementProperties {
    applicationContext.subscribeToThemeListening(() => {
        changeThemeClasses(input);
    });

    let checked: boolean = false;

    const input: HTMLInputElement = createCheckInput(
        elementParameters.id,
        elementParameters.classes,
        elementParameters.styles
    );  

    const setChecked = function(value: boolean){
        checked = value;
    }

    const getChecked = function(): boolean {
        return checked;
    }

    input.addEventListener('click', () => {
        setChecked(input.checked);
        let classes = input.className.split(' ');
        classes = classes.filter((value) => value !== 'primary-input-fill-color');
        if (getChecked()){
            classes.push('primary-input-fill-color');
        }
        input.className = classes.join(' ');
    });

    setChecked(input.checked);

    return { 
        element: input,
        methods: {
            getChecked,
            setChecked
        }
    };
}