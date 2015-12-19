String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10),
        hours = Math.floor(sec_num / 3600),
        minutes = Math.floor((sec_num - (hours * 3600)) / 60),
        seconds = sec_num - (hours * 3600) - (minutes * 60),
        timeStr = "";

    if(hours > 0) {
      if(hours < 10) {
        timeStr += "0";
      }
      timeStr += hours + ":";
    }

    if(minutes > 0) {
      if(minutes < 10) {
        timeStr += "0";
      }
      timeStr += minutes + ":";
    } else {
      timeStr += "0:";
    }

    if(seconds > 0) {
      if(seconds < 10) {
        timeStr += "0";
      }
      timeStr += seconds;
    } else {
      timeStr += "00";
    }

  return timeStr;
};

function PomodoroClock() {
  var sessionLengthSeconds = 25 * 60,
      breakLengthSeconds = 5 * 60,
      remainingTimeSeconds = sessionLengthSeconds,
      inSession = true,
      lastCountdownType = "session",
      intervalId;

  return {
    breakLines: function(element) {
      element.html(element.html().replace(/\n/g,'<br/>'));
    },

    playSound: function(soundfile) {
      var audio = new Audio(soundfile);
      audio.play();
    },

    setStartStopListener: function() {
      var _this = this;
      $(".clock").on( "click", function() {
        if(intervalId) {
          window.clearInterval(intervalId);
          intervalId = null;
           _this.addBreakLengthListener();
           _this.addSessionLengthListener();
         } else {
           _this.removeBreakLengthListener();
           _this.removeSessionLengthListener();
           _this.countDown();
        }
      });
    },

    addBreakLengthListener: function() {
      var breakDurationEl = $(".break .duration"),
          clockEl = $(".clock"),
          breakDuration,
          _this = this;

      $(".break .incr").on("click", function() {
        breakDuration = +breakDurationEl.text();
        breakDuration++;
        breakDurationEl.text(breakDuration);
        breakLengthSeconds = breakDuration * 60;

        _this.setBreakForClock(breakDuration);
      });

      $(".break .decr").on("click", function() {
        breakDuration = +breakDurationEl.text();
        if(breakDuration > 0) {
          breakDuration--;
        }
        breakDurationEl.text(breakDuration);
        breakLengthSeconds = breakDuration * 60;

        _this.setBreakForClock(breakDuration);
      });
    },

    addSessionLengthListener: function() {
      var sessionDurationEl = $(".session .duration"),
          clockEl = $(".clock"),
          sessionDuration,
          _this = this;

      $(".session .incr").on("click", function() {
        sessionDuration = +sessionDurationEl.text();
        sessionDuration++;
        sessionDurationEl.text(sessionDuration);
        sessionLengthSeconds = sessionDuration * 60;

        _this.setSessionForClock(sessionDuration);
      });

      $(".session .decr").on("click", function() {
        sessionDuration = +sessionDurationEl.text();
        if(sessionDuration > 0) {
          sessionDuration--;
        }
        sessionDurationEl.text(sessionDuration);
        sessionLengthSeconds = sessionDuration * 60;

        _this.setSessionForClock(sessionDuration);
      });
    },

    setBreakForClock: function(breakDuration) {
      var clockEl = $(".clock");

      if(lastCountdownType === "break" ) {
        breakLengthSeconds = breakDuration * 60;
        remainingTimeSeconds = breakLengthSeconds;
        clockEl.text("Break\n" + breakLengthSeconds.toString().toHHMMSS());
        this.breakLines(clockEl);
      }
    },

    setSessionForClock: function(sessionDuration) {
      var clockEl = $(".clock");

      if(lastCountdownType === "session" ) {
        sessionLengthSeconds = sessionDuration * 60;
        remainingTimeSeconds = sessionLengthSeconds;
        clockEl.text("Session\n" + sessionLengthSeconds.toString().toHHMMSS());
        this.breakLines(clockEl);
      }
    },

    removeBreakLengthListener: function() {
      $(".break .incr").off("click");
      $(".break .decr").off("click");
    },

    removeSessionLengthListener: function() {
      $(".session .incr").off("click");
      $(".session .decr").off("click");
    },

    countDown: function() {
      var hours,
          minutes,
          seconds,
          timeStr,
          clockEl,
          _this = this;

      if(inSession) {
        if(remainingTimeSeconds < 0) {
          remainingTimeSeconds = sessionLengthSeconds;
        }
      } else {
        if(remainingTimeSeconds < 0) {
          remainingTimeSeconds = breakLengthSeconds;
        }
      }

      intervalId = setInterval(function() {
        hours = Math.floor(remainingTimeSeconds / (60 * 60));
        minutes = Math.floor(remainingTimeSeconds / 60);
        seconds = remainingTimeSeconds - minutes * 60;

        timeStr = remainingTimeSeconds.toString().toHHMMSS();
        clockEl = $(".clock");
        if(inSession) {
          clockEl.css("background", "green");
          clockEl.text("Session\n" + timeStr);
        } else {
          clockEl.css("background", "red")
          clockEl.text("Break\n" + timeStr);
        }
        _this.breakLines(clockEl);

        remainingTimeSeconds--;
        if(remainingTimeSeconds < 0) {
          if(inSession) {
            window.clearInterval(intervalId);
            inSession = false;
            lastCountdownType = "break";
          } else {
            window.clearInterval(intervalId);
            inSession = true;
            lastCountdownType = "session";
          }
          _this.countDown();
          _this.playSound("http://soundbible.com/grab.php?id=1296&type=mp3");
        }
      }, 1000);
    }

  }
}



var pomodoroClock = PomodoroClock();
pomodoroClock.setStartStopListener();
pomodoroClock.countDown();
