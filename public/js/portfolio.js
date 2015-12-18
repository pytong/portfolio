"use strict";

$(function() {
  $(".project").mouseenter(function(event) {
    let projectId = $(event.target).parent().data("id"),
      projectEl = $(`.${projectId}`),
      titleEl = projectEl.find(".title"),
      iconsEl = projectEl.find(".icons");

    projectEl.find(".project-overlay").fadeIn(500);
    titleEl.animate({"top": "50px"});
    iconsEl.animate({"top": "80px"});
  });

  $(".project").mouseleave(function(event) {
    let projectId = $(event.target).parent().data("id"),
      projectEl = $(`.${projectId}`),
      titleEl = projectEl.find(".title"),
      iconsEl = projectEl.find(".icons");

    projectEl.stop();
    iconsEl.stop();

    titleEl.css("top", "-30px");
    iconsEl.css("top", "205px");
    projectEl.find(".project-overlay").css("display", "none");

  });
});