function shortenString(str, lengthLimit) {
  if(str.length > lengthLimit) {
    return str.substring(0, lengthLimit) + "...";
  }
  return str;
}

function showPlaceholder(image) {
    image.onerror = "";
    image.src = "http://placehold.it/130x130";
    return true;
}

function toDateString(unixTimestamp) {
  var date = new Date(unixTimestamp),
      year = date.getFullYear(),
      month = date.getMonth() + 1,
      day = date.getDate();

  return month + '-' + day + '-' + year;
}

function getRecentPosts() {
  var postsAPI = "http://www.freecodecamp.com/news/hot",
      postsEl = $(".posts"),
      numColumns = 6,
      username,
      upVotes,
      rowEl,
      link,
      headline,
      timePosted,
      imageUrl,
      discussUrl,
      profileUrl,
      postEl,
      imageEl;

  $.get( postsAPI, function(posts) {
    posts.forEach(function(post, index) {
      imageUrl = post.image || post.author.picture;
      headline = shortenString(post.headline, 20);
      link = post.link;
      username = post.author.username,
      upVotes = post.upVotes.length;
      timePosted = +post.timePosted;
      profileUrl = "http://www.freecodecamp.com/" + username;
      discussUrl = "http://www.freecodecamp.com/news/" + post.storyLink.replace(/\s/g,"-");

      if(index % numColumns === 0) {
        rowEl = $("<div></div>");
        postsEl.append(rowEl);
      }

      postEl = $("<div class=\"post col-sm-3 col-md-2 text-center\"></div>");
      imageEl = $("<a href=\"" + link + "\" target=\"_blank\"><img class=\"story-image\" src=\"" + imageUrl + "\"  onerror=\"showPlaceholder(this)\"/></a>");
      showPlaceholder(imageEl);
      postEl.append(imageEl);
      postEl.append("<div class=\"headline\"><a href=\"" + link + "\" target=\"_blank\">" + headline + "</a></div>");
      postEl.append("<div class=\"username\"><a href=\"" + profileUrl + "\" target=\"_blank\">" + username + "</a></div>")
      postEl.append("<span class=\"likes\"><span class=\"glyphicon glyphicon-heart\" aria-hidden=\"true\"></span> " + upVotes + "</span>");
      postEl.append("<a href=\"" + discussUrl + "\" class=\"btn btn-info btn-xs\" target=\"_blank\">Discuss</a>");
      postEl.append("<div class=\"time-posted\">Posted: " + toDateString(timePosted) + "</div>");
      rowEl.append(postEl);
    });
  });
}

getRecentPosts();