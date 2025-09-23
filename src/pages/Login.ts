import { createDiv } from '../tools/element-creator';
import LoginForm from '../components/LoginForm';
import type { ElementInterface } from '../interfaces/interfaces';
import { get } from '../tools/theme-manager';
import type { Themes } from '../enums/enums';

export default function Login(elementInterface: ElementInterface): HTMLElement {    
    const theme: Themes = get();
    const backgroundContainer: HTMLDivElement = createDiv(
        'login-background-container',
        [
            'w-100vw',
            'h-100vh',
            'primary-background-color',
            theme,
            'flex',
            'flex-center'
        ],        
    );

    backgroundContainer.append(
        LoginForm(elementInterface)
    );

    return backgroundContainer;
}