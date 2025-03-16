<!DOCTYPE html>
<html lang="pt-BR">
    <head>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet">
        <title>Gamebase - Login</title>
        <link rel="stylesheet" href="./../styles/login.css">
        <script type="text/javascript" src="./../scripts/login.js"></script>
    </head>
    <body class="dark background">
        <div id="login-balloon-container">
            <form id="login-balloon-box" class="dark login-balloon" method="POST">                
                <h1 id="title" class="dark title">Gamebase</h1>  
                <div id="theme-toggler-div">
                    <div id="theme-toggler-bar" class="dark theme-toggler-bar-class">
                        <div id="theme-toggler-circle" class="dark theme-toggler-circle-class" onclick="toggleTheme();">
                            <img src="./../assets/svg/sun-light.svg" />
                        </div>
                    </div>
                </div>              
                <div id="login-balloon-texts">
                    <div class="dark text-input-div">
                        <label class="text-input-label" for="username">
                            <input id="username" class="dark text-input" name="username" type="text" placeholder="Seu nome de usuário..." required onkeyup="listenUsernameInput();" />
                        </label>
                    </div>     
                    <div id="username-warning-div" class="warning-text">
                        <p>O username não foi informado!</p>
                    </div>    
                    <div class="dark text-input-div">
                        <label class="text-input-label" for="password">
                            <input id="password" class="dark text-input" name="password" type="password" placeholder="Sua senha..." required onkeyup="listenPasswordInput();" />
                        </label>
                        <button type="button" onclick="togglePasswordVisibility();">
                            <img id="password-visibility-indicator" src="./assets/svg/eye-open-white.svg"/>
                        </button>                    
                    </div>
                    <div id="password-warning-div" class="warning-text">
                        <p>A senha não foi informada!</p>
                    </div>    
                </div>
                <div id="login-confirmations-box">
                    <div id="one-week-checkbox-div">
                        <label id="one-week-checkbox-label" class="unchecked dark checkbox-label" for="password">
                            <input id="one-week-checkbox" name="one-week-checkbox" type="checkbox" onclick="toggleOneWeekCheckboxState();" />
                        </label>
                        <span class="dark one-week-reminder-text">Lembrar de mim por uma semana</span>
                    </div>
                    <label id="login-button-label" for="submit" class="dark">
                        <button id="login-button" name="submit" type="submit" onclick="tryLogin();">
                            <span class="dark">Entrar</span>                   
                        </button>
                    </label>            
                </div>                                     
            </form>
        </div>        
    </body>
</html>
