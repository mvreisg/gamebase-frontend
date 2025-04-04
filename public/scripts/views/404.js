import {
    startTheme
} from './../theme.js'

export const start = async () => {
    const cssResponse = await fetch('./styles/404.css');
    const cssText = await cssResponse.text();
    const style = document.createElement('style');
    style.innerHTML = cssText;
    document.head.append(style);

    const htmlResponse = await fetch('./views/404.html');
    const htmlText = await htmlResponse.text();
    document.querySelector('#app').innerHTML = htmlText;

    startTheme();
}