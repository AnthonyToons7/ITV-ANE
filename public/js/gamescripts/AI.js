function runEnemyAi(enemy, player, lastMoves){
    const lastUsed = lastMoves;
    const enemyChar = enemy;
    const playerChar = player;
    const moveCounts = {};

    if (lastUsed){
      for (const move of lastUsed) {
        moveCounts[move] = moveCounts[move] ? moveCounts[move] + 1 : 1;
      }
      console.log(moveCounts);
    }
    
    const attackPercentage = moveCounts["attack"] / 100 || 0;
    const defendPercentage = moveCounts["defend"] / 100 || 0;
    const magicPercentage = moveCounts["magic"] / 100 || 0;

    const baseDefendChance = 0.3;

    // Introduce a diminishing factor for defend chance
    const defendDiminishingFactor = Math.max(0.02, 1 - 0.02 * moveCounts["defend"]);

   // Adjust these factors based on desired behavior

   // Higher attack percentage increases defend chance
    const defendChance = baseDefendChance * defendDiminishingFactor + defendPercentage * 0.3; 

     // Higher defend percentage increases attack chance
    const attackChance = 0.4 + attackPercentage * 0.9;

     // Higher magic percentage increases magic chance
    const magicChance = 0.3 + magicPercentage * 0.7;

    const randomValue = Math.random();

    if (randomValue < defendChance / 2) {
        console.log(randomValue);
        console.log("Enemy defends");
        enemyChar.enemyDefend();
    } else if (randomValue >= defendChance && randomValue < (defendChance + attackChance)) {
        console.log("Enemy attacks");
        enemyChar.attack(playerChar);
    } else if (randomValue < (defendChance + attackChance + magicChance)) {
        console.log("Enemy uses magic");
        
        switch(enemyChar.name){
        case "Slime":
          // do thing
          break;
        case "Fallen-Rose-knight":
          // do thing
          break;
        case "Void":
          // do thing
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

        enemyChar.attack(playerChar);
    } else {
        enemyChar.attack(playerChar)
    }
}