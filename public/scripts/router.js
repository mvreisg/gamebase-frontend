const routes = [
    {
        'routes': [
            '/',
            '/login'
        ],
        'script': './views/login.js'
    },
    {
        'routes': [
            '/home',
        ],
        'script': './views/home.js'
    }
]

window.addEventListener('load', async () => {
    for (let route of routes){
        for (let r of route.routes){
            if (r === window.location.pathname){
                const result = await import(route.script);
                result.start();
                return;
            }
        }
    }
    const notFound = await import('./views/404.js');
    notFound.start();
});

window.addEventListener('popstate', () => {    
    location.reload(true);
});