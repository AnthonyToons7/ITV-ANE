
// Retrieve the spritesheets
function retrieveSprites(characterName, characterId, container) {
    fetch('../public/js/data/spritesheetDirs.json')
      .then(response => response.json())
      .then(data => {
        const characterSources = data.find(characterData => characterData.hasOwnProperty(characterName));
        
        if (characterSources) {
          const source = characterSources[characterName];
          const characterTrue = characterSources.playertrue === "true"; // Check if playertrue is "true"
          sheetAnimator(source, characterTrue, characterId, container);
        } else {
          console.log("Character not found in the data.");
        }
      })
      .catch(error => console.log(error));
  }
  // Animate the sheets
  function sheetAnimator(src, playerTrue, characterId, container){
    const canvas = document.createElement("canvas");
    let playerState = 'idle';
    const ctx = canvas.getContext('2d');
    const CANVAS_WIDTH = canvas.width = 375;
    const CANVAS_HEIGHT = canvas.height = 375;
    const spriteIMAGE = new Image();
    spriteIMAGE.src = src;
    const spriteWidth = 1280;
    const spriteHeight = 1280;
    let gameFrame = 0;
    const staggerFrames = 20;
    const spriteAnimations = [];
    const animationState = [
        {
            name: "idle",
            frames: 8,
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
        canvas.classList.add(characterId);
          if (!enemy.firstChild) {
            enemy.append(container, canvas);
            animateSheet();
          }
      });
    }
  
  }
  