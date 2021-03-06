window.onload = searchPage();
//creates the content for the page
function makeContent(response){
  var $contentElement = $('<div/>');
  $contentElement.attr('id', 'content');
  $('body').append($contentElement);

  var articleArr = response.data.children;
  console.log(articleArr);
  articleArr.forEach(function(element, index, arr){

    //creates the article div
    var $articleElement = $('<div/>');
    $articleElement.addClass('article');
    $articleElement.css('box-shadow','2px 2px 10px #888');
    $('#content').append($articleElement);

    //creates the image div
    var $imageDiv = $('<div/>');
    $imageDiv.addClass('images');
    var imageThumbnail = arr[index].data.thumbnail;
    if(imageThumbnail === "" || imageThumbnail === "self" || imageThumbnail === "default"){
      imageThumbnail = "http://www1.pcmag.com/media/images/391545-reddit-logo.jpg?thumb=y";
    }
    $imageDiv.css('backgroundImage', 'url(' + imageThumbnail + ')');
    $articleElement.append($imageDiv);

    //creates the article info div
    var $articleInfoElement = $('<div/>');
    $articleInfoElement.addClass('articleInfo');
    $articleElement.append($articleInfoElement);


    //creates the title div
    var $titleElement = $('<div/>');
    $titleElement.addClass('title');
    $titleElement.text(arr[index].data.title);
    // var $titleLink = $('<a/>');
    // $titleLink.text(arr[index].data.title);
    $titleElement.on('click', function(){
      goToArticle(arr[index].data.url);
    });
    // $titleElement.append($titleLink);
    $articleInfoElement.append($titleElement);

    //creates the author div
    var $authorElement = $('<div/>');
    $authorElement.addClass('author');
    var articleAuthor = arr[index].data.author;

    //creates the time div
    var time = arr[index].data.created_utc;
    var timeNow = Date.now();
    var date = new Date(time*1000);
    var dateNow = new Date(timeNow);
    var timeElapsed = Math.abs(dateNow - date);

    //converts the milliseconds utc (time) into seconds, minutes, hours, days
    var secondsAgo = Math.floor(timeElapsed/1000);
    var minutesAgo = Math.floor(timeElapsed/60000);
    var hoursAgo = Math.floor(timeElapsed/(60000*60));
    var daysAgo = Math.floor(timeElapsed/(1000*60*60*24));
    var weeksAgo = Math.floor(timeElapsed/(1000*60*60*24*7));
    var monthsAgo = Math.floor(timeElapsed/(1000*60*60*24*7*4));
    var yearsAgo = Math.floor(timeElapsed/(1000*60*60*24*7*4*12));

    //checks how long ago the user posted the post

    if(yearsAgo > 0){
      if(yearsAgo === 1){
        $authorElement.text('Submitted ' + yearsAgo + ' year ago by ' + articleAuthor);
      }else{
        $authorElement.text('Submitted ' + yearsAgo + ' years ago by ' + articleAuthor);
      }
    }else if(yearsAgo === 0 && (monthsAgo > 0 && monthsAgo < 12)){
      if(monthsAgo === 1){
        $authorElement.text('Submitted ' + monthsAgo + ' month ago by ' + articleAuthor);
      }else{
        $authorElement.text('Submitted ' + monthsAgo + ' months ago by ' + articleAuthor);
      }
    }else if(monthsAgo === 0 && (weeksAgo > 0 && weeksAgo < 4)){
      if(weeksAgo === 1){
        $authorElement.text('Submitted ' + weeksAgo + ' week ago by ' + articleAuthor);
      }else{
        $authorElement.text('Submitted ' + weeksAgo + ' weeks ago by ' + articleAuthor);
      }
    }else if(weeksAgo === 0 && (daysAgo > 0 && daysAgo < 32)){
      if(daysAgo === 1){
        $authorElement.text('Submitted ' + daysAgo + ' day ago by ' + articleAuthor);
      }else{
        $authorElement.text('Submitted ' + daysAgo + ' days ago by ' + articleAuthor);
      }
    }else if(daysAgo === 0 && (hoursAgo > 0 && hoursAgo < 24)){
      if(hoursAgo === 1){
        $authorElement.text('Submitted ' + hoursAgo + ' hour ago by ' + articleAuthor);
      }else{
        $authorElement.text('Submitted ' + hoursAgo + ' hours ago by ' + articleAuthor);
      }
    }else if(hoursAgo === 0 && (minutesAgo > 0 && minutesAgo < 60)){
      if(minutesAgo === 1){
        $authorElement.text('Submitted ' + minutesAgo + ' minute ago by ' + articleAuthor);
      }else{
        $authorElement.text('Submitted ' + minutesAgo + ' minutes ago by ' + articleAuthor);
      }
    }else if(minutesAgo === 0 && (secondsAgo > 0 && secondsAgo < 60)){
      if(hoursAgo === 1){
        $authorElement.text('Submitted ' + secondsAgo + ' second ago by ' + articleAuthor);
      }else{
        $authorElement.text('Submitted ' + secondsAgo + ' seconds ago by ' + articleAuthor);
      }
    }

    $articleInfoElement.append($authorElement);


    //creates the comments div
    var $commentElement = $('<div/>');
    $commentElement.addClass('comments');
    var articleComments = arr[index].data.num_comments;
    if(articleComments > 1){
      $commentElement.text(articleComments + " comments");
    }else if(articleComments === 0){
      $commentElement.text("comment");
    }else{
      $commentElement.text(articleComments + " comment");
    }
    $articleInfoElement.append($commentElement);
  });

}

