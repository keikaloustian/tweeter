$(document).ready(() => {
  
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
      <p>${tweetObject.content.text}</p>
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

  // Loops through array of tweets and renders each onto page
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
  })
  
  




  // Listen for new tweet form submission and prevent default behaviour
  const $newTweetForm = $('#new-tweet-form');
  const $textArea = $('#tweet-text');

  $newTweetForm.submit(function(event) {
    event.preventDefault();
    
    // Preliminary form validation
    if (!$textArea.val()) {
      return alert('Your Tweet cannot be empty.');
    }
    if ($textArea.val().length > 140) {
      return alert('Your Tweet is too long.');
    }

    // Send form data converted to query string in AJAX POST
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: $newTweetForm.serialize(),
    })

    .then ((data) => {
      // Refetch tweets from database
      return $.ajax({
        url: '/tweets',
        method: 'GET',
        dataType: 'json',
      })
    })

    .then((tweets) => {
      // Create new tweet element from latest and render
      const $newTweet = createTweetElement(tweets[tweets.length - 1]);
      $tweetsContainer.prepend($newTweet);
    })
  });






});


