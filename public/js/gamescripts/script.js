
const prev = $(".prev-page");
const next = $(".next-page");
next.on("click", () => toggleStatsPage(true));
prev.on("click", () => toggleStatsPage(false));
let pturnCount = 0;

// CARD HAND
$("div.hand").on("click", ()=>{
  $("div.container").css("display", "block");
  $("#player-ui .UI-MOVES div").css("opacity", "0");
  $("#player-ui .UI-MOVES div").css("pointer-events", "none");
});
$("div.deck").on("click", ()=>{
  $("div.container").css("display", "none");
  $("#player-ui .UI-MOVES div").css("opacity", "1",);
  $("#player-ui .UI-MOVES div").css("pointer-events", "unset");
  $(".clicked").removeClass("clicked");
});

const buttons = document.querySelectorAll('.move-option');
const popupContainer = document.querySelector('.popup-container');
const popupContent = document.querySelector('.popup-content');

let descriptionsData = [];
// Load JSON data
fetch('../public/js/data/descriptions.json')
  .then(response => response.json())
  .then(data => {
      descriptionsData = data;
  })
  .catch(error => console.error('Error loading JSON:', error));
  buttons.forEach(button => {
    button.addEventListener('mouseover', () => {
        const moveName = button.textContent.trim();
        const moveDescription = getDescriptionFromData(moveName);

        popupContent.textContent = moveDescription;
        popupContainer.style.display = 'block';

        const buttonRect = button.getBoundingClientRect();
        popupContainer.style.left = `${buttonRect.left + buttonRect.width / 2}px`;
        popupContainer.style.top = `${buttonRect.top - popupContainer.clientHeight}px`;
    });

    button.addEventListener('mouseout', () => {
        popupContainer.style.display = 'none';
    });
});

function getDescriptionFromData(moveName) {
    const moveData = descriptionsData.find(item => item.movename === moveName);
    return moveData ? moveData.movedesc : 'Description not available.';
}

const baseStats = async ()=>{
  try {
    const response = await fetch('../public/js/data/base-stats.json');
    return await response.json();
  } catch (error) {
    return console.log(error);
  }
}
const gearStats = async ()=>{
  try {
    const response = await fetch('../public/js/data/gear.json');
    return await response.json();
  } catch (error) {
    return console.log(error);
  }
}

let gameModeStrength;
if (localStorage.getItem("difficulty") == "hard" || localStorage.getItem("difficulty") == "story"){
  gameModeStrength = 1;
} else {
  gameModeStrength = 2;
}
let strengthMultiplier = gameModeStrength;
let id = 1;
let targetId;
let defending = false;
let enemyDefending = false;
// CLASSES
class Game {
  constructor() {
    this.turnCount = 0;
    this.enemyPool = [];
    this.killCount = 0;
    this.enemies = ["Slime", 
      // "Fallen-Rose-knight"
    ];
    this.bosses = ["Void", "Fallen-Void", "Corrupted-Void", "Brave-Void"]
    this.bossesKilled = 0;
    this.enemiesKilled = 0;
  }
  async spawnEnemy() {
    try {
      const data = await baseStats();

      if (this.enemyPool.length < 3) {
        let newEnemy;
        let chosenEnemyIndex = Math.floor(Math.random() * this.enemies.length);
        const enemystats = data.find(character => character.name === this.enemies[chosenEnemyIndex]);

        // check if enough time has passed to spawn a boss in
        if (this.bossesKilled == 0 && this.enemiesKilled >= 10 &&  this.enemyPool.every(enemy => !enemy.name.includes("Void"))) {
          let chosenBossName = this.bosses[this.bossesKilled];
          const bossStats = data.find(character => character.name === chosenBossName);
          newEnemy = new Boss(
            chosenBossName, 
            bossStats["HP"],
            bossStats["HP"],
            bossStats["ATK"],
            bossStats["DEF"],
            bossStats["RES"],
            strengthMultiplier,
            "enemy-" + id,
            false
          );
          $("#bossWarning").addClass("bossWarning");
          setTimeout(() => {
            $("#bossWarning").removeClass("bossWarning");
          }, 2000);
          this.enemyPool.push(newEnemy);
        }
         else {
            if (enemystats) {
              newEnemy = new Enemy(
              this.enemies[chosenEnemyIndex],
              enemystats["HP"],
              enemystats["HP"],
              enemystats["ATK"],
              enemystats["DEF"],
              enemystats["RES"],
              strengthMultiplier,
              "enemy-" + id,
              false
              );
              this.enemyPool.push(newEnemy);
            }
          }
        const container = document.createElement("div");
        const hpbar = document.createElement("div");
        const statusEffects = document.createElement("div");
        container.classList.add("enemy-stat-container");

        container.append(hpbar, statusEffects);
        hpbar.classList.add("enemyHP");
        statusEffects.classList.add("enemyStatus");

        retrieveSprites(newEnemy.name, newEnemy.id, container);
               
        setTimeout(() => {
          document.querySelectorAll("div.enemy canvas").forEach(enemyImg => {
              enemyImg.addEventListener("click", () => {
                if (targetId && !document.querySelector(".targeted")) {
                  targetId = false;
                } else if (document.querySelector(".targeted")) document.querySelector(".targeted").classList.remove("targeted");
                targetId = enemyImg.className;
                enemyImg.classList.add("targeted");
              });
            });
        }, 50);

        console.log(newEnemy);
        id++;
      }
    } catch (error) {
      console.error(error);
    }
  }

