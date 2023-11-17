function getData(playermana) {
    fetch('../public/js/data/descriptions.json')
    .then(response => response.json())
    .then(data => {
        let i = 0;
        data.forEach(description => {
            if (description.cost) {
                evenListeners(description.cost, i, playermana);
                i++;
            }
        });
    })
    .catch(error => console.log(error));
}

function evenListeners(manaCost, target, playermana) {
    const buttons = document.querySelectorAll(".button.move-option.magic-option");
    if (buttons.length > target) {
        buttons[target].addEventListener("mouseover", () => {
            console.log(playermana);
            const costManaElement = document.querySelector(".stat-cost-mana");
            const valueManaElement = document.querySelector(".stat-value-mana");
        
            const costMana = parseFloat(manaCost.replace(" mana", ""));
            const currentValueWidth = parseFloat(valueManaElement.style.width);
        
            // Check if the costMana is a valid number
            if (!isNaN(costMana)) {
                const newCostWidth = (costMana / 40) * 100;
                const newValueWidth = currentValueWidth - newCostWidth;
        
                // Update the width of the cost bar
                costManaElement.style.width = newCostWidth + "%";
                
                // Update the width of the value bar
                valueManaElement.style.width = newValueWidth + "%";
            } else {
                console.error("Invalid mana cost:", manaCost);
            }
        });
    } else {
        console.error(`Target index ${target} is out of bounds for the buttons.`);
    }
}