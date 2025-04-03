import {
    loadSvgToUrl
} from './svg.js'

const environment = {
    type: '',
    backendURL: ''
};

const compactDropdownState = {
    opened: false,
    categoriesDropdown: {
        opened: false
    },
    profileMenu: {
        opened: false
    }
};

(async() => {
    const envResponse = await fetch('./config/environment.json');
    const envJson = await envResponse.json();
    environment.type = envJson.type;
    environment.backendURL = envJson.options[environment.type].backendURL;  

    const token = localStorage.getItem('token');
    if (token === null){
        navigateTo('/', '');
        return;
    }

    const loginState = {
        mustLogoff: false
    };

    {
        try{
            const body = {
                'token': token
            };
            const response = await fetch(`${environment.backendURL}/auth/validate`, {
                method: 'POST',
                body: JSON.stringify(body)
            });
            const status = response.status;
            if (status === 401 || status === 500){
                loginState.mustLogoff = true;
            }
        } catch {
            loginState.mustLogoff = true;
        }        
    }

    if (loginState.mustLogoff){
        try{
            const body = {
                'token': token
            };
            const response = await fetch(`${environment.backendURL}/auth/logoff`, {
                method: 'POST',
                body: JSON.stringify(body)
            });
        } finally {
            localStorage.removeItem('token');
            navigateTo('/', '');
            return;
        }     
    }    
    
    const fetchResponse = await fetch('./views/home.html');
    const fetchText = await fetchResponse.text();
    document.querySelector('#app').innerHTML = fetchText;

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
        const img = document.querySelector("#compact-menu-icon-image");
        if (compactDropdownState.opened){
            div.classList.add('opened');
            img.src = await loadSvgToUrl('x-dark');
        } else {
            div.classList.remove('opened');
            img.src = await loadSvgToUrl('bars-dark');
        }

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
})();