  processTurn() {
    $(".attack-anim-overlay").addClass("hideAnim");

    this.checkEnemies();

    this.turnCount++;
    // Check if it's the third turn and spawn a new enemy if needed

    if (this.turnCount % 6 === 0) {
      strengthMultiplier = strengthMultiplier * 1.1;
      console.log("Stats increased x ", strengthMultiplier);
      this.spawnEnemy();
    } 
    else if (this.turnCount % 3 === 0) this.spawnEnemy();
    return this.enemyPool;
  }

  checkEnemies(){
    // If an enemy dies, remove them from the character pool
    for (let i=0;i<this.enemyPool.length;i++) {
      const enemy = this.enemyPool[i];
      if (enemy.hp <= 0) {
        const targetImg = document.querySelector(`canvas.${enemy.id}`);
        if (enemy.name.includes("Void")) {
            this.bossesKilled = this.bossesKilled += 1;
            if (localStorage.getItem("difficulty") == "story") {
                getNextDialog();
            }
        }
        this.enemiesKilled = this.enemiesKilled += 1;
        this.enemyPool.splice(i, 1);
        const parent = targetImg.parentElement;
        parent.querySelectorAll(".enemy-stat-container").forEach(container => container.remove());
        targetImg.remove();
        i--;
    }
    
    }
  }

  retrieveEnemies(){
    return this.enemyPool;
  }
}

// Character constructor
class Character {
  constructor(name, hp, maxHp, atk, def, res) {
    this.name = name;
    this.hp = hp;
    this.maxHp = maxHp;
    this.atk = atk;
    this.def = def;
    this.res = res;
    this.status = [];
  }

  attack(target, playerAttacking, targetId, magicDamage, damageMult, statusEffect, attacker) {
    // Perform attack logic
    let trueDamageMult;
    let calculatedDamage;
    let minDamage = 1;
    if (playerAttacking && targetId != target.id) return;
    !damageMult ? trueDamageMult = 1 : trueDamageMult = damageMult;
    magicDamage ? calculatedDamage = Math.ceil(Math.max(minDamage, (this.atk * trueDamageMult) - target.res)) :
      calculatedDamage = Math.ceil(Math.max(minDamage, (this.atk * trueDamageMult) - target.def));

    if(damageMult){
      calculatedDamage = calculatedDamage * damageMult;
    }
    if (statusEffect){
      let durationTimer = 0;
      let damage = 0;
      if (statusEffect == "bleed"){
        damage = 5;
        durationTimer = 4;
      }
      else{
        damage = 1;
        durationTimer = 8;
      }
      const statusEff = new StatusEffect(statusEffect, durationTimer, damage, target);
      target.registerEffect(statusEff);
      const statusEffImg = document.createElement("img");
      statusEffImg.src = `/public/img/effects/${statusEff.name}.gif`;
      statusEffImg.classList.add(statusEff.name);
      if(target.name == "Aubrey"){
        document.querySelector(".UI-MOVES").classList.add(statusEffect);
        document.querySelector('.status-effects-player').appendChild(statusEffImg);
      } else {
        const targetEl = document.querySelector('.'+target.id);
        targetEl.parentElement.querySelector('div.enemyStatus').appendChild(statusEffImg);
      }
    }
    
    this.checkStatus();
    // finish calculating
    target.hp = Math.floor(Math.max(0, target.hp - calculatedDamage));
    if (playerAttacking){
      document.querySelector(".UI-MOVES").classList.add("attacking");
      setTimeout(()=>document.querySelector(".UI-MOVES").classList.remove("attacking"), 1800);
      battleAnimator("player");

      // Slash effect
      battleSheetAnimator();

      target.updateHp();
    } else {
      battleAnimator(attacker.name);
    }
    if (target.enemyDefending){
      target.enemyReduceDefense();
    }
  }
  
