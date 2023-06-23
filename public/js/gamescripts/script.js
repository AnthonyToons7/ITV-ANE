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
    super(hp);

    if (this.enemyPool[0].hp<=0){
      this.enemyPool[0].remove();
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




// DIALOGS
var dialogIndex = 0;
function createDiag(dialog) {
  $('#dialog-box').text('');
  if (dialog.name === "BREAKPOINT") {
    $('#dialog-box-container').hide();
    return;
  }
  var individual = dialog.text.split('');
  for (var i = 0; i < individual.length; i++) {
    (function (i) {
      setTimeout(function () {
        $('#dialog-box').text($('#dialog-box').text() + individual[i]);
        if (i == individual.length - 1) {
          $('#dialog-box').prepend('<div id="arrow"></div>');
        }
      }, 10 * i);
    })(i);
  }

  $('#dialog-box-name').text(dialog.name);
}
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
