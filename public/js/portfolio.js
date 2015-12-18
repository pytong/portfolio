"use strict";

$(function() {
  $(".project").mouseenter(function(event) {
    let projectId = $(event.target).parent().data("id"),
      projectEl = $(`.${projectId}`),
      titleEl = projectEl.find(".title"),
      iconsEl = projectEl.find(".icons");

    projectEl.find(".project-overlay").fadeIn(500);
    titleEl.animate({"top": "60px"}, 500);
    iconsEl.animate({"top": "80px"}, 650);
  });

  $(".project").mouseleave(function(event) {
    let projectId = $(event.target).parent().data("id"),
      projectEl = $(`.${projectId}`),
      titleEl = projectEl.find(".title"),
      iconsEl = projectEl.find(".icons");

    projectEl.stop(true, true);
    titleEl.stop(true, true);
    iconsEl.stop(true, true);

    titleEl.css("top", "-30px");
    iconsEl.css("top", "205px");
    projectEl.find(".project-overlay").css("display", "none");
  });
});