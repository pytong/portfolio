$(function() {
  $(".project").mouseenter(function() {
    $(".project-overlay").show();
  });
  $(".project").mouseleave(function() {
    $(".project-overlay").hide();
  });
});