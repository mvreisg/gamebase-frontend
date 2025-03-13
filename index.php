<!DOCTYPE html>
<html lang="pt-BR">
    <head>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet">
        <title>Gamebase - Login</title>
        <link rel="stylesheet" href="./src/styles/index.css">
        <script type="text/javascript" src="./src/scripts/index.js"></script>
    </head>
    <body>
        <div id="login-balloon-container">
            <form id="login-balloon-box">                
                <h1>Gamebase</h1>                
                <div class="text-div">
                    <label class="text-label" for="username">
                        <input id="username" name="username" type="text" placeholder="Seu nome de usuário..." />
                    </label>
                </div>                
                <div class="text-div">
                    <label class="text-label" for="password">
                        <input id="password" name="password" type="password" placeholder="Sua senha..." />
                    </label>
                    <button type="button" onclick="togglePasswordVisibility();">
                        <img id="password-visibility-indicator" src="./assets/svg/eye-open-white.svg"/>
                    </button>                    
                </div>
                <div id="one-week-checkbox-div">
                    <label id="one-week-checkbox-label" class="unchecked-checkbox" for="password">
                        <input id="one-week-checkbox" name="one-week-checkbox" type="checkbox" onclick="toggleOneWeekCheckboxState();" />
                    </label>
                    <span>Lembrar de mim por uma semana</span>
                </div>
                <label id="login-button-label" for="submit">
                    <button id="login-button" name="submit" type="submit">
                        <span>Entrar</span>                   
                    </button>
                </label>            
            </form>
        </div>        
    </body>
</html>
