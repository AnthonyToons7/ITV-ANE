const menu_btns = document.querySelectorAll("div.button.menu-button");
const crosses = document.querySelectorAll("div.top-bar svg");
const area1 = document.querySelector("main div.main-container.area-1");
const area2 = document.querySelector("main div.main-container.area-2");
const volSlider = document.querySelectorAll('.vol-slider');
const continueButton = document.querySelector("div.button.continue");
const volSliderM = document.getElementById("vol-slider-music");
const volSliderS = document.getElementById("vol-slider-SFX");
const saveSettingsBtn = document.querySelector(".save-settings");
const skipDialogue = document.getElementById("skip-dialogue");
let bgm;

window.addEventListener("DOMContentLoaded",()=>{
    bgm = new Audio('../public/audio/menu-ambience.mp3');
    bgm.volume = .5;
    volSliderM.value = localStorage.getItem("Backgroundvolume");
    volSliderS.value = localStorage.getItem("SFXvolume");
    localStorage.getItem("SkipDialogue") == "true" ? skipDialogue.checked = true : skipDialogue.checked = false;
    bgm.volume = volSliderM.value;
});

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
volSliderM.addEventListener("input", ()=>bgm.volume = volSliderM.value / 100);
saveSettingsBtn.addEventListener("click",()=>{
    localStorage.setItem("Backgroundvolume", volSliderM.value);
    localStorage.setItem("SFXvolume", volSliderS.value);
    localStorage.setItem("SkipDialogue", skipDialogue.checked);
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
    console.dir(localStorage);
});
document.addEventListener('click', function() {
    bgm.play()
      .catch(function(error) {
        console.log('Playback failed:', error);
      });

    // Remove the event listener after the first click
    document.removeEventListener('click', arguments.callee);
});
  