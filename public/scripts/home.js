(async() => {
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
            const response = await fetch('http://localhost:80/auth/validate', {
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
            const response = await fetch('http://localhost:80/auth/logoff', {
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
})();