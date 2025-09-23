import type { Themes } from "../enums/enums";
import type { ElementInterface } from "../interfaces/interfaces";
import { createDiv } from "../tools/element-creator";
import { pxToRem, toString } from "../tools/measures";
import { get } from "../tools/theme-manager";
import LoginFormThemeToggler from "./login-form/LoginFormThemeToggler";
import LoginFormTitle from "./login-form/LoginFormTitle";
import LoginFormUsernameTextInput from "./login-form/LoginFormUsernameTextInput";

export default function LoginForm(elementInterface: ElementInterface): HTMLElement{  
    const theme: Themes = get();
    const backgroundContainer: HTMLDivElement = createDiv(
        'login-form-background-container',
        [
            'secondary-background-color',
            'primary-border-color',
            theme,
            "flex",
            'flex-column',
            'flex-horizontal-center'
        ],
        {
            width: toString(CSS.px(600)),
            height: pxToRem(500),
            borderWidth: pxToRem(4),
            borderStyle: 'solid',
            borderRadius: pxToRem(15),
            padding: pxToRem(36)           
        },        
    );

    backgroundContainer.append(
        LoginFormTitle(elementInterface)
    );

    backgroundContainer.append(
        LoginFormThemeToggler(elementInterface)
    )

    backgroundContainer.append(
        LoginFormUsernameTextInput(elementInterface)
    );

    return backgroundContainer;
}