export const state = {
    theme: 'dark'
};

export const changeThemeClasses = function(element){
    const classList = element.classList;
    switch(state.theme){
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

export const changeBodyTheme = function(){
    const elements = document.querySelectorAll('*');

    elements.forEach((element) => {
        changeThemeClasses(element);
    })
}

export const setTheme = function(theme){
    localStorage.setItem('theme', theme);
    state.theme = theme;
}

export const getTheme = function(){
    localStorage.getItem('theme');
}

export const startTheme = () => {    
    const theme = localStorage.getItem('theme');

    if (theme === null){
        setTheme('dark');
    }
    else{
        setTheme(theme);
    }

    changeBodyTheme();
}