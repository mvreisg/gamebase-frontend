const data = [
    {
        'routes': [
            '/',
            '/login'
        ],
        'title': 'Gamebase - Login',
        'scripts': [
            {
                'path': './scripts/login.js',
                'isModule': true
            }            
        ],
        'stylesheets': [
            {
                'path': './styles/login.css'
            }            
        ]
    },
    {
        'routes': [
            '/home'
        ],
        'title': 'Gamebase - Home',
        'scripts': [
            {
                'path': './scripts/home.js',
                'isModule': false
            }            
        ],
        'stylesheets': [
            {
                'path': './styles/home.css'
            }
        ]
    }
]

const createTitle = (text) => {
    const title = document.createElement('title');
    title.innerText = text;
    document.head.appendChild(title);
}

const createScript = (path, isModule = false) => {
    const script = document.createElement("script");
    script.src = path;
    script.type = "text/javascript";
    if (isModule){
        script.type = 'module';
    }
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
        createScript(script.path, script.isModule);
    });
    data.stylesheets.forEach((stylesheet) => {
        createStylesheet(stylesheet.path);
    });
}

window.addEventListener('load', () => {
    let found = false;
    for (let value of data){   
        for (let route of value.routes){
            if (route === window.location.pathname){
                found = true;
                fetchRoute(value, window.location.pathname, window.location.search);
                break;
            }
        }         
    };   

    if (found) return;
    
    fetchRoute({
        'route': '/404',
        'title': 'Gamebase - 404',
        'scripts': [
            {
                'path': './scripts/404.js'
            }            
        ],
        'stylesheets': [
            {
                'path': './styles/404.css'
            }
        ]
    }, '/404', '');    
});

window.addEventListener('popstate', () => {    
    location.reload(true);
});