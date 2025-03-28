fetch('./views/404.html').then(data => data.text()).then(text => {
    document.querySelector('#app').innerHTML = text;    

});