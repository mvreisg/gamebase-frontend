import type { Themes } from "../enums/enums";
import type { ElementInterface } from "../interfaces/interfaces";
import { createH1 } from "../tools/element-creator";
import { get } from "../tools/theme-manager";

export default function Title(elementInterface: ElementInterface){
    const theme: Themes = get();
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