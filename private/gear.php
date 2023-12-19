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
        <div class="container center">
            <h1>Select gear</h1>
            <div class="gear-container">
                <div id="knight-armor" class="gear-piece armor-button">
                    <img src="" alt="">
                    <p>Knight's armor</p>
                </div>
                <div id="wizards-robe" class="gear-piece armor-button">
                    <img src="" alt="">
                    <p>Wizards robe</p>
                </div>
                <div id="dark-cloak" class="gear-piece armor-button">
                    <img src="" alt="">
                    <p>Dark cloak</p>
                </div>
                <div id="consuming-armor" class="gear-piece armor-button">
                    <img src="" alt="">
                    <p>Consuming armor</p>
                </div>
                <div id="no-gear" class="gear-piece armor-button">
                    <img src="" alt="">
                    <p>No gear (based)</p>
                </div>
            </div>
            <div class="information flex">
                <div class="info-box">
                    <i>&#9432; All stats are shown with a 100% strength magnification. When player stats increase, these stat buffs/debuffs do not increase/decrease.</i>
                    <br/><br/><i>&#9432; Every 5 turns, you gain +1% to your stats. This scales up infinitely. Enemies use this same scaling system. These stats CAN be altered.</i>
                </div>
                <div class="stat-change-container">
                    <ul>
                        <!-- Stats must change when different armor is selected -->
                        <!-- Add div behind it to show % of stat change -->
                        <li id="stat-HP">HP &nbsp;&nbsp; <i class="value"></i></li>
                        <li id="stat-ATK">ATK&nbsp;&nbsp; <i class="value"></i></li>
                        <li id="stat-DEF">DEF &nbsp;&nbsp;<i class="value"></i></li>
                        <li id="stat-RES">RES &nbsp;&nbsp;<i class="value"></i></li>
                        <li id="stat-MANA">MANA &nbsp;&nbsp;<i class="value"></i></li>
                    </ul>
                </div>
            </div>
            <div class="confirm armor-button">Confirm &check;</div>
            <div class="no-gear-popup">
                <p>Please select your gear first</p>
            </div>
        </div>
    </main>
    <script src="../public/js/gamescripts/gear.js"></script>
</body>
</html>