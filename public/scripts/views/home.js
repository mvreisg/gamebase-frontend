import {
    getEnvironment
} from '../environment.js';

import {
    navigateTo
} from '../history.js';

import {
    startTheme,
    changeBodyTheme
} from '../theme.js'

import {
    loadSvgToUrl
} from './../svg.js'

import {
    validate
} from '../requests/auth.js'

let environment = null;

export const start = async () => {
    environment = await getEnvironment();   

    const token = localStorage.getItem('token');
    if (token === null){
        navigateTo('/');
        return;
    }

    let needToLogOff = false;

    try{
        const response = await validate({
            'token': token
        });
        const status = response.status;
        if (status !== 200){
            needToLogOff = true;
        }
    } catch {
        needToLogOff = true;
    }   

    if (needToLogOff){
        navigateTo('/?logoff=true');
        return;          
    }    

    const cssResponse = await fetch('./styles/home.css');
    const cssText = await cssResponse.text();
    const style = document.createElement('style');
    style.innerHTML = cssText;
    document.head.append(style);

    const htmlResponse = await fetch('./views/home.html');
    const htmlText = await htmlResponse.text();        
    document.querySelector('#app').innerHTML = htmlText;  

    const topBarResponse = await import('./components/top-bar.js');
    await topBarResponse.start();

    startTheme();

    document.addEventListener('changeThemeEvent', () => {
        changeBodyTheme();
        changeWelcomeBoxHomeIcon();
    });

    changeWelcomeBoxHomeIcon();
}

const changeWelcomeBoxHomeIcon = async () => {
    const img = document.querySelector("#welcome-box-home-icon");
    switch(localStorage.getItem('theme')){
        case 'dark':
            img.src = await loadSvgToUrl('home-dark');
            break;
        case 'light':
            img.src = await loadSvgToUrl('home-light');
            break;
    }
}