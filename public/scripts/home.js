fetch('./views/home.html').then(data => data.text()).then(text => {
    document.querySelector('#app').innerHTML = text;    

});