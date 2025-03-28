let oneWeekLabel = null;    
let oneWeekInput = null;
let passwordVisibilityIndicatorImage = null;
let isOneWeekChecked = false;
let isPasswordVisible = false;
let theme = null;
const prefix = './../assets/svg/';
const suffix = '.svg'

const start = async () => {    
    const response = await fetch('./views/login.html');
    const text = await response.text();        
    document.querySelector('#app').innerHTML = text;

    const token = localStorage.getItem('token');
    if (token !== null){
        body = {
            'token': token
        };
        fetch('http://localhost:80/auth/validate', {
            method: 'POST', 
            body: JSON.stringify(body)
        }).then(data => {
            if (!data.ok){
                return data.json().then(error => { throw error; });
            }
            if (data.status === 200){
                return data.json();                                
            }
        })
        .then(json => {            
            navigateTo('/home', '');                        
        })
        .catch(error => {                         
            fetch('http://localhost:80/auth/logoff', {
                method: 'POST', body: body
            }).then(data => {
                showErrorMessageBox(error.message);
            });
        });
    }
                 
    oneWeekLabel = document.querySelector("#one-week-checkbox-label");    
    oneWeekInput = document.querySelector("#one-week-checkbox-label>input");    
    passwordVisibilityIndicatorImage = document.querySelector("#password-visibility-indicator");

    theme = localStorage.getItem('theme');

    if (theme === null){
        setTheme('dark');
        changeBodyTheme();
    }    

    setLoginButtonClickedVisibility(false);
    setLoginButtonNotClickedVisibility(true);
    setErrorMessageBoxVisibility(false);
    setUsernameWarningState(false);
    setPasswordWarningState(false);
    setPasswordVisibilityState(isPasswordVisible);
    setOneWeekCheckboxState(isOneWeekChecked);

    changeThemeCircleImage();
    changeLoadingImage();

    document.querySelector("#theme-toggler-input").focus();

    document.querySelector("#theme-toggler-input").addEventListener("keydown", function(event) {
        if (event.code === "Space"){
            toggleTheme();
        }
    });
};

start();

const changeThemeClasses = function(element){
    const classList = element.classList;
    switch(theme){
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

const changeBodyTheme = function(){
    const elements = document.querySelectorAll('*');

    elements.forEach((element) => {
        changeThemeClasses(element);
    })
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
    changeLoadingImage();
}

const setLoginButtonNotClickedVisibility = function(isVisible){
    const div = document.querySelector("#login-button-not-clicked-status");
    div.style.display = isVisible ? 'flex' : 'none';
}

const setLoginButtonClickedVisibility = function(isVisible){
    const div = document.querySelector("#login-button-clicked-status");
    div.style.display = isVisible ? 'flex' : 'none';
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
            setIfLoginButtonIsDisabled(false);
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

const changeLoadingImage = function(){
    const img = document.querySelector("#login-button-clicked-status>img");
    switch(theme){
        case 'dark':
            img.setAttribute("src", prefix + "loading-dark" + suffix);
            break;
        case 'light':
            img.setAttribute("src", prefix + "loading-light" + suffix);
            break;
    }    
}

const setUsernameWarningState = function(isVisible) {
    const div = document.querySelector("#username-warning-div");
    div.style.visibility = isVisible ? 'visible' : 'hidden';        
}

const setUsernameWarningText = function(message){
    const p = document.querySelector("#username-warning-div>p");
    p.innerHTML = message;
}

const listenUsernameInput = function(){
    const usernameInput = document.querySelector("#username");
    setUsernameWarningState(usernameInput.value.length === 0)
}

const setPasswordWarningState = function(isVisible) {
    const div = document.querySelector("#password-warning-div");
    div.style.visibility = isVisible ? 'visible' : 'hidden';    
}

const setPasswordWarningText = function(message){
    const p = document.querySelector("#password-warning-div>p");
    p.innerHTML = message;
}

const listenPasswordInput = function(){
    const passwordInput = document.querySelector("#password");
    setPasswordWarningState(passwordInput.value.length === 0)
}

const setIfLoginButtonIsDisabled = function(isDisabled) {
    const loginButton = document.querySelector("#login-button");
    loginButton.disabled = isDisabled;
}

const showErrorMessageBox = function(message){
    const p = document.querySelector("#login-error-internal-box-message-paragraph");
    p.innerHTML = message;
    setErrorMessageBoxVisibility(true);
    document.querySelector("#login-error-internal-box-button").focus();
    setIfLoginButtonIsDisabled(false);
    setLoginButtonClickedVisibility(false);
    setLoginButtonNotClickedVisibility(true);
}

const tryLogin = async function(){
    const usernameInput = document.querySelector("#username");
    const passwordInput = document.querySelector("#password");
    const oneWeekInput = document.querySelector("#one-week-checkbox");

    const username = usernameInput.value;
    const password = passwordInput.value;
    const oneWeek = oneWeekInput.checked;
    
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    usernameInput.value = trimmedUsername;
    passwordInput.value = trimmedPassword;

    if (trimmedUsername.length === 0 && username.length > 0){        
        setUsernameWarningText('Nome de usuário inválido!');
        setUsernameWarningState(true);
    }
    else if (trimmedUsername.length === 0){        
        setUsernameWarningText('Insira um nome de usuário!');
        setUsernameWarningState(true);
    }

    if (trimmedPassword.length === 0 && password.length > 0){
        setPasswordWarningText('Senha inválida!');
        setPasswordWarningState(true);
    }
    else if (trimmedPassword.length === 0){
        setPasswordWarningText('Insira uma senha!');
        setPasswordWarningState(true);
    }

    if (trimmedUsername.length === 0 || trimmedPassword.length === 0){
        return;
    }

    setIfLoginButtonIsDisabled(true);
    setLoginButtonClickedVisibility(true);
    setLoginButtonNotClickedVisibility(false);

    const body = {
        "username": username,
        "password": password,
        "oneWeek": oneWeek
    };
    
    try{
        const response = await fetch('http://localhost:80/auth/login', {
            body: JSON.stringify(body),
            method: 'POST',        
            headers: {
                'Content-Type': 'application/json'
            }      
        });

        const status = response.status;

        if (status !== 200){
            const json = await response.json();
            const message = json['message'];
            showErrorMessageBox(message);
        }

        const json = await response.json();

        localStorage.setItem('token', json.token);

        navigateTo('/home', '');        
    }
    catch {
        showErrorMessageBox('Erro ao estabelecer conexão com o servidor.');
    }         
}