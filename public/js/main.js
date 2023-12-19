// Declarations
const menu_btns = document.querySelectorAll("div.button.menu-button");
const crosses = document.querySelectorAll("div.top-bar svg");
const area1 = document.querySelector("main div.main-container.area-1");
const area2 = document.querySelector("main div.main-container.area-2");
const volSlider = document.querySelectorAll('.vol-slider');
const continueButton = document.querySelector("div.button.continue");
const volSliderM = document.getElementById("vol-slider-music");
const volSliderS = document.getElementById("vol-slider-SFX");
const saveSettingsBtn = document.querySelector(".save-settings");
const volumeButtonM = document.getElementById("volume-btn");
const battleAnimsBtn = document.getElementById("battleAnims");
const overlay = document.querySelector(".overlay-box-overlay");
let bgm;
let sfx;

window.addEventListener("DOMContentLoaded",()=>{
    bgm = new Audio('../public/audio/menu-ambience.mp3');
    bgm.volume = .5;
    sfx = new Audio('../public/audio/menu-ambience.mp3');
    sfx.volume = .5;
    bgm.volume = volSliderM.value / 100;
    sfx.volume = volSliderS.value / 100;
    volSliderM.value = localStorage.getItem("backgroundvolume");
    volSliderS.value = localStorage.getItem("sfxvolume");
    if (localStorage.getItem("backgroundvolume-muted") == "true" || localStorage.getItem("backgroundvolume") == 0) {
        volSliderM.classList.add("empty");
        bgm.muted = true;
    }
});

menu_btns.forEach(button =>{
    button.addEventListener("click", ()=>addMenuStage(button));
});
crosses.forEach(cross=>{
    cross.addEventListener("click", ()=>{
        cross.parentNode.parentNode.classList.remove("show");
        overlay.classList.remove("show");
    });
});
volSlider.forEach(slider=>{
    slider.addEventListener("input", ()=>{
        slider.value === "0" ? slider.classList.add('empty') : slider.classList.remove('empty');
    });
});
// Volume sliders
volSliderM.addEventListener("input", ()=>bgm.volume = volSliderM.value / 100);
volSliderS.addEventListener("input", ()=>sfx.volume = volSliderS.value / 100);
disclaimer.addEventListener("click",()=>{
    document.querySelector(".disclaimer-text").style.display="block";
});
saveSettingsBtn.addEventListener("click",()=>{
    localStorage.setItem("backgroundvolume", volSliderM.value);
    localStorage.setItem("sfxvolume", volSliderS.value);
    localStorage.setItem("backgroundvolume-muted", bgm.muted);
    document.querySelector("div.saved").style.display="block";
});

let isMuted = false;
volumeButtonM.addEventListener("click", () => {
    isMuted = !isMuted;
    bgm.muted = isMuted;
    isMuted ? volSliderM.classList.add("empty") : volSliderM.classList.remove("empty");
});
let toggleBattleAnims = false;
battleAnimsBtn.addEventListener("click", () => {
    toggleBattleAnims = !toggleBattleAnims;
    localStorage.setItem("skip-battle-animations", toggleBattleAnims);
});
continueButton.addEventListener("click", ()=>{
    var ele = document.querySelectorAll('input[name="difficulty-selection"]');
    for (i = 0; i < ele.length; i++) {
        if (ele[i].checked){
            console.log(`${ele[i].value}`);
            localStorage.setItem("difficulty", `${ele[i].value}`);
            if (ele[i].value === "insanity"){
                document.body.classList.add("damage");
                setTimeout(() => {
                    document.body.classList.remove("damage");
                }, 1000);
                return;
            }
        }
     }
     window.location.href = `../../private/gear?difficulty=${localStorage.getItem("difficulty")}`;
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
        case "story-mode":
        case "leaderboard":
        case "history":
        case "settings":
            document.querySelector(`.${clickedBtn.id}-box`).classList.add("show");
            overlay.classList.add("show");
        break;
        case "back":
            const index = clickedBtn.parentElement.dataset.id;
            const current = clickedBtn.parentElement;
            const prev = document.querySelector(`main div.main-container.area-${Number(index-1)}`);

            current.classList.remove("zoomIn");
            current.classList.add("hidden");
            setTimeout(()=> {
                prev.style.display="flex";
                setTimeout(()=> {
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
document.addEventListener('click', function() {
    bgm.play()
    document.removeEventListener('click', arguments.callee);
});
  