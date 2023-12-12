function battleSheetAnimator(){
    const canvas = document.createElement("canvas");
    canvas.classList.add("damagecanvas");
    let playerState = 'idle';
    const ctx = canvas.getContext('2d');
    const CANVAS_WIDTH = canvas.width = 300;
    const CANVAS_HEIGHT = canvas.height = 300;
    const spriteIMAGE = new Image();
    spriteIMAGE.src = "/public/img/assets/slash4.png";
    const spriteWidth = 192;
    const spriteHeight = 200;
    let gameFrame = 0;
    const staggerFrames = 6;
    const spriteAnimations = [];
    const animationState = [
        {
            name: "idle",
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

    let maxLoops = 60;
    let currentLoop = 0;
    
    function animateDamageSheet() {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
        let position = Math.floor(gameFrame / staggerFrames) % spriteAnimations[playerState].loc.length;
        let frameX = spriteWidth * position;
        let frameY = spriteAnimations[playerState].loc[position].y;
        ctx.drawImage(spriteIMAGE, frameX, frameY, spriteWidth, spriteHeight, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
        gameFrame++;
        currentLoop++;
        if (currentLoop >= maxLoops) {
            $(canvas).remove();
            return;
        }
        requestAnimationFrame(animateDamageSheet);
    }
    document.querySelector(".enemy canvas.targeted").parentElement.appendChild(canvas);
    animateDamageSheet();
    
  }
  