import type { ApplicationContext } from "../../interfaces/interfaces";
import { createDiv } from "../../tools/elements";
import { pxToRem } from "../../tools/measures";
import ThemeToggler from "../ThemeToggler";

export default function LoginFormThemeToggler(applicationContext: ApplicationContext){
    const container = createDiv(
        'login-form-theme-toggler-container',
        [],
        {
            paddingTop: pxToRem(14),
            paddingBottom: pxToRem(14),
        }                
    );

    container.append(
        ThemeToggler(applicationContext)
    )

    return container;
}