function addSearchboxListener() {
  var keycode,
      searchTerms;

  $(".searchbox").keypress(function(event) {
    keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
      $(".ui-menu-item").hide();
      searchTerms = $(".searchbox").val();
      if(searchTerms.length === 0) {
        $(".results").empty();
        return;
      }
      searchWikipedia(searchTerms);
    }
  });
}

function addSearchboxAutocomplete() {

  $(".searchbox").keyup(function(event) {
    var searchTerms = $(".searchbox").val();
    if(searchTerms.length === 0) {
      return;
    }

    $.ajax({
      url: "https://en.wikipedia.org/w/api.php",
      data: {
        action: "query",
        generator: "search",
        gsrsearch: searchTerms,
        format: "json"
      },
      dataType: 'jsonp',
      success: function(data) {
        if(typeof(data.query) === "undefined" || data.query === null) {
          return;
        }

        var pages = data.query.pages,
            pageIds = Object.keys(pages),
            suggestedSearchTerms;

        suggestedSearchTerms = $.map(pageIds, function(pageId) {
          return pages[pageId].title;
        });

        $(".searchbox").autocomplete({
          source: suggestedSearchTerms,
          select: function(event, ui) {
            searchWikipedia(ui.item.value);
          }
        });
      }

    });
  });

}

function addRandomButtonListener() {
  $(".random").click(function() {
    $.ajax({
      url: "https://en.wikipedia.org/w/api.php",
      data: {
        action: "query",
        list: "random",
        rnlimit: 1,
        format: "json"
      },
      dataType: 'jsonp',
      success: function(data) {
        var pageId = data.query.random[0].id,
            link = "https://en.wikipedia.org/?curid=" + pageId;
        window.open(link, '_blank');
      }
    });
  });
}

function searchWikipedia(searchTerms) {
  $.ajax({
    url: "https://en.wikipedia.org/w/api.php?exintro&explaintext",
    data: {
      action: "query",
      generator: "search",
      gsrnamespace: 0,
      gsrlimit: 10,
      gsrsearch: searchTerms,
      prop: "extracts",
      pilimit: "max",
      exlimit: "max",
      exsentences: 1,
      format: "json"
    },
    dataType: 'jsonp',
    success: function(data) {
      $(".results").empty();

      if(typeof(data.query) === "undefined" || data.query === null) {
        return;
      }

      var pages = data.query.pages,
          pageIds = Object.keys(pages),
          link,
          page,
          title,
          index,
          extract,
          results = [];

      pageIds.forEach(function(pageId) {
        page = pages[pageId];
        title = page.title;
        extract = page.extract;
        index = page.index;
        link = "https://en.wikipedia.org/?curid=" + pageId;
        results.push([title, extract, link, index]);
      });

      results = sortPageDetails(results, 3); // compare page index;

      showSearchResults(results);
    }
  });
}

// compare value at index
function sortPageDetails(pageDetails, index) {
  return pageDetails.sort(function(a, b) {
    return a[index] - b[index];
  });
}

function showSearchResults(results) {
  var title,
      extract,
      link;

  results.forEach(function(result) {
    title = result[0];
    extract = result[1];
    link = result[2];
    showSearchResult(title, extract, link);
  });
}

function showSearchResult(title, extract, link) {
  var resultsEl = $(".results");

  resultsEl.append("<div class=\"row well-sm\"><a href=\"" + link + "\" target=\"_blank\" class=\"col-xs-12 result\"><div class=\"title\">" + title + "</div><div class=\"extract\">" + extract + "</div></a></div>");
}

addSearchboxListener();
addSearchboxAutocomplete();
addRandomButtonListener();