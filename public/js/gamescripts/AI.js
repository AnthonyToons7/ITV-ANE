function runEnemyAi(enemy, player, lastMoves){
    const lastUsed = lastMoves;
    const enemyChar = enemy;
    const playerChar = player;
    const moveCounts = {};

    if(lastMoves.length >= 10){
      lastMoves.length = 10;
    }

    // Check the last moves used by you and sort them in an obj
    if (lastUsed){
      for (const move of lastUsed) {
        moveCounts[move] = moveCounts[move] ? moveCounts[move] + 1 : 1;
      }
    }
    console.log(moveCounts);
    const attackPercentage = moveCounts["attack"] / 100 || 0;
    const defendPercentage = moveCounts["defend"] / 100 || 0;
    const magicPercentage = moveCounts["magic"] / 100 || 0;

    const baseDefendChance = 0.192;

    // Higher attack percentage decreases defend chance
   const defendChance = baseDefendChance * (1 - attackPercentage) + defendPercentage * 0.3; 

    // Higher defend percentage increases attack chance
    const attackChance = 0.4 + attackPercentage * 0.9;

    // Higher magic percentage increases magic chance
    const magicChance = 0.3 + magicPercentage * 0.7;

    // Normalize chances to make sure they add up to 1
    const totalChances = defendChance + attackChance + magicChance;
    const normalizedDefendChance = defendChance / totalChances;
    const normalizedAttackChance = attackChance / totalChances;

    const randomValue = Math.random();

    if (randomValue < normalizedDefendChance) {
        console.log("Enemy defends");
        enemyChar.enemyDefend();
    } else if (randomValue < (normalizedDefendChance + normalizedAttackChance)) {
        console.log("Enemy attacks");
        if (enemyChar.name == "Fallen-Rose-knight") {
            const randomChance = Math.random();
            randomChance <= 0.05 ? enemyChar.attack(playerChar, '', '', '', 1, 'bleed', enemyChar) : enemyChar.attack(playerChar, '', '', '', 1, '', enemyChar);
        } else {
            enemyChar.attack(playerChar, '', '', '', 1, '', enemyChar);
        }
    } else if (randomValue < (defendChance + attackChance + magicChance)) {
        console.log("Enemy uses magic"); 
        switch(enemyChar.name){
        case "Slime":
          if (defending === true) {
            console.log("Acid fling");
            // Randomly decide if the enemy will be poisoned or not
            const randomChance = Math.random();
            randomChance <= 0.5 ? enemyChar.attack(playerChar, '', '', 'magic', 1, 'poison', enemyChar) : enemyChar.attack(playerChar, '', '', 'magic', 1, '', enemyChar);
          }
          break;
        case "Fallen-Rose-knight":
          const randomChance = Math.random();
          randomChance <= 0.10 ? enemyChar.attack(playerChar, '', '', 'magic', 1, 'bleed', enemyChar) : enemyChar.attack(playerChar, '', '', 'magic', 1, '', enemyChar);
          break;
        case "Void":
          if (defending == true){
            enemyChar.attack(playerChar, '', '', 'magic', 2, '', enemyChar);
          }
          break;
        case "Fallen-Void":
          // do thing
          break;
        case "Corrupted-Void":
          // do thing
          break;
        case "Brave-Void":
          // do thing
          break;
        }
        enemyChar.attack(playerChar, '', '', '', 1, '', enemyChar);
    } else {
      console.log("Recalculating...");
      runEnemyAi(enemy, player, lastMoves);
    }
    playerChar.gainmana(3);
}