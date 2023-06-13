const menu_btns = document.querySelectorAll("div.button.menu-button");
const crosses = document.querySelectorAll("div.top-bar svg");
const area1 = document.querySelector("main div.main-container.area-1");
const area2 = document.querySelector("main div.main-container.area-2");
const volSlider = document.querySelectorAll('.vol-slider');
const continueButton = document.querySelector("div.button.continue");
menu_btns.forEach(button =>{
    button.addEventListener("click", ()=>addMenuStage(button));
});
crosses.forEach(cross=>{
    cross.addEventListener("click", ()=>cross.parentNode.parentNode.classList.remove("show"));
});
volSlider.forEach(slider=>{
    slider.addEventListener("input", ()=>{
        if (slider.value === "0") {
            slider.classList.add('empty');
        } else {
            slider.classList.remove('empty');
        }
    });
});
continueButton.addEventListener("click", ()=>{
    var ele = document.querySelectorAll('input[name="difficulty-selection"]');
    for (i = 0; i < ele.length; i++) {
        if (ele[i].checked)
            switch (ele[i].value) {
                case 'hard':
                    console.log('1');
                    break;
                case 'insanity':
                    console.log('2');
                    break;
            }
        }
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
        case "leaderboard":
            document.querySelector(".leaderboard-box").classList.add("show");
        break;
        case "history":
            document.querySelector(".history-box").classList.add("show");
        break;
        case "settings":
            document.querySelector(".settings-box").classList.add("show");
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
$(document).ready(function() {
    $('input[type="radio"]').change(function() {
      if ($(this).is(':checked')) {
        $('label').removeClass('checked');
        $(`label[for="${$(this).attr('id')}"]`).addClass('checked');
      }
    });
  });
  