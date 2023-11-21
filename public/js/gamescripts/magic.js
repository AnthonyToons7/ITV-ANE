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