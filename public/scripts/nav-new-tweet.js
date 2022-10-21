$(document).ready(() => {
  // On load, hide composer
  const $composer = $('.new-tweet');
  const $textArea = $('#tweet-text');
  $composer.hide();
  
  // Reveal when Write new button is clicked
  const $writeNew = $('.write-new-button')
  $writeNew.on('click', function() {
    $composer.slideToggle('400');
    $textArea.focus();
  });
  

});


