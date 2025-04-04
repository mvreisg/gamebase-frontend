import {
    getEnvironment
} from './../environment.js'

export const findByUserName = async (username, token) => {
    const environment = await getEnvironment();

    return await fetch(`${environment.backendURL}/user/find/userName/${username}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}
