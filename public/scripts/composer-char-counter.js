$(document).ready(() => {
  
  // Listen for input events on new tweet field and update character counter
  const $textArea = $('#tweet-text');
  $textArea.on('input', function() {
    $charCounter = $(this).siblings().children('.counter')
    $charCounter.val(140 - $(this).val().length);

    if ($charCounter.val() < 0) {
      $charCounter.addClass('negative');
    } 
    if ($charCounter.val() >= 0) {
      $charCounter.removeClass('negative');
    } 
  });

}); 