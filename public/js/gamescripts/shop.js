
const items = [
  "gameboy",
  "lightbulb",
  "ammo",
  "book",
  "cartridge",
  "dagger",
  "flashlight",
];
const prices = [
    170,
    130,
    200,
    60,
    300,
    180,
    230
];
function shopPopup(enemiesKilled, cash){
    const oldShop = document.querySelector(".shopContainer");
    if(oldShop) oldShop.remove();
  
    const newShop = document.createElement("div");
    const flexBox = document.createElement("div");
    const shopDialog = document.createElement("div");
    const shopKeeper = document.createElement("div");
    const el = document.createElement("div");
    const shopKeeperContainer = document.createElement("div");

    el.classList.add("shopKeeperBar");
    shopKeeperContainer.classList.add("shopKeeperContainer");
    shopDialog.classList.add("shopDialog");
    newShop.classList.add("shopContainer");
    flexBox.classList.add("half-flexBox");
    shopKeeper.classList.add("shopKeeper");

    shopKeeperContainer.append(shopKeeper, el)
    shopKeeper.appendChild(shopDialog);
  
    for (let i=0;i<items.length;i++) {
      const item = document.createElement("div");
      const itemImg = document.createElement("img");
      itemImg.src = `../public/img/shop-items/shop-item-${items[i]}.png`;
      const itemPrice = document.createElement("p");
  
      item.classList.add("product");
      cash < prices[i] ? itemPrice.classList.add("broke") : itemPrice.classList.add("affordable");
      itemPrice.textContent = prices[i];
  
      item.append(itemImg,itemPrice);
      flexBox.appendChild(item);
    }
    newShop.append(shopKeeperContainer,flexBox);
    document.body.appendChild(newShop);
    shopSheetAnimator();
    setTimeout(() => {
      newShop.classList.add("goToShop");
    }, 100);
    

    setInterval(()=>getNextShopDialog(), 10000);
    getNextShopDialog();
}
function shopSheetAnimator(){
    const canvas = document.createElement("canvas");
    let playerState = 'idle';
    const ctx = canvas.getContext('2d');
    const CANVAS_WIDTH = canvas.width = 375;
    const CANVAS_HEIGHT = canvas.height = 380;
    const spriteIMAGE = new Image();
    spriteIMAGE.src = '../public/img/spritesheets/shopkeeper2.png';
    const spriteWidth = 768;
    const spriteHeight = 768;
    let gameFrame = 0;
    const staggerFrames = 15;
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
    function animateShopSheet(){
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        let position = Math.floor(gameFrame/staggerFrames) % spriteAnimations[playerState].
        loc.length;
        // let frameX = spriteAnimations[playerState].loc[position].x;
        // let frameY = spriteAnimations[playerState].loc[position].y;
        let frameX = spriteWidth * position;
        let frameY = spriteAnimations[playerState].loc[position].y;
        ctx.drawImage(spriteIMAGE, frameX, frameY, spriteWidth, 
        spriteHeight, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        gameFrame++;
        requestAnimationFrame(animateShopSheet);
    };
    document.querySelector(".shopKeeper").appendChild(canvas);
    animateShopSheet();
}
  

function createShopDiag(dialog) {
    $('.shopDialog').text('');
    let individual = dialog.text.split('');
    for (let i = 0; i < individual.length; i++) {
      (function (i) {
        setTimeout(function () {
          $('.shopDialog').html($('.shopDialog').text() + individual[i]);
        }, 10 * i);
      })(i);
    }
}
let shopdialogIndex = 0;
function getNextShopDialog() {
    fetch('../public/js/data/shopdialog.json')
    .then(response => response.json())
    .then(data => {
        if (shopdialogIndex < data.length) {
            let dialog = data[shopdialogIndex];
            shopdialogIndex++;
            createShopDiag(dialog);
        } else {
            shopdialogIndex = 1;
        }
    })
    .catch(error => console.log(error));
}