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
            case 3:
                player.hp = player.hp + 10;
                player.updateStats();
                break;
            case 4:
                console.log(player.status);
                for (let i=0;i<player.status.length;i++) {
                    player.status.splice(i,1);
                    document.querySelectorAll(".status-effects-player img")[i].remove();
                }
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
