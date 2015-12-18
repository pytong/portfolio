"use strict";

$(function() {

  function showProjectDetails() {
    console.log(this);
    let projectId = $(this).closest(".project").data("id"),
      projectEl = $(`.${projectId}`),
      titleEl = projectEl.find(".title"),
      iconsEl = projectEl.find(".icons");

    projectEl.find(".project-overlay").fadeIn(500);
    titleEl.animate({"top": "60px"}, 300);
    iconsEl.animate({"top": "80px"}, 400);
  };

  function hideProjectDetails() {
    console.log(this);
    let projectId = $(this).closest(".project").data("id"),
      projectEl = $(`.${projectId}`),
      titleEl = projectEl.find(".title"),
      iconsEl = projectEl.find(".icons");

    projectEl.stop(true, true);
    titleEl.stop(true, true);
    iconsEl.stop(true, true);

    titleEl.css("top", "-30px");
    iconsEl.css("top", "205px");
    projectEl.find(".project-overlay").hide();
  }

  $(".project").hoverIntent({
      over: showProjectDetails,
      out: hideProjectDetails,
      sensitivity: 1
  });


});