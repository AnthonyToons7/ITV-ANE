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
    <title>Gear selection</title>
    <link rel="stylesheet" href="../public/css/main.css">
</head>
<body>
    <main>
        <h1>Select gear</h1>
        <div class="gear-container">
            <div id="knight-armor" class="gear-piece">
                <img src="" alt="">
                <p>Knight's armor</p>
            </div>
            <div id="wizards-robe" class="gear-piece">
                <img src="" alt="">
                <p>Wizards robe</p>
            </div>
            <div id="assassin-cloak" class="gear-piece">
                <img src="" alt="">
                <p>Assassins' cloak</p>
            </div>
        </div>
        <div class="stat-change-container">
            <ul>
                <li id="">HP</li>
                <li id="">ATK</li>
                <li id="">DEF</li>
                <li id="">SPD</li>
                <li id="">MANA</li>
            </ul>
        </div>
    </main>
</body>
</html>