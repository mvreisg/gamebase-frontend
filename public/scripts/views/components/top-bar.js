import {
    findByUserName
} from '../../requests/user.js'

import {
    loadSvgToUrl
} from './../../svg.js'

const compactDropdownState = {
    opened: false,
    categoriesDropdown: {
        opened: false
    },
    profileMenu: {
        opened: false
    }
};

export const start = async () => {
    const token = localStorage.getItem('token');
    
    const searchParams = new URLSearchParams(window.location.search)
    const usernameParam = searchParams.get('username');

    let username = localStorage.getItem('username');
    if (username === null && usernameParam){
        localStorage.setItem('username', usernameParam);
        username = usernameParam;
    }

    const userResponse = await findByUserName(username, token);

    const userStatus = userResponse.status;

    if (userStatus !== 200){
        navigateTo('/?logoff=true');
        return;
    }

    const userJson = await userResponse.json();

    const cssResponse = await fetch('./../styles/components/top-bar.css');
    const cssText = await cssResponse.text();
    const style = document.createElement('style');
    style.innerHTML = cssText;
    document.head.append(style);

    const htmlResponse = await fetch('./../views/components/top-bar.html');
    const htmlText = await htmlResponse.text();        
    document.querySelector('#top-bar').innerHTML = htmlText;  

    const themeTogglerResponse = await import('./theme-toggler.js');
    await themeTogglerResponse.start();

    document.querySelector("#profile-menu-welcome-message-username").innerHTML = userJson.data.username;

    document.querySelector("#full-bar-nav-item-categories").addEventListener('mouseenter', () => {
        const element = document.querySelector("#full-bar-nav-categories-dropdown");
        element.style.display = 'flex';
    });

    document.querySelector("#full-bar-nav-item-categories").addEventListener('mouseleave', () => {
        const element = document.querySelector("#full-bar-nav-categories-dropdown");
        element.style.display = 'none';
    });

    document.querySelector("#compact-menu-icon-div").addEventListener('click', async () => {    
        compactDropdownState.opened = !compactDropdownState.opened;
        const div = document.querySelector("#compact-menu-icon-div");
                
        if (compactDropdownState.opened){
            div.classList.add('opened');            
        } else {
            div.classList.remove('opened');            
        }
        changeCompactMenuIconImage();

        const elements = document.querySelectorAll(".compact-nav-item");        
        elements.forEach((element) => {
            const display = window.getComputedStyle(element).display;
            switch (display){
                case 'none':
                    element.style.display = 'flex';
                    break;
                case 'flex':
                    element.style.display = 'none';
                    break;                    
            }
        });
    });

    document.querySelector("#compact-nav-categories-item").addEventListener('click', () => {
        compactDropdownState.categoriesDropdown.opened = !compactDropdownState.categoriesDropdown.opened;
        const img = document.querySelector("#compact-categories-image");
        if (compactDropdownState.categoriesDropdown.opened) {
            img.style.transform = 'rotate(90deg)';
        } else {
            img.style.transform = 'rotate(0deg)';
        }
        const element = document.querySelector("#compact-nav-categories-dropdown");        
        const display = window.getComputedStyle(element).display;
        switch (display){
            case 'none':
                element.style.display = 'flex';
                break;
            case 'flex':
                element.style.display = 'none';
                break;                    
        }        
    });

    document.querySelector("#profile-menu-icon-div").addEventListener('click', () => {
        compactDropdownState.profileMenu.opened = !compactDropdownState.profileMenu.opened;
        const div = document.querySelector("#profile-menu");
        if (compactDropdownState.profileMenu.opened){
            div.style.display = 'flex';
        } else{
            div.style.display = 'none';
        }
    });

    document.addEventListener('changeThemeEvent', () => {
        changeProfileMenuIcon();
        changeCompactNavBarIcon();
        changeCompactMenuIconImage();
        changeCompactNavItemsImage();
    });

    changeProfileMenuIcon();
    changeCompactNavBarIcon();
    changeCompactMenuIconImage();
    changeCompactNavItemsImage();
}

const changeProfileMenuIcon = async () => {
    const img = document.querySelector("#profile-menu-icon");
    switch(localStorage.getItem('theme')){
        case 'dark':
            img.src = await loadSvgToUrl('profile-dark');
            break;
        case 'light':
            img.src = await loadSvgToUrl('profile-light');
            break;
    }
}

const changeCompactNavBarIcon = async () => {
    const img = document.querySelector("#compact-menu-icon-image");
    switch(localStorage.getItem('theme')){
        case 'dark':
            img.src = await loadSvgToUrl('bars-dark');
            break;
        case 'light':
            img.src = await loadSvgToUrl('bars-light');
            break;
    }
}

const changeCompactMenuIconImage = async () => {
    const img = document.querySelector("#compact-menu-icon-image");
    const theme = localStorage.getItem('theme');
    if (compactDropdownState.opened){
        switch(theme){
            case 'dark':
                img.src = await loadSvgToUrl('x-dark');
                break;
            case 'light':
                img.src = await loadSvgToUrl('x-light');
                break;
        }            
    } else {
        switch(theme){
            case 'dark':
                img.src = await loadSvgToUrl('bars-dark');
                break;
            case 'light':
                img.src = await loadSvgToUrl('bars-light');
                break;
        }            
    }
}

const changeCompactNavItemsImage = async () => {
    const images = document.querySelectorAll(".compact-nav-items-image");
    const theme = localStorage.getItem('theme');
    images.forEach(async (image) => {
        switch(theme){
            case 'dark':
                image.src = await loadSvgToUrl('arrow-pointing-to-right-dark');
                break;
            case 'light':
                image.src = await loadSvgToUrl('arrow-pointing-to-right-light');
                break;
        }
    });
}