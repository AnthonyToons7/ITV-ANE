const baseStats = ()=>{
  fetch('../data/base-stats.json')
  .then(response => response.json())
  .then(data => {
    return data;
  })
  .catch(error => console.log(error));
}
let strengthMultiplier = 1;
let id = 1;
let targetId;
// CLASSES
class Game {
  constructor() {
    this.turnCount = 0;
    this.enemyPool = [];
    this.killCount = 0;
    this.enemies = ["Void","Slime", "Fallen-Rose-Knight"];
  }
  spawnEnemy() {
    if (this.enemyPool.length < 3) {
      let chosenEnemyIndex = Math.floor(Math.random() * this.enemies.length);
      const enemystats = baseStats.find(character => character.name === this.enemies[chosenEnemyIndex]);
      const newEnemy = new Enemy
        (
          this.enemies[chosenEnemyIndex], 
          // HP
          enemystats["HP"], 
          // MAXHP
          enemystats["HP"], 
          enemystats["ATK"], 
          enemystats["DEF"], 
          enemystats["RES"], 
          strengthMultiplier, 
          "enemy-"+id
        );
      this.enemyPool.push(newEnemy);

      const container = document.createElement("div");
      const hpbar = document.createElement("div");
      const statusEffects = document.createElement("div");
      container.classList.add("enemy-stat-container");
  
      container.append(hpbar,statusEffects)
      hpbar.classList.add("enemyHP");
      statusEffects.classList.add("enemyStatus");

      const img = document.createElement("img");
      img.src = "/public/img/spritesheets/"+newEnemy.name+".png";
      img.classList.add("enemy-"+id);
      img.id="enemy-"+newEnemy.name;
      document.querySelectorAll(".enemy").forEach(enemy=>{
        if (!enemy.firstChild){
          enemy.append(container, img);
        }
      })
      document.querySelectorAll(".enemy img").forEach(enemyImg => {
        enemyImg.addEventListener("click", () => {
          if (targetId && !document.querySelector(".targeted")){
            targetId = false;
          } else if (document.querySelector(".targeted")) document.querySelector(".targeted").classList.remove("targeted");
          targetId = enemyImg.className;
          enemyImg.classList.add("targeted");
        });
      });
      
      // retrieveSprites(this.enemies[chosenEnemyIndex]);
      // console.log(`New spawn: ${newEnemy.name}`);
      console.log(newEnemy);
      id++;
    }
  }

  processTurn() {
    // If an enemy dies, remove them from the character pool
    for (let i=0;i<this.enemyPool.length;i++) {
      const enemy = this.enemyPool[i];
      if (enemy.hp <= 0) {
        const targetImg = document.querySelector(`.enemy img.${targetId}`);
        this.enemyPool.splice(i,1);
        const parent = targetImg.parentElement;
        parent.querySelectorAll(".enemy-stat-container").forEach(container=>container.remove());
        targetImg.remove();
        i--;
      }
    }
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
  }

  attack(target, playerAttacking, targetId, magicDamage, damageMult) {
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

    // finish calculating
    target.hp = Math.max(0, target.hp - calculatedDamage);
    if (playerAttacking){
      sheetAnimator();
      target.updateHp();
    }
  }

  defend() {
    this.def = (this.def / 100) * 150;
    this.res = (this.res / 100) * 150;
  }

  healSelf(target, amount){
    target.hp = Number(target.hp + Math.max(0, Number(target.maxHp / amount)));
    if (target.hp > target.maxHp) target.hp = target.maxHp;
  }

  useBuff(target, amt) {
    target.def = (target.def / 100) * (100+amt);
    console.log(target.def);
  }

  useDebuff(target) {
    // Perform debuff logic
  }
}

class Player extends Character {
  constructor(name, hp, maxHp, atk, def, res, mana, multiplier) {
    // 'super' is a keyword used to yank other properties from other classes
    super(name, hp, maxHp, atk, def, res);
    this.mana = mana;
    this.multiplier = multiplier || 1;
  }
  updateStats(){
    $("#health-value").text(`${Math.ceil(this.hp)} / ${this.maxHp}`);
    $(".stat-value-health").css("width", (this.hp / this.maxHp) * 100 + "%" );
    $("#mana-value").text(`${this.mana} / 40`);
    $(".stat-value-mana").css("width", (this.mana / 40) * 100 + "%" );

    const statProperties = ['hp', 'atk', 'def', 'res', 'mana'];
    document.querySelectorAll("div.overview p span").forEach((stat, index) => {
        const propName = statProperties[index];
        stat.textContent = this[propName];
    });
  }
  dropMana(cost){
    this.mana = this.mana - cost;
  }
  gainmana(amt) {
    this.mana = Math.min(Number(this.mana) + Number(amt), 40);
}


