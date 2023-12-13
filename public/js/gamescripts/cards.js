function applyCardEffect(id, game, player) {
    if (id.hasOwnProperty('cardId')) {
        const caseId = parseInt(id.cardId, 10);
        switch (caseId) {
            case 1:
                game.retrieveEnemies().forEach(enemy => {
                    player.attack(enemy, '', '', '', 0.75, 'bleed', '');
                    enemy.updateHp('card', enemy.id);
                });
                break;
            case 3:
                player.hp = player.hp + 10;
                player.updateStats();
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
