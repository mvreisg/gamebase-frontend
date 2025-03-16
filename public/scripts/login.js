let oneWeekLabel = null;    
let oneWeekInput = null;
let passwordVisibilityIndicatorImage = null;
let isOneWeekChecked = false;
let isPasswordVisible = false;
let theme = null;
const prefix = './../assets/svg/';
const suffix = '.svg'

window.onload = () => {
    oneWeekLabel = document.querySelector("#one-week-checkbox-label");    
    oneWeekInput = oneWeekLabel.querySelector("input");    
    passwordVisibilityIndicatorImage = document.querySelector("#password-visibility-indicator");

    theme = localStorage.getItem('theme');

    if (theme === null){
        setTheme('dark');
    }

    changeBodyTheme();

    setPasswordVisibility(isPasswordVisible);
    setPasswordVisibilityVisual(isPasswordVisible);
    setOneWeekCheckboxState(isOneWeekChecked);

    changeThemeCircleImage();
}

const changeThemeClasses = function(element){
    const classList = element.classList;
    switch(theme){
        case 'dark':
            classList.remove('light');
            classList.add('dark');
            break;
        case 'light':
            classList.remove('dark');
            classList.add('light');
            break;
    }    
    return classList;
}

const changeBodyTheme = function(){
    const body = document.querySelector('body');     
    body.classList = changeThemeClasses(body);

    const title = document.querySelector("#title");
    title.classList = changeThemeClasses(title);

    const form = document.querySelector('#login-balloon-box'); 
    form.classList = changeThemeClasses(form);

    const bar = document.querySelector("#theme-toggler-bar");
    const circle = document.querySelector("#theme-toggler-circle");
    bar.classList = changeThemeClasses(bar);
    circle.classList = changeThemeClasses(circle);

    const textInputs = document.querySelectorAll('.text-input-div');
    textInputs.forEach((value) => {
        value.classList = changeThemeClasses(value);
    });
    
    const oneWeekCheckboxLabel = document.querySelector('#one-week-checkbox-label');
    oneWeekCheckboxLabel.classList = changeThemeClasses(oneWeekCheckboxLabel);

    const oneWeekReminderSpan = document.querySelector('.one-week-reminder-text');
    oneWeekReminderSpan.classList = changeThemeClasses(oneWeekReminderSpan);

    const usernameField = document.querySelector("#username");
    usernameField.classList = changeThemeClasses(usernameField);

    const passwordField = document.querySelector("#password");
    passwordField.classList = changeThemeClasses(passwordField);

    const loginButtonLabel = document.querySelector("#login-button-label");
    loginButtonLabel.classList = changeThemeClasses(loginButtonLabel);

    const loginButtonSpan = document.querySelector("#login-button-label>button>span");
    loginButtonSpan.classList = changeThemeClasses(loginButtonSpan);
}

const setTheme = function(themeToChangeTo){
    localStorage.setItem('theme', themeToChangeTo);
    theme = themeToChangeTo;
}

const getTheme = function(){
    localStorage.getItem('theme');
}

const toggleTheme = function(){
    switch(theme){
        case 'dark': 
            setTheme('light');           
            break;
        case 'light':                    
            setTheme('dark');
            break;
    }

    changeBodyTheme();   

    setPasswordVisibility(isPasswordVisible);
    setPasswordVisibilityVisual(isPasswordVisible);
    setOneWeekCheckboxState(isOneWeekChecked);

    changeThemeCircleImage();
}

const toggleOneWeekCheckboxState = function(){ 
    const isChecked = !isOneWeekChecked;
    setOneWeekCheckboxState(isChecked);
}

const setOneWeekCheckboxState = function(isChecked){ 
    isOneWeekChecked = isChecked;
    oneWeekInput.checked = isChecked;
    setOneWeekCheckboxVisual(isChecked);
}

const setOneWeekCheckboxVisual = function(isChecked){
    const classList = oneWeekLabel.classList;
    if (isChecked){
        classList.remove('unchecked');
        classList.add('checked');
    } else{
        classList.remove('checked');
        classList.add('unchecked');
    }
}

const togglePasswordVisibility = function(){    
    isPasswordVisible = !isPasswordVisible;
    setPasswordVisibilityVisual(isPasswordVisible);
}

const setPasswordVisibility = function(isVisible){    
    isPasswordVisible = isVisible;
    setPasswordVisibilityVisual(isVisible);
}

const setPasswordVisibilityVisual = function(isVisible){            
    const passwordInput = document.querySelector("#password");
    if (isVisible){
        passwordInput.setAttribute("type", "text");
        switch(theme){
            case 'light':
                passwordVisibilityIndicatorImage.setAttribute("src", prefix + "eye-dashed-light" + suffix);
                break;
            case 'dark':
                passwordVisibilityIndicatorImage.setAttribute("src", prefix + "eye-dashed-dark" + suffix);
                break;
        }
    } else {
        passwordInput.setAttribute("type", "password");
        switch(theme){
            case 'light':
                passwordVisibilityIndicatorImage.setAttribute("src", prefix + "eye-open-light" + suffix);
                break;
            case 'dark':
                passwordVisibilityIndicatorImage.setAttribute("src", prefix + "eye-open-dark" + suffix);
                break;
        }        
    }
}

const changeThemeCircleImage = function(){
    const img = document.querySelector("#theme-toggler-circle>img");
    switch(theme){
        case 'dark':
            img.setAttribute("src", prefix + "sun-light" + suffix);
            break;
        case 'light':
            img.setAttribute("src", prefix + "moon-dark" + suffix);
            break;
    }    
}
