import type { Themes } from '../types/types';

const listeners: CallableFunction[] = [];

export const subscribe = function (callback: CallableFunction) {
    listeners.push(callback);
};

export const notify = function () {
    listeners.forEach((callback) => callback(get()));
};

export const set = function (theme: Themes = 'dark') {
    switch (theme) {
        default:
            throw new Error('Untreated theme: ' + theme);
        case 'light':
        case 'dark':
            localStorage.setItem('theme', theme);
            break;
    }
};

export const get = function (): Themes {
    const theme = localStorage.getItem('theme');
    if (theme === null) {
        throw new Error('Theme value not defined!');
    }
    switch (theme) {
        default:
            throw new Error('Untreated theme: ' + theme);
        case 'light':
        case 'dark':
            return theme;
    }
};

export const create = function () {
    const theme = localStorage.getItem('theme');
    if (theme === null) {
        set();
    }
};

export const changeThemeClasses = function (element: HTMLElement) {
    let classes = element.className.split(' ');
    classes = classes.filter((value) =>
        value === 'light' || value === 'dark' ? false : true
    );
    const theme = get();
    switch (theme) {
        default:
            throw new Error('Untreated theme: ' + theme);
        case 'dark':
            classes.push('dark');
            break;
        case 'light':
            classes.push('light');
            break;
    }
    element.className = classes.join(' ');
};
