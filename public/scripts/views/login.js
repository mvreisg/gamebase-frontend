import {
    getEnvironment
} from '../environment.js';

import {
    navigateTo
} from '../history.js';

import { 
    changeBodyTheme, 
    startTheme
} from '../theme.js';

import {
    loadSvgToUrl
} from '../svg.js';

import {
    validate,
    logoff,
    login
} from './../requests/auth.js'

let isOneWeekChecked = false;
let isPasswordVisible = false;

let environment = null;

export const start = async () => {
    environment = await getEnvironment();    

    const searchParams = new URLSearchParams(window.location.search)
    const hasToLogOff = searchParams.get('logoff');

    const token = localStorage.getItem('token');
    
    if (hasToLogOff && token !== null) {     
        try{
            await logoff({
                'token': token
            });
        }
        finally {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
        }
    }
    
    let isUnauthorized = false;
    if (hasToLogOff === null && token !== null){    
        try{
            const response = await validate({
                'token': token
            });
            const status = response.status;
    
            if (status === 200){
                navigateTo('/home');                        
                return;
            }
    
            if (status === 401){
                isUnauthorized = true;
            }
        }
        catch {
            isUnauthorized = true;
        }                

        if (isUnauthorized){
            try{
                await logoff({
                    'token': token
                });
            }
            finally {
                localStorage.removeItem('token');
                localStorage.removeItem('username');
            }
        }
    }

    const cssResponse = await fetch('./styles/login.css');
    const cssText = await cssResponse.text();
    const style = document.createElement('style');
    style.innerHTML = cssText;
    document.head.append(style);

    const htmlResponse = await fetch('./views/login.html');
    const htmlText = await htmlResponse.text();        
    document.querySelector('#app').innerHTML = htmlText;  

    const themeTogglerResponse = await import('./components/theme-toggler.js');
    await themeTogglerResponse.start();

    startTheme();

    setLoginButtonClickedVisibility(false);
    setLoginButtonNotClickedVisibility(true);
    setErrorMessageBoxVisibility(false);
    setUsernameWarningState(false);
    setPasswordWarningState(false);
    setPasswordVisibilityState(isPasswordVisible);
    setOneWeekCheckboxState(isOneWeekChecked);
    
    changeLoadingImage();

    document.querySelector("#username").addEventListener('keyup', () => listenUsernameInput());
    document.querySelector("#password").addEventListener('keyup', () => listenPasswordInput());

    document.querySelector("#password-visibility-toggler-button").addEventListener('click', () => togglePasswordVisibility());

    document.querySelector("#one-week-checkbox").addEventListener('click', () => toggleOneWeekCheckboxState());

    document.querySelector("#login-button").addEventListener('click', () => tryLogin());

    document.querySelector("#login-error-div").addEventListener('click', (event) => closeErrorMessageBox(event));

    document.addEventListener('changeThemeEvent', () => toggleTheme());
}

const toggleTheme = function(){
    changeBodyTheme();   

    setPasswordVisibilityState(isPasswordVisible);
    setOneWeekCheckboxState(isOneWeekChecked);

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
    document.querySelector("#one-week-checkbox-label>input").checked = isChecked;
    setOneWeekCheckboxVisual(isChecked);
}

const setOneWeekCheckboxVisual = function(isChecked){
    const classList = document.querySelector("#one-week-checkbox-label").classList;
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

const setPasswordVisibilityVisual = async function(isVisible){ 
    const passwordVisibilityIndicatorImage = document.querySelector("#password-visibility-indicator");           
    const passwordInput = document.querySelector("#password");
    if (isVisible){
        passwordInput.type = 'text';
        switch(localStorage.getItem('theme')){
            case 'light':                
                passwordVisibilityIndicatorImage.src = await loadSvgToUrl('eye-dashed-light');
                break;
            case 'dark':
                passwordVisibilityIndicatorImage.src = await loadSvgToUrl('eye-dashed-dark');       
                break;
        }
    } else {
        passwordInput.type = 'password';
        switch(localStorage.getItem('theme')){
            case 'light':                
                passwordVisibilityIndicatorImage.src = await loadSvgToUrl('eye-open-light');;
                break;
            case 'dark':                
                passwordVisibilityIndicatorImage.src = await loadSvgToUrl('eye-open-dark');
                break;
        }      
    }
}

const changeLoadingImage = async function(){
    const img = document.querySelector("#login-button-clicked-status>img");
    switch(localStorage.getItem('theme')){
        case 'dark':
            img.src = await loadSvgToUrl('loading-dark');
            break;
        case 'light':
            img.src = await loadSvgToUrl('loading-light');
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
    const oneWeekCheckbox = document.querySelector("#one-week-checkbox");

    const username = usernameInput.value;
    const password = passwordInput.value;
    const oneWeek = oneWeekCheckbox.checked;
    
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
        const response = await login(body);

        const status = response.status;

        if (status !== 200){
            const json = await response.json();
            const message = json['message'];
            showErrorMessageBox(message);
            return;
        }        

        const json = await response.json();

        localStorage.setItem('token', json.token);

        navigateTo(`/home?username=${username}`);        
    }
    catch(err) {    
        console.error(err)    
        showErrorMessageBox('Erro ao estabelecer conexão com o servidor.');
    }         
}