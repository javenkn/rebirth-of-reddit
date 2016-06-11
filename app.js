var bodyElement = document.getElementById('content');

$.ajax({
  method: 'GET',
  url: "https://www.reddit.com/r/webdev.json",
  dataType: "json"
}).done(function(result){
  makeContent(result);
  makeSide();
});

//creates the content for the page
function makeContent(response){
  var articleArr = response.data.children;
  console.log(articleArr);
  articleArr.forEach(function(element, index, arr){

    //creates the article div
    var articleElement = document.createElement('DIV');
    articleElement.className = "article";
    bodyElement.appendChild(articleElement);

    //creates the image div
    var imageDiv = document.createElement('DIV');
    // var imageElement = document.createElement('IMG');
    // imageElement.className = "images";
    imageDiv.className = "images";
    var imageThumbnail = arr[index].data.thumbnail;
    if(imageThumbnail === "" || imageThumbnail === "self" || imageThumbnail === "default"){
      imageThumbnail = "http://www1.pcmag.com/media/images/391545-reddit-logo.jpg?thumb=y";
    }
    imageDiv.style.backgroundImage = "url(" + imageThumbnail + ")";
    articleElement.appendChild(imageDiv);

    //creates the article info div
    var articleInfoElement = document.createElement('DIV');
    articleInfoElement.className = "articleInfo";
    articleElement.appendChild(articleInfoElement);


    //creates the title div
    var titleElement = document.createElement('DIV');
    titleElement.className = "title";
    var articleTitle = arr[index].data.title;
    titleElement.innerHTML = articleTitle;
    $('.title').on('click', function(){
      location.href = arr[index].data.url;
    });
    articleInfoElement.appendChild(titleElement);

    //creates the author div
    var authorElement = document.createElement('DIV');
    authorElement.className = "author";
    var articleAuthor = arr[index].data.author;
    authorElement.innerHTML = "Submitted by " + articleAuthor;
    articleInfoElement.appendChild(authorElement);

    //creates the comments div
    var commentElement = document.createElement('DIV');
    commentElement.className = "comments";
    var articleComments = arr[index].data.num_comments;
    if(articleComments > 1){
      commentElement.innerHTML = articleComments + " comments";
    }else if(articleComments === 0){
      commentElement.innerHTML = "comment";
    }else{
      commentElement.innerHTML = articleComments + " comment";
    }
    articleInfoElement.appendChild(commentElement);
  });

}

function makeSide(){
  var sideBar = document.createElement('DIV');
  sideBar.id = "side";
  sideBar.innerHTML = "RULES";
  document.body.appendChild(sideBar);
}