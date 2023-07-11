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
            <!-- +3% HP, +5% ATK, +6% DEF, -2% SPD -->
            <div id="knight-armor" class="gear-piece">
                <img src="" alt="">
                <p>Knight's armor</p>
            </div>
            <!-- -1% HP, +9% ATK, -7% DEF, -3% SPD, +240% MANA -->
            <div id="wizards-robe" class="gear-piece">
                <img src="" alt="">
                <p>Wizards robe</p>
            </div>
            <!-- +2% HP, +3% ATK, -2% DEF, +20% SPD, +50% MANA -->
            <div id="dark-cloak" class="gear-piece">
                <img src="" alt="">
                <p>Dark cloak</p>
            </div>
            <!-- -20% HP, +100% ATK, -20% DEF, -20% SPD -->
            <div id="consuming-armor" class="gear-piece">
                <img src="" alt="">
                <p>Consuming armor</p>
            </div>
            <!-- No change in stats -->
            <div id="no-gear" class="gear-piece">
                <img src="" alt="">
                <p>No gear (based)</p>
            </div>
        </div>
        <div class="info-box">
            <i>All stats are shown with a 100% strength magnification. When player stats increase, these stat buffs/debuffs do not increase/decrease.</i>
            <i>Every 5 turns, you gain +1% to your stats. This scales up infinitely. Enemies use this same scaling system. These stats CAN be altered.</i>
        </div>
        <div class="stat-change-container">
            <ul>
                <!-- Stats must change when different armor is selected -->
                <!-- Add div behind it to show % of stat change -->
                <!-- EXAMPLE: <div class="example color-red">-50%</div> -->
                <li id="stat-HP">HP</li>
                <li id="stat-ATK">ATK</li>
                <li id="stat-DEF">DEF</li>
                <li id="stat-SPD">SPD</li>
                <li id="stat-MANA">MANA</li>
            </ul>
        </div>
    </main>
    <script>
        // TEST
        const gear_knight = document.getElementById("knight-armor");
        const gear_robe = document.getElementById("wizards-robe");
        const gear_cloak = document.getElementById("dark-cloak");
        const gear_consuming = document.getElementById("consuming-armor");
        const gear_none = document.getElementById("no-gear");
        const gearPieces = document.querySelectorAll(".gear-pieces");
        gearPieces.forEach(gear => {
            gear.addEventListener("click", ()=>{
                getStats();
                gear.classList.add("selected");
            })
        });
        function getStats(){
            $.get()
        }
    </script>
</body>
</html>