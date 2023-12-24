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
    <title>Menu</title>
    <link rel="stylesheet" href="public/css/main.css">
    <script src="public/js/jquery-3.6.1.js"></script>
</head>
<body>
    <main>
        <div class="main-container area-1" data-id="1">
            <canvas class="glitch text split-effect hover few"
            data-text="Into the Void: A new end"
            data-font="35px danger"
            data-color="#ff0000"
            width="380px"
            height="70px"
            style="padding-left: 10px; font-family: danger;"
             id="title"></canvas>
            <div class="button menu-button" id="start"><h1>Start</h1></div>
            <div class="button menu-button" id="story-mode"><h1>Story</h1></div>
            <div class="button menu-button" id="leaderboard"><h1>Leaderboard</h1></div>
            <div class="button menu-button" id="history"><h1>History</h1></div>
            <div class="button menu-button" id="settings"><h1>Settings</h1></div>
            <a href="https://anthonytoons.nl"><div class="button menu-button"><h1>&larr; Back to main site</h1></div></a>
        </div>
        
        <div class="main-container area-2 hidden" data-id="2">
            <canvas class="glitch text split-effect hover few"
            data-text="Difficulty"
            data-font="40px danger"
            data-color="#ff0000"
            width="180px"
            height="70px"
            style="padding-left: 10px;"
            ></canvas>
            <label for="difficulty-story">
                <div class="button menu-button" id="story"><h1>Story mode</h1></div>
            </label>
            <label for="difficulty-hard">
                <div class="button menu-button" id="hard"><h1>Hard</h1></div>
            </label>
            <label for="difficulty-insanity">
                <div class="button menu-button" id="insanity"><h1>Insanity</h1></div>
            </label>
            <input type="radio" class="difficulty" name="difficulty-selection" id="difficulty-story" value="story">
            <input type="radio" class="difficulty" name="difficulty-selection" id="difficulty-hard" value="hard">
            <input type="radio" class="difficulty" name="difficulty-selection" id="difficulty-insanity" value="insanity">
            <br>
            <div class="button menu-button continue"><h1>&rarr; Continue</h1></div>
            <div class="button menu-button" id="back"><h1>&larr; Back</h1></div>
        </div>

        <div class="story-mode-box overlay-box">
            <div class="top-bar">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -0.5 100 100" shape-rendering="crispEdges">
                    <path stroke="#ffffff" d="M30 34h1M64 34h1M28 35h4M63 35h3M28 36h5M62 36h5M29 37h5M61 37h5M30 38h5M60 38h5M31 39h5M59 39h5M32 40h5M58 40h5M33 41h5M57 41h5M34 42h5M56 42h5M35 43h5M55 43h5M36 44h5M54 44h5M37 45h5M53 45h5M38 46h5M52 46h5M39 47h5M51 47h5M40 48h5M50 48h5M41 49h5M49 49h5M42 50h5M48 50h5M43 51h9M44 52h7M45 53h5M44 54h7M43 55h9M42 56h5M48 56h5M41 57h5M49 57h5M40 58h5M50 58h5M39 59h5M51 59h5M38 60h5M52 60h5M37 61h5M53 61h5M36 62h5M54 62h5M35 63h5M55 63h5M34 64h5M56 64h5M33 65h5M57 65h5M32 66h5M58 66h5M31 67h5M59 67h5M30 68h5M60 68h5M29 69h5M61 69h5M30 70h3M62 70h3M31 71h1M63 71h1" />
                </svg>
            </div>

            <div class="content">
                <h1>Story</h1>
                <p>Void was a young, shut in child. He was not allowed to go outside, live the live that a normal child should live, in comparison to his younger sister, who was allowed to do whatever she wants while her brother was locked in a closet all day. Life was miserable for Void. Constant malnutrition, lack of attention, even lack of sunlight. The young mind could not comprehend what was going on, and shrugged it of as being normal, even the beatings. He was living his life thinking his parents were having the most whole hearted intentions. When Starry, his sister, realized that this was wrong after discussing the home situation, she would consider calling authorities, but couldn't bring herself to call. Arresting their parents means no home. No food. Nothing. Starry would go into the closet every day, taking care of the little Void, making sure he was feeling alive, feeling emotion like a normal human being. But this life couldn't keep up forever...</p>
            </div>
        </div>
        <div class="leaderboard-box overlay-box">
            <div class="top-bar">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -0.5 100 100" shape-rendering="crispEdges">
                    <path stroke="#ffffff" d="M30 34h1M64 34h1M28 35h4M63 35h3M28 36h5M62 36h5M29 37h5M61 37h5M30 38h5M60 38h5M31 39h5M59 39h5M32 40h5M58 40h5M33 41h5M57 41h5M34 42h5M56 42h5M35 43h5M55 43h5M36 44h5M54 44h5M37 45h5M53 45h5M38 46h5M52 46h5M39 47h5M51 47h5M40 48h5M50 48h5M41 49h5M49 49h5M42 50h5M48 50h5M43 51h9M44 52h7M45 53h5M44 54h7M43 55h9M42 56h5M48 56h5M41 57h5M49 57h5M40 58h5M50 58h5M39 59h5M51 59h5M38 60h5M52 60h5M37 61h5M53 61h5M36 62h5M54 62h5M35 63h5M55 63h5M34 64h5M56 64h5M33 65h5M57 65h5M32 66h5M58 66h5M31 67h5M59 67h5M30 68h5M60 68h5M29 69h5M61 69h5M30 70h3M62 70h3M31 71h1M63 71h1" />
                </svg>
            </div>

            <div class="leaderboard-container">
                <div class="first-place leaderboard-place"><h1>#1</h1><strong>AnthonyToons</strong><p>999 kills</p></div>
                <div class="second-place leaderboard-place"><h1>#2</h1><strong>Testname1</strong><p>111 kills</p></div>
                <div class="third-place leaderboard-place"><h1>#3</h1><strong>testname2</strong><p>22 kills</p></div>
                <div class="leaderboard-place"><h1>#4</h1><strong>testname3</strong><p>22 kills</p></div>
                <div class="leaderboard-place"><h1>#5</h1><strong>testname4</strong><p>22 kills</p></div>
                <div class="leaderboard-place"><h1>#6</h1><strong>testname5</strong><p>22 kills</p></div>
            </div>
        </div>
        <div class="history-box overlay-box">
            <div class="top-bar">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -0.5 100 100" shape-rendering="crispEdges">
                    <path stroke="#ffffff" d="M30 34h1M64 34h1M28 35h4M63 35h3M28 36h5M62 36h5M29 37h5M61 37h5M30 38h5M60 38h5M31 39h5M59 39h5M32 40h5M58 40h5M33 41h5M57 41h5M34 42h5M56 42h5M35 43h5M55 43h5M36 44h5M54 44h5M37 45h5M53 45h5M38 46h5M52 46h5M39 47h5M51 47h5M40 48h5M50 48h5M41 49h5M49 49h5M42 50h5M48 50h5M43 51h9M44 52h7M45 53h5M44 54h7M43 55h9M42 56h5M48 56h5M41 57h5M49 57h5M40 58h5M50 58h5M39 59h5M51 59h5M38 60h5M52 60h5M37 61h5M53 61h5M36 62h5M54 62h5M35 63h5M55 63h5M34 64h5M56 64h5M33 65h5M57 65h5M32 66h5M58 66h5M31 67h5M59 67h5M30 68h5M60 68h5M29 69h5M61 69h5M30 70h3M62 70h3M31 71h1M63 71h1" />
                </svg>
            </div>
            <div class="content" style="overflow:hidden;">
                <h1 style="font-family: danger; letter-spacing: 10px;padding-left: 30px;">No updates yet...</h1>
            </div>
        </div>
        <div class="settings-box overlay-box">
            <div class="top-bar">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -0.5 100 100" shape-rendering="crispEdges">
                    <path stroke="#ffffff" d="M30 34h1M64 34h1M28 35h4M63 35h3M28 36h5M62 36h5M29 37h5M61 37h5M30 38h5M60 38h5M31 39h5M59 39h5M32 40h5M58 40h5M33 41h5M57 41h5M34 42h5M56 42h5M35 43h5M55 43h5M36 44h5M54 44h5M37 45h5M53 45h5M38 46h5M52 46h5M39 47h5M51 47h5M40 48h5M50 48h5M41 49h5M49 49h5M42 50h5M48 50h5M43 51h9M44 52h7M45 53h5M44 54h7M43 55h9M42 56h5M48 56h5M41 57h5M49 57h5M40 58h5M50 58h5M39 59h5M51 59h5M38 60h5M52 60h5M37 61h5M53 61h5M36 62h5M54 62h5M35 63h5M55 63h5M34 64h5M56 64h5M33 65h5M57 65h5M32 66h5M58 66h5M31 67h5M59 67h5M30 68h5M60 68h5M29 69h5M61 69h5M30 70h3M62 70h3M31 71h1M63 71h1" />
                </svg>
            </div>
            <div class="settings-container">
                <div class="sound setting">
                    <label for="vol-slider-music">Music</label>
                    <input type="range" name="volume-slider-music" id="vol-slider-music" class="vol-slider"> 
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.0"  width="30" height="30" viewBox="0 0 75 75" id="volume-btn">
                        <path d="M39.389,13.769 L22.235,28.606 L6,28.606 L6,47.699 L21.989,47.699 L39.389,62.75 L39.389,13.769z"
                        style="stroke:#676767;stroke-width:5;stroke-linejoin:round;fill:#676767;"
                        />
                        <path d="M48,27.6a19.5,19.5 0 0 1 0,21.4M55.1,20.5a30,30 0 0 1 0,35.6M61.6,14a38.8,38.8 0 0 1 0,48.6" style="fill:none;stroke:#676767;stroke-width:5;stroke-linecap:round"/>
                    </svg>
                </div>
                <div class="sound setting">
                    <label for="vol-slider-SFX">SFX</label>
                    <input type="range" name="volume-slider-SFX" id="vol-slider-SFX" class="vol-slider"> 
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.0"  width="30" height="30" viewBox="0 0 75 75" id="volume-btn">
                        <path d="M39.389,13.769 L22.235,28.606 L6,28.606 L6,47.699 L21.989,47.699 L39.389,62.75 L39.389,13.769z"
                        style="stroke:#676767;stroke-width:5;stroke-linejoin:round;fill:#676767;"
                        />
                        <path d="M48,27.6a19.5,19.5 0 0 1 0,21.4M55.1,20.5a30,30 0 0 1 0,35.6M61.6,14a38.8,38.8 0 0 1 0,48.6" style="fill:none;stroke:#676767;stroke-width:5;stroke-linecap:round"/>
                    </svg>
                </div>
                <div class="animation-settings setting">
                    <label for="battleAnims">Turn off battle animations</label>
                    <input type="checkbox" name="battleAnims" id="battleAnims">
                </div>
                <div class="account-settings setting">
                    <a href="../private/account.php">Account settings</a>
                </div>
                <div class="account-settings"></div>
                <div class="saved">Saved!</div>
                <button class="save-settings">Save</button>
            </div>
        </div>
        <div class="overlay-box-overlay"></div>
        <!-- HARDCODED, MUST REMOVE -->
        <p class="version">Ver. BETA</p>
    </main>
    <div class="background-menu"></div>
    <script src="public/js/glitch.js"></script>
    <script src="public/js/main.js" defer></script>
    <!-- GLITCH TEXT MASTER -->
    <!-- LINK: https://www.cssscript.com/interactive-glitch-noise-effects/ -->
    <link rel="stylesheet" href="public/js/glitch.js-master/dist/css/styles.css" />
    <script src="public/js/glitch.js-master/dist/js/styles.min.js"></script>
</body>
</html>