  // card list here
}

class Enemy extends Character {
  constructor(name, hp, maxHp, atk, def, res, multiplier, id) {
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
  }
  updateHp(){
    const enemy = document.querySelector(`.${targetId}`).parentElement;
    const $hpBar = enemy.querySelector(".enemyHP");

    this.hp <= 0 ? $($hpBar).remove() : $($hpBar).css("width", (this.hp / this.maxHp) * 100 + "%" );
  }
}

class Boss extends Enemy {
  constructor(name, hp, atk, def, res, multiplier) {
    super(name, hp, atk, def, res);
    this.multiplier = multiplier || 1;
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
    bleed_light,
    bleed_normal,
    bleed_heavy,
  ){
    this.bleed_light = bleed_light
    this.bleed_normal = bleed_normal
    this.bleed_heavy = bleed_heavy
  }
}

$(document).ready(()=>{
  const game = new Game();
  const playerCharacter = new Player("Player", "50", "50", "25", "17", "15", "40", 1);
  game.spawnEnemy();
  getData(playerCharacter.mana)
  // Starting new turns:
  game.processTurn();

  document.querySelectorAll(".button.move-option").forEach(button=>{
    button.addEventListener("click",()=>{
    switch(button.id){
        case "option-attack":
          game.retrieveEnemies().forEach(enemy=>{
            playerCharacter.attack(enemy, "player", targetId);
          });
          break;
        case "option-defend":
          playerCharacter.defend("50%");
          break;
        case "option-magic-1":
          playerCharacter.dropMana(10);
          playerCharacter.updateStats();
          game.retrieveEnemies().forEach(enemy=>{
            playerCharacter.attack(enemy, "player", targetId, "magic", 0.75, "bleed-0.04");
          });
          break;
        case "option-magic-2":
          playerCharacter.healSelf(playerCharacter, 10);
          playerCharacter.dropMana(15);
          playerCharacter.updateStats();
          game.retrieveEnemies().forEach(enemy=>{
            playerCharacter.attack(enemy, "player", targetId, "magic", 1.15);
          });
          break;
        case "option-magic-3":
          playerCharacter.dropMana(35);
          playerCharacter.updateStats();
          playerCharacter.defend();
          playerCharacter.useBuff(playerCharacter, 50);
          return;
        default:
          break;
      }
      setTimeout(() => {
          const enemyTurn = game.processTurn();
          enemyTurn.forEach(enemy=>{
            enemy.attack(playerCharacter);
          });
          playerCharacter.gainmana(5);
          playerCharacter.updateStats();
      }, 800);
    });
  });
});

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

let descriptionsData = []; // To store loaded JSON data

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


// STAT PAGE BTNS ARROWS
const prev = $(".prev-page");
const next = $(".next-page");

next.on("click", ()=>{
  document.querySelectorAll(".stats-bar").forEach(bar=>{
    bar.style.display="none";
  })
  $(".overview").css("display", "block");
  next.css("display", "none");
  prev.css("display", "block");
});
prev.on("click", ()=>{
  document.querySelectorAll(".stats-bar").forEach(bar=>{
    bar.style.display="flex";
  })
  $(".overview").css("display", "none");
  next.css("display", "block");
  prev.css("display", "none");
});

// READY
$(document).ready(function(){
  // START/CREATE GAME

  // READY UP SPRITES
    // retrieveSprites("Void");
    // retrieveSprites("Player");
  
    localStorage.getItem("difficulty") == "story" ? getNextDialog() : $("#dialog-box-container").hide();
  
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

  
    let cardsFront = document.querySelector('.cards');
    let cardWidth = cardsFront.offsetWidth;
    let totalarc = 200;
    let numcards = 5; // Reset amount and draw 5 each turn
    let angles = Array(numcards).fill('').map((a, i) => (totalarc / numcards * (i + 1)) - (totalarc/2 + (totalarc / numcards) / 2));
    let margins = angles.map((a, i) => cardWidth / numcards * (i + 1));
    
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