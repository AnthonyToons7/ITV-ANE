let statIncreaseCounter = 0;
function rewardPlayer(bossDeaths, game, playerCharacter, moner){
    if(moner){
        game.money = game.money + 10;
        document.querySelector(".inventory-cash div").textContent = game.money;
        return;
    }
    let rewardMoney = localStorage.getItem("difficulty") == "hard" ? 100 : 80;
    disableFlee("enable");

    // switch(bossDeaths){
    //     case 1:
    //         game.money += rewardMoney;
    //         createRelic(bossDeaths, playerCharacter);
    //         break;
    //     case 2:
    //         // do thing
    //         break;
    //     case 3:
    //         // do thing
    //         break;
    //     case 4:
    //         // do thing
    //         break;
    // }

    game.money = game.money + rewardMoney;
    createRelic(bossDeaths, playerCharacter);
   
    document.querySelector(".transition-background").classList.add("show");

    const monerContainer = document.createElement("div");
    const monerImg = document.createElement("img");
    const monerAmt = document.createElement("div");

    monerContainer.classList.add("moneyContainer");
    monerImg.classList.add("coin-icon");
    monerAmt.classList.add("coin-amt");
    monerImg.src = "../public/img/icons/moner.png";
    monerAmt.textContent = `+${rewardMoney}`;
    
    monerContainer.append(monerImg, monerAmt);
    document.querySelector(".rewardContainer div").appendChild(monerContainer);
    document.querySelector(".rewardContainer").classList.add("showRewards");

    document.querySelector(".inventory-cash div").textContent = game.money;
}

document.querySelector(".rewardContainer .button.confirm").addEventListener("click",()=>{
    document.querySelector(".transition-background").classList.remove("show");
    setTimeout(()=>{
        document.querySelector(".inventory .relics").appendChild(document.querySelector(".rewardContainer .relic"));
        document.querySelector(".moneyContainer").remove();
    }, 500);
    document.querySelector(".rewardContainer").classList.remove("showRewards");

});

function createRelic(bossDeaths, playerCharacter){
    const stats = ["maxHp", "atk", "def", "res", "maxMana"];

    const relicWrap = document.createElement("div");
    const relicStats = document.createElement("div");
    const img = document.createElement("img");
    relicWrap.classList.add("relic");
    img.src = `../public/img/relics/${stats[statIncreaseCounter]}-relic.svg`;

    let increase = Math.ceil((playerCharacter[stats[statIncreaseCounter]] / 100) * (150 * Math.ceil(bossDeaths / 2))) - playerCharacter[stats[statIncreaseCounter]];
    playerCharacter[stats[statIncreaseCounter]] = Math.ceil((playerCharacter[stats[statIncreaseCounter]] / 100) * (150 * Math.ceil(bossDeaths / 2)));
    playerCharacter.updateStats();
    relicStats.textContent = `+ ${increase} ${stats[statIncreaseCounter]}`;
    relicWrap.append(img, relicStats);
    document.querySelector("div.rewardContainer div").appendChild(relicWrap);
    statIncreaseCounter++;
}
// function relicDescriptions(amt){
//     const relicContainer = document.querySelector(".relics");
//     const popupContainer = document.querySelector('.popup-container');
//     const popupContent = document.querySelector('.popup-content');
//     relicContainer.addEventListener("mouseover", (e)=>{
//         if (e.target.classList.contains("relic")){
//             popupContent.textContent = `+ ${amt} ${stat}`;
//             popupContainer.style.display = 'block';
            
//             const buttonRect = e.target.getBoundingClientRect();
//             popupContainer.style.left = `${buttonRect.left + buttonRect.width / 2}px`;
//             popupContainer.style.top = `${buttonRect.top - popupContainer.clientHeight}px`;
//         }
//     });
//     relicContainer.addEventListener("mouseout", (e)=>{
//         if (e.target.classList.contains("relic")){
//             popupContent.textContent = ``;
//             popupContainer.style.display = 'none';
//         }
//     });
// }

// function getData(playermana) {
//     fetch('../public/js/data/descriptions.json')
//     .then(response => response.json())
//     .then(data => {
//         let i = 0;
//         data.forEach(description => {
//             if (description.cost) {
//                 evenListeners(description.cost, i, playermana);
//                 i++;
//             }
//         });
//     })
//     .catch(error => console.log(error));
// }

// function evenListeners(manaCost, target, playermana) {
//     const buttons = document.querySelectorAll(".button.move-option.magic-option");
//     if (buttons.length > target) {
//         buttons[target].addEventListener("mouseover", () => {
//             const costManaElement = document.querySelector(".stat-cost-mana");
//             const valueManaElement = document.querySelector(".stat-value-mana");
        
//             const costMana = parseFloat(manaCost.replace(" mana", ""));
//             const currentValueWidth = parseFloat(valueManaElement.style.width);
    
//             if (!isNaN(costMana)) {
//                 const newCostWidth = (costMana / 40) * 100;
//                 const newValueWidth = currentValueWidth - newCostWidth;
//                 costManaElement.style.width = newCostWidth + "%";
//                 valueManaElement.style.width = newValueWidth + "%";
//             } else {
//                 console.error("Invalid mana cost:", manaCost);
//             }
//         });
//     }
// }