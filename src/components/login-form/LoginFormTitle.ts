import type { Themes } from "../../enums/enums";
import type { ElementInterface } from "../../interfaces/interfaces";
import { createDiv } from "../../tools/element-creator";
import { get } from "../../tools/theme-manager";
import Title from "../Title";

export default function LoginFormTitle(elementInterface: ElementInterface){
    const theme: Themes = get();
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
        Title(elementInterface)
    );

    return containerDiv;
}