  registerEffect(status){
    this.status.push(status);
  }

  checkStatus(){
    if (this.status){
      this.status.forEach(statusEff=>{
        statusEff.tick();
        if (statusEff.duration <= 0){
          this.status.splice(statusEff);
        }
      });
    }
  }

  defend() {
    this.def = Math.floor((this.def / 100) * 150);
    this.res = Math.floor((this.res / 100) * 150);
    defending = true;
    this.updateStats();
  }
  

  reduceDefense(){
    this.def = Math.ceil((this.def / 150) * 100);
    this.res = Math.ceil((this.res / 150) * 100);
    defending = false;
    this.updateStats();
    document.querySelector(".UI-MOVES").classList.remove("defending");
  }

  healSelf(target, amount){
    target.hp = Number(target.hp + Math.max(0, Number(target.maxHp / amount)));
    if (target.hp > target.maxHp) target.hp = target.maxHp;
  }

  useBuff(target, amt, stat) {
    target[stat] = Math.ceil((target[stat] / 100) * (100+amt));
  }

  useDebuff(target) {
    // Perform debuff logic
  }
}

class Player extends Character {
  constructor(name, hp, maxHp, atk, def, res, mana, maxMana, multiplier) {
    // 'super' is a keyword used to yank other properties from other classes
    super(name, hp, maxHp, atk, def, res);
    this.mana = mana;
    this.maxMana = maxMana;
    this.multiplier = multiplier || 1;
  }
  updateStats(){
    this.updateMulti();
    // Update all player stats. Not only in the bars, but also in the overview
    $("#health-value").text(`${Math.ceil(this.hp)} / ${this.maxHp}`);
    $(".stat-value-health").css("width", (this.hp / this.maxHp) * 100 + "%" );
    $("#mana-value").text(`${this.mana} / ${this.maxMana}`);
    $(".stat-value-mana").css("width", (this.mana / this.maxMana) * 100 + "%" );

    setTimeout(() => {
      const statProperties = ['hp', 'atk', 'def', 'res', 'mana'];
      document.querySelectorAll("div.overview p span").forEach((stat, index) => {
        const propName = statProperties[index];
        stat.textContent = Math.ceil(this[propName]);
      });
    }, 500);
    if(this.hp <= 0){
      displayGameOver();
    }
    // getData(this.mana);
    pturnCount++;
  }
  dropMana(cost){
    // Reduce mana
    if (cost > this.mana) {
      console.log("Not enough mana!");
    } else {
      this.mana -= cost;
    }
  }
  gainmana(amt) {
    // Gain mana each turn. Max is 40
    this.mana = Math.min(Number(this.mana) + Number(amt), 40);
  }
  updateMulti() {
    if (pturnCount % 10 === 0) {
      console.log("Playerstats multiplied x " + 1.01);
      const properties = ["hp", "maxHp", "atk", "def", "res", "mana", "maxMana"];
  
      properties.forEach(property => {
        this[property] = Math.ceil((this[property] / 100) * (100 + strengthMultiplier * 1.05));
      });
    }
  }
}

class Enemy extends Character {
  constructor(name, hp, maxHp, atk, def, res, multiplier, id, defending) {
    super(
      name,
      Math.ceil(hp * multiplier),
      Math.ceil(maxHp * multiplier),
      Math.ceil(atk * multiplier),
      Math.ceil(def * multiplier),
      Math.ceil(res * multiplier)
    );
    
    // The multiplier '1' = 100%;
    this.multiplier = multiplier || 1;
    this.id = id;
    this.enemyDefending = defending;
  }
  updateHp(statusEffect, correctId) {
    const targetClass = statusEffect ? correctId : targetId;
    const enemy = document.querySelector(`.${targetClass}`).parentElement;
    const $hpBar = enemy.querySelector(".enemyHP");
    this.hp <= 0 ? $($hpBar).remove() : $($hpBar).css("width", (this.hp / this.maxHp) * 100 + "%");
  }
  enemyDefend() {
    this.def = Math.floor((this.def / 100) * 150);
    this.res = Math.floor((this.res / 100) * 150);
    this.enemyDefending = true;
  }
  enemyReduceDefense(){
    this.def = Math.ceil((this.def / 150) * 100);
    this.res = Math.ceil((this.res / 150) * 100);
    this.enemyDefending = false;
  }
}

