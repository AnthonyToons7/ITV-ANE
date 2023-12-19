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
                player.hp = player.hp + 10;
                player.updateStats();
                break;
            case 4:
                // for (let i = player.status.length - 1; i >= 0; i--) {
                //     player.status.splice(i, 1);
                //     document.querySelectorAll(".status-effects-player img").forEach(img=>img.remove());
                // }
                player.status = [];

                const statusImages = document.querySelectorAll(".status-effects-player img");
                statusImages.forEach(img => img.remove());
                break;
            case 5:
                console.log(player);
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