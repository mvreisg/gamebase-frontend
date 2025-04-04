import { 
    changeBodyTheme, 
    changeThemeEvent,
} from '../../theme.js';

import {
    loadSvgToUrl
} from '../../svg.js';

export const start = async () => {
    const cssResponse = await fetch('./../styles/components/theme-toggler.css');
    const cssText = await cssResponse.text();
    const style = document.createElement('style');
    style.innerHTML = cssText;
    document.head.append(style);

    const response = await fetch('./../views/components/theme-toggler.html');
    const text = await response.text();
    document.querySelector("#theme-toggler").innerHTML = text;    

    const themeTogglerInput = document.querySelector("#theme-toggler-input");
    themeTogglerInput.focus();
    themeTogglerInput.addEventListener("keydown", function(event) {
        if (event.code === "Space"){
            toggleTheme();
            changeThemeCircleImage();
            document.dispatchEvent(changeThemeEvent);
        }
    });
    
    document.querySelector("#theme-toggler-circle").addEventListener('click', () => {
        toggleTheme();
        changeThemeCircleImage();
        document.dispatchEvent(changeThemeEvent);
    });    

    changeBodyTheme();
    changeThemeCircleImage();
}

const changeThemeCircleImage = async function(){
    const img = document.querySelector("#theme-toggler-circle>img");
    switch(localStorage.getItem('theme')){
        case 'dark':
            img.src = await loadSvgToUrl('sun-light');
            break;
        case 'light':
            img.src = await loadSvgToUrl('moon-dark');
            break;
    }    
}

const toggleTheme = function(){
    switch(localStorage.getItem('theme')){
        case 'dark': 
            localStorage.setItem('theme', 'light');
            break;
        case 'light':                    
            localStorage.setItem('theme', 'dark');
            break;
    }
}