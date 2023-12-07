// animating a battle
function battleAnimator(attacking){
    if (!localStorage.getItem("skip-battle-animations"))
    {
        console.log(localStorage.getItem("skip-battle-animations"));
        console.log("test");
        // show the overlay
        document.querySelector(".attack-anim-overlay").classList.remove("hideAnim");
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
            }, 1500);
        }
    }
}