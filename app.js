var bodyElement = document.getElementById('content');

$.ajax({
  method: 'GET',
  url: "https://www.reddit.com/r/javascript.json",
  dataType: "json"
}).done(function(result){
  console.log(result.data.children);
});