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

    setErrorMessageBoxVisibility(false);
    setUsernameWarningState(false);
    setPasswordWarningState(false);
    setPasswordVisibilityState(isPasswordVisible);
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

    const loginBalloonBox = document.querySelector('#login-balloon-box'); 
    loginBalloonBox.classList = changeThemeClasses(loginBalloonBox);

    const themeTogglerBar = document.querySelector("#theme-toggler-bar");
    themeTogglerBar.classList = changeThemeClasses(themeTogglerBar);
    
    const themeTogglerCircle = document.querySelector("#theme-toggler-circle");    
    themeTogglerCircle.classList = changeThemeClasses(themeTogglerCircle);

    const textInputs = document.querySelectorAll('.text-input-div');
    textInputs.forEach((value) => {
        value.classList = changeThemeClasses(value);
    });
    
    const oneWeekCheckboxLabel = document.querySelector('#one-week-checkbox-label');
    oneWeekCheckboxLabel.classList = changeThemeClasses(oneWeekCheckboxLabel);

    const oneWeekReminderSpan = document.querySelector('#one-week-reminder-text');
    oneWeekReminderSpan.classList = changeThemeClasses(oneWeekReminderSpan);

    const usernameField = document.querySelector("#username");
    usernameField.classList = changeThemeClasses(usernameField);

    const passwordField = document.querySelector("#password");
    passwordField.classList = changeThemeClasses(passwordField);

    const loginButtonLabel = document.querySelector("#login-button-label");
    loginButtonLabel.classList = changeThemeClasses(loginButtonLabel);

    const loginButtonSpan = document.querySelector("#login-button-label>button>span");
    loginButtonSpan.classList = changeThemeClasses(loginButtonSpan);

    const loginErrorInternalBox = document.querySelector("#login-error-internal-box");
    loginErrorInternalBox.classList = changeThemeClasses(loginErrorInternalBox);

    const loginErrorInternalBoxTitle = document.querySelector("#login-error-internal-box-title");
    loginErrorInternalBoxTitle.classList = changeThemeClasses(loginErrorInternalBoxTitle);

    const loginErrorInternalBoxMessageParagraph = document.querySelector("#login-error-internal-box-message-paragraph");
    loginErrorInternalBoxMessageParagraph.classList = changeThemeClasses(loginErrorInternalBoxMessageParagraph);

    const loginErrorInternalBoxButton = document.querySelector("#login-error-internal-box-button");
    loginErrorInternalBoxButton.classList = changeThemeClasses(loginErrorInternalBoxButton);

    const loginErrorInternalBoxButtonSpan = document.querySelector("#login-error-internal-box-button-span");
    loginErrorInternalBoxButtonSpan.classList = changeThemeClasses(loginErrorInternalBoxButtonSpan)
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

    setPasswordVisibilityState(isPasswordVisible);
    setOneWeekCheckboxState(isOneWeekChecked);

    changeThemeCircleImage();
}

const setErrorMessageBoxVisibility = function(isVisible){
    const div = document.querySelector("#login-error-div");
    div.style.display = isVisible ? 'flex' : 'none';
}

const closeErrorMessageBox = function(event){    
    const element = event.target;
    switch(element.id){
        case 'login-error-div':
        case 'login-error-internal-box-button':
        case 'login-error-internal-box-button-span':
            setErrorMessageBoxVisibility(false);
            break;
        default:
            break;
    }
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

const setPasswordVisibilityState = function(isVisible){    
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

const setUsernameWarningState = function(isVisible) {
    const div = document.querySelector("#username-warning-div");
    div.style.visibility = isVisible ? 'visible' : 'hidden';    
}

const listenUsernameInput = function(){
    const usernameInput = document.querySelector("#username");
    setUsernameWarningState(usernameInput.value.length === 0)
}

const setPasswordWarningState = function(isVisible) {
    const div = document.querySelector("#password-warning-div");
    div.style.visibility = isVisible ? 'visible' : 'hidden';    
}

const listenPasswordInput = function(){
    const passwordInput = document.querySelector("#password");
    setPasswordWarningState(passwordInput.value.length === 0)
}

const tryLogin = async function(){
    const usernameInput = document.querySelector("#username");
    const passwordInput = document.querySelector("#password");
    const oneWeekInput = document.querySelector("#one-week-checkbox");

    const username = usernameInput.value;
    const password = passwordInput.value;
    const oneWeek = oneWeekInput.checked;

    if (username.length === 0){
        setUsernameWarningState(true);
    }

    if (password.length === 0){
        setPasswordWarningState(true)
    }

    if (username.length === 0 || password.length === 0){
        return;
    }    

    const body = {
        "username": username,
        "password": password,
        "oneWeek": oneWeek
    };

    console.log(body);

    const response = await fetch('http://localhost:80/auth/login', {
        body: JSON.stringify(body),
        method: 'POST',        
        headers: {
            'Content-Type': 'application/json'
        }      
    });

    const status = await response.status;
    const json = await response.json();

    if (status !== 200){
        const p = document.querySelector("#login-error-internal-box-message-paragraph");
        p.innerHTML = json['message'];
        setErrorMessageBoxVisibility(true);
        return;
    }
}
