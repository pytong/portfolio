$(function(){
  $.get("_clicky.html", function(data){
    $("body").append(data);
  });
});
