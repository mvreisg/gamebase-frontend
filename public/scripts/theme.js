export const changeThemeEvent = new Event('changeThemeEvent');

const changeThemeClasses = function(element){
    const classList = element.classList;
    switch(localStorage.getItem('theme')){
        case 'dark':
            if (classList.contains('light')){
                classList.remove('light');
                classList.add('dark');
            }                        
            break;
        case 'light':
            if (classList.contains('dark')){
                classList.remove('dark');
                classList.add('light');
            }
            break;
    }    
    return classList;
}

export const changeNodeTheme = (selector) => {
    const elements = document.querySelectorAll(selector);

    elements.forEach((element) => {
        changeThemeClasses(element);
    });
}

export const changeBodyTheme = function(){
    changeNodeTheme('*');
}

export const startTheme = () => {    
    const theme = localStorage.getItem('theme');

    if (theme === null){
        localStorage.setItem('theme', 'dark');
    }

    changeBodyTheme();
}