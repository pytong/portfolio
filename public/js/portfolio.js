"use strict";

$(function() {
  $(".project").mouseenter(function(event) {
    let projectId = $(event.target).parent().data("id"),
      projectEl = $(`.${projectId}`),
      iconEls = projectEl.find(".icons");

    projectEl.find(".project-overlay").fadeIn(500);
    iconEls.animate({top: "-=110px"});
  });

  $(".project").mouseleave(function(event) {
    let projectId = $(event.target).parent().data("id"),
      projectEl = $(`.${projectId}`),
      iconEls = projectEl.find(".icons");

    projectEl.find(".project-overlay").hide();
    iconEls.css("top", "205px");
  });
});