import {
    getEnvironment
} from './../environment.js'

export const validate = async (body) => {
    const environment = await getEnvironment();

    return await fetch(`${environment.backendURL}/auth/validate`, {
        method: 'POST',
        body: JSON.stringify(body)
    });
}

export const logoff = async (body) => {
    const environment = await getEnvironment();

    return await fetch(`${environment.backendURL}/auth/logoff`, {
        method: 'POST',
        body: JSON.stringify(body)
    });
}

export const login = async (body) => {
    const environment = await getEnvironment();

    return await fetch(`${environment.backendURL}/auth/login`, {
        body: JSON.stringify(body),
        method: 'POST',        
        headers: {
            'Content-Type': 'application/json'
        }      
    });
}