class Boss extends Character {
  constructor(name, hp, maxHp, atk, def, res, multiplier, id, defending) {
    super(
      name,
      Math.ceil(hp * multiplier),
      Math.ceil(maxHp * multiplier),
      Math.ceil(atk * multiplier),
      Math.ceil(def * multiplier),
      Math.ceil(res * multiplier)
    );
    
    // The multiplier '1' = 100%;
    this.multiplier = multiplier || 1;
    this.id = id;
    this.enemyDefending = defending;
  }
  updateHp(statusEffect, correctId){
    if(statusEffect){
      const enemy = document.querySelector(`.${correctId}`).parentElement;
      const $hpBar = enemy.querySelector(".enemyHP");
      this.hp <= 0 ? $($hpBar).remove() : $($hpBar).css("width", (this.hp / this.maxHp) * 100 + "%" );
    } else {
      console.log("test");
      const enemy = document.querySelector(`.${targetId}`).parentElement;
      const $hpBar = enemy.querySelector(".enemyHP");
      this.hp <= 0 ? $($hpBar).remove() : $($hpBar).css("width", (this.hp / this.maxHp) * 100 + "%" );
    }
  }
  enemyDefend() {
    this.def = Math.floor((this.def / 100) * 150);
    this.res = Math.floor((this.res / 100) * 150);
    enemyDefending = true;
  }
  enemyReduceDefense(){
    this.def = Math.ceil((this.def / 150) * 100);
    this.res = Math.ceil((this.res / 150) * 100);
    enemyDefending = false;
  }
}

class Card{
  constructor(
    name
  ){
    this.name = name;
  }
}

class StatusEffect{
  constructor(
    name,
    duration,
    damage,
    targetEnemy
  ){
    this.name = name;
    this.duration = duration;
    this.damage = damage;
    this.targetEnemy = targetEnemy;
  }

  tick() {
    setTimeout(() => {
      if (this.targetEnemy && this.duration > 0) {
        const currentTarget = this.targetEnemy;
        currentTarget.hp = Math.floor(Math.max(0, currentTarget.hp - this.damage));
        this.targetEnemy.name == "Aubrey" ? currentTarget.updateStats() : currentTarget.updateHp(this.name, currentTarget.id);
        
        this.duration = this.duration - 1;
        console.log(this.name + " on " + this.targetEnemy.name);
      } else if (this.duration <= 0){
        if (this.targetEnemy.name != "Aubrey"){
          const container = document.querySelector("."+this.targetEnemy.id).parentElement;
          container.querySelector(".enemy-stat-container .enemyStatus ." + this.name).remove();
        } else {
          document.querySelector(".UI-MOVES").classList.remove(this.name);
          document.querySelector(".status-effects-player ." + this.name).remove();
        }
      }
    }, 100);
  }
  
}

