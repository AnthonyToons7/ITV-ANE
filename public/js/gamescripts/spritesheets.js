
// Retrieve the spritesheets
function retrieveSprites(characterName) {
    fetch('../public/js/data/spritesheetDirs.json')
      .then(response => response.json())
      .then(data => {
        const characterSources = data.find(characterData => characterData.hasOwnProperty(characterName));
        
        if (characterSources) {
          const source = characterSources[characterName];
          const characterTrue = characterSources.playertrue === "true"; // Check if playertrue is "true"
          sheetAnimator(source, characterTrue);
        } else {
          console.log("Character not found in the data.");
        }
      })
      .catch(error => console.log(error));
  }
  // Animate the sheets
  function sheetAnimator(src, playerTrue){
    const canvas = document.createElement("canvas");
    canvas.classList.add("spritecanvas");
    let playerState = 'idle';
    const ctx = canvas.getContext('2d');
    const CANVAS_WIDTH = canvas.width = 400;
    const CANVAS_HEIGHT = canvas.height = 400;
    const spriteIMAGE = new Image();
    spriteIMAGE.src = src;
    const spriteWidth = 1000;
    const spriteHeight = 1000;
    let gameFrame = 0;
    const staggerFrames = 9;
    const spriteAnimations = [];
    const animationState = [
        {
            name: "idle",
            frames: 4,
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
        let position = Math.floor(gameFrame/staggerFrames) % spriteAnimations[playerState].
        loc.length;
        let frameX = spriteWidth * position;
        let frameY = spriteAnimations[playerState].loc[position].y;
        ctx.drawImage(spriteIMAGE, frameX, frameY, spriteWidth, 
        spriteHeight, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        gameFrame++;
        requestAnimationFrame(animateSheet);
    };
    if (playerTrue === true) $("div.player-container div.player").append(canvas);
    else{
       document.querySelectorAll("div.enemy").forEach(enemy=>{
        if (!enemy.hasChildNodes()) {
          enemy.appendChild(canvas);
        }
      });
    }
  
    // animateSheet();
  }
  