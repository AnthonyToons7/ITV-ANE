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
                <!-- +3% HP, +5% ATK, +6% DEF, -2% SPD -->
                <div id="knight-armor" class="gear-piece armor-button">
                    <img src="" alt="">
                    <p>Knight's armor</p>
                </div>
                <!-- -1% HP, +9% ATK, -7% DEF, -3% SPD, +240% MANA -->
                <div id="wizards-robe" class="gear-piece armor-button">
                    <img src="" alt="">
                    <p>Wizards robe</p>
                </div>
                <!-- +2% HP, +3% ATK, -2% DEF, +20% SPD, +50% MANA -->
                <div id="dark-cloak" class="gear-piece armor-button">
                    <img src="" alt="">
                    <p>Dark cloak</p>
                </div>
                <!-- -20% HP, +100% ATK, -20% DEF, -20% SPD -->
                <div id="consuming-armor" class="gear-piece armor-button">
                    <img src="" alt="">
                    <p>Consuming armor</p>
                </div>
                <!-- No change in stats -->
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
                        <!-- EXAMPLE: <div class="example color-red">-50%</div> -->
                        <li id="stat-HP">HP &nbsp;&nbsp; <i class="value"></i></li>
                        <li id="stat-ATK">ATK&nbsp;&nbsp; <i class="value"></i></li>
                        <li id="stat-DEF">DEF &nbsp;&nbsp;<i class="value"></i></li>
                        <li id="stat-SPD">SPD &nbsp;&nbsp;<i class="value"></i></li>
                        <li id="stat-MANA">MANA &nbsp;&nbsp;<i class="value"></i></li>
                    </ul>
                </div>
            </div>
            <div class="confirm armor-button">Confirm &check;</div>
        </div>
    </main>
    <script>
        // TEST
        const gear_knight = document.getElementById("knight-armor");
        const gear_robe = document.getElementById("wizards-robe");
        const gear_cloak = document.getElementById("dark-cloak");
        const gear_consuming = document.getElementById("consuming-armor");
        const gear_none = document.getElementById("no-gear");
        const gearPieces = document.querySelectorAll(".gear-piece");
        const valueBoxes = document.querySelectorAll(".value");
        const stats = ["HP", "ATK", "DEF", "SPD", "MANA"];
        gearPieces.forEach(gear => {
            gear.addEventListener("click", ()=>{
                getStats(gear.id)
                gearPieces.forEach(gearPiece=>gearPiece.classList.remove("selected"));
                gear.classList.add("selected");
            })
        });
        function getStats(gearId){
            fetch('../public/js/data/buffs&debuffs.json')
                .then(response => response.json())
                .then(data => {
                const gearData = data[gearId];
                if (gearData && gearData.length === stats.length) {
                    stats.forEach((stat, index) => {
                        const valueBox = document.getElementById(`stat-${stat}`);
                        if (valueBox) {
                            valueBox.querySelector('.value').textContent = gearData[index][stat] + "%";
                        }
                    });
                } else {
                    console.log("Invalid gear data or length mismatch.");
                }
            })
            .catch(error => console.log(error));
        }
        document.querySelector(".confirm.armor-button").addEventListener("click",()=>{
            localStorage.setItem("gear", document.querySelector(".selected").id);
            console.log(localStorage);
            setTimeout(() => {
                window.location.replace("http://localhost/private/warzone.php");
            }, 1500);
        });
    </script>
</body>
</html>