export const navigateTo = (route) => {
    history.pushState({}, "", route);                          
    window.dispatchEvent(new Event('popstate'));
}