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