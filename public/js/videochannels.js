function TwitchTvApp() {
  var usernames = ["medrybw", "freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas"],
      lastStatus = "all";

  return {
    addChannels: function() {
      var _this = this;
      usernames.forEach(function(username) {
        _this.addChannel(username);
      });
    },

    showHideChannels: function(status) {
      var searchboxEl = $(".searchbox"),
          searchtext = searchboxEl.val().toLowerCase(),
          username,
          _this = this;

      $.each($(".channel"), function(index, channelEl) {
        username = $(channelEl).data("username").toLowerCase();
        if(_this.matchSearchtext(username, searchtext) &&
           ((status === "all") || ($(channelEl).data("status") === status))) {
          $(channelEl).show();
        } else {
          $(channelEl).hide();
        }
      });
    },

    addChannel: function(username) {
      var twitchTvApi = "https://api.twitch.tv/kraken/streams/",
          channelsEl = $(".channels"),
          el,
          logo,
          channel,
          channelUrl,
          statusText,
          isStreaming = false,
          displayName;

      $.when($.get(twitchTvApi + username))
        .then(function(data) {
          channel = data["_links"]["channel"];
          if(data["stream"]) {
            isStreaming = true;
          }

          el = $("<li class=\"channel\" data-username=\"" + username + "\"></li>");
          if(isStreaming) {
            el.data("status", "online");
            el.append("<span class=\"status\">&#10003</span>");
          } else {
            el.data("status", "offline");
            el.append("<span class=\"status\">!</span>");
          }

          $.when($.get(channel)).done(function(data) {
            channelUrl = data["url"];
            statusText = data["status"];
            displayName = data["display_name"];
            logo = data["logo"] || "http://placehold.it/50x50";

            el.append("<img src=\"" + logo + "\"/><a href=\"" + channelUrl +
                      "\" target=\"_blank\">" + displayName + "</a>");
            if(isStreaming) {
              if(statusText.length > 20) {
                statusText = statusText.substring(0, 33) + "..."
              }
              el.append("<div class=\"status-text\">" + statusText + "</div>");
            }
            channelsEl.append(el);
          });
      })
      .fail(function(data) {
        el = $("<li class=\"channel\" data-username=\"" + username + "\"></li>");
        el.append("<img src=\"http://placehold.it/50x50\"/><span>" + username + "</span>");
        el.append("<div class=\"status-text\">User account has been deleted.</div>");
        channelsEl.append(el);
      });

      return channelUrl;
    },

    matchSearchtext: function(username, searchtext) {
      return searchtext.length === 0 || username.indexOf(searchtext) >= 0;
    },

    addSearchboxListener: function() {
      var searchboxEl = $(".searchbox"),
          username,
          _this = this;

      searchboxEl.keyup(function() {
        _this.showHideChannels(lastStatus);
      });
    },

    addStatusFilterListeners: function() {
      var filter,
          _this = this,
          allFilter = $(".status-filter .all"),
          onlineFilter = $(".status-filter .online"),
          offlineFilter = $(".status-filter .offline");

      allFilter.click(function() {
        lastStatus = "all";
        allFilter.addClass("selected");
        onlineFilter.removeClass("selected");
        offlineFilter.removeClass("selected");
        _this.showHideChannels("all");
      });

      onlineFilter.click(function() {
        lastStatus = "online";
        onlineFilter.addClass("selected");
        allFilter.removeClass("selected");
        offlineFilter.removeClass("selected");
        _this.showHideChannels("online");
      });

      offlineFilter.click(function() {
        lastStatus = "offline";
        offlineFilter.addClass("selected");
        allFilter.removeClass("selected");
        onlineFilter.removeClass("selected");
        _this.showHideChannels("offline");
      });
    }

  }
}


var twitchTvApp = TwitchTvApp();
twitchTvApp.addChannels();
twitchTvApp.addSearchboxListener();
twitchTvApp.addStatusFilterListeners();