$(document).ready(async ()=>{
  const game = new Game();

  // Create your character by using data from the base stats json
  const data = await baseStats();
  const gearData = await gearStats();
  const chosenGear = gearData[localStorage.getItem('gear')];
  
  const playerStats = data.find(character => character.name === "Player");
  const playerCharacter = new Player(
    "Aubrey",
    Math.ceil(playerStats["HP"] / 100 * chosenGear[0]["HP"]),
    Math.ceil(playerStats["HP"] / 100 * chosenGear[0]["HP"]),
    Math.ceil(playerStats["ATK"] / 100 * chosenGear[1]["ATK"]),
    Math.ceil(playerStats["DEF"] / 100 * chosenGear[2]["DEF"]),
    Math.ceil(playerStats["RES"] / 100 * chosenGear[3]["RES"]),
    Math.ceil(40 / 100 * chosenGear[4]["MANA"]),
    Math.ceil(40 / 100 * chosenGear[4]["MANA"]),
    strengthMultiplier,
  );
  playerCharacter.updateStats();
  console.log(playerCharacter);
  game.spawnEnemy();

  // Starting new turns:
  game.processTurn();
  
  const lastMoves = [];

  document.querySelectorAll(".button.move-option").forEach(button=>{
    button.addEventListener("click",()=>{
      // Check what attack option you chose
    switch(button.id){
        case "option-attack":
          // Get all enemies, and preform the attack function on each, but the target can only be one enemy
          game.retrieveEnemies().forEach(enemy=>{
            playerCharacter.attack(enemy, "player", targetId);
          });
          // Add your last used move to an array (for AI)
          lastMoves.push("attack");
          break;
        case "option-defend":
          // Increase defense by 50% and end your turn
          playerCharacter.defend("50%");
          lastMoves.push("defend");
          document.querySelector(".UI-MOVES").classList.add("defending");
          break;
        case "option-magic-1":
          // Return if player does not have enough mana
          if(playerCharacter.mana < 10) return;

          // Reduce mana
          playerCharacter.dropMana(10);

          // Update player stats
          playerCharacter.updateStats();
          game.retrieveEnemies().forEach(enemy=>{
            // Tell the game that it's a magic attack
            playerCharacter.attack(enemy, "player", targetId, "magic", 0.75, "bleed");
          });
          lastMoves.push("attack");
          break;
        case "option-magic-2":
          if(playerCharacter.mana < 15) return;
          playerCharacter.dropMana(15);
          playerCharacter.healSelf(playerCharacter, 10);
          playerCharacter.updateStats();
          game.retrieveEnemies().forEach(enemy=>{
            playerCharacter.attack(enemy, "player", targetId, "magic", 1.15);
          });
          lastMoves.push("attack");
          break;
        case "option-magic-3":
          if(playerCharacter.mana < 25) return;
          playerCharacter.dropMana(25);
          // Increase your stats
          playerCharacter.useBuff(playerCharacter, 15, "atk");
          playerCharacter.defend();
          playerCharacter.updateStats();
          return;
        default:
          lastMoves.push("pass");
          break;
      }

      // Use delays in order to play the animations correctly
      function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
      async function playTurn() {
        const enemyTurn = game.processTurn();
      
        const delayMultiplier = localStorage.getItem("skip-battle-animations") ? 0.2 : 1;
      
        await delay(1000 * delayMultiplier);
      
        for (const enemy of enemyTurn) {

          runEnemyAi(enemy, playerCharacter, lastMoves);
      
          await delay(1200 * delayMultiplier);
          $(".attack-anim-overlay").addClass("hideAnim");
      
          await delay(400 * delayMultiplier);
          playerCharacter.updateStats();
      
          game.checkEnemies();
        }  
        if (defending) {
          playerCharacter.reduceDefense();
        }
      }
      
      setTimeout(() => {
        playTurn();
      }, 1200);
    });
  });

  // ---------NON BATTLE RELATED FUNCTION ONLOAD----------------

  // READY UP SPRITES

    // retrieveSprites("Player");
  
    // Is the gamemode story? Play dialog!
    localStorage.getItem("difficulty") == "story" ? getNextDialog() : $("#dialog-box-container").hide(); $(".dialog-background").hide();
  
    // Fetch all base stats and show it in the player data
    fetch('../public/js/data/base-stats.json')
      .then(response => response.json())
      .then(data => {
        document.querySelectorAll("div.overview p span").forEach(span => {
          const playerData = data.find(entry => entry.name === "Player");
          if (playerData) {
            const propertyName = span.parentElement.textContent.trim().split(':')[0];
            span.textContent = playerData[propertyName];
          }
        });
      })
      .catch(error => console.error('Error loading JSON:', error));

    // Cards
    let cardsFront = document.querySelector('.cards');
    let cardWidth = cardsFront.offsetWidth;
    let totalarc = 200;
    let numcards = 5; // Reset amount and draw 5 each turn
    let angles = Array(numcards).fill('').map((a, i) => (totalarc / numcards * (i + 1)) - (totalarc/2 + (totalarc / numcards) / 2));
    let margins = angles.map((a, i) => cardWidth / numcards * (i + 1));
    
    // Set the cards in the right angle
    angles.forEach((a, i) => {
      let s = `transform:rotate(${angles[i]}deg);margin-left:${margins[i]}px;`
      let c = `<div class='cardd' style='${s}'></div>`;
      cardsFront.innerHTML += c;
    });
    
    let currentlyClickedCard = null;
    cardsFront.addEventListener('click', function(event) {
      if (event.target.classList.contains('cardd')) {
        if (currentlyClickedCard) currentlyClickedCard.classList.remove('clicked');
        event.target.classList.toggle('clicked');
        currentlyClickedCard = event.target;
      }
    });
});

const toggleStatsPage = (showOverview) => {
  document.querySelectorAll(".stats-bar").forEach(bar => {
    bar.style.display = showOverview ? "none" : "flex";
  });

  $(".overview").css("display", showOverview ? "block" : "none");
  next.css("display", showOverview ? "none" : "block");
  prev.css("display", showOverview ? "block" : "none");
};

function displayGameOver(){
  $("#defeat-screen").addClass("show");
  setTimeout(() => {
    window.location.replace("http://localhost/menu.php");
  }, 3000);
}