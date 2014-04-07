var $ = require('./window').$;

var modal = $('#modal'),
    close = $('.md-close', modal),
    overlay = $('.md-overlay');

function removeModal() {
  modal.removeClass('md-show');
}

function handleCancel() {
  
}

function handleConfirm() {

}

$('.md-trigger').on('click', function (e) {
  modal.addClass('md-show');
});

overlay.on('click', function (e) {
  e.stopPropagation();
  removeModal();
});

close.on('click', function (e) {
  e.stopPropagation();
  removeModal();
});
