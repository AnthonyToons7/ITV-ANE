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

            <!-- HARDCODED, MUST REMOVE -->
            <div class="content">
                <h1>Story</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, magnam quidem modi sint explicabo tempora obcaecati accusantium non in, reiciendis numquam. Quam qui accusantium suscipit vero deserunt dicta voluptatum molestias! Voluptates nam porro excepturi quisquam, eos dignissimos quis totam aut perferendis. Laboriosam adipisci sequi sunt voluptate, quaerat, perspiciatis officia quidem itaque quia provident soluta consequatur ipsum corporis non dolores delectus? Quis doloribus consequatur optio sit impedit libero itaque quos ratione dicta porro architecto ipsum ex soluta iste excepturi, reprehenderit blanditiis nihil aut! Ipsam repellat delectus unde qui hic ad praesentium accusamus neque provident doloribus eum et, blanditiis minus ducimus facere nesciunt officiis, mollitia deleniti voluptatem ipsa perspiciatis voluptas animi harum molestiae. Eveniet quisquam libero id omnis sunt voluptas placeat commodi molestiae eum! Culpa odit deleniti pariatur vitae enim hic eos explicabo iusto at architecto! Exercitationem obcaecati, recusandae ducimus quae libero, veritatis quaerat nobis iste rerum eligendi nulla saepe dolorem odit earum asperiores commodi qui quibusdam iusto animi! Eum, esse voluptas! Eligendi magnam itaque exercitationem debitis esse tempora maxime doloremque praesentium, laudantium asperiores facilis at minima eaque delectus porro nisi. Et velit explicabo repudiandae corporis mollitia, tempore unde delectus error! Doloribus, laudantium vel vero quibusdam modi, eveniet quis fuga quisquam minus veritatis harum molestias nisi quasi maiores necessitatibus qui beatae minima quos, itaque voluptas earum nobis officiis debitis? Totam cum in sequi itaque delectus obcaecati porro dignissimos a unde dolorem. Cum voluptatem odit vitae iure, quaerat sit amet obcaecati fugiat aspernatur. Ipsa, ducimus beatae laboriosam minus blanditiis voluptatum! Eius natus assumenda corrupti vel. Nobis dolorum, ratione possimus praesentium in dolore accusantium expedita obcaecati nesciunt itaque accusamus ducimus, porro molestias asperiores quasi totam esse? Id a repudiandae consequatur voluptatum, saepe blanditiis aut nam ut reprehenderit aspernatur cupiditate exercitationem voluptatibus quidem tempore nesciunt nostrum! Dignissimos sit, enim quo quasi sapiente quos sequi nisi molestiae in, assumenda voluptatum perspiciatis, aliquid repellat voluptas dolorem quae tenetur nobis! Assumenda cupiditate ad, sint libero veritatis nihil labore numquam, soluta optio molestiae, quibusdam accusantium doloremque. Harum pariatur ipsa iste suscipit nulla neque expedita autem cupiditate facilis rem? Saepe voluptates expedita aperiam tenetur quibusdam! Optio delectus facilis magnam harum aliquid, perspiciatis sint impedit repellendus voluptate iure necessitatibus qui officia in nam temporibus commodi molestiae consectetur tenetur sapiente voluptas doloremque, facere illo eos? Eveniet itaque iste nulla explicabo eos, facilis officiis beatae ab ipsum, totam maiores maxime aliquid, illo tenetur placeat corrupti quasi? Quaerat deleniti excepturi officia possimus. Fuga, minus sunt. Consectetur fugiat id placeat dolore doloremque illum natus repellat voluptate quia blanditiis est expedita assumenda quae, vitae nemo nihil saepe optio. Architecto debitis quam id error obcaecati deleniti consequuntur dolores culpa, dolore omnis incidunt blanditiis velit expedita vel sapiente nam accusamus perferendis nulla, esse ut voluptatum. Omnis commodi labore, nulla beatae molestiae odit in temporibus ex officiis minima consectetur, quas voluptates odio sunt praesentium alias quidem quibusdam quo necessitatibus dolorum optio quae! Iusto sit nihil neque repudiandae consequuntur consectetur nemo, minus inventore amet nam accusamus ex quidem quibusdam molestiae, sequi quaerat aliquid reprehenderit! Praesentium libero quos obcaecati distinctio ut porro voluptas aspernatur cum architecto iste nostrum aliquid, rerum quisquam ex ipsum dolore molestias temporibus tempora tempore officiis modi illo esse! Quisquam velit, at fuga sapiente officiis neque sed tenetur laudantium est ex pariatur autem, alias recusandae suscipit facilis fugiat odio. Doloremque quia ullam atque similique distinctio, praesentium iste adipisci officiis laborum eum hic rem libero cumque deleniti asperiores neque. Autem nemo eius, ex libero error laudantium iure a? Provident totam ullam sunt sint sapiente deleniti blanditiis distinctio. Ratione, architecto? Labore earum excepturi est perspiciatis ad possimus natus deleniti dolor modi tempora corrupti, nostrum expedita iste, enim omnis vitae nisi sit fugit eos perferendis neque beatae doloribus dignissimos? Magni omnis hic eligendi repellat qui fuga reiciendis et animi nihil fugit possimus veniam illum, ex aperiam voluptatum asperiores nobis accusantium voluptas tenetur in molestias eos. Commodi reiciendis atque ab id, eligendi illo odit voluptas nostrum necessitatibus voluptatibus doloremque quo ipsum architecto inventore at quidem modi? Laudantium, fuga! Unde voluptatem provident et aspernatur ullam inventore dolor illo aliquid optio quibusdam delectus odio ea dolorem architecto minus totam, porro culpa error eius omnis cupiditate recusandae, similique, explicabo fugit! Consequuntur qui saepe fugit deleniti aspernatur. Sint eaque id veniam reiciendis non dolorum sapiente dicta! Illo sapiente aliquid maiores minus iure quisquam voluptatem perspiciatis ipsum quasi nostrum. Recusandae id neque veniam, incidunt ipsum voluptates culpa? Minima blanditiis facere provident fuga est. Nostrum hic doloribus accusamus ea dolores recusandae vitae. Aspernatur maiores nisi repellat tenetur consequuntur illum, molestias hic vero voluptatem laboriosam, natus officiis debitis officia alias id neque commodi non deleniti earum vitae sequi veniam doloribus vel! Excepturi culpa cumque nobis neque exercitationem expedita eos reiciendis quas dolore officiis saepe quam quos velit, et consequuntur ipsam temporibus suscipit similique maxime? Blanditiis modi amet, distinctio quis quasi possimus neque nulla eos pariatur vero. Tenetur eaque sunt numquam, vero dolor facilis animi enim ducimus quod distinctio nostrum in. Doloribus distinctio dicta consequatur odit quis dolore enim necessitatibus, dolorem corporis autem accusantium officia provident commodi, eius laboriosam non ratione fugiat quia? Iste praesentium unde qui dolor nemo doloremque facilis aliquid corporis facere rerum! Eum sequi minima ipsa, voluptates totam iusto dolores accusamus quae non delectus nesciunt modi labore molestias veniam porro consequatur enim rerum? Perspiciatis laborum officiis ea, voluptatum temporibus hic, doloremque dolore consectetur cum eius doloribus numquam voluptates aspernatur, recusandae necessitatibus qui quo non ex autem praesentium repellat facilis asperiores! Cum cumque fugit non doloribus, corporis commodi consequuntur adipisci laudantium iure ab voluptatibus quam debitis dolores, consequatur rerum exercitationem cupiditate molestias! Libero magnam doloribus quidem tenetur quod delectus iusto earum rerum ad ipsam iste sit, quisquam eius ducimus maiores assumenda alias repudiandae aperiam. Minima impedit quas veritatis recusandae aliquam nesciunt quo excepturi eos. Harum, dolorem unde? Autem deserunt maiores reiciendis magni et nisi similique totam nemo, quibusdam alias molestiae consequuntur perferendis dolorum, adipisci blanditiis eligendi. Sequi perspiciatis quis voluptatem repellat maiores ab laborum totam. Neque molestiae eius odio quibusdam voluptas fugiat minima ex nulla esse. Assumenda, voluptate qui. Quod beatae atque praesentium? Voluptates expedita non adipisci quo.</p>
            </div>
        </div>
        <div class="leaderboard-box overlay-box">
            <div class="top-bar">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -0.5 100 100" shape-rendering="crispEdges">
                    <path stroke="#ffffff" d="M30 34h1M64 34h1M28 35h4M63 35h3M28 36h5M62 36h5M29 37h5M61 37h5M30 38h5M60 38h5M31 39h5M59 39h5M32 40h5M58 40h5M33 41h5M57 41h5M34 42h5M56 42h5M35 43h5M55 43h5M36 44h5M54 44h5M37 45h5M53 45h5M38 46h5M52 46h5M39 47h5M51 47h5M40 48h5M50 48h5M41 49h5M49 49h5M42 50h5M48 50h5M43 51h9M44 52h7M45 53h5M44 54h7M43 55h9M42 56h5M48 56h5M41 57h5M49 57h5M40 58h5M50 58h5M39 59h5M51 59h5M38 60h5M52 60h5M37 61h5M53 61h5M36 62h5M54 62h5M35 63h5M55 63h5M34 64h5M56 64h5M33 65h5M57 65h5M32 66h5M58 66h5M31 67h5M59 67h5M30 68h5M60 68h5M29 69h5M61 69h5M30 70h3M62 70h3M31 71h1M63 71h1" />
                </svg>
            </div>

            <!-- HARDCODED, MUST REMOVE -->
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
                <div class="disclaimer-settings setting">
                    <button class="button disclaimer">Disclaimer</button>
                    <div class="disclaimer-text">
                        <p>The game has:</p>
                        <ul>
                            <li>Mentions of violence</li>
                            <li>Mentions of suicide</li>
                        </ul>
                    </div>
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
        <p class="version">Ver 1.0.0</p>
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