"use strict";

$(function(){
  $('.collapse').on('shown.bs.collapse', function(){
    $(this).parents(".timeline-item").find(".fa-plus").removeClass("fa-plus").addClass("fa-minus");
  }).on('hidden.bs.collapse', function(){
    $(this).parents(".timeline-item").find(".fa-minus").removeClass("fa-minus").addClass("fa-plus");
  });
});