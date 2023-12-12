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
            // Add more cases if needed
            default:
                console.log("Unknown caseId. Do something sensible, you imbecile!");
        }
    } else {
        console.log("No cardId found in the DOMStringMap. You're a special kind of dumb, aren't you?");
    }
}
