$(document).ready(() => {
  
  // Listen for input events on composer field and update character counter
  const $textArea = $('#tweet-text');
  $textArea.on('input', function() {
    $charCounter = $(this).siblings().children('.counter');
    $charCounter.val(140 - $(this).val().length);

    if ($charCounter.val() < 0) {
      $charCounter.addClass('negative');
    }
    if ($charCounter.val() >= 0) {
      $charCounter.removeClass('negative');
    }
  });

});