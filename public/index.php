<?php

require_once dirname(__DIR__) . '/vendor/autoload.php';

$routes = [
    '/' => 'login.php',
    '/login' => 'login.php'
];

//print_r($_SERVER);
$uri = $_SERVER['REQUEST_URI'];
$queries = $_SERVER['QUERY_STRING'];
$parameters = strstr($uri, '?', true);
if ($parameters === false){
    $parameters = $uri;
}

//var_dump($_SERVER);

$hasFoundPage = false;

foreach ($routes as $route => $page) {
    if (strcmp($route, $parameters) === 0) {
        $hasFoundPage = true;
        require_once __DIR__ . '/views/' . $page;
    }
}

if ($hasFoundPage === false){
    require_once __DIR__ . '/views/404.php'; 
}
