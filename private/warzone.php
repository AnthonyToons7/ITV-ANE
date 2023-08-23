<?php 
    session_start();
    if (!isset($_SESSION["USERS_ID"]) || !$_SESSION["USERS_ID"]){
        // header("Location:../../private/login.php");
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="../public/css/warzone.css">
    <script src="../public/js/jquery-3.6.1.js"></script>
</head>
<body>
    <button id="test">Test</button>
    <main>
        <div id="dialog-box-container">
            <div id="dialog-box-characters">
                <div id="dialog-Eva" class="dialog-character"></div>
                <div id="dialog-Player" class="dialog-character"></div>
                <div id="dialog-Void" class="dialog-character"></div>
            </div>
            <div id="dialog-box-name" class="dialog-box"></div>
            <div id="dialog-box" class="dialog-box"></div>
        </div>
        <section id="player-ui">
            <div id="stats" class="col-2">
                <div class="flex">
                    <svg class="icon-svg-stats" version="1.0" xmlns="http://www.w3.org/2000/svg"
                        width="42.000000pt" height="36.000000pt" viewBox="0 0 42.000000 36.000000"
                        preserveAspectRatio="xMidYMid meet">

                        <g transform="translate(0.000000,36.000000) scale(0.100000,-0.100000)"
                        fill="#ff0000" stroke="none">
                        <path d="M65 290 l-58 -59 98 -108 c55 -59 100 -110 102 -112 2 -4 73 70 168
                        177 l38 43 -59 60 -59 60 -42 -45 -42 -44 -41 44 c-22 24 -42 44 -43 44 -1 0
                        -29 -27 -62 -60z"/>
                        </g>
                    </svg>

                    <div id="health-bar" class="stat-bar"><div id="health-value" class="stat-value"></div></div>
                </div>
                <div class="flex">
                    <svg class="icon-svg-stats" version="1.0" xmlns="http://www.w3.org/2000/svg"
                        width="348.000000pt" height="349.000000pt" viewBox="0 0 348.000000 349.000000"
                        preserveAspectRatio="xMidYMid meet">

                        <g transform="translate(0.000000,349.000000) scale(0.100000,-0.100000)"
                        fill="blue" stroke="none">
                        <path d="M1500 3165 c-590 -112 -1031 -531 -1168 -1109 -24 -100 -26 -131 -27
                        -306 0 -151 4 -214 18 -280 127 -595 567 -1029 1162 -1146 126 -25 376 -25
                        505 0 526 102 948 468 1114 966 56 169 70 262 70 455 0 188 -13 280 -64 437
                        -74 225 -186 406 -359 578 -206 205 -438 332 -721 395 -105 23 -428 30 -530
                        10z m787 -270 c87 -22 252 -108 315 -165 64 -57 110 -139 129 -228 23 -113 -9
                        -282 -53 -282 -11 0 -34 11 -50 25 -66 56 -229 238 -272 304 -97 150 -293 237
                        -519 229 -53 -2 -97 -2 -97 -1 0 1 -3 8 -6 17 -11 28 152 97 271 115 74 12
                        205 5 282 -14z"/>
                        </g>
                    </svg>

                    <div id="mana-bar" class="stat-bar"><div id="mana-value" class="stat-value"></div></div>
                </div>
            </div>
            <div class="buttons-basic">
                <!-- Load these in with JS -->
                <!-- <div class="button button-attack"></div>
                <div class="button button-defend"></div> -->
            </div>
            <div class="buttons-magic">
                <!-- Load script in that makes all btns -->
            </div>
            <div class="buttons-cards">
                <div class="deck"></div>
                <div class="used-pile"></div>
            <!-- Load script that creates all cards -->
            </div>
        </section>
    </main>
<script src="../public/js/gamescripts/script.js"></script>
</body>
</html>