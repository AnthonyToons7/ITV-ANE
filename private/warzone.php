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
        <div class=""></div>
        <div id="dialog-box-container">
            <div id="dialog-box-characters">
                <div id="dialog-Eva" class="dialog-character"></div>
                <div id="dialog-Player" class="dialog-character"></div>
                <div id="dialog-Void" class="dialog-character"></div>
            </div>
            <div id="dialog-box-name" class="dialog-box"></div>
            <div id="dialog-box" class="dialog-box"></div>
        </div>
        <section id="battle-zone">
            <div class="align-top flex" height="100%">
                <div class="enemies-container flex">
                    <div class="flex enemy-positions">
                        <div class="enemy"></div>

                        <div class="spacer-hidden"></div>

                        <div class="enemy"></div>

                        <div class="spacer-hidden"></div>
                        <div class="spacer-hidden"></div>
                        <div class="spacer-hidden"></div>

                        <div class="enemy"></div>
                    </div>
                </div>
            </div>
            <div class="align-center flex" height="100%">
                <div class="player-container flex">
                    <div class="player"></div>
                </div>
            </div>
        </section>
        <section id="player-ui" class="flex">
            <div class="UI-MOVES flex">
                <div id="stats" class="col-5">
                    <div class="flex stats-bar">
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
                        <div id="health-bar" class="stat-bar">
                            <div id="health-value" class="player-values">100 / 100</div>
                            <div class="stat-value-health"></div>
                        </div>
                    </div>
                    <div class="flex stats-bar" width="100%">
                        <svg class="icon-svg-stats" version="1.0" xmlns="http://www.w3.org/2000/svg"
                            width="348.000000pt" height="349.000000pt" viewBox="0 0 348.000000 349.000000"
                            preserveAspectRatio="xMidYMid meet">
    
                            <g transform="translate(0.000000,349.000000) scale(0.100000,-0.100000)"
                            fill="#482bdc" stroke="none">
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
                        <div id="mana-bar" class="stat-bar">
                            <div id="mana-value" class="player-values">40 / 40</div>
                            <div class="stat-value-mana"></div>
                        </div>
                    </div>
                    <div class="prev-page">&uarr;</div>
                    <div class="next-page">&darr;</div>
                    <div class="overview">
                        <p>HP: <span></span></p>
                        <p>ATK: <span></span></p>
                        <p>DEF: <span></span></p>
                        <p>RES: <span></span></p>
                        <p>MANA: <span></span></p>
                        <p>STATUS: <span></span></p>
                    </div>
                </div>
                <div class="buttons-basic col-4 flex">
                    <!-- Load these in with JS -->
                    <div class="button move-option" id="option-attack">Attack</div>
                    <div class="button move-option" id="option-defend">Defend</div>
                    <div class="button move-option">Pass</div>
                </div>
                <div class="buttons-magic col-3 flex">
                    <div class="button move-option">Shattered illusion</div>
                    <div class="button move-option">Icebreaker</div>
                    <div class="button move-option">Fired up</div>
                    <!-- Load script in that makes all btns -->
                </div>
            </div>
            <div class="buttons-cards flex">
                <div class="hand">
                    <svg fill="#fff" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
                        width="100%" height="100%" viewBox="0 0 89.823 89.823"
                        xml:space="preserve">
                        <g>
                            <path d="M86.676,32.8h-7.871c-1.106,0-2.076,0.574-2.637,1.438c-2.896-1.813-8.201-5.302-17.654-11.93
                                c-0.086-0.061-0.18-0.11-0.278-0.149c-0.406-0.158-9.757-3.72-16.152,1.255L32.75,3.315L0,18.521l21.668,46.664l7.283-3.382
                                c0.426,0.393,0.912,0.783,1.482,1.179c-0.084,2.136,0.199,7.64,4.738,12.286c0.455,0.615,0.682,1.654,0.922,2.756
                                c0.645,2.967,1.527,7.029,7.811,8.209c0.041,0.008,0.084,0.014,0.125,0.018c0.525,0.047,12.934,1.123,20.061-1.498
                                c2.664-0.979,4.189-1.859,5.414-2.567c1.699-0.981,2.82-1.627,6.152-1.919v0.805c0,1.739,1.41,3.149,3.148,3.149h7.871
                                c1.737,0,3.147-1.41,3.147-3.149V35.949C89.824,34.208,88.414,32.8,86.676,32.8z M75.656,77.608
                                c-4.104,0.336-5.559,1.17-7.479,2.281c-1.197,0.691-2.554,1.475-5.002,2.375c-6.332,2.328-17.894,1.43-18.849,1.35
                                c-4.494-0.865-5.029-3.316-5.645-6.152c-0.299-1.375-0.607-2.797-1.469-3.887c-0.029-0.037-0.063-0.074-0.098-0.108
                                c-4.762-4.825-4.018-10.771-3.986-11.021c0.086-0.634-0.293-1.228-0.877-1.431c-0.232-0.151-0.443-0.3-0.645-0.446L54.414,49.98
                                l-5.441-11.728c1.537-0.379,2.313-0.895,2.438-0.982c0.472-0.333,0.67-0.933,0.5-1.479c-0.172-0.549-0.679-0.924-1.252-0.93
                                c-5.988-0.054-8.855-2.047-9.541-3.894c-0.582-1.561,0.195-3.379,2.18-5.123c4.838-4.251,12.699-1.671,13.836-1.267
                                c10.319,7.234,15.756,10.762,18.522,12.458L75.656,77.608L75.656,77.608z"/>
                        </g>
                    </svg>
                </div>
                <div class="deck">
                    <img src="../public/img/icons/card-stack.png" alt="" class="card">
                </div>
                <div class="used-pile">
                    <div class="hole"></div>
                    <!-- <img src="../public/img/icons/card.png" alt="" class="card"> -->
                </div>
            <!-- Load script that creates all cards -->
        </div>
    </section>
    <div class='container'>
        <div class='cards'></div>
        <div class='hand'></div>
    </div>
    </main>
    <div class="enemy-data-stats">
    </div>
    <div class="popup-container">
        <div class="popup-arrow"></div>
        <div class="popup-content">Description will be shown here</div>
    </div>
<script src="../public/js/gamescripts/script.js"></script>
<script src="../public/js/gamescripts/spritesheets.js"></script>
</body>
</html> 