// CLASSES
class Game {
  constructor() {
    this.turnCount = 0;
    this.enemyPool = [];
    this.killCount = 0;
  }

  spawnEnemy() {
    if (this.enemyPool.length < 3) {
    // TODO: choose a random enemy, and put each property into the creation

      const newEnemy = new Enemy(/* enemy properties */);
      this.enemyPool.push(newEnemy);
      console.log(`New spawn: ${newEnemy.name}`);
    }
  }

  processTurn() {

    // If an enemy dies, remove them from the character pool
    for (let i=0;i<this.enemyPool.length;i++) {
      const enemy = this.enemyPool[i];
      if (enemy.hp <= 0) {
        this.enemyPool.splice(i,1)
        i--;
      }
    }
    this.turnCount++;

    // Check if it's the third turn and spawn a new enemy if needed
    if (this.turnCount % 3 === 0) {
      this.spawnEnemy();
    }

    // Perform other logic like calling the enemy's algorithm
    // ...
  }
}

class Character {
  constructor(name, hp, atk, def, res) {
    this.name = name;
    this.hp = hp;
    this.atk = atk;
    this.def = def;
    this.res = res;
  }

  attack(target) {
    // Perform attack logic
    let calculatedDamage = Number(this.atk - target.def);
    target.hp = target.hp - calculatedDamage;
    console.log(target);
  }

  defend() {
    this.def = (this.def / 100) * 150;
    this.res = (this.res / 100) * 150;
  }

  useBuff(target) {
    // Perform buff logic
  }

  useDebuff(target) {
    // Perform debuff logic
  }
}

class Player extends Character {
  constructor(name, hp, atk, def, res, mana, multiplier) {
    // 'super' is a keyword used to yank other properties from other classes
    super(name, hp, atk, def, res);
    this.mana = mana;
    this.multiplier = multiplier || 1;
  }
  updateStats(){
    $("#health-value").text(`${this.hp} / 100`);
    $(".stat-value-health").css("width", (this.hp / 100) * 100 + "%" );
    $("#mana-value").text(`${this.mana} / 40`);
    $(".stat-value-mana").css("width", (this.mana / 40) * 100 + "%" );
  }
  // card list here
}

class Enemy extends Character {
  constructor(name, hp, atk, def, res, multiplier) {
    super(name, hp, atk, def, res);
    // The multiplier '1' = 100%;
    this.multiplier = multiplier || 1;
  }
  showData(){
    $(".enemy-data-stats").text(this.hp);
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

$(document).ready(()=>{
  const game = new Game();
  const playerCharacter = new Player("Player", "50", "25", "17", "15", "40", "1");
  const enemy = new Enemy("Slime", "50", "18", "15", "15", "1");
  enemy.attack(playerCharacter);
  playerCharacter.updateStats();
  
  // Starting new turns:
  game.processTurn();

  $("#option-attack").on("click", ()=>{
    playerCharacter.attack(enemy);
    enemy.showData();
  });
  $("#option-defend").on("click", ()=>{
    playerCharacter.defend("50%");
    enemy.showData();
  });
})





let dialogIndex = 0;
// CREATE A DIALOG ROW IN THE DIALOG BOX
function createDiag(dialog) {
  $('#dialog-box').text('');
  if (dialog.name === "BREAKPOINT") {
    $('#dialog-box-container').hide();
    return;
  }
  let individual = dialog.text.split('');
  for (let i = 0; i < individual.length; i++) {
    (function (i) {
      setTimeout(function () {
        $('#dialog-box').html($('#dialog-box').text() + individual[i]);
        if (i == individual.length - 1) {
          $('#dialog-box').prepend('<div id="arrow"></div>');
        }
        dialog.italic == "true" ? $('#dialog-box').addClass("italic") : $('#dialog-box').removeClass("italic");
      }, 10 * i);
    })(i);
  }

  // APPEND THE TEXT TO THE HTML AND ADD THE RIGHT BACKGROUND IMAGE TO THE CHARACTER BOX USING THE VARIABLES AS DIRECTORIES
  $('#dialog-box-name').text(dialog.name);
  $(`#dialog-${dialog.name}`).css("background-image", `url(../public/img/dialog-expressions/${dialog.name}/dialog-${dialog.name}-${dialog.expression}.png)`);
}

// TEST: REACTIVATE THE DIALOG BOX AFTER CONDITION
$("#test").on("click",()=>{
  $('#dialog-box-container').show();
  getNextDialog();
});


function getNextDialog() {
  fetch('../public/js/data/dialog.json')
    .then(response => response.json())
    .then(data => {
      if (dialogIndex < data.length) {
        var dialog = data[dialogIndex];
        dialogIndex++;
        createDiag(dialog);
      }
    })
    .catch(error => console.log(error));
}


$("#dialog-box").on("click", function () {
  getNextDialog();
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
    retrieveSprites("Void");
    retrieveSprites("Player");

  
  
    localStorage.getItem("difficulty") == "story" ? getNextDialog() : $("#dialog-box-container").hide();
  
    document.querySelectorAll("div.overview p span").forEach(span => {
      fetch('../public/js/data/base-stats.json')
        .then(response => response.json())
        .then(data => {
          const playerData = data.find(entry => entry.name === "Player");
          if (playerData) {
            const propertyName = span.parentElement.textContent.trim().split(':')[0];
            span.textContent = playerData[propertyName];
          }
        })
        .catch(error => console.error('Error loading JSON:', error));
    });
  
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
  