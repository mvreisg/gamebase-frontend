export const getEnvironment = async () => {
    const response = await fetch('./config/environment.json');
    const json = await response.json();
    return {
        type: json.type,
        backendURL: json.options[json.type].backendURL
    };
}