//creates the sidebar where the search bar is
function makeSide(){
  //creating sidebar of the page
  var $sideBar = $('<div/>');
  $sideBar.attr('id', 'side');
  $($sideBar).append($('<div/>').text("Search for a Subreddit"));
  $('body').append($sideBar);

  //creates search bar
  var $searchBar = $('<div/>');
  $($sideBar).append($searchBar);

  //creates form
  var $inputForm = $('<form/>');
  $inputForm.attr('id', 'sideSearch');
  $($searchBar).append($inputForm);
  var $inputSearch = $('<input/>');
  $($inputForm).append($inputSearch);
  $inputSearch.attr('id', 'sideSubmit');

  //creates submit button
  $submitButton = $('<button/>');
  $submitButton.text('Submit');
  $submitButton.attr('class', 'submitButton');
  $submitButton.click(renderSubreddit);
  $($searchBar).append($submitButton);

  //check if the user presses the enter key
  //if so, change the subreddit
  $('input').keypress(function(event){
    if(event.which === 13){
      event.preventDefault();
      $($submitButton).click();
    }
  });
}

//searches for the user typed in subreddit
function renderSubreddit(event){
  $('#content').remove();
  var subreddit = $('input').val();
  $('#side').remove();
  $('#searchPage').remove();
  $.ajax({
    method: 'GET',
    url: "https://www.reddit.com/r/" + subreddit + ".json",
    dataType: "json"
  }).done(function(result){
    makeContent(result);
    makeSide();
  }).fail(function(result){
    alert(subreddit + ' does not exist. Choose another Subreddit.');
    searchPage();
  });
}

//onload search for subreddit pages
//asks user to input a subreddit page
function searchPage(){
  var $pageElement = $('<div/>');
  $('body').append($pageElement);
  $($pageElement).append($('<div/>').text("Search for a Subreddit"));
  $pageElement.attr('id', 'searchPage');

  //creates search bar
  var $searchBar = $('<div/>');
  $($pageElement).append($searchBar);

  //creates form
  var $inputForm = $('<form/>');
  $inputForm.attr('class', 'search');
  $($searchBar).append($inputForm);
  var $inputSearch = $('<input/>');
  $($inputForm).append($inputSearch);
  $inputSearch.attr('class', 'submit');

  //creates submit button
  $submitButton = $('<button/>');
  $submitButton.text('Submit');
  $submitButton.attr('class', 'submitButton');
  $submitButton.click(renderSubreddit);
  $($searchBar).append($submitButton);

  //check if the user presses the enter key
  //if so, change the subreddit
  $('input').keypress(function(event){
    if(event.which === 13){
      event.preventDefault();
      $($submitButton).click();
    }
  });
}

function goToArticle(url){
  if(url.slice(0,25) === "https://www.reddit.com/r/"){
    $.ajax({
      method: 'GET',
      url: url + '.json',
      dataType: 'json',
    })
    .done(function(data) {
      console.log(data);
    });
  }else{
    window.location.href = url;
  }
}