const data = [
    {
        'route': '/',
        'title': 'Gamebase - Login',
        'scripts': [
            './scripts/login.js'
        ],
        'stylesheets': [
            './styles/login.css'
        ]
    },
    {
        'route': '/login',
        'title': 'Gamebase - Login',
        'scripts': [
            './scripts/login.js'
        ],
        'stylesheets': [
            './styles/login.css'
        ]
    },
    {
        'route': '/home',
        'title': 'Gamebase - Home',
        'scripts': [
            './scripts/home.js'
        ],
        'stylesheets': [
            './styles/home.css'
        ]
    }
]

const createTitle = (text) => {
    const title = document.createElement('title');
    title.innerText = text;
    document.head.appendChild(title);
}

const createScript = (path) => {
    const script = document.createElement("script");
    script.src = path;
    script.type = "text/javascript";
    document.head.appendChild(script);
}

const createStylesheet = (path) => {
    const link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = path;
    document.head.appendChild(link);
}

const navigateTo = (route, params) => {
    history.pushState({}, "", route + params);                          
    window.dispatchEvent(new Event('popstate'));
}

const fetchRoute = (data, route, params) => {
    createTitle(data.title);
    data.scripts.forEach((script) => {
        createScript(script);
    });
    data.stylesheets.forEach((stylesheet) => {
        createStylesheet(stylesheet);
    });
}

window.addEventListener('load', () => {
    let found = false;
    for (let value of data){    
        if (value.route === window.location.pathname){
            found = true;
            fetchRoute(value, window.location.pathname, window.location.search);
            break;
        }
    };   

    if (found) return;
    
    fetchRoute({
        'route': '/404',
        'title': 'Gamebase - 404',
        'scripts': [
            './scripts/404.js'
        ],
        'stylesheets': [
            './styles/404.css'
        ]
    }) 
});

window.addEventListener('popstate', () => {    
    location.reload(true);
});