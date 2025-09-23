import type { Themes } from "../../enums/enums";
import type { ElementInterface } from "../../interfaces/interfaces";
import { createDiv, createTextInput } from "../../tools/element-creator";
import { percent, pxToRem } from "../../tools/measures";
import { get } from "../../tools/theme-manager";

export default function LoginFormUsernameTextInput(elementInterface: ElementInterface){
    const theme: Themes = get();
    const backgroundContainer: HTMLDivElement = createDiv(
        'login-form-username-text-input-background-container',
        [
            theme,               
            'primary-border-color',
        ],
        {
            width: pxToRem(520),
            height: pxToRem(50),
            borderWidth: pxToRem(4),
            borderRadius: pxToRem(16),
            borderStyle: 'solid'
        }
    );

    const textInput: HTMLInputElement = createTextInput(
        'login-form-username-text-input',
        [
            theme,
            'border-box',
            'border-0',
            'padding-0',
            'text-color',
            'primary-text-box-background-color',
            'text-input-font'
        ],
        {
            width: percent(100),
            height: percent(100),
            borderRadius: pxToRem(12),
            padding: pxToRem(11)
        }
    )

    backgroundContainer.append(
        textInput
    );

    return backgroundContainer;
}