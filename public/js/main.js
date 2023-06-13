const menu_btns = document.querySelectorAll("div.button.menu-button");
const area1 = document.querySelector("main div.main-container.area-1")
menu_btns.forEach(button =>{
    button.addEventListener("click", ()=>addMenuStage(button));
})
function addMenuStage(clickedBtn) {
    console.log(clickedBtn.id);
    switch (clickedBtn.id) {
        case "start":
            area1.classList.add("zoomOut");
            document.querySelector("main div.main-container.area-2").style.display="flex";
            setTimeout(()=>{
                document.querySelector("main div.main-container.area-2").classList.add("zoomIn");
                area1.style.display="none";
                document.querySelector("main div.main-container.area-2").classList.remove("hidden");
            }, 100);
        break;
        case "story":
            
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
            }, 200);
        break;
    }
}