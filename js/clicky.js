$(function(){
  $.get("_clicky.html", function(data){
    $(data).appendTo($("body"));
  });
});
