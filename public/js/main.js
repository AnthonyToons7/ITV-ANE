const menu_btns = document.querySelectorAll("div.button.menu-button");
const crosses = document.querySelectorAll("div.top-bar svg");
const area1 = document.querySelector("main div.main-container.area-1");
const area2 = document.querySelector("main div.main-container.area-2");
menu_btns.forEach(button =>{
    button.addEventListener("click", ()=>addMenuStage(button));
});
crosses.forEach(cross=>{
    cross.addEventListener("click", ()=>cross.parentNode.parentNode.classList.remove("show"));
});
function addMenuStage(clickedBtn) {
    switch (clickedBtn.id) {
        case "start":
            area1.classList.add("zoomOut");
            document.querySelector("main div.main-container.area-2").style.display="flex";
            setTimeout(()=>{
                area2.classList.add("zoomIn");
                area1.style.display="none";
                document.querySelector("main div.main-container.area-2").classList.remove("hidden");
            }, 500);
        break;
        case "story":
            document.querySelector(".story-box").classList.add("show");
        break;
        case "settings":
            
        break;
        case "back":
            const index = clickedBtn.parentElement.dataset.id;
            const current = clickedBtn.parentElement;
            const prev = document.querySelector(`main div.main-container.area-${Number(index-1)}`);

            current.classList.remove("zoomIn");
            current.classList.add("hidden");
            setTimeout(() => {
                prev.style.display="flex";
                setTimeout(() => {
                    current.style.display="none";
                    prev.classList.remove("zoomOut");
                    prev.classList.add("zoomBack");
                }, 100);
            }, 400);
        break;
    }
}