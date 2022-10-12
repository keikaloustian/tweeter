$(document).ready(() => {

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];


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
        <span>${tweetObject.created_at}</span>
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

  // Loop through tweets data, build up and append to container in page
  const $tweetsContainer =  $('#tweets-container');
  const renderTweets = (tweetsArray) => {
    for (let tweet of tweetsArray) {
      const $tweet = createTweetElement(tweet);
      $tweetsContainer.append($tweet);
    }
  };

  renderTweets(data);


  // Listen for new tweet form submission and prevent default behaviour
  const $newTweetForm = $('#new-tweet-form');
  $newTweetForm.submit(function(event) {
    event.preventDefault();

    // Send form data converted to query string in AJAX POST request
    $.ajax({
      url: '/',
      method: 'POST',
      data: $newTweetForm.serialize(),
    })
        
  });


});


