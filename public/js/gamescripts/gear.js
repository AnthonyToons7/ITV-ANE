 // TEST
 const gear_knight = document.getElementById("knight-armor");
 const gear_robe = document.getElementById("wizards-robe");
 const gear_cloak = document.getElementById("dark-cloak");
 const gear_consuming = document.getElementById("consuming-armor");
 const gear_none = document.getElementById("no-gear");
 const gearPieces = document.querySelectorAll(".gear-piece");
 const valueBoxes = document.querySelectorAll(".value");
 const stats = ["HP", "ATK", "DEF", "RES", "MANA"];
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
    if(document.querySelector(".selected")){
        localStorage.setItem("gear", document.querySelector(".selected").id);
        setTimeout(()=>window.location.replace("../private/warzone.php"), 1500);
    }else{
        document.querySelector(".no-gear-popup").classList.add("show");
        setTimeout(()=>document.querySelector(".no-gear-popup").classList.remove("show"), 3000);
    }
 });