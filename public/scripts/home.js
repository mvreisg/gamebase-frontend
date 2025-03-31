const environment = {
    type: '',
    backendURL: ''
};

(async() => {
    const envResponse = await fetch('./config/environment.json');
    const envJson = await envResponse.json();
    environment.type = envJson.type;
    environment.backendURL = envJson.options[environment.type].backendURL;  

    const fetchResponse = await fetch('./views/home.html');
    const fetchText = await fetchResponse.text();
    document.querySelector('#app').innerHTML = fetchText;

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
})();