let dialogIndex = 0;
// CREATE A DIALOG ROW IN THE DIALOG BOX
function createDiag(dialog) {
  $('#dialog-box').text('');
  if (dialog.name === "BREAKPOINT") {
    $('#dialog-box-container').hide();
    return;
  }
  let individual = dialog.text.split('');
  for (let i = 0; i < individual.length; i++) {
    (function (i) {
      setTimeout(function () {
        $('#dialog-box').html($('#dialog-box').text() + individual[i]);
        if (i == individual.length - 1) {
          $('#dialog-box').prepend('<div id="arrow"></div>');
        }
        dialog.italic == "true" ? $('#dialog-box').addClass("italic") : $('#dialog-box').removeClass("italic");
      }, 10 * i);
    })(i);
  }

  // APPEND THE TEXT TO THE HTML AND ADD THE RIGHT BACKGROUND IMAGE TO THE CHARACTER BOX USING THE VARIABLES AS DIRECTORIES
  $('#dialog-box-name').text(dialog.name);
  $(`#dialog-${dialog.name}`).css("background-image", `url(../public/img/dialog-expressions/${dialog.name}/dialog-${dialog.name}-${dialog.expression}.png)`);
}

// TEST: REACTIVATE THE DIALOG BOX AFTER CONDITION
$("#test").on("click",()=>{
  $('#dialog-box-container').show();
  $('#dialog-box').show();
  $('#dialog-box-name').show();
  getNextDialog();
});


function getNextDialog() {
  fetch('../public/js/data/dialog.json')
    .then(response => response.json())
    .then(data => {
      if (dialogIndex < data.length) {
        var dialog = data[dialogIndex];
        dialogIndex++;
        createDiag(dialog);
      }
    })
    .catch(error => console.log(error));
}


$("#dialog-box").on("click", function () {
  getNextDialog();
});

