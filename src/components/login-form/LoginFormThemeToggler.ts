import type { ElementInterface } from "../../interfaces/interfaces";
import { createDiv } from "../../tools/element-creator";
import { pxToRem } from "../../tools/measures";
import ThemeToggler from "../ThemeToggler";

export default function LoginFormThemeToggler(elementInterface: ElementInterface){
    const container = createDiv(
        'login-form-theme-toggler-container',
        [],
        {
            paddingTop: pxToRem(14),
            paddingBottom: pxToRem(14),
        }                
    );

    container.append(
        ThemeToggler(elementInterface)
    )

    return container;
}