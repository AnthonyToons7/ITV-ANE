var dialogIndex = 0;

function createDiag(dialog) {
  $('#dialog-box').text('');
  if (dialog.name === "BREAKPOINT") {
    $('#dialog-box-container').hide();
    return;
  }
  var individual = dialog.text.split('');

  for (var i = 0; i < individual.length; i++) {
    (function (i) {
      setTimeout(function () {
        $('#dialog-box').text($('#dialog-box').text() + individual[i]);
        if (i == individual.length - 1) {
          $('#dialog-box').prepend('<div id="arrow"></div>');
        }
      }, 10 * i);
    })(i);
  }

  $('#dialog-box-name').text(dialog.name);
}

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

getNextDialog();
