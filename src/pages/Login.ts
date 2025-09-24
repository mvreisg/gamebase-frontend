import { createDiv } from '../tools/elements';
import LoginForm from '../components/LoginForm';
import type { ApplicationContext } from '../interfaces/interfaces';
import { changeThemeClasses } from '../tools/themes';

export default function Login(applicationContext: ApplicationContext): HTMLElement {    
    applicationContext.subscribeToThemeListening(() => {
        changeThemeClasses(backgroundContainer);        
    });

    const theme = applicationContext.getTheme();    
        
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
        LoginForm(applicationContext)
    );

    return backgroundContainer;
}