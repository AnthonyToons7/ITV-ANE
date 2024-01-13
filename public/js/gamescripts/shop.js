class Item{
    constructor(id, name, price, description, discount){
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.discount = discount;
    }
    buy(game, player, itemName, itemImg, stat) {
        if (game.money >= this.price) {
            game.money = game.money - this.price;
            const increase = player.registerItem(this, statIncrease[this.id]);
            stock.splice(this, 1);
            checkPrices(game);
            displayPopup(`+1 ${itemName}`);
            document.querySelector("#"+itemName).removeEventListener("click", this.buy, true);
            $("#"+itemName+' img').remove();
            $("#"+itemName+' p').remove();
            document.querySelector(".inventory-cash div").textContent = game.money;

            const container = document.createElement("div");
            const text = document.createElement("div");
            text.textContent = `+${increase} ${stat}`;
            container.classList.add("item");
            container.append(itemImg, text);
            document.querySelector(".items").appendChild(container);
            
            popupContainer.style.display = 'none';
            popupContainer.classList.remove("nowrap");
        } else {
            console.log("Broke.");
        }
    }
    
}


const items = [
  "gameboy",
  "dagger",
  "cartridge",
  "flashlight",
  "book",
//   "ammo",
//   "lightbulb",
];
const statIncrease=[
    "maxHp",
    "atk",
    "def",
    "res",
    "maxMana",
    "critChance",
    "willPower",
]
const prices = [
    80,
    100,
    40,
    40,
    90,
    180,
    230
];
let deathTimeout;
function disableFlee(enable){
    enable ? document.querySelector("#option-flee.button").classList.remove("disabledShop") : document.querySelector("#option-flee.button").classList.add("disabledShop");
}
function checkPrices(game){
    console.log(stock);
    if(!stock || stock.length === 0){
        disableFlee();
        return;
    }
    for (let i=0;i<stock.length;i++) {
        game.money < prices[i] ? document.querySelectorAll(".product p")[i].classList.add("broke") : document.querySelectorAll(".product p")[i].classList.add("affordable");
    }
    document.querySelector(".playerCash").textContent = game.money;
}
let stock = [];
function shopPopup(enemiesKilled, game, player){
    const oldShop = document.querySelector(".shopContainer");
    if(oldShop) oldShop.remove();
  
    const newShop = document.createElement("div");
    const flexBox = document.createElement("div");
    const shopDialog = document.createElement("div");
    const shopKeeper = document.createElement("div");
    const el = document.createElement("div");
    const playerCash = document.createElement("li");
    const shopKeeperContainer = document.createElement("div");

    const leaveShop = document.createElement("div");
    const h1 = document.createElement("h1");
    h1.textContent = "Leave shop ->";
    leaveShop.appendChild(h1);
    leaveShop.classList.add("leaveShop");
    leaveShop.addEventListener("click",()=>{
        clearTimeout(deathTimeout);
        newShop.classList.remove("goToShop");
        disableFlee();
        setTimeout(() => {
            punishMultiplier = 1.105;
            newShop.remove();
            game.spawnEnemy(punishMultiplier);
            stock.splice(this);
        }, 1000);
    })

    el.classList.add("shopKeeperBar");
    shopKeeperContainer.classList.add("shopKeeperContainer");
    shopDialog.classList.add("shopDialog");
    newShop.classList.add("shopContainer");
    flexBox.classList.add("half-flexBox");
    shopKeeper.classList.add("shopKeeper");
    playerCash.classList.add("playerCash");

    shopKeeperContainer.append(shopKeeper, el)
    shopKeeper.appendChild(shopDialog);

    playerCash.textContent = game.money;
  
    for (let i=0;i<items.length;i++) {
        let registeredItem = new Item(i, items[i], prices[i], '', 1);
        stock.push(registeredItem);

        const item = document.createElement("div");
        const itemImg = document.createElement("img");
        itemImg.src = `../public/img/shop-items/shop-item-${items[i]}.png`;
        const itemPrice = document.createElement("p");

        item.classList.add("product");
        item.id=items[i];
        game.money < prices[i] ? itemPrice.classList.add("broke") : itemPrice.classList.add("affordable");
        itemPrice.textContent = prices[i];

        item.append(itemImg,itemPrice);
        flexBox.appendChild(item);
        item.addEventListener("click", ()=>registeredItem.buy(game, player, items[i], itemImg, statIncrease[i]));
        
        item.addEventListener("mouseover", ()=>{    
            popupContent.textContent = `+ 10% ${statIncrease[i]}`;
            popupContainer.style.display = 'block';
    
            const buttonRect = item.getBoundingClientRect();
            popupContainer.style.left = `${buttonRect.left + buttonRect.width / 2}px`;
            popupContainer.style.top = `${buttonRect.top - popupContainer.clientHeight}px`;
            popupContainer.classList.add("nowrap");
        });
        item.addEventListener('mouseout', () => {
            popupContainer.style.display = 'none';
            popupContainer.classList.remove("nowrap");
        });
    }
    newShop.append(shopKeeperContainer,flexBox, playerCash, leaveShop);
    document.body.appendChild(newShop);
    shopSheetAnimator();
    setTimeout(() => {
      newShop.classList.add("goToShop");
    }, 100);
    
    // Random shop dialog
    setInterval(()=>getNextShopDialog(), 10000);
    // Be quick.
    // deathTimeout = setTimeout(()=>death(player),60000);
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
function getNextShopDialog(death) {
    fetch('../public/js/data/shopdialog.json')
    .then(response => response.json())
    .then(data => {
        if (shopdialogIndex < data.length && !data.c) {
            let dialog = death ? data[6] : data[shopdialogIndex];
            shopdialogIndex++;
            createShopDiag(dialog);
        } else {
            shopdialogIndex = 1;
        }
    })
    .catch(error => console.log(error));
}

function death(player){
    getNextShopDialog("death");
    document.querySelector(".shopContainer").classList.add("hurt");
    player.hp = 0;
    player.updateStats();
}