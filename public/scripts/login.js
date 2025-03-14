let oneWeekLabel = null;    
let oneWeekInput = null;
let passwordVisibilityIndicatorImage = null;
let isOneWeekChecked = false;
let isPasswordVisible = false;
const prefix = './../assets/svg/';

window.onload = () => {
    oneWeekLabel = document.querySelector("#one-week-checkbox-label");    
    oneWeekInput = oneWeekLabel.querySelector("input");    
    passwordVisibilityIndicatorImage = document.querySelector("#password-visibility-indicator");

    setOneWeekCheckboxState(false);
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
    if (isChecked){
        oneWeekLabel.setAttribute("class", "checked-checkbox");
    } else{
        oneWeekLabel.setAttribute("class", "unchecked-checkbox");
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
    const src = passwordVisibilityIndicatorImage.getAttribute("src");    
    const suffix = '.svg'
    const passwordInput = document.querySelector("#password");
    if (isVisible){
        passwordInput.setAttribute("type", "text");
        passwordVisibilityIndicatorImage.setAttribute("src", prefix + "eye-dashed-white" + suffix);
    } else {
        passwordInput.setAttribute("type", "password");
        passwordVisibilityIndicatorImage.setAttribute("src", prefix + "eye-open-white" + suffix);
    }
}