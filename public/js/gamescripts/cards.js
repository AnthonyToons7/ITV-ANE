async function createCards(game) {
    const cardsFront = document.querySelector('.cards');
    let cardWidth = cardsFront.offsetWidth;
    const numCards = 5;
    let createdCards = 0;
  
    let cardDatas = await cardData();
    
    while (createdCards < numCards && cardDatas.length > 0) {
        if (cardDatas.length === 0) {
            console.warn('Not enough unique cards available.');
            break;
        }	
        const randIndex = Math.floor(Math.random() * cardDatas.length);
        const selectedCard = cardDatas[randIndex];

        if(selectedCard["unlocked-after"] && selectedCard["unlocked-after"] !== game.bossesKilled){
            continue;
        };
    
        const card = document.createElement("div");
        const cardName = document.createElement("div");
        const cardDesc = document.createElement("div");
    
        cardName.textContent = selectedCard["cardname"];
        cardDesc.textContent = selectedCard["carddesc"];
    
        cardName.classList.add("cardTitle");
        cardDesc.classList.add("cardDesc");
        card.dataset.cardId = selectedCard["ID"];

        card.append(cardName, cardDesc);

        const marginLeft = (cardWidth / numCards) * (createdCards + 1);
        card.style.marginLeft = `${marginLeft}px`;

        card.classList.add("cardd");
        cardsFront.appendChild(card);
        cardDatas = cardDatas.filter((_, index) => index !== randIndex);
        createdCards++;
    }
  }
    

function applyCardEffect(id, game, player) {
    if (id.hasOwnProperty('cardId')) {
        const caseId = parseInt(id.cardId, 10);
        switch (caseId) {
            case 1:
                game.retrieveEnemies().forEach(enemy => {
                    player.attack(enemy, '', '', '', 0.75, 'burn', '');
                    enemy.updateHp('card', enemy.id);
                });
                break;
            case 2:
                removeCard();
                player.mana = player.mana + 10;
                player.updateStats();
                break;
            case 3:
                player.hp = player.hp + 20;
                player.updateStats();
                break;
            case 4:
                // 1
                // for (let i = player.status.length - 1; i >= 0; i--) {
                //     player.status.splice(i, 1);
                //     document.querySelectorAll(".status-effects-player img").forEach(img=>img.remove());
                // }

                // 2
                player.status = [];
                const statusImages = document.querySelectorAll(".status-effects-player img");
                statusImages.forEach(img => img.remove());
                break;
            case 5:
                player.hp = player.hp / 2;
                player.updateStats();
                game.retrieveEnemies().forEach(enemy => {
                    player.attack(enemy, 'player', targetId, '', 1, '', '', 'ardent');
                    enemy.updateHp('card', enemy.id);
                });
                break;
            default:
                console.log("Unknown caseId.");
        }
    } else {
        console.log("No cardId found.");
    }
}

function removeCard() {
    const cardElements = document.querySelectorAll('.cardd'); // Adjust the selector based on your HTML structure
    const randomIndex = Math.floor(Math.random() * cardElements.length);
    
    if (cardElements.length > 0) {
        const randomCard = cardElements[randomIndex];
        randomCard ? randomCard.remove(): removeCard();
    }
}