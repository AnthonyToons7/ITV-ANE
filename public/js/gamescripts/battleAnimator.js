// animating a battle
function battleAnimator(attacking){
    if (!localStorage.getItem("skip-battle-animations"))
    {
        // show the overlay
        document.querySelector(".attack-anim-overlay").classList.remove("hideAnim");

        // Get the correct enemy
        if (attacking != "player"){
            if (attacking != "Fallen-Rose-knight"){
                document.querySelector("div.enemy-box").style.backgroundImage=`url('../public/img/${attacking}-attack-render.png')`;
            } else {
                document.querySelector("div.enemy-box").style.backgroundImage=`url('../public/img/Void-attack-render.png')`;
            }
        }

        if(attacking == "player"){
            document.querySelector("div.player-box").classList.add("attacking");
            setTimeout(() => {
                document.querySelector("div.player-box").classList.remove("attacking");
            }, 1200);
        }else{
            document.querySelector("div.enemy-box").classList.add("attacking");
            setTimeout(() => {
                document.body.classList.add("hurt");
                document.querySelector(".attack-anim-overlay").classList.add("hurt");
            }, 1000);
            setTimeout(() => {
                document.body.classList.remove("hurt");
                document.querySelector(".attack-anim-overlay").classList.remove("hurt");
                document.querySelector("div.enemy-box").classList.remove("attacking");
            }, 1600);
        }
    }
}