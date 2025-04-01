(async() => {
    const fetchResponse = await fetch('./views/404.html');
    const fetchText = await fetchResponse.text();
    document.querySelector('#app').innerHTML = fetchText;
})();