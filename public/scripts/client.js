$(document).ready(() => {
  
  // Cross-Site Scripting prevention
  const escapeFunction = function(string, element) {
    let newElement = document.createElement(element);
    newElement.appendChild(document.createTextNode(string));
    return newElement.innerHTML;
  };
  
  // Builds tweet html from object
  const createTweetElement = (tweetObject) => {
    const $tweet = $(
      `<article class="tweet">
      <header>
        <div class="user-info">
          <img src="${tweetObject.user.avatars}" alt="User avatar">
          <span>${tweetObject.user.name}</span>
        </div>
          <span>${tweetObject.user.handle}</span>
      </header>
      <p>${escapeFunction(tweetObject.content.text, 'p')}</p>
      <footer>
        <span>${timeago.format(tweetObject.created_at)}</span>
        <div class="icons">
          <i class="fa-regular fa-flag"></i>
          <i class="fa-regular fa-heart"></i>
          <i class="fa-solid fa-retweet"></i>
        </div>
      </footer>
      </article>`
    );
    return $tweet;
  };

  // Loops through array of tweets, builds and renders each onto page
  const $tweetsContainer =  $('#tweets-container');
  const renderTweets = (tweetsArray) => {
    for (let tweet of tweetsArray) {
      const $tweet = createTweetElement(tweet);
      $tweetsContainer.prepend($tweet);
    }
  };

  // On page load, AJAX GET to retrieve tweets from database and render
  $.ajax({
    url: '/tweets',
    method: 'GET',
    dataType: 'json',
  })
    .then((tweets) => {
      renderTweets(tweets);
    });
  


    
  const $newTweetForm = $('#new-tweet-form');
  const $textArea = $('#tweet-text');
  const $errorMessage = $('#error-message');
  
  // Listen for tweet form submission and prevent default behaviour
  $newTweetForm.submit(function(event) {
    event.preventDefault();
    
    // Validation against empty / oversized tweet
    if ($errorMessage.is(':visible')) {
      $errorMessage.hide();
    }
    if (!$textArea.val()) {
      $errorMessage.text('Your tweet can\'t be empty');
      $errorMessage.slideDown('fast');
      $textArea.focus();
      return;
    }
    if ($textArea.val().length > 140) {
      $errorMessage.text('Your tweet is too long');
      $errorMessage.slideDown('fast');
      $textArea.focus();
      return;
    }

    // Send form data converted to query string in AJAX POST
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: $newTweetForm.serialize(),
    })

    // Refetch tweets from database with AJAX GET
      .then((data) => {
        return $.ajax({
          url: '/tweets',
          method: 'GET',
          dataType: 'json',
        });
      })

    // Create new tweet element from latest in database and render
      .then((tweets) => {
        const $newTweet = createTweetElement(tweets[tweets.length - 1]);
        $tweetsContainer.prepend($newTweet);
      });
  });

});


