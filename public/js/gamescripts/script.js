// CLASSES
class Game {
  constructor() {
    this.turnCount = 0;
    this.enemyPool = [];
  }

  spawnEnemy() {
    if (this.enemyPool.length < 3) {
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

// Start a game
const game = new Game();
// Starting new turns:
// game.processTurn();

class Character {
  constructor(name, hp, atk, def, spd) {
    this.name = name;
    this.hp = hp;
    this.atk = atk;
    this.def = def;
    this.spd = spd;
  }

  attack(target) {
    // Perform attack logic
    // You can access target's properties using `target.propertyName`
  }

  defend() {
    // Perform defend logic
  }

  useBuff(target) {
    // Perform buff logic
  }

  useDebuff(target) {
    // Perform debuff logic
  }
}

class Player extends Character {
  constructor(name, hp, atk, def, spd, mana, multiplier) {
    // 'super' is a keyword used to yank other properties from other classes
    super(name, hp, atk, def, spd);
    this.mana = mana;
    this.multiplier = multiplier || 1;
  }
}

class Enemy extends Character {
  constructor(name, hp, atk, def, spd, multiplier) {
    super(name, hp, atk, def, spd);
    // The multiplier '1' = 100%;
    this.multiplier = multiplier || 1;
  }
}

class Boss extends Enemy {
  constructor(name, hp, atk, def, spd, multiplier) {
    super(name, hp, atk, def, spd);
    this.multiplier = multiplier || 1;
  }
}


// TODO: 4-way multiscript that adds 4 canvas' and sets the right spritesheet for each canvas.
// SPRITESHEETS SCRIPT
let playerState = 'idle';
const dropdownMenu = document.getElementById('animation');
dropdownMenu.addEventListener('change', (e)=>{
    playerState = e.target.value;
})
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

const spriteIMAGE = new Image();
spriteIMAGE.src = '/src/img/void-spritesheet.png';
const spriteWidth = 1000;
const spriteHeight = 1000;
let gameFrame = 0;
const staggerFrames = 7;
const spriteAnimations = [];
const animationState = [
    {
        name: "idle",
        frames: 4,
    },
    {
        name: "slash",
        frames: 5,
    }
];
animationState.forEach((state, index) => {
    let frames = {
        loc: [],
    }
    for (let j = 0; j < state.frames; j++) {
        let positionX = j * spriteWidth;
        let positionY = index * spriteHeight;
        frames.loc.push({x: positionX, y: positionY});
    }
    spriteAnimations[state.name] = frames;
});
function animateSheet(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    let position = Math.floor(gameFrame/staggerFrames) % spriteAnimations[playerState].loc.length;
    let frameX = spriteWidth * position;
    let frameY = spriteAnimations[playerState].loc[position].y;

    ctx.drawImage(spriteIMAGE, frameX, frameY, spriteWidth, 
    spriteHeight, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    gameFrame++;
    requestAnimationFrame(animateSheet);
};
animateSheet();


// DIALOGS

let dialogIndex = 0;
// CREATE A DIALOG ROW IN THE DIALOG BOX
function createDiag(dialog) {
  $('#dialog-box').text('');
  if (dialog.name === "BREAKPOINT") {
    $('#dialog-box-container').hide();
    return;
  }
  var individual = dialog.text.split('');
  for (let i = 0; i < individual.length; i++) {
    (function (i) {
      setTimeout(function () {
        $('#dialog-box').text($('#dialog-box').text() + individual[i]);
        if (i == individual.length - 1) {
          $('#dialog-box').prepend('<div id="arrow"></div>');
        }
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
getNextDialog();
