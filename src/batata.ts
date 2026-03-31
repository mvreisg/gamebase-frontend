import type { ApplicationContext } from './interfaces/interfaces.ts';
import Login from './pages/Login.ts';
import './style.css';
import { create, get, notify, set, subscribe } from './tools/themes.ts';

try {
    create();

    let element: HTMLElement;

    const applicationContext: ApplicationContext = {
        setTheme: (theme) => {
            set(theme);
            notify();
        },
        getTheme: () => get(),
        subscribeToThemeListening: (callback) => subscribe(callback),
    };

    const pathname: string = window.location.pathname;
    switch (pathname) {
        case '/':
        case '/login':
            element = Login(applicationContext, {
                id: 'login-page',
                classes: [
                    'w-100vw',
                    'h-100vh',
                    'primary-background-color',
                    applicationContext.getTheme(),
                    'flex',
                    'flex-center',
                ],
            }).element;
            break;
        default:
            throw new Error('undefined pathname: ' + pathname);
    }

    const app = document.querySelector<HTMLDivElement>('#app');
    if (app === null) {
        throw new Error('App element not found!');
    }

    app.append(element);
} catch (e) {
    console.error(e);
}
