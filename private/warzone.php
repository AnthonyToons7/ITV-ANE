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
    <title>Battlefield</title>
    <link rel="stylesheet" href="../public/css/warzone.css">
    <script src="../public/js/jquery-3.6.1.js"></script>
</head>
<body>
    <button id="test">Test</button>
    <main>
        <div class="dialog-background"></div>
        <div id="dialog-box-container">
            <div id="dialog-box-characters">
                <div id="dialog-Eva" class="dialog-character"></div>
                <div id="dialog-Aubrey" class="dialog-character"></div>
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
                    <div class="player">
                        <img src="../public/img/spritesheets/player.png" alt="" id="player-sheet">
                    </div>
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
                            <div id="health-value" class="player-values">50 / 50</div>
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
                            <div class="stat-cost-mana"></div>
                        </div>
                    </div>
                    <div class="prev-page">&uarr; Stat bars &uarr;</div>
                    <div class="next-page">&darr; All stats &darr;</div>
                    <div class="overview">
                        <p>HP: <span></span></p>
                        <p>ATK: <span></span></p>
                        <p>DEF: <span></span></p>
                        <p>RES: <span></span></p>
                        <p>MANA: <span></span></p>
                        <div class="flex">
                            <p>STATUS:</p>
                            <div class="status-effects-player"></div>
                        </div>
                    </div>
                </div>
                <div class="buttons-basic col-4 flex">
                    <!-- Load these in with JS -->
                    <div class="button move-option" id="option-attack">Attack</div>
                    <div class="button move-option" id="option-defend">Defend</div>
                    <div class="button move-option">Pass</div>
                </div>
                <div class="buttons-magic col-3 flex">
                    <div class="button move-option magic-option" id="option-magic-1">Ignis</div>
                    <div class="button move-option magic-option" id="option-magic-2">Celeste</div>
                    <div class="button move-option magic-option" id="option-magic-3">Fired up</div>
                    <!-- Load script in that makes all btns -->
                </div>
            </div>
            <div class="buttons-cards flex">
                <div class="deck">
                    <img src="../public/img/icons/card-stack.png" alt="" class="card">
                </div>
            <!-- Load script that creates all cards -->
        </div>
    </section>
    <div class='container'>
        <div class='cards'></div>
        <div class='hand'></div>
    </div>
    </main>
    <!-- <div class="enemy-data-stats">
    </div> -->
    <div class="popup-container">
        <div class="popup-arrow"></div>
        <div class="popup-content">Description will be shown here</div>
    </div>
    <div class="attack-anim-overlay hideAnim">
        <div class="player-box"></div>
        <div class="enemy-box"></div>
    </div>
    <div id="bossWarning">
        <h1>Boss incoming!!</h1>
    </div>
    <div id="defeat-screen">
        <h1>Game over</h1>
    </div>
    <div class="battle-popup">
        <h1></h1>
    </div>
<script src="../public/js/gamescripts/script.js"></script>
<script src="../public/js/gamescripts/magic.js"></script>
<script src="../public/js/gamescripts/dialog.js"></script>
<script src="../public/js/gamescripts/battleAnimator.js"></script>
<script src="../public/js/gamescripts/damagesprites.js"></script>
<script src="../public/js/gamescripts/AI.js"></script>
<script src="../public/js/gamescripts/spritesheets.js"></script>
<script src="../public/js/gamescripts/cards.js"></script>
</body>
</html> 